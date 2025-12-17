"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, ArrowLeft, RefreshCw, Send, Trash } from "lucide-react"
import { toast } from "sonner"
import { groupBookingsDB, notificationsDB, type GroupBookingRequest } from "@/lib/local-db"
import { useAppStore } from "@/lib/store"

const STATUS_OPTIONS: GroupBookingRequest["status"][] = [
  "NEW",
  "QUOTE_SHARED",
  "AWAITING_AGENT",
  "CONFIRMED",
  "CLOSED",
]

export default function GroupRequestsPage() {
  const router = useRouter()
  const { currentUser } = useAppStore()
  const [requests, setRequests] = useState<GroupBookingRequest[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [form, setForm] = useState({
    status: "NEW" as GroupBookingRequest["status"],
    quoteAmount: "",
    validUntil: "",
    nextSteps: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const sortedRequests = useMemo(
    () => [...requests].sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")),
    [requests],
  )

  const selectedRequest = sortedRequests.find((r) => r.id === selectedId) || null

  useEffect(() => {
    const load = async () => {
      try {
        const all = await groupBookingsDB.readAll()
        setRequests(all)
      } catch (error) {
        console.error("Failed to load group requests", error)
        toast.error("Could not load group requests from local DB")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSelect = (request: GroupBookingRequest) => {
    setSelectedId(request.id)
    setForm({
      status: request.status,
      quoteAmount: request.quoteAmount || "",
      validUntil: request.validUntil || "",
      nextSteps: request.nextSteps || "",
    })
  }

  const handleSave = async () => {
    if (!selectedId) {
      toast.error("Select a request to update")
      return
    }
    setSaving(true)
    try {
      const updated = await groupBookingsDB.update(selectedId, {
        status: form.status,
        quoteAmount: form.quoteAmount,
        validUntil: form.validUntil,
        nextSteps: form.nextSteps,
        assignedTo: currentUser.name,
      })

      setRequests((prev) => prev.map((req) => (req.id === updated.id ? updated : req)))

      if (updated.agentEmail || updated.submittedBy) {
        await notificationsDB.create({
          title: `Group quote shared (${updated.reference})`,
          message: `Status: ${updated.status}. Quote: ${updated.quoteAmount || "Pending"}. Validity: ${
            updated.validUntil || "N/A"
          }.`,
          type: "group-booking-update",
          userId: updated.agentEmail || updated.submittedBy,
        })
      }

      toast.success("Group request updated")
    } catch (error) {
      console.error("Failed to update group request", error)
      toast.error("Could not save changes")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await groupBookingsDB.delete(id)
      setRequests((prev) => prev.filter((req) => req.id !== id))
      if (selectedId === id) {
        setSelectedId(null)
      }
      toast.success("Request deleted")
    } catch (error) {
      console.error("Failed to delete group request", error)
      toast.error("Could not delete request")
    }
  }

  const handleRefresh = async () => {
    setLoading(true)
    try {
      const all = await groupBookingsDB.readAll()
      setRequests(all)
    } catch (error) {
      toast.error("Refresh failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-10 w-10">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Group Booking Requests</h1>
            <Badge variant="outline">{requests.length} open</Badge>
          </div>
          <p className="text-muted-foreground">
            Support/Admin workspace to acknowledge enquiries, share quotes/validity, and add next steps for agents.
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="secondary" onClick={() => router.push("/dashboard/flights")}>
            Back to Flights
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1.2fr]">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
            <CardDescription>Click a request to view and update details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading && <p className="text-sm text-muted-foreground">Loading requests…</p>}
            {!loading && sortedRequests.length === 0 && (
              <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                No group requests yet.
              </div>
            )}

            <div className="grid gap-3">
              {sortedRequests.map((request) => (
                <div
                  key={request.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelect(request)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleSelect(request)
                    }
                  }}
                  className={`rounded-xl border p-4 text-left transition hover:border-primary/60 ${
                    selectedId === request.id ? "border-primary bg-primary/5" : "bg-background"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold">
                          {request.origin} → {request.destination}
                        </p>
                        <Badge variant="secondary">{request.passengers.total} pax</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ref {request.reference} • {request.classType} • {request.isInternational ? "INTL" : "DOM"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Submitted by {request.submittedBy} ({request.agentEmail || "email NA"})
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={request.status === "NEW" ? "outline" : "default"}>{request.status}</Badge>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(request.id)
                        }}
                        className="h-8 w-8"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    Notes: {request.notes || "—"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>Support Response</CardTitle>
            <CardDescription>
              Share quote, validity, and next steps. Updates notify the agent via local DB notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!selectedRequest && (
              <p className="text-sm text-muted-foreground">Select a request from the left to respond.</p>
            )}

            {selectedRequest && (
              <>
                <div className="grid gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">
                      {selectedRequest.origin} → {selectedRequest.destination}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedRequest.passengers.total} passengers • {selectedRequest.classType} •{" "}
                      {selectedRequest.isInternational ? "International" : "Domestic"}
                    </p>
                  </div>
                  <Separator />
                  <div className="grid gap-3">
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={form.status}
                        onValueChange={(value) => setForm((prev) => ({ ...prev, status: value as typeof prev.status }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Quote / Fare (optional)</Label>
                      <Input
                        placeholder="e.g., ₹18,000 per traveler"
                        value={form.quoteAmount}
                        onChange={(e) => setForm((prev) => ({ ...prev, quoteAmount: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Validity (optional)</Label>
                      <Input
                        placeholder="e.g., Valid till 05 Jan, 6 PM IST"
                        value={form.validUntil}
                        onChange={(e) => setForm((prev) => ({ ...prev, validUntil: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Next Steps</Label>
                      <Textarea
                        rows={4}
                        placeholder="Payment instructions, documents required, PNR issuance steps, etc."
                        value={form.nextSteps}
                        onChange={(e) => setForm((prev) => ({ ...prev, nextSteps: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedId(null)}>
                    Clear
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    <Send className="mr-2 h-4 w-4" />
                    {saving ? "Saving..." : "Share with Agent"}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


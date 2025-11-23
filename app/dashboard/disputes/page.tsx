"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Paperclip, AlertCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { usePermissions } from "@/hooks/use-permissions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { disputesDB, transactionsDB, type Dispute } from "@/lib/local-db"
import { useAppStore } from "@/lib/store"
import { toast } from "sonner"
import { format } from "date-fns"
import { audit } from "@/lib/audit-utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const STATUS_STAGES = ["Raised", "Acknowledged", "Under Review", "Resolution Proposed", "Closed"]

export default function DisputesPage() {
  const { canView } = usePermissions()
  const { currentUser } = useAppStore()
  const [disputes, setDisputes] = useState<Dispute[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [raiseDisputeOpen, setRaiseDisputeOpen] = useState(false)
  const [disputeForm, setDisputeForm] = useState({ transactionId: "", title: "", category: "" })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [allDisputes, allTransactions] = await Promise.all([
        disputesDB.readAll(),
        transactionsDB.readAll(),
      ])
      setDisputes(allDisputes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      setTransactions(allTransactions)
    } catch (error) {
      console.error("Failed to load data:", error)
      toast.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  const handleRaiseDispute = async () => {
    try {
      if (!disputeForm.transactionId || !disputeForm.title || !disputeForm.category) {
        toast.error("Please fill all fields")
        return
      }

      const dispute = await disputesDB.create({
        transactionId: disputeForm.transactionId,
        title: disputeForm.title,
        category: disputeForm.category,
        status: "Raised",
      })

      // Add initial message
      await disputesDB.update(dispute.id, {
        messages: [
          {
            id: `msg-${Date.now()}`,
            userId: currentUser.id,
            userName: currentUser.name,
            message: disputeForm.title,
            timestamp: new Date().toISOString(),
          },
        ],
      })

      await audit.create("disputes", dispute.id, { title: disputeForm.title })

      toast.success("Dispute raised successfully", {
        description: `Dispute ID: ${dispute.disputeId}`,
      })

      setRaiseDisputeOpen(false)
      setDisputeForm({ transactionId: "", title: "", category: "" })
      await loadData()
      setSelectedDispute(dispute.id)
    } catch (error) {
      console.error("Failed to raise dispute:", error)
      toast.error("Failed to raise dispute")
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedDispute) return

    try {
      const dispute = disputes.find((d) => d.id === selectedDispute)
      if (!dispute) return

      const updatedMessages = [
        ...dispute.messages,
        {
          id: `msg-${Date.now()}`,
          userId: currentUser.id,
          userName: currentUser.name,
          message: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]

      await disputesDB.update(selectedDispute, { messages: updatedMessages })

      // Auto-acknowledge if support team
      if (currentUser.role === "SUPPORT_TEAM" && dispute.status === "Raised") {
        await disputesDB.update(selectedDispute, { status: "Acknowledged" })
      }

      setNewMessage("")
      await loadData()
    } catch (error) {
      console.error("Failed to send message:", error)
      toast.error("Failed to send message")
    }
  }

  const handleResolve = async () => {
    if (!selectedDispute) return

    try {
      await disputesDB.update(selectedDispute, {
        status: "Closed",
        resolution: "Resolved by support team",
      })

      await audit.update("disputes", selectedDispute, { status: "Under Review" }, { status: "Closed" })

      toast.success("Dispute resolved successfully")
      await loadData()
    } catch (error) {
      console.error("Failed to resolve dispute:", error)
      toast.error("Failed to resolve dispute")
    }
  }

  const selectedDisputeData = disputes.find((d) => d.id === selectedDispute)
  const filteredDisputes = disputes.filter((d) => {
    if (searchQuery) {
      return (
        d.disputeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return true
  })

  const getTimeline = (dispute: Dispute) => {
    const statusIndex = STATUS_STAGES.indexOf(dispute.status)
    return STATUS_STAGES.map((stage, idx) => ({
      stage,
      date: idx <= statusIndex ? format(new Date(dispute.createdAt), "MMM d, h:mm a") : "-",
      status: idx < statusIndex ? "completed" : idx === statusIndex ? "current" : "pending",
    }))
  }

  // Allow access if user can view disputes OR can view own bookings (to raise disputes)
  if (!canView("disputes") && !canView("ownBookings")) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You do not have permission to access disputes. Only Support Team and users with booking access can view this page.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl py-6 h-[calc(100vh-4rem)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Dispute Resolution Center</h1>
          <p className="text-muted-foreground mt-1">Manage and track booking disputes and payment issues.</p>
        </div>
        {canView("ownBookings") && (
          <Button onClick={() => setRaiseDisputeOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Raise Dispute
          </Button>
        )}
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        {/* List of Disputes */}
        <Card className="col-span-4 flex flex-col overflow-hidden border-none shadow-lg">
          <div className="p-4 border-b bg-muted/20">
            <Input
              placeholder="Search disputes..."
              className="bg-white border-none shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ScrollArea className="flex-1">
            {loading ? (
              <div className="p-4 text-center text-muted-foreground">Loading...</div>
            ) : filteredDisputes.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No disputes found</div>
            ) : (
              <div className="divide-y">
                {filteredDisputes.map((dispute) => (
                  <div
                    key={dispute.id}
                    onClick={() => setSelectedDispute(dispute.id)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedDispute === dispute.id ? "bg-primary/5 border-l-4 border-l-primary" : "border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-sm">{dispute.disputeId}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(dispute.createdAt), "MMM d")}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm mb-1 line-clamp-1">{dispute.title}</h4>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-xs font-normal">
                        {dispute.category}
                      </Badge>
                      <Badge
                        className={`text-[10px] h-5 px-1.5 ${
                          dispute.status === "Closed"
                            ? "bg-green-100 text-green-700"
                            : dispute.status === "Under Review"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {dispute.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </Card>

        {/* Detail View */}
        <Card className="col-span-8 flex flex-col overflow-hidden border-none shadow-lg">
          {selectedDisputeData ? (
            <>
              <CardHeader className="border-b bg-muted/20 py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <CardTitle>{selectedDisputeData.disputeId}</CardTitle>
                      <Badge
                        variant="secondary"
                        className={
                          selectedDisputeData.status === "Closed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {selectedDisputeData.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {selectedDisputeData.transactionId && `Transaction: ${selectedDisputeData.transactionId}`}
                      {selectedDisputeData.bookingId && ` • Booking: ${selectedDisputeData.bookingId}`}
                    </CardDescription>
                  </div>
                  {currentUser.role === "SUPPORT_TEAM" && selectedDisputeData.status !== "Closed" && (
                    <Button variant="outline" onClick={handleResolve}>
                      Mark Resolved
                    </Button>
                  )}
                </div>
              </CardHeader>

              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-3 h-full">
                  {/* Chat/Activity Feed */}
                  <div className="col-span-2 p-6 border-r flex flex-col">
                    <h3 className="font-semibold mb-6 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> Activity Log
                    </h3>

                    <ScrollArea className="flex-1 mb-4">
                      <div className="space-y-6">
                        {selectedDisputeData.messages.map((msg) => {
                          const isOwn = msg.userId === currentUser.id
                          return (
                            <div key={msg.id} className={`flex gap-4 ${isOwn ? "flex-row-reverse" : ""}`}>
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className={isOwn ? "bg-primary text-white" : ""}>
                                  {msg.userName.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className={isOwn ? "text-right" : ""}>
                                <div className={`flex items-baseline gap-2 ${isOwn ? "justify-end" : ""}`}>
                                  <span className="font-semibold text-sm">{msg.userName}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {format(new Date(msg.timestamp), "h:mm a")}
                                  </span>
                                </div>
                                <div
                                  className={`mt-1 p-3 rounded-lg text-sm ${
                                    isOwn
                                      ? "bg-primary/10 text-primary-foreground rounded-tr-none inline-block"
                                      : "bg-muted/30 rounded-tl-none"
                                  }`}
                                >
                                  {msg.message}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </ScrollArea>

                    <div className="mt-auto">
                      <Textarea
                        placeholder="Type a reply..."
                        className="mb-2"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <div className="flex justify-between items-center">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Paperclip className="w-4 h-4 mr-2" /> Attach File
                        </Button>
                        <Button size="sm" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Sidebar */}
                  <div className="col-span-1 bg-muted/10 p-6">
                    <h3 className="font-semibold mb-6">Status Timeline</h3>
                    <div className="relative border-l-2 ml-2 space-y-8">
                      {getTimeline(selectedDisputeData).map((step, idx) => (
                        <div key={idx} className="relative pl-6">
                          <div
                            className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
                              step.status === "completed"
                                ? "bg-green-500 border-green-500"
                                : step.status === "current"
                                  ? "bg-background border-primary animate-pulse"
                                  : "bg-background border-muted"
                            }`}
                          />
                          <p className={`text-sm font-medium ${step.status === "pending" ? "text-muted-foreground" : ""}`}>
                            {step.stage}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{step.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a dispute to view details
            </div>
          )}
        </Card>
      </div>

      {/* Raise Dispute Dialog */}
      <Dialog open={raiseDisputeOpen} onOpenChange={setRaiseDisputeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Raise Dispute</DialogTitle>
            <DialogDescription>Select a transaction and describe the issue</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Transaction</Label>
              <Select value={disputeForm.transactionId} onValueChange={(v) => setDisputeForm({ ...disputeForm, transactionId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transaction" />
                </SelectTrigger>
                <SelectContent>
                  {transactions.map((tx) => (
                    <SelectItem key={tx.id} value={tx.id}>
                      {tx.description} - ₹{Math.abs(tx.amount).toLocaleString("en-IN")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={disputeForm.category} onValueChange={(v) => setDisputeForm({ ...disputeForm, category: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Payment">Payment</SelectItem>
                  <SelectItem value="Booking">Booking</SelectItem>
                  <SelectItem value="Service">Service</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={disputeForm.title}
                onChange={(e) => setDisputeForm({ ...disputeForm, title: e.target.value })}
                placeholder="Brief description of the issue"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRaiseDisputeOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRaiseDispute}>Raise Dispute</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Clock, Plane, Hotel, CheckCircle2 } from "lucide-react"
import { usePermissions } from "@/hooks/use-permissions"
import { toast } from "sonner"
import { format } from "date-fns"

interface ScheduleEscalation {
  id: string
  bookingId: string
  bookingType: "Flight" | "Hotel"
  originalDate: string
  newDate: string
  reason: string
  status: "Pending" | "Approved" | "Rejected" | "Resolved"
  priority: "Low" | "Medium" | "High" | "Urgent"
  requestedBy: string
  requestedAt: string
  resolvedAt?: string
  resolution?: string
}

const MOCK_ESCALATIONS: ScheduleEscalation[] = [
  {
    id: "1",
    bookingId: "FL-20240115-ABCD",
    bookingType: "Flight",
    originalDate: "2024-02-15",
    newDate: "2024-02-16",
    reason: "Customer requested date change due to personal emergency",
    status: "Pending",
    priority: "High",
    requestedBy: "John Agent",
    requestedAt: "2024-01-20T10:00:00",
  },
  {
    id: "2",
    bookingId: "HT-20240116-EFGH",
    bookingType: "Hotel",
    originalDate: "2024-02-20",
    newDate: "2024-02-22",
    reason: "Hotel overbooking - alternative dates required",
    status: "Approved",
    priority: "Urgent",
    requestedBy: "Jane Sub Agent",
    requestedAt: "2024-01-19T14:30:00",
    resolvedAt: "2024-01-19T16:00:00",
    resolution: "Date change approved and booking updated",
  },
]

export default function ScheduleEscalationsPage() {
  const { canView, canEdit } = usePermissions()
  const [escalations, setEscalations] = useState<ScheduleEscalation[]>(MOCK_ESCALATIONS)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false)
  const [selectedEscalation, setSelectedEscalation] = useState<ScheduleEscalation | null>(null)

  if (!canView("disputes")) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const filteredEscalations = escalations.filter((e) => {
    const matchesStatus = filterStatus === "all" || e.status === filterStatus
    const matchesPriority = filterPriority === "all" || e.priority === filterPriority
    return matchesStatus && matchesPriority
  })

  const handleResolve = async (escalationId: string, resolution: string, approved: boolean) => {
    setEscalations((prev) =>
      prev.map((e) =>
        e.id === escalationId
          ? {
              ...e,
              status: approved ? ("Approved" as const) : ("Rejected" as const),
              resolvedAt: new Date().toISOString(),
              resolution,
            }
          : e
      )
    )
    toast.success(`Schedule change ${approved ? "approved" : "rejected"}`)
    setResolveDialogOpen(false)
    setSelectedEscalation(null)
  }

  const pendingCount = escalations.filter((e) => e.status === "Pending").length
  const urgentCount = escalations.filter((e) => e.priority === "Urgent" && e.status === "Pending").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule Change Escalations</h1>
          <p className="text-muted-foreground">Manage schedule change requests and escalations for flights and hotels.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Escalations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{escalations.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{urgentCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Urgent">Urgent</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule Change Requests</CardTitle>
          <CardDescription>Review and manage schedule change escalations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Original Date</TableHead>
                <TableHead>New Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEscalations.map((escalation) => (
                <TableRow key={escalation.id}>
                  <TableCell className="font-medium">{escalation.bookingId}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {escalation.bookingType === "Flight" ? (
                        <Plane className="h-3 w-3 mr-1" />
                      ) : (
                        <Hotel className="h-3 w-3 mr-1" />
                      )}
                      {escalation.bookingType}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(escalation.originalDate), "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(new Date(escalation.newDate), "MMM d, yyyy")}</TableCell>
                  <TableCell className="max-w-xs truncate">{escalation.reason}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        escalation.priority === "Urgent"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : escalation.priority === "High"
                            ? "bg-orange-50 text-orange-700 border-orange-200"
                            : escalation.priority === "Medium"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                      }
                    >
                      {escalation.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        escalation.status === "Approved" || escalation.status === "Resolved"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : escalation.status === "Rejected"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }
                    >
                      {escalation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{escalation.requestedBy}</TableCell>
                  <TableCell className="text-right">
                    {escalation.status === "Pending" && canEdit("disputes") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedEscalation(escalation)
                          setResolveDialogOpen(true)
                        }}
                      >
                        Resolve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Resolve Dialog */}
      <Dialog open={resolveDialogOpen} onOpenChange={setResolveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Schedule Change</DialogTitle>
            <DialogDescription>
              Approve or reject the schedule change request for {selectedEscalation?.bookingId}
            </DialogDescription>
          </DialogHeader>
          {selectedEscalation && (
            <ResolveEscalationForm
              escalation={selectedEscalation}
              onResolve={handleResolve}
              onCancel={() => {
                setResolveDialogOpen(false)
                setSelectedEscalation(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ResolveEscalationForm({
  escalation,
  onResolve,
  onCancel,
}: {
  escalation: ScheduleEscalation
  onResolve: (escalationId: string, resolution: string, approved: boolean) => void
  onCancel: () => void
}) {
  const [resolution, setResolution] = useState("")
  const [approved, setApproved] = useState(true)

  const handleSubmit = () => {
    if (!resolution.trim()) {
      toast.error("Please provide a resolution")
      return
    }
    onResolve(escalation.id, resolution.trim(), approved)
  }

  return (
    <>
      <div className="space-y-4">
        <div>
          <Label>Resolution *</Label>
          <Textarea
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            placeholder="Enter resolution details..."
            rows={4}
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={approved ? "default" : "outline"}
            onClick={() => setApproved(true)}
            className="flex-1"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button
            variant={!approved ? "destructive" : "outline"}
            onClick={() => setApproved(false)}
            className="flex-1"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!resolution.trim()}>
          Submit Resolution
        </Button>
      </DialogFooter>
    </>
  )
}















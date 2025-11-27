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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Clock, AlertCircle, CheckCircle2, User, Ticket } from "lucide-react"
import { usePermissions } from "@/hooks/use-permissions"
import { toast } from "sonner"
import { format, differenceInHours } from "date-fns"

interface SupportTicket {
  id: string
  ticketNumber: string
  subject: string
  description: string
  priority: "Low" | "Medium" | "High" | "Urgent"
  status: "Open" | "In Progress" | "Resolved" | "Closed"
  category: "Technical" | "Billing" | "Booking" | "General"
  assignedTo?: string
  createdBy: string
  createdAt: string
  updatedAt: string
  slaDeadline?: string
  slaStatus?: "On Time" | "At Risk" | "Breached"
  autoClosed?: boolean
}

const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "1",
    ticketNumber: "TKT-2024-001",
    subject: "Unable to process payment",
    description: "Payment gateway is not responding when trying to complete a booking",
    priority: "High",
    status: "In Progress",
    category: "Technical",
    assignedTo: "Support Agent 1",
    createdBy: "John Agent",
    createdAt: "2024-01-20T09:00:00",
    updatedAt: "2024-01-20T10:30:00",
    slaDeadline: "2024-01-20T17:00:00",
    slaStatus: "On Time",
  },
  {
    id: "2",
    ticketNumber: "TKT-2024-002",
    subject: "Refund not processed",
    description: "Refund request submitted 5 days ago but still pending",
    priority: "Urgent",
    status: "Open",
    category: "Billing",
    createdBy: "Jane Sub Agent",
    createdAt: "2024-01-19T14:00:00",
    updatedAt: "2024-01-19T14:00:00",
    slaDeadline: "2024-01-20T14:00:00",
    slaStatus: "Breached",
  },
  {
    id: "3",
    ticketNumber: "TKT-2024-003",
    subject: "Booking modification request",
    description: "Need to change flight dates for booking FL-20240115-ABCD",
    priority: "Medium",
    status: "Resolved",
    category: "Booking",
    assignedTo: "Support Agent 2",
    createdBy: "John Agent",
    createdAt: "2024-01-18T11:00:00",
    updatedAt: "2024-01-18T15:00:00",
    slaDeadline: "2024-01-19T11:00:00",
    slaStatus: "On Time",
    autoClosed: true,
  },
]

export default function SupportTicketsPage() {
  const { canView, canEdit } = usePermissions()
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")

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

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch = !searchQuery ||
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || t.status === filterStatus
    const matchesPriority = filterPriority === "all" || t.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleCreateTicket = (ticket: Omit<SupportTicket, "id" | "ticketNumber" | "createdAt" | "updatedAt">) => {
    const newTicket: SupportTicket = {
      ...ticket,
      id: Date.now().toString(),
      ticketNumber: `TKT-2024-${String(tickets.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "Open",
      slaDeadline: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours SLA
      slaStatus: "On Time",
    }
    setTickets([newTicket, ...tickets])
    toast.success("Support ticket created successfully")
    setCreateDialogOpen(false)
  }

  const handleAssign = (ticketId: string, assignee: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, assignedTo: assignee, status: "In Progress" as const, updatedAt: new Date().toISOString() }
          : t
      )
    )
    toast.success("Ticket assigned successfully")
  }

  const handleClose = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, status: "Closed" as const, updatedAt: new Date().toISOString() }
          : t
      )
    )
    toast.success("Ticket closed")
  }

  const openCount = tickets.filter((t) => t.status === "Open" || t.status === "In Progress").length
  const breachedCount = tickets.filter((t) => t.slaStatus === "Breached").length
  const urgentCount = tickets.filter((t) => t.priority === "Urgent" && t.status !== "Closed").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">Manage support tickets with priority tagging, auto-assignment, SLA tracking, and escalation.</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Ticket
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">SLA Breached</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{breachedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{urgentCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
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
          <CardTitle>Support Tickets</CardTitle>
          <CardDescription>Manage and track support tickets with SLA monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket #</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>SLA Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => {
                const hoursRemaining = ticket.slaDeadline
                  ? differenceInHours(new Date(ticket.slaDeadline), new Date())
                  : null
                return (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.ticketNumber}</TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          ticket.priority === "Urgent"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : ticket.priority === "High"
                              ? "bg-orange-50 text-orange-700 border-orange-200"
                              : ticket.priority === "Medium"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                        }
                      >
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          ticket.status === "Closed" || ticket.status === "Resolved"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : ticket.status === "In Progress"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.assignedTo || "Unassigned"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {ticket.slaStatus && (
                          <Badge
                            variant="outline"
                            className={
                              ticket.slaStatus === "Breached"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : ticket.slaStatus === "At Risk"
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-green-50 text-green-700 border-green-200"
                            }
                          >
                            {ticket.slaStatus}
                          </Badge>
                        )}
                        {hoursRemaining !== null && hoursRemaining > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {hoursRemaining}h left
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(ticket.createdAt), "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {!ticket.assignedTo && canEdit("disputes") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAssign(ticket.id, "Support Agent 1")}
                          >
                            Assign
                          </Button>
                        )}
                        {ticket.status !== "Closed" && canEdit("disputes") && (
                          <Button variant="outline" size="sm" onClick={() => handleClose(ticket.id)}>
                            Close
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Ticket Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Support Ticket</DialogTitle>
            <DialogDescription>Create a new support ticket with priority and category</DialogDescription>
          </DialogHeader>
          <CreateTicketForm
            onSave={handleCreateTicket}
            onCancel={() => setCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CreateTicketForm({
  onSave,
  onCancel,
}: {
  onSave: (ticket: Omit<SupportTicket, "id" | "ticketNumber" | "createdAt" | "updatedAt">) => void
  onCancel: () => void
}) {
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"Low" | "Medium" | "High" | "Urgent">("Medium")
  const [category, setCategory] = useState<"Technical" | "Billing" | "Booking" | "General">("General")

  const handleSubmit = () => {
    if (!subject.trim() || !description.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    onSave({
      subject: subject.trim(),
      description: description.trim(),
      priority,
      category,
      createdBy: "Current User",
    })
  }

  return (
    <>
      <div className="space-y-4">
        <div>
          <Label>Subject *</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter ticket subject"
          />
        </div>
        <div>
          <Label>Description *</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue..."
            rows={5}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Priority</Label>
            <Select value={priority} onValueChange={(v) => setPriority(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Billing">Billing</SelectItem>
                <SelectItem value="Booking">Booking</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Create Ticket</Button>
      </DialogFooter>
    </>
  )
}







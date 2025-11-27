"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MOCK_USERS, type User, type Role } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Search, Download } from "lucide-react"
import { MaskedText } from "@/components/ui/masked-text"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppStore } from "@/lib/store"
import { usePermissions } from "@/hooks/use-permissions"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { agentStatusDB, type AgentStatus } from "@/lib/local-db"
import { audit } from "@/lib/audit-utils"

export default function EmployeesPage() {
  const { currentUser } = useAppStore()
  const { canEdit } = usePermissions()
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [employees, setEmployees] = useState<User[]>([])
  const [agentStatuses, setAgentStatuses] = useState<Record<string, AgentStatus>>({})
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false)
  const [reactivateDialogOpen, setReactivateDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null)
  const [blacklistStatuses, setBlacklistStatuses] = useState<Record<string, "Blacklisted" | "Whitelisted" | "Normal">>({})
  const [blacklistDialogOpen, setBlacklistDialogOpen] = useState(false)
  const [whitelistDialogOpen, setWhitelistDialogOpen] = useState(false)

  // Super Admin sees Agent Admins, Agent Admin sees Agents/Sub Agents
  const isSuperAdmin = currentUser.role === "SUPER_ADMIN"
  const isAgencyAdmin = currentUser.role === "AGENCY_ADMIN"

  // Load employees and their statuses on mount and when currentUser changes
  useEffect(() => {
    loadEmployees()
  }, [isSuperAdmin, isAgencyAdmin])

  const loadEmployees = async () => {
    const filtered = MOCK_USERS.filter((u) => {
      if (isSuperAdmin) {
        // Super Admin can see and add Agent Admins
        return u.role === "AGENCY_ADMIN"
      } else if (isAgencyAdmin) {
        // Agency Admin can see and add Agents/Sub Agents
        return u.role === "AGENT" || u.role === "SUB_AGENT"
      }
      return false
    })
    setEmployees(filtered)

    // Load agent statuses
    const allStatuses = await agentStatusDB.readAll()
    const statusMap: Record<string, AgentStatus> = {}
    allStatuses.forEach((status) => {
      statusMap[status.agentId] = status
    })
    setAgentStatuses(statusMap)
  }

  const getAgentStatus = (agentId: string): "Active" | "Suspended" => {
    return agentStatuses[agentId]?.status || "Active"
  }

  const getAgentListStatus = (agentId: string): "Blacklisted" | "Whitelisted" | "Normal" => {
    return blacklistStatuses[agentId] || "Normal"
  }

  useEffect(() => {
    const saved = localStorage.getItem("agent_blacklist_statuses")
    if (saved) {
      try {
        setBlacklistStatuses(JSON.parse(saved))
      } catch {}
    }
  }, [])

  const handleBlacklist = async (agentId: string, reason: string) => {
    const updated = { ...blacklistStatuses, [agentId]: "Blacklisted" as const }
    setBlacklistStatuses(updated)
    localStorage.setItem("agent_blacklist_statuses", JSON.stringify(updated))
    await audit.create("agents", agentId, {
      action: "BLACKLIST",
      reason,
      blacklistedBy: currentUser.name,
    })
    toast.success("Agent blacklisted successfully")
    setBlacklistDialogOpen(false)
    setSelectedEmployee(null)
  }

  const handleWhitelist = async (agentId: string, reason: string) => {
    const updated = { ...blacklistStatuses, [agentId]: "Whitelisted" as const }
    setBlacklistStatuses(updated)
    localStorage.setItem("agent_blacklist_statuses", JSON.stringify(updated))
    await audit.create("agents", agentId, {
      action: "WHITELIST",
      reason,
      whitelistedBy: currentUser.name,
    })
    toast.success("Agent whitelisted successfully")
    setWhitelistDialogOpen(false)
    setSelectedEmployee(null)
  }

  const handleRemoveFromList = async (agentId: string) => {
    const updated = { ...blacklistStatuses }
    delete updated[agentId]
    setBlacklistStatuses(updated)
    localStorage.setItem("agent_blacklist_statuses", JSON.stringify(updated))
    await audit.create("agents", agentId, {
      action: "REMOVE_FROM_LIST",
      removedBy: currentUser.name,
    })
    toast.success("Agent removed from list")
  }

  const filteredEmployees = employees.filter((u) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      (u.department?.toLowerCase().includes(query) ?? false)
    )
  })

  // Function to refresh employees list
  const refreshEmployees = () => {
    const filtered = MOCK_USERS.filter((u) => {
      if (isSuperAdmin) {
        return u.role === "AGENCY_ADMIN"
      } else if (isAgencyAdmin) {
        return u.role === "AGENT" || u.role === "SUB_AGENT"
      }
      return false
    })
    setEmployees(filtered)
  }

  const canAddUser = (isSuperAdmin && canEdit("agents")) || (isAgencyAdmin && canEdit("agents"))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isSuperAdmin ? "Agent onboarding" : "Agents"}
          </h1>
          <p className="text-muted-foreground">
            {isSuperAdmin 
              ? "Manage agent onboarding in the system." 
              : "Manage your agents and their booking permissions."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          {canAddUser && (
            <Button onClick={() => setAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> 
              {isSuperAdmin ? "Add Agent onboarding" : "Add Agent"}
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, email, or department..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Policy</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  {searchQuery ? "No employees found matching your search." : "No employees found."}
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 overflow-hidden rounded-full border bg-background">
                      <img
                        src={employee.avatar || "/placeholder.svg"}
                        alt={employee.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-muted-foreground">
                        <MaskedText text={employee.email} type="email" />
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.department || "General"}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {employee.role.toLowerCase().replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>Standard Policy</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {getAgentStatus(employee.id) === "Suspended" ? (
                      <Badge className="bg-red-500 hover:bg-red-600">Suspended</Badge>
                    ) : (
                      <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                    )}
                    {getAgentListStatus(employee.id) === "Blacklisted" && (
                      <Badge variant="destructive" className="text-xs">Blacklisted</Badge>
                    )}
                    {getAgentListStatus(employee.id) === "Whitelisted" && (
                      <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">Whitelisted</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {getAgentStatus(employee.id) === "Active" ? (
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => {
                            setSelectedEmployee(employee)
                            setSuspendDialogOpen(true)
                          }}
                        >
                          Suspend Account
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedEmployee(employee)
                            setReactivateDialogOpen(true)
                          }}
                        >
                          Reactivate Account
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      {getAgentListStatus(employee.id) !== "Blacklisted" && (
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => {
                            setSelectedEmployee(employee)
                            setBlacklistDialogOpen(true)
                          }}
                        >
                          Blacklist Agent
                        </DropdownMenuItem>
                      )}
                      {getAgentListStatus(employee.id) !== "Whitelisted" && (
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedEmployee(employee)
                            setWhitelistDialogOpen(true)
                          }}
                        >
                          Whitelist Agent
                        </DropdownMenuItem>
                      )}
                      {(getAgentListStatus(employee.id) === "Blacklisted" || getAgentListStatus(employee.id) === "Whitelisted") && (
                        <DropdownMenuItem 
                          onClick={() => handleRemoveFromList(employee.id)}
                        >
                          Remove from List
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add User Dialog */}
      <AddUserDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        userRole={isSuperAdmin ? "AGENCY_ADMIN" : undefined}
        onUserAdded={(newUser) => {
          // Add the new user to the employees list
          setEmployees((prev) => {
            // Check if user already exists (by email)
            const exists = prev.some((u) => u.email === newUser.email)
            if (exists) return prev
            return [...prev, newUser]
          })
        }}
      />

      {/* Suspend Account Dialog */}
      <SuspendAccountDialog
        open={suspendDialogOpen}
        onOpenChange={setSuspendDialogOpen}
        employee={selectedEmployee}
        onSuspend={async () => {
          await loadEmployees()
          setSelectedEmployee(null)
        }}
      />

      {/* Reactivate Account Dialog */}
      <ReactivateAccountDialog
        open={reactivateDialogOpen}
        onOpenChange={setReactivateDialogOpen}
        employee={selectedEmployee}
        onReactivate={async () => {
          await loadEmployees()
          setSelectedEmployee(null)
        }}
      />

      {/* Blacklist Dialog */}
      <BlacklistDialog
        open={blacklistDialogOpen}
        onOpenChange={setBlacklistDialogOpen}
        employee={selectedEmployee}
        onBlacklist={handleBlacklist}
      />

      {/* Whitelist Dialog */}
      <WhitelistDialog
        open={whitelistDialogOpen}
        onOpenChange={setWhitelistDialogOpen}
        employee={selectedEmployee}
        onWhitelist={handleWhitelist}
      />
    </div>
  )
}

// Add User Dialog Component
function AddUserDialog({
  open,
  onOpenChange,
  userRole,
  onUserAdded,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  userRole?: Role
  onUserAdded?: (user: User) => void
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<Role>(userRole || "AGENT")
  const [department, setDepartment] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name || !email) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      // In a real app, this would create the user via API
      // For now, we'll simulate creating a new user
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Create a new user object
      const newUser: User = {
        id: `u${Date.now()}`, // Generate a unique ID
        name,
        email,
        role: userRole || role,
        avatar: "/placeholder-user.jpg",
        department: department || undefined,
        walletBalance: userRole === "AGENCY_ADMIN" ? 0 : undefined,
      }

      // Call the callback to add the user to the list
      if (onUserAdded) {
        onUserAdded(newUser)
      }
      
      toast.success(`${userRole === "AGENCY_ADMIN" ? "Agent onboarding" : "Agent"} added successfully`, {
        description: `${name} has been added to the system.`,
      })

      // Reset form
      setName("")
      setEmail("")
      setRole(userRole || "AGENT")
      setDepartment("")
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to add user:", error)
      toast.error("Failed to add user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {userRole === "AGENCY_ADMIN" ? "Add Agent onboarding" : "Add Agent"}
          </DialogTitle>
          <DialogDescription>
            {userRole === "AGENCY_ADMIN"
              ? "Add a new agent admin to the system. Agent admins can manage agents and sub-agents."
              : "Add a new agent or sub-agent to your agency."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label>Email *</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>
          {!userRole && (
            <div>
              <Label>Role *</Label>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AGENT">Agent</SelectItem>
                  <SelectItem value="SUB_AGENT">Sub Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {!userRole && (
            <div>
              <Label>Department</Label>
              <Input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g., Sales, Operations"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Suspend Account Dialog
function SuspendAccountDialog({
  open,
  onOpenChange,
  employee,
  onSuspend,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee: User | null
  onSuspend: () => Promise<void>
}) {
  const { currentUser } = useAppStore()
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSuspend = async () => {
    if (!employee || !reason.trim()) {
      toast.error("Please provide a reason for suspension")
      return
    }

    setLoading(true)
    try {
      const now = new Date().toISOString()
      await agentStatusDB.updateByAgentId(employee.id, {
        status: "Suspended",
        reason: reason.trim(),
        suspendedBy: currentUser.id,
        suspendedAt: now,
      })

      await audit.create("agents", employee.id, {
        action: "SUSPEND",
        reason: reason.trim(),
        suspendedBy: currentUser.name,
        timestamp: now,
      })

      toast.success("Account suspended successfully", {
        description: `${employee.name}'s account has been suspended.`,
      })

      setReason("")
      onOpenChange(false)
      await onSuspend()
    } catch (error) {
      console.error("Failed to suspend account:", error)
      toast.error("Failed to suspend account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suspend Account</DialogTitle>
          <DialogDescription>
            Suspend {employee?.name}'s account. This action will prevent them from accessing the platform.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Reason for Suspension *</Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for suspending this account..."
              rows={4}
            />
            <p className="text-sm text-muted-foreground mt-1">
              This reason will be logged in the audit trail.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleSuspend} disabled={loading || !reason.trim()}>
            {loading ? "Suspending..." : "Suspend Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Reactivate Account Dialog
function ReactivateAccountDialog({
  open,
  onOpenChange,
  employee,
  onReactivate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee: User | null
  onReactivate: () => Promise<void>
}) {
  const { currentUser } = useAppStore()
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReactivate = async () => {
    if (!employee) return

    setLoading(true)
    try {
      const now = new Date().toISOString()
      await agentStatusDB.updateByAgentId(employee.id, {
        status: "Active",
        reactivatedBy: currentUser.id,
        reactivatedAt: now,
        reason: reason.trim() || undefined,
      })

      await audit.create("agents", employee.id, {
        action: "REACTIVATE",
        reason: reason.trim() || "Account reactivated",
        reactivatedBy: currentUser.name,
        timestamp: now,
      })

      toast.success("Account reactivated successfully", {
        description: `${employee.name}'s account has been reactivated.`,
      })

      setReason("")
      onOpenChange(false)
      await onReactivate()
    } catch (error) {
      console.error("Failed to reactivate account:", error)
      toast.error("Failed to reactivate account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reactivate Account</DialogTitle>
          <DialogDescription>
            Reactivate {employee?.name}'s account. They will regain access to the platform.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Reason for Reactivation (Optional)</Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for reactivating this account..."
              rows={4}
            />
            <p className="text-sm text-muted-foreground mt-1">
              This reason will be logged in the audit trail.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleReactivate} disabled={loading}>
            {loading ? "Reactivating..." : "Reactivate Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Blacklist Dialog
function BlacklistDialog({
  open,
  onOpenChange,
  employee,
  onBlacklist,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee: User | null
  onBlacklist: (agentId: string, reason: string) => Promise<void>
}) {
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)

  const handleBlacklist = async () => {
    if (!employee || !reason.trim()) {
      toast.error("Please provide a reason for blacklisting")
      return
    }

    setLoading(true)
    try {
      await onBlacklist(employee.id, reason.trim())
      setReason("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Blacklist Agent</DialogTitle>
          <DialogDescription>
            Blacklist {employee?.name}. Blacklisted agents will have restricted access to the platform.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Reason for Blacklisting *</Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for blacklisting this agent..."
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleBlacklist} disabled={loading || !reason.trim()}>
            {loading ? "Blacklisting..." : "Blacklist Agent"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Whitelist Dialog
function WhitelistDialog({
  open,
  onOpenChange,
  employee,
  onWhitelist,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee: User | null
  onWhitelist: (agentId: string, reason: string) => Promise<void>
}) {
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)

  const handleWhitelist = async () => {
    if (!employee) return

    setLoading(true)
    try {
      await onWhitelist(employee.id, reason.trim() || "Agent whitelisted for priority access")
      setReason("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Whitelist Agent</DialogTitle>
          <DialogDescription>
            Whitelist {employee?.name}. Whitelisted agents will have priority access and benefits.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Reason for Whitelisting (Optional)</Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for whitelisting this agent..."
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleWhitelist} disabled={loading}>
            {loading ? "Whitelisting..." : "Whitelist Agent"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

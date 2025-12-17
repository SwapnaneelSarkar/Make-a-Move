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
import {
  type AgentAccessMatrix,
  getAgentAccess,
  getDefaultAccessForRole,
  resetAgentAccess,
  upsertAgentAccess,
} from "@/lib/agent-access"
import { Switch } from "@/components/ui/switch"
import { loadMarkupPreferences, persistMarkupPreferences } from "@/lib/markup-settings"

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
  const [permissionDialogOpen, setPermissionDialogOpen] = useState(false)
  const [accessDraft, setAccessDraft] = useState<AgentAccessMatrix | null>(null)
  const [accessCache, setAccessCache] = useState<Record<string, AgentAccessMatrix>>({})
  const [markupPrefs, setMarkupPrefs] = useState(loadMarkupPreferences())
  const [markupDrafts, setMarkupDrafts] = useState<Record<string, number>>({})
  const [markupSaving, setMarkupSaving] = useState<Record<string, boolean>>({})
  const [defaultMarkupInput, setDefaultMarkupInput] = useState(markupPrefs.defaultAgentMarkup)

  // Super Admin sees Agent Admins, Agent Admin sees Agents/Sub Agents
  const isSuperAdmin = currentUser.role === "SUPER_ADMIN"
  const isAgencyAdmin = currentUser.role === "AGENCY_ADMIN"
  const canManageMarkups = canEdit("markups")

  // Load employees and their statuses on mount and when currentUser changes
  useEffect(() => {
    loadEmployees()
  }, [isSuperAdmin, isAgencyAdmin])

  useEffect(() => {
    setMarkupPrefs(loadMarkupPreferences())
  }, [])

  useEffect(() => {
    setDefaultMarkupInput(markupPrefs.defaultAgentMarkup)
  }, [markupPrefs.defaultAgentMarkup])

  useEffect(() => {
    if (employees.length === 0) return
    setMarkupDrafts((prev) => {
      const next = { ...prev }
      employees.forEach((emp) => {
        if (emp.role === "AGENT" || emp.role === "SUB_AGENT") {
          if (next[emp.id] === undefined) {
            next[emp.id] = markupPrefs.agentOverrides[emp.id] ?? markupPrefs.defaultAgentMarkup
          }
        }
      })
      return next
    })
  }, [employees, markupPrefs])

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
    const mapped: Record<string, AgentAccessMatrix> = {}
    filtered.forEach((emp) => {
      mapped[emp.id] = getAgentAccess(emp.id, emp.role)
    })
    setAccessCache(mapped)

    // Load agent statuses
    try {
      const allStatuses = await agentStatusDB.readAll()
      const statusMap: Record<string, AgentStatus> = {}
      allStatuses.forEach((status) => {
        statusMap[status.agentId] = status
      })
      setAgentStatuses(statusMap)
    } catch (error) {
      console.error("Failed to load agent statuses:", error)
      // Set empty status map on error - agents will default to "Active"
      setAgentStatuses({})
    }
  }

  const getAgentStatus = (agentId: string): "Active" | "Suspended" => {
    return agentStatuses[agentId]?.status || "Active"
  }

  const getAgentListStatus = (agentId: string): "Blacklisted" | "Whitelisted" | "Normal" => {
    return blacklistStatuses[agentId] || "Normal"
  }

  const getEffectiveMarkup = (agentId: string) =>
    markupDrafts[agentId] ?? markupPrefs.agentOverrides[agentId] ?? markupPrefs.defaultAgentMarkup

  const handleMarkupInput = (agentId: string, value: string) => {
    const numericValue = Math.max(0, Number(value) || 0)
    setMarkupDrafts((prev) => ({ ...prev, [agentId]: numericValue }))
  }

  const handleSaveMarkup = (agentId: string) => {
    if (!canManageMarkups) return
    const amount = getEffectiveMarkup(agentId)
    const nextPrefs = {
      ...markupPrefs,
      agentOverrides: { ...markupPrefs.agentOverrides, [agentId]: amount },
    }
    setMarkupSaving((prev) => ({ ...prev, [agentId]: true }))
    setMarkupPrefs(nextPrefs)
    persistMarkupPreferences(nextPrefs)
    setMarkupSaving((prev) => ({ ...prev, [agentId]: false }))
    toast.success("Markup updated", {
      description: `Default convenience fees set to ₹${amount} for this agent.`,
    })
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

  useEffect(() => {
    const mapped: Record<string, AgentAccessMatrix> = {}
    employees.forEach((emp) => {
      mapped[emp.id] = getAgentAccess(emp.id, emp.role)
    })
    setAccessCache(mapped)
  }, [employees])

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
    const mapped: Record<string, AgentAccessMatrix> = {}
    filtered.forEach((emp) => {
      mapped[emp.id] = getAgentAccess(emp.id, emp.role)
    })
    setAccessCache(mapped)
  }

  const canAddUser = (isSuperAdmin && canEdit("agents")) || (isAgencyAdmin && canEdit("agents"))

  const handleOpenPermissions = (employee: User) => {
    setSelectedEmployee(employee)
    setAccessDraft(getAgentAccess(employee.id, employee.role))
    setPermissionDialogOpen(true)
  }

  const handleSaveDefaultMarkup = () => {
    if (!canManageMarkups) return
    const amount = Math.max(0, Number(defaultMarkupInput) || 0)
    const nextPrefs = {
      ...markupPrefs,
      defaultAgentMarkup: amount,
    }
    setMarkupPrefs(nextPrefs)
    persistMarkupPreferences(nextPrefs)
    toast.success("Default markup updated", {
      description: `All agents without overrides now use ₹${amount} in bookings.`,
    })
  }

  const handleToggleAgentOverride = (allow: boolean) => {
    if (!canManageMarkups) return
    const nextPrefs = {
      ...markupPrefs,
      allowAgentOverride: allow,
    }
    setMarkupPrefs(nextPrefs)
    persistMarkupPreferences(nextPrefs)
    toast.success(allow ? "Agents can edit markup during checkout" : "Agent markup locked for checkout")
  }

  const handleSavePermissions = () => {
    if (!selectedEmployee || !accessDraft) return
    const updated = upsertAgentAccess(selectedEmployee.id, selectedEmployee.role, accessDraft)
    setAccessCache((prev) => ({ ...prev, [selectedEmployee.id]: updated }))
    audit.create("agents", selectedEmployee.id, {
      action: "PERMISSIONS_UPDATED",
      updatedBy: currentUser.name,
      newValue: updated,
    })
    toast.success("Permissions updated")
    setPermissionDialogOpen(false)
  }

  const handleResetPermissions = () => {
    if (!selectedEmployee) return
    resetAgentAccess(selectedEmployee.id)
    const defaults = getDefaultAccessForRole(selectedEmployee.role)
    setAccessCache((prev) => ({ ...prev, [selectedEmployee.id]: defaults }))
    setAccessDraft(defaults)
    toast.success("Permissions reset to role defaults")
  }

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

      {canManageMarkups && (
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Markup controls</h3>
              <p className="text-sm text-muted-foreground">
                Set default markups for Agents/Sub-Agents and decide if they can adjust fees in the booking flow.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
            <div className="space-y-2">
              <Label>Default agent markup (₹)</Label>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  type="number"
                  value={defaultMarkupInput}
                  onChange={(e) => setDefaultMarkupInput(Math.max(0, Number(e.target.value) || 0))}
                  min={0}
                  className="sm:max-w-xs"
                />
                <Button
                  variant="secondary"
                  onClick={handleSaveDefaultMarkup}
                  disabled={!canManageMarkups}
                >
                  Save default
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Applied to Agents/Sub-Agents without a specific override below. Reflected automatically in checkout pricing.
              </p>
            </div>

            <div className="rounded-md border p-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Allow agent override at checkout</p>
                <p className="text-xs text-muted-foreground">
                  When on, Agents/Sub-Agents can change markup before finalizing a booking.
                </p>
              </div>
              <Switch
                checked={markupPrefs.allowAgentOverride}
                onCheckedChange={(checked) => handleToggleAgentOverride(!!checked)}
                disabled={!canManageMarkups}
              />
            </div>
          </div>
        </div>
      )}

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Policy</TableHead>
              <TableHead>Access</TableHead>
              <TableHead>Markup (₹)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
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
                  {(() => {
                    const access = accessCache[employee.id] || getAgentAccess(employee.id, employee.role)
                    return (
                      <div className="flex flex-wrap gap-1">
                        <Badge variant={access.flights.book ? "default" : "outline"} className="text-xs">
                          Flights: {access.flights.book ? "Book" : access.flights.view ? "View" : "No access"}
                        </Badge>
                        <Badge variant={access.hotels.book ? "default" : "outline"} className="text-xs">
                          Hotels: {access.hotels.book ? "Book" : access.hotels.view ? "View" : "No access"}
                        </Badge>
                        <Badge variant={access.wallet.debit ? "default" : "outline"} className="text-xs">
                          Wallet: {access.wallet.debit ? "Pay" : access.wallet.view ? "View" : "Blocked"}
                        </Badge>
                        <Badge variant={access.markups.edit ? "default" : "outline"} className="text-xs">
                          Markups: {access.markups.edit ? "Edit" : access.markups.view ? "View" : "Hidden"}
                        </Badge>
                      </div>
                    )
                  })()}
                </TableCell>
                <TableCell>
                  {employee.role === "AGENT" || employee.role === "SUB_AGENT" ? (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        className="h-9 w-28"
                        value={getEffectiveMarkup(employee.id)}
                        onChange={(e) => handleMarkupInput(employee.id, e.target.value)}
                        min={0}
                        disabled={!canManageMarkups}
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleSaveMarkup(employee.id)}
                        disabled={!canManageMarkups || markupSaving[employee.id]}
                      >
                        {markupSaving[employee.id] ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Not applicable</span>
                  )}
                </TableCell>
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
                      {(isAgencyAdmin || isSuperAdmin) && (
                        <DropdownMenuItem onClick={() => handleOpenPermissions(employee)}>
                          Manage Permissions
                        </DropdownMenuItem>
                      )}
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

      <PermissionDialog
        open={permissionDialogOpen}
        onOpenChange={setPermissionDialogOpen}
        employee={selectedEmployee}
        accessDraft={accessDraft}
        onChangeAccess={setAccessDraft}
        onSave={handleSavePermissions}
        onReset={handleResetPermissions}
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

function PermissionDialog({
  open,
  onOpenChange,
  employee,
  accessDraft,
  onChangeAccess,
  onSave,
  onReset,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee: User | null
  accessDraft: AgentAccessMatrix | null
  onChangeAccess: (matrix: AgentAccessMatrix | null) => void
  onSave: () => void
  onReset: () => void
}) {
  const updateAccess = (
    section: keyof AgentAccessMatrix,
    key: keyof AgentAccessMatrix[keyof AgentAccessMatrix],
    value: boolean,
  ) => {
    if (!accessDraft) return
    onChangeAccess({
      ...accessDraft,
      [section]: {
        ...(accessDraft[section] as Record<string, boolean>),
        [key]: value,
      },
    } as AgentAccessMatrix)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Manage permissions</DialogTitle>
          <DialogDescription>
            Control what {employee?.name || "this agent"} can view and perform across modules.
          </DialogDescription>
        </DialogHeader>
        {accessDraft && (
          <div className="space-y-4">
            <PermissionSection
              title="Flights"
              description="Control flight search, booking, and cancellations."
              values={accessDraft.flights}
              onChange={(key, value) => updateAccess("flights", key, value)}
            />
            <PermissionSection
              title="Hotels"
              description="Control hotel search, booking, and cancellations."
              values={accessDraft.hotels}
              onChange={(key, value) => updateAccess("hotels", key, value)}
            />
            <PermissionSection
              title="Wallet"
              description="Allow viewing balance and paying with wallet."
              values={accessDraft.wallet}
              labels={{ view: "View balance", debit: "Pay using wallet" }}
              onChange={(key, value) => updateAccess("wallet", key, value)}
            />
            <PermissionSection
              title="Markups"
              description="Allow viewing or editing markups on bookings."
              values={accessDraft.markups}
              labels={{ view: "View markups", edit: "Edit markups" }}
              onChange={(key, value) => updateAccess("markups", key, value)}
            />
            <PermissionSection
              title="Reports"
              description="Allow accessing dashboards and exports."
              values={accessDraft.reports}
              labels={{ view: "View reports", download: "Download/export" }}
              onChange={(key, value) => updateAccess("reports", key, value)}
            />
          </div>
        )}
        <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="outline" onClick={onReset} disabled={!employee}>
            Reset to defaults
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={onSave} disabled={!employee}>
              Save permissions
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function PermissionSection({
  title,
  description,
  values,
  labels,
  onChange,
}: {
  title: string
  description: string
  values: Record<string, boolean>
  labels?: Record<string, string>
  onChange: (key: string, value: boolean) => void
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {Object.entries(values).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between rounded-md border px-3 py-2">
            <div>
              <p className="text-sm font-medium capitalize">{labels?.[key] || key}</p>
              <p className="text-xs text-muted-foreground">{value ? "Allowed" : "Restricted"}</p>
            </div>
            <Switch checked={value} onCheckedChange={(checked) => onChange(key, !!checked)} />
          </div>
        ))}
      </div>
    </div>
  )
}

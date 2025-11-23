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
import { toast } from "sonner"

export default function EmployeesPage() {
  const { currentUser } = useAppStore()
  const { canEdit } = usePermissions()
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [employees, setEmployees] = useState<User[]>([])

  // Super Admin sees Agent Admins, Agent Admin sees Agents/Sub Agents
  const isSuperAdmin = currentUser.role === "SUPER_ADMIN"
  const isAgencyAdmin = currentUser.role === "AGENCY_ADMIN"

  // Load employees on mount and when currentUser changes
  useEffect(() => {
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
  }, [isSuperAdmin, isAgencyAdmin])

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
            {isSuperAdmin ? "Agent Admins" : "Agents"}
          </h1>
          <p className="text-muted-foreground">
            {isSuperAdmin 
              ? "Manage agent admins in the system." 
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
              {isSuperAdmin ? "Add Agent Admin" : "Add Agent"}
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, email, or department..." className="pl-9" />
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
                  <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
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
                      <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
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
      
      toast.success(`${userRole === "AGENCY_ADMIN" ? "Agent Admin" : "Agent"} added successfully`, {
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
            {userRole === "AGENCY_ADMIN" ? "Add Agent Admin" : "Add Agent"}
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

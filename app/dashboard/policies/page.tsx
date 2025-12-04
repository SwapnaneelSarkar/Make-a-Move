"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, Save, Building2, Users } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { usePermissions } from "@/hooks/use-permissions"
import { MOCK_USERS, type User } from "@/lib/mock-data"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"

// Policy Types
interface GlobalPolicy {
  id: string
  name: string
  type: "MASTER_TRAVEL"
  scope: "GLOBAL"
  flightPolicy?: {
    maxDomesticPrice: number
    maxInternationalPrice: number
    allowedCabinClass: "Economy" | "Premium Economy" | "Business" | "All"
    advanceBookingDays: number
  }
  hotelPolicy?: {
    maxRatePerNightMetro: number
    maxRatePerNightOther: number
    minStarRating?: number
    requireAdvanceBooking?: number
  }
  createdAt: string
  updatedAt: string
}

interface AgencyPolicy {
  id: string
  name: string
  agencyId: string
  agencyName: string
  type: "AGENCY_TRAVEL"
  scope: "AGENCY"
  flightPolicy?: {
    maxDomesticPrice: number
    maxInternationalPrice: number
    allowedCabinClass: "Economy" | "Premium Economy" | "Business" | "All"
    advanceBookingDays: number
  }
  hotelPolicy?: {
    maxRatePerNightMetro: number
    maxRatePerNightOther: number
    minStarRating?: number
    requireAdvanceBooking?: number
  }
  approvalWorkflow?: {
    autoApproval: boolean
    managerApproval: boolean
    financeApproval: boolean
    approvalThreshold: number
    escalationDays: number
  }
  assignedAgents: string[]
  createdAt: string
  updatedAt: string
}

// Local Storage Keys
const STORAGE_KEYS = {
  GLOBAL_POLICIES: "global_policies",
  AGENCY_POLICIES: "agency_policies",
}

// Helper functions
function getStoredGlobalPolicies(): GlobalPolicy[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEYS.GLOBAL_POLICIES)
  return stored ? JSON.parse(stored) : []
}

function getStoredAgencyPolicies(): AgencyPolicy[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEYS.AGENCY_POLICIES)
  return stored ? JSON.parse(stored) : []
}

function saveGlobalPolicies(policies: GlobalPolicy[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.GLOBAL_POLICIES, JSON.stringify(policies))
}

function saveAgencyPolicies(policies: AgencyPolicy[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.AGENCY_POLICIES, JSON.stringify(policies))
}

export default function PoliciesPage() {
  const { currentUser } = useAppStore()
  const { canEdit, role } = usePermissions()
  const isSuperAdmin = role === "SUPER_ADMIN"
  const isAgencyAdmin = role === "AGENCY_ADMIN"

  const [globalPolicies, setGlobalPolicies] = useState<GlobalPolicy[]>([])
  const [agencyPolicies, setAgencyPolicies] = useState<AgencyPolicy[]>([])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState<GlobalPolicy | AgencyPolicy | null>(null)

  // Load policies on mount
  useEffect(() => {
    if (isSuperAdmin) {
      setGlobalPolicies(getStoredGlobalPolicies())
    } else if (isAgencyAdmin) {
      const allAgencyPolicies = getStoredAgencyPolicies()
      // Filter policies for current agency (using user ID as agency ID for simplicity)
      setAgencyPolicies(allAgencyPolicies.filter((p) => p.agencyId === currentUser.id))
    }
  }, [isSuperAdmin, isAgencyAdmin, currentUser.id])

  // Get agents for agency admin
  const agencyAgents = isAgencyAdmin
    ? MOCK_USERS.filter((u) => u.role === "AGENT" || u.role === "SUB_AGENT")
    : []

  const handleCreatePolicy = () => {
    if (isSuperAdmin) {
      setSelectedPolicy(null)
      setCreateDialogOpen(true)
    } else if (isAgencyAdmin) {
      setSelectedPolicy(null)
      setCreateDialogOpen(true)
    }
  }

  const handleEditPolicy = (policy: GlobalPolicy | AgencyPolicy) => {
    setSelectedPolicy(policy)
    setEditDialogOpen(true)
  }

  const handleDeletePolicy = (policyId: string) => {
    if (isSuperAdmin) {
      const updated = globalPolicies.filter((p) => p.id !== policyId)
      setGlobalPolicies(updated)
      saveGlobalPolicies(updated)
      toast.success("Global policy deleted successfully")
    } else if (isAgencyAdmin) {
      const updated = agencyPolicies.filter((p) => p.id !== policyId)
      setAgencyPolicies(updated)
      const allAgencyPolicies = getStoredAgencyPolicies()
      const filtered = allAgencyPolicies.filter((p) => p.id !== policyId)
      saveAgencyPolicies(filtered)
      toast.success("Agency policy deleted successfully")
    }
  }

  if (!isSuperAdmin && !isAgencyAdmin) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isSuperAdmin ? "Global Policies" : "Agency Policies"}
          </h1>
          <p className="text-muted-foreground">
            {isSuperAdmin
              ? "Manage platform-wide travel policies. All amounts are in Indian Rupees (₹ INR)."
              : "Configure agency-specific travel policies. All amounts are in Indian Rupees (₹ INR)."}
          </p>
        </div>
        {canEdit("policies") && (
          <Button onClick={handleCreatePolicy}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Policy
        </Button>
        )}
      </div>

      {isSuperAdmin ? (
        <SuperAdminView
          policies={globalPolicies}
          setPolicies={setGlobalPolicies}
          onEdit={handleEditPolicy}
          onDelete={handleDeletePolicy}
          canEdit={canEdit("policies")}
        />
      ) : (
        <AgencyAdminView
          policies={agencyPolicies}
          setPolicies={setAgencyPolicies}
          agents={agencyAgents}
          agencyId={currentUser.id}
          agencyName={currentUser.name}
          onEdit={handleEditPolicy}
          onDelete={handleDeletePolicy}
          canEdit={canEdit("policies")}
        />
      )}

      {/* Create/Edit Policy Dialog */}
      {(createDialogOpen || editDialogOpen) && (
        <PolicyDialog
          open={createDialogOpen || editDialogOpen}
          onClose={() => {
            setCreateDialogOpen(false)
            setEditDialogOpen(false)
            setSelectedPolicy(null)
          }}
          policy={selectedPolicy}
          isSuperAdmin={isSuperAdmin}
          agencyId={currentUser.id}
          agencyName={currentUser.name}
          agents={agencyAgents}
          onSave={(policy) => {
            if (isSuperAdmin) {
              const newPolicy = {
                ...policy,
                id: selectedPolicy?.id || `global-${Date.now()}`,
                createdAt: selectedPolicy?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              } as GlobalPolicy
              const updated = selectedPolicy
                ? globalPolicies.map((p) => (p.id === selectedPolicy.id ? newPolicy : p))
                : [...globalPolicies, newPolicy]
              setGlobalPolicies(updated)
              saveGlobalPolicies(updated)
              toast.success(selectedPolicy ? "Policy updated successfully" : "Policy created successfully")
            } else {
              const newPolicy = {
                ...policy,
                id: selectedPolicy?.id || `agency-${Date.now()}`,
                createdAt: selectedPolicy?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              } as AgencyPolicy
              const updated = selectedPolicy
                ? agencyPolicies.map((p) => (p.id === selectedPolicy.id ? newPolicy : p))
                : [...agencyPolicies, newPolicy]
              setAgencyPolicies(updated)
              const allAgencyPolicies = getStoredAgencyPolicies()
              const filtered = allAgencyPolicies.filter((p) => p.id !== newPolicy.id)
              saveAgencyPolicies([...filtered, newPolicy])
              toast.success(selectedPolicy ? "Policy updated successfully" : "Policy created successfully")
            }
            setCreateDialogOpen(false)
            setEditDialogOpen(false)
            setSelectedPolicy(null)
          }}
        />
      )}
    </div>
  )
}

// Super Admin View Component
function SuperAdminView({
  policies,
  setPolicies,
  onEdit,
  onDelete,
  canEdit,
}: {
  policies: GlobalPolicy[]
  setPolicies: (policies: GlobalPolicy[]) => void
  onEdit: (policy: GlobalPolicy) => void
  onDelete: (id: string) => void
  canEdit: boolean
}) {
  const masterPolicies = policies.filter((p) => p.type === "MASTER_TRAVEL")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Master Travel Policies</CardTitle>
        <CardDescription>Global travel policies that apply platform-wide. Configure flight and hotel rules that all agencies must follow.</CardDescription>
      </CardHeader>
      <CardContent>
        {masterPolicies.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
            No master policies configured. Create one to get started.
          </div>
        ) : (
          <div className="space-y-4">
            {masterPolicies.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                onEdit={() => onEdit(policy)}
                onDelete={() => onDelete(policy.id)}
                canEdit={canEdit}
                type="global"
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Agency Admin View Component
function AgencyAdminView({
  policies,
  setPolicies,
  agents,
  agencyId,
  agencyName,
  onEdit,
  onDelete,
  canEdit,
}: {
  policies: AgencyPolicy[]
  setPolicies: (policies: AgencyPolicy[]) => void
  agents: User[]
  agencyId: string
  agencyName: string
  onEdit: (policy: AgencyPolicy) => void
  onDelete: (id: string) => void
  canEdit: boolean
}) {
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedPolicyForAssign, setSelectedPolicyForAssign] = useState<AgencyPolicy | null>(null)

  const travelPolicies = policies.filter((p) => p.type === "AGENCY_TRAVEL")

  const handleAssignAgents = (policy: AgencyPolicy) => {
    setSelectedPolicyForAssign(policy)
    setAssignDialogOpen(true)
  }

  return (
    <>
      <Tabs value="travel" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="travel">
            <Building2 className="mr-2 h-4 w-4" /> Travel Policies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="travel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agency Travel Policies</CardTitle>
              <CardDescription>Configure travel rules specific to your agency</CardDescription>
            </CardHeader>
            <CardContent>
              {travelPolicies.length === 0 ? (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
                  No travel policies configured. Create one to get started.
                </div>
              ) : (
                <div className="space-y-4">
                  {travelPolicies.map((policy) => (
                    <PolicyCard
                      key={policy.id}
                      policy={policy}
                      onEdit={() => onEdit(policy)}
                      onDelete={() => onDelete(policy.id)}
                      onAssign={() => handleAssignAgents(policy)}
                      canEdit={canEdit}
                      type="agency"
                      agents={agents}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Agent Assignment Dialog */}
      {assignDialogOpen && selectedPolicyForAssign && (
        <AgentAssignmentDialog
          open={assignDialogOpen}
          onClose={() => {
            setAssignDialogOpen(false)
            setSelectedPolicyForAssign(null)
          }}
          policy={selectedPolicyForAssign}
          agents={agents}
          onSave={(assignedAgentIds) => {
            const updated = policies.map((p) =>
              p.id === selectedPolicyForAssign.id ? { ...p, assignedAgents: assignedAgentIds } : p
            )
            setPolicies(updated)
            const allAgencyPolicies = getStoredAgencyPolicies()
            const filtered = allAgencyPolicies.filter((p) => p.id !== selectedPolicyForAssign.id)
            const updatedPolicy = { ...selectedPolicyForAssign, assignedAgents: assignedAgentIds }
            saveAgencyPolicies([...filtered, updatedPolicy])
            toast.success("Agent assignments updated successfully")
            setAssignDialogOpen(false)
            setSelectedPolicyForAssign(null)
          }}
        />
      )}
    </>
  )
}

// Policy Card Component
function PolicyCard({
  policy,
  onEdit,
  onDelete,
  onAssign,
  canEdit,
  type,
  agents,
}: {
  policy: GlobalPolicy | AgencyPolicy
  onEdit: () => void
  onDelete: () => void
  onAssign?: () => void
  canEdit: boolean
  type: "global" | "agency"
  agents?: User[]
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {policy.name}
              <Badge variant={type === "global" ? "default" : "secondary"}>
                {type === "global" ? "Global" : "Agency"}
              </Badge>
            </CardTitle>
            <CardDescription>
              Updated: {new Date(policy.updatedAt).toLocaleDateString()}
            </CardDescription>
          </div>
          {canEdit && (
            <div className="flex gap-2">
              {onAssign && type === "agency" && (
                <Button variant="outline" size="sm" onClick={onAssign}>
                  <Users className="mr-2 h-4 w-4" /> Assign Agents
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="outline" size="sm" onClick={onDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {type === "agency" && "assignedAgents" in policy && (
          <div className="mb-4">
            <Label className="text-sm font-medium">Assigned Agents ({policy.assignedAgents.length})</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {policy.assignedAgents.length === 0 ? (
                <span className="text-sm text-muted-foreground">No agents assigned</span>
              ) : (
                agents
                  ?.filter((a) => policy.assignedAgents.includes(a.id))
                  .map((agent) => (
                    <Badge key={agent.id} variant="outline">
                      {agent.name}
                    </Badge>
                  ))
              )}
            </div>
          </div>
        )}
        <PolicyDetails policy={policy} />
      </CardContent>
    </Card>
  )
}

// Policy Details Component
function PolicyDetails({ policy }: { policy: GlobalPolicy | AgencyPolicy }) {
  if ("flightPolicy" in policy && policy.flightPolicy) {
    return (
      <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Flight Policy</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Max Domestic:</span> ₹{policy.flightPolicy.maxDomesticPrice.toLocaleString('en-IN')} (INR)
                </div>
                <div>
                  <span className="text-muted-foreground">Max International:</span> ₹{policy.flightPolicy.maxInternationalPrice.toLocaleString('en-IN')} (INR)
                </div>
            <div>
              <span className="text-muted-foreground">Cabin Class:</span> {policy.flightPolicy.allowedCabinClass}
            </div>
            <div>
              <span className="text-muted-foreground">Advance Booking:</span> {policy.flightPolicy.advanceBookingDays} days
            </div>
          </div>
        </div>
        {policy.hotelPolicy && (
          <div>
            <h4 className="font-semibold mb-2">Hotel Policy</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Max Metro Rate:</span> ₹{policy.hotelPolicy.maxRatePerNightMetro.toLocaleString('en-IN')}/night (INR)
              </div>
              <div>
                <span className="text-muted-foreground">Max Other Rate:</span> ₹{policy.hotelPolicy.maxRatePerNightOther.toLocaleString('en-IN')}/night (INR)
                  </div>
              {policy.hotelPolicy.minStarRating && (
                <div>
                  <span className="text-muted-foreground">Min Star Rating:</span> {policy.hotelPolicy.minStarRating}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }


  if ("approvalWorkflow" in policy && policy.approvalWorkflow) {
    return (
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Auto-approval:</span>
          <Badge variant={policy.approvalWorkflow.autoApproval ? "default" : "secondary"}>
            {policy.approvalWorkflow.autoApproval ? "Enabled" : "Disabled"}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Manager Approval:</span>
          <Badge variant={policy.approvalWorkflow.managerApproval ? "default" : "secondary"}>
            {policy.approvalWorkflow.managerApproval ? "Required" : "Not Required"}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Finance Approval:</span>
          <Badge variant={policy.approvalWorkflow.financeApproval ? "default" : "secondary"}>
            {policy.approvalWorkflow.financeApproval ? "Required" : "Not Required"}
          </Badge>
        </div>
        <div>
          <span className="text-muted-foreground">Approval Threshold:</span> ₹{policy.approvalWorkflow.approvalThreshold.toLocaleString('en-IN')} (INR)
        </div>
        <div>
          <span className="text-muted-foreground">Escalation Days:</span> {policy.approvalWorkflow.escalationDays} days
        </div>
      </div>
    )
  }

  return <div className="text-sm text-muted-foreground">No details available</div>
}

// Policy Dialog Component (Create/Edit)
function PolicyDialog({
  open,
  onClose,
  policy,
  isSuperAdmin,
  agencyId,
  agencyName,
  agents,
  onSave,
}: {
  open: boolean
  onClose: () => void
  policy: GlobalPolicy | AgencyPolicy | null
  isSuperAdmin: boolean
  agencyId: string
  agencyName: string
  agents: User[]
  onSave: (policy: Partial<GlobalPolicy | AgencyPolicy>) => void
}) {
  const [policyType, setPolicyType] = useState<string>(
    policy?.type || (isSuperAdmin ? "MASTER_TRAVEL" : "AGENCY_TRAVEL")
  )
  const [policyName, setPolicyName] = useState(policy?.name || "")
  
  // Flight Policy
  const [maxDomesticPrice, setMaxDomesticPrice] = useState(
    policy && "flightPolicy" in policy && policy.flightPolicy
      ? policy.flightPolicy.maxDomesticPrice.toString()
      : "15000"
  )
  const [maxInternationalPrice, setMaxInternationalPrice] = useState(
    policy && "flightPolicy" in policy && policy.flightPolicy
      ? policy.flightPolicy.maxInternationalPrice.toString()
      : "50000"
  )
  const [allowedCabinClass, setAllowedCabinClass] = useState(
    policy && "flightPolicy" in policy && policy.flightPolicy
      ? policy.flightPolicy.allowedCabinClass
      : "Economy"
  )
  const [advanceBookingDays, setAdvanceBookingDays] = useState(
    policy && "flightPolicy" in policy && policy.flightPolicy
      ? policy.flightPolicy.advanceBookingDays.toString()
      : "0"
  )

  // Hotel Policy
  const [maxMetroRate, setMaxMetroRate] = useState(
    policy && "hotelPolicy" in policy && policy.hotelPolicy
      ? policy.hotelPolicy.maxRatePerNightMetro.toString()
      : "15000"
  )
  const [maxOtherRate, setMaxOtherRate] = useState(
    policy && "hotelPolicy" in policy && policy.hotelPolicy
      ? policy.hotelPolicy.maxRatePerNightOther.toString()
      : "10000"
  )
  const [minStarRating, setMinStarRating] = useState(
    policy && "hotelPolicy" in policy && policy.hotelPolicy
      ? policy.hotelPolicy.minStarRating?.toString() || ""
      : ""
  )


  // Approval Workflow
  const [autoApproval, setAutoApproval] = useState(
    policy && "approvalWorkflow" in policy && policy.approvalWorkflow
      ? policy.approvalWorkflow.autoApproval
      : true
  )
  const [managerApproval, setManagerApproval] = useState(
    policy && "approvalWorkflow" in policy && policy.approvalWorkflow
      ? policy.approvalWorkflow.managerApproval
      : false
  )
  const [financeApproval, setFinanceApproval] = useState(
    policy && "approvalWorkflow" in policy && policy.approvalWorkflow
      ? policy.approvalWorkflow.financeApproval
      : false
  )
  const [approvalThreshold, setApprovalThreshold] = useState(
    policy && "approvalWorkflow" in policy && policy.approvalWorkflow
      ? policy.approvalWorkflow.approvalThreshold.toString()
      : "50000"
  )
  const [escalationDays, setEscalationDays] = useState(
    policy && "approvalWorkflow" in policy && policy.approvalWorkflow
      ? policy.approvalWorkflow.escalationDays.toString()
      : "3"
  )

  const handleSave = () => {
    if (!policyName.trim()) {
      toast.error("Policy name is required")
      return
    }

    const basePolicy: any = {
      name: policyName,
      type: policyType,
      scope: isSuperAdmin ? "GLOBAL" : "AGENCY",
    }

    if (isSuperAdmin) {
      // Super Admin can only create Master Travel Policies
      basePolicy.flightPolicy = {
        maxDomesticPrice: parseInt(maxDomesticPrice),
        maxInternationalPrice: parseInt(maxInternationalPrice),
        allowedCabinClass,
        advanceBookingDays: parseInt(advanceBookingDays),
      }
      basePolicy.hotelPolicy = {
        maxRatePerNightMetro: parseInt(maxMetroRate),
        maxRatePerNightOther: parseInt(maxOtherRate),
        minStarRating: minStarRating ? parseInt(minStarRating) : undefined,
      }
    } else {
      // Agency Admin
      basePolicy.agencyId = agencyId
      basePolicy.agencyName = agencyName
      basePolicy.assignedAgents = policy && "assignedAgents" in policy ? policy.assignedAgents : []

      if (policyType === "AGENCY_TRAVEL") {
        basePolicy.flightPolicy = {
          maxDomesticPrice: parseInt(maxDomesticPrice),
          maxInternationalPrice: parseInt(maxInternationalPrice),
          allowedCabinClass,
          advanceBookingDays: parseInt(advanceBookingDays),
        }
        basePolicy.hotelPolicy = {
          maxRatePerNightMetro: parseInt(maxMetroRate),
          maxRatePerNightOther: parseInt(maxOtherRate),
          minStarRating: minStarRating ? parseInt(minStarRating) : undefined,
        }
      } else if (policyType === "APPROVAL_WORKFLOW") {
        basePolicy.approvalWorkflow = {
          autoApproval,
          managerApproval,
          financeApproval,
          approvalThreshold: parseInt(approvalThreshold),
          escalationDays: parseInt(escalationDays),
        }
      }
    }

    onSave(basePolicy)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{policy ? "Edit Policy" : "Create New Policy"}</DialogTitle>
          <DialogDescription>
            {isSuperAdmin
              ? "Configure global platform-wide policies. All amounts are in Indian Rupees (₹ INR)."
              : "Configure agency-specific policies. All amounts are in Indian Rupees (₹ INR)."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Policy Name</Label>
            <Input
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
              placeholder="Enter policy name"
            />
          </div>

          {!policy && (
            <div className="space-y-2">
              <Label>Policy Type</Label>
              <Select value={policyType} onValueChange={setPolicyType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {isSuperAdmin ? (
                    <SelectItem value="MASTER_TRAVEL">Master Travel Policy</SelectItem>
                  ) : (
                    <>
                      <SelectItem value="AGENCY_TRAVEL">Agency Travel Policy</SelectItem>
                      <SelectItem value="APPROVAL_WORKFLOW">Approval Workflow</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Master/Agency Travel Policy */}
          {(policyType === "MASTER_TRAVEL" || policyType === "AGENCY_TRAVEL") && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-4">Flight Policy</h4>
                <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>Max Domestic Flight Price (₹ INR)</Label>
                    <Input
                      type="number"
                      value={maxDomesticPrice}
                      onChange={(e) => setMaxDomesticPrice(e.target.value)}
                      placeholder="15000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max International Flight Price (₹ INR)</Label>
                    <Input
                      type="number"
                      value={maxInternationalPrice}
                      onChange={(e) => setMaxInternationalPrice(e.target.value)}
                      placeholder="50000"
                    />
                </div>
                <div className="space-y-2">
                  <Label>Allowed Cabin Class</Label>
                    <Select
                      value={allowedCabinClass}
                      onValueChange={(value) => setAllowedCabinClass(value as "Economy" | "Premium Economy" | "Business" | "All")}
                    >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Economy">Economy Only</SelectItem>
                        <SelectItem value="Premium Economy">Premium Economy</SelectItem>
                        <SelectItem value="Business">Business Class</SelectItem>
                        <SelectItem value="All">All Classes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                    <Label>Advance Booking Requirement (Days)</Label>
                    <Select value={advanceBookingDays} onValueChange={setAdvanceBookingDays}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">None</SelectItem>
                      <SelectItem value="7">7 Days</SelectItem>
                      <SelectItem value="14">14 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Hotel Policy</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Max Nightly Rate - Metro Cities (₹ INR)</Label>
                    <Input
                      type="number"
                      value={maxMetroRate}
                      onChange={(e) => setMaxMetroRate(e.target.value)}
                      placeholder="15000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Nightly Rate - Other Cities (₹ INR)</Label>
                    <Input
                      type="number"
                      value={maxOtherRate}
                      onChange={(e) => setMaxOtherRate(e.target.value)}
                      placeholder="10000"
                    />
                  </div>
                <div className="space-y-2">
                    <Label>Minimum Star Rating (Optional)</Label>
                    <Select
                      value={minStarRating}
                      onValueChange={(value) =>
                        setMinStarRating(value === "any" ? "" : value)
                      }
                    >
                    <SelectTrigger>
                        <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="3">3 Star</SelectItem>
                      <SelectItem value="4">4 Star</SelectItem>
                      <SelectItem value="5">5 Star</SelectItem>
                    </SelectContent>
                  </Select>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Approval Workflow */}
          {policyType === "APPROVAL_WORKFLOW" && (
            <div className="space-y-4">
              <h4 className="font-semibold">Approval Workflow Settings</h4>
              <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-approval</Label>
                  <p className="text-sm text-muted-foreground">
                      Automatically approve bookings within policy limits
                  </p>
                  </div>
                  <Switch checked={autoApproval} onCheckedChange={setAutoApproval} />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Manager Approval</Label>
                    <p className="text-sm text-muted-foreground">Require direct manager approval</p>
                  </div>
                  <Switch checked={managerApproval} onCheckedChange={setManagerApproval} />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Finance Approval</Label>
                    <p className="text-sm text-muted-foreground">Require finance team approval</p>
                  </div>
                  <Switch checked={financeApproval} onCheckedChange={setFinanceApproval} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Approval Threshold (₹ INR)</Label>
                    <Input
                      type="number"
                      value={approvalThreshold}
                      onChange={(e) => setApprovalThreshold(e.target.value)}
                      placeholder="50000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Escalation Days</Label>
                    <Input
                      type="number"
                      value={escalationDays}
                      onChange={(e) => setEscalationDays(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> {policy ? "Update" : "Create"} Policy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Agent Assignment Dialog
function AgentAssignmentDialog({
  open,
  onClose,
  policy,
  agents,
  onSave,
}: {
  open: boolean
  onClose: () => void
  policy: AgencyPolicy
  agents: User[]
  onSave: (agentIds: string[]) => void
}) {
  const [selectedAgents, setSelectedAgents] = useState<string[]>(policy.assignedAgents || [])

  const toggleAgent = (agentId: string) => {
    setSelectedAgents((prev) =>
      prev.includes(agentId) ? prev.filter((id) => id !== agentId) : [...prev, agentId]
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Agents to Policy</DialogTitle>
          <DialogDescription>
            Select which agents should be assigned to "{policy.name}"
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {agents.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">No agents available</div>
            ) : (
              agents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-accent cursor-pointer"
                  onClick={() => toggleAgent(agent.id)}
                >
                  <Checkbox
                    checked={selectedAgents.includes(agent.id)}
                    onCheckedChange={() => toggleAgent(agent.id)}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-sm text-muted-foreground">{agent.email}</div>
                  </div>
                  <Badge variant="outline">{agent.role}</Badge>
          </div>
              ))
            )}
          </div>
    </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(selectedAgents)
            }}
          >
            <Save className="mr-2 h-4 w-4" /> Save Assignments
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CreditCard, DollarSign, Ban, CheckCircle2 } from "lucide-react"
import { usePermissions } from "@/hooks/use-permissions"
import { toast } from "sonner"
import { MOCK_USERS } from "@/lib/mock-data"

interface CreditLimit {
  agentId: string
  agentName: string
  creditLimit: number
  currentBalance: number
  availableCredit: number
  paymentTerms: string
  status: "Active" | "Blocked" | "Warning"
  lastPaymentDate?: string
}

const MOCK_CREDIT_LIMITS: CreditLimit[] = [
  {
    agentId: "u3",
    agentName: "John Agent",
    creditLimit: 100000,
    currentBalance: 45000,
    availableCredit: 55000,
    paymentTerms: "Net 30",
    status: "Active",
    lastPaymentDate: "2024-01-10",
  },
  {
    agentId: "u4",
    agentName: "Jane Sub Agent",
    creditLimit: 50000,
    currentBalance: 48000,
    availableCredit: 2000,
    paymentTerms: "Net 15",
    status: "Warning",
    lastPaymentDate: "2024-01-05",
  },
]

export default function CreditControlPage() {
  const { canView, canEdit } = usePermissions()
  const [creditLimits, setCreditLimits] = useState<CreditLimit[]>(MOCK_CREDIT_LIMITS)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<CreditLimit | null>(null)

  if (!canView("financialReports")) {
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

  const handleUpdateCreditLimit = (agentId: string, newLimit: number, paymentTerms: string) => {
    setCreditLimits((prev) =>
      prev.map((cl) =>
        cl.agentId === agentId
          ? {
              ...cl,
              creditLimit: newLimit,
              availableCredit: newLimit - cl.currentBalance,
              paymentTerms,
            }
          : cl
      )
    )
    toast.success("Credit limit updated successfully")
    setEditDialogOpen(false)
    setSelectedAgent(null)
  }

  const handleBlockAgent = (agentId: string) => {
    setCreditLimits((prev) =>
      prev.map((cl) => (cl.agentId === agentId ? { ...cl, status: "Blocked" as const } : cl))
    )
    toast.success("Agent credit blocked")
  }

  const handleUnblockAgent = (agentId: string) => {
    setCreditLimits((prev) =>
      prev.map((cl) => (cl.agentId === agentId ? { ...cl, status: "Active" as const } : cl))
    )
    toast.success("Agent credit unblocked")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Credit Control System</h1>
          <p className="text-muted-foreground">Manage credit limits, payment terms, and credit control for agents.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Credit Limit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{creditLimits.reduce((sum, cl) => sum + cl.creditLimit, 0).toLocaleString("en-IN")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ₹{creditLimits.reduce((sum, cl) => sum + cl.currentBalance, 0).toLocaleString("en-IN")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Blocked Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {creditLimits.filter((cl) => cl.status === "Blocked").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent Credit Limits</CardTitle>
          <CardDescription>Manage credit limits and payment terms for each agent</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead className="text-right">Credit Limit</TableHead>
                <TableHead className="text-right">Current Balance</TableHead>
                <TableHead className="text-right">Available Credit</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creditLimits.map((limit) => {
                const usagePercent = (limit.currentBalance / limit.creditLimit) * 100
                return (
                  <TableRow key={limit.agentId}>
                    <TableCell className="font-medium">{limit.agentName}</TableCell>
                    <TableCell className="text-right">₹{limit.creditLimit.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="text-right">₹{limit.currentBalance.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="text-right">
                      <span className={limit.availableCredit < limit.creditLimit * 0.1 ? "text-red-600 font-semibold" : ""}>
                        ₹{limit.availableCredit.toLocaleString("en-IN")}
                      </span>
                    </TableCell>
                    <TableCell>{limit.paymentTerms}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge
                          variant="outline"
                          className={
                            limit.status === "Active"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : limit.status === "Blocked"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }
                        >
                          {limit.status}
                        </Badge>
                        {usagePercent > 80 && (
                          <span className="text-xs text-yellow-600">Credit limit {usagePercent.toFixed(0)}% used</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {canEdit("financialReports") && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedAgent(limit)
                                setEditDialogOpen(true)
                              }}
                            >
                              Edit
                            </Button>
                            {limit.status === "Blocked" ? (
                              <Button variant="outline" size="sm" onClick={() => handleUnblockAgent(limit.agentId)}>
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive"
                                onClick={() => handleBlockAgent(limit.agentId)}
                              >
                                <Ban className="h-4 w-4" />
                              </Button>
                            )}
                          </>
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

      {/* Edit Credit Limit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Credit Limit</DialogTitle>
            <DialogDescription>Update credit limit and payment terms for {selectedAgent?.agentName}</DialogDescription>
          </DialogHeader>
          {selectedAgent && (
            <EditCreditLimitForm
              creditLimit={selectedAgent}
              onSave={handleUpdateCreditLimit}
              onCancel={() => {
                setEditDialogOpen(false)
                setSelectedAgent(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function EditCreditLimitForm({
  creditLimit,
  onSave,
  onCancel,
}: {
  creditLimit: CreditLimit
  onSave: (agentId: string, newLimit: number, paymentTerms: string) => void
  onCancel: () => void
}) {
  const [newLimit, setNewLimit] = useState(creditLimit.creditLimit.toString())
  const [paymentTerms, setPaymentTerms] = useState(creditLimit.paymentTerms)

  const handleSave = () => {
    const limit = parseFloat(newLimit)
    if (isNaN(limit) || limit <= 0) {
      toast.error("Please enter a valid credit limit")
      return
    }
    onSave(creditLimit.agentId, limit, paymentTerms)
  }

  return (
    <>
      <div className="space-y-4">
        <div>
          <Label>Credit Limit (₹)</Label>
          <Input
            type="number"
            value={newLimit}
            onChange={(e) => setNewLimit(e.target.value)}
            placeholder="Enter credit limit"
          />
        </div>
        <div>
          <Label>Payment Terms</Label>
          <Select value={paymentTerms} onValueChange={setPaymentTerms}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Net 15">Net 15</SelectItem>
              <SelectItem value="Net 30">Net 30</SelectItem>
              <SelectItem value="Net 45">Net 45</SelectItem>
              <SelectItem value="Net 60">Net 60</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </DialogFooter>
    </>
  )
}















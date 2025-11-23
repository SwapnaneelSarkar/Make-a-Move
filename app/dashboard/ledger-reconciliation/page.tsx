"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, RefreshCw, CheckCircle2, XCircle, AlertCircle, Lock, Unlock, Edit, Flag } from "lucide-react"
import { usePermissions } from "@/hooks/use-permissions"
import { useAppStore } from "@/lib/store"
import { MOCK_USERS } from "@/lib/mock-data"
import { toast } from "sonner"
import { format } from "date-fns"

interface LedgerEntry {
  id: string
  date: string
  description: string
  debit: number
  credit: number
  balance: number
  status: "Matched" | "Unmatched" | "Pending"
  matchedWith?: string
  agencyId?: string
  agencyName?: string
  platformFee?: number
  commissionPaid?: number
}

const MOCK_LEDGER_ENTRIES: LedgerEntry[] = [
  { id: "1", date: "2024-01-15", description: "Flight Booking FL-20240115-ABCD", debit: 25000, credit: 0, balance: 25000, status: "Matched", matchedWith: "TXN-001", agencyId: "u2", agencyName: "Agency A", platformFee: 500, commissionPaid: 250 },
  { id: "2", date: "2024-01-16", description: "Hotel Booking HT-20240116-EFGH", debit: 15000, credit: 0, balance: 40000, status: "Matched", matchedWith: "TXN-002", agencyId: "u2", agencyName: "Agency A", platformFee: 300, commissionPaid: 150 },
  { id: "3", date: "2024-01-17", description: "Wallet Top-up", debit: 0, credit: 50000, balance: -10000, status: "Unmatched", agencyId: "u2", agencyName: "Agency A" },
  { id: "4", date: "2024-01-18", description: "Refund REF-20240118-IJKL", debit: 0, credit: 8000, balance: -18000, status: "Pending", agencyId: "u2", agencyName: "Agency A" },
  { id: "5", date: "2024-01-15", description: "Flight Booking FL-20240115-XYZ", debit: 30000, credit: 0, balance: 30000, status: "Matched", matchedWith: "TXN-003", agencyId: "u5", agencyName: "Agency B", platformFee: 600, commissionPaid: 300 },
  { id: "6", date: "2024-01-16", description: "Hotel Booking HT-20240116-ABC", debit: 20000, credit: 0, balance: 50000, status: "Unmatched", agencyId: "u5", agencyName: "Agency B" },
]

export default function LedgerReconciliationPage() {
  const { canView, role } = usePermissions()
  const { currentUser } = useAppStore()
  const [entries, setEntries] = useState<LedgerEntry[]>(MOCK_LEDGER_ENTRIES)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedAgency, setSelectedAgency] = useState<string>("all")
  const [reconciling, setReconciling] = useState(false)
  const [periodLocked, setPeriodLocked] = useState(false)
  const isSuperAdmin = role === "SUPER_ADMIN"
  const isAgencyAdmin = role === "AGENCY_ADMIN"
  const currentAgencyId = currentUser.id // For Agency Admin, use their ID as agencyId

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

  // Get available agencies for Super Admin dropdown
  const agencies = isSuperAdmin
    ? Array.from(new Set(entries.map((e) => e.agencyId).filter(Boolean))).map((agencyId) => {
        const entry = entries.find((e) => e.agencyId === agencyId)
        return { id: agencyId!, name: entry?.agencyName || "Unknown Agency" }
      })
    : []

  // Filter entries by agency (for Agency Admin) or selected agency (for Super Admin)
  let filteredEntries = entries.filter((e) => {
    if (isAgencyAdmin) {
      // Agency Admin only sees their own agency's entries
      return e.agencyId === currentAgencyId
    } else if (isSuperAdmin && selectedAgency !== "all") {
      // Super Admin can filter by agency
      return e.agencyId === selectedAgency
    }
    return true
  })

  // Filter by status
  filteredEntries = filteredEntries.filter((e) => filterStatus === "all" || e.status === filterStatus)

  const unmatchedCount = filteredEntries.filter((e) => e.status === "Unmatched").length
  const pendingCount = filteredEntries.filter((e) => e.status === "Pending").length

  const handleReconcile = async () => {
    setReconciling(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success("Ledger reconciliation completed", {
        description: "All entries have been matched and verified.",
      })
    } finally {
      setReconciling(false)
    }
  }

  const handleRequestAdjustment = (entryId: string) => {
    toast.info("Adjustment request submitted", {
      description: "Your request has been sent to Super Admin for approval.",
    })
  }

  const handleDirectAdjust = (entryId: string) => {
    toast.success("Entry adjusted successfully")
  }

  const handleLockPeriod = () => {
    setPeriodLocked(true)
    toast.success("Period locked", {
      description: "This period is now locked and cannot be modified.",
    })
  }

  const handleUnlockPeriod = () => {
    setPeriodLocked(false)
    toast.success("Period unlocked", {
      description: "This period can now be modified.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ledger Reconciliation</h1>
          <p className="text-muted-foreground">
            {isSuperAdmin
              ? "Reconcile ledger entries with transactions and identify discrepancies across all agencies."
              : isAgencyAdmin
                ? "Reconcile ledger entries with transactions for your agency."
                : "Reconcile ledger entries with transactions and identify discrepancies."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export {isAgencyAdmin ? "(Agency)" : ""}
          </Button>
          {isSuperAdmin && (
            <>
              <Button onClick={handleReconcile} disabled={reconciling}>
                <RefreshCw className={`mr-2 h-4 w-4 ${reconciling ? "animate-spin" : ""}`} />
                {reconciling ? "Reconciling..." : "Run Reconciliation"}
              </Button>
              {periodLocked ? (
                <Button onClick={handleUnlockPeriod} variant="outline">
                  <Unlock className="mr-2 h-4 w-4" /> Unlock Period
                </Button>
              ) : (
                <Button onClick={handleLockPeriod} variant="outline">
                  <Lock className="mr-2 h-4 w-4" /> Lock Period
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entries.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unmatched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{unmatchedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ledger Entries</CardTitle>
              <CardDescription>
                {isSuperAdmin ? "Review and reconcile ledger entries across all agencies" : "Review and reconcile your agency's ledger entries"}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {isSuperAdmin && (
                <Select value={selectedAgency} onValueChange={setSelectedAgency}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="All Agencies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agencies</SelectItem>
                    {agencies.map((agency) => (
                      <SelectItem key={agency.id} value={agency.id}>
                        {agency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Matched">Matched</SelectItem>
                  <SelectItem value="Unmatched">Unmatched</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {isSuperAdmin && <TableHead>Agency</TableHead>}
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                {isSuperAdmin && <TableHead className="text-right">Platform Fee</TableHead>}
                {isSuperAdmin && <TableHead className="text-right">Commission</TableHead>}
                <TableHead>Status</TableHead>
                <TableHead>Matched With</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isSuperAdmin ? 10 : 8} className="text-center text-muted-foreground">
                    No ledger entries found
                  </TableCell>
                </TableRow>
              ) : (
                filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    {isSuperAdmin && (
                      <TableCell className="font-medium">{entry.agencyName || "-"}</TableCell>
                    )}
                    <TableCell>{format(new Date(entry.date), "MMM d, yyyy")}</TableCell>
                    <TableCell className="font-medium">{entry.description}</TableCell>
                    <TableCell className="text-right">
                      {entry.debit > 0 ? `₹${entry.debit.toLocaleString("en-IN")}` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      {entry.credit > 0 ? `₹${entry.credit.toLocaleString("en-IN")}` : "-"}
                    </TableCell>
                    <TableCell className="text-right">₹{Math.abs(entry.balance).toLocaleString("en-IN")}</TableCell>
                    {isSuperAdmin && (
                      <TableCell className="text-right">
                        {entry.platformFee ? `₹${entry.platformFee.toLocaleString("en-IN")}` : "-"}
                      </TableCell>
                    )}
                    {isSuperAdmin && (
                      <TableCell className="text-right">
                        {entry.commissionPaid ? `₹${entry.commissionPaid.toLocaleString("en-IN")}` : "-"}
                      </TableCell>
                    )}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          entry.status === "Matched"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : entry.status === "Unmatched"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {entry.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{entry.matchedWith || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {entry.status !== "Matched" && isSuperAdmin && !periodLocked && (
                          <Button variant="ghost" size="sm">Match</Button>
                        )}
                        {isSuperAdmin && !periodLocked && (
                          <Button variant="ghost" size="sm" onClick={() => handleDirectAdjust(entry.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {isAgencyAdmin && (
                          <Button variant="ghost" size="sm" onClick={() => handleRequestAdjustment(entry.id)}>
                            <Flag className="h-4 w-4 mr-1" /> Request
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


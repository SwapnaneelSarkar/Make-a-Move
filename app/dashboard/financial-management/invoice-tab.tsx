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
import { Upload, Download, CheckCircle2, XCircle, FileSpreadsheet, Flag, Edit } from "lucide-react"
import { usePermissions } from "@/hooks/use-permissions"
import { useAppStore } from "@/lib/store"
import { toast } from "sonner"
import { format } from "date-fns"

interface SupplierInvoice {
  id: string
  invoiceNumber: string
  supplierName: string
  invoiceDate: string
  amount: number
  status: "Pending" | "Matched" | "Discrepancy" | "Reconciled"
  matchedBookingId?: string
  discrepancy?: string
  uploadedAt: string
  agencyId?: string
  agencyName?: string
  expectedAmount?: number
}

const MOCK_INVOICES: SupplierInvoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    supplierName: "Air India",
    invoiceDate: "2024-01-15",
    amount: 25000,
    status: "Matched",
    matchedBookingId: "FL-20240115-ABCD",
    uploadedAt: "2024-01-16T10:00:00",
    agencyId: "u2",
    agencyName: "Agency A",
    expectedAmount: 25000,
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    supplierName: "Taj Hotels",
    invoiceDate: "2024-01-16",
    amount: 15000,
    status: "Discrepancy",
    matchedBookingId: "HT-20240116-EFGH",
    discrepancy: "Amount mismatch: Expected ₹14,000, Received ₹15,000",
    uploadedAt: "2024-01-17T14:30:00",
    agencyId: "u2",
    agencyName: "Agency A",
    expectedAmount: 14000,
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003",
    supplierName: "IndiGo",
    invoiceDate: "2024-01-18",
    amount: 18000,
    status: "Pending",
    uploadedAt: "2024-01-19T09:15:00",
    agencyId: "u2",
    agencyName: "Agency A",
    expectedAmount: 18000,
  },
  {
    id: "4",
    invoiceNumber: "INV-2024-004",
    supplierName: "Vistara",
    invoiceDate: "2024-01-19",
    amount: 22000,
    status: "Matched",
    matchedBookingId: "FL-20240119-XYZ",
    uploadedAt: "2024-01-20T09:00:00",
    agencyId: "u5",
    agencyName: "Agency B",
    expectedAmount: 22000,
  },
]

export default function InvoiceReconciliationTab() {
  const { role } = usePermissions()
  const { currentUser } = useAppStore()
  const [invoices, setInvoices] = useState<SupplierInvoice[]>(MOCK_INVOICES)
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedAgency, setSelectedAgency] = useState<string>("all")
  const isSuperAdmin = role === "SUPER_ADMIN"
  const isAgencyAdmin = role === "AGENCY_ADMIN"
  const currentAgencyId = currentUser.id

  // Get available agencies for Super Admin dropdown
  const agencies = isSuperAdmin
    ? Array.from(new Set(invoices.map((i) => i.agencyId).filter(Boolean))).map((agencyId) => {
        const invoice = invoices.find((i) => i.agencyId === agencyId)
        return { id: agencyId!, name: invoice?.agencyName || "Unknown Agency" }
      })
    : []

  // Filter invoices by agency
  let filteredInvoices = invoices.filter((i) => {
    if (isAgencyAdmin) {
      return i.agencyId === currentAgencyId
    } else if (isSuperAdmin && selectedAgency !== "all") {
      return i.agencyId === selectedAgency
    }
    return true
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
        toast.error("Please upload a CSV or Excel file")
        return
      }
      setSelectedFile(file)
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error("Please select a file")
      return
    }

    try {
      // Simulate import
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Add mock imported invoice
      const newInvoice: SupplierInvoice = {
        id: Date.now().toString(),
        invoiceNumber: `INV-2024-${String(invoices.length + 1).padStart(3, "0")}`,
        supplierName: "Imported Supplier",
        invoiceDate: new Date().toISOString().split("T")[0],
        amount: 20000,
        status: "Pending",
        uploadedAt: new Date().toISOString(),
      }
      
      setInvoices([newInvoice, ...invoices])
      toast.success("Invoices imported successfully", {
        description: `Imported ${selectedFile.name}`,
      })
      setImportDialogOpen(false)
      setSelectedFile(null)
    } catch (error) {
      toast.error("Failed to import invoices")
    }
  }

  const handleReconcile = async (invoiceId: string) => {
    if (!isSuperAdmin) {
      toast.error("Only Super Admin can reconcile invoices")
      return
    }
    try {
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === invoiceId ? { ...inv, status: "Reconciled" as const } : inv
        )
      )
      toast.success("Invoice reconciled successfully")
    } catch (error) {
      toast.error("Failed to reconcile invoice")
    }
  }

  const handleFlagDiscrepancy = (invoiceId: string) => {
    const invoice = invoices.find((i) => i.id === invoiceId)
    if (invoice) {
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === invoiceId
            ? {
                ...inv,
                status: "Discrepancy" as const,
                discrepancy: inv.discrepancy || `Flagged by ${currentUser.name} - Amount mismatch detected`,
              }
            : inv
        )
      )
      toast.success("Discrepancy flagged", {
        description: "Super Admin has been notified of this discrepancy.",
      })
    }
  }

  const handleRequestAdjustment = (invoiceId: string) => {
    toast.info("Adjustment request submitted", {
      description: "Your request has been sent to Super Admin for approval.",
    })
  }

  const handleResolveDiscrepancy = (invoiceId: string) => {
    if (!isSuperAdmin) {
      toast.error("Only Super Admin can resolve discrepancies")
      return
    }
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? { ...inv, status: "Matched" as const, discrepancy: undefined }
          : inv
      )
    )
    toast.success("Discrepancy resolved")
  }

  const pendingCount = filteredInvoices.filter((i) => i.status === "Pending").length
  const discrepancyCount = filteredInvoices.filter((i) => i.status === "Discrepancy").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Supplier Invoice Reconciliation</h2>
          <p className="text-muted-foreground">
            {isSuperAdmin
              ? "Import and reconcile supplier invoices with bookings across all agencies."
              : isAgencyAdmin
                ? "View and reconcile supplier invoices for your agency bookings."
                : "Import and reconcile supplier invoices with bookings."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export {isAgencyAdmin ? "(Agency)" : ""}
          </Button>
          {isSuperAdmin && (
            <Button onClick={() => setImportDialogOpen(true)}>
              <Upload className="mr-2 h-4 w-4" /> Import Invoices
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredInvoices.length}</div>
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
            <CardTitle className="text-sm font-medium">Discrepancies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{discrepancyCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Supplier Invoices</CardTitle>
              <CardDescription>
                {isSuperAdmin ? "Review and reconcile supplier invoices across all agencies" : "Review supplier invoices for your agency"}
              </CardDescription>
            </div>
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
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {isSuperAdmin && <TableHead>Agency</TableHead>}
                <TableHead>Invoice Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Invoice Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                {isSuperAdmin && <TableHead className="text-right">Expected</TableHead>}
                <TableHead>Status</TableHead>
                <TableHead>Matched Booking</TableHead>
                <TableHead>Discrepancy</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isSuperAdmin ? 10 : 8} className="text-center text-muted-foreground">
                    No invoices found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    {isSuperAdmin && (
                      <TableCell className="font-medium">{invoice.agencyName || "-"}</TableCell>
                    )}
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.supplierName}</TableCell>
                    <TableCell>{format(new Date(invoice.invoiceDate), "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-right">₹{invoice.amount.toLocaleString("en-IN")}</TableCell>
                    {isSuperAdmin && (
                      <TableCell className="text-right">
                        {invoice.expectedAmount ? `₹${invoice.expectedAmount.toLocaleString("en-IN")}` : "-"}
                      </TableCell>
                    )}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          invoice.status === "Reconciled"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : invoice.status === "Matched"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : invoice.status === "Discrepancy"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{invoice.matchedBookingId || "-"}</TableCell>
                    <TableCell className="max-w-xs">
                      {invoice.discrepancy ? (
                        <span className="text-sm text-red-600">{invoice.discrepancy}</span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {isSuperAdmin && invoice.status !== "Reconciled" && (
                          <Button variant="outline" size="sm" onClick={() => handleReconcile(invoice.id)}>
                            Reconcile
                          </Button>
                        )}
                        {isSuperAdmin && invoice.status === "Discrepancy" && (
                          <Button variant="outline" size="sm" onClick={() => handleResolveDiscrepancy(invoice.id)}>
                            Resolve
                          </Button>
                        )}
                        {isAgencyAdmin && invoice.status === "Discrepancy" && (
                          <Button variant="outline" size="sm" onClick={() => handleRequestAdjustment(invoice.id)}>
                            <Flag className="h-4 w-4 mr-1" /> Request
                          </Button>
                        )}
                        {isAgencyAdmin && invoice.status !== "Discrepancy" && invoice.status !== "Reconciled" && (
                          <Button variant="outline" size="sm" onClick={() => handleFlagDiscrepancy(invoice.id)}>
                            <Flag className="h-4 w-4 mr-1" /> Flag
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

      {/* Import Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Supplier Invoices</DialogTitle>
            <DialogDescription>
              Upload a CSV or Excel file containing supplier invoice data
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Select File</Label>
              <Input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Supported formats: CSV, Excel (.xlsx, .xls)
              </p>
              {selectedFile && (
                <div className="mt-2 p-2 bg-muted rounded-lg flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span className="text-sm">{selectedFile.name}</span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setImportDialogOpen(false)
              setSelectedFile(null)
            }}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={!selectedFile}>
              Import Invoices
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


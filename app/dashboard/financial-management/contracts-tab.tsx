"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Download, FileText } from "lucide-react"
import { usePermissions } from "@/hooks/use-permissions"
import { toast } from "sonner"
import { format } from "date-fns"

interface Contract {
  id: string
  contractId: string
  supplierName: string
  contractType: "Supplier" | "Agency" | "Service"
  startDate: string
  endDate: string
  status: "Active" | "Expired" | "Pending"
  documentUrl?: string
  value?: number
  createdAt: string
}

const MOCK_CONTRACTS: Contract[] = [
  {
    id: "1",
    contractId: "CNT-2024-001",
    supplierName: "Air India",
    contractType: "Supplier",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "Active",
    value: 5000000,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    contractId: "CNT-2024-002",
    supplierName: "Taj Hotels",
    contractType: "Supplier",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    status: "Active",
    value: 3000000,
    createdAt: "2024-03-01",
  },
  {
    id: "3",
    contractId: "CNT-2023-015",
    supplierName: "Travel Agency ABC",
    contractType: "Agency",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    status: "Expired",
    value: 2000000,
    createdAt: "2023-06-01",
  },
]

export default function ContractsTab() {
  const { canEdit } = usePermissions()
  const [contracts, setContracts] = useState<Contract[]>(MOCK_CONTRACTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredContracts = contracts.filter((c) => {
    const matchesSearch =
      !searchQuery ||
      c.contractId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || c.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleAddContract = (contract: Omit<Contract, "id" | "contractId" | "createdAt">) => {
    const newContract: Contract = {
      ...contract,
      id: Date.now().toString(),
      contractId: `CNT-${new Date().getFullYear()}-${String(contracts.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString(),
    }
    setContracts([...contracts, newContract])
    toast.success("Contract added successfully")
    setAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Contract Repository</h2>
          <p className="text-muted-foreground">Maintain and manage supplier, agency, and service contracts.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          {canEdit("systemSettings") && (
            <Button onClick={() => setAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Contract
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contracts..."
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
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract ID</TableHead>
                <TableHead>Supplier/Agency</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    No contracts found
                  </TableCell>
                </TableRow>
              ) : (
                filteredContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.contractId}</TableCell>
                    <TableCell>{contract.supplierName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{contract.contractType}</Badge>
                    </TableCell>
                    <TableCell>{format(new Date(contract.startDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>{format(new Date(contract.endDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>₹{contract.value?.toLocaleString("en-IN") || "N/A"}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          contract.status === "Active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : contract.status === "Expired"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        {canEdit("systemSettings") && <Button variant="ghost" size="sm">Edit</Button>}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Contract</DialogTitle>
            <DialogDescription>Add a new contract to the repository</DialogDescription>
          </DialogHeader>
          <AddContractForm
            onSave={handleAddContract}
            onCancel={() => setAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function AddContractForm({
  onSave,
  onCancel,
}: {
  onSave: (contract: Omit<Contract, "id" | "contractId" | "createdAt">) => void
  onCancel: () => void
}) {
  const [supplierName, setSupplierName] = useState("")
  const [contractType, setContractType] = useState<"Supplier" | "Agency" | "Service">("Supplier")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [value, setValue] = useState("")
  const [documentUrl, setDocumentUrl] = useState("")

  const handleSubmit = () => {
    if (!supplierName || !startDate || !endDate) {
      toast.error("Please fill in all required fields")
      return
    }

    onSave({
      supplierName,
      contractType,
      startDate,
      endDate,
      status: "Pending",
      value: value ? parseFloat(value) : undefined,
      documentUrl: documentUrl || undefined,
    })
  }

  return (
    <>
      <div className="space-y-4">
        <div>
          <Label>Supplier/Agency Name *</Label>
          <Input
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            placeholder="Enter supplier or agency name"
          />
        </div>
        <div>
          <Label>Contract Type *</Label>
          <Select value={contractType} onValueChange={(v) => setContractType(v as "Supplier" | "Agency" | "Service")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Supplier">Supplier</SelectItem>
              <SelectItem value="Agency">Agency</SelectItem>
              <SelectItem value="Service">Service</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Start Date *</Label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <Label>End Date *</Label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        <div>
          <Label>Contract Value (₹)</Label>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter contract value"
          />
        </div>
        <div>
          <Label>Document URL</Label>
          <Input
            value={documentUrl}
            onChange={(e) => setDocumentUrl(e.target.value)}
            placeholder="Enter document URL or path"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Add Contract</Button>
      </DialogFooter>
    </>
  )
}













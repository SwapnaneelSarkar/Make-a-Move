"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Filter, Search, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import { getAuditLogs, type AuditLogEntry, type ModuleType } from "@/lib/stage-management"
import { MOCK_USERS } from "@/lib/mock-data"

function getUserName(userId: string): string {
  const user = MOCK_USERS.find((u) => u.id === userId)
  return user?.name || userId
}

// Mock Audit Data
const MOCK_AUDIT_LOGS = [
  {
    id: 1,
    timestamp: new Date().toISOString(),
    user: "Alex Super",
    role: "SUPER_ADMIN",
    action: "UPDATE",
    module: "Policies",
    target: "Global Travel Policy",
    changes: "Max flight price updated: ₹50,000 -> ₹60,000",
    ip: "192.168.1.1",
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "Sarah Corp",
    role: "AGENCY_ADMIN",
    action: "CREATE",
    module: "Bookings",
    target: "Flight Booking #B-7821",
    changes: "New booking created",
    ip: "10.0.0.5",
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: "Alex Super",
    role: "SUPER_ADMIN",
    action: "APPROVE",
    module: "KYC",
    target: "Global Horizons Travel",
    changes: "Status: PENDING -> APPROVED",
    ip: "192.168.1.1",
  },
  {
    id: 4,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    user: "John Agent",
    role: "AGENT",
    action: "CANCEL",
    module: "Bookings",
    target: "Hotel Booking #H-9923",
    changes: "Booking cancelled by user",
    ip: "172.16.0.23",
  },
  {
    id: 5,
    timestamp: new Date(Date.now() - 90000000).toISOString(),
    user: "Alex Super",
    role: "SUPER_ADMIN",
    action: "REVEAL",
    module: "Security",
    target: "User PAN Data",
    changes: "Sensitive data unmasked",
    ip: "192.168.1.1",
  },
]

export default function AuditLogsPage() {
  const [filterAction, setFilterAction] = useState("ALL")
  const [filterModule, setFilterModule] = useState<ModuleType | "ALL">("ALL")
  const [searchTerm, setSearchTerm] = useState("")
  const [stageLogs, setStageLogs] = useState<AuditLogEntry[]>([])

  useEffect(() => {
    // Load stage transition logs
    const logs = getAuditLogs(filterModule !== "ALL" ? filterModule : undefined)
    setStageLogs(logs)
  }, [filterModule])

  const filteredLogs = MOCK_AUDIT_LOGS.filter((log) => {
    const matchesAction = filterAction === "ALL" || log.action === filterAction
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesAction && matchesSearch
  })

  const filteredStageLogs = stageLogs.filter((log) => {
    const matchesModule = filterModule === "ALL" || log.module === filterModule
    const matchesSearch =
      log.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.previousStage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.updatedStage.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesModule && matchesSearch
  })

  const getActionColor = (action: string) => {
    switch (action) {
      case "CREATE":
        return "bg-green-100 text-green-700 border-green-200"
      case "UPDATE":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "DELETE":
        return "bg-red-100 text-red-700 border-red-200"
      case "APPROVE":
        return "bg-teal-100 text-teal-700 border-teal-200"
      case "REVEAL":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="container max-w-7xl py-8 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Track all system activities, security events, and data access.</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <Card className="border-none shadow-lg overflow-hidden">
        <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by User or Module..."
              className="pl-9 bg-white border-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Select value={filterAction} onValueChange={setFilterAction}>
              <SelectTrigger className="w-[180px] bg-white border-none shadow-sm">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter Action" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Actions</SelectItem>
                <SelectItem value="CREATE">Create</SelectItem>
                <SelectItem value="UPDATE">Update</SelectItem>
                <SelectItem value="DELETE">Delete</SelectItem>
                <SelectItem value="APPROVE">Approve</SelectItem>
                <SelectItem value="REVEAL">Reveal Data</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterModule} onValueChange={(value) => setFilterModule(value as ModuleType | "ALL")}>
              <SelectTrigger className="w-[180px] bg-white border-none shadow-sm">
                <SelectValue placeholder="Filter Module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Modules</SelectItem>
                <SelectItem value="FLIGHT">Flights</SelectItem>
                <SelectItem value="HOTEL">Hotels</SelectItem>
                <SelectItem value="REFUND">Refunds</SelectItem>
                <SelectItem value="DISPUTE">Disputes</SelectItem>
                <SelectItem value="WALLET">Wallet</SelectItem>
                <SelectItem value="KYC">KYC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stage Transition Logs */}
        {filteredStageLogs.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Stage Transitions</h3>
            <div className="rounded-md border-t">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Reference ID</TableHead>
                    <TableHead>Stage Transition</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead className="text-right">IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStageLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs text-muted-foreground">{log.timestamp}</TableCell>
                      <TableCell>
                        <span className="font-medium text-sm">{getUserName(log.updatedBy)}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium">
                          {log.module}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{log.referenceId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{log.previousStage}</span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm font-medium">{log.updatedStage}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                        {log.remarks || "-"}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-muted-foreground">
                        {log.ipAddress || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Other Audit Logs */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Other Activities</h3>
          <div className="rounded-md border-t">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User & Role</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right">IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {format(new Date(log.timestamp), "MMM d, HH:mm:ss")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{log.user}</span>
                        <span className="text-[10px] text-muted-foreground">{log.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getActionColor(log.action)} font-medium`}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{log.module}</TableCell>
                    <TableCell>
                      <div className="flex flex-col max-w-[300px]">
                        <span className="font-medium text-sm truncate">{log.target}</span>
                        <span className="text-xs text-muted-foreground truncate">{log.changes}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePermissions } from "@/hooks/use-permissions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface ErrorLog {
  id: string
  timestamp: string
  type: string
  module: string
  user: string
  message: string
  status: "new" | "acknowledged" | "resolved"
}

const MOCK_ERRORS: ErrorLog[] = [
  {
    id: "1",
    timestamp: "2024-05-20T10:30:00",
    type: "Payment Error",
    module: "Wallet",
    user: "agent@example.com",
    message: "Payment gateway timeout",
    status: "new",
  },
  {
    id: "2",
    timestamp: "2024-05-20T09:15:00",
    type: "API Error",
    module: "Bookings",
    user: "admin@example.com",
    message: "Flight API connection failed",
    status: "acknowledged",
  },
  {
    id: "3",
    timestamp: "2024-05-19T14:20:00",
    type: "Database Error",
    module: "Reports",
    user: "finance@example.com",
    message: "Query timeout",
    status: "resolved",
  },
  {
    id: "4",
    timestamp: "2024-05-19T11:45:00",
    type: "Validation Error",
    module: "KYC",
    user: "kyc@example.com",
    message: "Document upload failed",
    status: "new",
  },
]

export default function ErrorMonitoringPage() {
  const { canView } = usePermissions()
  const [statusFilter, setStatusFilter] = useState<string>("all")

  if (!canView("systemSettings")) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You do not have permission to access error monitoring. Only Super Admins can access this page.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const filteredErrors = MOCK_ERRORS.filter((error) => {
    if (statusFilter === "all") return true
    return error.status === statusFilter
  })

  const getStatusBadge = (status: ErrorLog["status"]) => {
    switch (status) {
      case "new":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">New</Badge>
      case "acknowledged":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">Acknowledged</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">Resolved</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Error Monitoring</h1>
          <p className="text-muted-foreground">Monitor and track system errors and issues.</p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="acknowledged">Acknowledged</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Error Logs</CardTitle>
          <CardDescription>Recent system errors and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Error Type</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredErrors.map((error) => (
                <TableRow key={error.id}>
                  <TableCell>{formatDate(error.timestamp)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{error.type}</Badge>
                  </TableCell>
                  <TableCell>{error.module}</TableCell>
                  <TableCell className="font-mono text-sm">{error.user}</TableCell>
                  <TableCell className="max-w-md truncate">{error.message}</TableCell>
                  <TableCell>{getStatusBadge(error.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}







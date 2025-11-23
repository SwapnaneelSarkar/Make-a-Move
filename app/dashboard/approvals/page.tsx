"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MOCK_BOOKINGS } from "@/lib/mock-data"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { usePermissions } from "@/hooks/use-permissions"

export default function ApprovalsPage() {
  const { canView, canApprove } = usePermissions()
  const pendingBookings = MOCK_BOOKINGS.filter((b) => b.status === "PENDING_APPROVAL")
  const pastBookings = MOCK_BOOKINGS.filter((b) => b.status !== "PENDING_APPROVAL")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Approvals</h1>
        <p className="text-muted-foreground">Review and action agent booking requests.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingBookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Policy Violations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Approval Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 hrs</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-4">
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Policy Check</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">#{booking.id.toUpperCase()}</TableCell>
                    <TableCell>
                      <div className="font-medium">{booking.agentName}</div>
                      <div className="text-xs text-muted-foreground">Sales Team</div>
                    </TableCell>
                    <TableCell className="capitalize">{booking.type.toLowerCase()}</TableCell>
                    <TableCell>
                      {booking.type === "HOTEL" ? booking.details.name : "Flight Details"}
                      <div className="text-xs text-muted-foreground">{formatDate(booking.date)}</div>
                    </TableCell>
                    <TableCell>₹{booking.amount.toLocaleString("en-IN")}</TableCell>
                    <TableCell>
                      {booking.details.policyCompliant === false ? (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                          <AlertCircle className="mr-1 h-3 w-3" /> Violation
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-green-500 text-green-600">
                          <CheckCircle className="mr-1 h-3 w-3" /> Compliant
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive bg-transparent"
                        >
                          <XCircle className="mr-2 h-4 w-4" /> Reject
                        </Button>
                        {canApprove("allBookings") && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-2 h-4 w-4" /> Approve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="rounded-md border bg-card">
            <div className="p-8 text-center text-muted-foreground">No historical records found.</div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

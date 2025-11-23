"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MOCK_BOOKINGS } from "@/lib/mock-data"
import { Plane, Hotel, CheckCircle, Clock, XCircle } from "lucide-react"
import { formatDate } from "@/lib/utils"

export function RecentBookings() {
  const getIcon = (type: string) => {
    switch (type) {
      case "FLIGHT":
        return <Plane className="h-4 w-4" />
      case "HOTEL":
        return <Hotel className="h-4 w-4" />
      default:
        return <Plane className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" /> Confirmed
          </Badge>
        )
      case "PENDING_APPROVAL":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      case "CANCELLED":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" /> Cancelled
          </Badge>
        )
      case "COMPLETED":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Completed
          </Badge>
        )
      case "REFUNDED":
        return (
          <Badge className="bg-[#6B7280] hover:bg-[#6B7280]/90 text-white">
            Refunded
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Recent Bookings</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_BOOKINGS.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {getIcon(booking.type)}
                    <span className="capitalize">{booking.type.toLowerCase()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {booking.type === "FLIGHT" ? (
                    <span>
                      {booking.details.departure.city} to {booking.details.arrival.city}
                    </span>
                  ) : booking.type === "HOTEL" ? (
                    <span>{booking.details.name}</span>
                  ) : (
                    <span>{booking.details.pickup || "Trip Details"}</span>
                  )}
                </TableCell>
                <TableCell>{formatDate(booking.date)}</TableCell>
                <TableCell>{booking.agentName}</TableCell>
                <TableCell>₹{booking.amount.toLocaleString("en-IN")}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

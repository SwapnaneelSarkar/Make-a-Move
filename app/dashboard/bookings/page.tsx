"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ChevronDown, MoreHorizontal, Search, Download, Trash2, Send, FileSpreadsheet, FileText } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { bookingsDB, type Booking } from "@/lib/local-db"
import { exportBookings } from "@/lib/export-utils"
import { formatDate } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { audit } from "@/lib/audit-utils"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedBookings, setSelectedBookings] = React.useState<string[]>([])
  const [isAlertOpen, setIsAlertOpen] = React.useState(false)
  const [actionType, setActionType] = React.useState<string | null>(null)

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      setLoading(true)
      const allBookings = await bookingsDB.readAll()
      setBookings(allBookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    } catch (error) {
      console.error("Failed to load bookings:", error)
      toast.error("Failed to load bookings")
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBookings(filteredBookings.map((b) => b.id))
    } else {
      setSelectedBookings([])
    }
  }

  const handleSelectBooking = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedBookings((prev) => [...prev, id])
    } else {
      setSelectedBookings((prev) => prev.filter((item) => item !== id))
    }
  }

  const handleBulkAction = (action: string) => {
    setActionType(action)
    setIsAlertOpen(true)
  }

  const executeAction = async () => {
    const count = selectedBookings.length
    let message = ""

    try {
      if (actionType === "cancel") {
        for (const id of selectedBookings) {
          await bookingsDB.update(id, { status: "CANCELLED" })
          await audit.update("bookings", id, { status: "CONFIRMED" }, { status: "CANCELLED" })
        }
        message = `${count} bookings cancelled successfully`
        await loadBookings()
      } else if (actionType === "export_csv") {
        const selected = bookings.filter((b) => selectedBookings.includes(b.id))
        exportBookings(selected, "csv")
        message = `${count} bookings exported to CSV`
      } else if (actionType === "export_excel") {
        const selected = bookings.filter((b) => selectedBookings.includes(b.id))
        exportBookings(selected, "excel")
        message = `${count} bookings exported to Excel`
      } else if (actionType === "export_pdf") {
        const selected = bookings.filter((b) => selectedBookings.includes(b.id))
        exportBookings(selected, "pdf")
        message = `${count} bookings exported to PDF`
      }

      toast.success("Bulk Operation Successful", {
        description: message,
      })
      setSelectedBookings([])
      setIsAlertOpen(false)
      setActionType(null)
    } catch (error) {
      console.error("Failed to execute action:", error)
      toast.error("Failed to execute action")
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      searchQuery === "" ||
      booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.pnr.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesType = typeFilter === "all" || booking.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Bookings</h1>
          <p className="text-muted-foreground">Manage and track all travel reservations.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="FLIGHT">Flight</SelectItem>
                  <SelectItem value="HOTEL">Hotel</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="PENDING_APPROVAL">Pending</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedBookings.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{selectedBookings.length} selected</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Bulk Actions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Export</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleBulkAction("export_csv")}>
                      <Download className="mr-2 h-4 w-4" /> Export CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction("export_excel")}>
                      <FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction("export_pdf")}>
                      <FileText className="mr-2 h-4 w-4" /> Export PDF
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleBulkAction("cancel")} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Cancel Booking
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                  />
                </TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>PNR</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">No bookings found</TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id} data-state={selectedBookings.includes(booking.id) ? "selected" : undefined}>
                    <TableCell>
                      <Checkbox
                        checked={selectedBookings.includes(booking.id)}
                        onCheckedChange={(checked) => handleSelectBooking(booking.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{booking.bookingId}</TableCell>
                    <TableCell>{booking.pnr}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{booking.type}</Badge>
                    </TableCell>
                    <TableCell>{booking.agentName}</TableCell>
                    <TableCell>{formatDate(booking.date)}</TableCell>
                    <TableCell>₹{booking.amount.toLocaleString("en-IN")}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          booking.status === "CONFIRMED" || booking.status === "COMPLETED"
                            ? "default"
                            : booking.status === "PENDING_APPROVAL"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {booking.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will be applied to {selectedBookings.length} selected bookings.
              {actionType === "cancel" && " This process cannot be undone."}
              {actionType?.startsWith("export") && " The file will be downloaded."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeAction}
              className={actionType === "cancel" ? "bg-destructive hover:bg-destructive/90" : ""}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

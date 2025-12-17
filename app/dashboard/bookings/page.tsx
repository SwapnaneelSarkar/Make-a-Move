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
import { bookingsDB, transactionsDB, type Booking, type Transaction } from "@/lib/local-db"
import { exportBookings } from "@/lib/export-utils"
import { formatDate } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { audit } from "@/lib/audit-utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePermissions } from "@/hooks/use-permissions"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedBookings, setSelectedBookings] = React.useState<string[]>([])
  const [isAlertOpen, setIsAlertOpen] = React.useState(false)
  const [actionType, setActionType] = React.useState<string | null>(null)
  const { role } = usePermissions()
  const isSuperAdmin = role === "SUPER_ADMIN"
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [bookingTransactions, setBookingTransactions] = useState<Transaction[]>([])

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

  const handleViewDetails = async (booking: Booking) => {
    if (!isSuperAdmin) return
    setSelectedBooking(booking)
    setIsDetailOpen(true)
    setDetailLoading(true)

    try {
      const txns = await transactionsDB.filter({ bookingId: booking.id })
      setBookingTransactions(
        txns.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      )
    } catch (error) {
      console.error("Failed to load booking transactions:", error)
      toast.error("Unable to load booking details")
    } finally {
      setDetailLoading(false)
    }
  }

  const closeDetails = () => {
    setIsDetailOpen(false)
    setSelectedBooking(null)
    setBookingTransactions([])
  }

  const getAncillariesTotal = (booking: Booking) => {
    if (booking.type === "FLIGHT") {
      const anc = booking.details?.ancillaries || {}
      const seatSelectionTotal = anc.seatSelection ? Number(anc.seatPrice || 0) : 0
      return (
        (anc.extraBaggage ? Number(anc.extraBaggagePrice || 0) : 0) +
        (anc.mealSelection ? Number(anc.mealPrice || 0) : 0) +
        seatSelectionTotal
      )
    }

    const hotelAddOns = booking.details?.addOns || {}
    const nights = booking.details?.nights || 1
    let addOnTotal = 0
    if (hotelAddOns.extraBed) addOnTotal += 2000 * nights
    if (hotelAddOns.airportTransfer) addOnTotal += 1500
    if (hotelAddOns.meals) addOnTotal += 1000 * nights
    if (hotelAddOns.insurance) addOnTotal += 500
    return addOnTotal
  }

  const getFareBreakdown = (booking: Booking | null) => {
    if (!booking) return null
    const details = booking.details || {}
    const markupInfo = details.markup || {}
    const superAdminMarkup = Number(markupInfo.superAdminMarkup ?? 0)
    const agentMarkup = Number(markupInfo.totalMarkup ?? markupInfo.agentMarkup ?? 0)
    const taxes = Number(details.taxes ?? details.taxAmount ?? details.taxesAndFees ?? 0)
    const ancillaries = getAncillariesTotal(booking)
    const baseFare = Math.max(booking.amount - (agentMarkup + superAdminMarkup + ancillaries + taxes), 0)

    return {
      baseFare,
      taxes,
      agentMarkup,
      superAdminMarkup,
      ancillaries,
      total: booking.amount,
    }
  }

  const getPassengerList = (booking: Booking | null) => {
    if (!booking) return []
    if (booking.type === "FLIGHT") {
      const passengers = booking.details?.passengerDetails
      if (!passengers) return []
      return Array.isArray(passengers) ? passengers : [passengers]
    }

    if (booking.type === "HOTEL") {
      const guest = booking.details?.guestDetails
      return guest ? [guest] : []
    }

    return []
  }

  const formatCurrency = (value: number) => `₹${Number(value || 0).toLocaleString("en-IN")}`

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
                  <TableRow
                    key={booking.id}
                    data-state={selectedBookings.includes(booking.id) ? "selected" : undefined}
                    className={isSuperAdmin ? "cursor-pointer" : ""}
                    onClick={() => isSuperAdmin && handleViewDetails(booking)}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedBookings.includes(booking.id)}
                        onCheckedChange={(checked) => handleSelectBooking(booking.id, checked as boolean)}
                        onClick={(event) => event.stopPropagation()}
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(event) => {
                          event.stopPropagation()
                          handleViewDetails(booking)
                        }}
                        disabled={!isSuperAdmin}
                        aria-label="View booking details"
                      >
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

      <Dialog open={isDetailOpen} onOpenChange={(open) => (open ? setIsDetailOpen(true) : closeDetails())}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>Full booking, fare breakup, markup, passenger and transaction summary.</DialogDescription>
          </DialogHeader>

          {detailLoading ? (
            <div className="py-6 text-center text-muted-foreground">Loading booking details...</div>
          ) : selectedBooking ? (
            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="rounded-md border bg-muted/30 p-3">
                    <p className="text-muted-foreground">Booking ID</p>
                    <p className="font-semibold">{selectedBooking.bookingId}</p>
                  </div>
                  <div className="rounded-md border bg-muted/30 p-3">
                    <p className="text-muted-foreground">{selectedBooking.type === "HOTEL" ? "Voucher" : "PNR"}</p>
                    <p className="font-semibold">{selectedBooking.type === "HOTEL" ? selectedBooking.details?.voucherNumber ?? "N/A" : selectedBooking.pnr}</p>
                  </div>
                  <div className="rounded-md border bg-muted/30 p-3">
                    <p className="text-muted-foreground">Status</p>
                    <Badge
                      variant={
                        selectedBooking.status === "CONFIRMED" || selectedBooking.status === "COMPLETED"
                          ? "default"
                          : selectedBooking.status === "PENDING_APPROVAL"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {selectedBooking.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="rounded-md border bg-muted/30 p-3">
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-semibold">{selectedBooking.type}</p>
                  </div>
                  <div className="rounded-md border bg-muted/30 p-3">
                    <p className="text-muted-foreground">Agent</p>
                    <p className="font-semibold">{selectedBooking.agentName}</p>
                  </div>
                  <div className="rounded-md border bg-muted/30 p-3">
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-semibold">{formatDate(selectedBooking.date)}</p>
                  </div>
                  <div className="rounded-md border bg-muted/30 p-3 md:col-span-3">
                    <p className="text-muted-foreground">Total Amount</p>
                    <p className="text-xl font-semibold">{formatCurrency(selectedBooking.amount)}</p>
                  </div>
                </div>

                <Separator />

                {(() => {
                  const fare = getFareBreakdown(selectedBooking)
                  if (!fare) return null
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Fare Breakup</h3>
                        <span className="text-sm text-muted-foreground">Includes markup and ancillaries</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <span className="text-muted-foreground">Base Fare</span>
                          <span className="font-semibold">{formatCurrency(fare.baseFare)}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <span className="text-muted-foreground">Taxes & Fees</span>
                          <span className="font-semibold">{formatCurrency(fare.taxes)}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <span className="text-muted-foreground">Ancillaries / Add-ons</span>
                          <span className="font-semibold">{formatCurrency(fare.ancillaries)}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <span className="text-muted-foreground">Agent Markup</span>
                          <span className="font-semibold text-primary">{formatCurrency(fare.agentMarkup)}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <span className="text-muted-foreground">Super Admin Markup</span>
                          <span className="font-semibold text-primary">{formatCurrency(fare.superAdminMarkup)}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-3">
                          <span className="text-muted-foreground">Grand Total</span>
                          <span className="font-semibold">{formatCurrency(fare.total)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })()}

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Passenger / Guest Details</h3>
                    <span className="text-sm text-muted-foreground">
                      {selectedBooking.type === "HOTEL" ? "Primary guest information" : "Passenger contact"}
                    </span>
                  </div>
                  {getPassengerList(selectedBooking).length === 0 ? (
                    <p className="text-sm text-muted-foreground">No passenger details captured.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      {getPassengerList(selectedBooking).map((passenger: any, index) => (
                        <div key={index} className="rounded-md border p-3 space-y-1">
                          <p className="font-semibold">{passenger.firstName} {passenger.lastName}</p>
                          {passenger.email && <p className="text-muted-foreground">Email: {passenger.email}</p>}
                          {passenger.mobile && <p className="text-muted-foreground">Phone: {passenger.mobile}</p>}
                          {passenger.gender && <p className="text-muted-foreground">Gender: {passenger.gender}</p>}
                          {passenger.nationality && <p className="text-muted-foreground">Nationality: {passenger.nationality}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Transaction Summary</h3>
                    <span className="text-sm text-muted-foreground">Linked wallet or payment transactions</span>
                  </div>
                  {bookingTransactions.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No transactions recorded for this booking.</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {bookingTransactions.map((txn) => (
                        <div key={txn.id} className="rounded-md border p-3 text-sm">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">{txn.description}</p>
                            <Badge variant={txn.status === "Completed" ? "default" : txn.status === "Pending" ? "secondary" : "destructive"}>
                              {txn.status}
                            </Badge>
                          </div>
                          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-muted-foreground">
                            <span>Amount: {formatCurrency(txn.amount)}</span>
                            <span>Method: {txn.paymentMethod}</span>
                            <span>Type: {txn.type}</span>
                            <span>Date: {formatDate(txn.date)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="py-6 text-center text-muted-foreground">Select a booking to view details.</div>
          )}
        </DialogContent>
      </Dialog>

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

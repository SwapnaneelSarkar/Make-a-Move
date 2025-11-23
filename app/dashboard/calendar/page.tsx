"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MOCK_BOOKINGS } from "@/lib/mock-data"
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"
import { ChevronLeft, ChevronRight, Download, Plane, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarSyncButton } from "@/components/calendar-sync-button"

export default function BookingCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  // Status Colors - Matching spec: Green #22C55E, Yellow #F59E0B, Red #EF4444, Gray #6B7280
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-[#22C55E] hover:bg-[#22C55E]/90"
      case "PENDING_APPROVAL":
        return "bg-[#F59E0B] hover:bg-[#F59E0B]/90"
      case "CANCELLED":
        return "bg-[#EF4444] hover:bg-[#EF4444]/90"
      case "REFUNDED":
        return "bg-[#6B7280] hover:bg-[#6B7280]/90"
      default:
        return "bg-blue-500 hover:bg-blue-600"
    }
  }

  // Filter Bookings
  const filteredBookings = MOCK_BOOKINGS.filter((booking) => {
    if (filterType !== "all" && booking.type !== filterType) return false
    if (filterStatus !== "all" && booking.status !== filterStatus) return false
    return true
  })

  // Get days for current view
  const daysInMonth = date
    ? eachDayOfInterval({
        start: startOfMonth(date),
        end: endOfMonth(date),
      })
    : []

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Booking ID,Type,Date,Amount,Status,Agent\n" +
      filteredBookings.map((b) => `${b.id},${b.type},${b.date},${b.amount},${b.status},${b.agentName}`).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "bookings_export.csv")
    document.body.appendChild(link)
    link.click()
  }

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-100px)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Calendar</h1>
          <p className="text-muted-foreground">Visualize your travel schedule and status.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <CalendarSyncButton />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setDate(new Date(date!.setMonth(date!.getMonth() - 1)))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold w-40 text-center">{date ? format(date, "MMMM yyyy") : "Select Date"}</h2>
          <Button variant="outline" size="icon" onClick={() => setDate(new Date(date!.setMonth(date!.getMonth() + 1)))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <div className="flex rounded-md border p-1 bg-background">
            <Button variant={view === "month" ? "secondary" : "ghost"} size="sm" onClick={() => setView("month")}>
              Month
            </Button>
            <Button variant={view === "week" ? "secondary" : "ghost"} size="sm" onClick={() => setView("week")}>
              Week
            </Button>
            <Button variant={view === "day" ? "secondary" : "ghost"} size="sm" onClick={() => setView("day")}>
              Day
            </Button>
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="FLIGHT">Flights</SelectItem>
              <SelectItem value="HOTEL">Hotels</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="PENDING_APPROVAL">Pending</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
              <SelectItem value="REFUNDED">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Calendar Grid - Month View */}
      {view === "month" && (
        <Card className="flex-1 overflow-hidden flex flex-col">
          <div className="grid grid-cols-7 border-b bg-muted/40">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="p-4 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 flex-1 auto-rows-fr overflow-y-auto">
            {/* Empty cells for start of month */}
            {Array.from({ length: startOfMonth(date!).getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-muted/10 border-b border-r min-h-[120px]" />
            ))}

            {/* Days */}
            {daysInMonth.map((day, i) => {
              const dayBookings = filteredBookings.filter((b) => isSameDay(new Date(b.date), day))

              return (
                <div
                  key={i}
                  className={cn(
                    "p-2 border-b border-r min-h-[120px] hover:bg-accent/5 transition-colors relative group",
                    isSameDay(day, new Date()) && "bg-blue-50/30",
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1",
                      isSameDay(day, new Date()) ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                    )}
                  >
                    {format(day, "d")}
                  </span>

                  <div className="flex flex-col gap-1 overflow-hidden">
                    {dayBookings.map((booking) => (
                      <button
                        key={booking.id}
                        onClick={() => setSelectedBooking(booking)}
                        className={cn(
                          "text-[10px] px-2 py-1 rounded-sm text-white truncate w-full text-left flex items-center gap-1",
                          getStatusColor(booking.status),
                        )}
                      >
                        {booking.type === "FLIGHT" ? (
                          <Plane className="w-3 h-3 flex-shrink-0" />
                        ) : (
                          <Building2 className="w-3 h-3 flex-shrink-0" />
                        )}
                        {booking.agentName}
                      </button>
                    ))}
                    {dayBookings.length > 3 && (
                      <span className="text-[10px] text-muted-foreground pl-1">+ {dayBookings.length - 3} more</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Detail Modal */}
      <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-full text-white", getStatusColor(selectedBooking.status))}>
                    {selectedBooking.type === "FLIGHT" ? (
                      <Plane className="w-5 h-5" />
                    ) : (
                      <Building2 className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{selectedBooking.type} Booking</p>
                    <p className="text-sm text-muted-foreground">#{selectedBooking.id.toUpperCase()}</p>
                  </div>
                </div>
                <span className={cn("px-2 py-1 rounded text-xs text-white", getStatusColor(selectedBooking.status))}>
                  {selectedBooking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{format(new Date(selectedBooking.date), "PPP")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                  <p>₹{selectedBooking.amount.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Agent</p>
                  <p>{selectedBooking.agentName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Provider</p>
                  <p>{selectedBooking.details?.airline || selectedBooking.details?.name || "N/A"}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                  Close
                </Button>
                <Button>View Full Details</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

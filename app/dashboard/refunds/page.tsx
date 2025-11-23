"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CheckCircle2, Clock, ArrowRight } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { bookingsDB, refundsDB, transactionsDB, type Booking, type Refund } from "@/lib/local-db"
import { useAppStore } from "@/lib/store"
import { audit } from "@/lib/audit-utils"
import { createTransaction } from "@/lib/wallet-utils"

const refundSchema = z.object({
  bookingId: z.string().min(1, "Please select a booking"),
  reason: z.string().min(1, "Reason is required"),
  type: z.enum(["FULL", "PARTIAL"]),
  description: z.string().optional(),
})

export default function RefundsPage() {
  const { currentUser } = useAppStore()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [refunds, setRefunds] = useState<Refund[]>([])
  const [loading, setLoading] = useState(true)
  const [activeRequest, setActiveRequest] = useState<Refund | null>(null)

  const form = useForm<z.infer<typeof refundSchema>>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      type: "FULL",
    },
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [allBookings, allRefunds] = await Promise.all([bookingsDB.readAll(), refundsDB.readAll()])
      setBookings(allBookings.filter((b) => b.status !== "CANCELLED"))
      setRefunds(allRefunds.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    } catch (error) {
      console.error("Failed to load data:", error)
      toast.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  // Calculate refund amount based on selection
  const selectedBookingId = form.watch("bookingId")
  const selectedBooking = bookings.find((b) => b.id === selectedBookingId)
  const refundType = form.watch("type")

  const estimatedRefund = selectedBooking
    ? refundType === "FULL"
      ? selectedBooking.amount
      : selectedBooking.amount * 0.8
    : 0

  async function onSubmit(values: z.infer<typeof refundSchema>) {
    try {
      const booking = bookings.find((b) => b.id === values.bookingId)
      if (!booking) {
        toast.error("Booking not found")
        return
      }

      const refund = await refundsDB.create({
        bookingId: values.bookingId,
        reason: values.reason,
        type: values.type,
        amount: estimatedRefund,
        description: values.description,
      })

      await audit.create("refunds", refund.id, { bookingId: values.bookingId, amount: estimatedRefund })

      toast.success("Refund request initiated successfully", {
        description: `Request ID: ${refund.refundId}`,
      })

      form.reset()
      await loadData()
    } catch (error) {
      console.error("Failed to create refund:", error)
      toast.error("Failed to create refund request")
    }
  }

  const handleProcessRefund = async (refundId: string) => {
    try {
      const refund = refunds.find((r) => r.id === refundId)
      if (!refund) return

      // Update to Processing
      await refundsDB.update(refundId, {
        status: "Processing",
        timeline: [
          ...refund.timeline,
          { stage: "Processing", date: new Date().toISOString(), status: "completed" },
        ],
      })

      await audit.update("refunds", refundId, { status: "Initiated" }, { status: "Processing" })

      // Simulate processing delay
      setTimeout(async () => {
        await refundsDB.update(refundId, {
          status: "Completed",
          timeline: [
            ...refund.timeline,
            { stage: "Processing", date: new Date().toISOString(), status: "completed" },
            { stage: "Completed", date: new Date().toISOString(), status: "completed" },
          ],
        })

        // Credit wallet using wallet utilities
        await createTransaction({
          date: new Date().toISOString().split("T")[0],
          description: `Refund for Booking ${refund.bookingId}`,
          amount: refund.amount,
          type: "REFUND",
          status: "Completed",
          paymentMethod: "Refund",
          productType: "Refund",
          bookingId: refund.bookingId,
        })

        await audit.update("refunds", refundId, { status: "Processing" }, { status: "Completed" })
        await loadData()
        toast.success("Refund processed successfully")
      }, 2000)

      toast.info("Processing refund...")
      await loadData()
    } catch (error) {
      console.error("Failed to process refund:", error)
      toast.error("Failed to process refund")
    }
  }

  return (
    <div className="container max-w-6xl py-8 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold">Refund Management</h1>
        <p className="text-muted-foreground mt-1">Initiate and track refund requests for cancellations and issues.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Request Form */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle>New Refund Request</CardTitle>
              <CardDescription>Select a booking to initiate a refund</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bookingId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Booking</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Search Booking ID..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bookings.map((booking) => (
                              <SelectItem key={booking.id} value={booking.id}>
                                {booking.type} - {format(new Date(booking.date), "MMM d")} (₹{booking.amount.toLocaleString("en-IN")})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedBooking && (
                    <div className="p-3 bg-muted/50 rounded-lg text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Original Amount:</span>
                        <span className="font-medium">₹{selectedBooking.amount.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Booking Date:</span>
                        <span>{selectedBooking.date}</span>
                      </div>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select reason" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cancellation">Voluntary Cancellation</SelectItem>
                            <SelectItem value="service_issue">Service Issue</SelectItem>
                            <SelectItem value="operational">Operational Change</SelectItem>
                            <SelectItem value="fare_difference">Fare Difference</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Refund Type</FormLabel>
                        <div className="flex gap-4">
                          <label
                            className={`flex-1 border rounded-lg p-3 cursor-pointer transition-all ${field.value === "FULL" ? "bg-primary/5 border-primary ring-1 ring-primary" : "hover:bg-muted"}`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                {...field}
                                value="FULL"
                                className="accent-primary"
                                checked={field.value === "FULL"}
                              />
                              <span className="font-medium">Full Refund</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 pl-6">100% of booking value</p>
                          </label>
                          <label
                            className={`flex-1 border rounded-lg p-3 cursor-pointer transition-all ${field.value === "PARTIAL" ? "bg-primary/5 border-primary ring-1 ring-primary" : "hover:bg-muted"}`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                {...field}
                                value="PARTIAL"
                                className="accent-primary"
                                checked={field.value === "PARTIAL"}
                              />
                              <span className="font-medium">Partial</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 pl-6">Subject to penalties</p>
                          </label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedBooking && (
                    <div className="flex justify-between items-center p-3 bg-green-50 text-green-700 rounded-lg border border-green-100">
                      <span className="font-medium text-sm">Est. Refund Amount</span>
                      <span className="font-bold text-lg">₹{estimatedRefund.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <Button type="submit" className="w-full">
                    Initiate Refund
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Tracker */}
        <div className="lg:col-span-2">
          <Card className="h-full border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
              <CardTitle>Recent Refund Requests</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : refunds.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No refund requests found</div>
              ) : (
                <div className="space-y-4">
                  {refunds.map((refund) => {
                    const booking = bookings.find((b) => b.id === refund.bookingId)
                    const isProcessing = refund.status === "Processing"
                    const isCompleted = refund.status === "Completed"
                    const progress = refund.timeline.length

                    return (
                      <div
                        key={refund.id}
                        className="group relative overflow-hidden bg-card border rounded-xl p-0 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setActiveRequest(refund)}
                      >
                        <div className="p-5 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                          <div className="flex gap-4 items-center">
                            <div
                              className={`p-3 rounded-full ${
                                isProcessing ? "bg-yellow-100 text-yellow-600" : isCompleted ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {isProcessing ? (
                                <Clock className="w-5 h-5" />
                              ) : isCompleted ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <Clock className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-lg">{refund.refundId}</h4>
                                <Badge variant="outline">{refund.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {booking ? `${booking.type} Booking ${booking.bookingId}` : "Booking not found"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Refund Amount</p>
                              <p className="font-bold text-lg">₹{refund.amount.toLocaleString("en-IN")}</p>
                            </div>
                            {currentUser.role === "FINANCE_TEAM" && refund.status === "Initiated" && (
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleProcessRefund(refund.id)
                                }}
                              >
                                Process
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                              <ArrowRight className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>

                        {/* Progress Bar for active items */}
                        {isProcessing && (
                          <div className="bg-muted h-1.5 w-full">
                            <div className="bg-yellow-500 h-1.5 w-[60%] animate-pulse" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

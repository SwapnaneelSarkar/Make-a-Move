"use client"

import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, Users } from "lucide-react"
import { MOCK_FLIGHTS, type Flight } from "@/lib/mock-data"
import { toast } from "sonner"
import { useAppStore } from "@/lib/store"
import { groupBookingsDB, notificationsDB, type GroupBookingRequest } from "@/lib/local-db"

const CITY_LOOKUP: Record<string, string> = {
  DEL: "New Delhi",
  BOM: "Mumbai",
  BLR: "Bangalore",
  MAA: "Chennai",
  CCU: "Kolkata",
  HYD: "Hyderabad",
  DXB: "Dubai",
  LHR: "London Heathrow",
  SIN: "Singapore",
  JFK: "New York",
  FRA: "Frankfurt",
  SYD: "Sydney",
}

const buildDateTime = (dateString: string | null, hourOffset: number) => {
  const base = dateString ? new Date(dateString) : new Date()
  const safeBase = isNaN(base.getTime()) ? new Date() : base
  const adjusted = new Date(safeBase)
  adjusted.setHours(adjusted.getHours() + hourOffset)
  return adjusted.toISOString()
}

const generateFallbackFlight = (
  originCode: string,
  destinationCode: string,
  isInternational: boolean,
  departureDate: string,
): Flight => {
  const from = originCode || (isInternational ? "DEL" : "DEL")
  const to = destinationCode || (isInternational ? "DXB" : "BOM")
  const type: Flight["type"] = isInternational ? "INTERNATIONAL" : "DOMESTIC"
  const basePrice = isInternational ? 34000 : 12500

  return {
    id: `group-${from}-${to}-1`,
    airline: isInternational ? "Test Global Air" : "Test Domestic Air",
    airlineLogo: "/placeholder-logo.svg",
    flightNumber: `${isInternational ? "TG" : "TD"}-${from}${to}-G1`,
    departure: { code: from, city: CITY_LOOKUP[from] || from, time: buildDateTime(departureDate, 24) },
    arrival: { code: to, city: CITY_LOOKUP[to] || to, time: buildDateTime(departureDate, 27) },
    duration: "3h 00m",
    price: basePrice,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
    type,
    baggage: "20kg",
  }
}

export default function GroupEnquiryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentUser } = useAppStore()

  const flightId = searchParams.get("flightId")
  const origin = searchParams.get("origin") || ""
  const destination = searchParams.get("destination") || ""
  const departureDate = searchParams.get("departureDate") || ""
  const returnDate = searchParams.get("returnDate") || ""
  const travellers = parseInt(searchParams.get("travellers") || "10") || 10
  const classType = searchParams.get("class") || "Economy"
  const isInternational = searchParams.get("isInternational") === "true"

  const selectedFlight = useMemo(() => {
    const match = MOCK_FLIGHTS.find((f) => f.id === flightId)
    if (match) return match
    return generateFallbackFlight(origin, destination, isInternational, departureDate)
  }, [flightId, origin, destination, isInternational, departureDate])

  const [form, setForm] = useState({
    adults: Math.max(1, travellers),
    children: 0,
    infants: 0,
    expectedQuote: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalPassengers = form.adults + form.children + form.infants

  const handleSubmit = async () => {
    if (form.adults < 1) {
      toast.error("At least 1 adult is required for group bookings")
      return
    }

    if (form.infants > form.adults) {
      toast.error("Infants cannot exceed number of adults")
      return
    }

    if (totalPassengers < 10) {
      toast.error("Group booking enquiries require at least 10 passengers")
      return
    }

    if (!selectedFlight) {
      toast.error("Selected flight missing. Please go back and pick a flight.")
      return
    }

    const payload: Omit<GroupBookingRequest, "id" | "reference" | "createdAt" | "updatedAt"> = {
      flightId: selectedFlight.id,
      origin,
      destination,
      departureDate,
      returnDate: returnDate || undefined,
      classType,
      isInternational,
      passengers: {
        adults: form.adults,
        children: form.children,
        infants: form.infants,
        total: totalPassengers,
      },
      expectedQuote: form.expectedQuote,
      notes: form.notes,
      status: "NEW",
      submittedBy: currentUser.name,
      agentEmail: currentUser.email,
      assignedTo: "Support Team",
    }

    try {
      setIsSubmitting(true)
      const timeoutMs = 8000
      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("Timed out saving group enquiry")), timeoutMs),
      )

      const record = await Promise.race([groupBookingsDB.create(payload), timeoutPromise])
      if (!record) {
        throw new Error("Save failed (record missing)")
      }

      try {
        await notificationsDB.create({
          title: "New group booking enquiry",
          message: `Reference ${record.reference} for ${record.passengers.total} pax on ${origin}-${destination}`,
          type: "group-booking",
          userId: "support-team",
        })
      } catch (notifyErr) {
        console.warn("Notification create failed", notifyErr)
      }

      toast.success("Group enquiry submitted", {
        description: "Sent to Support/Admin. They will share quote, validity, and next steps.",
      })
      const params = new URLSearchParams({
        reference: record.reference,
        total: record.passengers.total.toString(),
        origin,
        destination,
        class: classType,
        quote: form.expectedQuote || "",
      })
      router.push(`/dashboard/flights/group-success?${params.toString()}`)
    } catch (error) {
      console.error("Failed to save group enquiry", error)
      try {
        const fallback = {
          ...payload,
          id: Date.now().toString(),
          reference: `GRP-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        const existing = JSON.parse(localStorage.getItem("groupBookingEnquiries") || "[]")
        localStorage.setItem("groupBookingEnquiries", JSON.stringify([fallback, ...existing]))
        toast.success("Saved offline", {
          description: "We stored the enquiry locally; please resend once online/DB is ready.",
        })
      } catch (storageErr) {
        console.error("Fallback storage failed", storageErr)
        toast.error("Could not save enquiry. Please retry.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-10 w-10">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Group Booking Enquiry</h1>
            <Badge variant="secondary" className="gap-1 text-xs">
              <Users className="h-3 w-3" /> 9+ passengers
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Share passenger counts and expected quote. Our support team will respond with group fare, validity, and
            payment instructions before issuing PNRs.
          </p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>How it works</AlertTitle>
        <AlertDescription className="space-y-1">
          <p>Submit the enquiry → Support shares group fare & validity → You confirm & pay → PNR issued online/offline.</p>
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Traveller Details</CardTitle>
            <CardDescription>Provide passenger counts for this group.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Adults *</Label>
                <Input
                  type="number"
                  min={1}
                  max={200}
                  value={form.adults}
                  onChange={(e) => setForm({ ...form, adults: parseInt(e.target.value || "0") || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label>Children</Label>
                <Input
                  type="number"
                  min={0}
                  max={200}
                  value={form.children}
                  onChange={(e) => setForm({ ...form, children: Math.max(0, parseInt(e.target.value || "0") || 0) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Infants</Label>
                <Input
                  type="number"
                  min={0}
                  max={200}
                  value={form.infants}
                  onChange={(e) => setForm({ ...form, infants: Math.max(0, parseInt(e.target.value || "0") || 0) })}
                />
                <p className="text-xs text-muted-foreground">Cannot exceed number of adults.</p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Expected Quote (optional)</Label>
                <Input
                  placeholder="e.g., ₹25,000 per traveler"
                  value={form.expectedQuote}
                  onChange={(e) => setForm({ ...form, expectedQuote: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Notes for Support (optional)</Label>
                <Textarea
                  rows={3}
                  placeholder="Preferred airline, flexibility, meal/seat needs, payment preference, etc."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-3 text-sm">
              <span className="font-medium">Total passengers</span>
              <Badge variant="outline" className="text-base font-bold">
                {totalPassengers}
              </Badge>
            </div>

            <div className="flex justify-end">
              <Button size="lg" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Selected Flight</CardTitle>
            <CardDescription>Context shared with support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-lg font-semibold">{selectedFlight.airline}</p>
              <p className="text-sm text-muted-foreground">{selectedFlight.flightNumber}</p>
              <Badge variant="secondary" className="mt-1 w-fit">
                {classType}
              </Badge>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">{selectedFlight.departure.city}</span>
                <span className="text-muted-foreground">{selectedFlight.departure.code}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">{selectedFlight.arrival.city}</span>
                <span className="text-muted-foreground">{selectedFlight.arrival.code}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Departure</span>
                <span>{new Date(selectedFlight.departure.time).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>{selectedFlight.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Quoted price (total for this group)</span>
                <span>
                  {form.expectedQuote && form.expectedQuote.trim().length > 0
                    ? form.expectedQuote
                    : `${selectedFlight.currency} ${selectedFlight.price.toLocaleString("en-IN")} (indicative)`}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Quoted price should be the total for all passengers (per-ticket price × number of passengers), not a per-ticket amount.
              </p>
            </div>
            <Separator />
            <div className="space-y-1 text-sm">
              <p className="font-semibold">What happens next</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Support shares group fare quote and validity date.</li>
                <li>Payment instructions (wallet/transfer/online) are sent.</li>
                <li>PNR issued once confirmation is received.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FlightCard } from "@/components/booking/flight-card"
import { MOCK_FLIGHTS, type Flight } from "@/lib/mock-data"
import { Filter, SlidersHorizontal, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { toast } from "sonner"

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

const generateTestFlights = (
  originCode: string,
  destinationCode: string,
  isInternational: boolean,
  departureDate: string,
): Flight[] => {
  const from = originCode || (isInternational ? "DEL" : "DEL")
  const to = destinationCode || (isInternational ? "DXB" : "BOM")
  const type: Flight["type"] = isInternational ? "INTERNATIONAL" : "DOMESTIC"
  const basePrice = isInternational ? 34000 : 12500

  return [
    {
      id: `test-${from}-${to}-1`,
      airline: isInternational ? "Test Global Air" : "Test Domestic Air",
      airlineLogo: "/placeholder-logo.svg",
      flightNumber: `${isInternational ? "TG" : "TD"}-${from}${to}-101`,
      departure: { code: from, city: CITY_LOOKUP[from] || from, time: buildDateTime(departureDate, 24) },
      arrival: { code: to, city: CITY_LOOKUP[to] || to, time: buildDateTime(departureDate, 27) },
      duration: "3h 00m",
      price: basePrice,
      currency: "INR",
      policyCompliant: true,
      stops: 0,
      type,
      baggage: "20kg",
    },
    {
      id: `test-${from}-${to}-2`,
      airline: isInternational ? "Aero Sandbox" : "Metro Shuttle",
      airlineLogo: "/placeholder-logo.svg",
      flightNumber: `${isInternational ? "AS" : "MS"}-${from}${to}-205`,
      departure: { code: from, city: CITY_LOOKUP[from] || from, time: buildDateTime(departureDate, 30) },
      arrival: { code: to, city: CITY_LOOKUP[to] || to, time: buildDateTime(departureDate, 34) },
      duration: "4h 00m",
      price: basePrice + 1800,
      currency: "INR",
      policyCompliant: true,
      stops: 1,
      type,
      baggage: "15kg",
    },
    {
      id: `test-${from}-${to}-3`,
      airline: isInternational ? "Sandbox Connect" : "Corporate Wings",
      airlineLogo: "/placeholder-logo.svg",
      flightNumber: `${isInternational ? "SC" : "CW"}-${from}${to}-309`,
      departure: { code: from, city: CITY_LOOKUP[from] || from, time: buildDateTime(departureDate, 36) },
      arrival: { code: to, city: CITY_LOOKUP[to] || to, time: buildDateTime(departureDate, 39) },
      duration: "3h 30m",
      price: basePrice + 3200,
      currency: "INR",
      policyCompliant: false,
      stops: 0,
      type,
      baggage: "30kg",
    },
  ]
}

export default function FlightListingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentUser } = useAppStore()
  
  // Get search parameters from URL
  const origin = searchParams.get("origin") || ""
  const destination = searchParams.get("destination") || ""
  const departureDate = searchParams.get("departureDate") || ""
  const returnDate = searchParams.get("returnDate") || ""
  const travellers = searchParams.get("travellers") || "1"
  const classType = searchParams.get("class") || "Economy"
  const tripType = searchParams.get("tripType") || "one-way"
  const isInternational = searchParams.get("isInternational") === "true"

  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const totalTravellers = parseInt(travellers || "0") || 0
  const isGroupBooking = totalTravellers > 9

  // Filter state
  const [baggageFilter, setBaggageFilter] = useState<string[]>([])
  const [flightNumberFilter, setFlightNumberFilter] = useState<string>("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  
  // Sorting state - default to "Price: Low to High"
  const [sortBy, setSortBy] = useState<string>("price-low-to-high")

  const fallbackFlights = useMemo(
    () => generateTestFlights(origin, destination, isInternational, departureDate),
    [origin, destination, isInternational, departureDate],
  )

  // Get unique airlines from flights
  const availableAirlines = useMemo(() => {
    const airlines = new Set<string>()
    MOCK_FLIGHTS.forEach((flight) => {
      const flightIsInternational = flight.type === "INTERNATIONAL"
      if (isInternational ? flightIsInternational : !flightIsInternational) {
        airlines.add(flight.airline)
      }
    })
    return Array.from(airlines).sort()
  }, [isInternational])

  // Get unique baggage options from flights
  const availableBaggageOptions = useMemo(() => {
    const baggageSet = new Set<string>()
    MOCK_FLIGHTS.forEach((flight) => {
      const flightIsInternational = flight.type === "INTERNATIONAL"
      if (isInternational ? flightIsInternational : !flightIsInternational) {
        const baggage = flight.baggage || "No baggage"
        baggageSet.add(baggage)
      }
    })
    return Array.from(baggageSet).sort((a, b) => {
      if (a === "No baggage") return 1
      if (b === "No baggage") return -1
      const aNum = parseInt(a.replace("kg", "")) || 0
      const bNum = parseInt(b.replace("kg", "")) || 0
      return aNum - bNum
    })
  }, [isInternational])

  // Get price range from flights
  const priceRangeFromFlights = useMemo(() => {
    const prices = MOCK_FLIGHTS.filter((flight) => {
      const flightIsInternational = flight.type === "INTERNATIONAL"
      return isInternational ? flightIsInternational : !flightIsInternational
    }).map((flight) => flight.price)
    if (prices.length === 0) {
      return [0, 100000]
    }
    return [Math.min(...prices), Math.max(...prices)]
  }, [isInternational])

  // Initialize price range when flights change
  useEffect(() => {
    if (priceRangeFromFlights[0] !== undefined && priceRangeFromFlights[1] !== undefined) {
      setPriceRange([priceRangeFromFlights[0], priceRangeFromFlights[1]])
    }
  }, [priceRangeFromFlights])

  const matchesFilters = useCallback((flight: Flight) => {
    const flightIsInternational = flight.type === "INTERNATIONAL"
    if (isInternational ? !flightIsInternational : flightIsInternational) {
      return false
    }

    if (origin && flight.departure.code !== origin) return false
    if (destination && flight.arrival.code !== destination) return false

    if (baggageFilter.length > 0) {
      const flightBaggage = flight.baggage || "No baggage"
      if (!baggageFilter.includes(flightBaggage)) return false
    }

    if (flightNumberFilter.trim()) {
      const searchTerm = flightNumberFilter.trim().toLowerCase()
      const matchesFlightNumber = flight.flightNumber.toLowerCase().includes(searchTerm)
      const matchesAirline = flight.airline.toLowerCase().includes(searchTerm)
      if (!matchesFlightNumber && !matchesAirline) return false
    }

    if (flight.price < priceRange[0] || flight.price > priceRange[1]) return false

    if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) {
      return false
    }

    return true
  }, [
    isInternational,
    origin,
    destination,
    baggageFilter,
    flightNumberFilter,
    priceRange,
    selectedAirlines,
  ])

  // Filter and sort flights
  const filteredFlights = useMemo(() => {
    let filtered = MOCK_FLIGHTS.filter(matchesFilters)

    // Apply sorting
    if (sortBy === "price-low-to-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    }

    return filtered
  }, [matchesFilters, sortBy])

  const filteredFallbackFlights = useMemo(() => {
    let filtered = fallbackFlights.filter(matchesFilters)

    if (sortBy === "price-low-to-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    }

    return filtered
  }, [fallbackFlights, matchesFilters, sortBy])

  const flightsToDisplay = filteredFlights.length > 0 ? filteredFlights : filteredFallbackFlights

  const handleBook = (flight: Flight) => {
    setSelectedFlight(flight)

    if (isGroupBooking) {
      const params = new URLSearchParams({
        flightId: flight.id,
        origin,
        destination,
        departureDate,
        returnDate,
        travellers,
        class: classType,
        tripType,
        isInternational: isInternational.toString(),
      })
      router.push(`/dashboard/flights/group-enquiry?${params.toString()}`)
      return
    }

    // Navigate back to main flights page with selected flight and search params
    const params = new URLSearchParams(searchParams.toString())
    params.set("selectedFlight", flight.id)
    router.push(`/dashboard/flights?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard/flights")}
          className="h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Flight Listing
          </h1>
          <p className="text-lg text-muted-foreground">
            {origin && destination ? `${origin} to ${destination}` : "Available flights"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="hidden space-y-6 lg:block">
          <div className="rounded-xl border-2 bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Filters</h3>
              <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="space-y-6">
              {/* Sorting */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Flight Number/Name Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Flight Number / Airline</Label>
                <Input
                  placeholder="e.g., AI-501 or Air India"
                  value={flightNumberFilter}
                  onChange={(e) => setFlightNumberFilter(e.target.value)}
                />
              </div>

              <Separator />

              {/* Price Range Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Price Range</Label>
                <div className="space-y-2">
                  <Slider
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={(values) => setPriceRange([values[0], values[1]])}
                    min={priceRangeFromFlights[0] || 0}
                    max={priceRangeFromFlights[1] || 100000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
                    <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Airline Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Airlines</Label>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {availableAirlines.map((airline) => (
                    <div key={airline} className="flex items-center gap-2">
                      <Checkbox
                        id={`airline-${airline}`}
                        checked={selectedAirlines.includes(airline)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAirlines([...selectedAirlines, airline])
                          } else {
                            setSelectedAirlines(selectedAirlines.filter((a) => a !== airline))
                          }
                        }}
                      />
                      <Label
                        htmlFor={`airline-${airline}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {airline}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Baggage Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Baggage Allowance</Label>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                  {availableBaggageOptions.map((baggage) => (
                    <div key={baggage} className="flex items-center gap-2">
                      <Checkbox
                        id={`baggage-${baggage}`}
                        checked={baggageFilter.includes(baggage)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setBaggageFilter([...baggageFilter, baggage])
                          } else {
                            setBaggageFilter(baggageFilter.filter((b) => b !== baggage))
                          }
                        }}
                      />
                      <Label
                        htmlFor={`baggage-${baggage}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {baggage}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="col-span-3 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold">{flightsToDisplay.length} Flights Found</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {isInternational ? "Showing international routes" : "Showing domestic routes"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </div>
          </div>

          {isGroupBooking && (
            <div className="rounded-xl border-2 border-amber-400/70 bg-amber-50 p-4 text-sm text-amber-800 shadow-sm">
              Group booking detected (travellers: {totalTravellers}). Selecting a flight will open the Group Booking
              Enquiry form so the support team can share a custom quote and payment steps.
            </div>
          )}

          {flightsToDisplay.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed p-6 text-center text-sm text-muted-foreground">
              No {isInternational ? "international" : "domestic"} flights available right now. Try adjusting your search.
            </div>
          ) : (
            <div className="space-y-4">
              {flightsToDisplay.map((flight) => (
                <FlightCard key={flight.id} flight={flight} onBook={handleBook} userRole={currentUser.role} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

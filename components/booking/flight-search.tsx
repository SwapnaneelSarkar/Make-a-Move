"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Search, Globe, MapPin, Plus, Minus, ArrowLeftRight } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Badge } from "@/components/ui/badge"

const DOMESTIC_AIRPORTS = [
  { value: "DEL", label: "New Delhi (DEL)" },
  { value: "BOM", label: "Mumbai (BOM)" },
  { value: "BLR", label: "Bangalore (BLR)" },
  { value: "MAA", label: "Chennai (MAA)" },
  { value: "CCU", label: "Kolkata (CCU)" },
  { value: "HYD", label: "Hyderabad (HYD)" },
] as const

const INTERNATIONAL_AIRPORTS = [
  ...DOMESTIC_AIRPORTS,
  { value: "DXB", label: "Dubai (DXB)" },
  { value: "LHR", label: "London Heathrow (LHR)" },
  { value: "SIN", label: "Singapore (SIN)" },
  { value: "JFK", label: "New York (JFK)" },
  { value: "FRA", label: "Frankfurt (FRA)" },
  { value: "SYD", label: "Sydney (SYD)" },
] as const

interface FlightSearchProps {
  tripType?: string
  origin?: string
  destination?: string
  departureDate?: Date | null
  returnDate?: Date | null
  travellers?: string
  class?: string
  specialFare?: string
  flightType?: "domestic" | "international"
  onTripTypeChange?: (value: string) => void
  onOriginChange?: (value: string) => void
  onDestinationChange?: (value: string) => void
  onDepartureDateChange?: (date: Date | null) => void
  onReturnDateChange?: (date: Date | null) => void
  onTravellersChange?: (value: string) => void
  onClassChange?: (value: string) => void
  onSpecialFareChange?: (value: string) => void
  onFlightTypeChange?: (value: "domestic" | "international") => void
  onSearch?: () => void
  errors?: Record<string, string>
}

export function FlightSearch({
  tripType = "one-way",
  origin = "",
  destination = "",
  departureDate = null,
  returnDate = null,
  travellers = "1",
  class: cabinClass = "Economy",
  specialFare = "Regular",
  flightType: initialFlightType = "domestic",
  onTripTypeChange,
  onOriginChange,
  onDestinationChange,
  onDepartureDateChange,
  onReturnDateChange,
  onTravellersChange,
  onClassChange,
  onSpecialFareChange,
  onFlightTypeChange,
  onSearch,
  errors = {},
}: FlightSearchProps) {
  const [flightType, setFlightType] = useState<"domestic" | "international">(initialFlightType)

  useEffect(() => {
    const saved = localStorage.getItem("flight_search_type")
    if (saved) {
      const savedType = saved as "domestic" | "international"
      setFlightType(savedType)
      onFlightTypeChange?.(savedType)
    }
  }, [onFlightTypeChange])

  useEffect(() => {
    const options = flightType === "domestic" ? DOMESTIC_AIRPORTS : INTERNATIONAL_AIRPORTS

    if (origin && !options.some((opt) => opt.value === origin)) {
      onOriginChange?.("")
    }

    if (destination && !options.some((opt) => opt.value === destination)) {
      onDestinationChange?.("")
    }
  }, [flightType, origin, destination, onOriginChange, onDestinationChange])

  const handleTypeChange = (value: string) => {
    if (value === "domestic" || value === "international") {
      setFlightType(value)
      localStorage.setItem("flight_search_type", value)
      onFlightTypeChange?.(value)
    }
  }

  const airportOptions = flightType === "domestic" ? DOMESTIC_AIRPORTS : INTERNATIONAL_AIRPORTS
  const swapDisabled = !origin && !destination
  const travellerCount = Math.max(1, parseInt(travellers || "1") || 1)
  const readableTripType = tripType.replace("-", " ")

  const handleSwapAirports = () => {
    if (swapDisabled) return
    const newOrigin = destination || ""
    const newDestination = origin || ""
    onOriginChange?.(newOrigin)
    onDestinationChange?.(newDestination)
  }

  return (
    <Card className="border-2 bg-gradient-to-br from-background via-background to-primary/5 p-5 md:p-6 shadow-lg">
      <div className="grid gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <RadioGroup value={tripType} onValueChange={onTripTypeChange} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-way" id="one-way" />
              <Label htmlFor="one-way" className="font-medium cursor-pointer">One Way</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="round-trip" id="round-trip" />
              <Label htmlFor="round-trip" className="font-medium cursor-pointer">Round Trip</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multi-city" id="multi-city" disabled />
              <Label htmlFor="multi-city" className="text-muted-foreground cursor-not-allowed">Multi City</Label>
            </div>
          </RadioGroup>
          <ToggleGroup type="single" value={flightType} onValueChange={handleTypeChange} className="border-2">
            <ToggleGroupItem value="domestic" aria-label="Domestic" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              Domestic
            </ToggleGroupItem>
            <ToggleGroupItem value="international" aria-label="International" className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
              <Globe className="mr-2 h-4 w-4" />
              International
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border bg-muted/60 px-4 py-2.5 text-sm">
          <Badge variant="secondary" className="uppercase tracking-wide">
            {flightType === "domestic" ? "Domestic Network" : "International Network"}
          </Badge>
          <span className="text-muted-foreground">
            {flightType === "domestic"
              ? "Fastest routes across major Indian cities with policy-friendly fares."
              : "Passport details required. Popular international hubs pre-loaded for quick search."}
          </span>
        </div>

        <div
          className={cn(
            "grid gap-2 md:gap-3",
            tripType === "round-trip"
              ? "md:grid-cols-[1.2fr_auto_1.2fr_1fr_1fr]"
              : "md:grid-cols-[1.3fr_auto_1.3fr_1fr]",
          )}
        >
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              From <span className="text-red-500">*</span>
            </Label>
            <Select value={origin} onValueChange={onOriginChange}>
            <SelectTrigger className={cn("h-11 transition-all hover:border-primary/50", errors.origin && "border-red-500")}>
                <SelectValue placeholder="Select Airport" />
              </SelectTrigger>
              <SelectContent>
                {airportOptions.map((airport) => (
                  <SelectItem key={airport.value} value={airport.value}>
                    {airport.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.origin && <p className="text-xs text-red-500">{errors.origin}</p>}
          </div>

          <div className="flex flex-col items-center gap-1.5 md:mt-5">
            <Button
              type="button"
              variant="secondary"
              onClick={handleSwapAirports}
              disabled={swapDisabled}
              className="h-10 w-full md:w-11 md:h-11 rounded-full shadow-sm flex items-center justify-center px-4"
            >
              <ArrowLeftRight className="h-4 w-4" />
              <span className="ml-2 text-xs font-semibold md:hidden">Swap</span>
            </Button>
            <p className="text-center text-xs text-muted-foreground hidden md:block">Swap</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              To <span className="text-red-500">*</span>
            </Label>
            <Select value={destination} onValueChange={onDestinationChange}>
            <SelectTrigger className={cn("h-11 transition-all hover:border-primary/50", errors.destination && "border-red-500")}>
                <SelectValue placeholder="Select Airport" />
              </SelectTrigger>
              <SelectContent>
                {airportOptions.map((airport) => (
                  <SelectItem key={airport.value} value={airport.value}>
                    {airport.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.destination && <p className="text-xs text-red-500">{errors.destination}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Departure Date <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "h-11 w-full justify-start text-left font-normal transition-all hover:border-primary/50",
                    !departureDate && "text-muted-foreground",
                    errors.departureDate && "border-red-500",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={departureDate || undefined}
                  onSelect={(date) => onDepartureDateChange?.(date || null)}
                  initialFocus
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </PopoverContent>
            </Popover>
            {errors.departureDate && <p className="text-xs text-red-500">{errors.departureDate}</p>}
          </div>

          {tripType === "round-trip" && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Return Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "h-11 w-full justify-start text-left font-normal transition-all hover:border-primary/50",
                      !returnDate && "text-muted-foreground",
                      errors.returnDate && "border-red-500",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={returnDate || undefined}
                    onSelect={(date) => onReturnDateChange?.(date || null)}
                    initialFocus
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      (departureDate ? date <= departureDate : false)
                    }
                  />
                </PopoverContent>
              </Popover>
              {errors.returnDate && <p className="text-xs text-red-500">{errors.returnDate}</p>}
            </div>
          )}
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Passengers <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  const current = parseInt(travellers) || 1
                  const newValue = Math.max(1, current - 1)
                  onTravellersChange?.(newValue.toString())
                }}
                disabled={parseInt(travellers) <= 1}
                className="h-11 w-11 transition-all hover:border-primary/50"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                max="20"
                value={travellers}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 20)) {
                    onTravellersChange?.(value || "1")
                  }
                }}
                className="h-11 text-center w-20 font-semibold"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  const current = parseInt(travellers) || 1
                  const newValue = Math.min(20, current + 1)
                  onTravellersChange?.(newValue.toString())
                }}
                disabled={parseInt(travellers) >= 20}
                className="h-11 w-11 transition-all hover:border-primary/50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">1-20 passengers</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Class <span className="text-red-500">*</span>
            </Label>
            <Select value={cabinClass} onValueChange={onClassChange}>
              <SelectTrigger className="h-11 transition-all hover:border-primary/50">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Economy">Economy</SelectItem>
                <SelectItem value="Premium">Premium Economy</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Special Fare <span className="text-red-500">*</span>
            </Label>
            <Select value={specialFare} onValueChange={onSpecialFareChange}>
              <SelectTrigger className="h-11 transition-all hover:border-primary/50">
                <SelectValue placeholder="Select Fare Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Regular">Regular</SelectItem>
                <SelectItem value="Deals">Deals</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
                <SelectItem value="Armed Forces">Armed Forces</SelectItem>
                <SelectItem value="SOTO">SOTO</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button 
            size="lg" 
            className="w-full md:w-auto min-w-[180px] bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-base h-11" 
            onClick={onSearch}
          >
            <Search className="mr-2 h-5 w-5" />
            Search Flights
          </Button>
        </div>

        <div className="grid gap-3 md:grid-cols-3 pt-2 text-sm">
          <div className="rounded-2xl border bg-background/80 p-3.5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Trip Type</p>
            <p className="text-base font-semibold capitalize mt-1">{readableTripType}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {tripType === "round-trip" ? "Return date enabled" : "One-way itinerary"}
            </p>
          </div>
          <div className="rounded-2xl border bg-background/80 p-3.5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Passengers</p>
            <p className="text-base font-semibold mt-1">{travellerCount} traveler{travellerCount !== 1 ? "s" : ""}</p>
            <p className="text-xs text-muted-foreground mt-1">Cabin: {cabinClass}</p>
          </div>
          <div className="rounded-2xl border bg-background/80 p-3.5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Special Fare</p>
            <p className="text-base font-semibold mt-1">{specialFare}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {flightType === "international" ? "Passport details captured later" : "In-policy fares highlighted"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

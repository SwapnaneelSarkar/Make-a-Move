"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Search, Globe, MapPin, Plus, Minus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

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

  const handleTypeChange = (value: string) => {
    if (value === "domestic" || value === "international") {
      setFlightType(value)
      localStorage.setItem("flight_search_type", value)
      onFlightTypeChange?.(value)
    }
  }

  return (
    <Card className="p-6">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <RadioGroup value={tripType} onValueChange={onTripTypeChange} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-way" id="one-way" />
              <Label htmlFor="one-way">One Way</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="round-trip" id="round-trip" />
              <Label htmlFor="round-trip">Round Trip</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multi-city" id="multi-city" disabled />
              <Label htmlFor="multi-city" className="text-muted-foreground">Multi City</Label>
            </div>
          </RadioGroup>
          <ToggleGroup type="single" value={flightType} onValueChange={handleTypeChange}>
            <ToggleGroupItem value="domestic" aria-label="Domestic">
              <MapPin className="mr-2 h-4 w-4" />
              Domestic
            </ToggleGroupItem>
            <ToggleGroupItem value="international" aria-label="International">
              <Globe className="mr-2 h-4 w-4" />
              International
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className={cn("grid gap-4", tripType === "round-trip" ? "md:grid-cols-4" : "md:grid-cols-5")}>
          <div className="space-y-2">
            <Label>
              From <span className="text-red-500">*</span>
            </Label>
            <Select value={origin} onValueChange={onOriginChange}>
              <SelectTrigger className={cn(errors.origin && "border-red-500")}>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DEL">New Delhi (DEL)</SelectItem>
                <SelectItem value="BOM">Mumbai (BOM)</SelectItem>
                <SelectItem value="BLR">Bangalore (BLR)</SelectItem>
                <SelectItem value="MAA">Chennai (MAA)</SelectItem>
                <SelectItem value="CCU">Kolkata (CCU)</SelectItem>
                <SelectItem value="HYD">Hyderabad (HYD)</SelectItem>
              </SelectContent>
            </Select>
            {errors.origin && <p className="text-xs text-red-500">{errors.origin}</p>}
          </div>
          <div className="space-y-2">
            <Label>
              To <span className="text-red-500">*</span>
            </Label>
            <Select value={destination} onValueChange={onDestinationChange}>
              <SelectTrigger className={cn(errors.destination && "border-red-500")}>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DEL">New Delhi (DEL)</SelectItem>
                <SelectItem value="BOM">Mumbai (BOM)</SelectItem>
                <SelectItem value="BLR">Bangalore (BLR)</SelectItem>
                <SelectItem value="MAA">Chennai (MAA)</SelectItem>
                <SelectItem value="CCU">Kolkata (CCU)</SelectItem>
                <SelectItem value="HYD">Hyderabad (HYD)</SelectItem>
              </SelectContent>
            </Select>
            {errors.destination && <p className="text-xs text-red-500">{errors.destination}</p>}
          </div>
          <div className="space-y-2">
            <Label>
              Departure Date <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
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
              <Label>
                Return Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
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
          {tripType !== "round-trip" && (
            <>
              <div className="space-y-2">
                <Label>
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
                    className="h-10 w-10"
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
                    className="text-center w-20"
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
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">1-20 passengers</p>
              </div>
              <div className="space-y-2">
                <Label>
                  Class <span className="text-red-500">*</span>
                </Label>
                <Select value={cabinClass} onValueChange={onClassChange}>
                  <SelectTrigger>
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
                <Label>
                  Special Fare <span className="text-red-500">*</span>
                </Label>
                <Select value={specialFare} onValueChange={onSpecialFareChange}>
                  <SelectTrigger>
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
            </>
          )}
          {tripType === "round-trip" && (
            <div className="space-y-2">
              <Label>
                Special Fare <span className="text-red-500">*</span>
              </Label>
              <Select value={specialFare} onValueChange={onSpecialFareChange}>
                <SelectTrigger>
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
          )}
        </div>

        <div className="flex justify-end">
          <Button size="lg" className="w-full md:w-auto" onClick={onSearch}>
            <Search className="mr-2 h-4 w-4" />
            Search Flights
          </Button>
        </div>
      </div>
    </Card>
  )
}

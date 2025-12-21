"use client"

import { useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { HotelCard } from "@/components/booking/hotel-card"
import { MOCK_HOTELS, type Hotel } from "@/lib/mock-data"
import { ArrowLeft, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { toast } from "sonner"
import { format, parseISO } from "date-fns"
import { ALL_CITIES } from "@/lib/hotel-cities"

export default function HotelListingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentUser } = useAppStore()
  
  // Get search parameters from URL
  const location = searchParams.get("location") || ""
  const checkIn = searchParams.get("checkIn") || ""
  const checkOut = searchParams.get("checkOut") || ""
  const rooms = parseInt(searchParams.get("rooms") || "1")
  const adults = parseInt(searchParams.get("adults") || "1")
  const children = parseInt(searchParams.get("children") || "0")
  const purposeOfStay = searchParams.get("purposeOfStay") || ""
  const starRating = searchParams.get("starRating") ? parseInt(searchParams.get("starRating")!) : undefined
  const isInternational = searchParams.get("isInternational") === "true"

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  
  // Filter state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [selectedStarRatings, setSelectedStarRatings] = useState<number[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  
  // Sorting state
  const [sortBy, setSortBy] = useState<string>("price-low-to-high")

  // Get location label
  const locationLabel = useMemo(() => {
    const city = ALL_CITIES.find((c) => c.value === location)
    return city ? city.label : location
  }, [location])

  // Get all unique amenities from hotels
  const allAmenities = useMemo(() => {
    const amenitiesSet = new Set<string>()
    MOCK_HOTELS.forEach((hotel) => {
      hotel.rooms?.forEach((room) => {
        room.inclusions?.forEach((inc) => amenitiesSet.add(inc))
      })
    })
    return Array.from(amenitiesSet).sort()
  }, [])

  // Filter hotels
  const filteredHotels = useMemo(() => {
    let filtered = MOCK_HOTELS.filter((hotel) => {
      // Location filter
      if (location && !hotel.location.toLowerCase().includes(location.toLowerCase())) {
        return false
      }

      // Star rating filter
      if (selectedStarRatings.length > 0 && !selectedStarRatings.includes(hotel.rating)) {
        return false
      }

      // Price range filter
      const hotelPrice = hotel.pricePerNight
      if (hotelPrice < priceRange[0] || hotelPrice > priceRange[1]) {
        return false
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hotelAmenities = hotel.rooms?.flatMap((r) => r.inclusions || []) || []
        const hasAllSelected = selectedAmenities.every((amenity) =>
          hotelAmenities.some((h) => h.toLowerCase().includes(amenity.toLowerCase())),
        )
        if (!hasAllSelected) return false
      }

      return true
    })

    // Sort hotels
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low-to-high":
          return a.pricePerNight - b.pricePerNight
        case "price-high-to-low":
          return b.pricePerNight - a.pricePerNight
        case "rating-high-to-low":
          return b.rating - a.rating
        case "rating-low-to-high":
          return a.rating - b.rating
        default:
          return 0
      }
    })

    return filtered
  }, [location, selectedStarRatings, priceRange, selectedAmenities, sortBy])

  const handleBook = (hotel: Hotel) => {
    setSelectedHotel(hotel)
    
    // Navigate to main hotels page with selected hotel and search params
    const params = new URLSearchParams(searchParams.toString())
    params.set("selectedHotel", hotel.id)
    router.push(`/dashboard/hotels?${params.toString()}`)
  }

  const handleBack = () => {
    router.push("/dashboard/hotels")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Available Hotels</h1>
          <p className="text-muted-foreground">
            {filteredHotels.length} hotel{filteredHotels.length !== 1 ? "s" : ""} found
            {locationLabel && ` in ${locationLabel}`}
            {checkIn && checkOut && ` • ${format(parseISO(checkIn), "MMM d")} - ${format(parseISO(checkOut), "MMM d")}`}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Filters Sidebar */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Star Rating */}
            <div className="space-y-3">
              <Label>Star Rating</Label>
              <div className="space-y-2">
                {[5, 4, 3].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={selectedStarRatings.includes(rating)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedStarRatings([...selectedStarRatings, rating])
                        } else {
                          setSelectedStarRatings(selectedStarRatings.filter((r) => r !== rating))
                        }
                      }}
                    />
                    <Label htmlFor={`rating-${rating}`} className="cursor-pointer flex items-center gap-1">
                      {Array.from({ length: rating }).map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-3">
              <Label>Price Range (per night)</Label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={50000}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
                  <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Amenities */}
            <div className="space-y-3">
              <Label>Amenities</Label>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {allAmenities.slice(0, 10).map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedAmenities([...selectedAmenities, amenity])
                        } else {
                          setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
                        }
                      }}
                    />
                    <Label htmlFor={`amenity-${amenity}`} className="cursor-pointer text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotels List */}
        <div className="space-y-4">
          {/* Sort and Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredHotels.length} hotel{filteredHotels.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              <Label htmlFor="sort" className="text-sm">Sort by:</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort" className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
                  <SelectItem value="rating-high-to-low">Rating: High to Low</SelectItem>
                  <SelectItem value="rating-low-to-high">Rating: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Hotels Grid */}
          {filteredHotels.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No hotels found matching your criteria.</p>
                <Button variant="outline" className="mt-4" onClick={handleBack}>
                  Modify Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onBook={handleBook}
                  userRole={currentUser.role}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


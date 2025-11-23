"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Hotel } from "@/lib/mock-data"
import { Star, MapPin, Wifi, Coffee, Dumbbell, AlertCircle } from "lucide-react"

interface HotelCardProps {
  hotel: Hotel
  onBook: (hotel: Hotel) => void
}

export function HotelCard({ hotel, onBook }: HotelCardProps) {
  // Helper for rendering amenity icons
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-3 w-3" />
      case "breakfast":
        return <Coffee className="h-3 w-3" />
      case "gym":
        return <Dumbbell className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative h-48 w-full md:h-auto md:w-64">
          <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="h-full w-full object-cover" />
          <div className="absolute top-2 right-2 rounded bg-white/90 px-2 py-1 text-xs font-bold shadow-sm">
            {hotel.rating} <Star className="inline h-3 w-3 fill-yellow-400 text-yellow-400" />
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex flex-1 flex-col justify-between p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-xl font-semibold">{hotel.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                {hotel.location}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                  <Badge key={idx} variant="outline" className="flex gap-1 text-xs font-normal">
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </Badge>
                ))}
                {hotel.amenities.length > 4 && (
                  <Badge variant="outline" className="text-xs font-normal">
                    +{hotel.amenities.length - 4}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {hotel.currency} {hotel.pricePerNight}
                </div>
                <div className="text-xs text-muted-foreground">per night</div>
              </div>

              {!hotel.policyCompliant && (
                <div className="flex items-center gap-1 text-xs text-yellow-600">
                  <AlertCircle className="h-3 w-3" />
                  <span>Out of Policy</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <p className="line-clamp-1 text-sm text-muted-foreground md:line-clamp-2">{hotel.description}</p>
            <Button
              onClick={() => onBook(hotel)}
              variant={hotel.policyCompliant ? "default" : "secondary"}
              className="ml-4 shrink-0"
            >
              {hotel.policyCompliant ? "Select Room" : "Request Approval"}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

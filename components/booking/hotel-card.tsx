"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Hotel } from "@/lib/mock-data"
import { Star, MapPin, Wifi, Coffee, Dumbbell, AlertCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface HotelCardProps {
  hotel: Hotel
  onBook: (hotel: Hotel) => void
}

export function HotelCard({ hotel, onBook }: HotelCardProps) {
  // Helper for rendering amenity icons
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-3.5 w-3.5" />
      case "breakfast":
        return <Coffee className="h-3.5 w-3.5" />
      case "gym":
        return <Dumbbell className="h-3.5 w-3.5" />
      default:
        return null
    }
  }

  return (
    <Card className="group overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden md:h-auto md:w-80">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
          <img 
            src={hotel.image || "/placeholder.svg"} 
            alt={hotel.name} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-gray-900">{hotel.rating}</span>
          </div>
          {hotel.rating >= 4.5 && (
            <div className="absolute top-4 left-4 z-20">
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md">
                <Sparkles className="mr-1 h-3 w-3" />
                Premium
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="flex flex-1 flex-col justify-between p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">{hotel.name}</h3>
                <div className="flex items-center gap-1.5 mt-1.5 text-sm font-medium text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {hotel.location}
                </div>
              </div>

              <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                {hotel.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {hotel.amenities.slice(0, 5).map((amenity, idx) => (
                  <Badge 
                    key={idx} 
                    variant="secondary" 
                    className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1"
                  >
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </Badge>
                ))}
                {hotel.amenities.length > 5 && (
                  <Badge variant="outline" className="text-xs font-medium px-2.5 py-1">
                    +{hotel.amenities.length - 5} more
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 md:min-w-[140px]">
              <div className="text-right space-y-1">
                <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {hotel.currency} {hotel.pricePerNight.toLocaleString("en-IN")}
                </div>
                <div className="text-xs font-medium text-muted-foreground">per night</div>
              </div>

              {!hotel.policyCompliant && (
                <Badge variant="outline" className="w-fit border-yellow-500/50 bg-yellow-50 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  Out of Policy
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium">Best Price Guaranteed</span>
            </div>
            <Button
              onClick={() => onBook(hotel)}
              variant={hotel.policyCompliant ? "default" : "secondary"}
              size="lg"
              className={cn(
                "font-semibold shadow-sm transition-all duration-200",
                hotel.policyCompliant && "hover:shadow-md hover:scale-[1.02]"
              )}
            >
              {hotel.policyCompliant ? "Select Room" : "Request Approval"}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

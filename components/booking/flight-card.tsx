"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Flight } from "@/lib/mock-data"
import type { Role } from "@/lib/mock-data"
import { AlertCircle } from "lucide-react"

interface FlightCardProps {
  flight: Flight
  onBook: (flight: Flight) => void
  userRole?: Role
}

export function FlightCard({ flight, onBook, userRole }: FlightCardProps) {
  // Only show policy warnings to AGENT and SUB_AGENT
  const showPolicyWarning = userRole === "AGENT" || userRole === "SUB_AGENT"
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Airline Info */}
          <div className="flex items-center gap-4 md:w-1/4">
            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border bg-white">
              <img
                src={flight.airlineLogo || "/placeholder.svg"}
                alt={flight.airline}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{flight.airline}</h3>
              <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
            </div>
          </div>

          {/* Route Info */}
          <div className="flex flex-1 items-center justify-center gap-8 md:justify-between px-4">
            <div className="text-center">
              <div className="text-xl font-bold">{formatTime(flight.departure.time)}</div>
              <div className="text-sm font-medium text-muted-foreground">{flight.departure.code}</div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="text-xs text-muted-foreground">{flight.duration}</div>
              <div className="relative flex w-24 items-center">
                <div className="h-[1px] w-full bg-border"></div>
                {flight.stops === 0 ? (
                  <div className="absolute left-1/2 -translate-x-1/2 rounded-full border bg-background px-2 text-[10px] text-muted-foreground">
                    Direct
                  </div>
                ) : (
                  <div className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border bg-primary"></div>
                )}
              </div>
            </div>

            <div className="text-center">
              <div className="text-xl font-bold">{formatTime(flight.arrival.time)}</div>
              <div className="text-sm font-medium text-muted-foreground">{flight.arrival.code}</div>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex flex-col items-end gap-3 md:w-1/4">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {flight.currency} {flight.price}
              </div>
              <div className="text-xs text-muted-foreground">per traveler</div>
            </div>

            <div className="flex w-full flex-col gap-2">
              {!flight.policyCompliant && showPolicyWarning && (
                <div className="flex items-center justify-end gap-1 text-xs text-yellow-600">
                  <AlertCircle className="h-3 w-3" />
                  <span>Out of Policy</span>
                </div>
              )}
              <Button
                onClick={() => onBook(flight)}
                variant={flight.policyCompliant || !showPolicyWarning ? "default" : "secondary"}
                className="w-full"
              >
                {flight.policyCompliant || !showPolicyWarning ? "Book Now" : "Request Approval"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Flight } from "@/lib/mock-data"
import type { Role } from "@/lib/mock-data"
import { AlertCircle, Plane, Clock, MapPin, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface FlightCardProps {
  flight: Flight
  onBook: (flight: Flight) => void
  onLock?: (flight: Flight) => void
  userRole?: Role
  canLockTickets?: boolean
}

export function FlightCard({ flight, onBook, onLock, userRole, canLockTickets }: FlightCardProps) {
  // Only show policy warnings to AGENT and SUB_AGENT
  const showPolicyWarning = userRole === "AGENT" || userRole === "SUB_AGENT"
  const bookingDisabled = userRole === "SUPER_ADMIN"
  return (
    <Card className="group overflow-hidden border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Airline Info */}
          <div className="flex items-center gap-4 lg:w-1/5">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
              <img
                src={flight.airlineLogo || "/placeholder.svg"}
                alt={flight.airline}
                className="h-full w-full object-cover p-2"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">{flight.airline}</h3>
              <p className="text-sm font-medium text-muted-foreground">{flight.flightNumber}</p>
              {flight.stops === 0 && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  <Plane className="mr-1 h-3 w-3" />
                  Direct
                </Badge>
              )}
            </div>
          </div>

          {/* Route Info */}
          <div className="flex flex-1 items-center justify-center gap-6 lg:justify-between px-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold tracking-tight">{formatTime(flight.departure.time)}</div>
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {flight.departure.code}
              </div>
              <div className="text-xs text-muted-foreground">{flight.departure.city}</div>
            </div>

            <div className="flex flex-col items-center gap-2 min-w-[120px]">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Clock className="h-3 w-3" />
                {flight.duration}
              </div>
              <div className="relative flex w-full items-center">
                <div className="h-0.5 w-full bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
                {flight.stops === 0 ? (
                  <div className="absolute left-1/2 -translate-x-1/2 rounded-full border-2 border-primary bg-background px-2.5 py-0.5 text-[10px] font-semibold text-primary shadow-sm">
                    Direct
                  </div>
                ) : (
                  <div className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-primary shadow-sm"></div>
                )}
              </div>
              {flight.stops > 0 && (
                <div className="text-[10px] text-muted-foreground">{flight.stops} stop{flight.stops > 1 ? 's' : ''}</div>
              )}
            </div>

            <div className="text-center space-y-1">
              <div className="text-2xl font-bold tracking-tight">{formatTime(flight.arrival.time)}</div>
              <div className="flex items-center justify-center gap-1 text-sm font-semibold text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {flight.arrival.code}
              </div>
              <div className="text-xs text-muted-foreground">{flight.arrival.city}</div>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex flex-col items-end gap-3 lg:w-1/5">
            <div className="text-right space-y-1">
              <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {flight.currency} {flight.price.toLocaleString("en-IN")}
              </div>
              <div className="text-xs font-medium text-muted-foreground">per traveler</div>
            </div>

            <div className="flex w-full flex-col gap-2">
              {!flight.policyCompliant && showPolicyWarning && (
                <Badge variant="outline" className="w-fit self-end border-yellow-500/50 bg-yellow-50 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400">
                  <AlertCircle className="mr-1 h-3 w-3" />
                  Out of Policy
                </Badge>
              )}
              {canLockTickets && onLock && (
                <Button
                  onClick={() => onLock(flight)}
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-medium"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Lock Ticket (48hrs)
                </Button>
              )}
              <Button
                onClick={() => onBook(flight)}
                variant={flight.policyCompliant || !showPolicyWarning ? "default" : "secondary"}
                size="lg"
                className={cn(
                  "w-full font-semibold shadow-sm transition-all duration-200",
                  flight.policyCompliant || !showPolicyWarning
                    ? "hover:shadow-md hover:scale-[1.02]"
                    : "hover:shadow-sm",
                  bookingDisabled && "opacity-60 cursor-not-allowed"
                )}
                disabled={bookingDisabled}
                title={bookingDisabled ? "Super Admins cannot initiate flight bookings" : undefined}
              >
                {bookingDisabled
                  ? "View Only"
                  : flight.policyCompliant || !showPolicyWarning
                    ? "Book Now"
                    : "Request Approval"}
              </Button>
              {bookingDisabled && (
                <p className="text-[11px] text-muted-foreground text-right">
                  Switch to an agency role to book flights.
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return "--:--"

  // Use fixed locale and UTC timezone to avoid SSR/CSR mismatches
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date)
}

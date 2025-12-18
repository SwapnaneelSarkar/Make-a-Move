"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ticketLocksDB, type TicketLock } from "@/lib/local-db"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { toast } from "sonner"
import { audit } from "@/lib/audit-utils"

export default function LockedTicketsPage() {
  const router = useRouter()
  const { currentUser } = useAppStore()
  const [locks, setLocks] = useState<TicketLock[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLocks()
    // Refresh every minute to update countdown timers
    const interval = setInterval(loadLocks, 60000)
    return () => clearInterval(interval)
  }, [])

  const loadLocks = async () => {
    try {
      setLoading(true)
      const allLocks = await ticketLocksDB.readAll()
      // Filter to show only active locks for current agent, or all for super admin
      const isSuperAdmin = currentUser.role === "SUPER_ADMIN"
      const filtered = allLocks.filter((lock) => {
        if (lock.status !== "LOCKED") return false
        const now = new Date().toISOString()
        if (lock.expiresAt <= now) {
          // Auto-expire old locks
          ticketLocksDB.update(lock.id, { status: "EXPIRED" })
          return false
        }
        return isSuperAdmin || lock.agentId === currentUser.id
      })
      setLocks(filtered)
    } catch (error) {
      console.error("Failed to load locks:", error)
      toast.error("Failed to load locked tickets")
    } finally {
      setLoading(false)
    }
  }

  const getTimeRemaining = (expiresAt: string): string => {
    try {
      const expires = new Date(expiresAt)
      const now = new Date()
      if (expires <= now) return "Expired"
      
      const diffMs = expires.getTime() - now.getTime()
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      
      if (diffHours > 0) {
        return `${diffHours}h ${diffMinutes}m`
      }
      return `${diffMinutes}m`
    } catch {
      return "Invalid date"
    }
  }

  const handleConvertToBooking = async (lock: TicketLock) => {
    // Navigate to booking flow with lock data
    const params = new URLSearchParams({
      lockId: lock.id,
      origin: lock.searchData.origin,
      destination: lock.searchData.destination,
      departureDate: lock.searchData.departureDate,
      returnDate: lock.searchData.returnDate || "",
      travellers: lock.quantity.toString(),
      class: lock.searchData.class,
      tripType: lock.searchData.tripType,
      isInternational: lock.searchData.isInternational.toString(),
      selectedFlight: lock.flightId,
    })
    router.push(`/dashboard/flights?${params.toString()}`)
  }

  const handleCancelLock = async (lock: TicketLock) => {
    try {
      await ticketLocksDB.update(lock.id, { status: "CANCELLED" })
      await audit.create("ticket_locks", lock.id, {
        action: "CANCELLED",
        agentId: currentUser.id,
      })
      toast.success("Ticket lock cancelled")
      loadLocks()
    } catch (error) {
      console.error("Failed to cancel lock:", error)
      toast.error("Failed to cancel ticket lock")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading locked tickets...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Locked Tickets</h1>
          <p className="text-muted-foreground">
            View and manage tickets locked for 48 hours at a fixed price.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push("/dashboard/flights")}>
          Back to Flights
        </Button>
      </div>

      {locks.length === 0 ? (
        <div className="border rounded-lg p-12 text-center">
          <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No locked tickets</h3>
          <p className="text-muted-foreground mb-4">
            You don't have any active ticket locks. Lock tickets from the fare review stage to hold them for 48 hours.
          </p>
          <Button onClick={() => router.push("/dashboard/flights")}>Search Flights</Button>
        </div>
      ) : (
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lock ID</TableHead>
                <TableHead>Flight</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price per Ticket</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Time Remaining</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locks.map((lock) => {
                const timeRemaining = getTimeRemaining(lock.expiresAt)
                const expires = new Date(lock.expiresAt)
                const now = new Date()
                const diffHours = (expires.getTime() - now.getTime()) / (1000 * 60 * 60)
                const isExpiringSoon = diffHours > 0 && diffHours < 2

                return (
                  <TableRow key={lock.id}>
                    <TableCell className="font-mono text-sm">{lock.lockId}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{lock.flightDetails.airline}</p>
                        <p className="text-sm text-muted-foreground">{lock.flightDetails.flightNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">
                          {lock.flightDetails.departure.city} → {lock.flightDetails.arrival.city}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(lock.flightDetails.departure.time).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold">{lock.quantity || 1} ticket{(lock.quantity || 1) > 1 ? "s" : ""}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold">₹{(lock.pricePerTicket || lock.lockedPrice / (lock.quantity || 1)).toLocaleString("en-IN")}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold">₹{lock.lockedPrice.toLocaleString("en-IN")}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className={`h-4 w-4 ${isExpiringSoon ? "text-orange-500" : "text-muted-foreground"}`} />
                        <span className={isExpiringSoon ? "text-orange-500 font-semibold" : ""}>
                          {timeRemaining}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{lock.agentName}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-blue-500 text-white">
                        Locked
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleConvertToBooking(lock)}
                          disabled={timeRemaining === "Expired"}
                        >
                          Convert to Booking
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancelLock(lock)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

    </div>
  )
}


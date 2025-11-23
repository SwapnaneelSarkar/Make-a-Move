"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SeatStatus = "available" | "paid" | "selected" | "unavailable"

interface Seat {
  id: string
  row: number
  col: number
  status: SeatStatus
  price: number
}

const ROWS = 20
const COLS = 6
const COL_LABELS = ["A", "B", "C", "D", "E", "F"]

export function SeatMap() {
  const [seats, setSeats] = useState<Seat[]>(() => {
    // Initialize seats
    const initialSeats: Seat[] = []
    for (let row = 1; row <= ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        let status: SeatStatus = "available"
        // Mock some seats as paid or unavailable
        if (row === 1 && col < 2) status = "paid"
        if (row === 2 && col === 0) status = "unavailable"
        if (row === 3 && col === 5) status = "paid"

        initialSeats.push({
          id: `${row}${COL_LABELS[col]}`,
          row,
          col,
          status,
          price: 500 + row * 50,
        })
      }
    }
    return initialSeats
  })

  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null)

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "unavailable" || seat.status === "paid") return

    // Toggle selection
    if (selectedSeat?.id === seat.id) {
      setSelectedSeat(null)
      setSeats(seats.map((s) => (s.id === seat.id ? { ...s, status: "available" } : s)))
    } else {
      // Deselect previous
      if (selectedSeat) {
        setSeats(seats.map((s) => (s.id === selectedSeat.id ? { ...s, status: "available" } : s)))
      }
      setSelectedSeat(seat)
      setSeats(seats.map((s) => (s.id === seat.id ? { ...s, status: "selected" } : s)))
    }
  }

  const getSeatColor = (status: SeatStatus) => {
    switch (status) {
      case "available":
        return "bg-white border-gray-300 hover:bg-gray-50 cursor-pointer"
      case "paid":
        return "bg-blue-500 border-blue-600 cursor-not-allowed"
      case "selected":
        return "bg-green-500 border-green-600 cursor-pointer"
      case "unavailable":
        return "bg-gray-400 border-gray-500 cursor-not-allowed"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Seat</CardTitle>
        <CardDescription>Click on an available seat to select it</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="grid grid-cols-6 gap-2 max-w-md">
            {seats
              .filter((s) => s.row === 1)
              .map((seat) => (
                <div
                  key={seat.id}
                  className={cn(
                    "w-10 h-10 border-2 rounded flex items-center justify-center text-xs font-medium",
                    getSeatColor(seat.status),
                  )}
                  onClick={() => handleSeatClick(seat)}
                >
                  {COL_LABELS[seat.col]}
                </div>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2 max-w-md mx-auto">
          {Array.from({ length: ROWS }, (_, rowIndex) => {
            const row = rowIndex + 1
            return (
              <div key={row} className="contents">
                <div className="flex items-center justify-end pr-2 text-sm font-medium">{row}</div>
                {Array.from({ length: COLS }, (_, colIndex) => {
                  const seat = seats.find((s) => s.row === row && s.col === colIndex)!
                  return (
                    <div
                      key={seat.id}
                      className={cn(
                        "w-10 h-10 border-2 rounded flex items-center justify-center text-xs font-medium",
                        getSeatColor(seat.status),
                      )}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {COL_LABELS[colIndex]}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-6 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded" />
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 border-2 border-green-600 rounded" />
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 border-2 border-blue-600 rounded" />
            <span className="text-sm">Paid</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 border-2 border-gray-500 rounded" />
            <span className="text-sm">Unavailable</span>
          </div>
        </div>

        {selectedSeat && (
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-semibold">Selected Seat</p>
              <p className="text-sm text-muted-foreground">
                Seat {selectedSeat.id} - ₹{selectedSeat.price}
              </p>
            </div>
            <Button>Continue</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}


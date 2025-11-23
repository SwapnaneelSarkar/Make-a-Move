"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, Building2, Wallet, RefreshCw, AlertCircle, CalendarDays, Zap } from "lucide-react"
import Link from "next/link"

interface QuickLinkAction {
  id: string
  label: string
  href: string
  icon: any
}

const ALL_ACTIONS: QuickLinkAction[] = [
  { id: "search_flights", label: "Search Flights", href: "/dashboard/flights", icon: Plane },
  { id: "search_hotels", label: "Search Hotels", href: "/dashboard/hotels", icon: Building2 },
  { id: "view_wallet", label: "View Wallet", href: "/dashboard/wallet", icon: Wallet },
  { id: "raise_refund", label: "Raise Refund", href: "/dashboard/refunds", icon: RefreshCw },
  { id: "raise_dispute", label: "Raise Dispute", href: "/dashboard/disputes", icon: AlertCircle },
  { id: "view_calendar", label: "Booking Calendar", href: "/dashboard/calendar", icon: CalendarDays },
]

export function QuickLinksWidget() {
  const [topActions, setTopActions] = useState<QuickLinkAction[]>([])

  useEffect(() => {
    // Initial load from localStorage or default to first 4 actions
    const storedData = localStorage.getItem("quickLinksData")
    let actionData: Record<string, { count: number; lastUsed: number }> = {}

    if (storedData) {
      try {
        actionData = JSON.parse(storedData)
      } catch (e) {
        console.error("Failed to parse quick links data", e)
      }
    }

    // Calculate scores: (frequency * 0.6) + (recencyScore * 0.4)
    // Recency score is higher for more recent timestamps
    const now = Date.now()
    const scoredActions = ALL_ACTIONS.map((action) => {
      const data = actionData[action.id] || { count: 0, lastUsed: 0 }

      // Normalize recency: 1.0 for now, decreasing over time (e.g., 7 days)
      const daysSinceUsed = (now - data.lastUsed) / (1000 * 60 * 60 * 24)
      const recencyScore = data.lastUsed > 0 ? Math.max(0, 1 - daysSinceUsed / 7) : 0

      // Simple frequency capping at 10 for normalization
      const freqScore = Math.min(data.count, 10) / 10

      const score = freqScore * 0.6 + recencyScore * 0.4

      // Boost actions with 0 usage slightly so they appear if nothing else is used
      return { ...action, score: score + (data.count === 0 ? 0.1 : 0) }
    })

    // Sort by score descending and take top 4
    const sorted = scoredActions.sort((a, b) => b.score - a.score).slice(0, 4)
    setTopActions(sorted)
  }, [])

  const handleActionClick = (actionId: string) => {
    // Update tracking data
    const storedData = localStorage.getItem("quickLinksData")
    let actionData: Record<string, { count: number; lastUsed: number }> = {}

    if (storedData) {
      try {
        actionData = JSON.parse(storedData)
      } catch (e) {}
    }

    const current = actionData[actionId] || { count: 0, lastUsed: 0 }
    actionData[actionId] = {
      count: current.count + 1,
      lastUsed: Date.now(),
    }

    localStorage.setItem("quickLinksData", JSON.stringify(actionData))
  }

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        <Zap className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 pt-4">
        {topActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className="h-20 flex flex-col gap-2 items-center justify-center border-dashed hover:border-solid hover:border-primary/50 hover:bg-accent/50 transition-all bg-transparent"
            asChild
            onClick={() => handleActionClick(action.id)}
          >
            <Link href={action.href}>
              <action.icon className="h-6 w-6 text-primary" />
              <span className="text-xs font-medium">{action.label}</span>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}

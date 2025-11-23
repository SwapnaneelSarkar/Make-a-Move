"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Plane,
  Building2,
  Wallet,
  RefreshCw,
  AlertCircle,
  CalendarDays,
  Zap,
  FileText,
  Users,
  Settings,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { useAppStore } from "@/lib/store"

interface QuickLinkAction {
  id: string
  label: string
  href: string
  icon: any
  category?: string
}

const ALL_ACTIONS: QuickLinkAction[] = [
  { id: "search_flights", label: "Search Flights", href: "/dashboard/flights", icon: Plane, category: "booking" },
  { id: "search_hotels", label: "Search Hotels", href: "/dashboard/hotels", icon: Building2, category: "booking" },
  { id: "view_wallet", label: "View Wallet", href: "/dashboard/wallet", icon: Wallet, category: "financial" },
  { id: "raise_refund", label: "Raise Refund", href: "/dashboard/refunds", icon: RefreshCw, category: "financial" },
  { id: "raise_dispute", label: "Raise Dispute", href: "/dashboard/disputes", icon: AlertCircle, category: "support" },
  { id: "view_calendar", label: "Booking Calendar", href: "/dashboard/calendar", icon: CalendarDays, category: "booking" },
  { id: "view_bookings", label: "View Bookings", href: "/dashboard/bookings", icon: FileText, category: "booking" },
  { id: "view_reports", label: "Reports", href: "/dashboard/reports", icon: BarChart3, category: "admin" },
  { id: "view_employees", label: "Employees", href: "/dashboard/employees", icon: Users, category: "admin" },
  { id: "view_settings", label: "Settings", href: "/dashboard/settings", icon: Settings, category: "admin" },
]

export function QuickLinksWidget() {
  const [topActions, setTopActions] = useState<QuickLinkAction[]>([])
  const { currentUser } = useAppStore()

  const calculateScores = () => {
    const storedData = localStorage.getItem("quickLinksData")
    let actionData: Record<string, { count: number; lastUsed: number; sessions: number[] }> = {}

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData)
        // Migrate old format to new format
        Object.keys(parsed).forEach((key) => {
          if (parsed[key].count !== undefined) {
            actionData[key] = {
              count: parsed[key].count || 0,
              lastUsed: parsed[key].lastUsed || 0,
              sessions: parsed[key].sessions || [],
            }
          }
        })
      } catch (e) {
        console.error("Failed to parse quick links data", e)
      }
    }

    const now = Date.now()
    const currentSession = Math.floor(now / (1000 * 60 * 60 * 24)) // Session = day

    // Filter actions based on user role
    const availableActions = ALL_ACTIONS.filter((action) => {
      // Show admin actions only to admins
      if (action.category === "admin" && currentUser.role !== "SUPER_ADMIN" && currentUser.role !== "AGENCY_ADMIN") {
        return false
      }
      return true
    })

    const scoredActions = availableActions.map((action) => {
      const data = actionData[action.id] || { count: 0, lastUsed: 0, sessions: [] }

      // Frequency Score (0-1): Based on total usage count with logarithmic scaling
      // This prevents very high counts from dominating
      const maxCount = Math.max(...Object.values(actionData).map((d) => d.count || 0), 1)
      const freqScore = maxCount > 0 ? Math.log10(data.count + 1) / Math.log10(maxCount + 1) : 0

      // Recency Score (0-1): Higher for more recent usage
      // Uses exponential decay over 14 days
      const daysSinceUsed = (now - data.lastUsed) / (1000 * 60 * 60 * 24)
      const recencyScore = data.lastUsed > 0 ? Math.exp(-daysSinceUsed / 14) : 0

      // Session Diversity Score (0-1): Rewards actions used across multiple sessions
      const uniqueSessions = new Set(data.sessions).size
      const sessionScore = Math.min(uniqueSessions / 7, 1) // Normalize to 7 sessions

      // Combined score: Frequency (50%) + Recency (35%) + Session Diversity (15%)
      const score = freqScore * 0.5 + recencyScore * 0.35 + sessionScore * 0.15

      // Small boost for unused actions to ensure they appear initially
      const finalScore = data.count === 0 ? score + 0.05 : score

      return { ...action, score: finalScore, data }
    })

    // Sort by score descending and take top 4
    return scoredActions.sort((a, b) => b.score - a.score).slice(0, 4)
  }

  useEffect(() => {
    const sorted = calculateScores()
    setTopActions(sorted)
  }, [currentUser.role])

  const handleActionClick = (actionId: string) => {
    // Update tracking data
    const storedData = localStorage.getItem("quickLinksData")
    let actionData: Record<string, { count: number; lastUsed: number; sessions: number[] }> = {}

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData)
        Object.keys(parsed).forEach((key) => {
          if (parsed[key].count !== undefined) {
            actionData[key] = {
              count: parsed[key].count || 0,
              lastUsed: parsed[key].lastUsed || 0,
              sessions: parsed[key].sessions || [],
            }
          }
        })
      } catch (e) {}
    }

    const now = Date.now()
    const currentSession = Math.floor(now / (1000 * 60 * 60 * 24))

    const current = actionData[actionId] || { count: 0, lastUsed: 0, sessions: [] }
    const sessions = new Set(current.sessions)
    sessions.add(currentSession)

    actionData[actionId] = {
      count: current.count + 1,
      lastUsed: now,
      sessions: Array.from(sessions),
    }

    localStorage.setItem("quickLinksData", JSON.stringify(actionData))

    // Recalculate and update top actions
    const sorted = calculateScores()
    setTopActions(sorted)
  }

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Smart Quick Links</CardTitle>
        <Zap className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-4">
          Personalized based on your usage patterns
        </p>
        <div className="grid grid-cols-2 gap-4">
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
                <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

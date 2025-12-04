"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { TrendingUp, Wallet, RefreshCw, Plane, Building2, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { bookingsDB, transactionsDB, refundsDB, type Booking, type Transaction, type Refund } from "@/lib/local-db"
import { MOCK_USERS } from "@/lib/mock-data"

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: React.ReactNode
  trend?: "up" | "down"
}

function MetricCard({ title, value, change, changeLabel, icon, trend }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            {trend === "up" ? (
              <ArrowUpRight className="h-3 w-3 text-green-600" />
            ) : trend === "down" ? (
              <ArrowDownRight className="h-3 w-3 text-red-600" />
            ) : null}
            <span className={trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : ""}>
              {change > 0 ? "+" : ""}
              {change}%
            </span>
            {changeLabel && <span className="ml-1">{changeLabel}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function AdminUsageInsights() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [refunds, setRefunds] = useState<Refund[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [bookingsData, transactionsData, refundsData] = await Promise.all([
        bookingsDB.readAll(),
        transactionsDB.readAll(),
        refundsDB.readAll(),
      ])

      // If there is no real data yet, seed the insights with mock data
      if (bookingsData.length === 0 && transactionsData.length === 0 && refundsData.length === 0) {
        const now = new Date()
        const today = now.toISOString().split("T")[0]
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0]

        const mockBookings: Booking[] = [
          {
            id: "mock-booking-1",
            bookingId: "FL-20250101-0001",
            pnr: "AB12CD",
            type: "FLIGHT",
            status: "CONFIRMED",
            details: {
              departure: { code: "DEL" },
              arrival: { code: "BOM" },
              airline: "IndiGo",
            },
            date: today,
            amount: 12500,
            agentName: "Sky Travels (Main)",
            agentId: "agent-1",
            approvalStatus: "APPROVED",
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
          },
          {
            id: "mock-booking-2",
            bookingId: "FL-20250101-0002",
            pnr: "EF34GH",
            type: "FLIGHT",
            status: "CONFIRMED",
            details: {
              departure: { code: "BOM" },
              arrival: { code: "DXB" },
              airline: "Emirates",
            },
            date: today,
            amount: 48000,
            agentName: "Sky Travels (Main)",
            agentId: "agent-1",
            approvalStatus: "APPROVED",
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
          },
          {
            id: "mock-booking-3",
            bookingId: "HT-20250101-0001",
            pnr: "IJ56KL",
            type: "HOTEL",
            status: "COMPLETED",
            details: {
              name: "The Grand Mumbai",
            },
            date: monthStart,
            amount: 8200,
            agentName: "Travel Partners Co.",
            agentId: "agent-2",
            approvalStatus: "APPROVED",
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
          },
          {
            id: "mock-booking-4",
            bookingId: "FL-20250101-0003",
            pnr: "MN78OP",
            type: "FLIGHT",
            status: "CANCELLED",
            details: {
              departure: { code: "DEL" },
              arrival: { code: "GOI" },
              airline: "IndiGo",
            },
            date: monthStart,
            amount: 9500,
            agentName: "Travel Partners Co.",
            agentId: "agent-2",
            approvalStatus: "REJECTED",
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
          },
        ]

        const mockTransactions: Transaction[] = [
          // Wallet top-ups
          {
            id: "mock-tx-1",
            date: monthStart,
            description: "Wallet Top-up - Sky Travels (Main)",
            amount: 100000,
            type: "CREDIT",
            status: "Completed",
            paymentMethod: "Bank Transfer",
            productType: "Wallet Top-up",
            balanceAfter: 100000,
            createdAt: now.toISOString(),
          },
          {
            id: "mock-tx-2",
            date: today,
            description: "Wallet Top-up - Travel Partners Co.",
            amount: 50000,
            type: "CREDIT",
            status: "Completed",
            paymentMethod: "UPI",
            productType: "Wallet Top-up",
            balanceAfter: 150000,
            createdAt: now.toISOString(),
          },
          // Usage debits
          {
            id: "mock-tx-3",
            date: today,
            description: "Flight booking - DEL-BOM",
            amount: 12500,
            type: "DEBIT",
            status: "Completed",
            paymentMethod: "Wallet",
            productType: "Flight",
            bookingId: "FL-20250101-0001",
            balanceAfter: 137500,
            createdAt: now.toISOString(),
          },
          {
            id: "mock-tx-4",
            date: today,
            description: "Flight booking - BOM-DXB",
            amount: 48000,
            type: "DEBIT",
            status: "Completed",
            paymentMethod: "Wallet",
            productType: "Flight",
            bookingId: "FL-20250101-0002",
            balanceAfter: 89500,
            createdAt: now.toISOString(),
          },
          {
            id: "mock-tx-5",
            date: monthStart,
            description: "Hotel booking - The Grand Mumbai",
            amount: 8200,
            type: "DEBIT",
            status: "Completed",
            paymentMethod: "Wallet",
            productType: "Hotel",
            bookingId: "HT-20250101-0001",
            balanceAfter: 81300,
            createdAt: now.toISOString(),
          },
        ]

        const mockRefunds: Refund[] = [
          {
            id: "mock-refund-1",
            refundId: "RF-20250101-0001",
            bookingId: "FL-20250101-0003",
            reason: "Customer cancellation",
            type: "PARTIAL",
            amount: 4500,
            status: "Completed",
            description: "50% refund after airline charges",
            timeline: [
              { stage: "Initiated", date: monthStart, status: "Completed" },
              { stage: "Processed", date: today, status: "Completed" },
            ],
            createdAt: monthStart,
            updatedAt: today,
          },
        ]

        setBookings(mockBookings)
        setTransactions(mockTransactions)
        setRefunds(mockRefunds)
      } else {
        setBookings(bookingsData)
        setTransactions(transactionsData)
        setRefunds(refundsData)
      }
    } catch (error) {
      console.error("Failed to load insights data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate metrics
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const thisMonthBookings = bookings.filter(
    (b) => new Date(b.date) >= thisMonth && new Date(b.date) <= now
  )
  const lastMonthBookings = bookings.filter(
    (b) => new Date(b.date) >= lastMonth && new Date(b.date) < thisMonth
  )

  // Bookings metrics
  const totalBookings = bookings.length
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED").length
  const pendingBookings = bookings.filter((b) => b.status === "PENDING_APPROVAL").length
  const cancelledBookings = bookings.filter((b) => b.status === "CANCELLED").length
  const bookingsChange =
    lastMonthBookings.length > 0
      ? ((thisMonthBookings.length - lastMonthBookings.length) / lastMonthBookings.length) * 100
      : 0

  // Conversion rate (estimated: bookings / searches, using bookings as proxy)
  // In real app, you'd track search events separately
  const estimatedSearches = totalBookings * 3 // Assume 3 searches per booking
  const conversionRate = estimatedSearches > 0 ? (totalBookings / estimatedSearches) * 100 : 0
  const lastMonthConversion = lastMonthBookings.length > 0
    ? (lastMonthBookings.length / (lastMonthBookings.length * 3)) * 100
    : 0
  const conversionChange = lastMonthConversion > 0
    ? ((conversionRate - lastMonthConversion) / lastMonthConversion) * 100
    : 0

  // Agent performance
  const agentStats = bookings.reduce((acc, booking) => {
    const agentId = booking.agentId
    if (!acc[agentId]) {
      acc[agentId] = {
        agentId,
        agentName: booking.agentName,
        bookings: 0,
        revenue: 0,
        confirmed: 0,
      }
    }
    acc[agentId].bookings++
    acc[agentId].revenue += booking.amount
    if (booking.status === "CONFIRMED") {
      acc[agentId].confirmed++
    }
    return acc
  }, {} as Record<string, { agentId: string; agentName: string; bookings: number; revenue: number; confirmed: number }>)

  const topAgents = Object.values(agentStats)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map((agent) => ({
      name: agent.agentName,
      bookings: agent.bookings,
      revenue: agent.revenue,
      conversion: agent.bookings > 0 ? (agent.confirmed / agent.bookings) * 100 : 0,
    }))

  // Wallet usage
  const walletTransactions = transactions.filter((t) => t.productType === "Wallet Top-up")
  const totalWalletTopUps = walletTransactions.reduce((sum, t) => sum + (t.type === "CREDIT" ? t.amount : 0), 0)
  const walletDebits = transactions.filter((t) => t.type === "DEBIT" && t.productType !== "Wallet Top-up")
  const totalWalletUsage = walletDebits.reduce((sum, t) => sum + t.amount, 0)
  const walletUtilization = totalWalletTopUps > 0 ? (totalWalletUsage / totalWalletTopUps) * 100 : 0

  // Refund rate
  const totalRefunds = refunds.length
  const completedRefunds = refunds.filter((r) => r.status === "Completed").length
  const refundRate = totalBookings > 0 ? (totalRefunds / totalBookings) * 100 : 0
  const refundAmount = refunds.reduce((sum, r) => sum + r.amount, 0)

  // Top routes (flights)
  const flightBookings = bookings.filter((b) => b.type === "FLIGHT")
  const routeStats = flightBookings.reduce((acc, booking) => {
    if (booking.details?.departure && booking.details?.arrival) {
      const route = `${booking.details.departure.code}-${booking.details.arrival.code}`
      if (!acc[route]) {
        acc[route] = { route, count: 0, revenue: 0 }
      }
      acc[route].count++
      acc[route].revenue += booking.amount
    }
    return acc
  }, {} as Record<string, { route: string; count: number; revenue: number }>)

  const topRoutes = Object.values(routeStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Top hotels
  const hotelBookings = bookings.filter((b) => b.type === "HOTEL")
  const hotelStats = hotelBookings.reduce((acc, booking) => {
    const hotelName = booking.details?.name || "Unknown"
    if (!acc[hotelName]) {
      acc[hotelName] = { name: hotelName, count: 0, revenue: 0 }
    }
    acc[hotelName].count++
    acc[hotelName].revenue += booking.amount
    return acc
  }, {} as Record<string, { name: string; count: number; revenue: number }>)

  const topHotels = Object.values(hotelStats)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Supplier performance (airlines/hotels)
  const supplierStats = bookings.reduce((acc, booking) => {
    let supplierName = "Unknown"
    if (booking.type === "FLIGHT" && booking.details?.airline) {
      supplierName = booking.details.airline
    } else if (booking.type === "HOTEL" && booking.details?.name) {
      supplierName = booking.details.name
    }

    if (!acc[supplierName]) {
      acc[supplierName] = {
        name: supplierName,
        bookings: 0,
        revenue: 0,
        type: booking.type,
      }
    }
    acc[supplierName].bookings++
    acc[supplierName].revenue += booking.amount
    return acc
  }, {} as Record<string, { name: string; bookings: number; revenue: number; type: string }>)

  const topSuppliers = Object.values(supplierStats)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Admin Usage Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">Loading insights...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Usage Insights</h2>
          <p className="text-muted-foreground">Comprehensive metrics and analytics dashboard</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Bookings"
          value={totalBookings}
          change={Math.round(bookingsChange)}
          changeLabel="vs last month"
          icon={<BarChart3 className="h-4 w-4" />}
          trend={bookingsChange >= 0 ? "up" : "down"}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${conversionRate.toFixed(1)}%`}
          change={Math.round(conversionChange)}
          changeLabel="vs last month"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={conversionChange >= 0 ? "up" : "down"}
        />
        <MetricCard
          title="Refund Rate"
          value={`${refundRate.toFixed(1)}%`}
          change={0}
          icon={<RefreshCw className="h-4 w-4" />}
        />
        <MetricCard
          title="Wallet Utilization"
          value={`${walletUtilization.toFixed(1)}%`}
          change={0}
          icon={<Wallet className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
            <CardDescription>Revenue vs bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
                bookings: { label: "Bookings", color: "hsl(var(--chart-2))" },
              }}
            >
              <BarChart data={topAgents}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue" />
                <Bar yAxisId="right" dataKey="bookings" fill="hsl(var(--chart-2))" name="Bookings" />
              </BarChart>
            </ChartContainer>
            <div className="mt-6 space-y-2">
              {topAgents.map((agent, index) => (
                <div key={index} className="flex items-center justify-between rounded border p-2">
                  <div>
                    <div className="font-medium">{agent.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {agent.bookings} bookings • {agent.conversion.toFixed(1)}% conversion
                    </div>
                  </div>
                  <div className="text-right font-semibold">₹{agent.revenue.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Usage</CardTitle>
              <CardDescription>Top-ups and utilization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Top-ups</span>
                <span className="text-lg font-semibold">₹{totalWalletTopUps.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Usage</span>
                <span className="text-lg font-semibold">₹{totalWalletUsage.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Utilization Rate</span>
                <span className="text-lg font-semibold">{walletUtilization.toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refund Metrics</CardTitle>
              <CardDescription>Refund activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Refunds</span>
                <span className="text-lg font-semibold">{totalRefunds}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Completed</span>
                <span className="text-lg font-semibold">{completedRefunds}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Refund Amount</span>
                <span className="text-lg font-semibold">₹{refundAmount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Refund Rate</span>
                <span className="text-lg font-semibold">{refundRate.toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <Plane className="mr-2 inline h-4 w-4" />
              Top Flight Routes
            </CardTitle>
            <CardDescription>Most booked sectors</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ count: { label: "Bookings", color: "hsl(var(--chart-1))" } }}>
              <BarChart data={topRoutes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="route" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--chart-1))" name="Bookings" />
              </BarChart>
            </ChartContainer>
            <div className="mt-4 space-y-2 text-sm">
              {topRoutes.map((route, index) => (
                <div key={index} className="flex items-center justify-between rounded border p-2">
                  <span className="font-medium">{route.route}</span>
                  <div className="text-right">
                    <div className="font-semibold">{route.count} bookings</div>
                    <div className="text-xs text-muted-foreground">₹{route.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Building2 className="mr-2 inline h-4 w-4" />
              Top Hotels
            </CardTitle>
            <CardDescription>Highest demand properties</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ count: { label: "Bookings", color: "hsl(var(--chart-2))" } }}>
              <BarChart data={topHotels}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-35} textAnchor="end" height={90} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--chart-2))" name="Bookings" />
              </BarChart>
            </ChartContainer>
            <div className="mt-4 space-y-2 text-sm">
              {topHotels.map((hotel, index) => (
                <div key={index} className="flex items-center justify-between rounded border p-2">
                  <span className="font-medium">{hotel.name}</span>
                  <div className="text-right">
                    <div className="font-semibold">{hotel.count} bookings</div>
                    <div className="text-xs text-muted-foreground">₹{hotel.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Supplier Performance</CardTitle>
          <CardDescription>Top airlines & hotels by revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
              bookings: { label: "Bookings", color: "hsl(var(--chart-2))" },
            }}
          >
            <BarChart data={topSuppliers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-35} textAnchor="end" height={90} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue" />
              <Bar yAxisId="right" dataKey="bookings" fill="hsl(var(--chart-2))" name="Bookings" />
            </BarChart>
          </ChartContainer>
          <div className="mt-6 space-y-2 text-sm">
            {topSuppliers.map((supplier, index) => (
              <div key={index} className="flex items-center justify-between rounded border p-2">
                <div>
                  <div className="font-medium">{supplier.name}</div>
                  <div className="text-muted-foreground">
                    <Badge variant="outline" className="mr-2 uppercase">
                      {supplier.type}
                    </Badge>
                    {supplier.bookings} bookings
                  </div>
                </div>
                <div className="text-right font-semibold">₹{supplier.revenue.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


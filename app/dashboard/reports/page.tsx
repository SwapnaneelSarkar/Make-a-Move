"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, CalendarClock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Simple chart placeholder since we don't have Recharts installed in the base setup
// In a real app we would use recharts or similar library
function BarChartPlaceholder({ height = 200 }: { height?: number }) {
  return (
    <div style={{ height }} className="flex w-full items-end gap-2 rounded-lg border bg-muted/20 p-4">
      {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
        <div
          key={i}
          className="group relative flex-1 rounded-t bg-primary transition-all hover:opacity-80"
          style={{ height: `${h}%` }}
        >
          <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded bg-popover px-2 py-1 text-xs shadow-md group-hover:block">
            ₹{h * 10000}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Visualize spending trends and compliance data.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/reports/scheduled">
              <CalendarClock className="mr-2 h-4 w-4" />
              Scheduled Reports
            </Link>
          </Button>
          <Button variant="outline">Last 30 Days</Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="spending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="spending">Spending Reports</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="spending" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Monthly Spend</CardTitle>
            <CardDescription>Travel expenses over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartPlaceholder height={300} />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Spend by Category</CardTitle>
            <CardDescription>Distribution of expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Flights</span>
                </div>
                <span className="font-bold">55%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Hotels</span>
                </div>
                <span className="font-bold">45%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Total Spend</TableHead>
                <TableHead>Avg. per Trip</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Sales</TableCell>
                <TableCell>45</TableCell>
                <TableCell>₹12,50,000</TableCell>
                <TableCell>₹27,700</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Engineering</TableCell>
                <TableCell>12</TableCell>
                <TableCell>₹4,20,000</TableCell>
                <TableCell>₹35,000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Marketing</TableCell>
                <TableCell>28</TableCell>
                <TableCell>₹8,90,000</TableCell>
                <TableCell>₹31,700</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <UserActivityAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// User Activity Analytics Component
function UserActivityAnalytics() {
  // Most used features data
  const mostUsedFeatures = [
    { feature: "Flight Bookings", count: 145 },
    { feature: "Hotel Bookings", count: 89 },
    { feature: "Wallet", count: 67 },
    { feature: "Reports", count: 43 },
    { feature: "KYC", count: 28 },
  ]

  // Time per module data
  const timePerModule = [
    { module: "Bookings", time: 45 },
    { module: "Wallet", time: 25 },
    { module: "Reports", time: 15 },
    { module: "Settings", time: 10 },
    { module: "Other", time: 5 },
  ]

  // Active users data (last 7 days)
  const activeUsers = [120, 135, 142, 138, 150, 145, 148]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Most Used Features</CardTitle>
            <CardDescription>Top features by usage count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mostUsedFeatures.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.feature}</span>
                    <span className="font-semibold">{item.count}</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(item.count / mostUsedFeatures[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time per Module</CardTitle>
            <CardDescription>Average time spent per module (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timePerModule.map((item, index) => {
                const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-gray-500"]
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-24 text-sm">{item.module}</div>
                    <div className="flex-1 h-8 bg-secondary rounded-full overflow-hidden relative">
                      <div
                        className={`h-full ${colors[index]} rounded-full flex items-center justify-end pr-2`}
                        style={{ width: `${item.time}%` }}
                      >
                        <span className="text-xs text-white font-medium">{item.time}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Users (Last 7 Days)</CardTitle>
          <CardDescription>Daily active user count</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-64">
            {activeUsers.map((count, index) => {
              const maxCount = Math.max(...activeUsers)
              const height = (count / maxCount) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary rounded-t transition-all hover:opacity-80 group relative"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-popover px-2 py-1 text-xs rounded shadow-md whitespace-nowrap">
                      {count} users
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">Day {index + 1}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

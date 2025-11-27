"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, CalendarClock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { exportToPDF } from "@/lib/export-utils"
import { toast } from "sonner"

// Monthly spend data
const monthlySpendData = [
  { month: "Jul", flights: 450000, hotels: 320000 },
  { month: "Aug", flights: 520000, hotels: 380000 },
  { month: "Sep", flights: 480000, hotels: 350000 },
  { month: "Oct", flights: 610000, hotels: 420000 },
  { month: "Nov", flights: 550000, hotels: 390000 },
  { month: "Dec", flights: 680000, hotels: 450000 },
]

// Category distribution
const categoryData = [
  { name: "Flights", value: 55, color: "hsl(var(--chart-1))" },
  { name: "Hotels", value: 45, color: "hsl(var(--chart-3))" },
]

// Booking trends
const bookingTrendsData = [
  { month: "Jul", flights: 120, hotels: 85 },
  { month: "Aug", flights: 145, hotels: 95 },
  { month: "Sep", flights: 130, hotels: 90 },
  { month: "Oct", flights: 165, hotels: 110 },
  { month: "Nov", flights: 150, hotels: 100 },
  { month: "Dec", flights: 180, hotels: 125 },
]

const chartConfig = {
  flights: {
    label: "Flights",
    color: "hsl(var(--chart-1))",
  },
  hotels: {
    label: "Hotels",
    color: "hsl(var(--chart-3))",
  },
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
          <Button
            onClick={() => {
              const reportData = {
                monthlySpend: monthlySpendData,
                categoryDistribution: categoryData,
                bookingTrends: bookingTrendsData,
                departmentBreakdown: [
                  { department: "Sales", bookings: 45, totalSpend: 1250000, avgPerTrip: 27700 },
                  { department: "Engineering", bookings: 12, totalSpend: 420000, avgPerTrip: 35000 },
                  { department: "Marketing", bookings: 28, totalSpend: 890000, avgPerTrip: 31700 },
                ],
              }
              exportReportsToPDF(reportData)
              toast.success("Report downloaded", {
                description: "Your analytics report has been downloaded as PDF.",
              })
            }}
          >
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="spending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="spending">Spending Reports</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="bi">BI Analytics</TabsTrigger>
          <TabsTrigger value="export">Export Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="spending" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Spend</CardTitle>
            <CardDescription>Travel expenses over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[320px]">
              <BarChart data={monthlySpendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="flights" fill="hsl(var(--chart-1))" name="Flights" />
                <Bar dataKey="hotels" fill="hsl(var(--chart-2))" name="Hotels" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spend by Category</CardTitle>
            <CardDescription>Distribution of expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[320px]">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="hsl(var(--chart-1))"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ChartContainer>
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

        <TabsContent value="bi" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45.2L</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg. Booking Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹36,600</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">+3 new this month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Trends</CardTitle>
                <CardDescription>Bookings over time by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <LineChart data={bookingTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="flights"
                      stroke="hsl(var(--chart-1))"
                      name="Flights"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="hotels"
                      stroke="hsl(var(--chart-2))"
                      name="Hotels"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Supplier</CardTitle>
                <CardDescription>Top performing suppliers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Air India</span>
                    <span className="font-bold">₹18.5L</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">IndiGo</span>
                    <span className="font-bold">₹15.2L</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Taj Hotels</span>
                    <span className="font-bold">₹11.5L</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
              <CardDescription>Generate and download reports in various formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Financial Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        exportToPDF(
                          monthlySpendData.map((m) => ({
                            Month: m.month,
                            Flights: `₹${m.flights.toLocaleString("en-IN")}`,
                            Hotels: `₹${m.hotels.toLocaleString("en-IN")}`,
                            Total: `₹${(m.flights + m.hotels).toLocaleString("en-IN")}`,
                          })),
                          "revenue-report",
                          "Revenue Report",
                          [
                            { header: "Month", dataKey: "Month" },
                            { header: "Flights", dataKey: "Flights" },
                            { header: "Hotels", dataKey: "Hotels" },
                            { header: "Total", dataKey: "Total" },
                          ],
                        )
                        toast.success("Revenue report downloaded")
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" /> Export Revenue Report (PDF)
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        exportToPDF(
                          [
                            { Category: "Flights", Amount: "₹32,90,000", Percentage: "55%" },
                            { Category: "Hotels", Amount: "₹26,90,000", Percentage: "45%" },
                          ],
                          "expense-report",
                          "Expense Report",
                          [
                            { header: "Category", dataKey: "Category" },
                            { header: "Amount", dataKey: "Amount" },
                            { header: "Percentage", dataKey: "Percentage" },
                          ],
                        )
                        toast.success("Expense report downloaded")
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" /> Export Expense Report (PDF)
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Operational Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        exportToPDF(
                          bookingTrendsData.map((b) => ({
                            Month: b.month,
                            Flights: b.flights,
                            Hotels: b.hotels,
                            Total: b.flights + b.hotels,
                          })),
                          "booking-report",
                          "Booking Report",
                          [
                            { header: "Month", dataKey: "Month" },
                            { header: "Flights", dataKey: "Flights" },
                            { header: "Hotels", dataKey: "Hotels" },
                            { header: "Total", dataKey: "Total" },
                          ],
                        )
                        toast.success("Booking report downloaded")
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" /> Export Booking Report (PDF)
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        exportToPDF(
                          [
                            { Department: "Sales", Bookings: 45, "Total Spend": "₹12,50,000", "Avg per Trip": "₹27,700" },
                            { Department: "Engineering", Bookings: 12, "Total Spend": "₹4,20,000", "Avg per Trip": "₹35,000" },
                            { Department: "Marketing", Bookings: 28, "Total Spend": "₹8,90,000", "Avg per Trip": "₹31,700" },
                          ],
                          "agent-performance",
                          "Agent Performance Report",
                          [
                            { header: "Department", dataKey: "Department" },
                            { header: "Bookings", dataKey: "Bookings" },
                            { header: "Total Spend", dataKey: "Total Spend" },
                            { header: "Avg per Trip", dataKey: "Avg per Trip" },
                          ],
                        )
                        toast.success("Agent performance report downloaded")
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" /> Export Agent Performance (PDF)
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
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

// Function to export comprehensive reports to PDF
function exportReportsToPDF(reportData: any) {
  const jsPDF = require("jspdf").jsPDF
  const autoTable = require("jspdf-autotable").default

  const doc = new jsPDF()

  // Title
  doc.setFontSize(20)
  doc.text("Analytics & Reports", 14, 20)
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28)

  let yPos = 35

  // Monthly Spend Table
  doc.setFontSize(14)
  doc.text("Monthly Spend Overview", 14, yPos)
  yPos += 8

  const monthlyTableData = reportData.monthlySpend.map((m: any) => [
    m.month,
    `₹${m.flights.toLocaleString("en-IN")}`,
    `₹${m.hotels.toLocaleString("en-IN")}`,
    `₹${(m.flights + m.hotels).toLocaleString("en-IN")}`,
  ])

  autoTable(doc, {
    head: [["Month", "Flights", "Hotels", "Total"]],
    body: monthlyTableData,
    startY: yPos,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [66, 139, 202] },
  })

  yPos = (doc as any).lastAutoTable.finalY + 15

  // Category Distribution
  doc.setFontSize(14)
  doc.text("Category Distribution", 14, yPos)
  yPos += 8

  const categoryTableData = reportData.categoryDistribution.map((c: any) => [
    c.name,
    `${c.value}%`,
  ])

  autoTable(doc, {
    head: [["Category", "Percentage"]],
    body: categoryTableData,
    startY: yPos,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [66, 139, 202] },
  })

  yPos = (doc as any).lastAutoTable.finalY + 15

  // Department Breakdown
  doc.setFontSize(14)
  doc.text("Department Breakdown", 14, yPos)
  yPos += 8

  const deptTableData = reportData.departmentBreakdown.map((d: any) => [
    d.department,
    d.bookings.toString(),
    `₹${d.totalSpend.toLocaleString("en-IN")}`,
    `₹${d.avgPerTrip.toLocaleString("en-IN")}`,
  ])

  autoTable(doc, {
    head: [["Department", "Bookings", "Total Spend", "Avg per Trip"]],
    body: deptTableData,
    startY: yPos,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [66, 139, 202] },
  })

  doc.save(`analytics-report-${new Date().toISOString().slice(0, 10)}.pdf`)
}

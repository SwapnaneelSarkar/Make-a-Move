"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Search, Building2, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MOCK_CORPORATES = [
  {
    id: "c1",
    name: "Acme Corp",
    industry: "Technology",
    employees: 120,
    status: "Active",
    lastActive: "2 mins ago",
    totalSpend: "₹37,50,000",
  },
  {
    id: "c2",
    name: "Global Logistics",
    industry: "Supply Chain",
    employees: 450,
    status: "Active",
    lastActive: "1 hour ago",
    totalSpend: "₹1,00,00,000",
  },
  {
    id: "c3",
    name: "Stark Industries",
    industry: "Manufacturing",
    employees: 1200,
    status: "Active",
    lastActive: "5 mins ago",
    totalSpend: "₹7,00,00,000",
  },
  {
    id: "c4",
    name: "Cyberdyne Systems",
    industry: "Technology",
    employees: 85,
    status: "Pending",
    lastActive: "1 day ago",
    totalSpend: "$0",
  },
]

export default function CorporatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Corporate Management</h1>
          <p className="text-muted-foreground">Oversee all registered companies and their usage.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Onboard New Corporate
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Corporates</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Platform Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹10 Cr</div>
            <p className="text-xs text-muted-foreground">+15% YoY growth</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,850</div>
            <p className="text-xs text-muted-foreground">Across all corporates</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search companies..." className="pl-9" />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead>Total Spend</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_CORPORATES.map((corp) => (
              <TableRow key={corp.id}>
                <TableCell className="font-medium">{corp.name}</TableCell>
                <TableCell>{corp.industry}</TableCell>
                <TableCell>{corp.employees}</TableCell>
                <TableCell>{corp.totalSpend}</TableCell>
                <TableCell>
                  <Badge
                    variant={corp.status === "Active" ? "default" : "secondary"}
                    className={corp.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {corp.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{corp.lastActive}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Dashboard</DropdownMenuItem>
                      <DropdownMenuItem>Manage Settings</DropdownMenuItem>
                      <DropdownMenuItem>View Invoices</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Suspend Access</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

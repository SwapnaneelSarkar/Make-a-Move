"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LogOut, Smartphone, Monitor, Globe } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const MOCK_LOGIN_HISTORY = [
  {
    id: "1",
    dateTime: "2024-05-20T10:30:00",
    device: "Chrome on Windows",
    browser: "Chrome 120",
    ip: "192.168.1.100",
    location: "Mumbai, India",
    status: "Success",
  },
  {
    id: "2",
    dateTime: "2024-05-19T14:20:00",
    device: "Safari on iPhone",
    browser: "Safari 17",
    ip: "192.168.1.101",
    location: "Mumbai, India",
    status: "Success",
  },
  {
    id: "3",
    dateTime: "2024-05-18T09:15:00",
    device: "Chrome on Mac",
    browser: "Chrome 119",
    ip: "192.168.1.102",
    location: "Bangalore, India",
    status: "Failed",
  },
  {
    id: "4",
    dateTime: "2024-05-15T16:45:00",
    device: "Firefox on Windows",
    browser: "Firefox 121",
    ip: "192.168.1.103",
    location: "Delhi, India",
    status: "Success",
  },
]

export default function LoginHistoryPage() {
  const handleLogoutAll = () => {
    toast.success("All devices logged out successfully")
  }

  const getDeviceIcon = (device: string) => {
    if (device.includes("iPhone") || device.includes("Android")) {
      return <Smartphone className="h-4 w-4" />
    }
    if (device.includes("Mac") || device.includes("Windows")) {
      return <Monitor className="h-4 w-4" />
    }
    return <Globe className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Login History</h1>
          <p className="text-muted-foreground">View your account login activity and active sessions.</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout All Devices
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Logout All Devices?</AlertDialogTitle>
              <AlertDialogDescription>
                This will log you out from all devices except this one. You will need to log in again on other devices.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogoutAll}>Logout All</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Login Activity</CardTitle>
          <CardDescription>Your login history for the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date/Time</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_LOGIN_HISTORY.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{formatDate(entry.dateTime)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(entry.device)}
                      <span>{entry.device}</span>
                    </div>
                  </TableCell>
                  <TableCell>{entry.browser}</TableCell>
                  <TableCell className="font-mono text-sm">{entry.ip}</TableCell>
                  <TableCell>{entry.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        entry.status === "Success"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {entry.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}







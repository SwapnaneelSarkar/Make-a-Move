"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LogOut, Smartphone, Monitor, Globe } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface LoginHistoryEntry {
  id: string
  dateTime: string
  device: string
  browser: string
  ip: string
  location: string
  status: "Success" | "Failed"
  sessionId?: string
  logoutTime?: string
  isActive?: boolean
}

interface DeviceInfo {
  device: string
  browser: string
  lastLogin: string
  ip: string
  location: string
  sessionId: string
  isActive: boolean
  loginCount: number
}

const MOCK_LOGIN_HISTORY: LoginHistoryEntry[] = [
  {
    id: "1",
    dateTime: "2024-05-20T10:30:00",
    device: "Chrome on Windows",
    browser: "Chrome 120",
    ip: "192.168.1.100",
    location: "Mumbai, India",
    status: "Success",
    sessionId: "sess_abc123",
    isActive: true,
  },
  {
    id: "2",
    dateTime: "2024-05-19T14:20:00",
    device: "Safari on iPhone",
    browser: "Safari 17",
    ip: "192.168.1.101",
    location: "Mumbai, India",
    status: "Success",
    sessionId: "sess_def456",
    logoutTime: "2024-05-19T18:30:00",
    isActive: false,
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
    sessionId: "sess_ghi789",
    logoutTime: "2024-05-15T20:00:00",
    isActive: false,
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

  // Group login history by device to create device management list
  const deviceMap = new Map<string, DeviceInfo>()
  MOCK_LOGIN_HISTORY.forEach((entry) => {
    if (entry.status === "Success") {
      const key = `${entry.device}-${entry.ip}`
      const existing = deviceMap.get(key)
      if (existing) {
        // Update with most recent login and increment count
        const isNewer = new Date(entry.dateTime) > new Date(existing.lastLogin)
        deviceMap.set(key, {
          device: existing.device,
          browser: existing.browser,
          lastLogin: isNewer ? entry.dateTime : existing.lastLogin,
          ip: existing.ip,
          location: existing.location,
          sessionId: isNewer ? (entry.sessionId || existing.sessionId) : existing.sessionId,
          isActive: isNewer ? (entry.isActive ?? existing.isActive) : existing.isActive,
          loginCount: existing.loginCount + 1,
        })
      } else {
        deviceMap.set(key, {
          device: entry.device,
          browser: entry.browser,
          lastLogin: entry.dateTime,
          ip: entry.ip,
          location: entry.location,
          sessionId: entry.sessionId || "N/A",
          isActive: entry.isActive ?? false,
          loginCount: 1,
        })
      }
    }
  })

  const deviceList = Array.from(deviceMap.values())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Login History & Device Management</h1>
          <p className="text-muted-foreground">View your account login activity, active sessions, and managed devices.</p>
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

      {/* Device Management Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Device Management Panel</CardTitle>
          <CardDescription>View all devices that have logged into your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Session ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Login Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deviceList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground">
                    No devices found
                  </TableCell>
                </TableRow>
              ) : (
                deviceList.map((device, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(device.device)}
                        <span>{device.device}</span>
                      </div>
                    </TableCell>
                    <TableCell>{device.browser}</TableCell>
                    <TableCell>{formatDate(device.lastLogin)}</TableCell>
                    <TableCell className="font-mono text-sm">{device.ip}</TableCell>
                    <TableCell>{device.location}</TableCell>
                    <TableCell className="font-mono text-xs">{device.sessionId}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          device.isActive
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }
                      >
                        {device.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{device.loginCount}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Login History Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Login History Panel</CardTitle>
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
                <TableHead>Session ID</TableHead>
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
                  <TableCell className="font-mono text-xs">{entry.sessionId || "N/A"}</TableCell>
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













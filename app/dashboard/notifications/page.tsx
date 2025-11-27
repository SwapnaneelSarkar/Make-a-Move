"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, Trash2, CheckCheck } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

interface Notification {
  id: string
  title: string
  message: string
  type: "booking" | "refund" | "kyc" | "payment" | "system"
  read: boolean
  date: string
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Booking Confirmed",
    message: "Your flight booking #B1234 has been confirmed",
    type: "booking",
    read: false,
    date: "2024-05-20T10:30:00",
  },
  {
    id: "2",
    title: "Refund Processed",
    message: "Refund of ₹17,000 has been processed for booking #B1234",
    type: "refund",
    read: false,
    date: "2024-05-19T14:20:00",
  },
  {
    id: "3",
    title: "KYC Approved",
    message: "Your KYC documents have been approved",
    type: "kyc",
    read: true,
    date: "2024-05-18T09:15:00",
  },
  {
    id: "4",
    title: "Payment Failed",
    message: "Payment for booking #B1235 failed. Please retry.",
    type: "payment",
    read: false,
    date: "2024-05-17T16:45:00",
  },
  {
    id: "5",
    title: "System Maintenance",
    message: "Scheduled maintenance on May 25, 2024 from 2:00 AM to 4:00 AM",
    type: "system",
    read: true,
    date: "2024-05-15T08:00:00",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read
    if (filter === "read") return n.read
    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    toast.success("Notification marked as read")
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
    toast.success("Notification deleted")
  }

  const handleDeleteAll = () => {
    setNotifications([])
    toast.success("All notifications deleted")
  }

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "booking":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "refund":
        return "bg-green-100 text-green-700 border-green-200"
      case "kyc":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "payment":
        return "bg-red-100 text-red-700 border-red-200"
      case "system":
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your account activity and important alerts.</p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
          )}
          <Button variant="outline" onClick={handleDeleteAll}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete All
          </Button>
        </div>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList>
          <TabsTrigger value="all">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="read">
            Read ({notifications.length - unreadCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No notifications found</p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card key={notification.id} className={!notification.read ? "border-primary/50 bg-primary/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={getTypeColor(notification.type)}>
                          {notification.type}
                        </Badge>
                        {!notification.read && <Badge className="bg-primary">New</Badge>}
                        <span className="text-sm text-muted-foreground">{formatDate(notification.date)}</span>
                      </div>
                      <h3 className="font-semibold mb-1">{notification.title}</h3>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                    </div>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button variant="ghost" size="icon" onClick={() => handleMarkAsRead(notification.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(notification.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}







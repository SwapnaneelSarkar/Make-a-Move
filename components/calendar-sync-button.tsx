"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Globe, Mail } from "lucide-react"
import { toast } from "sonner"

export function CalendarSyncButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleSync = (type: "google" | "outlook") => {
    toast.success(`Will be available in production`, {
      description: `${type === "google" ? "Google Calendar" : "Outlook Calendar"} sync will be implemented in production.`,
    })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Sync with Calendar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sync with Calendar</DialogTitle>
          <DialogDescription>Choose your calendar provider to sync bookings</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleSync("google")}
          >
            <Globe className="mr-2 h-5 w-5" />
            Google Calendar
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleSync("outlook")}
          >
            <Mail className="mr-2 h-5 w-5" />
            Outlook Calendar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


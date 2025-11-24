"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, Info, AlertTriangle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type StatusType = "info" | "warning" | "error"

interface SystemStatus {
  id: string
  type: StatusType
  title: string
  message: string
  dismissible: boolean
}

// Mock system status - in production, this would come from an API
const MOCK_STATUS: SystemStatus | null = null // Set to null to hide, or provide a status object

export function SystemStatusBanner() {
  const [dismissed, setDismissed] = useState<string[]>([])
  const [status, setStatus] = useState<SystemStatus | null>(MOCK_STATUS)

  useEffect(() => {
    // Load dismissed statuses from localStorage
    const stored = localStorage.getItem("dismissed_statuses")
    if (stored) {
      setDismissed(JSON.parse(stored))
    }
  }, [])

  if (!status || dismissed.includes(status.id)) {
    return null
  }

  const handleDismiss = () => {
    const newDismissed = [...dismissed, status.id]
    setDismissed(newDismissed)
    localStorage.setItem("dismissed_statuses", JSON.stringify(newDismissed))
  }

  const getIcon = () => {
    switch (status.type) {
      case "info":
        return <Info className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getVariant = () => {
    switch (status.type) {
      case "info":
        return "default"
      case "warning":
        return "default"
      case "error":
        return "destructive"
    }
  }

  const getClassName = () => {
    switch (status.type) {
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-900"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-900"
      case "error":
        return "bg-red-50 border-red-200 text-red-900"
    }
  }

  return (
    <Alert className={cn("rounded-none border-x-0", getClassName())} variant={getVariant()}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <AlertTitle className="font-semibold">{status.title}</AlertTitle>
          <AlertDescription className="mt-1">{status.message}</AlertDescription>
        </div>
        {status.dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Alert>
  )
}




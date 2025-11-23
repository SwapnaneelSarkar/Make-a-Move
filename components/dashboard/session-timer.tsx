"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Clock } from "lucide-react"

// 30 minutes in milliseconds
const SESSION_TIMEOUT = 30 * 60 * 1000
const WARNING_THRESHOLD = 2 * 60 * 1000 // 2 minutes before timeout

export function SessionTimer() {
  const router = useRouter()
  const { currentUser } = useAppStore()
  const [showWarning, setShowWarning] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())

  useEffect(() => {
    // Reset timer on user activity
    const resetTimer = () => setLastActivity(Date.now())

    window.addEventListener("mousemove", resetTimer)
    window.addEventListener("keydown", resetTimer)
    window.addEventListener("click", resetTimer)

    // Check interval
    const interval = setInterval(() => {
      const now = Date.now()
      const timeInactive = now - lastActivity

      if (timeInactive >= SESSION_TIMEOUT) {
        // Logout
        localStorage.removeItem("session_user")
        router.push("/login")
      } else if (timeInactive >= SESSION_TIMEOUT - WARNING_THRESHOLD) {
        setShowWarning(true)
      } else {
        setShowWarning(false)
      }
    }, 1000)

    return () => {
      window.removeEventListener("mousemove", resetTimer)
      window.removeEventListener("keydown", resetTimer)
      window.removeEventListener("click", resetTimer)
      clearInterval(interval)
    }
  }, [lastActivity, router])

  const handleStayLoggedIn = () => {
    setLastActivity(Date.now())
    setShowWarning(false)
  }

  return (
    <AlertDialog open={showWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" /> Session Expiring
          </AlertDialogTitle>
          <AlertDialogDescription>
            Your session will expire in less than 2 minutes due to inactivity. Do you want to stay logged in?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleStayLoggedIn}>Stay Logged In</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

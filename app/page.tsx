"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"

export default function Home() {
  const router = useRouter()
  const { currentUser, setCurrentUser } = useAppStore()

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("session_user")
    
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setCurrentUser(user)
        router.push("/dashboard")
      } catch (error) {
        // If parsing fails, clear storage and redirect to login
        localStorage.removeItem("session_user")
        router.push("/login")
      }
    } else {
      // No user found, redirect to login
      router.push("/login")
    }
  }, [router, setCurrentUser])

  // Show nothing while checking (or a loading state)
  return null
}

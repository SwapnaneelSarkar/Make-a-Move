"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, RefreshCw } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { getWalletBalance, getLastUpdatedTimestamp, formatTimeAgo } from "@/lib/wallet-utils"

export function WalletBalanceWidget() {
  // Initialize with safe defaults to prevent hydration mismatch
  const [balance, setBalance] = useState(0)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const currentUser = useAppStore((state) => state.currentUser)

  // Define refreshBalance before useEffect hooks
  const refreshBalance = useCallback(async () => {
    setIsRefreshing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newBalance = getWalletBalance()
      const newLastUpdated = getLastUpdatedTimestamp()
      setBalance(newBalance)
      setLastUpdated(newLastUpdated)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  // Load balance from localStorage only after component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true)
    setBalance(getWalletBalance())
    setLastUpdated(getLastUpdatedTimestamp())
  }, [])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!isMounted) return
    
    const interval = setInterval(() => {
      refreshBalance()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [isMounted, refreshBalance])

  // Super Admin doesn't have a wallet - check after all hooks
  if (currentUser?.role === "SUPER_ADMIN") {
    return null
  }

  const handleRefresh = async () => {
    await refreshBalance()
  }

  // Don't render balance until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium opacity-90">Wallet Balance</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              disabled
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 opacity-75" />
            <div className="text-4xl font-bold">₹0</div>
          </div>
          <p className="mt-2 text-sm opacity-75">Loading...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium opacity-90">Wallet Balance</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 opacity-75" />
          <div className="text-4xl font-bold">₹{balance.toLocaleString("en-IN")}</div>
        </div>
        <p className="mt-2 text-sm opacity-75">Updated {formatTimeAgo(lastUpdated)}</p>
      </CardContent>
    </Card>
  )
}


"use client"

import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentBookings } from "@/components/dashboard/recent-bookings"
import { Button } from "@/components/ui/button"
import { PlusCircle, Settings } from "lucide-react"
import Link from "next/link"
import { QuickLinksWidget } from "@/components/dashboard/quick-links-widget"
import { PromotionalBanners } from "@/components/dashboard/promotional-banners"
import { UrgentAlertsPanel } from "@/components/dashboard/urgent-alerts-panel"
import { WalletBalanceWidget } from "@/components/dashboard/wallet-balance-widget"
import { DashboardPersonalization } from "@/components/dashboard/dashboard-personalization"
import { AdminUsageInsights } from "@/components/dashboard/admin-usage-insights"
import { usePermissions } from "@/hooks/use-permissions"
import { useAppStore } from "@/lib/store"

export default function DashboardPage() {
  const { canView } = usePermissions()
  const { currentUser } = useAppStore()
  const isAdmin = currentUser.role === "SUPER_ADMIN" || currentUser.role === "AGENCY_ADMIN"

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-serif">Dashboard</h1>
        <div className="flex items-center gap-2">
          <DashboardPersonalization />
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/dashboard/flights">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Booking
            </Link>
          </Button>
        </div>
      </div>

      {/* Urgent Alerts Panel */}
      <UrgentAlertsPanel />

      {/* Added Promotional Banners */}
      <PromotionalBanners />

      {/* Wallet Balance Widget */}
      {canView("wallet") && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WalletBalanceWidget />
        </div>
      )}

      {/* Admin Usage Insights - Only for admins */}
      {isAdmin && canView("usageInsights") && (
        <div className="space-y-4">
          <AdminUsageInsights />
        </div>
      )}

      {/* Changed layout to include Quick Links sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
          <StatsCards />
        </div>

        <div className="md:col-span-2 space-y-6">
          <RecentBookings />
        </div>

        <div className="md:col-span-1 space-y-6">
          {/* Added Quick Links Widget */}
          <QuickLinksWidget />
        </div>
      </div>
    </div>
  )
}

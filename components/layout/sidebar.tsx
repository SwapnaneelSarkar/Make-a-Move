"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Plane,
  Hotel,
  Briefcase,
  Users,
  FileText,
  Settings,
  ShieldCheck,
  Wallet,
  Map,
  MessageSquare,
  FileCheck,
  CreditCard,
  FileSpreadsheet,
  Database,
  TrendingUp,
  Calendar,
  Ticket,
  Ban,
  Receipt,
} from "lucide-react"
import { useAppStore } from "@/lib/store"
import { getPermissions } from "@/lib/permissions"

export function Sidebar() {
  const pathname = usePathname()
  const { currentUser } = useAppStore()
  const role = currentUser.role
  const permissions = getPermissions(role)

  // Define navigation items based on role permissions
  const getNavItems = () => {
    const common = [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }]

    const booking = [
      { name: "Flights", href: "/dashboard/flights", icon: Plane },
      { name: "Hotels", href: "/dashboard/hotels", icon: Hotel },
    ]

    const admin = [
      { name: "Employees", href: "/dashboard/employees", icon: Users },
      { name: "Policies", href: "/dashboard/policies", icon: ShieldCheck },
      { name: "Reports", href: "/dashboard/reports", icon: FileText },
      { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
    ]

    const superAdmin = [
      { name: "Corporates", href: "/dashboard/corporates", icon: Briefcase },
      { name: "Master Settings", href: "/dashboard/settings", icon: Settings },
    ]

    const items: Array<{ name: string; href: string; icon: any }> = []

    // Dashboard - all roles
    items.push(...common)

    // Booking modules
    if (permissions.bookings.view && role !== "SUPER_ADMIN") {
      items.push(...booking)
    }

    // My Bookings / All Bookings
    if (permissions.ownBookings.view && !permissions.allBookings.view) {
      items.push({ name: "My Bookings", href: "/dashboard/bookings", icon: Map })
    } else if (permissions.allBookings.view) {
      items.push({ name: "All Bookings", href: "/dashboard/bookings", icon: FileText })
    }

    // Approvals
    if (permissions.allBookings.approve || permissions.agencyBookings.approve) {
      items.push({ name: "Approvals", href: "/dashboard/approvals", icon: FileCheck })
    }

    // User Management
    if (permissions.agents.view || permissions.allAgents.view) {
      // Super Admin sees "Agent Onboarding", others see "Employees"
      const label = role === "SUPER_ADMIN" ? "Agent onboarding" : "Employees"
      items.push({ name: label, href: "/dashboard/employees", icon: Users })
    }

    // Policies
    if (permissions.policies.view) {
      items.push({ name: "Policies", href: "/dashboard/policies", icon: ShieldCheck })
    }

    // Reports
    if (permissions.reports.view) {
      items.push({ name: "Reports", href: "/dashboard/reports", icon: FileText })
    }

    // Wallet
    if (permissions.wallet.view) {
      items.push({ name: "Wallet", href: "/dashboard/wallet", icon: Wallet })
    }

    // Refunds
    if (permissions.refunds.view) {
      items.push({ name: "Refunds", href: "/dashboard/refunds", icon: CreditCard })
    }

    // Disputes
    if (permissions.disputes.view) {
      items.push({ name: "Disputes", href: "/dashboard/disputes", icon: MessageSquare })
    }

    // KYC
    if (permissions.kycVerification.approve) {
      items.push({ name: "KYC Review", href: "/dashboard/kyc/review", icon: ShieldCheck })
    } else if (permissions.kycDocuments.view) {
      items.push({ name: "KYC", href: "/dashboard/kyc", icon: ShieldCheck })
    }

    // Super Admin only
    if (permissions.systemSettings.view) {
      items.push({ name: "Master Settings", href: "/dashboard/settings", icon: Settings })
      // Combined Financial Management page for Super Admin
      items.push({ name: "Financial Management", href: "/dashboard/financial-management", icon: FileSpreadsheet })
    }

    // Financial Management for Agency Admin (limited access)
    if (permissions.financialReports?.view && !permissions.systemSettings.view) {
      items.push({ name: "Ledger Reconciliation", href: "/dashboard/ledger-reconciliation", icon: FileSpreadsheet })
      items.push({ name: "Invoice Reconciliation", href: "/dashboard/invoice-reconciliation", icon: Receipt })
    }

    // Support & Escalations
    if (permissions.disputes.view) {
      items.push({ name: "Support Tickets", href: "/dashboard/support-tickets", icon: Ticket })
      items.push({ name: "Schedule Escalations", href: "/dashboard/schedule-escalations", icon: Calendar })
    }

    // Audit Logs
    if (permissions.auditLogs.view) {
      items.push({ name: "Audit Logs", href: "/dashboard/audit-logs", icon: FileText })
    }

    return items
  }

  const navItems = getNavItems()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Plane className="h-6 w-6" />
          <span>Make a Move</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-3">
          <div className="h-9 w-9 overflow-hidden rounded-full border bg-background">
            <img src={currentUser.avatar || "/placeholder.svg"} alt="User" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{currentUser.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {role === "SUPER_ADMIN" ? "Super Admin" :
               role === "AGENCY_ADMIN" ? "Agency Admin" :
               role === "AGENT" ? "Agent" :
               role === "SUB_AGENT" ? "Sub Agent" :
               role === "FINANCE_TEAM" ? "Finance Team" :
               role === "SUPPORT_TEAM" ? "Support Team" :
               role === "KYC_COMPLIANCE_TEAM" ? "KYC Team" : role}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

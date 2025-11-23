import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { SupportWidget } from "@/components/support-widget"
import { SystemStatusBanner } from "@/components/layout/system-status-banner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/20">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <Header />
        <SystemStatusBanner />

        <main className="flex-1 overflow-auto p-6">{children}</main>
        <SupportWidget />
      </div>
    </div>
  )
}

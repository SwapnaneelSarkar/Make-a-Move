"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, AlertTriangle, CreditCard, FileX, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Alert {
  id: string
  type: "refund" | "payment" | "kyc"
  title: string
  description: string
  count: number
  link: string
  severity: "high" | "medium" | "low"
}

const MOCK_ALERTS: Alert[] = [
  {
    id: "1",
    type: "refund",
    title: "Pending Refunds",
    description: "Refunds awaiting processing",
    count: 3,
    link: "/dashboard/refunds",
    severity: "high",
  },
  {
    id: "2",
    type: "payment",
    title: "Failed Payments",
    description: "Payment transactions that failed",
    count: 2,
    link: "/dashboard/wallet",
    severity: "high",
  },
  {
    id: "3",
    type: "kyc",
    title: "KYC Issues",
    description: "Documents requiring attention",
    count: 5,
    link: "/dashboard/kyc",
    severity: "medium",
  },
]

export function UrgentAlertsPanel() {
  const getIcon = (type: Alert["type"]) => {
    switch (type) {
      case "refund":
        return <RefreshCw className="h-5 w-5" />
      case "payment":
        return <CreditCard className="h-5 w-5" />
      case "kyc":
        return <FileX className="h-5 w-5" />
    }
  }

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-50 border-red-200 text-red-800"
      case "medium":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "low":
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  return (
    <Card className="border-orange-200 bg-orange-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-lg">Urgent Alerts</CardTitle>
          </div>
          <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
            {MOCK_ALERTS.reduce((sum, alert) => sum + alert.count, 0)} Total
          </Badge>
        </div>
        <CardDescription>Action required on these items</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {MOCK_ALERTS.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-center justify-between p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/50">{getIcon(alert.type)}</div>
              <div>
                <div className="font-semibold text-sm">{alert.title}</div>
                <div className="text-xs opacity-80">{alert.description}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-white/50">
                {alert.count}
              </Badge>
              <Button asChild size="sm" variant="outline" className="border-current">
                <Link href={alert.link}>Resolve</Link>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}




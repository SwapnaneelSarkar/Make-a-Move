"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, GripVertical, RotateCcw } from "lucide-react"
import { usePermissions } from "@/hooks/use-permissions"
import { toast } from "sonner"

interface Widget {
  id: string
  name: string
  enabled: boolean
  order: number
}

const DEFAULT_WIDGETS: Widget[] = [
  { id: "urgent-alerts", name: "Urgent Alerts", enabled: true, order: 0 },
  { id: "promotional-banners", name: "Promotional Banners", enabled: true, order: 1 },
  { id: "wallet-balance", name: "Wallet Balance", enabled: true, order: 2 },
  { id: "stats-cards", name: "Statistics Cards", enabled: true, order: 3 },
  { id: "recent-bookings", name: "Recent Bookings", enabled: true, order: 4 },
  { id: "quick-links", name: "Quick Links", enabled: true, order: 5 },
]

export function DashboardPersonalization() {
  const { canView } = usePermissions()
  const [widgets, setWidgets] = useState<Widget[]>(DEFAULT_WIDGETS)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("dashboard_widgets")
    if (saved) {
      try {
        setWidgets(JSON.parse(saved))
      } catch {
        setWidgets(DEFAULT_WIDGETS)
      }
    }
  }, [])

  const handleToggle = (id: string) => {
    const updated = widgets.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
    setWidgets(updated)
    localStorage.setItem("dashboard_widgets", JSON.stringify(updated))
  }

  const handleReset = () => {
    setWidgets(DEFAULT_WIDGETS)
    localStorage.setItem("dashboard_widgets", JSON.stringify(DEFAULT_WIDGETS))
    toast.success("Dashboard reset to default")
  }

  const handleSave = () => {
    localStorage.setItem("dashboard_widgets", JSON.stringify(widgets))
    toast.success("Dashboard preferences saved")
    setIsOpen(false)
  }

  if (!canView("dashboardPersonalization")) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Customize Dashboard
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Customize Dashboard</DialogTitle>
          <DialogDescription>Toggle widgets on/off and reorder them by dragging</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {widgets
              .sort((a, b) => a.order - b.order)
              .map((widget) => (
                <div
                  key={widget.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                    <Label htmlFor={widget.id} className="font-normal cursor-pointer">
                      {widget.name}
                    </Label>
                  </div>
                  <Switch id={widget.id} checked={widget.enabled} onCheckedChange={() => handleToggle(widget.id)} />
                </div>
              ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Default
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}










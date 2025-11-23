"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { usePermissions } from "@/hooks/use-permissions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SettingsPage() {
  const { canView } = usePermissions()

  if (!canView("systemSettings")) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You do not have permission to access system settings. Only Super Admins can access this page.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
  const handleSavePreferences = () => {
    toast.success("Preferences Saved", {
      description: "Mock notification sent to user@example.com",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground">Configure global parameters for the Travel Booking Platform.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="fees">Platform Fees</TabsTrigger>
          <TabsTrigger value="banners">Promotional Banners</TabsTrigger>
          <TabsTrigger value="permissions">Permission Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Platform Configuration</CardTitle>
              <CardDescription>Manage general settings and maintenance modes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label>Maintenance Mode</Label>
                  <span className="text-sm text-muted-foreground">
                    Disable platform access for all users except Super Admins
                  </span>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Support Email</Label>
                <Input defaultValue="support@makeamove.com" />
              </div>
              <div className="space-y-2">
                <Label>Default Currency</Label>
                <Input defaultValue="INR (₹)" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about important updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Notification Channels</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-notif" defaultChecked />
                    <Label htmlFor="email-notif">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sms-notif" />
                    <Label htmlFor="sms-notif">SMS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="whatsapp-notif" defaultChecked />
                    <Label htmlFor="whatsapp-notif">WhatsApp</Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Notification Types</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="booking-confirm" defaultChecked />
                    <Label htmlFor="booking-confirm">Booking Confirmations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="refund-updates" defaultChecked />
                    <Label htmlFor="refund-updates">Refund Updates</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="dispute-status" defaultChecked />
                    <Label htmlFor="dispute-status">Dispute Status</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="kyc-results" defaultChecked />
                    <Label htmlFor="kyc-results">KYC Results</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="payment-alerts" defaultChecked />
                    <Label htmlFor="payment-alerts">Payment Alerts</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSavePreferences}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
              <CardDescription>Set markup and platform fees for bookings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Flight Markup (%)</Label>
                  <Input defaultValue="2.5" type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Hotel Markup (%)</Label>
                  <Input defaultValue="5.0" type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Flat Fee per Booking (₹)</Label>
                  <Input defaultValue="0.00" type="number" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banners">
          <BannersManagement />
        </TabsContent>

        <TabsContent value="permissions">
          <PermissionMatrix />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Banners Management Component
function BannersManagement() {
  const [banners, setBanners] = useState([
    {
      id: "1",
      title: "Summer Business Travel Special",
      imageUrl: "/placeholder.jpg",
      link: "/dashboard/flights",
      expirationDate: "2024-12-31",
      status: "active",
    },
    {
      id: "2",
      title: "Premium Hotel Partners",
      imageUrl: "/placeholder.jpg",
      link: "/dashboard/hotels",
      expirationDate: "2024-06-15",
      status: "expired",
    },
  ])
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem("promotional_banners")
    if (saved) {
      try {
        setBanners(JSON.parse(saved))
      } catch {}
    }
  }, [])

  const saveBanners = (newBanners: typeof banners) => {
    setBanners(newBanners)
    localStorage.setItem("promotional_banners", JSON.stringify(newBanners))
  }

  const handleDelete = (id: string) => {
    const filtered = banners.filter((b) => b.id !== id)
    saveBanners(filtered)
    toast.success("Banner deleted")
  }

  const handleAdd = (banner: any) => {
    const newBanner = { ...banner, id: Date.now().toString(), status: "active" }
    saveBanners([...banners, newBanner])
    setIsAddOpen(false)
    toast.success("Banner added")
  }

  const handleEdit = (banner: any) => {
    const updated = banners.map((b) => (b.id === banner.id ? banner : b))
    saveBanners(updated)
    setEditingBanner(null)
    toast.success("Banner updated")
  }

  const activeBanners = banners.filter((b) => {
    if (b.status === "expired") return false
    const expDate = new Date(b.expirationDate)
    return expDate >= new Date()
  })

  const expiredBanners = banners.filter((b) => {
    if (b.status === "expired") return true
    const expDate = new Date(b.expirationDate)
    return expDate < new Date()
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Promotional Banners</CardTitle>
            <CardDescription>Manage promotional banners displayed on the dashboard</CardDescription>
          </div>
          <Button onClick={() => setIsAddOpen(true)}>Add Banner</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Active Banners</h3>
          <div className="rounded-md border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left text-sm font-medium">Title</th>
                  <th className="p-3 text-left text-sm font-medium">Image URL</th>
                  <th className="p-3 text-left text-sm font-medium">Link</th>
                  <th className="p-3 text-left text-sm font-medium">Expiration</th>
                  <th className="p-3 text-left text-sm font-medium">Status</th>
                  <th className="p-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeBanners.map((banner) => (
                  <tr key={banner.id} className="border-t">
                    <td className="p-3">{banner.title}</td>
                    <td className="p-3 text-sm text-muted-foreground truncate max-w-xs">{banner.imageUrl}</td>
                    <td className="p-3 text-sm text-muted-foreground">{banner.link}</td>
                    <td className="p-3 text-sm">{banner.expirationDate}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setEditingBanner(banner)}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(banner.id)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {expiredBanners.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Expired Banners</h3>
            <div className="rounded-md border">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="p-3 text-left text-sm font-medium">Title</th>
                    <th className="p-3 text-left text-sm font-medium">Expiration</th>
                    <th className="p-3 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expiredBanners.map((banner) => (
                    <tr key={banner.id} className="border-t">
                      <td className="p-3">{banner.title}</td>
                      <td className="p-3 text-sm">{banner.expirationDate}</td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(banner.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(isAddOpen || editingBanner) && (
          <BannerForm
            banner={editingBanner}
            onSave={editingBanner ? handleEdit : handleAdd}
            onCancel={() => {
              setIsAddOpen(false)
              setEditingBanner(null)
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}

function BannerForm({ banner, onSave, onCancel }: { banner?: any; onSave: (banner: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(
    banner || {
      title: "",
      imageUrl: "",
      link: "",
      expirationDate: "",
    }
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>{banner ? "Edit Banner" : "Add New Banner"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Banner Title</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Summer Special"
          />
        </div>
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="/placeholder.jpg"
          />
        </div>
        <div className="space-y-2">
          <Label>Link</Label>
          <Input
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="/dashboard/flights"
          />
        </div>
        <div className="space-y-2">
          <Label>Expiration Date</Label>
          <Input
            type="date"
            value={formData.expirationDate}
            onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(formData)}>Save</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Permission Matrix Component
function PermissionMatrix() {
  const roles: Array<{ role: string; name: string }> = [
    { role: "SUPER_ADMIN", name: "Super Admin" },
    { role: "AGENCY_ADMIN", name: "Agency Admin" },
    { role: "AGENT", name: "Agent" },
    { role: "SUB_AGENT", name: "Sub Agent" },
    { role: "FINANCE_TEAM", name: "Finance" },
    { role: "SUPPORT_TEAM", name: "Support" },
    { role: "KYC_COMPLIANCE_TEAM", name: "KYC" },
  ]

  const modules = [
    { key: "bookings", name: "Bookings" },
    { key: "wallet", name: "Wallet" },
    { key: "agents", name: "Agents" },
    { key: "kycDocuments", name: "KYC Documents" },
    { key: "disputes", name: "Disputes" },
    { key: "reports", name: "Reports" },
    { key: "systemSettings", name: "System Settings" },
  ]

  const [permissions, setPermissions] = useState<Record<string, Record<string, { view: boolean; edit: boolean; approve: boolean }>>>({})

  useEffect(() => {
    const saved = localStorage.getItem("permission_matrix")
    if (saved) {
      try {
        setPermissions(JSON.parse(saved))
      } catch {}
    } else {
      // Initialize with default permissions
      const initial: typeof permissions = {}
      roles.forEach(({ role }) => {
        initial[role] = {}
        modules.forEach(({ key }) => {
          // Default permissions based on role
          if (role === "SUPER_ADMIN") {
            initial[role][key] = { view: true, edit: true, approve: true }
          } else {
            initial[role][key] = { view: false, edit: false, approve: false }
          }
        })
      })
      setPermissions(initial)
    }
  }, [])

  const handleToggle = (role: string, module: string, action: "view" | "edit" | "approve") => {
    const updated = {
      ...permissions,
      [role]: {
        ...permissions[role],
        [module]: {
          ...permissions[role][module],
          [action]: !permissions[role][module]?.[action],
        },
      },
    }
    setPermissions(updated)
    localStorage.setItem("permission_matrix", JSON.stringify(updated))
  }

  const handleSave = () => {
    localStorage.setItem("permission_matrix", JSON.stringify(permissions))
    toast.success("Permission matrix saved")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Permission Matrix</CardTitle>
            <CardDescription>Configure role-based permissions for each module</CardDescription>
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-left bg-muted/50 sticky left-0 z-10">Module</th>
                {roles.map(({ role, name }) => (
                  <th key={role} className="border p-2 text-center bg-muted/50 min-w-[200px]">
                    <div className="font-semibold">{name}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex gap-4 justify-center">
                      <span>V</span>
                      <span>E</span>
                      <span>A</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map(({ key, name }) => (
                <tr key={key}>
                  <td className="border p-2 font-medium bg-muted/30 sticky left-0 z-10">{name}</td>
                  {roles.map(({ role }) => {
                    const perm = permissions[role]?.[key] || { view: false, edit: false, approve: false }
                    return (
                      <td key={role} className="border p-2">
                        <div className="flex gap-4 justify-center">
                          <Checkbox
                            checked={perm.view}
                            onCheckedChange={() => handleToggle(role, key, "view")}
                            aria-label="View"
                          />
                          <Checkbox
                            checked={perm.edit}
                            onCheckedChange={() => handleToggle(role, key, "edit")}
                            aria-label="Edit"
                          />
                          <Checkbox
                            checked={perm.approve}
                            onCheckedChange={() => handleToggle(role, key, "approve")}
                            aria-label="Approve"
                          />
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>V = View, E = Edit, A = Approve</p>
        </div>
      </CardContent>
    </Card>
  )
}

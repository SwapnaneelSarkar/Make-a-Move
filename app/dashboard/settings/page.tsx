"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePermissions } from "@/hooks/use-permissions"
import { AlertCircle } from "lucide-react"
import { toast } from "sonner"

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground">
          Align platform notifications, pricing guardrails, and promotional content with the Make a Move FRs.
        </p>
      </div>

      <div className="grid gap-6">
        <MarkupRules />
        <CommissionRules />
        <PromotionalBanners />
                </div>
              </div>
  )
}

type MarkupRule = {
  id: string
  product: "flights" | "hotels"
  fareType: string
  route: string
  currency: string
  markupPercent: string
  startDate: string
  endDate: string
}

function MarkupRules() {
  const [rules, setRules] = useState<MarkupRule[]>([])
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<MarkupRule | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("markup_rules")
    if (stored) {
      try {
        setRules(JSON.parse(stored))
        return
      } catch {
        /* noop */
      }
    }
    setRules([
      {
        id: "seed-flight",
        product: "flights",
        fareType: "Corporate",
        route: "Domestic",
        currency: "INR",
        markupPercent: "2.5",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      },
    ])
  }, [])

  const persist = (next: MarkupRule[]) => {
    setRules(next)
    localStorage.setItem("markup_rules", JSON.stringify(next))
  }

  const handleDelete = (id: string) => {
    const next = rules.filter((rule) => rule.id !== id)
    persist(next)
    toast.success("Markup rule deleted")
  }

  const handleSave = (payload: Omit<MarkupRule, "id">, id?: string) => {
    if (id) {
      const next = rules.map((rule) => (rule.id === id ? { ...payload, id } : rule))
      persist(next)
      toast.success("Markup rule updated")
    } else {
      const next = [...rules, { ...payload, id: Date.now().toString() }]
      persist(next)
      toast.success("Markup rule added")
    }
    setEditingRule(null)
    setEditorOpen(false)
  }

  return (
          <Card>
            <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Markup Rules</CardTitle>
            <CardDescription>
              Configure markups per product, fare type, route, currency, and validity window.
            </CardDescription>
          </div>
          <Button
            onClick={() => {
              setEditingRule(null)
              setEditorOpen(true)
            }}
          >
            Add Markup Rule
          </Button>
        </div>
            </CardHeader>
            <CardContent className="space-y-6">
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3 font-medium">Product</th>
                <th className="p-3 font-medium">Fare Type</th>
                <th className="p-3 font-medium">Route</th>
                <th className="p-3 font-medium">Currency</th>
                <th className="p-3 font-medium">Markup (%)</th>
                <th className="p-3 font-medium">Effective</th>
                <th className="p-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id} className="border-t">
                  <td className="p-3 capitalize">{rule.product}</td>
                  <td className="p-3">{rule.fareType}</td>
                  <td className="p-3">{rule.route}</td>
                  <td className="p-3">{rule.currency}</td>
                  <td className="p-3">{rule.markupPercent}</td>
                  <td className="p-3 text-xs">
                    {rule.startDate} → {rule.endDate}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingRule(rule)
                          setEditorOpen(true)
                        }}
                      >
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(rule.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editorOpen && (
          <MarkupEditor
            rule={editingRule ?? undefined}
            onCancel={() => {
              setEditingRule(null)
              setEditorOpen(false)
            }}
            onSave={handleSave}
          />
        )}
      </CardContent>
    </Card>
  )
}

function MarkupEditor({
  rule,
  onCancel,
  onSave,
}: {
  rule?: MarkupRule
  onCancel: () => void
  onSave: (payload: Omit<MarkupRule, "id">, id?: string) => void
}) {
  const [form, setForm] = useState<Omit<MarkupRule, "id">>(
    rule ?? {
      product: "flights",
      fareType: "",
      route: "",
      currency: "INR",
      markupPercent: "",
      startDate: "",
      endDate: "",
    }
  )

  useEffect(() => {
    if (rule) {
      const { id: _id, ...rest } = rule
      setForm(rest)
    }
  }, [rule])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{rule ? "Edit Markup Rule" : "Add Markup Rule"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Product</Label>
            <Select value={form.product} onValueChange={(value: MarkupRule["product"]) => setForm({ ...form, product: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flights">Flights</SelectItem>
                <SelectItem value="hotels">Hotels</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Fare Type</Label>
            <Input value={form.fareType} onChange={(event) => setForm({ ...form, fareType: event.target.value })} placeholder="Corporate / Flexi / Saver" />
          </div>
        </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
            <Label>Route</Label>
            <Input value={form.route} onChange={(event) => setForm({ ...form, route: event.target.value })} placeholder="Domestic / International" />
                </div>
                <div className="space-y-2">
            <Label>Currency</Label>
            <Input value={form.currency} onChange={(event) => setForm({ ...form, currency: event.target.value })} placeholder="INR" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Markup (%)</Label>
            <Input type="number" value={form.markupPercent} onChange={(event) => setForm({ ...form, markupPercent: event.target.value })} placeholder="2.5" />
                </div>
                <div className="space-y-2">
            <Label>Effective Dates</Label>
            <div className="grid gap-2 md:grid-cols-2">
              <Input type="date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} />
              <Input type="date" value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} />
            </div>
                </div>
              </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(form, rule?.id)}>Save</Button>
              </div>
            </CardContent>
          </Card>
  )
}

type CommissionRule = {
  id: string
  slabName: string
  slabType: "monthly" | "quarterly"
  payoutType: "percentage" | "fixed"
  value: string
}

function CommissionRules() {
  const [rules, setRules] = useState<CommissionRule[]>([])
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<CommissionRule | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("commission_rules")
    if (stored) {
      try {
        setRules(JSON.parse(stored))
        return
      } catch {
        /* noop */
      }
    }
    setRules([
      {
        id: "seed-commission",
        slabName: "Base Monthly Slab",
        slabType: "monthly",
        payoutType: "percentage",
        value: "1.5",
      },
    ])
  }, [])

  const persist = (next: CommissionRule[]) => {
    setRules(next)
    localStorage.setItem("commission_rules", JSON.stringify(next))
  }

  const handleDelete = (id: string) => {
    persist(rules.filter((rule) => rule.id !== id))
    toast.success("Commission rule deleted")
  }

  const handleSave = (payload: Omit<CommissionRule, "id">, id?: string) => {
    if (id) {
      persist(rules.map((rule) => (rule.id === id ? { ...payload, id } : rule)))
      toast.success("Commission rule updated")
    } else {
      persist([...rules, { ...payload, id: Date.now().toString() }])
      toast.success("Commission rule added")
    }
    setEditingRule(null)
    setEditorOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Commission Rules</CardTitle>
            <CardDescription>Define monthly or quarterly slabs with percentage or flat payouts.</CardDescription>
          </div>
          <Button
            onClick={() => {
              setEditingRule(null)
              setEditorOpen(true)
            }}
          >
            Add Commission Rule
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3 font-medium">Slab Name</th>
                <th className="p-3 font-medium">Slab Type</th>
                <th className="p-3 font-medium">Payout Type</th>
                <th className="p-3 font-medium">Value</th>
                <th className="p-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id} className="border-t">
                  <td className="p-3">{rule.slabName}</td>
                  <td className="p-3 capitalize">{rule.slabType}</td>
                  <td className="p-3 capitalize">{rule.payoutType}</td>
                  <td className="p-3">
                    {rule.payoutType === "percentage" ? `${rule.value}%` : `₹${rule.value}`}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingRule(rule)
                          setEditorOpen(true)
                        }}
                      >
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(rule.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editorOpen && (
          <CommissionEditor
            rule={editingRule ?? undefined}
            onCancel={() => {
              setEditingRule(null)
              setEditorOpen(false)
            }}
            onSave={handleSave}
          />
        )}
      </CardContent>
    </Card>
  )
}

function CommissionEditor({
  rule,
  onCancel,
  onSave,
}: {
  rule?: CommissionRule
  onCancel: () => void
  onSave: (payload: Omit<CommissionRule, "id">, id?: string) => void
}) {
  const [form, setForm] = useState<Omit<CommissionRule, "id">>(
    rule ?? {
      slabName: "",
      slabType: "monthly",
      payoutType: "percentage",
      value: "",
    }
  )

  useEffect(() => {
    if (rule) {
      const { id: _id, ...rest } = rule
      setForm(rest)
    }
  }, [rule])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{rule ? "Edit Commission Rule" : "Add Commission Rule"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Slab Name</Label>
          <Input value={form.slabName} onChange={(event) => setForm({ ...form, slabName: event.target.value })} placeholder="Monthly Volume Tier" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Slab Type</Label>
            <Select
              value={form.slabType}
              onValueChange={(value: CommissionRule["slabType"]) => setForm({ ...form, slabType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Payout Type</Label>
            <Select
              value={form.payoutType}
              onValueChange={(value: CommissionRule["payoutType"]) => setForm({ ...form, payoutType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage (%)</SelectItem>
                <SelectItem value="fixed">Flat Amount (₹)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Value</Label>
          <Input
            type="number"
            value={form.value}
            onChange={(event) => setForm({ ...form, value: event.target.value })}
            placeholder="1.5"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(form, rule?.id)}>Save</Button>
    </div>
      </CardContent>
    </Card>
  )
}

function PromotionalBanners() {
  type Banner = {
    id: string
    title: string
    imageUrl: string
    link: string
    expirationDate: string
  }

  const [banners, setBanners] = useState<Banner[]>([
    {
      id: "1",
      title: "Summer Business Travel Special",
      imageUrl: "/placeholder.jpg",
      link: "/dashboard/flights",
      expirationDate: "2024-12-31",
    },
    {
      id: "2",
      title: "Premium Hotel Partners",
      imageUrl: "/placeholder.jpg",
      link: "/dashboard/hotels",
      expirationDate: "2024-06-15",
    },
  ])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("promotional_banners")
    if (saved) {
      try {
        setBanners(JSON.parse(saved))
      } catch {
        /* noop */
      }
    }
  }, [])

  const saveBanners = (payload: Banner[]) => {
    setBanners(payload)
    localStorage.setItem("promotional_banners", JSON.stringify(payload))
  }

  const handleDelete = (id: string) => {
    saveBanners(banners.filter((banner) => banner.id !== id))
    toast.success("Banner deleted")
  }

  const handleAdd = (banner: Omit<Banner, "id">) => {
    const next = { ...banner, id: Date.now().toString() }
    saveBanners([...banners, next])
    setIsFormOpen(false)
    toast.success("Banner added")
  }

  const handleEdit = (banner: Banner) => {
    const next = banners.map((current) => (current.id === banner.id ? banner : current))
    saveBanners(next)
    setEditingBanner(null)
    toast.success("Banner updated")
  }

  const isShowingForm = isFormOpen || Boolean(editingBanner)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Promotional Banners</CardTitle>
            <CardDescription>Configure dashboard hero banners exactly as defined in the FRs.</CardDescription>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>Add Banner</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
          <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3 font-medium">Title</th>
                <th className="p-3 font-medium">Image URL</th>
                <th className="p-3 font-medium">Link</th>
                <th className="p-3 font-medium">Expiration Date</th>
                <th className="p-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
              {banners.map((banner) => (
                  <tr key={banner.id} className="border-t">
                    <td className="p-3">{banner.title}</td>
                  <td className="p-3 text-muted-foreground">{banner.imageUrl}</td>
                  <td className="p-3 text-muted-foreground">{banner.link}</td>
                  <td className="p-3">{banner.expirationDate}</td>
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

        {isShowingForm && (
          <BannerForm
            banner={editingBanner ?? undefined}
            onSave={(payload) => {
              if (editingBanner) {
                handleEdit({ ...payload, id: editingBanner.id })
              } else {
                handleAdd(payload)
              }
            }}
            onCancel={() => {
              setIsFormOpen(false)
              setEditingBanner(null)
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}

function BannerForm({
  banner,
  onSave,
  onCancel,
}: {
  banner?: { id?: string; title: string; imageUrl: string; link: string; expirationDate: string }
  onSave: (banner: { title: string; imageUrl: string; link: string; expirationDate: string }) => void
  onCancel: () => void
}) {
  const emptyForm = { title: "", imageUrl: "", link: "", expirationDate: "" }
  const [formData, setFormData] = useState(banner ?? emptyForm)

  useEffect(() => {
    setFormData(banner ?? emptyForm)
  }, [banner])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{banner ? "Edit Banner" : "Add Banner"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="banner-title">Banner Title</Label>
          <Input
            id="banner-title"
            value={formData.title}
            onChange={(event) => setFormData({ ...formData, title: event.target.value })}
            placeholder="Summer Special"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="banner-image">Image URL</Label>
          <Input
            id="banner-image"
            value={formData.imageUrl}
            onChange={(event) => setFormData({ ...formData, imageUrl: event.target.value })}
            placeholder="/placeholder.jpg"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="banner-link">Target Link</Label>
          <Input
            id="banner-link"
            value={formData.link}
            onChange={(event) => setFormData({ ...formData, link: event.target.value })}
            placeholder="/dashboard/flights"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="banner-expiration">Expiration Date</Label>
          <Input
            id="banner-expiration"
            type="date"
            value={formData.expirationDate}
            onChange={(event) => setFormData({ ...formData, expirationDate: event.target.value })}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(formData)
            }}
          >
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

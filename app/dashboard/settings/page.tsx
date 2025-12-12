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
import { Switch } from "@/components/ui/switch"
import { loadMarkupPreferences, persistMarkupPreferences, DEFAULT_AGENT_MARKUP, DEFAULT_SUPER_ADMIN_MARKUP } from "@/lib/markup-settings"
import { MOCK_USERS } from "@/lib/mock-data"
import { bookingsDB } from "@/lib/local-db"

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
        <DownloadMarkupSettings />
        <MarkupGovernance />
        <MarkupRules />
        <MarkupSummary />
        <CommissionRules />
        <PromotionalBanners />
                </div>
              </div>
  )
}

function DownloadMarkupSettings() {
  const [showMarkupInDownloads, setShowMarkupInDownloads] = useState<boolean>(true)

  useEffect(() => {
    const stored = localStorage.getItem("download_markup_visibility")
    if (stored !== null) {
      setShowMarkupInDownloads(stored === "true")
    }
  }, [])

  const handleToggle = (checked: boolean) => {
    setShowMarkupInDownloads(checked)
    localStorage.setItem("download_markup_visibility", checked.toString())
    toast.success(`Markup ${checked ? "shown" : "hidden"} in downloads`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reporting & Downloads Settings</CardTitle>
        <CardDescription>
          Control markup visibility in exported documents (Tickets, Vouchers, Invoices, Booking Confirmations)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="markup-visibility" className="text-base">
              Show Markup in Downloads
            </Label>
            <p className="text-sm text-muted-foreground">
              When enabled, markup will be displayed as a separate line item in all exported documents.
              When disabled, only base fare and taxes will be shown.
            </p>
          </div>
          <Switch
            id="markup-visibility"
            checked={showMarkupInDownloads}
            onCheckedChange={handleToggle}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function MarkupGovernance() {
  const { role, canEdit } = usePermissions()
  const [prefs, setPrefs] = useState(loadMarkupPreferences())
  const agents = MOCK_USERS.filter((user) => user.role === "AGENT" || user.role === "SUB_AGENT")

  useEffect(() => {
    setPrefs(loadMarkupPreferences())
  }, [])

  if (!canEdit("markups")) return null

  const handleSave = () => {
    const cleanOverrides = Object.fromEntries(
      Object.entries(prefs.agentOverrides || {}).filter(([, value]) => typeof value === "number"),
    ) as Record<string, number>
    persistMarkupPreferences({ ...prefs, agentOverrides: cleanOverrides })
    toast.success("Markup defaults updated")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Admin Markup Controls</CardTitle>
        <CardDescription>Set platform default (Super Admin) and agent/sub-agent overrides.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`grid gap-4 ${role === "SUPER_ADMIN" ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {role === "SUPER_ADMIN" && (
            <div className="space-y-2">
              <Label>Super Admin Default (₹)</Label>
              <Input
                type="number"
                value={prefs.superAdminMarkup ?? DEFAULT_SUPER_ADMIN_MARKUP}
                onChange={(e) =>
                  setPrefs((prev) => ({
                    ...prev,
                    superAdminMarkup: Math.max(0, parseFloat(e.target.value) || 0),
                  }))
                }
              />
            </div>
          )}
          <div className="space-y-2">
            <Label>Default Agent Markup (₹)</Label>
            <Input
              type="number"
              value={prefs.defaultAgentMarkup ?? DEFAULT_AGENT_MARKUP}
              onChange={(e) =>
                setPrefs((prev) => ({
                  ...prev,
                  defaultAgentMarkup: Math.max(0, parseFloat(e.target.value) || 0),
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Allow Agents to Edit</Label>
            <div className="flex items-center gap-3">
              <Switch
                checked={prefs.allowAgentOverride}
                onCheckedChange={(checked) =>
                  setPrefs((prev) => ({ ...prev, allowAgentOverride: checked }))
                }
              />
              <span className="text-sm text-muted-foreground">Enable markup change during booking</span>
            </div>
          </div>
        </div>

        <div className="border rounded-md">
          <div className="px-4 py-2 border-b bg-muted/50 flex items-center justify-between">
            <div>
              <p className="font-semibold">Agent/Sub-Agent Overrides</p>
              <p className="text-sm text-muted-foreground">Customize markup per agent when needed.</p>
            </div>
            <Button size="sm" onClick={handleSave}>
              Save Defaults & Overrides
            </Button>
          </div>
          <div className="divide-y">
            {agents.map((agent) => (
              <div key={agent.id} className="grid grid-cols-3 gap-4 items-center px-4 py-3">
                <div>
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">{agent.role.toLowerCase()}</p>
                </div>
                <Input
                  type="number"
                  value={prefs.agentOverrides?.[agent.id] ?? ""}
                  placeholder={`${prefs.defaultAgentMarkup ?? DEFAULT_AGENT_MARKUP}`}
                  onChange={(e) =>
                    setPrefs((prev) => ({
                      ...prev,
                      agentOverrides: {
                        ...prev.agentOverrides,
                        [agent.id]: e.target.value === "" ? undefined : Math.max(0, parseFloat(e.target.value) || 0),
                      },
                    }))
                  }
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setPrefs((prev) => {
                      const next = { ...prev.agentOverrides }
                      delete next[agent.id]
                      return { ...prev, agentOverrides: next }
                    })
                  }
                >
                  Clear
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MarkupSummary() {
  const { role } = usePermissions()
  const [summary, setSummary] = useState<{
    totalWithMarkup: number
    totalWithoutMarkup: number
    perAgent: Array<{ agentId: string; agentName: string; withMarkup: number; withoutMarkup: number }>
  }>({ totalWithMarkup: 0, totalWithoutMarkup: 0, perAgent: [] })

  useEffect(() => {
    bookingsDB.readAll().then((bookings) => {
      const perAgentMap: Record<string, { agentName: string; withMarkup: number; withoutMarkup: number }> = {}
      let withMarkup = 0
      let withoutMarkup = 0

      bookings.forEach((booking) => {
        const applied = booking.details?.markup?.applied && (booking.details?.markup?.totalMarkup ?? 0) > 0
        if (applied) withMarkup += 1
        else withoutMarkup += 1

        if (!perAgentMap[booking.agentId]) {
          perAgentMap[booking.agentId] = {
            agentName: booking.agentName,
            withMarkup: 0,
            withoutMarkup: 0,
          }
        }
        if (applied) perAgentMap[booking.agentId].withMarkup += 1
        else perAgentMap[booking.agentId].withoutMarkup += 1
      })

      setSummary({
        totalWithMarkup: withMarkup,
        totalWithoutMarkup: withoutMarkup,
        perAgent: Object.entries(perAgentMap).map(([agentId, data]) => ({ agentId, ...data })),
      })
    })
  }, [])

  if (role !== "SUPER_ADMIN") return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Super Admin Markup Summary</CardTitle>
        <CardDescription>Visibility into bookings with and without markup plus agent history.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Bookings with markup</p>
            <p className="text-3xl font-bold text-primary">{summary.totalWithMarkup}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Bookings without markup</p>
            <p className="text-3xl font-bold">{summary.totalWithoutMarkup}</p>
          </div>
        </div>

        <div className="rounded-md border">
          <div className="px-4 py-2 border-b bg-muted/50">
            <p className="font-semibold">Markup history by agent</p>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-3 font-medium">Agent</th>
                <th className="p-3 font-medium">With Markup</th>
                <th className="p-3 font-medium">Without Markup</th>
              </tr>
            </thead>
            <tbody>
              {summary.perAgent.length === 0 && (
                <tr>
                  <td className="p-3 text-muted-foreground" colSpan={3}>
                    No bookings recorded yet.
                  </td>
                </tr>
              )}
              {summary.perAgent.map((agent) => (
                <tr key={agent.agentId} className="border-t">
                  <td className="p-3">{agent.agentName}</td>
                  <td className="p-3">{agent.withMarkup}</td>
                  <td className="p-3">{agent.withoutMarkup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
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

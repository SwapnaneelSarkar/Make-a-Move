"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Database, RefreshCw, CheckCircle2, XCircle, Settings } from "lucide-react"
import { usePermissions } from "@/hooks/use-permissions"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ERPConnection {
  id: string
  name: string
  type: "Tally Prime" | "Zoho Books"
  status: "Connected" | "Disconnected" | "Error"
  lastSync: string
  syncFrequency: "Real-time" | "Hourly" | "Daily"
}

const MOCK_CONNECTIONS: ERPConnection[] = [
  {
    id: "1",
    name: "Main Tally Connection",
    type: "Tally Prime",
    status: "Connected",
    lastSync: "2024-01-20T10:30:00",
    syncFrequency: "Hourly",
  },
  {
    id: "2",
    name: "Zoho Books Integration",
    type: "Zoho Books",
    status: "Disconnected",
    lastSync: "2024-01-19T15:45:00",
    syncFrequency: "Daily",
  },
]

export default function ERPIntegrationPage() {
  const { canView, canEdit } = usePermissions()
  const [connections, setConnections] = useState<ERPConnection[]>(MOCK_CONNECTIONS)
  const [syncing, setSyncing] = useState<string | null>(null)

  if (!canView("erpIntegration")) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const handleSync = async (connectionId: string) => {
    setSyncing(connectionId)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast.success("Sync completed successfully")
      setConnections((prev) =>
        prev.map((c) =>
          c.id === connectionId
            ? { ...c, lastSync: new Date().toISOString(), status: "Connected" as const }
            : c
        )
      )
    } catch (error) {
      toast.error("Sync failed")
    } finally {
      setSyncing(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ERP Integration</h1>
          <p className="text-muted-foreground">Integrate with Tally Prime and Zoho Books for invoice and ledger synchronization.</p>
        </div>
      </div>

      <Tabs defaultValue="connections" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="tally">Tally Prime</TabsTrigger>
          <TabsTrigger value="zoho">Zoho Books</TabsTrigger>
          <TabsTrigger value="sync">Sync Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle>ERP Connections</CardTitle>
              <CardDescription>Manage connections to Tally Prime and Zoho Books</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Sync</TableHead>
                    <TableHead>Sync Frequency</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connections.map((conn) => (
                    <TableRow key={conn.id}>
                      <TableCell className="font-medium">{conn.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{conn.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            conn.status === "Connected"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : conn.status === "Error"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {conn.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(conn.lastSync).toLocaleString()}</TableCell>
                      <TableCell>{conn.syncFrequency}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSync(conn.id)}
                            disabled={syncing === conn.id}
                          >
                            <RefreshCw className={`h-4 w-4 mr-2 ${syncing === conn.id ? "animate-spin" : ""}`} />
                            Sync Now
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tally">
          <Card>
            <CardHeader>
              <CardTitle>Tally Prime Configuration</CardTitle>
              <CardDescription>Configure connection to Tally Prime for invoice and ledger sync</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tally Server URL</Label>
                <Input placeholder="http://localhost:9000" defaultValue="http://localhost:9000" />
              </div>
              <div>
                <Label>Company Name</Label>
                <Input placeholder="Enter company name" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Auto Sync</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync invoices and ledger entries</p>
                </div>
                <Switch />
              </div>
              <div>
                <Label>Sync Frequency</Label>
                <Select defaultValue="hourly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zoho">
          <Card>
            <CardHeader>
              <CardTitle>Zoho Books Configuration</CardTitle>
              <CardDescription>Configure connection to Zoho Books for invoice and ledger sync</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Zoho Organization ID</Label>
                <Input placeholder="Enter organization ID" />
              </div>
              <div>
                <Label>API Token</Label>
                <Input type="password" placeholder="Enter API token" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Auto Sync</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync invoices and ledger entries</p>
                </div>
                <Switch />
              </div>
              <div>
                <Label>Sync Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sync">
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>Configure what data to sync between platform and ERP systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Invoice Sync</h4>
                <div className="flex items-center justify-between">
                  <Label>Sync Invoices to ERP</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Sync Invoice Payments</Label>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Ledger Sync</h4>
                <div className="flex items-center justify-between">
                  <Label>Sync Ledger Entries</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Sync Transaction Details</Label>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}




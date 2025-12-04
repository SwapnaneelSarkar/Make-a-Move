"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Trash2, FileText, Loader2, XCircle, CheckCircle2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

interface Report {
  id: string
  name: string
  type: "Financial" | "Booking" | "Analytics" | "Compliance"
  date: string
  status: "Ready" | "Processing" | "Failed"
  size: string
}

const MOCK_REPORTS: Report[] = [
  {
    id: "1",
    name: "Monthly Financial Report - May 2024",
    type: "Financial",
    date: "2024-05-20",
    status: "Ready",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Booking Summary Q1 2024",
    type: "Booking",
    date: "2024-05-19",
    status: "Processing",
    size: "-",
  },
  {
    id: "3",
    name: "User Activity Analytics",
    type: "Analytics",
    date: "2024-05-18",
    status: "Ready",
    size: "1.8 MB",
  },
  {
    id: "4",
    name: "KYC Compliance Report",
    type: "Compliance",
    date: "2024-05-17",
    status: "Failed",
    size: "-",
  },
]

export default function DownloadsPage() {
  const handleDownload = (report: Report) => {
    if (report.status === "Ready") {
      toast.success(`Downloading ${report.name}`)
    } else {
      toast.error("Report is not ready for download")
    }
  }

  const handleDelete = (id: string) => {
    toast.success("Report deleted")
  }

  const getStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "Ready":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Ready
          </Badge>
        )
      case "Processing":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Processing
          </Badge>
        )
      case "Failed":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Download Center</h1>
        <p className="text-muted-foreground">Access and manage your generated reports and documents.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Download or delete your generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_REPORTS.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{report.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.type}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(report.date)}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(report)}
                        disabled={report.status !== "Ready"}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(report.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}










"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload, CheckCircle2, Clock, XCircle, FileText, RefreshCw, Eye } from "lucide-react"
import { toast } from "sonner"
import { MFAModal } from "@/components/mfa-modal"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const kycSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format"),
  addressType: z.string().min(1, "Please select address proof type"),
})

type KYCStatus = "SUBMITTED" | "IN_PROGRESS" | "APPROVED" | "REJECTED"

interface KYCData {
  status: KYCStatus
  submissionDate: string
  rejectionReason?: string
  documents: {
    pan: { file: string; expiryDate?: string }
    gst: { file: string; expiryDate?: string }
    address: { file: string; expiryDate?: string }
  }
}

// Mock initial state - usually fetched from API
const INITIAL_KYC_DATA: KYCData = {
  status: "REJECTED",
  submissionDate: "2024-05-15",
  rejectionReason: "Address proof document was blurry. Please re-upload a clear copy.",
  documents: {
    pan: { file: "pan_card.pdf", expiryDate: "2025-06-15" },
    gst: { file: "gst_cert.pdf", expiryDate: "2024-12-20" },
    address: { file: "utility_bill.jpg", expiryDate: "2024-12-10" },
  },
}

// Helper function to get expiry badge
function getExpiryBadge(expiryDate?: string) {
  if (!expiryDate) return null
  const expiry = new Date(expiryDate)
  const today = new Date()
  const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (daysUntilExpiry < 0) {
    return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">Expired</Badge>
  } else if (daysUntilExpiry <= 7) {
    return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">Expires in {daysUntilExpiry} days</Badge>
  } else if (daysUntilExpiry <= 30) {
    return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200">Expires in {daysUntilExpiry} days</Badge>
  }
  return null
}

export default function KYCPage() {
  const [kycStatus, setKycStatus] = useState<KYCStatus>(INITIAL_KYC_DATA.status)
  const [activeTab, setActiveTab] = useState("status")
  const [mfaOpen, setMfaOpen] = useState(false)

  const form = useForm<z.infer<typeof kycSchema>>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      businessName: "",
      panNumber: "",
      gstin: "",
      addressType: "",
    },
  })

  function onSubmit(values: z.infer<typeof kycSchema>) {
    setMfaOpen(true)
  }

  const handleMFASuccess = () => {
    // Simulate API call
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Submitting KYC documents...",
      success: () => {
        setKycStatus("SUBMITTED")
        setActiveTab("status")
        return "KYC submitted successfully!"
      },
      error: "Failed to submit KYC",
    })
  }

  const renderStatusBadge = (status: KYCStatus) => {
    switch (status) {
      case "APPROVED":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 px-3 py-1">
            <CheckCircle2 className="w-4 h-4 mr-1" /> Approved
          </Badge>
        )
      case "REJECTED":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 px-3 py-1">
            <XCircle className="w-4 h-4 mr-1" /> Rejected
          </Badge>
        )
      case "IN_PROGRESS":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200 px-3 py-1">
            <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> In Progress
          </Badge>
        )
      default:
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200 px-3 py-1"
          >
            <Clock className="w-4 h-4 mr-1" /> Submitted
          </Badge>
        )
    }
  }

  return (
    <div className="container max-w-5xl py-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">KYC Verification</h1>
          <p className="text-muted-foreground mt-1">
            Complete your business verification to unlock full platform access.
          </p>
        </div>
        {renderStatusBadge(kycStatus)}
      </div>

      {kycStatus === "REJECTED" && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex gap-3 text-red-800">
          <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">Verification Failed</h4>
            <p className="text-sm mt-1">{INITIAL_KYC_DATA.rejectionReason}</p>
            <Button
              variant="link"
              className="px-0 text-red-700 h-auto mt-2 underline decoration-red-300"
              onClick={() => setActiveTab("upload")}
            >
              Re-submit Documents
            </Button>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="status">Status & History</TabsTrigger>
          <TabsTrigger value="upload" disabled={kycStatus === "APPROVED" || kycStatus === "IN_PROGRESS"}>
            Document Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Submission Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{INITIAL_KYC_DATA.submissionDate}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Documents Uploaded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3/3</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Est. Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24-48 Hrs</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
              <CardDescription>Review your submitted documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {[
                  { name: "PAN Card", doc: INITIAL_KYC_DATA.documents.pan, status: "Verified" },
                  { name: "GST Certificate", doc: INITIAL_KYC_DATA.documents.gst, status: "Verified" },
                  { name: "Address Proof", doc: INITIAL_KYC_DATA.documents.address, status: "Rejected" },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.doc.file}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getExpiryBadge(doc.doc.expiryDate)}
                      <Badge
                        variant="outline"
                        className={
                          doc.status === "Verified"
                            ? "text-green-600 bg-green-50 border-green-200"
                            : "text-red-600 bg-red-50 border-red-200"
                        }
                      >
                        {doc.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Business Details</CardTitle>
              <CardDescription>Please ensure all details match your official documents.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registered Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Travels Pvt Ltd" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="addressType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Proof Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select document type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="utility">Utility Bill (Electricity/Water)</SelectItem>
                              <SelectItem value="rent">Rent Agreement</SelectItem>
                              <SelectItem value="bank">Bank Statement</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="panNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business PAN</FormLabel>
                          <FormControl>
                            <Input placeholder="ABCDE1234F" className="uppercase" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gstin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GSTIN</FormLabel>
                          <FormControl>
                            <Input placeholder="22AAAAA0000A1Z5" className="uppercase" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Document Uploads</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {["PAN Card", "GST Certificate", "Address Proof"].map((label) => (
                        <div
                          key={label}
                          className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer group"
                        >
                          <div className="p-3 bg-secondary rounded-full mb-3 group-hover:bg-primary/20 transition-colors">
                            <Upload className="w-6 h-6 text-primary" />
                          </div>
                          <p className="font-medium text-sm mb-1">Upload {label}</p>
                          <p className="text-xs text-muted-foreground">PDF or JPG (Max 5MB)</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" onClick={() => setActiveTab("status")}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit for Verification</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <MFAModal open={mfaOpen} onOpenChange={setMfaOpen} onSuccess={handleMFASuccess} action="update KYC" />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Check, X, Download, ExternalLink, AlertCircle, Clock } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { usePermissions } from "@/hooks/use-permissions"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock Data for Admin Review
const PENDING_KYC = [
  {
    id: "kyc_001",
    businessName: "Global Horizons Travel",
    submittedBy: "Rahul Sharma",
    date: "2024-05-20",
    status: "IN_PROGRESS",
    details: {
      pan: "ABCDE1234F",
      gst: "27AABCV1234F1Z5",
      address: "Shop 12, Phoenix Market City, Mumbai",
    },
    documents: [
      { type: "PAN Card", url: "#", verified: true },
      { type: "GST Certificate", url: "#", verified: true },
      { type: "Address Proof", url: "#", verified: false }, // Needs review
    ],
  },
]

export default function KYCReviewPage() {
  const { canView, canApprove } = usePermissions()
  const [selectedApplication, setSelectedApplication] = useState(PENDING_KYC[0])
  const [rejectionReason, setRejectionReason] = useState("")
  const [notes, setNotes] = useState("")

  if (!canView("kycDocuments")) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You do not have permission to review KYC applications. Only KYC/Compliance Team and Super Admins can access this page.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const handleApprove = () => {
    toast.success(`KYC Approved for ${selectedApplication.businessName}`)
    // Logic to update status
  }

  const handleReject = () => {
    if (!rejectionReason) {
      toast.error("Please provide a rejection reason")
      return
    }
    toast.error(`KYC Rejected for ${selectedApplication.businessName}`)
    // Logic to update status
  }

  return (
    <div className="container max-w-6xl py-6 h-[calc(100vh-4rem)] flex gap-6">
      {/* Sidebar List */}
      <div className="w-80 flex flex-col gap-4">
        <h2 className="text-xl font-serif font-bold px-2">Pending Reviews</h2>
        <div className="space-y-2">
          {PENDING_KYC.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelectedApplication(app)}
              className="p-4 rounded-lg border bg-card hover:bg-accent/5 cursor-pointer transition-all border-l-4 border-l-primary shadow-sm"
            >
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-sm">{app.businessName}</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 h-5">
                  {app.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">By {app.submittedBy}</p>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> {app.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Review Area */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <Card className="flex-1 flex flex-col overflow-hidden border-none shadow-md">
          <CardHeader className="border-b bg-muted/20 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-serif">{selectedApplication.businessName}</CardTitle>
                <CardDescription>Application ID: {selectedApplication.id}</CardDescription>
              </div>
              <div className="flex gap-2">
                {canApprove("kycVerification") && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="gap-2">
                        <X className="w-4 h-4" /> Reject
                      </Button>
                    </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reject KYC Application</DialogTitle>
                      <DialogDescription>
                        Please provide a reason for rejection. This will be visible to the user.
                      </DialogDescription>
                    </DialogHeader>
                    <Textarea
                      placeholder="e.g. Address proof is unclear or expired..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                    />
                    <DialogFooter>
                      <Button variant="destructive" onClick={handleReject}>
                        Confirm Rejection
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                )}

                {canApprove("kycVerification") && (
                  <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white" onClick={handleApprove}>
                    <Check className="w-4 h-4" /> Approve
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <div className="flex-1 overflow-auto p-6">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  Business Details
                </h3>
                <div className="grid gap-3 text-sm">
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">PAN Number:</span>
                    <span className="font-mono font-medium">{selectedApplication.details.pan}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">GSTIN:</span>
                    <span className="font-mono font-medium">{selectedApplication.details.gst}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-muted-foreground">Address:</span>
                    <span className="font-medium">{selectedApplication.details.address}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Reviewer Notes</h3>
                <Textarea
                  placeholder="Add internal notes about this application..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-32 resize-none bg-yellow-50/50 border-yellow-200 focus:border-yellow-400"
                />
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="font-semibold mb-4">Document Verification</h3>
            <div className="grid gap-4">
              {selectedApplication.documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                      PDF
                    </div>
                    <div>
                      <p className="font-medium">{doc.type}</p>
                      <p className="text-xs text-muted-foreground">Uploaded on {selectedApplication.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <ExternalLink className="w-3 h-3" /> View
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                    {doc.verified ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 ml-2">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-200 ml-2">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

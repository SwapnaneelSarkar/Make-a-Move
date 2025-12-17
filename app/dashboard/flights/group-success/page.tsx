"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ArrowLeft, ExternalLink, PlaneTakeoff, Clock3, IndianRupee } from "lucide-react"

export default function GroupSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reference = searchParams.get("reference") || "Pending"
  const total = searchParams.get("total") || ""
  const origin = searchParams.get("origin") || ""
  const destination = searchParams.get("destination") || ""
  const classType = searchParams.get("class") || ""
  const quote = searchParams.get("quote") || ""

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/flights")} className="h-10 w-10">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Group enquiry submitted</h1>
            <Badge variant="success" className="gap-1">
              <CheckCircle2 className="h-4 w-4" /> Sent to Support
            </Badge>
          </div>
          <p className="text-muted-foreground">
            We’ve shared your request with Support/Admin. They’ll revert with quote, validity, and payment steps.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Request summary</CardTitle>
            <CardDescription>Keep this reference handy when following up.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border bg-muted/40 p-3">
                <p className="text-xs uppercase text-muted-foreground">Reference</p>
                <p className="text-lg font-semibold">{reference}</p>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <p className="text-xs uppercase text-muted-foreground">Passengers</p>
                <p className="text-lg font-semibold">{total || "10+"} pax</p>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <p className="text-xs uppercase text-muted-foreground">Route</p>
                <p className="text-lg font-semibold">
                  {origin} → {destination}
                </p>
                <p className="text-xs text-muted-foreground">{classType || "Economy"}</p>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <p className="text-xs uppercase text-muted-foreground">Quoted total (optional)</p>
                <p className="text-lg font-semibold flex items-center gap-1">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  {quote || "Pending from support"}
                </p>
                <p className="text-xs text-muted-foreground">Total for the entire group</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next steps</CardTitle>
            <CardDescription>What happens now</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <PlaneTakeoff className="h-4 w-4 mt-1 text-primary" />
              <div>
                <p className="font-medium">Support prepares group fare</p>
                <p className="text-sm text-muted-foreground">Includes validity date and payment instructions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock3 className="h-4 w-4 mt-1 text-primary" />
              <div>
                <p className="font-medium">You review & confirm</p>
                <p className="text-sm text-muted-foreground">Confirm within validity to lock seats and fare.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ExternalLink className="h-4 w-4 mt-1 text-primary" />
              <div>
                <p className="font-medium">Payment & PNR issuance</p>
                <p className="text-sm text-muted-foreground">Pay per shared instructions; PNR issued once received.</p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={() => router.push("/dashboard/flights")}>Back to Flights</Button>
              <Button variant="outline" onClick={() => router.push("/dashboard/flights/group-requests")}>
                View Requests
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


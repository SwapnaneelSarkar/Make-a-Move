"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Shield } from "lucide-react"

interface MFAModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  action: string
}

export function MFAModal({ open, onOpenChange, onSuccess, action }: MFAModalProps) {
  const [otp, setOtp] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Accept any 6-digit code for mock
    if (otp.length === 6) {
      toast.success("MFA verified", {
        description: "MFA will be implemented in production",
      })
      onSuccess()
      setOtp("")
      onOpenChange(false)
    } else {
      toast.error("Please enter a 6-digit OTP")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <DialogTitle>Multi-Factor Authentication</DialogTitle>
          </div>
          <DialogDescription>
            Please enter the 6-digit OTP code to confirm {action}. MFA will be implemented in production.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">OTP Code</Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="text-center text-2xl font-mono tracking-widest"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={otp.length !== 6}>
              Verify
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}













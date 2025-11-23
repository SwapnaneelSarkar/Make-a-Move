"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"

interface MaskedTextProps {
  text: string
  type?: "email" | "phone" | "pan" | "generic"
}

export function MaskedText({ text, type = "generic" }: MaskedTextProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const { currentUser } = useAppStore()

  // Only Super Admin can reveal
  const canReveal = currentUser.role === "SUPER_ADMIN"

  const getMaskedValue = () => {
    if (!text) return ""
    switch (type) {
      case "email":
        const [user, domain] = text.split("@")
        return `${user.slice(0, 2)}******@${domain}`
      case "phone":
        return `******${text.slice(-4)}`
      case "pan":
        return `${text.slice(0, 2)}XXXXXX${text.slice(-2)}`
      default:
        return "********"
    }
  }

  const handleReveal = () => {
    if (!canReveal) return
    setIsRevealed(true)

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsRevealed(false)
    }, 5000)

    // In a real app, this would log to the audit trail via API
    console.log(`[Audit] User ${currentUser.name} revealed sensitive data: ${type}`)
  }

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <span>{isRevealed ? text : getMaskedValue()}</span>
      {canReveal && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-primary"
          onClick={handleReveal}
          title="Reveal for 5 seconds"
        >
          {isRevealed ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
        </Button>
      )}
    </div>
  )
}

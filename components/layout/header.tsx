"use client"

import {
  Bell,
  Search,
  Menu,
  UserCircle,
  FileText,
  Building2,
  Plane,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { MOCK_BOOKINGS, MOCK_FLIGHTS, MOCK_HOTELS } from "@/lib/mock-data"

export function Header() {
  const { currentUser, setRole } = useAppStore()
  const router = useRouter()
  const [openSearch, setOpenSearch] = useState(false)

  // Keyboard shortcut to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenSearch((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("session_user")
    router.push("/login")
    toast.success("Logged out successfully")
  }

  const handleSearchSelect = (url: string) => {
    setOpenSearch(false)
    router.push(url)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6 shadow-sm">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="flex flex-1 items-center gap-4 md:gap-8">
        {/* Replaced Input with CommandDialog trigger */}
        <div className="hidden md:block flex-1 max-w-sm">
          <Button
            variant="outline"
            className="relative w-full justify-start text-sm text-muted-foreground bg-background/50 hover:bg-background/80"
            onClick={() => setOpenSearch(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search bookings, PNR, customers...
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
      </div>

      {/* Global Search Dialog */}
      <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Flights">
            {MOCK_FLIGHTS.slice(0, 3).map((flight) => (
              <CommandItem key={flight.id} onSelect={() => handleSearchSelect(`/dashboard/flights?id=${flight.id}`)}>
                <Plane className="mr-2 h-4 w-4" />
                <span>
                  {flight.airline} - {flight.flightNumber} ({flight.departure.code} to {flight.arrival.code})
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Hotels">
            {MOCK_HOTELS.slice(0, 3).map((hotel) => (
              <CommandItem key={hotel.id} onSelect={() => handleSearchSelect(`/dashboard/hotels?id=${hotel.id}`)}>
                <Building2 className="mr-2 h-4 w-4" />
                <span>
                  {hotel.name} - {hotel.location}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Transactions">
            {MOCK_BOOKINGS.slice(0, 3).map((booking) => (
              <CommandItem key={booking.id} onSelect={() => handleSearchSelect(`/dashboard/bookings/${booking.id}`)}>
                <FileText className="mr-2 h-4 w-4" />
                <span>
                  Booking #{booking.id.toUpperCase()} - {booking.type} ({booking.status})
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Disputes">
            <CommandItem onSelect={() => handleSearchSelect("/dashboard/disputes/D-102")}>
              <AlertCircle className="mr-2 h-4 w-4" />
              <span>Dispute #D-102 - Refund Pending</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <div className="flex items-center gap-4">
        {/* Role Switcher for Demo Purposes */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
              Switch Role: {currentUser.role}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
            <DropdownMenuLabel>Select Role (Demo)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setRole("SUPER_ADMIN")}>Super Admin</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole("AGENCY_ADMIN")}>Agency Admin</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole("AGENT")}>Agent</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole("SUB_AGENT")}>Sub Agent</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole("FINANCE_TEAM")}>Finance Team</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole("SUPPORT_TEAM")}>Support Team</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole("KYC_COMPLIANCE_TEAM")}>KYC Team</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserCircle className="h-6 w-6 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

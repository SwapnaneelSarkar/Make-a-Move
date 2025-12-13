"use client"

import {
  Bell,
  Search,
  Menu,
  UserCircle,
  Shield,
  AlertTriangle,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  const { currentUser, setRole, setSupportMode } = useAppStore()
  const router = useRouter()
  const [selectedAgent, setSelectedAgent] = useState("John Employee")
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

  const activateSupportMode = () => {
    setSupportMode(true, selectedAgent)
    toast.warning("Entering Support Mode", {
      description: `You are now viewing as ${selectedAgent}. All actions will be logged.`,
    })
  }

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
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Role (Demo)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setRole("SUPER_ADMIN")}>Super Admin</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole("CORPORATE_ADMIN")}>Corporate Admin</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole("EMPLOYEE")}>Employee</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Support Mode Button for Super Admin */}
        {currentUser.role === "SUPER_ADMIN" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex gap-2 border-orange-500/20 text-orange-600 bg-orange-50 hover:bg-orange-100 hover:text-orange-700"
              >
                <Shield className="h-4 w-4" />
                Support Mode
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Activate Support Mode</DialogTitle>
                <DialogDescription>
                  Select an agent to impersonate. This allows you to view the dashboard exactly as they see it to
                  troubleshoot issues.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <label className="text-sm font-medium mb-2 block">Select Agent</label>
                <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Employee">John Employee (Sales)</SelectItem>
                    <SelectItem value="Sarah Corp">Sarah Corp (Admin)</SelectItem>
                    <SelectItem value="Mike Finance">Mike Finance (Accounts)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 text-sm flex gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  While in Support Mode, you cannot perform financial transactions or approve payments. All navigation
                  is logged.
                </p>
              </div>

              <DialogFooter>
                <Button onClick={activateSupportMode} className="bg-orange-600 hover:bg-orange-700 text-white">
                  Enter Support Mode
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

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

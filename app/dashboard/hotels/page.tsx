"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HotelCard } from "@/components/booking/hotel-card"
import { MOCK_HOTELS, type Hotel, type HotelRoom } from "@/lib/mock-data"
import {
  Search,
  MapPin,
  CalendarIcon,
  SlidersHorizontal,
  Filter,
  CheckCircle2,
  Lock,
  ChevronRight,
  Users,
  Bed,
  AlertCircle,
  X,
  Globe,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, addDays, isAfter, isBefore, isToday, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { toast } from "sonner"
import { bookingsDB, transactionsDB } from "@/lib/local-db"
import { audit } from "@/lib/audit-utils"
import { hasSufficientBalance, getWalletBalance, createTransaction } from "@/lib/wallet-utils"
import {
  checkHotelPolicyCompliance,
  generateHotelBookingId,
  generateHotelVoucherNumber,
  validateGSTIN,
  validateMobileNumber,
  validateName,
} from "@/lib/policy-utils"
import { calculatePricingBreakdown } from "@/lib/pricing-utils"
import { loadMarkupPreferences, resolveAgentMarkup } from "@/lib/markup-settings"
import { getMarkupVisibility } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ALL_CITIES, getCitiesByType, type City } from "@/lib/hotel-cities"

const BOOKING_STAGES = [
  { id: "search", label: "Search" },
  { id: "listing", label: "Listing" },
  { id: "room-selection", label: "Room Selection" },
  { id: "guest-details", label: "Guest Details + Add-ons" },
  { id: "payment", label: "Payment" },
  { id: "confirmed", label: "Booking Confirmed" },
]

interface SearchData {
  location: string
  checkIn: Date | undefined
  checkOut: Date | undefined
  rooms: number
  adults: number
  children: number
  purposeOfStay: "Business" | "Leisure" | ""
  starRating?: number
  priceRange?: [number, number]
  amenities: string[]
}

interface RoomSelection {
  roomId: string
  roomType: string
  boardBasis: string
  price: number
  maxOccupancy: number
}

interface GuestDetails {
  name: string
  mobile: string
  nationality: string
  gstin: string
  specialRequests: string
  acceptPolicies: boolean
}

interface OccupantPassportDetails {
  name: string
  passport: string
  passportExpiry: string
}

interface AddOns {
  extraBed: boolean
  airportTransfer: boolean
  meals: boolean
  insurance: boolean
}

interface PaymentData {
  paymentMode: "Pay at Property" | "Prepay via Wallet" | "Prepay via Card" | ""
  couponCode: string
  walletUsage: boolean
  walletAmount: number
}

export default function HotelsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentUser } = useAppStore()
  const isSuperAdmin = currentUser.role === "SUPER_ADMIN"
  
  // Check if coming from listing page with selected hotel
  const selectedHotelId = searchParams.get("selectedHotel")
  
  const [currentStage, setCurrentStage] = useState(0)
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [selectedRooms, setSelectedRooms] = useState<RoomSelection[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [paymentTimeout, setPaymentTimeout] = useState<number | null>(null)
  const [isInternational, setIsInternational] = useState(false)

  // Search Data
  const [searchData, setSearchData] = useState<SearchData>({
    location: "",
    checkIn: undefined,
    checkOut: undefined,
    rooms: 1,
    adults: 1,
    children: 0,
    purposeOfStay: "",
    amenities: [],
  })

  // Guest Details
  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    name: "",
    mobile: "",
    nationality: "",
    gstin: "",
    specialRequests: "",
    acceptPolicies: false,
  })

  // Passport details for each occupant (for international bookings)
  const [occupantPassports, setOccupantPassports] = useState<OccupantPassportDetails[]>([])

  // Add-ons
  const [addOns, setAddOns] = useState<AddOns>({
    extraBed: false,
    airportTransfer: false,
    meals: false,
    insurance: false,
  })

  // Payment Data
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentMode: "",
    couponCode: "",
    walletUsage: false,
    walletAmount: 0,
  })
  const [markupControls, setMarkupControls] = useState({
    applyMarkup: true,
    agentMarkup: 500,
    includeAgentMarkupInDocs: true,
  })
  const [resolvedMarkup, setResolvedMarkup] = useState(() =>
    resolveAgentMarkup(currentUser.id, currentUser.role)
  )
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false)
  const [selectedDownloadOption, setSelectedDownloadOption] = useState<"without-markup" | "with-markup" | "no-prices" | null>(null)

  // Booking confirmation data
  const [bookingId, setBookingId] = useState<string>("")
  const [voucherNumber, setVoucherNumber] = useState<string>("")

  useEffect(() => {
    loadMarkupPreferences()
    const resolved = resolveAgentMarkup(currentUser.id, currentUser.role)
    setResolvedMarkup(resolved)
    setMarkupControls((prev) => ({
      ...prev,
      agentMarkup: resolved.agentMarkup,
      applyMarkup: true,
      includeAgentMarkupInDocs: true,
    }))
  }, [currentUser.id, currentUser.role])

  // Handle hotel selection from listing page
  useEffect(() => {
    if (selectedHotelId && !selectedHotel) {
      const hotel = MOCK_HOTELS.find((h) => h.id === selectedHotelId)
      if (hotel) {
        setSelectedHotel(hotel)
        
        // Restore search params from URL
        const location = searchParams.get("location")
        const checkIn = searchParams.get("checkIn")
        const checkOut = searchParams.get("checkOut")
        const rooms = searchParams.get("rooms")
        const adults = searchParams.get("adults")
        const children = searchParams.get("children")
        const purposeOfStay = searchParams.get("purposeOfStay")
        const starRating = searchParams.get("starRating")
        const isIntl = searchParams.get("isInternational") === "true"
        
        if (location) setSearchData((prev) => ({ ...prev, location }))
        if (checkIn) {
          const checkInDate = new Date(checkIn)
          if (!isNaN(checkInDate.getTime())) {
            setSearchData((prev) => ({ ...prev, checkIn: checkInDate }))
          }
        }
        if (checkOut) {
          const checkOutDate = new Date(checkOut)
          if (!isNaN(checkOutDate.getTime())) {
            setSearchData((prev) => ({ ...prev, checkOut: checkOutDate }))
          }
        }
        if (rooms) setSearchData((prev) => ({ ...prev, rooms: parseInt(rooms) }))
        if (adults) setSearchData((prev) => ({ ...prev, adults: parseInt(adults) }))
        if (children) setSearchData((prev) => ({ ...prev, children: parseInt(children) }))
        if (purposeOfStay) setSearchData((prev) => ({ ...prev, purposeOfStay: purposeOfStay as "Business" | "Leisure" }))
        if (starRating) setSearchData((prev) => ({ ...prev, starRating: parseInt(starRating) }))
        setIsInternational(isIntl)
        
        // Move to room selection stage
        setCurrentStage(2)
        
        // Clear selectedHotel from URL after a short delay to ensure state is set
        setTimeout(() => {
          const newParams = new URLSearchParams(searchParams.toString())
          newParams.delete("selectedHotel")
          router.replace(`/dashboard/hotels?${newParams.toString()}`, { scroll: false })
        }, 100)
      } else {
        toast.error("Hotel not found", {
          description: "The selected hotel could not be found. Please try selecting again.",
        })
        router.push("/dashboard/hotels")
      }
    }
  }, [selectedHotelId, selectedHotel, router])

  // Initialize passport details when occupants change or when switching to international
  useEffect(() => {
    if (isInternational) {
      const totalOccupants = searchData.adults + searchData.children
      
      setOccupantPassports((prev) => {
        const currentPassports = prev.length
        
        if (currentPassports < totalOccupants) {
          // Add new passport entries for new occupants
          const newPassports: OccupantPassportDetails[] = []
          for (let i = 0; i < totalOccupants; i++) {
            if (i < currentPassports) {
              newPassports.push(prev[i])
            } else {
              newPassports.push({
                name: "",
                passport: "",
                passportExpiry: "",
              })
            }
          }
          return newPassports
        } else if (currentPassports > totalOccupants) {
          // Remove excess passport entries
          return prev.slice(0, totalOccupants)
        }
        return prev
      })
    } else {
      // Clear passport details for national bookings
      setOccupantPassports([])
    }
  }, [isInternational, searchData.adults, searchData.children])

  // Stage 1: Search Validation
  const validateSearch = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!searchData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!searchData.checkIn) {
      newErrors.checkIn = "Check-in date is required"
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const checkIn = new Date(searchData.checkIn)
      checkIn.setHours(0, 0, 0, 0)

      if (isBefore(checkIn, today) && !isToday(checkIn)) {
        newErrors.checkIn = "Check-in date must be today or later"
      }
    }

    if (!searchData.checkOut) {
      newErrors.checkOut = "Check-out date is required"
    } else if (searchData.checkIn) {
      const checkIn = new Date(searchData.checkIn)
      const checkOut = new Date(searchData.checkOut)
      if (!isAfter(checkOut, checkIn)) {
        newErrors.checkOut = "Check-out date must be after check-in date"
      }
    }

    if (searchData.rooms < 1) {
      newErrors.rooms = "At least one room is required"
    }

    if (searchData.adults < searchData.rooms) {
      newErrors.adults = "At least one adult per room is required"
    }

    const totalGuests = searchData.adults + searchData.children
    if (totalGuests > searchData.rooms * 4) {
      newErrors.guests = "Total guests exceed maximum allowed per room (4 guests per room)"
    }

    // Purpose of stay validation (if enabled)
    // For now, we'll make it optional but can be enforced

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Stage 2: Hotel Selection Validation
  const validateHotelSelection = (): boolean => {
    if (!selectedHotel) {
      toast.error("Please select a hotel to proceed")
      return false
    }
    return true
  }

  // Stage 3: Room Selection Validation
  const validateRoomSelection = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (selectedRooms.length === 0) {
      newErrors.rooms = "Please select at least one room"
    }

    // Validate occupancy
    const totalGuests = searchData.adults + searchData.children
    const totalCapacity = selectedRooms.reduce((sum, room) => sum + room.maxOccupancy, 0)
    if (totalGuests > totalCapacity) {
      newErrors.occupancy = `Total guests (${totalGuests}) exceed room capacity (${totalCapacity})`
    }

    // Validate board basis selection
    selectedRooms.forEach((room, index) => {
      if (!room.boardBasis) {
        newErrors[`boardBasis_${index}`] = "Please select a board basis for the selected room"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Stage 4: Guest Details Validation
  const validateGuestDetails = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!guestDetails.name.trim()) {
      newErrors.name = "Primary guest name is required"
    } else if (!validateName(guestDetails.name)) {
      newErrors.name = "Name must contain only alphabets"
    }

    if (!guestDetails.mobile.trim()) {
      newErrors.mobile = "Mobile number is required"
    } else if (!validateMobileNumber(guestDetails.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number"
    }

    // Nationality validation (if required by hotel)
    if (selectedHotel?.requiresNationality && !guestDetails.nationality) {
      newErrors.nationality = "Nationality is required for this hotel"
    }

    // GST validation (if required for business bookings)
    if (searchData.purposeOfStay === "Business" && selectedHotel?.requiresGST) {
      if (!guestDetails.gstin.trim()) {
        newErrors.gstin = "GSTIN is required for business bookings"
      } else if (!validateGSTIN(guestDetails.gstin)) {
        newErrors.gstin = "Please enter a valid GSTIN (15 characters)"
      }
    }

    // Number of guests validation
    const totalGuests = searchData.adults + searchData.children
    if (totalGuests < 1) {
      newErrors.numberOfGuests = "At least one guest is required"
    }

    // Passport validation for international bookings
    if (isInternational) {
      const totalOccupants = searchData.adults + searchData.children
      
      if (occupantPassports.length !== totalOccupants) {
        newErrors.passport = "Passport details are required for all occupants"
      } else {
        occupantPassports.forEach((passport, index) => {
          if (!passport.name.trim()) {
            newErrors[`passport_name_${index}`] = `Name is required for occupant ${index + 1}`
          } else if (!validateName(passport.name)) {
            newErrors[`passport_name_${index}`] = `Name must contain only alphabets for occupant ${index + 1}`
          }

          if (!passport.passport.trim()) {
            newErrors[`passport_${index}`] = `Passport number is required for occupant ${index + 1}`
          } else if (!/^[A-Z]{1}[0-9]{7}$/.test(passport.passport.toUpperCase())) {
            newErrors[`passport_${index}`] = `Passport number must be 1 letter followed by 7 digits (e.g., A1234567) for occupant ${index + 1}`
          }

          if (!passport.passportExpiry) {
            newErrors[`passport_expiry_${index}`] = `Passport expiry date is required for occupant ${index + 1}`
          } else {
            const expiryDate = new Date(passport.passportExpiry)
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            
            if (isNaN(expiryDate.getTime())) {
              newErrors[`passport_expiry_${index}`] = `Please enter a valid expiry date for occupant ${index + 1}`
            } else if (expiryDate <= today) {
              newErrors[`passport_expiry_${index}`] = `Passport expiry date must be in the future for occupant ${index + 1}`
            }
          }
        })
      }
    }

    // Policy acceptance
    if (!guestDetails.acceptPolicies) {
      newErrors.acceptPolicies = "You must accept the hotel policies to proceed"
    }

    // Age validation (if hotel requires 18+)
    // This would typically be validated against DOB, but for simplicity we'll assume it's validated elsewhere

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Stage 5: Payment Validation
  const validatePayment = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!paymentData.paymentMode) {
      newErrors.paymentMode = "Please select a payment mode"
    }

    // Wallet validation
    if (paymentData.paymentMode === "Prepay via Wallet" || paymentData.walletUsage) {
      const walletBalance = getWalletBalance()
      const totalAmount = calculateFinalAmount()

      if (!hasSufficientBalance(totalAmount)) {
        newErrors.wallet = `Insufficient wallet balance. Required: ₹${totalAmount.toLocaleString("en-IN")}, Available: ₹${walletBalance.toLocaleString("en-IN")}. Please add funds to continue.`
      }
    }

    // Final billing validation
    const finalAmount = calculateFinalAmount()
    if (finalAmount < 0) {
      newErrors.finalAmount = "Final billing amount cannot be negative"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Calculate total amount
  const calculateTotalAmount = (): number => {
    if (!selectedHotel || selectedRooms.length === 0 || !searchData.checkIn || !searchData.checkOut) return 0

    const nights = Math.ceil(
      (searchData.checkOut.getTime() - searchData.checkIn.getTime()) / (1000 * 60 * 60 * 24),
    )

    let baseAmount = 0
    selectedRooms.forEach((room) => {
      baseAmount += room.price * nights
    })

    // Add board basis costs
    selectedRooms.forEach((room) => {
      const roomData = selectedHotel.rooms?.find((r) => r.id === room.roomId)
      if (roomData) {
        const boardBasis = roomData.boardBasis.find((bb) => bb.id === room.boardBasis)
        if (boardBasis) {
          baseAmount += boardBasis.price * nights
        }
      }
    })

    // Add add-ons
    if (addOns.extraBed) baseAmount += 2000 * nights
    if (addOns.airportTransfer) baseAmount += 1500
    if (addOns.meals) baseAmount += 1000 * nights
    if (addOns.insurance) baseAmount += 500

    return baseAmount
  }

  const calculatePricingWithMarkup = (baseAmount: number) =>
    calculatePricingBreakdown(
      baseAmount,
      0,
      "hotels",
      isInternational ? "International" : "Domestic",
      "Regular",
      "INR",
      {
        superAdminMarkup: resolvedMarkup.superAdminMarkup,
        agentMarkup: markupControls.applyMarkup ? markupControls.agentMarkup : 0,
        applyMarkup: true,
      },
    )

  // Calculate final amount after discounts
  const calculateFinalAmount = (): number => {
    const total = calculateTotalAmount()
    const breakdown = calculatePricingWithMarkup(total)
    // Apply coupon discount if any (mock: 10% discount)
    const discount = paymentData.couponCode ? breakdown.totalAmount * 0.1 : 0
    return breakdown.totalAmount - discount - paymentData.walletAmount
  }

  // Handle search - navigate to listing page
  const handleSearch = () => {
    if (validateSearch()) {
      const params = new URLSearchParams({
        location: searchData.location,
        checkIn: searchData.checkIn ? format(searchData.checkIn, "yyyy-MM-dd") : "",
        checkOut: searchData.checkOut ? format(searchData.checkOut, "yyyy-MM-dd") : "",
        rooms: searchData.rooms.toString(),
        adults: searchData.adults.toString(),
        children: searchData.children.toString(),
        purposeOfStay: searchData.purposeOfStay || "",
        isInternational: isInternational.toString(),
      })
      if (searchData.starRating) {
        params.set("starRating", searchData.starRating.toString())
      }
      router.push(`/dashboard/hotels/listing?${params.toString()}`)
    }
  }

  // Handle hotel selection
  const handleHotelSelect = (hotel: Hotel) => {
    if (isSuperAdmin) {
      toast.error("Super Admins cannot initiate hotel bookings.", {
        description: "Switch to an agency role to continue.",
      })
      return
    }
    setSelectedHotel(hotel)
    setCurrentStage(2)
    setSelectedRooms([])
  }

  // Handle room selection
  const handleRoomSelect = (room: HotelRoom, boardBasisId: string) => {
    const existingIndex = selectedRooms.findIndex((r) => r.roomId === room.id)
    const boardBasis = room.boardBasis.find((bb) => bb.id === boardBasisId)
    if (!boardBasis) return

    const roomSelection: RoomSelection = {
      roomId: room.id,
      roomType: room.type,
      boardBasis: boardBasisId,
      price: room.pricePerNight + boardBasis.price,
      maxOccupancy: room.maxOccupancy,
    }

    if (existingIndex >= 0) {
      const updated = [...selectedRooms]
      updated[existingIndex] = roomSelection
      setSelectedRooms(updated)
    } else {
      setSelectedRooms([...selectedRooms, roomSelection])
    }
  }

  const handleDownloadVoucher = (downloadType: "with-markup" | "without-markup" | "no-prices") => {
    if (!selectedHotel || !bookingId || !voucherNumber || !searchData.checkIn || !searchData.checkOut) {
      toast.error("Voucher data not available")
      return
    }

    const nights = Math.ceil(
      (searchData.checkOut.getTime() - searchData.checkIn.getTime()) / (1000 * 60 * 60 * 24),
    )
    
    import("@/lib/voucher-generator").then(({ generateHotelVoucherPDF }) => {
      const baseAmount = calculateTotalAmount()
      const breakdown = calculatePricingWithMarkup(baseAmount)
      
      // Calculate totals: base fare includes super admin markup, agent markup is optional
      const includeAgentMarkup = downloadType === "with-markup"
      const hidePrices = downloadType === "no-prices"
      const agentMarkupAmount = includeAgentMarkup ? breakdown.markup : 0
      const totalForDocs = breakdown.baseFare + breakdown.taxes + agentMarkupAmount

      generateHotelVoucherPDF({
        bookingId,
        voucherNumber,
        hotel: {
          name: selectedHotel.name,
          location: selectedHotel.location,
          rating: selectedHotel.rating,
        },
        guest: guestDetails,
        checkIn: searchData.checkIn ? format(searchData.checkIn, "yyyy-MM-dd") : "",
        checkOut: searchData.checkOut ? format(searchData.checkOut, "yyyy-MM-dd") : "",
        nights,
        rooms: selectedRooms.map((r) => ({
          type: r.roomType,
          boardBasis: r.boardBasis,
          price: r.price,
        })),
        addOns,
        totalAmount: totalForDocs,
        finalAmount: calculateFinalAmount(),
        paymentMode: paymentData.paymentMode,
        bookingDate: new Date().toISOString(),
        specialRequests: guestDetails.specialRequests || undefined,
        pricingBreakdown: {
          baseFare: breakdown.baseFare,
          taxes: breakdown.taxes,
          markup: agentMarkupAmount,
          markupPercent: breakdown.markupPercent,
        },
      }, { 
        showMarkup: includeAgentMarkup && agentMarkupAmount > 0,
        hidePrices: hidePrices,
      })
      
      const description = hidePrices 
        ? "Your hotel voucher has been downloaded without any pricing information."
        : includeAgentMarkup 
          ? "Your hotel voucher has been downloaded with convenience fees."
          : "Your hotel voucher has been downloaded without convenience fees."
      
      toast.success("Voucher downloaded", { description })
    })
  }

  // Handle stage progression
  const handleNextStage = async () => {
    let canProceed = false

    switch (currentStage) {
      case 0:
        canProceed = validateSearch()
        break
      case 1:
        canProceed = validateHotelSelection()
        break
      case 2:
        canProceed = validateRoomSelection()
        break
      case 3:
        canProceed = validateGuestDetails()
        break
      case 4:
        canProceed = validatePayment()
        if (canProceed && paymentData.paymentMode === "Prepay via Wallet") {
          // Start payment timeout (15 minutes)
          setPaymentTimeout(15 * 60)
        }
        break
    }

    if (!canProceed) return

    // Lock previous stage and move to next
    const nextStage = Math.min(currentStage + 1, BOOKING_STAGES.length - 1)
    setCurrentStage(nextStage)

    // Handle booking confirmation
    if (nextStage === 5 && selectedHotel) {
      await confirmBooking()
    }
  }

  // Confirm booking
  const confirmBooking = async () => {
    try {
      if (!searchData.checkIn || !searchData.checkOut || !selectedHotel) return

      const nights = Math.ceil(
        (searchData.checkOut.getTime() - searchData.checkIn.getTime()) / (1000 * 60 * 60 * 24),
      )

      const totalAmount = calculateTotalAmount()
      const breakdown = calculatePricingWithMarkup(totalAmount)
      const finalAmount = calculateFinalAmount()

      // Policy compliance check
      const policyCheck = checkHotelPolicyCompliance(
        selectedHotel.pricePerNight,
        selectedHotel.location,
        selectedHotel.rating,
        searchData.checkIn,
      )

      // Generate booking ID and voucher number
      const newBookingId = generateHotelBookingId()
      const newVoucherNumber = generateHotelVoucherNumber()
      setBookingId(newBookingId)
      setVoucherNumber(newVoucherNumber)

      const booking = await bookingsDB.create({
        type: "HOTEL",
        status: policyCheck.requiresApproval ? "PENDING_APPROVAL" : "CONFIRMED",
        details: {
          ...selectedHotel,
          checkIn: format(searchData.checkIn, "yyyy-MM-dd"),
          checkOut: format(searchData.checkOut, "yyyy-MM-dd"),
          nights,
          selectedRooms,
          guestDetails,
          addOns,
          paymentData,
          totalAmount,
          finalAmount,
          voucherNumber: newVoucherNumber,
          policyCompliant: policyCheck.compliant,
          policyViolations: policyCheck.violations,
          isInternational,
          occupantPassports: isInternational ? occupantPassports : undefined,
          markup: {
            applied: markupControls.applyMarkup,
            superAdminMarkup: breakdown.superAdminMarkup ?? 0,
            agentMarkup: markupControls.applyMarkup ? markupControls.agentMarkup : 0,
            totalMarkup: breakdown.markup,
            showOnDocs: markupControls.applyMarkup, // Always show convenience fees on docs when markup is applied
          },
        },
        date: format(searchData.checkIn, "yyyy-MM-dd"),
        amount: finalAmount,
        agentName: currentUser.name,
        agentId: currentUser.id,
        approvalStatus: policyCheck.requiresApproval ? "PENDING" : "APPROVED",
      })

      // Create transaction if prepaid
      if (paymentData.paymentMode === "Prepay via Wallet" || paymentData.walletUsage) {
        const walletUsed = paymentData.walletUsage ? paymentData.walletAmount : finalAmount
        await createTransaction({
          date: new Date().toISOString().split("T")[0],
          description: `Hotel Booking ${booking.bookingId}`,
          amount: -walletUsed,
          type: "DEBIT",
          status: "Completed",
          paymentMethod: "Wallet",
          productType: "Hotel",
          bookingId: booking.id,
        })
      }

      await audit.create("bookings", booking.id, { type: "HOTEL", amount: finalAmount })

      if (policyCheck.requiresApproval) {
        toast.warning("Booking created but requires approval", {
          description: `Booking ID: ${booking.bookingId}. Policy violations detected.`,
        })
      } else {
        toast.success("Booking confirmed!", {
          description: `Booking ID: ${booking.bookingId}, Voucher: ${newVoucherNumber}`,
        })
      }
    } catch (error) {
      console.error("Failed to save booking:", error)
      toast.error("Booking confirmed but failed to save details")
    }
  }

  // Payment timeout effect
  useEffect(() => {
    if (paymentTimeout !== null && paymentTimeout > 0) {
      const timer = setInterval(() => {
        setPaymentTimeout((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer)
            toast.error("Payment timeout. Please restart the booking process.")
            return null
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [paymentTimeout])


  if (isSuperAdmin) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <Alert>
            <AlertTitle className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Booking access restricted
            </AlertTitle>
            <AlertDescription>
              Super Admins oversee agencies and cannot initiate hotel bookings from this workspace.
              Switch to an agency-facing role to access hotel search and booking flows.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Hotel Booking
        </h1>
        <p className="text-lg text-muted-foreground">Find comfortable and compliant stays for your business trip.</p>
      </div>

      {/* Progress Indicator - Only show when hotel is selected */}
      {selectedHotel && (
        <div className="w-full overflow-x-auto pb-4">
          <div className="flex items-center min-w-max gap-2">
            {BOOKING_STAGES.map((stage, index) => (
            <div key={stage.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all duration-200 shadow-sm",
                  index === currentStage
                    ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                    : index < currentStage
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-background text-muted-foreground border-border",
                )}
              >
                {index < currentStage ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-xs", index === currentStage && "bg-primary-foreground/20")}>
                    {index + 1}
                  </span>
                )}
                {stage.label}
              </div>
              {index < BOOKING_STAGES.length - 1 && (
                <div className={cn("w-12 h-0.5 mx-2 transition-colors", index < currentStage ? "bg-primary" : "bg-border")} />
              )}
            </div>
          ))}
          </div>
        </div>
      )}

      {/* Stage 1: Search - Only show when no hotel is selected */}
      {!selectedHotel && (
        <Card
          className={cn(
            "border-2 shadow-lg transition-all duration-300 bg-gradient-to-br from-background via-background to-primary/5",
            currentStage !== 0 && "opacity-50 pointer-events-none grayscale",
          )}
        >
        <CardHeader>
          <div className="flex items-center gap-2">
            {currentStage > 0 && <Lock className="w-5 h-5 text-muted-foreground" />}
            <CardTitle className="text-2xl font-bold">Search Criteria</CardTitle>
          </div>
          <CardDescription className="text-base">Enter your hotel search requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2">
            <Label>Booking Type</Label>
            <ToggleGroup 
              type="single" 
              value={isInternational ? "international" : "national"} 
              onValueChange={(value) => {
                if (value === "international" || value === "national") {
                  setIsInternational(value === "international")
                }
              }} 
              className="border-2"
            >
              <ToggleGroupItem 
                value="national" 
                aria-label="National" 
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <MapPin className="mr-2 h-4 w-4" />
                National
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="international" 
                aria-label="International" 
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <Globe className="mr-2 h-4 w-4" />
                International
              </ToggleGroupItem>
            </ToggleGroup>
            <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border bg-muted/60 px-4 py-2.5 text-sm">
              <Badge variant="secondary" className="uppercase tracking-wide">
                {isInternational ? "International Booking" : "National Booking"}
              </Badge>
              <span className="text-muted-foreground">
                {isInternational
                  ? "Passport details required for all occupants."
                  : "Standard booking process for domestic hotels."}
              </span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="location">
                Location <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !searchData.location && "text-muted-foreground",
                      errors.location && "border-red-500",
                    )}
                  >
                    <MapPin className="mr-2 h-4 w-4 shrink-0" />
                    {searchData.location
                      ? ALL_CITIES.find((city) => city.value === searchData.location)?.label || searchData.location
                      : "Search city..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search cities..." />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup heading={isInternational ? "International Cities" : "National Cities"}>
                        {getCitiesByType(isInternational ? "international" : "national").map((city) => (
                          <CommandItem
                            key={city.value}
                            value={`${city.label} ${city.country}`}
                            onSelect={() => {
                              setSearchData({ ...searchData, location: city.value })
                            }}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{city.label}</span>
                            <span className="ml-auto text-xs text-muted-foreground">{city.country}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkIn">
                Check-in Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !searchData.checkIn && "text-muted-foreground",
                      errors.checkIn && "border-red-500",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {searchData.checkIn ? format(searchData.checkIn, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={searchData.checkIn}
                    onSelect={(date) => setSearchData({ ...searchData, checkIn: date })}
                    disabled={(date) => isBefore(date, new Date()) && !isToday(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.checkIn && <p className="text-xs text-red-500">{errors.checkIn}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut">
                Check-out Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !searchData.checkOut && "text-muted-foreground",
                      errors.checkOut && "border-red-500",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {searchData.checkOut ? format(searchData.checkOut, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={searchData.checkOut}
                    onSelect={(date) => setSearchData({ ...searchData, checkOut: date })}
                    disabled={(date) => {
                      if (!searchData.checkIn) {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        const checkOut = new Date(date)
                        checkOut.setHours(0, 0, 0, 0)
                        return isBefore(checkOut, today) && !isToday(date)
                      }
                      const checkIn = new Date(searchData.checkIn)
                      checkIn.setHours(0, 0, 0, 0)
                      const checkOut = new Date(date)
                      checkOut.setHours(0, 0, 0, 0)
                      // Check-out must be strictly after check-in
                      return !isAfter(checkOut, checkIn)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.checkOut && <p className="text-xs text-red-500">{errors.checkOut}</p>}
            </div>

            <div className="space-y-2">
              <Label>Rooms & Guests</Label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="rooms" className="text-xs">
                    Rooms
                  </Label>
                  <Input
                    id="rooms"
                    type="number"
                    min="1"
                    value={searchData.rooms}
                    onChange={(e) => setSearchData({ ...searchData, rooms: parseInt(e.target.value) || 1 })}
                    className={cn(errors.rooms && "border-red-500")}
                  />
                </div>
                <div>
                  <Label htmlFor="adults" className="text-xs">
                    Adults
                  </Label>
                  <Input
                    id="adults"
                    type="number"
                    min="1"
                    value={searchData.adults}
                    onChange={(e) => setSearchData({ ...searchData, adults: parseInt(e.target.value) || 1 })}
                    className={cn(errors.adults && "border-red-500")}
                  />
                </div>
                <div>
                  <Label htmlFor="children" className="text-xs">
                    Children
                  </Label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    value={searchData.children}
                    onChange={(e) => setSearchData({ ...searchData, children: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              {(errors.rooms || errors.adults || errors.guests) && (
                <p className="text-xs text-red-500">{errors.rooms || errors.adults || errors.guests}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Stay</Label>
              <Select
                value={searchData.purposeOfStay}
                onValueChange={(value: "Business" | "Leisure") =>
                  setSearchData({ ...searchData, purposeOfStay: value })
                }
              >
                <SelectTrigger id="purpose">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Leisure">Leisure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="starRating">Star Rating (Optional)</Label>
              <Select
                value={searchData.starRating?.toString() || ""}
                onValueChange={(value) =>
                  setSearchData({ ...searchData, starRating: value ? parseInt(value) : undefined })
                }
              >
                <SelectTrigger id="starRating">
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {currentStage === 0 && (
            <div className="flex justify-end mt-6">
              <Button 
                size="lg" 
                onClick={handleSearch}
                className="min-w-[180px] bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-base h-12"
              >
                <Search className="mr-2 h-5 w-5" />
                Search Hotels
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      )}

      {/* Selected Hotel Summary */}
      {currentStage > 1 && selectedHotel && (
        <Card className="opacity-50 pointer-events-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{selectedHotel.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedHotel.location}</p>
                </div>
              </div>
              <Badge variant="outline">Selected</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stage 3: Room Selection */}
      {currentStage === 2 && selectedHotel && (
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Room Selection</CardTitle>
            <CardDescription className="text-base">Select room type and board basis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedHotel.rooms?.map((room) => {
                const selectedRoom = selectedRooms.find((r) => r.roomId === room.id)
                return (
                  <Card key={room.id} className={cn("border-2 transition-all hover:shadow-md", !room.available && "opacity-50")}>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{room.type}</h4>
                            {!room.available && (
                              <Badge variant="destructive" className="text-xs">
                                Sold Out
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{room.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              Max {room.maxOccupancy} guests
                            </div>
                            <div className="flex items-center gap-1">
                              <Bed className="h-4 w-4" />
                              {room.type}
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-medium">Inclusions:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {room.inclusions.map((inc, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {inc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-medium">Cancellation Policy:</p>
                            <p className="text-xs text-muted-foreground">{room.cancellationPolicy}</p>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-2xl font-bold">
                            {selectedHotel.currency} {room.pricePerNight}
                          </p>
                          <p className="text-xs text-muted-foreground">per night</p>
                        </div>
                      </div>

                      {room.available && (
                        <div className="mt-4 space-y-2">
                          <Label>Board Basis <span className="text-red-500">*</span></Label>
                          <RadioGroup
                            value={selectedRoom?.boardBasis || ""}
                            onValueChange={(value) => handleRoomSelect(room, value)}
                          >
                            {room.boardBasis.map((bb) => (
                              <div key={bb.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={bb.id} id={`${room.id}-${bb.id}`} />
                                <Label
                                  htmlFor={`${room.id}-${bb.id}`}
                                  className="flex-1 cursor-pointer flex items-center justify-between"
                                >
                                  <span>{bb.name}</span>
                                  {bb.price > 0 && (
                                    <span className="text-sm text-muted-foreground">+{bb.price}/night</span>
                                  )}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          {errors[`boardBasis_${selectedRooms.findIndex((r) => r.roomId === room.id)}`] && (
                            <p className="text-xs text-red-500">
                              {errors[`boardBasis_${selectedRooms.findIndex((r) => r.roomId === room.id)}`]}
                            </p>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}

              {errors.rooms && <p className="text-xs text-red-500">{errors.rooms}</p>}
              {errors.occupancy && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.occupancy}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end mt-6">
                <Button onClick={handleNextStage} disabled={selectedRooms.length === 0} size="lg" className="min-w-[200px] font-semibold">
                  Continue to Guest Details <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stage 4: Guest Details + Add-ons */}
      {currentStage === 3 && selectedHotel && (
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Guest Details + Add-ons</CardTitle>
            <CardDescription className="text-base">Enter guest information and select add-ons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guestName">
                  Primary Guest Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="guestName"
                  value={guestDetails.name}
                  onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                  className={cn(errors.name && "border-red-500")}
                  placeholder="Alphabets only"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobile"
                  value={guestDetails.mobile}
                  onChange={(e) => setGuestDetails({ ...guestDetails, mobile: e.target.value })}
                  className={cn(errors.mobile && "border-red-500")}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                />
                {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkInDisplay">Check-in Date</Label>
                <Input
                  id="checkInDisplay"
                  value={searchData.checkIn ? format(searchData.checkIn, "PPP") : ""}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkOutDisplay">Check-out Date</Label>
                <Input
                  id="checkOutDisplay"
                  value={searchData.checkOut ? format(searchData.checkOut, "PPP") : ""}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfGuests">Number of Guests</Label>
                <Input
                  id="numberOfGuests"
                  value={`${searchData.adults} Adult${searchData.adults !== 1 ? "s" : ""}${
                    searchData.children > 0 ? `, ${searchData.children} Child${searchData.children !== 1 ? "ren" : ""}` : ""
                  }`}
                  disabled
                  className="bg-muted"
                />
              </div>

              {selectedHotel.requiresNationality && (
                <div className="space-y-2">
                  <Label htmlFor="nationality">
                    Nationality <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nationality"
                    value={guestDetails.nationality}
                    onChange={(e) => setGuestDetails({ ...guestDetails, nationality: e.target.value })}
                    className={cn(errors.nationality && "border-red-500")}
                  />
                  {errors.nationality && <p className="text-xs text-red-500">{errors.nationality}</p>}
                </div>
              )}

              {searchData.purposeOfStay === "Business" && selectedHotel.requiresGST && (
                <div className="space-y-2">
                  <Label htmlFor="gstin">
                    GSTIN <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="gstin"
                    value={guestDetails.gstin}
                    onChange={(e) => setGuestDetails({ ...guestDetails, gstin: e.target.value.toUpperCase() })}
                    className={cn(errors.gstin && "border-red-500")}
                    placeholder="15-character GSTIN"
                    maxLength={15}
                  />
                  {errors.gstin && <p className="text-xs text-red-500">{errors.gstin}</p>}
                </div>
              )}

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                <Textarea
                  id="specialRequests"
                  value={guestDetails.specialRequests}
                  onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                  placeholder="Twin beds, accessibility requirements, etc."
                  rows={3}
                />
              </div>
            </div>

            {/* Passport details for international bookings */}
            {isInternational && (
              <>
                <Separator />
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Passport Details for All Occupants</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Please provide passport details for each person staying at the hotel (adults and children).
                    </p>
                  </div>
                  <div className="space-y-6">
                    {Array.from({ length: searchData.adults + searchData.children }).map((_, index) => {
                      const occupantType = index < searchData.adults ? "Adult" : "Child"
                      const occupantNumber = index < searchData.adults 
                        ? index + 1 
                        : index - searchData.adults + 1
                      const passport = occupantPassports[index] || { name: "", passport: "", passportExpiry: "" }
                      
                      return (
                        <Card key={index} className="border-2">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">
                              {occupantType} {occupantNumber} Passport Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`passport_name_${index}`}>
                                  Full Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                  id={`passport_name_${index}`}
                                  value={passport.name}
                                  onChange={(e) => {
                                    const updated = [...occupantPassports]
                                    updated[index] = { ...passport, name: e.target.value }
                                    setOccupantPassports(updated)
                                  }}
                                  className={cn(errors[`passport_name_${index}`] && "border-red-500")}
                                  placeholder="As per passport"
                                />
                                {errors[`passport_name_${index}`] && (
                                  <p className="text-xs text-red-500">{errors[`passport_name_${index}`]}</p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`passport_${index}`}>
                                  Passport Number <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                  id={`passport_${index}`}
                                  value={passport.passport}
                                  onChange={(e) => {
                                    const updated = [...occupantPassports]
                                    updated[index] = { ...passport, passport: e.target.value.toUpperCase() }
                                    setOccupantPassports(updated)
                                  }}
                                  placeholder="A1234567"
                                  maxLength={8}
                                  className={cn(errors[`passport_${index}`] && "border-red-500")}
                                />
                                {errors[`passport_${index}`] && (
                                  <p className="text-xs text-red-500">{errors[`passport_${index}`]}</p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                  Format: 1 letter followed by 7 digits (e.g., A1234567)
                                </p>
                              </div>

                              <div className="space-y-2 md:col-span-2">
                                <Label htmlFor={`passport_expiry_${index}`}>
                                  Passport Expiry Date <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                  id={`passport_expiry_${index}`}
                                  type="date"
                                  value={passport.passportExpiry}
                                  onChange={(e) => {
                                    const updated = [...occupantPassports]
                                    updated[index] = { ...passport, passportExpiry: e.target.value }
                                    setOccupantPassports(updated)
                                  }}
                                  className={cn(errors[`passport_expiry_${index}`] && "border-red-500")}
                                />
                                {errors[`passport_expiry_${index}`] && (
                                  <p className="text-xs text-red-500">{errors[`passport_expiry_${index}`]}</p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </>
            )}

            <Separator />

            <div>
              <h4 className="font-semibold mb-4">Add-ons (Optional)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="extraBed"
                    checked={addOns.extraBed}
                    onCheckedChange={(checked) => setAddOns({ ...addOns, extraBed: checked as boolean })}
                  />
                  <Label htmlFor="extraBed" className="flex-1 cursor-pointer">
                    Extra Bed - ₹2,000/night
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="airportTransfer"
                    checked={addOns.airportTransfer}
                    onCheckedChange={(checked) =>
                      setAddOns({ ...addOns, airportTransfer: checked as boolean })
                    }
                  />
                  <Label htmlFor="airportTransfer" className="flex-1 cursor-pointer">
                    Airport Transfer - ₹1,500
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="meals"
                    checked={addOns.meals}
                    onCheckedChange={(checked) => setAddOns({ ...addOns, meals: checked as boolean })}
                  />
                  <Label htmlFor="meals" className="flex-1 cursor-pointer">
                    Additional Meals - ₹1,000/night
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="insurance"
                    checked={addOns.insurance}
                    onCheckedChange={(checked) => setAddOns({ ...addOns, insurance: checked as boolean })}
                  />
                  <Label htmlFor="insurance" className="flex-1 cursor-pointer">
                    Travel Insurance - ₹500
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptPolicies"
                checked={guestDetails.acceptPolicies}
                onCheckedChange={(checked) =>
                  setGuestDetails({ ...guestDetails, acceptPolicies: checked as boolean })
                }
                className={cn(errors.acceptPolicies && "border-red-500")}
              />
              <Label htmlFor="acceptPolicies" className="flex-1 cursor-pointer">
                I accept the hotel policies and terms & conditions <span className="text-red-500">*</span>
              </Label>
            </div>
            {errors.acceptPolicies && <p className="text-xs text-red-500">{errors.acceptPolicies}</p>}

            <div className="flex justify-end pt-2">
              <Button onClick={handleNextStage} size="lg" className="min-w-[200px] font-semibold">
                Continue to Payment <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stage 5: Payment */}
      {currentStage === 4 && selectedHotel && (
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Payment</CardTitle>
            <CardDescription className="text-base">Select payment method and review fare breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {paymentTimeout !== null && paymentTimeout > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Payment timeout: {Math.floor(paymentTimeout / 60)}:{(paymentTimeout % 60)
                    .toString()
                    .padStart(2, "0")}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="paymentMode">
                Payment Mode <span className="text-red-500">*</span>
              </Label>
              <Select
                value={paymentData.paymentMode}
                onValueChange={(value: "Pay at Property" | "Prepay via Wallet" | "Prepay via Card") =>
                  setPaymentData({ ...paymentData, paymentMode: value })
                }
              >
                <SelectTrigger id="paymentMode" className={cn(errors.paymentMode && "border-red-500")}>
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pay at Property">Pay at Property</SelectItem>
                  <SelectItem value="Prepay via Wallet">Prepay via Wallet</SelectItem>
                  <SelectItem value="Prepay via Card">Prepay via Card</SelectItem>
                </SelectContent>
              </Select>
              {errors.paymentMode && <p className="text-xs text-red-500">{errors.paymentMode}</p>}
            </div>

            {(paymentData.paymentMode === "Prepay via Wallet" || paymentData.paymentMode === "Prepay via Card") && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="couponCode">Coupon/Corporate Deal Code (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="couponCode"
                      value={paymentData.couponCode}
                      onChange={(e) => setPaymentData({ ...paymentData, couponCode: e.target.value })}
                      placeholder="Enter coupon code"
                    />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>

                {paymentData.paymentMode === "Prepay via Wallet" && (
                  <div className="space-y-2">
                    <Label htmlFor="walletAmount">Use Wallet Balance (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="walletUsage"
                        checked={paymentData.walletUsage}
                        onCheckedChange={(checked) =>
                          setPaymentData({ ...paymentData, walletUsage: checked as boolean })
                        }
                      />
                      <Label htmlFor="walletUsage" className="cursor-pointer">
                        Use wallet balance: ₹{getWalletBalance().toLocaleString("en-IN")}
                      </Label>
                    </div>
                    {paymentData.walletUsage && (
                      <Input
                        id="walletAmount"
                        type="number"
                        value={paymentData.walletAmount}
                        onChange={(e) =>
                          setPaymentData({ ...paymentData, walletAmount: parseFloat(e.target.value) || 0 })
                        }
                        max={calculateTotalAmount()}
                        min={0}
                      />
                    )}
                    {errors.wallet && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.wallet}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 border rounded-lg p-4 bg-muted/40">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="hotelApplyMarkup"
                    checked={markupControls.applyMarkup}
                    onCheckedChange={(checked) =>
                      setMarkupControls((prev) => ({ ...prev, applyMarkup: checked as boolean }))
                    }
                  />
                  <div>
                    <Label htmlFor="hotelApplyMarkup" className="font-semibold">
                      Add convenience fees before final confirmation
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Convenience fees for booking
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {isSuperAdmin && (
                    <div className="space-y-1">
                      <Label>Super Admin markup (₹)</Label>
                      <Input value={resolvedMarkup.superAdminMarkup} readOnly />
                    </div>
                  )}
                  <div className="space-y-1">
                    <Label>Convenience fees (₹)</Label>
                    <Input
                      type="number"
                      value={markupControls.agentMarkup}
                      onChange={(e) =>
                        setMarkupControls((prev) => ({
                          ...prev,
                          agentMarkup: Math.max(0, parseFloat(e.target.value) || 0),
                        }))
                      }
                      disabled={!markupControls.applyMarkup || !resolvedMarkup.allowAgentOverride}
                      min={0}
                    />
                    {!resolvedMarkup.allowAgentOverride && (
                      <p className="text-xs text-muted-foreground">Locked by Agent Admin</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1 rounded-md border bg-card p-3">
                {(() => {
                  const baseAmount = calculateTotalAmount()
                  const breakdown = calculatePricingWithMarkup(baseAmount)
                  // breakdown.baseFare already includes super admin markup
                  const convenienceFees = markupControls.applyMarkup ? breakdown.markup : 0
                  return (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Base fare</span>
                        <span className="font-semibold">₹{breakdown.baseFare.toLocaleString("en-IN")}</span>
                      </div>
                      {breakdown.taxes > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Taxes & Fees</span>
                          <span className="font-semibold">₹{breakdown.taxes.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      {convenienceFees > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Convenience fees</span>
                          <span className="font-semibold text-primary">
                            ₹{convenienceFees.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}
                      <Separator className="my-1" />
                      <div className="flex justify-between font-bold">
                        <span>Customer payable (pre-discount)</span>
                        <span>₹{breakdown.totalAmount.toLocaleString("en-IN")}</span>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-4">Fare Breakdown</h4>
              <div className="space-y-2">
                {(() => {
                  const baseAmount = calculateTotalAmount()
                  const breakdown = calculatePricingWithMarkup(baseAmount)
                  const showMarkup = markupControls.applyMarkup && getMarkupVisibility() && breakdown.markup > 0
                  
                  return (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Fare</span>
                        <span>₹{breakdown.baseFare.toLocaleString("en-IN")}</span>
                      </div>
                      {breakdown.taxes > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Taxes & Fees</span>
                          <span>₹{breakdown.taxes.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      {showMarkup && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Convenience fees</span>
                          <span>₹{breakdown.markup.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      {paymentData.couponCode && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount (Coupon)</span>
                          <span>-₹{(breakdown.totalAmount * 0.1).toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      {paymentData.walletUsage && paymentData.walletAmount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Wallet Payment</span>
                          <span>-₹{paymentData.walletAmount.toLocaleString("en-IN")}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Final Amount</span>
                        <span>₹{Math.max(0, calculateFinalAmount()).toLocaleString("en-IN")}</span>
                      </div>
                      {errors.finalAmount && <p className="text-xs text-red-500">{errors.finalAmount}</p>}
                    </>
                  )
                })()}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleNextStage} size="lg" className="min-w-[200px] bg-green-600 hover:bg-green-700 font-semibold shadow-lg hover:shadow-xl transition-all">
                Pay & Confirm
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stage 6: Confirmation */}
      {currentStage === 5 && (
        <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-green-100/50 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-green-800 mb-3">Booking Confirmed!</h2>
            <p className="text-lg text-green-700 mb-8 font-medium">Your hotel stay has been successfully reserved.</p>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 text-left max-w-md mx-auto border-2 border-green-200 shadow-lg">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-bold text-base">Booking ID:</span>
                  <span className="font-mono text-xl font-bold text-primary">{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-base">Voucher Number:</span>
                  <span className="font-mono text-xl font-bold text-primary">{voucherNumber}</span>
                </div>
                {selectedHotel && (
                  <>
                    <div className="flex justify-between">
                      <span className="font-medium">Hotel:</span>
                      <span>{selectedHotel.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Location:</span>
                      <span>{selectedHotel.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (selectedHotel && bookingId && voucherNumber && searchData.checkIn && searchData.checkOut) {
                    setDownloadDialogOpen(true)
                  } else {
                    toast.error("Voucher data not available")
                  }
                }}
              >
                Download Voucher (PDF)
              </Button>
              
              <Dialog 
                open={downloadDialogOpen} 
                onOpenChange={(open) => {
                  setDownloadDialogOpen(open)
                  if (!open) {
                    setSelectedDownloadOption(null)
                  }
                }}
              >
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Download Voucher</DialogTitle>
                    <DialogDescription>
                      Choose how you want to download the voucher
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 py-4">
                    <div
                      className={cn(
                        "flex items-start space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all",
                        selectedDownloadOption === "without-markup" 
                          ? "border-primary bg-primary/5" 
                          : "hover:border-primary hover:bg-primary/5"
                      )}
                      onClick={() => setSelectedDownloadOption("without-markup")}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                            {selectedDownloadOption === "without-markup" && (
                              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <Label className="text-base font-semibold cursor-pointer">
                            Without Convenience Fees
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground ml-7">
                          Shows base fare and taxes only. Convenience fees are excluded.
                        </p>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "flex items-start space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all",
                        selectedDownloadOption === "with-markup" 
                          ? "border-primary bg-primary/5" 
                          : "hover:border-primary hover:bg-primary/5"
                      )}
                      onClick={() => setSelectedDownloadOption("with-markup")}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                            {selectedDownloadOption === "with-markup" && (
                              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <Label className="text-base font-semibold cursor-pointer">
                            With Convenience Fees
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground ml-7">
                          Includes all pricing details including convenience fees.
                        </p>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "flex items-start space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all",
                        selectedDownloadOption === "no-prices" 
                          ? "border-primary bg-primary/5" 
                          : "hover:border-primary hover:bg-primary/5"
                      )}
                      onClick={() => setSelectedDownloadOption("no-prices")}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                            {selectedDownloadOption === "no-prices" && (
                              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <Label className="text-base font-semibold cursor-pointer">
                            Without Any Prices
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground ml-7">
                          Shows booking details only. No pricing information included.
                        </p>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setDownloadDialogOpen(false)
                        setSelectedDownloadOption(null)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (selectedDownloadOption) {
                          setDownloadDialogOpen(false)
                          handleDownloadVoucher(selectedDownloadOption)
                          setSelectedDownloadOption(null)
                        }
                      }}
                      disabled={!selectedDownloadOption}
                    >
                      Download
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button onClick={() => (window.location.href = "/dashboard")}>Return to Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

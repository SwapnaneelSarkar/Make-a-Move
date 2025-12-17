"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { FlightSearch } from "@/components/booking/flight-search"
import { FlightCard } from "@/components/booking/flight-card"
import { MOCK_FLIGHTS, type Flight } from "@/lib/mock-data"
import { CheckCircle2, Lock, ChevronRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { toast } from "sonner"
import {
  FLIGHT_STAGES,
  transitionStage,
  canTransitionStage,
  validateMandatoryFields,
  type FlightStage,
} from "@/lib/stage-management"
import { bookingsDB, transactionsDB } from "@/lib/local-db"
import { audit } from "@/lib/audit-utils"
import { checkFlightPolicyCompliance, generateBookingId, generatePNR } from "@/lib/policy-utils"
import { downloadTicket, type TicketData } from "@/lib/ticket-generator"
import { hasSufficientBalance, getWalletBalance, createTransaction } from "@/lib/wallet-utils"
import { calculatePricingBreakdown, type PricingBreakdown } from "@/lib/pricing-utils"
import { loadMarkupPreferences, resolveAgentMarkup } from "@/lib/markup-settings"
import { getMarkupVisibility } from "@/lib/utils"
import { getAgentAccess, type AgentAccessMatrix } from "@/lib/agent-access"

// Fallback flight generator (kept in sync with listing page)
const CITY_LOOKUP: Record<string, string> = {
  DEL: "New Delhi",
  BOM: "Mumbai",
  BLR: "Bangalore",
  MAA: "Chennai",
  CCU: "Kolkata",
  HYD: "Hyderabad",
  DXB: "Dubai",
  LHR: "London Heathrow",
  SIN: "Singapore",
  JFK: "New York",
  FRA: "Frankfurt",
  SYD: "Sydney",
}

const buildDateTime = (dateString: string | null, hourOffset: number) => {
  const base = dateString ? new Date(dateString) : new Date()
  const safeBase = isNaN(base.getTime()) ? new Date() : base
  const adjusted = new Date(safeBase)
  adjusted.setHours(adjusted.getHours() + hourOffset)
  return adjusted.toISOString()
}

const generateFallbackFlights = (
  originCode: string,
  destinationCode: string,
  isInternational: boolean,
  departureDate: string,
) => {
  const from = originCode || (isInternational ? "DEL" : "DEL")
  const to = destinationCode || (isInternational ? "DXB" : "BOM")
  const type: Flight["type"] = isInternational ? "INTERNATIONAL" : "DOMESTIC"
  const basePrice = isInternational ? 34000 : 12500

  return [
    {
      id: `test-${from}-${to}-1`,
      airline: isInternational ? "Test Global Air" : "Test Domestic Air",
      airlineLogo: "/placeholder-logo.svg",
      flightNumber: `${isInternational ? "TG" : "TD"}-${from}${to}-101`,
      departure: { code: from, city: CITY_LOOKUP[from] || from, time: buildDateTime(departureDate, 24) },
      arrival: { code: to, city: CITY_LOOKUP[to] || to, time: buildDateTime(departureDate, 27) },
      duration: "3h 00m",
      price: basePrice,
      currency: "INR",
      policyCompliant: true,
      stops: 0,
      type,
      baggage: "20kg",
    },
    {
      id: `test-${from}-${to}-2`,
      airline: isInternational ? "Aero Sandbox" : "Metro Shuttle",
      airlineLogo: "/placeholder-logo.svg",
      flightNumber: `${isInternational ? "AS" : "MS"}-${from}${to}-205`,
      departure: { code: from, city: CITY_LOOKUP[from] || from, time: buildDateTime(departureDate, 30) },
      arrival: { code: to, city: CITY_LOOKUP[to] || to, time: buildDateTime(departureDate, 34) },
      duration: "4h 00m",
      price: basePrice + 1800,
      currency: "INR",
      policyCompliant: true,
      stops: 1,
      type,
      baggage: "15kg",
    },
    {
      id: `test-${from}-${to}-3`,
      airline: isInternational ? "Sandbox Connect" : "Corporate Wings",
      airlineLogo: "/placeholder-logo.svg",
      flightNumber: `${isInternational ? "SC" : "CW"}-${from}${to}-309`,
      departure: { code: from, city: CITY_LOOKUP[from] || from, time: buildDateTime(departureDate, 36) },
      arrival: { code: to, city: CITY_LOOKUP[to] || to, time: buildDateTime(departureDate, 39) },
      duration: "3h 30m",
      price: basePrice + 3200,
      currency: "INR",
      policyCompliant: false,
      stops: 0,
      type,
      baggage: "30kg",
    },
  ]
}

const BOOKING_STAGES = [
  { id: "Search", label: "Search" },
  { id: "Listing", label: "Listing" },
  { id: "Fare Review", label: "Fare Review" },
  { id: "Passenger Details", label: "Passenger Details" },
  { id: "Seat Selection", label: "Seat Selection" },
  { id: "Ancillaries", label: "Ancillaries" },
  { id: "Payment Pending", label: "Payment Pending" },
  { id: "Booking Confirmed", label: "Booking Confirmed" },
]

export default function FlightsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentUser } = useAppStore()
  const isSuperAdmin = currentUser.role === "SUPER_ADMIN"
  const [agentAccess, setAgentAccess] = useState<AgentAccessMatrix>(() =>
    getAgentAccess(currentUser.id, currentUser.role),
  )
  const canViewFlights = agentAccess.flights.view
  const canBookFlights = agentAccess.flights.book
  const canUseWallet = agentAccess.wallet.debit
  const canViewWallet = agentAccess.wallet.view
  const canEditMarkups = agentAccess.markups.edit
  const canViewMarkups = agentAccess.markups.view
  
  // Check if we're coming from listing page with a selected flight
  const selectedFlightId = searchParams.get("selectedFlight")

  useEffect(() => {
    setAgentAccess(getAgentAccess(currentUser.id, currentUser.role))
  }, [currentUser.id, currentUser.role])
  
  const [currentStage, setCurrentStage] = useState<FlightStage>("Search")
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [bookingId, setBookingId] = useState<string>(generateBookingId())
  const [pnr, setPnr] = useState<string>("")

  // Search State
  const [searchData, setSearchData] = useState({
    tripType: "one-way",
    origin: "",
    destination: "",
    departureDate: null as Date | null,
    returnDate: null as Date | null,
    travellers: "1",
    class: "Economy",
    specialFare: "Regular",
  })
  const [isInternational, setIsInternational] = useState(false)
  const [searchErrors, setSearchErrors] = useState<Record<string, string>>({})

  // Store listing data to persist it across transitions
  const [listingData, setListingData] = useState<Record<string, any> | null>(null)
  const [fareAccepted, setFareAccepted] = useState(false)
  const [policyCheckResult, setPolicyCheckResult] = useState<{
    compliant: boolean
    violations: string[]
    requiresApproval: boolean
  } | null>(null)

  // Passenger count state
  const [passengerCount, setPassengerCount] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  })

  // Passenger Details State - now supports multiple passengers
  const [passengerDetails, setPassengerDetails] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    gst: "",
    passport: "",
    passportExpiry: "",
  })

  // Ancillaries State
  const [ancillaries, setAncillaries] = useState({
    extraBaggage: false,
    extraBaggagePrice: 1500,
    mealSelection: false,
    mealPrice: 1200,
    seatSelection: false,
    seatPrice: 0,
  })
  const [seatSelections, setSeatSelections] = useState<string[]>([])
  const seatPricePerSeat = 800

  // Payment State
  const [paymentData, setPaymentData] = useState({
    paymentMethod: "",
    payableAmount: 0,
    walletUsage: false,
    acceptTerms: false,
  })
  const [markupControls, setMarkupControls] = useState({
    applyMarkup: true, // agent markup applied to totals
    agentMarkup: 500,
    includeAgentMarkupInDocs: true, // agent markup visibility + amount on documents
  })
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false)
  const [resolvedMarkup, setResolvedMarkup] = useState(() =>
    resolveAgentMarkup(currentUser.id, currentUser.role)
  )
  const allowAgentMarkupEdit =
    canEditMarkups ||
    (resolvedMarkup.allowAgentOverride &&
      (currentUser.role === "AGENT" || currentUser.role === "SUB_AGENT" || currentUser.role === "AGENCY_ADMIN"))
  const [paymentTimeout, setPaymentTimeout] = useState<number | null>(null)
  const paymentTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fareReviewStartTimeRef = useRef<number | null>(null)
  const passengerLabels = useMemo(() => {
    const labels: string[] = []
    for (let i = 1; i <= passengerCount.adults; i++) labels.push(`Adult ${i}`)
    for (let i = 1; i <= passengerCount.children; i++) labels.push(`Child ${i}`)
    return labels
  }, [passengerCount])
  
  useEffect(() => {
    const prefs = loadMarkupPreferences()
    const resolved = resolveAgentMarkup(currentUser.id, currentUser.role)
    setResolvedMarkup(resolved)
    setMarkupControls((prev) => ({
      ...prev,
      agentMarkup: resolved.agentMarkup,
      applyMarkup: true,
      includeAgentMarkupInDocs: true,
    }))
  }, [currentUser.id, currentUser.role])

  useEffect(() => {
    if (!agentAccess.markups.view) {
      setMarkupControls((prev) => ({
        ...prev,
        applyMarkup: false,
        agentMarkup: 0,
        includeAgentMarkupInDocs: false,
      }))
    }

    if (!agentAccess.wallet.debit) {
      setPaymentData((prev) => ({
        ...prev,
        paymentMethod: prev.paymentMethod === "wallet" ? "" : prev.paymentMethod,
        walletUsage: false,
      }))
    }
  }, [agentAccess.markups.view, agentAccess.markups.edit, agentAccess.wallet.debit])
  
  // Calculate pricing breakdown using useMemo
  const pricingBreakdown = useMemo(() => {
    if (!selectedFlight) return null
    
    const baseFare = selectedFlight.price
    const taxes = 3750
    
    return calculatePricingBreakdown(
      baseFare,
      taxes,
      "flights",
      isInternational ? "International" : "Domestic",
      searchData.specialFare || "Regular",
      selectedFlight.currency || "INR",
      {
        superAdminMarkup: resolvedMarkup.superAdminMarkup,
        agentMarkup: markupControls.agentMarkup,
        applyMarkup: markupControls.applyMarkup,
      }
    )
  }, [selectedFlight, isInternational, searchData.specialFare, markupControls.applyMarkup, markupControls.agentMarkup, resolvedMarkup.superAdminMarkup])

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Keep ancillaries seat pricing in sync with selections
    const totalSeatPrice = seatSelections.length * seatPricePerSeat
    setAncillaries((prev) => ({
      ...prev,
      seatSelection: seatSelections.length > 0,
      seatPrice: totalSeatPrice,
    }))
  }, [seatSelections, seatPricePerSeat])

  // Handle flight selection from listing page
  useEffect(() => {
    if (selectedFlightId) {
      let flight = MOCK_FLIGHTS.find((f) => f.id === selectedFlightId)

      // If no mock flight matches, try generated fallback flights (matches listing page fallback)
      if (!flight) {
        const origin = searchParams.get("origin") || ""
        const destination = searchParams.get("destination") || ""
        const departureDate = searchParams.get("departureDate") || ""
        const isIntl = searchParams.get("isInternational") === "true"
        const fallbackFlights = generateFallbackFlights(origin, destination, isIntl, departureDate)
        flight = fallbackFlights.find((f) => f.id === selectedFlightId) || undefined
      }

      if (flight) {
        setSelectedFlight(flight)
        const newListingData = {
          selectedFlight: flight.id,
          fareType: "Standard",
          airline: flight.airline,
          time: flight.departure.time,
          price: flight.price.toString(),
        }
        setListingData(newListingData)
        
        // Restore search params from URL if available
        const origin = searchParams.get("origin")
        const destination = searchParams.get("destination")
        const departureDate = searchParams.get("departureDate")
        const returnDate = searchParams.get("returnDate")
        const travellers = searchParams.get("travellers")
        const classType = searchParams.get("class")
        const tripType = searchParams.get("tripType")
        const isIntl = searchParams.get("isInternational") === "true"
        
        if (origin) setSearchData(prev => ({ ...prev, origin }))
        if (destination) setSearchData(prev => ({ ...prev, destination }))
        if (departureDate) setSearchData(prev => ({ ...prev, departureDate: new Date(departureDate) }))
        if (returnDate) setSearchData(prev => ({ ...prev, returnDate: new Date(returnDate) }))
        if (travellers) setSearchData(prev => ({ ...prev, travellers }))
        if (classType) setSearchData(prev => ({ ...prev, class: classType }))
        if (tripType) setSearchData(prev => ({ ...prev, tripType }))
        setIsInternational(isIntl)
        
        // Transition to Fare Review stage
        const departureDateObj = departureDate ? new Date(departureDate) : new Date(flight.departure.time)
        const cabinClass = classType || "Economy"
        const policyResult = checkFlightPolicyCompliance(
          flight.price,
          cabinClass,
          departureDateObj,
          isIntl,
        )
        setPolicyCheckResult(policyResult)
        
        // Log the stage transition
        const transitionResult = transitionStage(
          "FLIGHT",
          bookingId,
          "Listing",
          "Fare Review",
          newListingData,
          currentUser.id,
          `Flight ${flight.flightNumber} selected`,
        )
        
        if (transitionResult.success) {
          setCurrentStage("Fare Review")
          fareReviewStartTimeRef.current = Date.now()
          setFareAccepted(false)
        } else {
          toast.error("Cannot proceed", { description: transitionResult.error })
        }
        
        // Clear the selectedFlight param from URL
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.delete("selectedFlight")
        router.replace(`/dashboard/flights?${newParams.toString()}`)
      } else {
        toast.error("Selected flight is no longer available. Please search again.")
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.delete("selectedFlight")
        router.replace(`/dashboard/flights?${newParams.toString()}`)
      }
    }
  }, [selectedFlightId, router, searchParams])


  // Payment timeout timer effect
  useEffect(() => {
    if (currentStage === "Payment Pending" && fareReviewStartTimeRef.current) {
      const updateTimer = () => {
        const elapsed = (Date.now() - fareReviewStartTimeRef.current!) / 1000 / 60 // minutes
        const remaining = Math.max(0, 15 - elapsed)
        setPaymentTimeout(Math.ceil(remaining))

        if (remaining <= 0) {
          if (paymentTimeoutRef.current) {
            clearInterval(paymentTimeoutRef.current)
            paymentTimeoutRef.current = null
          }
          toast.error("Payment session expired", {
            description: "The booking session has expired. Please start a new search.",
          })
          setCurrentStage("Search")
        }
      }

      updateTimer()
      paymentTimeoutRef.current = setInterval(updateTimer, 1000) // Update every second

      return () => {
        if (paymentTimeoutRef.current) {
          clearInterval(paymentTimeoutRef.current)
          paymentTimeoutRef.current = null
        }
      }
    } else {
      setPaymentTimeout(null)
    }
  }, [currentStage])

  const getCurrentStageIndex = () => {
    return BOOKING_STAGES.findIndex((s) => s.id === currentStage)
  }

  const validateSearch = (): boolean => {
    const newErrors: Record<string, string> = {}
    const requestedTravellers = Math.max(1, parseInt(searchData.travellers || "1") || 1)

    // Origin & Destination: Required, cannot be same
    if (!searchData.origin) {
      newErrors.origin = "Origin is required"
    }
    if (!searchData.destination) {
      newErrors.destination = "Destination is required"
    }
    if (searchData.origin && searchData.destination && searchData.origin === searchData.destination) {
      newErrors.destination = "Destination cannot be same as origin"
    }

    // Dates: Required, departure date ≥ today, return date > departure (for round-trip)
    if (!searchData.departureDate) {
      newErrors.departureDate = "Departure date is required"
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const departure = new Date(searchData.departureDate)
      departure.setHours(0, 0, 0, 0)
      if (departure < today) {
        newErrors.departureDate = "Departure date cannot be in the past"
      }
    }

    if (searchData.tripType === "round-trip") {
      if (!searchData.returnDate) {
        newErrors.returnDate = "Return date is required for round-trip"
      } else if (searchData.departureDate) {
        const departure = new Date(searchData.departureDate)
        const returnDate = new Date(searchData.returnDate)
        if (returnDate <= departure) {
          newErrors.returnDate = "Return date must be after departure date"
        }
      }
    }

    // Passengers: Standard flow capped at 10, group flow requires 10+
    if (searchData.tripType === "group") {
      if (requestedTravellers < 10) {
        newErrors.passengers = "Group bookings require at least 10 passengers"
      }
    } else {
      if (requestedTravellers > 10) {
        newErrors.passengers = "Use Group Booking for more than 10 passengers"
      }
      if (requestedTravellers < 1) {
        newErrors.passengers = "At least 1 passenger is required"
      }
    }

    setSearchErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Parse travellers string to extract passenger count with limits based on flow
  const parseTravellers = (travellersStr: string, tripTypeValue: string) => {
    // Handle formats like "1", "2", "1-business", etc.
    const parts = travellersStr.split("-")
    const adults = parseInt(parts[0]) || 1
    
    // Extract class if present in the value
    if (parts[1] === "business") {
      setSearchData((prev) => ({ ...prev, class: "Business" }))
    } else if (parts[1] === "premium") {
      setSearchData((prev) => ({ ...prev, class: "Premium" }))
    }
    
    if (tripTypeValue === "group") {
      return Math.max(10, Math.min(200, adults))
    }

    return Math.min(10, Math.max(1, adults))
  }

  const handleSearch = () => {
    if (!canViewFlights) {
      toast.error("Flight search disabled", {
        description: "Your admin has restricted flight visibility for this account.",
      })
      return
    }
    if (!validateSearch()) {
      toast.error("Please fix search errors", {
        description: "Check all required fields and ensure dates are valid",
      })
      return
    }

    // Parse travellers and update passenger count
    const adults = parseTravellers(searchData.travellers, searchData.tripType)
    setPassengerCount({
      adults,
      children: 0,
      infants: 0,
    })

    const isGroupFlow = searchData.tripType === "group" || adults > 10
    if (isGroupFlow) {
      const params = new URLSearchParams({
        origin: searchData.origin,
        destination: searchData.destination,
        departureDate: searchData.departureDate?.toISOString() || "",
        returnDate: searchData.returnDate?.toISOString() || "",
        travellers: adults.toString(),
        class: searchData.class || "Economy",
        tripType: "group",
        isInternational: isInternational.toString(),
      })
      toast.info("Redirecting to group booking form for 10+ passengers")
      router.push(`/dashboard/flights/group-enquiry?${params.toString()}`)
      return
    }

    // Prepare search data matching the required Search stage fields
    const searchDataForTransition = {
      tripType: searchData.tripType || "one-way",
      origin: searchData.origin,
      destination: searchData.destination,
      dates: searchData.departureDate?.toISOString() || new Date().toISOString(),
      travellers: searchData.travellers || "1",
      class: searchData.class || "Economy",
      specialFare: searchData.specialFare || "Regular",
    }

    const result = transitionStage(
      "FLIGHT",
      bookingId,
      currentStage,
      "Listing",
      searchDataForTransition,
      currentUser.id,
      "Flight search initiated",
    )

    if (result.success) {
      // Navigate to listing page with search parameters
      const params = new URLSearchParams({
        origin: searchData.origin,
        destination: searchData.destination,
        departureDate: searchData.departureDate?.toISOString() || "",
        returnDate: searchData.returnDate?.toISOString() || "",
        travellers: searchData.travellers || "1",
        class: searchData.class || "Economy",
        tripType: searchData.tripType || "one-way",
        isInternational: isInternational.toString(),
      })
      window.location.href = `/dashboard/flights/listing?${params.toString()}`
    } else {
      toast.error("Cannot proceed", { description: result.error })
    }
  }

  const handleBook = (flight: Flight) => {
    if (!canBookFlights) {
      toast.error("Booking disabled", {
        description: "Your admin has limited you to view-only access for flights.",
      })
      return
    }
    if (isSuperAdmin) {
      toast.error("Super Admins cannot initiate flight bookings.", {
        description: "Switch to an agency role to create bookings.",
      })
      return
    }
    // Ensure we're in Listing stage before booking
    if (currentStage !== "Listing") {
      toast.error("Cannot book flight", {
        description: "Please complete the search first to view flight listings.",
      })
      return
    }

    const totalTravellers = parseInt(searchData.travellers || "0") || 0
    if (totalTravellers > 9) {
      const params = new URLSearchParams({
        flightId: flight.id,
        origin: searchData.origin,
        destination: searchData.destination,
        departureDate: searchData.departureDate?.toISOString() || "",
        returnDate: searchData.returnDate?.toISOString() || "",
        travellers: searchData.travellers || "0",
        class: searchData.class || "Economy",
        tripType: searchData.tripType || "one-way",
        isInternational: isInternational.toString(),
      })
      toast.info("Group booking detected - redirecting to enquiry form")
      router.push(`/dashboard/flights/group-enquiry?${params.toString()}`)
      return
    }

    setSelectedFlight(flight)
    const newListingData = {
      selectedFlight: flight.id,
      fareType: "Standard",
      airline: flight.airline,
      time: flight.departure.time,
      price: flight.price.toString(),
    }

    // Store listing data for later use
    setListingData(newListingData)

    // Validate listing data
    const listingValidation = validateMandatoryFields("FLIGHT", "Listing", newListingData)
    if (!listingValidation.valid) {
      toast.error("Cannot select flight", {
        description: `Missing: ${listingValidation.missingFields.join(", ")}`,
      })
      return
    }

    // Check policy compliance
    const departureDate = searchData.departureDate || new Date(flight.departure.time)
    const cabinClass = searchData.class || "Economy"
    const policyResult = checkFlightPolicyCompliance(
      flight.price,
      cabinClass,
      departureDate,
      isInternational,
    )
    setPolicyCheckResult(policyResult)

    // Transition from Listing to Fare Review
    const result = transitionStage(
      "FLIGHT",
      bookingId,
      "Listing", // Ensure we're transitioning from Listing stage
      "Fare Review",
      newListingData,
      currentUser.id,
      `Flight ${flight.flightNumber} selected`,
    )

    if (result.success) {
      setCurrentStage("Fare Review")
      fareReviewStartTimeRef.current = Date.now()
      setFareAccepted(false)
    } else {
      toast.error("Cannot proceed", { description: result.error })
    }
  }

  const validatePassengerCount = () => {
    const totalPassengers = passengerCount.adults + passengerCount.children + passengerCount.infants
    const maxPassengers = 20 // Maximum passengers allowed per booking
    
    if (passengerCount.adults < 1) {
      toast.error("At least 1 adult passenger is required")
      return false
    }
    
    if (passengerCount.adults > 20) {
      toast.error("Maximum 20 adult passengers allowed per booking")
      return false
    }
    
    if (passengerCount.children > 19) {
      toast.error("Maximum 19 children allowed per booking")
      return false
    }
    
    if (passengerCount.infants > passengerCount.adults) {
      toast.error("Number of infants cannot exceed number of adults")
      return false
    }
    
    if (totalPassengers > maxPassengers) {
      toast.error(`Maximum ${maxPassengers} passengers allowed per booking`)
      return false
    }
    
    if (totalPassengers < 1) {
      toast.error("At least 1 passenger is required")
      return false
    }
    
    return true
  }

  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const validatePassengerDetails = () => {
    const newErrors: Record<string, string> = {}

    // First Name: Required, alphabets only, min 2 characters
    if (!passengerDetails.firstName) {
      newErrors.firstName = "First name is required"
    } else if (passengerDetails.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    } else if (!/^[a-zA-Z\s]+$/.test(passengerDetails.firstName)) {
      newErrors.firstName = "First name can only contain alphabets and spaces"
    }

    // Last Name: Optional, but if provided, must be valid
    if (passengerDetails.lastName && passengerDetails.lastName.length > 0) {
      if (!/^[a-zA-Z\s]+$/.test(passengerDetails.lastName)) {
        newErrors.lastName = "Last name can only contain alphabets and spaces"
      }
    }

    // DOB: Required, valid date format, age validation
    if (!passengerDetails.dob) {
      newErrors.dob = "Date of Birth is required"
    } else {
      const dobDate = new Date(passengerDetails.dob)
      if (isNaN(dobDate.getTime())) {
        newErrors.dob = "Please enter a valid date"
      } else {
        const age = calculateAge(passengerDetails.dob)
        if (age < 0) {
          newErrors.dob = "Date of Birth cannot be in the future"
        }
        // Age validation will be done per passenger type in the form
      }
    }

    // Gender: Required
    if (!passengerDetails.gender) {
      newErrors.gender = "Gender is required"
    }

    // Mobile: Required, 10 digits, valid Indian format
    if (!passengerDetails.mobile) {
      newErrors.mobile = "Mobile number is required"
    } else {
      const mobileDigits = passengerDetails.mobile.replace(/\D/g, "")
      if (mobileDigits.length !== 10) {
        newErrors.mobile = "Mobile number must be 10 digits"
      } else if (!/^[6-9]/.test(mobileDigits)) {
        newErrors.mobile = "Mobile number must start with 6, 7, 8, or 9"
      }
    }

    // Email: Required, valid email format
    if (!passengerDetails.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passengerDetails.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Passport (International only): Required for international flights, valid passport number format
    if (isInternational) {
      if (!passengerDetails.passport) {
        newErrors.passport = "Passport number is required for international flights"
      } else if (!/^[A-Z]{1}[0-9]{7}$/.test(passengerDetails.passport.toUpperCase())) {
        newErrors.passport = "Passport number must be 1 letter followed by 7 digits (e.g., A1234567)"
      }

      if (!passengerDetails.passportExpiry) {
        newErrors.passportExpiry = "Passport expiry date is required for international flights"
      } else {
        const expiryDate = new Date(passengerDetails.passportExpiry)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (isNaN(expiryDate.getTime())) {
          newErrors.passportExpiry = "Please enter a valid expiry date"
        } else if (expiryDate <= today) {
          newErrors.passportExpiry = "Passport expiry date must be in the future"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleDownloadTicket = (includeAgentMarkup: boolean) => {
    if (!selectedFlight || !bookingId || !pnr) {
      toast.error("Ticket data not available", {
        description: "Please complete the booking to download the ticket.",
      })
      return
    }

    const ancillariesTotal =
      (ancillaries.extraBaggage ? ancillaries.extraBaggagePrice : 0) +
      (ancillaries.mealSelection ? ancillaries.mealPrice : 0) +
      (ancillaries.seatSelection ? ancillaries.seatPrice : 0)
    
    // Calculate pricing breakdown if not already available
    let finalPricingBreakdown = pricingBreakdown
    if (!finalPricingBreakdown && selectedFlight) {
      finalPricingBreakdown = calculatePricingBreakdown(
        selectedFlight.price,
        3750,
        "flights",
        isInternational ? "International" : "Domestic",
        searchData.specialFare || "Regular",
        selectedFlight.currency || "INR",
        {
          superAdminMarkup: resolvedMarkup.superAdminMarkup,
          agentMarkup: markupControls.agentMarkup,
          applyMarkup: markupControls.applyMarkup,
        }
      )
    }
    
    const totalAmount = finalPricingBreakdown 
      ? finalPricingBreakdown.totalAmount + ancillariesTotal
      : selectedFlight.price + 3750 + ancillariesTotal
    
    const ticketData: TicketData = {
      bookingId,
      pnr,
      flight: {
        airline: selectedFlight.airline,
        flightNumber: selectedFlight.flightNumber,
        departure: selectedFlight.departure,
        arrival: selectedFlight.arrival,
        duration: selectedFlight.duration,
      },
      passenger: {
        firstName: passengerDetails.firstName,
        lastName: passengerDetails.lastName || undefined,
        dob: passengerDetails.dob,
        gender: passengerDetails.gender,
        mobile: passengerDetails.mobile,
        email: passengerDetails.email,
        passport: passengerDetails.passport || undefined,
      },
      passengerCount,
      bookingDate: new Date().toISOString(),
      totalAmount,
      ancillaries: {
        extraBaggage: ancillaries.extraBaggage,
        mealSelection: ancillaries.mealSelection,
        seatSelection: ancillaries.seatSelection,
      },
      pricingBreakdown: finalPricingBreakdown ? {
        baseFare: finalPricingBreakdown.baseFare,
        taxes: finalPricingBreakdown.taxes,
        markup: includeAgentMarkup ? (finalPricingBreakdown.markup ?? 0) : 0,
        markupPercent: finalPricingBreakdown.markupPercent,
      } : undefined,
    }
    
    // Calculate totals: base fare includes super admin markup, agent markup is optional
    const agentMarkupAmount =
      includeAgentMarkup && markupControls.applyMarkup ? (finalPricingBreakdown?.markup ?? 0) : 0
    const totalForDocs = finalPricingBreakdown 
      ? finalPricingBreakdown.baseFare + finalPricingBreakdown.taxes + agentMarkupAmount + ancillariesTotal
      : totalAmount

    downloadTicket(
      {
        ...ticketData,
        totalAmount: totalForDocs,
        pricingBreakdown: ticketData.pricingBreakdown
          ? {
              ...ticketData.pricingBreakdown,
              markup: agentMarkupAmount,
            }
          : undefined,
      },
      { showMarkup: includeAgentMarkup && agentMarkupAmount > 0 }
    )
    toast.success("Ticket downloaded", {
      description: `Your flight ticket has been downloaded ${includeAgentMarkup ? "with" : "without"} convenience fees.`,
    })
  }

  const handleNextStage = async () => {
    const currentIndex = getCurrentStageIndex()
    if (currentIndex === -1 || currentIndex >= BOOKING_STAGES.length - 1) return

    const nextStage = BOOKING_STAGES[currentIndex + 1].id as FlightStage

    if (!canBookFlights && nextStage !== "Listing") {
      toast.error("Booking restricted", {
        description: "Your admin has limited flights to view-only access.",
      })
      return
    }

    // Check if transition is allowed
    const transitionCheck = canTransitionStage("FLIGHT", currentStage, nextStage)
    if (!transitionCheck.allowed) {
      toast.error("Cannot skip stages", { description: transitionCheck.reason })
      return
    }

    // Prepare data based on current stage
    let stageData: Record<string, any> = {}

    if (currentStage === "Listing") {
      // If trying to proceed from Listing without selecting a flight
      if (!selectedFlight || !listingData) {
        toast.error("Please select a flight to continue", {
          description: "Click on a flight card to select it before proceeding.",
        })
        return
      }
      // Use stored listing data
      stageData = listingData
    } else if (currentStage === "Fare Review") {
      // Fare Acceptance: Must accept fare rules before continuing
      if (!fareAccepted) {
        toast.error("Please accept the fare rules to continue", {
          description: "You must accept the fare terms before proceeding",
        })
        return
      }
      stageData = { fareAccepted: true }
    } else if (currentStage === "Passenger Details") {
      // Validate passenger count first
      if (!validatePassengerCount()) {
        return
      }
      if (!validatePassengerDetails()) {
        toast.error("Please fill all passenger details")
        return
      }
      const fullName = [passengerDetails.firstName, passengerDetails.lastName].filter(Boolean).join(" ").trim()
      stageData = {
        ...passengerDetails,
        name: fullName || passengerDetails.firstName || passengerDetails.lastName || "",
        passengerCount,
      }
    } else if (currentStage === "Seat Selection") {
      const travellersNeedingSeats = passengerCount.adults + passengerCount.children
      if (seatSelections.length < travellersNeedingSeats) {
        toast.error("Select seats for all passengers", {
          description: `Seats selected for ${seatSelections.length}/${travellersNeedingSeats} passengers.`,
        })
        return
      }
      stageData = { seatSelections }
    } else if (currentStage === "Ancillaries") {
      stageData = { ancillaries }
    } else if (currentStage === "Payment Pending") {
      if (!paymentData.paymentMethod) {
        toast.error("Please select payment method")
        return
      }
      if (paymentData.walletUsage && !canUseWallet) {
        toast.error("Wallet payments are disabled", {
          description: "Your admin has restricted wallet usage for flight bookings.",
        })
        return
      }
      if (!paymentData.acceptTerms) {
        toast.error("Please accept terms and conditions")
        return
      }

      // Calculate total amount including ancillaries and markup
      const ancillariesTotal =
        (ancillaries.extraBaggage ? ancillaries.extraBaggagePrice : 0) +
        (ancillaries.mealSelection ? ancillaries.mealPrice : 0) +
        (ancillaries.seatSelection ? ancillaries.seatPrice : 0)
      
      // Use pricing breakdown if available, otherwise calculate
      let totalAmount = 0
      if (selectedFlight && pricingBreakdown) {
        totalAmount = pricingBreakdown.totalAmount + ancillariesTotal
      } else if (selectedFlight) {
        // Fallback calculation
        const breakdown = calculatePricingBreakdown(
          selectedFlight.price,
          3750,
          "flights",
          isInternational ? "International" : "Domestic",
          searchData.specialFare || "Regular",
          selectedFlight.currency || "INR",
          {
            superAdminMarkup: markupControls.applyMarkup ? resolvedMarkup.superAdminMarkup : 0,
            agentMarkup: markupControls.applyMarkup ? markupControls.agentMarkup : 0,
            applyMarkup: markupControls.applyMarkup,
          }
        )
        totalAmount = breakdown.totalAmount + ancillariesTotal
      }
      
      // Wallet balance: Must be ≥ total booking amount OR payment method selected
      if (paymentData.walletUsage) {
        const walletBalance = getWalletBalance()
        if (!hasSufficientBalance(totalAmount)) {
          toast.error("Insufficient wallet balance", {
            description: `Wallet balance (₹${walletBalance.toLocaleString("en-IN")}) is less than total amount (₹${totalAmount.toLocaleString("en-IN")}). Please add funds to continue.`,
            action: {
              label: "Add Funds",
              onClick: () => {
                // Navigate to wallet page or open add funds dialog
                window.location.href = "/dashboard/wallet"
              },
            },
          })
          return
        }
      }

      // Check payment timeout (15 minutes from fare review stage)
      if (fareReviewStartTimeRef.current) {
        const elapsed = (Date.now() - fareReviewStartTimeRef.current) / 1000 / 60 // minutes
        if (elapsed > 15) {
          toast.error("Payment timeout", {
            description: "The booking session has expired. Please start a new search.",
          })
          // Reset to search stage
          setCurrentStage("Search")
          return
        }
      }

      stageData = { ...paymentData, payableAmount: totalAmount }
    }

    // Perform transition (validation happens inside transitionStage - it validates current stage fields)
    const result = transitionStage("FLIGHT", bookingId, currentStage, nextStage, stageData, currentUser.id)

    if (result.success) {
      setCurrentStage(nextStage)
      if (nextStage === "Booking Confirmed") {
        // Generate unique Booking ID and PNR
        const newBookingId = generateBookingId()
        const newPnr = generatePNR()
        setBookingId(newBookingId)
        setPnr(newPnr)

        // Save booking to IndexedDB
        try {
          const ancillariesTotal =
            (ancillaries.extraBaggage ? ancillaries.extraBaggagePrice : 0) +
            (ancillaries.mealSelection ? ancillaries.mealPrice : 0) +
            (ancillaries.seatSelection ? ancillaries.seatPrice : 0)
          const fallbackPricing = selectedFlight
            ? calculatePricingBreakdown(
                selectedFlight.price,
                3750,
                "flights",
                isInternational ? "International" : "Domestic",
                searchData.specialFare || "Regular",
                selectedFlight.currency || "INR",
                {
                  superAdminMarkup: resolvedMarkup.superAdminMarkup,
                  agentMarkup: markupControls.applyMarkup ? markupControls.agentMarkup : 0,
                  applyMarkup: true,
                }
              )
            : null
          const finalPricingBreakdown = pricingBreakdown ?? fallbackPricing
          const bookingTotal =
            (finalPricingBreakdown?.totalAmount || selectedFlight?.price || 0) + ancillariesTotal

          const booking = await bookingsDB.create({
            type: "FLIGHT",
            status: policyCheckResult?.requiresApproval ? "PENDING_APPROVAL" : "CONFIRMED",
            details: {
              ...selectedFlight,
              bookingId: newBookingId,
              pnr: newPnr,
              passengerDetails,
              passengerCount,
              ancillaries,
              policyCompliant: policyCheckResult?.compliant ?? true,
                seatSelections,
                markup: {
                  applied: markupControls.applyMarkup,
                  superAdminMarkup: finalPricingBreakdown?.superAdminMarkup ?? 0,
                  agentMarkup: markupControls.applyMarkup ? markupControls.agentMarkup : 0,
                  totalMarkup: finalPricingBreakdown?.markup ?? 0,
                  showOnDocs: markupControls.applyMarkup, // Always show convenience fees on docs when markup is applied
                },
            },
            date: new Date().toISOString().split("T")[0],
            amount: bookingTotal,
            agentName: currentUser.name,
            agentId: currentUser.id,
            approvalStatus: policyCheckResult?.requiresApproval ? "PENDING" : "APPROVED",
          })

          // Create transaction
          if (paymentData.walletUsage && selectedFlight) {
            const totalAmount = bookingTotal
            await createTransaction({
              date: new Date().toISOString().split("T")[0],
              description: `Flight Booking ${booking.bookingId}`,
              amount: -totalAmount,
              type: "DEBIT",
              status: "Completed",
              paymentMethod: "Wallet",
              productType: "Flight",
              bookingId: booking.id,
            })
          }

          await audit.create("bookings", booking.id, { type: "FLIGHT", amount: selectedFlight?.price || 0 })

          if (policyCheckResult?.requiresApproval) {
            toast.success("Booking submitted for approval!", {
              description: `Booking ID: ${newBookingId}, PNR: ${newPnr}. Policy violations require approval.`,
            })
          } else {
            toast.success("Booking confirmed!", {
              description: `Booking ID: ${newBookingId}, PNR: ${newPnr}`,
            })
          }

          // Clear payment timeout
          if (paymentTimeoutRef.current) {
            clearInterval(paymentTimeoutRef.current)
            paymentTimeoutRef.current = null
          }
          setPaymentTimeout(null)
          fareReviewStartTimeRef.current = null
        } catch (error) {
          console.error("Failed to save booking:", error)
          toast.error("Booking confirmed but failed to save details")
        }
      }
    } else {
      toast.error("Cannot proceed", { description: result.error })
    }
  }

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
              Super Admins supervise agencies but cannot create flight bookings from this workspace.
              Switch to an agency role (Agency Admin, Agent, or Sub Agent) to access flight booking tools.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  if (!canViewFlights) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <Alert>
            <AlertTitle className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Flight access restricted
            </AlertTitle>
            <AlertDescription>
              Your Agent Admin has disabled flight access for this account. Contact an admin to enable
              flight search or bookings.
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
          Flight Booking
        </h1>
        <p className="text-lg text-muted-foreground">Search and book flights for your business travel with ease.</p>
      </div>

      <div className="w-full overflow-x-auto pb-4">
        <div className="flex items-center min-w-max gap-2">
          {BOOKING_STAGES.map((stage, index) => {
            const stageIndex = getCurrentStageIndex()
            const isCurrent = stage.id === currentStage
            const isCompleted = stageIndex > index
            return (
              <div key={stage.id} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all duration-200 shadow-sm",
                    isCurrent
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                      : isCompleted
                        ? "bg-primary/10 text-primary border-primary/30"
                        : "bg-background text-muted-foreground border-border",
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-xs", isCurrent && "bg-primary-foreground/20")}>
                      {index + 1}
                    </span>
                  )}
                  {stage.label}
                </div>
                {index < BOOKING_STAGES.length - 1 && (
                  <div className={cn("w-12 h-0.5 mx-2 transition-colors", isCompleted ? "bg-primary" : "bg-border")} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Stage 0: Search */}
      {currentStage === "Search" && (
        <div className="transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold">Search Criteria</h2>
            <Button asChild variant="outline" size="sm" className="ml-auto">
              <Link href="/dashboard/flights/group-requests">Manage Group Requests</Link>
            </Button>
          </div>
          <FlightSearch
            tripType={searchData.tripType}
            origin={searchData.origin}
            destination={searchData.destination}
            departureDate={searchData.departureDate}
            returnDate={searchData.returnDate}
            travellers={searchData.travellers}
            class={searchData.class}
            flightType={isInternational ? "international" : "domestic"}
            onTripTypeChange={(value) =>
              setSearchData((prev) => ({
                ...prev,
                tripType: value,
                travellers:
                  value === "group"
                    ? Math.max(10, parseInt(prev.travellers || "10") || 10).toString()
                    : Math.min(10, Math.max(1, parseInt(prev.travellers || "1") || 1)).toString(),
              }))
            }
            onOriginChange={(value) => setSearchData({ ...searchData, origin: value })}
            onDestinationChange={(value) => setSearchData({ ...searchData, destination: value })}
            onDepartureDateChange={(date) => setSearchData({ ...searchData, departureDate: date })}
            onReturnDateChange={(date) => setSearchData({ ...searchData, returnDate: date })}
            onTravellersChange={(value) => setSearchData({ ...searchData, travellers: value })}
            onClassChange={(value) => setSearchData({ ...searchData, class: value })}
            specialFare={searchData.specialFare}
            onSpecialFareChange={(value) => setSearchData({ ...searchData, specialFare: value })}
            onFlightTypeChange={(value) => setIsInternational(value === "international")}
            onSearch={handleSearch}
            errors={searchErrors}
          />
        </div>
      )}

      {/* Listing is now on a separate page - removed from here */}

      {/* Selected Flight Summary (Visible after listing) */}
      {getCurrentStageIndex() > 1 && selectedFlight && (
        <div className="border rounded-lg p-4 bg-muted/20 flex items-center justify-between opacity-50 pointer-events-none">
          <div className="flex items-center gap-4">
            <Lock className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-semibold">
                {selectedFlight.airline} - {selectedFlight.flightNumber}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedFlight.departure.city} to {selectedFlight.arrival.city}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" disabled>
            Selected
          </Button>
        </div>
      )}

      {/* Stage 2: Fare Review */}
      {currentStage === "Fare Review" && selectedFlight && (
        <div className="border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold">Fare Review</h3>
          </div>
          
          {/* Policy Compliance Warnings - Only show to AGENT and SUB_AGENT */}
          {policyCheckResult &&
            !policyCheckResult.compliant &&
            (currentUser.role === "AGENT" || currentUser.role === "SUB_AGENT") && (
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-950/10 border-2 border-yellow-300 dark:border-yellow-800 rounded-xl p-5 space-y-3 shadow-sm">
                <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-bold text-base">Out of Policy - Approval Required</span>
                </div>
                <ul className="list-disc list-inside text-sm text-yellow-700 dark:text-yellow-300 space-y-1.5 ml-2">
                  {policyCheckResult.violations.map((violation, idx) => (
                    <li key={idx} className="font-medium">{violation}</li>
                  ))}
                </ul>
              </div>
            )}

          {(() => {
            if (!pricingBreakdown) {
              // Fallback if pricing breakdown not calculated
              const baseFare = selectedFlight.price
              const taxes = 3750
              const ancillariesTotal =
                (ancillaries.extraBaggage ? ancillaries.extraBaggagePrice : 0) +
                (ancillaries.mealSelection ? ancillaries.mealPrice : 0) +
                (ancillaries.seatSelection ? ancillaries.seatPrice : 0)
              const totalAmount = baseFare + taxes + ancillariesTotal
              
              return (
                <div className="grid grid-cols-2 gap-6 bg-muted/30 rounded-xl p-5">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Base Fare</p>
                    <p className="text-xl font-bold">
                      {selectedFlight.currency} {baseFare.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Taxes & Fees</p>
                    <p className="text-xl font-bold">₹{taxes.toLocaleString("en-IN")}</p>
                  </div>
                  {ancillariesTotal > 0 && (
                    <>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Ancillaries</p>
                        <p className="text-xl font-bold">₹{ancillariesTotal.toLocaleString("en-IN")}</p>
                      </div>
                      <div className="space-y-1"></div>
                    </>
                  )}
                  <Separator className="col-span-2 my-2" />
                  <div className="col-span-2 flex justify-between items-center pt-2">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              )
            }
            
            const baseFare = pricingBreakdown.baseFare
            const taxes = pricingBreakdown.taxes
            const ancillariesTotal =
              (ancillaries.extraBaggage ? ancillaries.extraBaggagePrice : 0) +
              (ancillaries.mealSelection ? ancillaries.mealPrice : 0) +
              (ancillaries.seatSelection ? ancillaries.seatPrice : 0)
            
            const showMarkup = getMarkupVisibility() && pricingBreakdown.markup > 0
            const totalAmount = pricingBreakdown.totalAmount + ancillariesTotal
            
            return (
              <div className="grid grid-cols-2 gap-6 bg-muted/30 rounded-xl p-5">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Base Fare</p>
                  <p className="text-xl font-bold">
                    {selectedFlight.currency} {baseFare.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Taxes & Fees</p>
                  <p className="text-xl font-bold">₹{taxes.toLocaleString("en-IN")}</p>
                </div>
                {showMarkup && (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Convenience fees</p>
                        <p className="text-xl font-bold">₹{pricingBreakdown.markup.toLocaleString("en-IN")}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-xs text-muted-foreground">Adjust convenience fees (₹)</Label>
                        <Input
                          type="number"
                          value={markupControls.agentMarkup}
                          onChange={(e) =>
                            setMarkupControls((prev) => ({
                              ...prev,
                              agentMarkup: Math.max(0, parseFloat(e.target.value) || 0),
                            }))
                          }
                          className="h-8 w-28"
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="space-y-1"></div>
                  </>
                )}
                {ancillariesTotal > 0 && (
                  <>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Ancillaries</p>
                      <p className="text-xl font-bold">₹{ancillariesTotal.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="space-y-1"></div>
                  </>
                )}
                <Separator className="col-span-2 my-2" />
                <div className="col-span-2 flex justify-between items-center pt-2">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            )
          })()}

          {/* Fare Acceptance Checkbox */}
          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="fareAccepted"
              checked={fareAccepted}
              onChange={(e) => setFareAccepted(e.target.checked)}
              className="mt-1 rounded border-gray-300"
            />
            <Label htmlFor="fareAccepted" className="cursor-pointer text-sm">
              I accept the fare rules, cancellation policy, and terms & conditions{" "}
              <span className="text-red-500">*</span>
            </Label>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleNextStage} disabled={!fareAccepted} size="lg" className="min-w-[200px] font-semibold">
              Continue to Passenger Details <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Stage 3: Passenger Details */}
      {currentStage === "Passenger Details" && (
        <div className="border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg transition-all">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-2xl font-bold">Passenger Details</h3>
          </div>

        {/* Passenger Count Selection */}
        <div className="border-2 rounded-xl p-5 bg-gradient-to-br from-muted/50 to-muted/30 mb-6">
          <Label className="text-lg font-bold mb-4 block">Number of Passengers</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adults" className="text-sm">
                Adults (12+ years) <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPassengerCount({ ...passengerCount, adults: Math.max(1, passengerCount.adults - 1) })}
                  disabled={passengerCount.adults <= 1}
                >
                  -
                </Button>
                <Input
                  id="adults"
                  type="number"
                  min="1"
                  max="20"
                  value={passengerCount.adults}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1
                    setPassengerCount({ ...passengerCount, adults: Math.min(20, Math.max(1, value)) })
                  }}
                  className="text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPassengerCount({ ...passengerCount, adults: Math.min(20, passengerCount.adults + 1) })}
                  disabled={passengerCount.adults >= 20}
                >
                  +
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Minimum 1 adult required</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="children" className="text-sm">
                Children (2-11 years)
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPassengerCount({ ...passengerCount, children: Math.max(0, passengerCount.children - 1) })}
                  disabled={passengerCount.children <= 0}
                >
                  -
                </Button>
                <Input
                  id="children"
                  type="number"
                  min="0"
                  max="19"
                  value={passengerCount.children}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0
                    setPassengerCount({ ...passengerCount, children: Math.min(19, Math.max(0, value)) })
                  }}
                  className="text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPassengerCount({ ...passengerCount, children: Math.min(19, passengerCount.children + 1) })}
                  disabled={passengerCount.children >= 19}
                >
                  +
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Maximum 19 children</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="infants" className="text-sm">
                Infants (Under 2 years)
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPassengerCount({ ...passengerCount, infants: Math.max(0, passengerCount.infants - 1) })}
                  disabled={passengerCount.infants <= 0}
                >
                  -
                </Button>
                <Input
                  id="infants"
                  type="number"
                  min="0"
                  max={passengerCount.adults}
                  value={passengerCount.infants}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0
                    setPassengerCount({ ...passengerCount, infants: Math.min(passengerCount.adults, Math.max(0, value)) })
                  }}
                  className="text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPassengerCount({ ...passengerCount, infants: Math.min(passengerCount.adults, passengerCount.infants + 1) })}
                  disabled={passengerCount.infants >= passengerCount.adults}
                >
                  +
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum {passengerCount.adults} infant{passengerCount.adults !== 1 ? "s" : ""} (1 per adult)
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-950/10 border-2 border-blue-200 dark:border-blue-800 rounded-xl">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
              <strong>Total Passengers:</strong> {passengerCount.adults + passengerCount.children + passengerCount.infants} 
              {" "}({passengerCount.adults} adult{passengerCount.adults !== 1 ? "s" : ""}
              {passengerCount.children > 0 && `, ${passengerCount.children} child${passengerCount.children !== 1 ? "ren" : ""}`}
              {passengerCount.infants > 0 && `, ${passengerCount.infants} infant${passengerCount.infants !== 1 ? "s" : ""}`})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              value={passengerDetails.firstName}
              onChange={(e) => setPassengerDetails({ ...passengerDetails, firstName: e.target.value })}
              className={cn(errors.firstName && "border-red-500")}
            />
            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last Name
            </Label>
            <Input
              id="lastName"
              value={passengerDetails.lastName}
              onChange={(e) => setPassengerDetails({ ...passengerDetails, lastName: e.target.value })}
              className={cn(errors.lastName && "border-red-500")}
            />
            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dob"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              value={passengerDetails.dob}
              onChange={(e) => setPassengerDetails({ ...passengerDetails, dob: e.target.value })}
              className={cn(errors.dob && "border-red-500")}
            />
            {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
            {passengerDetails.dob && !errors.dob && (
              <p className="text-xs text-muted-foreground">
                Age: {calculateAge(passengerDetails.dob)} years
                {calculateAge(passengerDetails.dob) > 12
                  ? " (Adult)"
                  : calculateAge(passengerDetails.dob) >= 2
                    ? " (Child)"
                    : " (Infant)"}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">
              Gender <span className="text-red-500">*</span>
            </Label>
            <select
              id="gender"
              className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                errors.gender && "border-red-500",
              )}
              value={passengerDetails.gender}
              onChange={(e) => setPassengerDetails({ ...passengerDetails, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">
              Mobile Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="mobile"
              value={passengerDetails.mobile}
              onChange={(e) => setPassengerDetails({ ...passengerDetails, mobile: e.target.value })}
              className={cn(errors.mobile && "border-red-500")}
            />
            {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={passengerDetails.email}
              onChange={(e) => setPassengerDetails({ ...passengerDetails, email: e.target.value })}
              className={cn(errors.email && "border-red-500")}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Passport fields for international flights */}
          {isInternational && (
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passport">
                  Passport Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="passport"
                  value={passengerDetails.passport}
                  onChange={(e) =>
                    setPassengerDetails({ ...passengerDetails, passport: e.target.value.toUpperCase() })
                  }
                  placeholder="A1234567"
                  maxLength={8}
                  className={cn(errors.passport && "border-red-500")}
                />
                {errors.passport && <p className="text-xs text-red-500">{errors.passport}</p>}
                <p className="text-xs text-muted-foreground">
                  Format: 1 letter followed by 7 digits (e.g., A1234567)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportExpiry">
                  Passport Expiry Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="passportExpiry"
                  type="date"
                  value={passengerDetails.passportExpiry}
                  onChange={(e) =>
                    setPassengerDetails({ ...passengerDetails, passportExpiry: e.target.value })
                  }
                  className={cn(errors.passportExpiry && "border-red-500")}
                />
                {errors.passportExpiry && <p className="text-xs text-red-500">{errors.passportExpiry}</p>}
              </div>
            </div>
          )}
        </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleNextStage} size="lg" className="min-w-[200px] font-semibold">
              Continue to Seat Selection <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Stage 5: Ancillaries */}
      {currentStage === "Ancillaries" && (
        <div className="border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg transition-all">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-2xl font-bold">Ancillaries</h3>
            <p className="text-sm text-muted-foreground ml-2">(Optional)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={cn(
                "border-2 p-5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md",
                ancillaries.extraBaggage
                  ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm"
                  : "hover:border-primary/50 hover:bg-muted/50",
              )}
              onClick={() =>
                setAncillaries({ ...ancillaries, extraBaggage: !ancillaries.extraBaggage })
              }
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Extra Baggage</p>
                {ancillaries.extraBaggage && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">Additional 15kg baggage allowance</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">+ ₹1,500</span>
                <Button
                  variant={ancillaries.extraBaggage ? "default" : "outline"}
                  size="sm"
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setAncillaries({ ...ancillaries, extraBaggage: !ancillaries.extraBaggage })
                  }}
                >
                  {ancillaries.extraBaggage ? "Remove" : "Add"}
                </Button>
              </div>
            </div>
            <div
              className={cn(
                "border-2 p-5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md",
                ancillaries.mealSelection
                  ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm"
                  : "hover:border-primary/50 hover:bg-muted/50",
              )}
              onClick={() =>
                setAncillaries({ ...ancillaries, mealSelection: !ancillaries.mealSelection })
              }
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Meal Selection</p>
                {ancillaries.mealSelection && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">Pre-book your meal preference</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">+ ₹1,200</span>
                <Button
                  variant={ancillaries.mealSelection ? "default" : "outline"}
                  size="sm"
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setAncillaries({ ...ancillaries, mealSelection: !ancillaries.mealSelection })
                  }}
                >
                  {ancillaries.mealSelection ? "Remove" : "Select"}
                </Button>
              </div>
            </div>
            <div
              className={cn(
                "border-2 p-5 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md",
                ancillaries.seatSelection
                  ? "border-primary bg-primary/10 ring-2 ring-primary/20 shadow-sm"
                  : "hover:border-primary/50 hover:bg-muted/50",
              )}
              onClick={() =>
                setAncillaries({ ...ancillaries, seatSelection: !ancillaries.seatSelection })
              }
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Seat Selection</p>
                {ancillaries.seatSelection && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">Choose your preferred seat</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">+ ₹800</span>
                <Button
                  variant={ancillaries.seatSelection ? "default" : "outline"}
                  size="sm"
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setAncillaries({ ...ancillaries, seatSelection: !ancillaries.seatSelection })
                  }}
                >
                  {ancillaries.seatSelection ? "Remove" : "Choose"}
                </Button>
              </div>
            </div>
          </div>
          {currentStage === "Ancillaries" && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Selected Ancillaries:</span>
                <span className="text-sm font-semibold">
                  ₹
                  {(ancillaries.extraBaggage ? ancillaries.extraBaggagePrice : 0) +
                    (ancillaries.mealSelection ? ancillaries.mealPrice : 0) +
                    (ancillaries.seatSelection ? ancillaries.seatPrice : 0)}
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {!ancillaries.extraBaggage && !ancillaries.mealSelection && !ancillaries.seatSelection
                  ? "No ancillaries selected (optional)"
                  : [
                      ancillaries.extraBaggage && "Extra Baggage",
                      ancillaries.mealSelection && "Meal Selection",
                      ancillaries.seatSelection && "Seat Selection",
                    ]
                        .filter(Boolean)
                        .join(", ")}
              </div>
            </div>
          )}
          <div className="flex justify-end pt-4">
            <Button onClick={handleNextStage} size="lg" className="min-w-[200px] font-semibold">
              Continue to Payment <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Stage 4: Seat Selection */}
      {currentStage === "Seat Selection" && (
        <div className="border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg transition-all">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-2xl font-bold">Seat Selection</h3>
            <Badge variant="outline">Mandatory</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Select seats for each passenger. Seat price ₹{seatPricePerSeat} per seat applies when chosen.
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm font-semibold">Passengers</p>
              <div className="space-y-2">
                {passengerLabels.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Add passengers to continue.</p>
                ) : (
                  passengerLabels.map((label, idx) => (
                    <div key={label} className="flex items-center justify-between rounded-md border p-2">
                      <span className="text-sm font-medium">{label}</span>
                      <span className="text-sm text-muted-foreground">
                        {seatSelections[idx] ? `Seat ${seatSelections[idx]}` : "No seat selected"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold">Flight layout</p>
              <div className="rounded-lg border p-4 bg-muted/40">
                <div className="grid grid-cols-7 gap-2">
                  <div className="col-span-7 text-center text-xs text-muted-foreground pb-1">
                    A B C  &nbsp; | &nbsp;  D E F
                  </div>
                  {Array.from({ length: 12 }).map((_, rowIdx) => {
                    const rowNumber = rowIdx + 1
                    const seatsInRow = ["A", "B", "C", "D", "E", "F"]
                    return (
                      <div key={rowNumber} className="col-span-7 grid grid-cols-7 gap-1 items-center">
                        <div className="text-xs font-semibold text-muted-foreground text-right pr-1">{rowNumber}</div>
                        {seatsInRow.map((seat, seatIdx) => {
                          const seatId = `${rowNumber}${seat}`
                          const isSelected = seatSelections.includes(seatId)
                          const isAisle = seatIdx === 3
                          return isAisle ? (
                            <div key={`${seatId}-aisle`} />
                          ) : (
                            <Button
                              key={seatId}
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              className="text-xs"
                              onClick={() => {
                                setSeatSelections((prev) => {
                                  // If already selected, deselect
                                  if (prev.includes(seatId)) {
                                    const next = prev.filter((s) => s !== seatId)
                                    return next
                                  }
                                  // Limit to number of travellers (adults + children)
                                  const maxSeats = passengerCount.adults + passengerCount.children
                                  const next = [...prev, seatId].slice(0, maxSeats)
                                  return next
                                })
                              }}
                            >
                              {seatId}
                            </Button>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => setCurrentStage("Passenger Details")}>
              Back to Passenger Details
            </Button>
            <Button onClick={handleNextStage} size="lg" className="min-w-[200px] font-semibold">
              Continue to Ancillaries <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Stage 6: Payment */}
      {currentStage === "Payment Pending" && (
        <div className="border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Payment Pending</h3>
            {paymentTimeout !== null && (
              <Badge variant={paymentTimeout < 3 ? "destructive" : "secondary"}>
                Time remaining: {paymentTimeout} min
              </Badge>
            )}
          </div>

          {(() => {
            const ancillariesTotal =
              (ancillaries.extraBaggage ? ancillaries.extraBaggagePrice : 0) +
              (ancillaries.mealSelection ? ancillaries.mealPrice : 0) +
              (ancillaries.seatSelection ? ancillaries.seatPrice : 0)
            const netFare =
              (pricingBreakdown?.baseFare ?? selectedFlight?.price ?? 0) +
              (pricingBreakdown?.taxes ?? 3750)
            // markupTotal now only includes agent markup (convenience fees)
            // Super admin markup is already included in baseFare
            const markupTotal =
              pricingBreakdown?.markup ??
              (markupControls.applyMarkup ? markupControls.agentMarkup : 0)
            const customerTotal = netFare + markupTotal + ancillariesTotal

            return (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-950/10 p-5 rounded-xl border-2 border-yellow-300 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="font-semibold text-sm uppercase tracking-wide text-yellow-700">Net Price (API Fare)</p>
                      <p className="text-2xl font-bold text-yellow-900">
                        ₹{netFare.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">Base fare + taxes shown to agents</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm uppercase tracking-wide text-yellow-700">Customer Payable</p>
                      <p className="text-3xl font-bold text-yellow-900">
                        ₹{customerTotal.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Includes markup and ancillaries (toggle below to remove markup)
                      </p>
                    </div>
                  </div>
                  {paymentTimeout !== null && paymentTimeout < 5 && (
                    <p className="text-sm font-semibold mt-3 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Payment session expires in {paymentTimeout} minute{paymentTimeout !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {canViewMarkups && (
                    <div className="space-y-2 border rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="applyMarkup"
                          checked={markupControls.applyMarkup}
                          disabled={!canEditMarkups}
                          onCheckedChange={(checked) =>
                            setMarkupControls((prev) => ({ ...prev, applyMarkup: checked as boolean }))
                          }
                        />
                        <div>
                          <Label htmlFor="applyMarkup" className="font-semibold">
                            Add markup before payment
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Defaulted on with preset ₹500. Toggle off to send without markup.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                        {isSuperAdmin && (
                          <div className="space-y-1">
                            <Label>Super Admin markup (₹)</Label>
                            <Input value={resolvedMarkup.superAdminMarkup} readOnly />
                          </div>
                        )}
                        <div className="space-y-1">
                          <Label>Agent markup (₹)</Label>
                          <Input
                            type="number"
                            value={markupControls.agentMarkup}
                            onChange={(e) =>
                              setMarkupControls((prev) => ({
                                ...prev,
                                agentMarkup: Math.max(0, parseFloat(e.target.value) || 0),
                              }))
                            }
                            disabled={
                              !markupControls.applyMarkup ||
                              !resolvedMarkup.allowAgentOverride ||
                              !canEditMarkups
                            }
                            min={0}
                          />
                          {!resolvedMarkup.allowAgentOverride && (
                            <p className="text-xs text-muted-foreground">Locked by Agent Admin</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1 rounded-md border bg-card p-4">
                    {(() => {
                      const baseFareAmount = pricingBreakdown?.baseFare ?? selectedFlight?.price ?? 0
                      const taxAmount = pricingBreakdown?.taxes ?? 3750
                      const convenienceFees = markupControls.applyMarkup ? markupTotal : 0
                      const total = baseFareAmount + taxAmount + convenienceFees + ancillariesTotal
                      return (
                        <>
                          <p className="text-sm font-medium text-muted-foreground">Price Breakdown</p>
                          <div className="flex items-center justify-between">
                            <span>Base fare</span>
                            <span className="font-semibold">₹{baseFareAmount.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Taxes</span>
                            <span className="font-semibold">₹{taxAmount.toLocaleString("en-IN")}</span>
                          </div>
                          {convenienceFees > 0 && (
                            <div className="flex items-center justify-between">
                              <span>Convenience fees</span>
                              <span className="font-semibold text-primary">
                                ₹{convenienceFees.toLocaleString("en-IN")}
                              </span>
                            </div>
                          )}
                          {ancillariesTotal > 0 && (
                            <div className="flex items-center justify-between">
                              <span>Ancillaries</span>
                              <span className="font-semibold text-primary">
                                ₹{ancillariesTotal.toLocaleString("en-IN")}
                              </span>
                            </div>
                          )}
                          <Separator />
                          <div className="flex items-center justify-between">
                            <span className="font-bold">Total</span>
                            <span className="text-lg font-bold text-primary">
                              ₹{total.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Wallet Balance Display */}
          {canViewWallet && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-950/10 p-5 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">Wallet Balance:</span>
                <span className="text-xl font-bold text-blue-900 dark:text-blue-100">
                  ₹{parseFloat(localStorage.getItem("wallet_balance") || "0").toLocaleString("en-IN")}
                </span>
              </div>
              {selectedFlight && (
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  {(() => {
                    const ancillariesTotal =
                      (ancillaries.extraBaggage ? ancillaries.extraBaggagePrice : 0) +
                      (ancillaries.mealSelection ? ancillaries.mealPrice : 0) +
                      (ancillaries.seatSelection ? ancillaries.seatPrice : 0)
                    // baseTotal calculation: baseFare (includes super admin markup) + taxes + agent markup
                    const baseTotal =
                      pricingBreakdown?.totalAmount ??
                      ((selectedFlight.price || 0) +
                        resolvedMarkup.superAdminMarkup + // Super admin markup added to base fare
                        3750 + // Taxes
                        (markupControls.applyMarkup ? markupControls.agentMarkup : 0)) // Agent markup (convenience fees)
                    const required = baseTotal + ancillariesTotal
                    const walletBalance = parseFloat(localStorage.getItem("wallet_balance") || "0")

                    return (
                      <>
                        Required: ₹{required.toLocaleString("en-IN")}
                        {walletBalance < required && (
                          <span className="text-red-600 dark:text-red-400 font-semibold ml-2">
                            (Insufficient balance)
                          </span>
                        )}
                      </>
                    )
                  })()}
                </p>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={paymentData.paymentMethod}
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    paymentMethod: e.target.value,
                    walletUsage: e.target.value === "wallet",
                  })
                }
              >
                <option value="">Select payment method</option>
                {canUseWallet && <option value="wallet">Wallet</option>}
                <option value="card">Credit/Debit Card</option>
                <option value="netbanking">Net Banking</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={paymentData.acceptTerms}
                onChange={(e) => setPaymentData({ ...paymentData, acceptTerms: e.target.checked })}
              />
              <Label htmlFor="acceptTerms" className="cursor-pointer">
                I accept the terms and conditions <span className="text-red-500">*</span>
              </Label>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={handleNextStage} size="lg" className="min-w-[200px] bg-green-600 hover:bg-green-700 font-semibold shadow-lg hover:shadow-xl transition-all">
              Pay & Confirm
            </Button>
          </div>
        </div>
      )}

      {/* Stage 7: Confirmed */}
      {currentStage === "Booking Confirmed" && (
        <div className="border-2 rounded-xl p-8 text-center bg-gradient-to-br from-green-50 to-green-100/50 border-green-300 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-green-800 mb-3">Booking Confirmed!</h2>
          <p className="text-lg text-green-700 mb-8 font-medium">Your flight has been successfully booked and ticketed.</p>
          {bookingId && pnr && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 space-y-3 max-w-md mx-auto border-2 border-green-200 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base">Booking ID:</span>
                <span className="font-mono text-xl font-bold text-primary">{bookingId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-base">PNR:</span>
                <span className="font-mono text-xl font-bold text-primary">{pnr}</span>
              </div>
            </div>
          )}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                if (selectedFlight && bookingId && pnr) {
                  setDownloadDialogOpen(true)
                } else {
                  toast.error("Ticket data not available", {
                    description: "Please complete the booking to download the ticket.",
                  })
                }
              }}
            >
              Download Ticket
            </Button>
            
            <Dialog open={downloadDialogOpen} onOpenChange={setDownloadDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Download Ticket</DialogTitle>
                  <DialogDescription>
                    Choose whether to include convenience fees in the ticket. Super admin markup is always included in the base fare.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">Super admin markup is automatically included in the base fare and will always be shown.</p>
                    <p>You can choose to include or exclude agent markup (convenience fees) from the ticket.</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDownloadDialogOpen(false)
                      handleDownloadTicket(false) // Without agent markup
                    }}
                  >
                    Without Convenience Fees
                  </Button>
                  <Button
                    onClick={() => {
                      setDownloadDialogOpen(false)
                      handleDownloadTicket(true) // With agent markup
                    }}
                  >
                    With Convenience Fees
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={() => (window.location.href = "/dashboard")}>Return to Dashboard</Button>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect, useRef, useMemo } from "react"
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
import { getMarkupVisibility } from "@/lib/utils"

const BOOKING_STAGES = [
  { id: "Search", label: "Search" },
  { id: "Listing", label: "Listing" },
  { id: "Fare Review", label: "Fare Review" },
  { id: "Passenger Details", label: "Passenger Details" },
  { id: "Ancillaries", label: "Ancillaries" },
  { id: "Payment Pending", label: "Payment Pending" },
  { id: "Booking Confirmed", label: "Booking Confirmed" },
]

export default function FlightsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentUser } = useAppStore()
  const isSuperAdmin = currentUser.role === "SUPER_ADMIN"
  
  // Check if we're coming from listing page with a selected flight
  const selectedFlightId = searchParams.get("selectedFlight")
  
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
    seatPrice: 800,
  })

  // Payment State
  const [paymentData, setPaymentData] = useState({
    paymentMethod: "",
    payableAmount: 0,
    walletUsage: false,
    acceptTerms: false,
  })
  const [paymentTimeout, setPaymentTimeout] = useState<number | null>(null)
  const paymentTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fareReviewStartTimeRef = useRef<number | null>(null)
  
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
      selectedFlight.currency || "INR"
    )
  }, [selectedFlight, isInternational, searchData.specialFare])

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle flight selection from listing page
  useEffect(() => {
    if (selectedFlightId) {
      const flight = MOCK_FLIGHTS.find((f) => f.id === selectedFlightId)
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

    // Passengers: At least 1 adult required, max total passengers (typically 20)
    const totalPassengers = passengerCount.adults + passengerCount.children + passengerCount.infants
    if (passengerCount.adults < 1) {
      newErrors.passengers = "At least 1 adult passenger is required"
    }
    if (totalPassengers > 20) {
      newErrors.passengers = "Maximum 20 passengers allowed per booking"
    }

    setSearchErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Parse travellers string to extract passenger count
  const parseTravellers = (travellersStr: string) => {
    // Handle formats like "1", "2", "1-business", etc.
    const parts = travellersStr.split("-")
    const adults = parseInt(parts[0]) || 1
    
    // Extract class if present in the value
    if (parts[1] === "business") {
      setSearchData((prev) => ({ ...prev, class: "Business" }))
    } else if (parts[1] === "premium") {
      setSearchData((prev) => ({ ...prev, class: "Premium" }))
    }
    
    return Math.min(20, Math.max(1, adults))
  }

  const handleSearch = () => {
    if (!validateSearch()) {
      toast.error("Please fix search errors", {
        description: "Check all required fields and ensure dates are valid",
      })
      return
    }

    // Parse travellers and update passenger count
    const adults = parseTravellers(searchData.travellers)
    setPassengerCount({
      adults,
      children: 0,
      infants: 0,
    })

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

  const handleNextStage = async () => {
    const currentIndex = getCurrentStageIndex()
    if (currentIndex === -1 || currentIndex >= BOOKING_STAGES.length - 1) return

    const nextStage = BOOKING_STAGES[currentIndex + 1].id as FlightStage

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
      stageData = { ...passengerDetails, passengerCount }
    } else if (currentStage === "Ancillaries") {
      stageData = { ancillaries }
    } else if (currentStage === "Payment Pending") {
      if (!paymentData.paymentMethod) {
        toast.error("Please select payment method")
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
          selectedFlight.currency || "INR"
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
            },
            date: new Date().toISOString().split("T")[0],
            amount: selectedFlight?.price || 0,
            agentName: currentUser.name,
            agentId: currentUser.id,
            approvalStatus: policyCheckResult?.requiresApproval ? "PENDING" : "APPROVED",
          })

          // Create transaction
          if (paymentData.walletUsage && selectedFlight) {
            const ancillariesTotal =
              (ancillaries.extraBaggage ? ancillaries.extraBaggagePrice : 0) +
              (ancillaries.mealSelection ? ancillaries.mealPrice : 0) +
              (ancillaries.seatSelection ? ancillaries.seatPrice : 0)
            
            // Use pricing breakdown for accurate total
            let totalAmount = 0
            if (pricingBreakdown) {
              totalAmount = pricingBreakdown.totalAmount + ancillariesTotal
            } else {
              const breakdown = calculatePricingBreakdown(
                selectedFlight.price,
                3750,
                "flights",
                isInternational ? "International" : "Domestic",
                searchData.specialFare || "Regular",
                selectedFlight.currency || "INR"
              )
              totalAmount = breakdown.totalAmount + ancillariesTotal
            }
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
      <div className={cn("transition-all duration-300", currentStage !== "Search" && "opacity-50 pointer-events-none grayscale")}>
        <div className="flex items-center gap-2 mb-4">
          {currentStage !== "Search" && <Lock className="w-5 h-5 text-muted-foreground" />}
          <h2 className="text-2xl font-bold">Search Criteria</h2>
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
          onTripTypeChange={(value) => setSearchData({ ...searchData, tripType: value })}
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
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Markup ({pricingBreakdown.markupPercent.toFixed(2)}%)
                      </p>
                      <p className="text-xl font-bold">₹{pricingBreakdown.markup.toLocaleString("en-IN")}</p>
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
      <div
        className={cn(
          "border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg transition-all",
          getCurrentStageIndex() < 3 ? "hidden" : getCurrentStageIndex() > 3 ? "opacity-50 pointer-events-none" : "",
        )}
      >
        <div className="flex items-center gap-2 mb-2">
          {getCurrentStageIndex() > 3 && <Lock className="w-5 h-5 text-muted-foreground" />}
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

        {currentStage === "Passenger Details" && (
          <div className="flex justify-end pt-4">
            <Button onClick={handleNextStage} size="lg" className="min-w-[200px] font-semibold">
              Continue to Ancillaries <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* Stage 4: Ancillaries */}
      {getCurrentStageIndex() >= 4 && (
        <div
          className={cn(
            "border-2 rounded-xl p-6 space-y-6 bg-card shadow-lg transition-all",
            getCurrentStageIndex() > 4 ? "opacity-50 pointer-events-none" : "",
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            {getCurrentStageIndex() > 4 && <Lock className="w-5 h-5 text-muted-foreground" />}
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
          {currentStage === "Ancillaries" && (
            <div className="flex justify-end pt-4">
              <Button onClick={handleNextStage} size="lg" className="min-w-[200px] font-semibold">
                Continue to Payment <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Stage 5: Payment */}
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

          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-950/10 p-5 rounded-xl border-2 border-yellow-300 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 shadow-sm">
            <p className="font-bold text-lg">
              Total Amount: ₹
              {selectedFlight
                ? (
                    selectedFlight.price +
                    3750 +
                    (ancillaries.extraBaggage ? ancillaries.extraBaggagePrice : 0) +
                    (ancillaries.mealSelection ? ancillaries.mealPrice : 0) +
                    (ancillaries.seatSelection ? ancillaries.seatPrice : 0)
                  ).toLocaleString("en-IN")
                : 0}
            </p>
            <p className="text-sm mt-2">Please proceed to payment gateway to confirm your booking.</p>
            {paymentTimeout !== null && paymentTimeout < 5 && (
              <p className="text-sm font-semibold mt-3 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Payment session expires in {paymentTimeout} minute{paymentTimeout !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Wallet Balance Display */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-950/10 p-5 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">Wallet Balance:</span>
              <span className="text-xl font-bold text-blue-900 dark:text-blue-100">
                ₹{parseFloat(localStorage.getItem("wallet_balance") || "0").toLocaleString("en-IN")}
              </span>
            </div>
            {selectedFlight && (
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Required: ₹
                {(
                  selectedFlight.price +
                  3750 +
                  (ancillaries.extraBaggage ? ancillaries.extraBaggagePrice : 0) +
                  (ancillaries.mealSelection ? ancillaries.mealPrice : 0) +
                  (ancillaries.seatSelection ? ancillaries.seatPrice : 0)
                ).toLocaleString("en-IN")}
                {parseFloat(localStorage.getItem("wallet_balance") || "0") <
                  selectedFlight.price +
                    3750 +
                    (ancillaries.extraBaggage ? ancillaries.extraBaggagePrice : 0) +
                    (ancillaries.mealSelection ? ancillaries.mealPrice : 0) +
                    (ancillaries.seatSelection ? ancillaries.seatPrice : 0) && (
                  <span className="text-red-600 dark:text-red-400 font-semibold ml-2">
                    (Insufficient balance)
                  </span>
                )}
              </p>
            )}
          </div>

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
                <option value="wallet">Wallet</option>
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

      {/* Stage 6: Confirmed */}
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
                      selectedFlight.currency || "INR"
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
                      markup: finalPricingBreakdown.markup,
                      markupPercent: finalPricingBreakdown.markupPercent,
                    } : undefined,
                  }
                  downloadTicket(ticketData)
                  toast.success("Ticket downloaded", {
                    description: "Your flight ticket has been downloaded and opened for printing.",
                  })
                } else {
                  toast.error("Ticket data not available", {
                    description: "Please complete the booking to download the ticket.",
                  })
                }
              }}
            >
              Download Ticket
            </Button>
            <Button onClick={() => (window.location.href = "/dashboard")}>Return to Dashboard</Button>
          </div>
        </div>
      )}
    </div>
  )
}

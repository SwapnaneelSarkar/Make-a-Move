// Policy Compliance Utility
// Checks flight bookings against travel policies

export interface FlightPolicy {
  maxDomesticPrice: number
  maxInternationalPrice: number
  allowedCabinClass: "Economy" | "Premium" | "Business" | "All"
  advanceBookingDays: number // 0, 7, or 14 days
}

export interface PolicyCheckResult {
  compliant: boolean
  violations: string[]
  requiresApproval: boolean
}

// Default policy values (can be loaded from user's policy)
const DEFAULT_POLICY: FlightPolicy = {
  maxDomesticPrice: 15000, // ₹15,000
  maxInternationalPrice: 50000, // ₹50,000
  allowedCabinClass: "Economy",
  advanceBookingDays: 0,
}

export function checkFlightPolicyCompliance(
  flightPrice: number,
  cabinClass: string,
  departureDate: Date,
  isInternational: boolean = false,
  userPolicy?: Partial<FlightPolicy>,
): PolicyCheckResult {
  const policy = { ...DEFAULT_POLICY, ...userPolicy }
  const violations: string[] = []
  let requiresApproval = false

  // Check price limits
  const maxPrice = isInternational ? policy.maxInternationalPrice : policy.maxDomesticPrice
  if (flightPrice > maxPrice) {
    violations.push(
      `Flight price (₹${flightPrice}) exceeds maximum allowed price (₹${maxPrice}) for ${isInternational ? "international" : "domestic"} flights`,
    )
    requiresApproval = true
  }

  // Check cabin class
  if (policy.allowedCabinClass !== "All") {
    const cabinClassLower = cabinClass.toLowerCase()
    const allowedClassLower = policy.allowedCabinClass.toLowerCase()

    if (cabinClassLower === "business" && allowedClassLower !== "business") {
      violations.push(`Business class not allowed. Policy allows: ${policy.allowedCabinClass} only`)
      requiresApproval = true
    } else if (cabinClassLower === "premium" && allowedClassLower === "economy") {
      violations.push(`Premium Economy not allowed. Policy allows: Economy only`)
      requiresApproval = true
    }
  }

  // Check advance booking requirement
  if (policy.advanceBookingDays > 0) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const departure = new Date(departureDate)
    departure.setHours(0, 0, 0, 0)
    const daysDifference = Math.floor((departure.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDifference < policy.advanceBookingDays) {
      violations.push(
        `Booking must be made at least ${policy.advanceBookingDays} day${policy.advanceBookingDays > 1 ? "s" : ""} in advance. Current booking is ${daysDifference} day${daysDifference !== 1 ? "s" : ""} before departure`,
      )
      requiresApproval = true
    }
  }

  return {
    compliant: violations.length === 0,
    violations,
    requiresApproval,
  }
}

// Generate unique Booking ID: FL-YYYYMMDD-XXXX
export function generateBookingId(): string {
  const now = new Date()
  const dateStr = now.toISOString().split("T")[0].replace(/-/g, "")
  const random = Math.floor(1000 + Math.random() * 9000) // 4-digit random number
  return `FL-${dateStr}-${random}`
}

// Generate 6-character alphanumeric PNR
export function generatePNR(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let pnr = ""
  for (let i = 0; i < 6; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return pnr
}

// Hotel Policy Compliance
export interface HotelPolicy {
  maxRatePerNightMetro: number // Metro cities (Mumbai, Delhi, Bangalore, etc.)
  maxRatePerNightOther: number // Other cities
  minStarRating?: number // Minimum star rating if enforced
  requireAdvanceBooking?: number // Days in advance
}

const DEFAULT_HOTEL_POLICY: HotelPolicy = {
  maxRatePerNightMetro: 15000, // ₹15,000 per night for metro cities
  maxRatePerNightOther: 10000, // ₹10,000 per night for other cities
  minStarRating: undefined, // No minimum enforced by default
  requireAdvanceBooking: undefined,
}

// Metro cities list
const METRO_CITIES = ["mumbai", "delhi", "bangalore", "chennai", "kolkata", "hyderabad", "pune", "ahmedabad"]

export function checkHotelPolicyCompliance(
  pricePerNight: number,
  location: string,
  starRating?: number,
  checkInDate?: Date,
  userPolicy?: Partial<HotelPolicy>,
): PolicyCheckResult {
  const policy = { ...DEFAULT_HOTEL_POLICY, ...userPolicy }
  const violations: string[] = []
  let requiresApproval = false

  // Determine if location is metro or other
  const locationLower = location.toLowerCase()
  const isMetro = METRO_CITIES.some((city) => locationLower.includes(city))
  const maxRate = isMetro ? policy.maxRatePerNightMetro : policy.maxRatePerNightOther

  // Check rate limits
  if (pricePerNight > maxRate) {
    violations.push(
      `Hotel rate (₹${pricePerNight}/night) exceeds maximum allowed rate (₹${maxRate}/night) for ${isMetro ? "metro" : "non-metro"} cities`,
    )
    requiresApproval = true
  }

  // Check minimum star rating
  if (policy.minStarRating && starRating && starRating < policy.minStarRating) {
    violations.push(
      `Hotel star rating (${starRating}) is below minimum required rating (${policy.minStarRating})`,
    )
    requiresApproval = true
  }

  // Check advance booking requirement
  if (policy.requireAdvanceBooking && checkInDate) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkIn = new Date(checkInDate)
    checkIn.setHours(0, 0, 0, 0)
    const daysDifference = Math.floor((checkIn.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDifference < policy.requireAdvanceBooking) {
      violations.push(
        `Booking must be made at least ${policy.requireAdvanceBooking} day${policy.requireAdvanceBooking > 1 ? "s" : ""} in advance. Current booking is ${daysDifference} day${daysDifference !== 1 ? "s" : ""} before check-in`,
      )
      requiresApproval = true
    }
  }

  return {
    compliant: violations.length === 0,
    violations,
    requiresApproval,
  }
}

// Generate Hotel Booking ID: HT-YYYYMMDD-XXXX
export function generateHotelBookingId(): string {
  const now = new Date()
  const dateStr = now.toISOString().split("T")[0].replace(/-/g, "")
  const random = Math.floor(1000 + Math.random() * 9000) // 4-digit random number
  return `HT-${dateStr}-${random}`
}

// Generate Hotel Voucher Number
export function generateHotelVoucherNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let voucher = "VCH-"
  for (let i = 0; i < 8; i++) {
    voucher += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return voucher
}

// Validate GSTIN format
export function validateGSTIN(gstin: string): boolean {
  // GSTIN format: 15 characters - 2 digits (state code) + 10 chars (PAN) + 1 char (entity number) + 1 char (Z) + 1 char (check digit)
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  return gstinRegex.test(gstin.toUpperCase())
}

// Validate Indian mobile number
export function validateMobileNumber(mobile: string): boolean {
  const mobileDigits = mobile.replace(/\D/g, "")
  return mobileDigits.length === 10 && /^[6-9]/.test(mobileDigits)
}

// Validate name (alphabets only)
export function validateName(name: string): boolean {
  return /^[a-zA-Z\s]+$/.test(name) && name.trim().length >= 2
}


// Stage Management Utility
// Handles sequential stage transitions, validation, and audit logging

export type ModuleType = "FLIGHT" | "HOTEL" | "REFUND" | "DISPUTE" | "WALLET" | "KYC"

// Flight Stages
export const FLIGHT_STAGES = [
  "Search",
  "Listing",
  "Fare Review",
  "Passenger Details",
  "Ancillaries",
  "Payment Pending",
  "Booking Confirmed",
  "Ticketed",
  "Post-Booking",
] as const

// Hotel Stages
export const HOTEL_STAGES = [
  "Search",
  "Listing",
  "Hotel Details & Room Selection",
  "Guest Details + GST + Add-ons",
  "Payment Pending",
  "Booking Confirmed",
] as const

// Refund Stages
export const REFUND_STAGES = ["Refund Initiated", "Refund Processing", "Refund Completed"] as const

// Dispute Stages
export const DISPUTE_STAGES = [
  "Dispute Raised",
  "Acknowledged",
  "Under Review",
  "Awaiting Supplier",
  "Resolution Proposed",
  "Feedback Pending",
  "Closed",
] as const

// Wallet Stages
export const WALLET_STAGES = [
  "Transaction Created",
  "Balance Updated",
  "Transaction Logged",
  "Dispute (If Any)",
] as const

// KYC Stages
export const KYC_STAGES = ["Documents Submitted", "Verification in Progress", "Approved", "Rejected"] as const

export type FlightStage = (typeof FLIGHT_STAGES)[number]
export type HotelStage = (typeof HOTEL_STAGES)[number]
export type RefundStage = (typeof REFUND_STAGES)[number]
export type DisputeStage = (typeof DISPUTE_STAGES)[number]
export type WalletStage = (typeof WALLET_STAGES)[number]
export type KYCStage = (typeof KYC_STAGES)[number]

export type Stage = FlightStage | HotelStage | RefundStage | DisputeStage | WalletStage | KYCStage

// Stage transition rules - maps each stage to its allowed next stages
export const STAGE_TRANSITIONS: Record<ModuleType, Record<string, string[]>> = {
  FLIGHT: {
    Search: ["Listing"],
    Listing: ["Fare Review"],
    "Fare Review": ["Passenger Details"],
    "Passenger Details": ["Ancillaries"],
    Ancillaries: ["Payment Pending"],
    "Payment Pending": ["Booking Confirmed"],
    "Booking Confirmed": ["Ticketed"],
    Ticketed: ["Post-Booking"],
    "Post-Booking": [],
  },
  HOTEL: {
    Search: ["Listing"],
    Listing: ["Hotel Details & Room Selection"],
    "Hotel Details & Room Selection": ["Guest Details + GST + Add-ons"],
    "Guest Details + GST + Add-ons": ["Payment Pending"],
    "Payment Pending": ["Booking Confirmed"],
    "Booking Confirmed": [],
  },
  REFUND: {
    "Refund Initiated": ["Refund Processing"],
    "Refund Processing": ["Refund Completed"],
    "Refund Completed": [],
  },
  DISPUTE: {
    "Dispute Raised": ["Acknowledged"],
    Acknowledged: ["Under Review"],
    "Under Review": ["Awaiting Supplier", "Resolution Proposed"],
    "Awaiting Supplier": ["Resolution Proposed"],
    "Resolution Proposed": ["Feedback Pending", "Closed"],
    "Feedback Pending": ["Closed"],
    Closed: [],
  },
  WALLET: {
    "Transaction Created": ["Balance Updated"],
    "Balance Updated": ["Transaction Logged"],
    "Transaction Logged": ["Dispute (If Any)"],
    "Dispute (If Any)": [],
  },
  KYC: {
    "Documents Submitted": ["Verification in Progress"],
    "Verification in Progress": ["Approved", "Rejected"],
    Approved: [],
    Rejected: ["Documents Submitted"], // Allow resubmission
  },
}

// Mandatory fields for each stage transition
export interface MandatoryFields {
  [key: string]: string[] // stage name -> array of required field names
}

export const STAGE_MANDATORY_FIELDS: Record<ModuleType, MandatoryFields> = {
  FLIGHT: {
    Search: ["tripType", "origin", "destination", "dates", "travellers", "class", "specialFare"],
    Listing: ["selectedFlight", "fareType", "airline", "time", "price"],
    "Fare Review": ["fareAccepted"], // Must accept fare before proceeding
    "Passenger Details": ["name", "dob", "gender", "mobile", "email"],
    Ancillaries: [], // Optional, but if selected, validate
    "Payment Pending": ["paymentMethod", "payableAmount", "acceptTerms"],
  },
  HOTEL: {
    Search: ["location", "checkIn", "checkOut"],
    Listing: ["selectedHotel"],
    "Hotel Details & Room Selection": ["selectedRoom"],
    "Guest Details + GST + Add-ons": ["primaryGuestName", "primaryGuestMobile", "checkIn", "checkOut", "numberOfGuests"],
    "Payment Pending": ["paymentMethod", "acceptTerms"],
  },
  REFUND: {
    "Refund Initiated": ["bookingId", "reason", "type"],
    "Refund Processing": ["approvedRefundAmount"],
    "Refund Completed": ["refundMode"],
  },
  DISPUTE: {
    "Dispute Raised": ["category", "description", "bookingReference"],
    "Under Review": ["category", "description", "bookingReference"],
  },
  WALLET: {
    "Transaction Created": ["transactionType", "amount", "sourceModule"],
    "Balance Updated": ["updatedBalance"],
    "Transaction Logged": ["transactionId"],
  },
  KYC: {
    "Documents Submitted": ["panNumber", "gstCertificate", "addressProof", "documentUploads"],
    "Verification in Progress": ["panNumber", "gstCertificate", "addressProof"],
    Approved: ["verificationResult"],
  },
}

// Audit Log Entry
export interface AuditLogEntry {
  id: string
  timestamp: string // YYYY-MM-DD HH:MM:SS IST
  module: ModuleType
  referenceId: string // Booking ID, Hotel ID, etc.
  previousStage: string
  updatedStage: string
  updatedBy: string // User ID
  remarks?: string
  ipAddress?: string
}

// In-memory audit log store (in production, this would be a database)
let auditLogs: AuditLogEntry[] = []

export function getAuditLogs(module?: ModuleType, referenceId?: string): AuditLogEntry[] {
  let filtered = auditLogs
  if (module) {
    filtered = filtered.filter((log) => log.module === module)
  }
  if (referenceId) {
    filtered = filtered.filter((log) => log.referenceId === referenceId)
  }
  return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export function addAuditLog(entry: Omit<AuditLogEntry, "id" | "timestamp">): AuditLogEntry {
  const now = new Date()
  const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000) // Convert to IST
  const timestamp = istTime.toISOString().replace("T", " ").substring(0, 19) + " IST"

  const logEntry: AuditLogEntry = {
    id: `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp,
    ...entry,
  }

  auditLogs.push(logEntry)
  return logEntry
}

// Validate stage transition
export function canTransitionStage(
  module: ModuleType,
  currentStage: string,
  targetStage: string,
): { allowed: boolean; reason?: string } {
  const transitions = STAGE_TRANSITIONS[module]
  if (!transitions[currentStage]) {
    return { allowed: false, reason: `Invalid current stage: ${currentStage}` }
  }

  const allowedNextStages = transitions[currentStage]
  if (!allowedNextStages.includes(targetStage)) {
    return {
      allowed: false,
      reason: `Cannot transition from "${currentStage}" to "${targetStage}". Allowed next stages: ${allowedNextStages.join(", ")}`,
    }
  }

  return { allowed: true }
}

// Validate mandatory fields for a stage
export function validateMandatoryFields(
  module: ModuleType,
  stage: string,
  data: Record<string, any>,
): { valid: boolean; missingFields: string[] } {
  const mandatoryFields = STAGE_MANDATORY_FIELDS[module]
  const requiredFields = mandatoryFields[stage] || []

  const missingFields = requiredFields.filter((field) => {
    const value = data[field]
    return value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)
  })

  return {
    valid: missingFields.length === 0,
    missingFields,
  }
}

// Transition stage with validation and audit logging
export function transitionStage(
  module: ModuleType,
  referenceId: string,
  currentStage: string,
  targetStage: string,
  data: Record<string, any>,
  updatedBy: string,
  remarks?: string,
  ipAddress?: string,
): { success: boolean; error?: string; auditLog?: AuditLogEntry } {
  // 1. Validate transition is allowed
  const transitionCheck = canTransitionStage(module, currentStage, targetStage)
  if (!transitionCheck.allowed) {
    return { success: false, error: transitionCheck.reason }
  }

  // 2. Validate mandatory fields
  // Validation logic: Always validate the CURRENT stage fields when transitioning
  // The target stage will be validated when transitioning FROM it to the next stage
  // This ensures we validate what the user has completed, not what they're about to do
  // Example: Listing -> Fare Review: Validate Listing fields (selectedFlight, etc.)
  //          Fare Review -> Passenger Details: Validate Fare Review fields (fareAccepted)
  const stageToValidate = currentStage

  const fieldValidation = validateMandatoryFields(module, stageToValidate, data)
  if (!fieldValidation.valid) {
    return {
      success: false,
      error: `Missing mandatory fields for stage "${stageToValidate}": ${fieldValidation.missingFields.join(", ")}`,
    }
  }

  // 3. Create audit log
  const auditLog = addAuditLog({
    module,
    referenceId,
    previousStage: currentStage,
    updatedStage: targetStage,
    updatedBy,
    remarks,
    ipAddress,
  })

  return { success: true, auditLog }
}

// Bulk stage transition
export function bulkTransitionStage(
  module: ModuleType,
  items: Array<{
    referenceId: string
    currentStage: string
    targetStage: string
    data: Record<string, any>
  }>,
  updatedBy: string,
  remarks?: string,
  ipAddress?: string,
): {
  success: number
  failed: number
  results: Array<{
    referenceId: string
    success: boolean
    error?: string
    auditLog?: AuditLogEntry
  }>
} {
  const results = items.map((item) => {
    const result = transitionStage(
      module,
      item.referenceId,
      item.currentStage,
      item.targetStage,
      item.data,
      updatedBy,
      remarks,
      ipAddress,
    )
    return {
      referenceId: item.referenceId,
      ...result,
    }
  })

  const success = results.filter((r) => r.success).length
  const failed = results.filter((r) => !r.success).length

  return { success, failed, results }
}


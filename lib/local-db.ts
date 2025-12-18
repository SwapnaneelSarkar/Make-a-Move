// IndexedDB setup and CRUD operations for all tables

const DB_NAME = "TravelBookingDB"
const DB_VERSION = 4

// Table names
export const TABLES = {
  BOOKINGS: "bookings",
  TRANSACTIONS: "transactions",
  REFUNDS: "refunds",
  DISPUTES: "disputes",
  KYC_DOCUMENTS: "kyc_documents",
  NOTIFICATIONS: "notifications",
  LOGIN_HISTORY: "login_history",
  AUDIT_LOGS: "audit_logs",
  SCHEDULED_REPORTS: "scheduled_reports",
  PROMOTIONAL_BANNERS: "promotional_banners",
  WALLET_DEPOSIT_REQUESTS: "wallet_deposit_requests",
  AGENT_STATUS: "agent_status",
  GROUP_BOOKINGS: "group_bookings",
  TICKET_LOCKS: "ticket_locks",
} as const

// Types
export interface Booking {
  id: string
  bookingId: string // FL-YYYYMMDD-XXXX or HT-YYYYMMDD-XXXX
  pnr: string // 6-char alphanumeric
  type: "FLIGHT" | "HOTEL"
  status: "CONFIRMED" | "PENDING_APPROVAL" | "CANCELLED" | "COMPLETED" | "REFUNDED"
  details: any
  date: string
  amount: number
  agentName: string
  agentId: string
  approvalStatus?: "APPROVED" | "REJECTED" | "PENDING"
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: "CREDIT" | "DEBIT" | "REFUND"
  status: "Completed" | "Pending" | "Failed"
  paymentMethod: string
  productType: "Flight" | "Hotel" | "Wallet Top-up" | "Refund"
  bookingId?: string
  balanceAfter: number
  maskedData?: {
    phone?: string
    email?: string
  }
  createdAt: string
}

export interface Refund {
  id: string
  refundId: string
  bookingId: string
  reason: string
  type: "FULL" | "PARTIAL"
  amount: number
  status: "Initiated" | "Processing" | "Completed" | "Rejected"
  description?: string
  timeline: Array<{ stage: string; date: string; status: string }>
  createdAt: string
  updatedAt: string
}

export interface Dispute {
  id: string
  disputeId: string
  transactionId?: string
  bookingId?: string
  title: string
  category: string
  status: "Raised" | "Acknowledged" | "Under Review" | "Resolution Proposed" | "Closed"
  messages: Array<{ id: string; userId: string; userName: string; message: string; timestamp: string }>
  resolution?: string
  createdAt: string
  updatedAt: string
}

export interface KYCDocument {
  id: string
  userId: string
  documentType: string
  fileName: string
  fileData: string // base64
  fileType: string
  status: "Pending" | "Approved" | "Rejected"
  expiryDate?: string
  reviewedBy?: string
  reviewedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: string
  read: boolean
  userId?: string
  createdAt: string
}

export interface LoginHistory {
  id: string
  userId: string
  device: string
  browser: string
  ipAddress: string
  location?: string
  loginTime: string
  logoutTime?: string
  active: boolean
}

export interface AuditLog {
  id: string
  timestamp: string
  userId: string
  role: string
  action: string
  module: string
  recordId?: string
  previousValue?: any
  newValue?: any
  ipAddress: string
}

export interface ScheduledReport {
  id: string
  reportId: string
  name: string
  type: string
  frequency: "Daily" | "Weekly" | "Monthly"
  status: "Scheduled" | "Processing" | "Ready" | "Failed"
  size?: number
  generatedAt?: string
  createdAt: string
}

export interface PromotionalBanner {
  id: string
  title: string
  imageUrl: string
  link?: string
  expiryDate?: string
  active: boolean
  clicks: number
  createdAt: string
  updatedAt: string
}

export interface WalletDepositRequest {
  id: string
  requestId: string
  agentId: string
  agentName: string
  amount: number
  proofType: "Bank Transfer Screenshot" | "Payment Receipt"
  proofFile: string // base64 or file path
  status: "Pending" | "Approved" | "Rejected"
  requestedAmount?: number // Amount approved by finance team
  rejectionReason?: string
  approvedBy?: string
  approvedAt?: string
  createdAt: string
  updatedAt: string
}

export interface AgentStatus {
  id: string
  agentId: string
  status: "Active" | "Suspended"
  reason?: string
  suspendedBy?: string
  suspendedAt?: string
  reactivatedBy?: string
  reactivatedAt?: string
  createdAt: string
  updatedAt: string
}

export interface GroupBookingRequest {
  id: string
  reference: string
  flightId?: string
  origin: string
  destination: string
  departureDate?: string
  returnDate?: string
  classType: string
  isInternational: boolean
  passengers: {
    adults: number
    children: number
    infants: number
    total: number
  }
  expectedQuote?: string
  notes?: string
  status: "NEW" | "QUOTE_SHARED" | "AWAITING_AGENT" | "CONFIRMED" | "CLOSED"
  quoteAmount?: string
  validUntil?: string
  nextSteps?: string
  submittedBy: string
  agentEmail?: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
}

export interface TicketLock {
  id: string
  lockId: string
  flightId: string
  flightDetails: any // Store full flight object
  lockedPrice: number // Total price for all tickets
  pricePerTicket: number // Price per individual ticket
  quantity: number // Number of tickets locked (1-9)
  lockedAt: string
  expiresAt: string // 48 hours from lockedAt
  status: "LOCKED" | "EXPIRED" | "CONVERTED" | "CANCELLED"
  agentId: string
  agentName: string
  searchData: {
    origin: string
    destination: string
    departureDate: string
    returnDate?: string
    travellers: string
    class: string
    tripType: string
    isInternational: boolean
  }
  passengerDetails?: any
  passengerCount?: any
  ancillaries?: any
  seatSelections?: string[]
  createdAt: string
  updatedAt: string
}

// Database initialization
let dbInstance: IDBDatabase | null = null

export async function initDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      dbInstance = request.result
      resolve(dbInstance)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Create object stores
      if (!db.objectStoreNames.contains(TABLES.BOOKINGS)) {
        const bookingsStore = db.createObjectStore(TABLES.BOOKINGS, { keyPath: "id" })
        bookingsStore.createIndex("bookingId", "bookingId", { unique: true })
        bookingsStore.createIndex("agentId", "agentId")
        bookingsStore.createIndex("status", "status")
        bookingsStore.createIndex("date", "date")
      }

      if (!db.objectStoreNames.contains(TABLES.TRANSACTIONS)) {
        const txStore = db.createObjectStore(TABLES.TRANSACTIONS, { keyPath: "id" })
        txStore.createIndex("date", "date")
        txStore.createIndex("type", "type")
        txStore.createIndex("status", "status")
        txStore.createIndex("bookingId", "bookingId")
      }

      if (!db.objectStoreNames.contains(TABLES.REFUNDS)) {
        const refundsStore = db.createObjectStore(TABLES.REFUNDS, { keyPath: "id" })
        refundsStore.createIndex("refundId", "refundId", { unique: true })
        refundsStore.createIndex("bookingId", "bookingId")
        refundsStore.createIndex("status", "status")
      }

      if (!db.objectStoreNames.contains(TABLES.DISPUTES)) {
        const disputesStore = db.createObjectStore(TABLES.DISPUTES, { keyPath: "id" })
        disputesStore.createIndex("disputeId", "disputeId", { unique: true })
        disputesStore.createIndex("status", "status")
      }

      if (!db.objectStoreNames.contains(TABLES.KYC_DOCUMENTS)) {
        const kycStore = db.createObjectStore(TABLES.KYC_DOCUMENTS, { keyPath: "id" })
        kycStore.createIndex("userId", "userId")
        kycStore.createIndex("status", "status")
      }

      if (!db.objectStoreNames.contains(TABLES.NOTIFICATIONS)) {
        const notifStore = db.createObjectStore(TABLES.NOTIFICATIONS, { keyPath: "id" })
        notifStore.createIndex("userId", "userId")
        notifStore.createIndex("read", "read")
        notifStore.createIndex("createdAt", "createdAt")
      }

      if (!db.objectStoreNames.contains(TABLES.LOGIN_HISTORY)) {
        const loginStore = db.createObjectStore(TABLES.LOGIN_HISTORY, { keyPath: "id" })
        loginStore.createIndex("userId", "userId")
        loginStore.createIndex("loginTime", "loginTime")
      }

      if (!db.objectStoreNames.contains(TABLES.AUDIT_LOGS)) {
        const auditStore = db.createObjectStore(TABLES.AUDIT_LOGS, { keyPath: "id" })
        auditStore.createIndex("timestamp", "timestamp")
        auditStore.createIndex("userId", "userId")
        auditStore.createIndex("module", "module")
        auditStore.createIndex("action", "action")
      }

      if (!db.objectStoreNames.contains(TABLES.SCHEDULED_REPORTS)) {
        const reportsStore = db.createObjectStore(TABLES.SCHEDULED_REPORTS, { keyPath: "id" })
        reportsStore.createIndex("reportId", "reportId", { unique: true })
        reportsStore.createIndex("status", "status")
      }

      if (!db.objectStoreNames.contains(TABLES.PROMOTIONAL_BANNERS)) {
        const bannersStore = db.createObjectStore(TABLES.PROMOTIONAL_BANNERS, { keyPath: "id" })
        bannersStore.createIndex("active", "active")
      }

      if (!db.objectStoreNames.contains(TABLES.WALLET_DEPOSIT_REQUESTS)) {
        const depositStore = db.createObjectStore(TABLES.WALLET_DEPOSIT_REQUESTS, { keyPath: "id" })
        depositStore.createIndex("requestId", "requestId", { unique: true })
        depositStore.createIndex("agentId", "agentId")
        depositStore.createIndex("status", "status")
      }

      if (!db.objectStoreNames.contains(TABLES.AGENT_STATUS)) {
        const statusStore = db.createObjectStore(TABLES.AGENT_STATUS, { keyPath: "id" })
        statusStore.createIndex("agentId", "agentId", { unique: true })
        statusStore.createIndex("status", "status")
      }

      if (!db.objectStoreNames.contains(TABLES.GROUP_BOOKINGS)) {
        const groupStore = db.createObjectStore(TABLES.GROUP_BOOKINGS, { keyPath: "id" })
        groupStore.createIndex("reference", "reference", { unique: true })
        groupStore.createIndex("status", "status")
        groupStore.createIndex("createdAt", "createdAt")
      }

      if (!db.objectStoreNames.contains(TABLES.TICKET_LOCKS)) {
        const locksStore = db.createObjectStore(TABLES.TICKET_LOCKS, { keyPath: "id" })
        locksStore.createIndex("lockId", "lockId", { unique: true })
        locksStore.createIndex("agentId", "agentId")
        locksStore.createIndex("status", "status")
        locksStore.createIndex("expiresAt", "expiresAt")
        locksStore.createIndex("flightId", "flightId")
      }
    }
  })
}

// Helper to generate IDs
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function generateBookingId(type: "FLIGHT" | "HOTEL"): string {
  const prefix = type === "FLIGHT" ? "FL" : "HT"
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "")
  const random = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `${prefix}-${date}-${random}`
}

function generatePNR(): string {
  return Math.random().toString(36).substr(2, 6).toUpperCase()
}

// Generic CRUD functions
async function create<T extends { id: string }>(table: string, data: Omit<T, "id">): Promise<T> {
  const db = await initDB()
  
  // Check if object store exists
  if (!db.objectStoreNames.contains(table)) {
    throw new Error(`Object store "${table}" does not exist. Please upgrade the database.`)
  }
  
  const tx = db.transaction(table, "readwrite")
  const store = tx.objectStore(table)

  const newData = { ...data, id: generateId() } as T

  return new Promise((resolve, reject) => {
    const request = store.add(newData)
    request.onsuccess = () => resolve(newData)
    request.onerror = () => reject(request.error)
  })
}

async function read<T>(table: string, id: string): Promise<T | undefined> {
  const db = await initDB()
  
  // Check if object store exists
  if (!db.objectStoreNames.contains(table)) {
    console.warn(`Object store "${table}" does not exist. Returning undefined.`)
    return undefined
  }
  
  const tx = db.transaction(table, "readonly")
  const store = tx.objectStore(table)

  return new Promise((resolve, reject) => {
    const request = store.get(id)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function readAll<T>(table: string): Promise<T[]> {
  const db = await initDB()
  
  // Check if object store exists
  if (!db.objectStoreNames.contains(table)) {
    console.warn(`Object store "${table}" does not exist. Returning empty array.`)
    return []
  }
  
  const tx = db.transaction(table, "readonly")
  const store = tx.objectStore(table)

  return new Promise((resolve, reject) => {
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result || [])
    request.onerror = () => reject(request.error)
  })
}

async function update<T extends { id: string }>(table: string, id: string, data: Partial<T>): Promise<T> {
  const db = await initDB()
  
  // Check if object store exists
  if (!db.objectStoreNames.contains(table)) {
    throw new Error(`Object store "${table}" does not exist. Please upgrade the database.`)
  }
  
  const tx = db.transaction(table, "readwrite")
  const store = tx.objectStore(table)

  return new Promise((resolve, reject) => {
    const getRequest = store.get(id)
    getRequest.onsuccess = () => {
      const existing = getRequest.result
      if (!existing) {
        reject(new Error("Record not found"))
        return
      }
      const updated = { ...existing, ...data, id } as T
      const putRequest = store.put(updated)
      putRequest.onsuccess = () => resolve(updated)
      putRequest.onerror = () => reject(putRequest.error)
    }
    getRequest.onerror = () => reject(getRequest.error)
  })
}

async function remove(table: string, id: string): Promise<void> {
  const db = await initDB()
  
  // Check if object store exists
  if (!db.objectStoreNames.contains(table)) {
    throw new Error(`Object store "${table}" does not exist. Please upgrade the database.`)
  }
  
  const tx = db.transaction(table, "readwrite")
  const store = tx.objectStore(table)

  return new Promise((resolve, reject) => {
    const request = store.delete(id)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

async function search<T>(table: string, query: (item: T) => boolean): Promise<T[]> {
  const all = await readAll<T>(table)
  return all.filter(query)
}

async function filter<T>(table: string, filters: Record<string, any>): Promise<T[]> {
  const all = await readAll<T>(table)
  return all.filter((item: any) => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null || value === "all") return true
      return item[key] === value
    })
  })
}

// Bookings CRUD
export const bookingsDB = {
  create: async (data: Omit<Booking, "id" | "bookingId" | "pnr" | "createdAt" | "updatedAt">): Promise<Booking> => {
    const now = new Date().toISOString()
    const bookingId = generateBookingId(data.type)
    const pnr = generatePNR()
    return create<Booking>(TABLES.BOOKINGS, {
      ...data,
      bookingId,
      pnr,
      createdAt: now,
      updatedAt: now,
    })
  },
  read: (id: string) => read<Booking>(TABLES.BOOKINGS, id),
  readAll: () => readAll<Booking>(TABLES.BOOKINGS),
  update: (id: string, data: Partial<Booking>) =>
    update<Booking>(TABLES.BOOKINGS, id, { ...data, updatedAt: new Date().toISOString() }),
  delete: (id: string) => remove(TABLES.BOOKINGS, id),
  search: (query: (item: Booking) => boolean) => search<Booking>(TABLES.BOOKINGS, query),
  filter: (filters: Record<string, any>) => filter<Booking>(TABLES.BOOKINGS, filters),
}

// Transactions CRUD
export const transactionsDB = {
  create: async (data: Omit<Transaction, "id" | "createdAt">): Promise<Transaction> => {
    return create<Transaction>(TABLES.TRANSACTIONS, {
      ...data,
      createdAt: new Date().toISOString(),
    })
  },
  read: (id: string) => read<Transaction>(TABLES.TRANSACTIONS, id),
  readAll: () => readAll<Transaction>(TABLES.TRANSACTIONS),
  update: (id: string, data: Partial<Transaction>) => update<Transaction>(TABLES.TRANSACTIONS, id, data),
  delete: (id: string) => remove(TABLES.TRANSACTIONS, id),
  search: (query: (item: Transaction) => boolean) => search<Transaction>(TABLES.TRANSACTIONS, query),
  filter: (filters: Record<string, any>) => filter<Transaction>(TABLES.TRANSACTIONS, filters),
}

// Refunds CRUD
export const refundsDB = {
  create: async (data: Omit<Refund, "id" | "refundId" | "timeline" | "createdAt" | "updatedAt">): Promise<Refund> => {
    const now = new Date().toISOString()
    const refundId = `REF-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
    return create<Refund>(TABLES.REFUNDS, {
      ...data,
      refundId,
      status: "Initiated",
      timeline: [{ stage: "Initiated", date: now, status: "completed" }],
      createdAt: now,
      updatedAt: now,
    })
  },
  read: (id: string) => read<Refund>(TABLES.REFUNDS, id),
  readAll: () => readAll<Refund>(TABLES.REFUNDS),
  update: (id: string, data: Partial<Refund>) =>
    update<Refund>(TABLES.REFUNDS, id, { ...data, updatedAt: new Date().toISOString() }),
  delete: (id: string) => remove(TABLES.REFUNDS, id),
  search: (query: (item: Refund) => boolean) => search<Refund>(TABLES.REFUNDS, query),
  filter: (filters: Record<string, any>) => filter<Refund>(TABLES.REFUNDS, filters),
}

// Disputes CRUD
export const disputesDB = {
  create: async (data: Omit<Dispute, "id" | "disputeId" | "messages" | "createdAt" | "updatedAt">): Promise<Dispute> => {
    const now = new Date().toISOString()
    const disputeId = `DSP-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 3)}`
    return create<Dispute>(TABLES.DISPUTES, {
      ...data,
      disputeId,
      status: "Raised",
      messages: [],
      createdAt: now,
      updatedAt: now,
    })
  },
  read: (id: string) => read<Dispute>(TABLES.DISPUTES, id),
  readAll: () => readAll<Dispute>(TABLES.DISPUTES),
  update: (id: string, data: Partial<Dispute>) =>
    update<Dispute>(TABLES.DISPUTES, id, { ...data, updatedAt: new Date().toISOString() }),
  delete: (id: string) => remove(TABLES.DISPUTES, id),
  search: (query: (item: Dispute) => boolean) => search<Dispute>(TABLES.DISPUTES, query),
  filter: (filters: Record<string, any>) => filter<Dispute>(TABLES.DISPUTES, filters),
}

// KYC Documents CRUD
export const kycDB = {
  create: async (data: Omit<KYCDocument, "id" | "createdAt" | "updatedAt">): Promise<KYCDocument> => {
    const now = new Date().toISOString()
    return create<KYCDocument>(TABLES.KYC_DOCUMENTS, {
      ...data,
      status: "Pending",
      createdAt: now,
      updatedAt: now,
    })
  },
  read: (id: string) => read<KYCDocument>(TABLES.KYC_DOCUMENTS, id),
  readAll: () => readAll<KYCDocument>(TABLES.KYC_DOCUMENTS),
  update: (id: string, data: Partial<KYCDocument>) =>
    update<KYCDocument>(TABLES.KYC_DOCUMENTS, id, { ...data, updatedAt: new Date().toISOString() }),
  delete: (id: string) => remove(TABLES.KYC_DOCUMENTS, id),
  search: (query: (item: KYCDocument) => boolean) => search<KYCDocument>(TABLES.KYC_DOCUMENTS, query),
  filter: (filters: Record<string, any>) => filter<KYCDocument>(TABLES.KYC_DOCUMENTS, filters),
}

// Notifications CRUD
export const notificationsDB = {
  create: async (data: Omit<Notification, "id" | "read" | "createdAt">): Promise<Notification> => {
    return create<Notification>(TABLES.NOTIFICATIONS, {
      ...data,
      read: false,
      createdAt: new Date().toISOString(),
    })
  },
  read: (id: string) => read<Notification>(TABLES.NOTIFICATIONS, id),
  readAll: () => readAll<Notification>(TABLES.NOTIFICATIONS),
  update: (id: string, data: Partial<Notification>) => update<Notification>(TABLES.NOTIFICATIONS, id, data),
  delete: (id: string) => remove(TABLES.NOTIFICATIONS, id),
  search: (query: (item: Notification) => boolean) => search<Notification>(TABLES.NOTIFICATIONS, query),
  filter: (filters: Record<string, any>) => filter<Notification>(TABLES.NOTIFICATIONS, filters),
}

// Login History CRUD
export const loginHistoryDB = {
  create: async (data: Omit<LoginHistory, "id">): Promise<LoginHistory> => {
    return create<LoginHistory>(TABLES.LOGIN_HISTORY, data)
  },
  read: (id: string) => read<LoginHistory>(TABLES.LOGIN_HISTORY, id),
  readAll: () => readAll<LoginHistory>(TABLES.LOGIN_HISTORY),
  update: (id: string, data: Partial<LoginHistory>) => update<LoginHistory>(TABLES.LOGIN_HISTORY, id, data),
  delete: (id: string) => remove(TABLES.LOGIN_HISTORY, id),
  search: (query: (item: LoginHistory) => boolean) => search<LoginHistory>(TABLES.LOGIN_HISTORY, query),
  filter: (filters: Record<string, any>) => filter<LoginHistory>(TABLES.LOGIN_HISTORY, filters),
}

// Audit Logs CRUD
export const auditLogsDB = {
  create: async (data: Omit<AuditLog, "id" | "timestamp">): Promise<AuditLog> => {
    return create<AuditLog>(TABLES.AUDIT_LOGS, {
      ...data,
      timestamp: new Date().toISOString(),
    })
  },
  read: (id: string) => read<AuditLog>(TABLES.AUDIT_LOGS, id),
  readAll: () => readAll<AuditLog>(TABLES.AUDIT_LOGS),
  update: (id: string, data: Partial<AuditLog>) => update<AuditLog>(TABLES.AUDIT_LOGS, id, data),
  delete: (id: string) => remove(TABLES.AUDIT_LOGS, id),
  search: (query: (item: AuditLog) => boolean) => search<AuditLog>(TABLES.AUDIT_LOGS, query),
  filter: (filters: Record<string, any>) => filter<AuditLog>(TABLES.AUDIT_LOGS, filters),
}

// Scheduled Reports CRUD
export const scheduledReportsDB = {
  create: async (data: Omit<ScheduledReport, "id" | "reportId" | "createdAt">): Promise<ScheduledReport> => {
    const reportId = `RPT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
    return create<ScheduledReport>(TABLES.SCHEDULED_REPORTS, {
      ...data,
      reportId,
      status: "Scheduled",
      createdAt: new Date().toISOString(),
    })
  },
  read: (id: string) => read<ScheduledReport>(TABLES.SCHEDULED_REPORTS, id),
  readAll: () => readAll<ScheduledReport>(TABLES.SCHEDULED_REPORTS),
  update: (id: string, data: Partial<ScheduledReport>) => update<ScheduledReport>(TABLES.SCHEDULED_REPORTS, id, data),
  delete: (id: string) => remove(TABLES.SCHEDULED_REPORTS, id),
  search: (query: (item: ScheduledReport) => boolean) => search<ScheduledReport>(TABLES.SCHEDULED_REPORTS, query),
  filter: (filters: Record<string, any>) => filter<ScheduledReport>(TABLES.SCHEDULED_REPORTS, filters),
}

// Promotional Banners CRUD
export const promotionalBannersDB = {
  create: async (data: Omit<PromotionalBanner, "id" | "clicks" | "createdAt" | "updatedAt">): Promise<PromotionalBanner> => {
    const now = new Date().toISOString()
    return create<PromotionalBanner>(TABLES.PROMOTIONAL_BANNERS, {
      ...data,
      clicks: 0,
      createdAt: now,
      updatedAt: now,
    })
  },
  read: (id: string) => read<PromotionalBanner>(TABLES.PROMOTIONAL_BANNERS, id),
  readAll: () => readAll<PromotionalBanner>(TABLES.PROMOTIONAL_BANNERS),
  update: (id: string, data: Partial<PromotionalBanner>) =>
    update<PromotionalBanner>(TABLES.PROMOTIONAL_BANNERS, id, { ...data, updatedAt: new Date().toISOString() }),
  delete: (id: string) => remove(TABLES.PROMOTIONAL_BANNERS, id),
  search: (query: (item: PromotionalBanner) => boolean) => search<PromotionalBanner>(TABLES.PROMOTIONAL_BANNERS, query),
  filter: (filters: Record<string, any>) => filter<PromotionalBanner>(TABLES.PROMOTIONAL_BANNERS, filters),
}

// Wallet Deposit Requests CRUD
export const walletDepositRequestsDB = {
  create: async (data: Omit<WalletDepositRequest, "id" | "requestId" | "status" | "createdAt" | "updatedAt">): Promise<WalletDepositRequest> => {
    const now = new Date().toISOString()
    const requestId = `DEP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
    return create<WalletDepositRequest>(TABLES.WALLET_DEPOSIT_REQUESTS, {
      ...data,
      requestId,
      status: "Pending",
      createdAt: now,
      updatedAt: now,
    })
  },
  read: (id: string) => read<WalletDepositRequest>(TABLES.WALLET_DEPOSIT_REQUESTS, id),
  readAll: () => readAll<WalletDepositRequest>(TABLES.WALLET_DEPOSIT_REQUESTS),
  update: (id: string, data: Partial<WalletDepositRequest>) =>
    update<WalletDepositRequest>(TABLES.WALLET_DEPOSIT_REQUESTS, id, { ...data, updatedAt: new Date().toISOString() }),
  delete: (id: string) => remove(TABLES.WALLET_DEPOSIT_REQUESTS, id),
  search: (query: (item: WalletDepositRequest) => boolean) => search<WalletDepositRequest>(TABLES.WALLET_DEPOSIT_REQUESTS, query),
  filter: (filters: Record<string, any>) => filter<WalletDepositRequest>(TABLES.WALLET_DEPOSIT_REQUESTS, filters),
}

// Agent Status CRUD
export const agentStatusDB = {
  create: async (data: Omit<AgentStatus, "id" | "createdAt" | "updatedAt">): Promise<AgentStatus> => {
    const now = new Date().toISOString()
    return create<AgentStatus>(TABLES.AGENT_STATUS, {
      ...data,
      status: data.status || "Active",
      createdAt: now,
      updatedAt: now,
    })
  },
  read: (id: string) => read<AgentStatus>(TABLES.AGENT_STATUS, id),
  readByAgentId: async (agentId: string): Promise<AgentStatus | undefined> => {
    const all = await readAll<AgentStatus>(TABLES.AGENT_STATUS)
    return all.find((s) => s.agentId === agentId)
  },
  readAll: () => readAll<AgentStatus>(TABLES.AGENT_STATUS),
  update: (id: string, data: Partial<AgentStatus>) =>
    update<AgentStatus>(TABLES.AGENT_STATUS, id, { ...data, updatedAt: new Date().toISOString() }),
  updateByAgentId: async (agentId: string, data: Partial<AgentStatus>): Promise<AgentStatus | undefined> => {
    const existing = await agentStatusDB.readByAgentId(agentId)
    if (existing) {
      return update<AgentStatus>(TABLES.AGENT_STATUS, existing.id, { ...data, updatedAt: new Date().toISOString() })
    }
    // Create if doesn't exist
    return agentStatusDB.create({ agentId, ...data } as Omit<AgentStatus, "id" | "createdAt" | "updatedAt">)
  },
  delete: (id: string) => remove(TABLES.AGENT_STATUS, id),
  search: (query: (item: AgentStatus) => boolean) => search<AgentStatus>(TABLES.AGENT_STATUS, query),
  filter: (filters: Record<string, any>) => filter<AgentStatus>(TABLES.AGENT_STATUS, filters),
}

// Group Bookings CRUD
export const groupBookingsDB = {
  create: async (
    data: Omit<GroupBookingRequest, "id" | "reference" | "createdAt" | "updatedAt">,
  ): Promise<GroupBookingRequest> => {
    const now = new Date().toISOString()
    const reference = `GRP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random()
      .toString(36)
      .substr(2, 4)
      .toUpperCase()}`
    return create<GroupBookingRequest>(TABLES.GROUP_BOOKINGS, {
      ...data,
      reference,
      createdAt: now,
      updatedAt: now,
    })
  },
  read: (id: string) => read<GroupBookingRequest>(TABLES.GROUP_BOOKINGS, id),
  readAll: () => readAll<GroupBookingRequest>(TABLES.GROUP_BOOKINGS),
  update: (id: string, data: Partial<GroupBookingRequest>) =>
    update<GroupBookingRequest>(TABLES.GROUP_BOOKINGS, id, { ...data, updatedAt: new Date().toISOString() }),
  delete: (id: string) => remove(TABLES.GROUP_BOOKINGS, id),
  search: (query: (item: GroupBookingRequest) => boolean) => search<GroupBookingRequest>(TABLES.GROUP_BOOKINGS, query),
  filter: (filters: Record<string, any>) => filter<GroupBookingRequest>(TABLES.GROUP_BOOKINGS, filters),
}

// Ticket Locks CRUD
export const ticketLocksDB = {
  create: async (
    data: Omit<TicketLock, "id" | "lockId" | "lockedAt" | "expiresAt" | "status" | "createdAt" | "updatedAt">,
  ): Promise<TicketLock> => {
    const now = new Date().toISOString()
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() // 48 hours from now
    const lockId = `LOCK-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random()
      .toString(36)
      .substr(2, 4)
      .toUpperCase()}`
    
    // Calculate defaults for quantity and pricePerTicket if not provided
    const quantity = data.quantity || 1
    const pricePerTicket = data.pricePerTicket || (data.lockedPrice / quantity)
    
    return create<TicketLock>(TABLES.TICKET_LOCKS, {
      ...data,
      quantity,
      pricePerTicket,
      lockId,
      lockedAt: now,
      expiresAt,
      status: "LOCKED",
      createdAt: now,
      updatedAt: now,
    })
  },
  read: (id: string) => read<TicketLock>(TABLES.TICKET_LOCKS, id),
  readAll: () => readAll<TicketLock>(TABLES.TICKET_LOCKS),
  update: (id: string, data: Partial<TicketLock>) =>
    update<TicketLock>(TABLES.TICKET_LOCKS, id, { ...data, updatedAt: new Date().toISOString() }),
  delete: (id: string) => remove(TABLES.TICKET_LOCKS, id),
  search: (query: (item: TicketLock) => boolean) => search<TicketLock>(TABLES.TICKET_LOCKS, query),
  filter: (filters: Record<string, any>) => filter<TicketLock>(TABLES.TICKET_LOCKS, filters),
  readByAgentId: async (agentId: string): Promise<TicketLock[]> => {
    const all = await readAll<TicketLock>(TABLES.TICKET_LOCKS)
    return all.filter((lock) => lock.agentId === agentId && lock.status === "LOCKED")
  },
  readActive: async (): Promise<TicketLock[]> => {
    const all = await readAll<TicketLock>(TABLES.TICKET_LOCKS)
    const now = new Date().toISOString()
    return all.filter((lock) => lock.status === "LOCKED" && lock.expiresAt > now)
  },
}


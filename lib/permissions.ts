// Permission system for role-based access control with View/Edit/Approve granularity

import { type Role } from "./mock-data"

export type PermissionAction = "view" | "edit" | "approve"

export interface PermissionSet {
  view: boolean
  edit: boolean
  approve: boolean
}

export interface Permissions {
  // Booking Modules
  bookings: PermissionSet
  allBookings: PermissionSet
  ownBookings: PermissionSet
  passengerDetails: PermissionSet
  guestDetails: PermissionSet

  // Wallet & Financial
  wallet: PermissionSet
  walletTransactions: PermissionSet
  walletTopUps: PermissionSet
  refunds: PermissionSet
  invoices: PermissionSet
  financialReports: PermissionSet
  markups: PermissionSet

  // User Management
  agents: PermissionSet
  allAgents: PermissionSet
  agentProfiles: PermissionSet
  userRoles: PermissionSet

  // Agency Management
  agencyBookings: PermissionSet
  agentPerformance: PermissionSet
  agencySettings: PermissionSet

  // Admin & Settings
  systemSettings: PermissionSet
  auditLogs: PermissionSet
  policies: PermissionSet
  reports: PermissionSet
  erpIntegration: PermissionSet

  // Support & Disputes
  disputes: PermissionSet
  supportTickets: PermissionSet
  communicationLogs: PermissionSet

  // KYC & Compliance
  kycDocuments: PermissionSet
  businessDetails: PermissionSet
  kycVerification: PermissionSet

  // Dashboard
  dashboardPersonalization: boolean
  usageInsights: boolean

  // Bulk Operations
  bulkOperations: boolean
}

const PERMISSIONS: Record<Role, Permissions> = {
  SUPER_ADMIN: {
    // Booking
    bookings: { view: true, edit: true, approve: true },
    allBookings: { view: true, edit: true, approve: true },
    ownBookings: { view: true, edit: true, approve: true },
    passengerDetails: { view: true, edit: true, approve: true },
    guestDetails: { view: true, edit: true, approve: true },

    // Wallet & Financial
    wallet: { view: true, edit: false, approve: false }, // View-only: Super Admin has no wallet, can only view agent wallets
    walletTransactions: { view: true, edit: false, approve: false }, // View-only for agent transactions
    walletTopUps: { view: true, edit: false, approve: true }, // Can approve deposit requests but not add own funds
    refunds: { view: true, edit: true, approve: true },
    invoices: { view: true, edit: true, approve: true },
    financialReports: { view: true, edit: true, approve: true },
    markups: { view: true, edit: true, approve: true },

    // User Management
    agents: { view: true, edit: true, approve: true },
    allAgents: { view: true, edit: true, approve: true },
    agentProfiles: { view: true, edit: true, approve: true },
    userRoles: { view: true, edit: true, approve: true },

    // Agency Management
    agencyBookings: { view: true, edit: true, approve: true },
    agentPerformance: { view: true, edit: true, approve: true },
    agencySettings: { view: true, edit: true, approve: true },

    // Admin & Settings
    systemSettings: { view: true, edit: true, approve: true },
    auditLogs: { view: true, edit: true, approve: true },
    policies: { view: true, edit: true, approve: true },
    reports: { view: true, edit: true, approve: true },
    erpIntegration: { view: true, edit: true, approve: true },

    // Support & Disputes
    disputes: { view: true, edit: true, approve: true },
    supportTickets: { view: true, edit: true, approve: true },
    communicationLogs: { view: true, edit: true, approve: true },

    // KYC & Compliance
    kycDocuments: { view: true, edit: true, approve: true },
    businessDetails: { view: true, edit: true, approve: true },
    kycVerification: { view: true, edit: true, approve: true },

    // Dashboard
    dashboardPersonalization: true,
    usageInsights: true,

    // Bulk Operations
    bulkOperations: true,
  },

  AGENCY_ADMIN: {
    // Booking
    bookings: { view: true, edit: true, approve: false },
    allBookings: { view: true, edit: true, approve: false }, // Agency bookings only
    ownBookings: { view: true, edit: true, approve: false },
    passengerDetails: { view: true, edit: true, approve: false }, // Before confirmation
    guestDetails: { view: true, edit: true, approve: false }, // Before confirmation

    // Wallet & Financial
    wallet: { view: true, edit: true, approve: true }, // Agency wallet
    walletTransactions: { view: true, edit: false, approve: false },
    walletTopUps: { view: true, edit: false, approve: true }, // For agents
    refunds: { view: true, edit: false, approve: false },
    invoices: { view: true, edit: false, approve: false },
    financialReports: { view: true, edit: false, approve: false }, // Agency-level
    markups: { view: true, edit: true, approve: false }, // Agent-level markups

    // User Management
    agents: { view: true, edit: true, approve: true }, // Agent activation
    allAgents: { view: true, edit: true, approve: true }, // Agency agents
    agentProfiles: { view: true, edit: true, approve: false },
    userRoles: { view: false, edit: false, approve: false },

    // Agency Management
    agencyBookings: { view: true, edit: true, approve: false },
    agentPerformance: { view: true, edit: false, approve: false },
    agencySettings: { view: true, edit: true, approve: false }, // GST details

    // Admin & Settings
    systemSettings: { view: false, edit: false, approve: false },
    auditLogs: { view: false, edit: false, approve: false },
    policies: { view: true, edit: true, approve: false }, // Agency policies
    reports: { view: true, edit: false, approve: false }, // Agency reports
    erpIntegration: { view: false, edit: false, approve: false },

    // Support & Disputes
    disputes: { view: true, edit: false, approve: false }, // Can raise, view status
    supportTickets: { view: true, edit: false, approve: false },
    communicationLogs: { view: true, edit: false, approve: false },

    // KYC & Compliance
    kycDocuments: { view: true, edit: false, approve: false }, // Own agency
    businessDetails: { view: true, edit: true, approve: false }, // GST details
    kycVerification: { view: false, edit: false, approve: false },

    // Dashboard
    dashboardPersonalization: true,
    usageInsights: true,

    // Bulk Operations
    bulkOperations: false,
  },

  AGENT: {
    // Booking
    bookings: { view: true, edit: true, approve: false },
    allBookings: { view: false, edit: false, approve: false },
    ownBookings: { view: true, edit: true, approve: false },
    passengerDetails: { view: true, edit: true, approve: false }, // Before payment/confirmation
    guestDetails: { view: true, edit: true, approve: false }, // Before payment/confirmation

    // Wallet & Financial
    wallet: { view: true, edit: false, approve: false }, // Balance only
    walletTransactions: { view: true, edit: false, approve: false },
    walletTopUps: { view: false, edit: false, approve: false },
    refunds: { view: true, edit: false, approve: false }, // Status only
    invoices: { view: true, edit: false, approve: false },
    financialReports: { view: false, edit: false, approve: false },
    markups: { view: false, edit: false, approve: false },

    // User Management
    agents: { view: false, edit: false, approve: false },
    allAgents: { view: false, edit: false, approve: false },
    agentProfiles: { view: false, edit: false, approve: false },
    userRoles: { view: false, edit: false, approve: false },

    // Agency Management
    agencyBookings: { view: false, edit: false, approve: false },
    agentPerformance: { view: false, edit: false, approve: false },
    agencySettings: { view: false, edit: false, approve: false },

    // Admin & Settings
    systemSettings: { view: false, edit: false, approve: false },
    auditLogs: { view: false, edit: false, approve: false },
    policies: { view: false, edit: false, approve: false },
    reports: { view: false, edit: false, approve: false },
    erpIntegration: { view: false, edit: false, approve: false },

    // Support & Disputes
    disputes: { view: true, edit: false, approve: false }, // Can raise, view status
    supportTickets: { view: true, edit: false, approve: false },
    communicationLogs: { view: true, edit: false, approve: false },

    // KYC & Compliance
    kycDocuments: { view: true, edit: false, approve: false }, // Own status
    businessDetails: { view: true, edit: true, approve: false }, // GST info before payment
    kycVerification: { view: false, edit: false, approve: false },

    // Dashboard
    dashboardPersonalization: true,
    usageInsights: false,

    // Bulk Operations
    bulkOperations: false,
  },

  SUB_AGENT: {
    // Booking
    bookings: { view: true, edit: true, approve: false },
    allBookings: { view: false, edit: false, approve: false },
    ownBookings: { view: true, edit: true, approve: false },
    passengerDetails: { view: true, edit: true, approve: false }, // Before booking
    guestDetails: { view: true, edit: true, approve: false }, // Before booking

    // Wallet & Financial
    wallet: { view: true, edit: false, approve: false }, // Assigned balance only
    walletTransactions: { view: true, edit: false, approve: false },
    walletTopUps: { view: false, edit: false, approve: false },
    refunds: { view: true, edit: false, approve: false },
    invoices: { view: true, edit: false, approve: false },
    financialReports: { view: false, edit: false, approve: false },
    markups: { view: false, edit: false, approve: false },

    // User Management
    agents: { view: false, edit: false, approve: false },
    allAgents: { view: false, edit: false, approve: false },
    agentProfiles: { view: false, edit: true, approve: false }, // Own profile
    userRoles: { view: false, edit: false, approve: false },

    // Agency Management
    agencyBookings: { view: false, edit: false, approve: false },
    agentPerformance: { view: false, edit: false, approve: false },
    agencySettings: { view: false, edit: false, approve: false },

    // Admin & Settings
    systemSettings: { view: false, edit: false, approve: false },
    auditLogs: { view: false, edit: false, approve: false },
    policies: { view: false, edit: false, approve: false },
    reports: { view: false, edit: false, approve: false },
    erpIntegration: { view: false, edit: false, approve: false },

    // Support & Disputes
    disputes: { view: true, edit: false, approve: false },
    supportTickets: { view: true, edit: false, approve: false },
    communicationLogs: { view: true, edit: false, approve: false },

    // KYC & Compliance
    kycDocuments: { view: false, edit: false, approve: false },
    businessDetails: { view: false, edit: false, approve: false },
    kycVerification: { view: false, edit: false, approve: false },

    // Dashboard
    dashboardPersonalization: true,
    usageInsights: false,

    // Bulk Operations
    bulkOperations: false,
  },

  FINANCE_TEAM: {
    // Booking
    bookings: { view: false, edit: false, approve: false },
    allBookings: { view: false, edit: false, approve: false },
    ownBookings: { view: false, edit: false, approve: false },
    passengerDetails: { view: false, edit: false, approve: false },
    guestDetails: { view: false, edit: false, approve: false },

    // Wallet & Financial
    wallet: { view: true, edit: true, approve: true },
    walletTransactions: { view: true, edit: true, approve: false }, // Manual adjustments
    walletTopUps: { view: true, edit: false, approve: true },
    refunds: { view: true, edit: false, approve: true }, // Refund completion
    invoices: { view: true, edit: false, approve: false },
    financialReports: { view: true, edit: false, approve: false },
    markups: { view: false, edit: false, approve: false },

    // User Management
    agents: { view: false, edit: false, approve: false },
    allAgents: { view: false, edit: false, approve: false },
    agentProfiles: { view: false, edit: false, approve: false },
    userRoles: { view: false, edit: false, approve: false },

    // Agency Management
    agencyBookings: { view: false, edit: false, approve: false },
    agentPerformance: { view: false, edit: false, approve: false },
    agencySettings: { view: false, edit: false, approve: false },

    // Admin & Settings
    systemSettings: { view: false, edit: false, approve: false },
    auditLogs: { view: false, edit: false, approve: false },
    policies: { view: false, edit: false, approve: false },
    reports: { view: true, edit: false, approve: false }, // Financial reports
    erpIntegration: { view: true, edit: true, approve: false }, // ERP sync

    // Support & Disputes
    disputes: { view: false, edit: false, approve: false },
    supportTickets: { view: false, edit: false, approve: false },
    communicationLogs: { view: false, edit: false, approve: false },

    // KYC & Compliance
    kycDocuments: { view: false, edit: false, approve: false },
    businessDetails: { view: false, edit: false, approve: false },
    kycVerification: { view: false, edit: false, approve: false },

    // Dashboard
    dashboardPersonalization: true,
    usageInsights: false,

    // Bulk Operations
    bulkOperations: false,
  },

  SUPPORT_TEAM: {
    // Booking
    bookings: { view: false, edit: false, approve: false }, // Cannot create bookings
    allBookings: { view: false, edit: false, approve: false },
    ownBookings: { view: false, edit: false, approve: false },
    passengerDetails: { view: false, edit: false, approve: false },
    guestDetails: { view: false, edit: false, approve: false },

    // Wallet & Financial
    wallet: { view: false, edit: false, approve: false },
    walletTransactions: { view: false, edit: false, approve: false },
    walletTopUps: { view: false, edit: false, approve: false },
    refunds: { view: false, edit: false, approve: false },
    invoices: { view: false, edit: false, approve: false },
    financialReports: { view: false, edit: false, approve: false },
    markups: { view: false, edit: false, approve: false },

    // User Management
    agents: { view: false, edit: false, approve: false },
    allAgents: { view: false, edit: false, approve: false },
    agentProfiles: { view: false, edit: false, approve: false },
    userRoles: { view: false, edit: false, approve: false },

    // Agency Management
    agencyBookings: { view: false, edit: false, approve: false },
    agentPerformance: { view: false, edit: false, approve: false },
    agencySettings: { view: false, edit: false, approve: false },

    // Admin & Settings
    systemSettings: { view: false, edit: false, approve: false },
    auditLogs: { view: false, edit: false, approve: false },
    policies: { view: false, edit: false, approve: false },
    reports: { view: false, edit: false, approve: false },
    erpIntegration: { view: false, edit: false, approve: false },

    // Support & Disputes
    disputes: { view: true, edit: true, approve: true }, // Dispute closure/rejection
    supportTickets: { view: true, edit: true, approve: false },
    communicationLogs: { view: true, edit: true, approve: false }, // Internal notes

    // KYC & Compliance
    kycDocuments: { view: false, edit: false, approve: false },
    businessDetails: { view: false, edit: false, approve: false },
    kycVerification: { view: false, edit: false, approve: false },

    // Dashboard
    dashboardPersonalization: true,
    usageInsights: false,

    // Bulk Operations
    bulkOperations: false,
  },

  KYC_COMPLIANCE_TEAM: {
    // Booking
    bookings: { view: false, edit: false, approve: false },
    allBookings: { view: false, edit: false, approve: false },
    ownBookings: { view: false, edit: false, approve: false },
    passengerDetails: { view: false, edit: false, approve: false },
    guestDetails: { view: false, edit: false, approve: false },

    // Wallet & Financial
    wallet: { view: false, edit: false, approve: false },
    walletTransactions: { view: false, edit: false, approve: false },
    walletTopUps: { view: false, edit: false, approve: false },
    refunds: { view: false, edit: false, approve: false },
    invoices: { view: false, edit: false, approve: false },
    financialReports: { view: false, edit: false, approve: false },
    markups: { view: false, edit: false, approve: false },

    // User Management
    agents: { view: false, edit: false, approve: false },
    allAgents: { view: false, edit: false, approve: false },
    agentProfiles: { view: false, edit: false, approve: false },
    userRoles: { view: false, edit: false, approve: false },

    // Agency Management
    agencyBookings: { view: false, edit: false, approve: false },
    agentPerformance: { view: false, edit: false, approve: false },
    agencySettings: { view: false, edit: false, approve: false },

    // Admin & Settings
    systemSettings: { view: false, edit: false, approve: false },
    auditLogs: { view: false, edit: false, approve: false },
    policies: { view: false, edit: false, approve: false },
    reports: { view: false, edit: false, approve: false },
    erpIntegration: { view: false, edit: false, approve: false },

    // Support & Disputes
    disputes: { view: false, edit: false, approve: false },
    supportTickets: { view: false, edit: false, approve: false },
    communicationLogs: { view: false, edit: false, approve: false },

    // KYC & Compliance
    kycDocuments: { view: true, edit: true, approve: true }, // Verification notes, approval/rejection
    businessDetails: { view: true, edit: false, approve: false }, // Agency/business details
    kycVerification: { view: true, edit: true, approve: true }, // Approve/reject KYC

    // Dashboard
    dashboardPersonalization: true,
    usageInsights: false,

    // Bulk Operations
    bulkOperations: false,
  },
}

export function getPermissions(role: Role): Permissions {
  return PERMISSIONS[role] || PERMISSIONS.AGENT
}

export function hasPermission(
  role: Role,
  permission: keyof Permissions,
  action?: PermissionAction
): boolean {
  const permissions = getPermissions(role)
  const perm = permissions[permission]

  if (typeof perm === "boolean") {
    return perm
  }

  if (action) {
    return perm[action] || false
  }

  // If no action specified, check if any action is allowed
  return perm.view || perm.edit || perm.approve
}

export function canView(role: Role, permission: keyof Permissions): boolean {
  return hasPermission(role, permission, "view")
}

export function canEdit(role: Role, permission: keyof Permissions): boolean {
  return hasPermission(role, permission, "edit")
}

export function canApprove(role: Role, permission: keyof Permissions): boolean {
  return hasPermission(role, permission, "approve")
}


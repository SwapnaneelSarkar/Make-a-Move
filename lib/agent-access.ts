// Agent-specific access controls stored locally for the prototype
import { type Role } from "./mock-data"

export type AccessModule = "flights" | "hotels" | "wallet" | "reports" | "markups"

export type AgentAccessMatrix = {
  flights: { view: boolean; book: boolean; cancel: boolean; lockTickets: boolean }
  hotels: { view: boolean; book: boolean; cancel: boolean }
  wallet: { view: boolean; debit: boolean }
  reports: { view: boolean; download: boolean }
  markups: { view: boolean; edit: boolean }
}

const STORAGE_KEY = "agent_access_overrides"

const BASELINE: AgentAccessMatrix = {
  flights: { view: true, book: true, cancel: true, lockTickets: false },
  hotels: { view: true, book: true, cancel: true },
  wallet: { view: true, debit: true },
  reports: { view: false, download: false },
  markups: { view: true, edit: false },
}

const DEFAULT_BY_ROLE: Record<Role, AgentAccessMatrix> = {
  SUPER_ADMIN: {
    ...BASELINE,
    flights: { view: true, book: false, cancel: false, lockTickets: false },
    hotels: { view: true, book: false, cancel: false },
    wallet: { view: true, debit: false },
    markups: { view: true, edit: true },
    reports: { view: true, download: true },
  },
  AGENCY_ADMIN: {
    ...BASELINE,
    flights: { view: true, book: true, cancel: true, lockTickets: true },
    markups: { view: true, edit: true },
    reports: { view: true, download: true },
  },
  AGENT: {
    ...BASELINE,
    flights: { view: true, book: true, cancel: true, lockTickets: false },
    markups: { view: true, edit: false },
    wallet: { view: true, debit: true },
    reports: { view: false, download: false },
  },
  SUB_AGENT: {
    ...BASELINE,
    hotels: { view: true, book: true, cancel: false },
    flights: { view: true, book: true, cancel: false, lockTickets: false },
    wallet: { view: true, debit: false },
    reports: { view: false, download: false },
    markups: { view: true, edit: false },
  },
  FINANCE_TEAM: {
    ...BASELINE,
    flights: { view: true, book: false, cancel: false, lockTickets: false },
    hotels: { view: true, book: false, cancel: false },
    wallet: { view: true, debit: false },
    markups: { view: true, edit: false },
    reports: { view: true, download: true },
  },
  SUPPORT_TEAM: {
    ...BASELINE,
    flights: { view: true, book: false, cancel: true, lockTickets: false },
    hotels: { view: true, book: false, cancel: true },
    wallet: { view: true, debit: false },
    reports: { view: true, download: false },
    markups: { view: false, edit: false },
  },
  KYC_COMPLIANCE_TEAM: {
    ...BASELINE,
    flights: { view: true, book: false, cancel: false, lockTickets: false },
    hotels: { view: true, book: false, cancel: false },
    wallet: { view: true, debit: false },
    reports: { view: true, download: true },
    markups: { view: false, edit: false },
  },
}

const isBrowser = () => typeof window !== "undefined"

const readOverrides = (): Record<string, AgentAccessMatrix> => {
  if (!isBrowser()) return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, AgentAccessMatrix>) : {}
  } catch {
    return {}
  }
}

const writeOverrides = (data: Record<string, AgentAccessMatrix>) => {
  if (!isBrowser()) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error("Failed to persist agent access controls", error)
  }
}

const mergeAccess = (base: AgentAccessMatrix, override?: AgentAccessMatrix): AgentAccessMatrix => {
  if (!override) return base
  return {
    flights: { ...base.flights, ...override.flights },
    hotels: { ...base.hotels, ...override.hotels },
    wallet: { ...base.wallet, ...override.wallet },
    reports: { ...base.reports, ...override.reports },
    markups: { ...base.markups, ...override.markups },
  }
}

export const getDefaultAccessForRole = (role: Role): AgentAccessMatrix => {
  return DEFAULT_BY_ROLE[role] || BASELINE
}

export const getAgentAccess = (agentId: string, role: Role): AgentAccessMatrix => {
  const defaults = getDefaultAccessForRole(role)
  const overrides = readOverrides()
  return mergeAccess(defaults, overrides[agentId])
}

export const upsertAgentAccess = (agentId: string, role: Role, matrix: AgentAccessMatrix) => {
  const overrides = readOverrides()
  overrides[agentId] = mergeAccess(getDefaultAccessForRole(role), matrix)
  writeOverrides(overrides)
  return overrides[agentId]
}

export const resetAgentAccess = (agentId: string) => {
  const overrides = readOverrides()
  delete overrides[agentId]
  writeOverrides(overrides)
}

export const listAgentAccessOverrides = (): Record<string, AgentAccessMatrix> => readOverrides()

export const canAgent = (
  agentId: string,
  role: Role,
  module: AccessModule,
  action: keyof AgentAccessMatrix[AccessModule],
): boolean => {
  const access = getAgentAccess(agentId, role)
  return Boolean((access[module] as any)?.[action])
}


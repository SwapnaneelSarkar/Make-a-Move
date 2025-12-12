// Centralized markup preference handling for agents and admins
import { type Role } from "./mock-data"

export type MarkupPreferences = {
  superAdminMarkup: number // Platform level markup (always applied unless disabled in flow)
  defaultAgentMarkup: number // Default agent/sub-agent markup in rupees
  agentOverrides: Record<string, number> // Per-agent overrides set by Agent Admin
  allowAgentOverride: boolean // Whether agents can edit markup during booking
}

const STORAGE_KEY = "markup_preferences"
const DEFAULT_SUPER_ADMIN_MARKUP = 500
const DEFAULT_AGENT_MARKUP = 500

export function loadMarkupPreferences(): MarkupPreferences {
  if (typeof window === "undefined") {
    return {
      superAdminMarkup: DEFAULT_SUPER_ADMIN_MARKUP,
      defaultAgentMarkup: DEFAULT_AGENT_MARKUP,
      agentOverrides: {},
      allowAgentOverride: true,
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return {
      superAdminMarkup: DEFAULT_SUPER_ADMIN_MARKUP,
      defaultAgentMarkup: DEFAULT_AGENT_MARKUP,
      agentOverrides: {},
      allowAgentOverride: true,
    }
  }

  try {
    const parsed = JSON.parse(stored) as Partial<MarkupPreferences>
    return {
      superAdminMarkup: parsed.superAdminMarkup ?? DEFAULT_SUPER_ADMIN_MARKUP,
      defaultAgentMarkup: parsed.defaultAgentMarkup ?? DEFAULT_AGENT_MARKUP,
      agentOverrides: parsed.agentOverrides ?? {},
      allowAgentOverride: parsed.allowAgentOverride ?? true,
    }
  } catch {
    return {
      superAdminMarkup: DEFAULT_SUPER_ADMIN_MARKUP,
      defaultAgentMarkup: DEFAULT_AGENT_MARKUP,
      agentOverrides: {},
      allowAgentOverride: true,
    }
  }
}

export function persistMarkupPreferences(preferences: MarkupPreferences) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
}

export function resolveAgentMarkup(userId: string, role: Role) {
  const prefs = loadMarkupPreferences()
  const isAgent = role === "AGENT" || role === "SUB_AGENT" || role === "AGENCY_ADMIN"
  const agentMarkup = isAgent ? prefs.agentOverrides[userId] ?? prefs.defaultAgentMarkup : 0

  return {
    superAdminMarkup: prefs.superAdminMarkup,
    agentMarkup,
    allowAgentOverride: prefs.allowAgentOverride,
  }
}

export { DEFAULT_SUPER_ADMIN_MARKUP, DEFAULT_AGENT_MARKUP }


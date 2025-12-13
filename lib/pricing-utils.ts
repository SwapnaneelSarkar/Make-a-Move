// Pricing utilities for calculating markups and applying pricing policies

export interface MarkupRule {
  id: string
  product: "flights" | "hotels"
  fareType: string
  route: string
  currency: string
  markupPercent: string
  startDate: string
  endDate: string
}

export interface PricingBreakdown {
  baseFare: number
  taxes: number
  markup: number
  totalAmount: number
  markupPercent: number
  superAdminMarkup?: number
  agentMarkup?: number
  appliedMarkup?: boolean
}

/**
 * Get applicable markup rules from localStorage
 */
export function getMarkupRules(): MarkupRule[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem("markup_rules")
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

/**
 * Calculate markup based on configured rules
 * @param baseFare Base fare amount
 * @param product Product type (flights or hotels)
 * @param route Route type (Domestic/International)
 * @param fareType Fare type (Corporate/Flexi/Saver)
 * @param currency Currency code
 * @returns Markup amount and percentage
 */
export function calculateMarkup(
  baseFare: number,
  product: "flights" | "hotels",
  route: string = "Domestic",
  fareType: string = "Regular",
  currency: string = "INR"
): { markup: number; markupPercent: number } {
  const rules = getMarkupRules()
  const today = new Date().toISOString().split('T')[0]

  // Find applicable rule
  const applicableRule = rules.find((rule) => {
    const matchesProduct = rule.product === product
    const matchesRoute = !rule.route || rule.route === route || route.includes(rule.route)
    const matchesFareType = !rule.fareType || rule.fareType === fareType || fareType.includes(rule.fareType)
    const matchesCurrency = !rule.currency || rule.currency === currency
    const isActive = today >= rule.startDate && today <= rule.endDate

    return matchesProduct && matchesRoute && matchesFareType && matchesCurrency && isActive
  })

  if (applicableRule) {
    const markupPercent = parseFloat(applicableRule.markupPercent) || 0
    const markup = (baseFare * markupPercent) / 100
    return { markup, markupPercent }
  }

  // Default markup if no rule found (can be configured)
  const defaultMarkupPercent = 2.5
  const markup = (baseFare * defaultMarkupPercent) / 100
  return { markup, markupPercent: defaultMarkupPercent }
}

/**
 * Calculate complete pricing breakdown
 * @param baseFare Base fare amount
 * @param taxes Taxes and fees amount
 * @param product Product type
 * @param route Route type
 * @param fareType Fare type
 * @param currency Currency code
 * @returns Complete pricing breakdown
 */
export function calculatePricingBreakdown(
  baseFare: number,
  taxes: number,
  product: "flights" | "hotels",
  route: string = "Domestic",
  fareType: string = "Regular",
  currency: string = "INR",
  overrides?: {
    superAdminMarkup?: number
    agentMarkup?: number
    applyMarkup?: boolean
    markupPercent?: number
  }
): PricingBreakdown {
  const { markup: ruleMarkup, markupPercent: rulePercent } = calculateMarkup(baseFare, product, route, fareType, currency)

  const resolvedMarkupPercent = overrides?.markupPercent ?? rulePercent
  const percentMarkup = (baseFare * resolvedMarkupPercent) / 100
  const superAdminMarkup = overrides?.superAdminMarkup ?? 500
  const agentMarkup = overrides?.applyMarkup === false ? 0 : overrides?.agentMarkup ?? 0

  // Super admin markup is added directly to base fare (hidden from agents)
  // Agents see: baseFare (which includes super admin markup) + taxes + agent markup (shown as convenience fees)
  const adjustedBaseFare = baseFare + superAdminMarkup
  
  // Only agent markup is shown to agents as "Convenience fees"
  // Super admin markup is not shown separately
  const markup = agentMarkup
  const totalAmount = adjustedBaseFare + taxes + markup

  return {
    baseFare: adjustedBaseFare, // Base fare shown to agents includes super admin markup
    taxes,
    markup, // Only agent markup (shown as convenience fees)
    totalAmount,
    markupPercent: resolvedMarkupPercent,
    superAdminMarkup, // Kept for reference but not shown to agents
    agentMarkup,
    appliedMarkup: overrides?.applyMarkup !== false,
  }
}



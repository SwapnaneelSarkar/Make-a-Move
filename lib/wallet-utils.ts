// Wallet utility functions for balance management, validations, and operations

import { transactionsDB, type Transaction } from "./local-db"
import { audit } from "./audit-utils"

const WALLET_BALANCE_KEY = "wallet_balance"
const MONTHLY_BUDGET_KEY = "monthly_budget"
const MIN_ADD_FUNDS = 100
const MAX_ADD_FUNDS = 500000

// Wallet Balance Management
export function getWalletBalance(): number {
  if (typeof window === "undefined") return 0
  const stored = localStorage.getItem(WALLET_BALANCE_KEY)
  return stored ? parseFloat(stored) : 2543000 // Default balance
}

export function setWalletBalance(balance: number) {
  if (typeof window === "undefined") return
  localStorage.setItem(WALLET_BALANCE_KEY, balance.toString())
}

export function getLastUpdatedTimestamp(): Date {
  if (typeof window === "undefined") return new Date()
  const stored = localStorage.getItem("wallet_last_updated")
  return stored ? new Date(stored) : new Date()
}

export function setLastUpdatedTimestamp() {
  if (typeof window === "undefined") return
  localStorage.setItem("wallet_last_updated", new Date().toISOString())
}

// Calculate balance from transactions
export async function calculateBalanceFromTransactions(): Promise<number> {
  const transactions = await transactionsDB.readAll()
  const completedTransactions = transactions.filter((tx) => tx.status === "Completed")
  
  // Get the latest transaction with balanceAfter, or calculate from all transactions
  const sortedTransactions = completedTransactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  if (sortedTransactions.length > 0 && sortedTransactions[0].balanceAfter !== undefined) {
    return sortedTransactions[0].balanceAfter
  }
  
  // Fallback: calculate from all transactions
  return completedTransactions.reduce((balance, tx) => {
    if (tx.type === "CREDIT" || tx.type === "REFUND") {
      return balance + Math.abs(tx.amount)
    } else if (tx.type === "DEBIT") {
      return balance - Math.abs(tx.amount)
    }
    return balance
  }, 0)
}

// Add Funds Validation
export function validateAddFundsAmount(amount: number): { valid: boolean; error?: string } {
  if (isNaN(amount) || amount <= 0) {
    return { valid: false, error: "Amount must be greater than 0" }
  }
  if (amount < MIN_ADD_FUNDS) {
    return { valid: false, error: `Minimum amount is ₹${MIN_ADD_FUNDS.toLocaleString("en-IN")}` }
  }
  if (amount > MAX_ADD_FUNDS) {
    return { valid: false, error: `Maximum amount is ₹${MAX_ADD_FUNDS.toLocaleString("en-IN")} per transaction` }
  }
  return { valid: true }
}

// Check if wallet has sufficient balance
export function hasSufficientBalance(requiredAmount: number): boolean {
  const balance = getWalletBalance()
  return balance >= requiredAmount
}

// Create transaction with balance after
export async function createTransaction(
  data: Omit<Transaction, "id" | "balanceAfter" | "createdAt">
): Promise<Transaction> {
  const currentBalance = getWalletBalance()
  let newBalance = currentBalance

  if (data.type === "CREDIT" || data.type === "REFUND") {
    newBalance = currentBalance + Math.abs(data.amount)
  } else if (data.type === "DEBIT") {
    newBalance = currentBalance - Math.abs(data.amount)
  }

  const transaction = await transactionsDB.create({
    ...data,
    balanceAfter: newBalance,
  })

  // Update wallet balance
  setWalletBalance(newBalance)
  setLastUpdatedTimestamp()

  return transaction
}

// Budget Management
export function getMonthlyBudget(): number | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(MONTHLY_BUDGET_KEY)
  return stored ? parseFloat(stored) : null
}

export function setMonthlyBudget(budget: number | null) {
  if (typeof window === "undefined") return
  if (budget === null) {
    localStorage.removeItem(MONTHLY_BUDGET_KEY)
  } else {
    localStorage.setItem(MONTHLY_BUDGET_KEY, budget.toString())
  }
}

export async function getMonthlySpend(): Promise<number> {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const transactions = await transactionsDB.readAll()
  const monthlyDebits = transactions.filter((tx) => {
    const txDate = new Date(tx.date)
    return (
      tx.type === "DEBIT" &&
      tx.status === "Completed" &&
      txDate >= startOfMonth &&
      txDate <= endOfMonth
    )
  })

  return monthlyDebits.reduce((sum, tx) => sum + Math.abs(tx.amount), 0)
}

export async function getBudgetUsage(): Promise<{ percentage: number; spent: number; budget: number | null }> {
  const budget = getMonthlyBudget()
  if (budget === null) {
    return { percentage: 0, spent: 0, budget: null }
  }

  const spent = await getMonthlySpend()
  const percentage = (spent / budget) * 100

  return { percentage, spent, budget }
}

export function getBudgetAlertStatus(percentage: number): "none" | "warning" | "error" {
  if (percentage >= 100) return "error"
  if (percentage >= 80) return "warning"
  return "none"
}

// Data Masking
export function maskPhone(phone: string): string {
  if (!phone || phone.length < 4) return phone
  return `**${phone.slice(-4)}`
}

export function maskEmail(email: string): string {
  if (!email) return email
  const [local, domain] = email.split("@")
  if (!domain) return email
  if (local.length <= 2) return `${local[0]}**@${domain}`
  return `${local.slice(0, 2)}**@${domain}`
}

// Format time ago
export function formatTimeAgo(date: Date): string {
  const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000 / 60)
  if (diff < 1) return "Just now"
  if (diff === 1) return "1 minute ago"
  if (diff < 60) return `${diff} minutes ago`
  const hours = Math.floor(diff / 60)
  if (hours === 1) return "1 hour ago"
  if (hours < 24) return `${hours} hours ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "1 day ago"
  return `${days} days ago`
}

// Export constants
export { MIN_ADD_FUNDS, MAX_ADD_FUNDS }


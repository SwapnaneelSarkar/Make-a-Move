"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Wallet, ArrowUpRight, ArrowDownLeft, Download, X, RefreshCw, Eye, EyeOff, Settings } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { usePermissions } from "@/hooks/use-permissions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, AlertTriangle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format as formatDateFns, subDays } from "date-fns"
import { cn } from "@/lib/utils"
import { MFAModal } from "@/components/mfa-modal"
import { toast } from "sonner"
import { transactionsDB, walletDepositRequestsDB, type Transaction, type WalletDepositRequest } from "@/lib/local-db"
import { exportWalletStatement, exportTransactions } from "@/lib/export-utils"
import { useAppStore } from "@/lib/store"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { audit } from "@/lib/audit-utils"
import { MOCK_USERS, type User } from "@/lib/mock-data"
import {
  getWalletBalance,
  setWalletBalance,
  getLastUpdatedTimestamp,
  setLastUpdatedTimestamp,
  validateAddFundsAmount,
  createTransaction,
  getMonthlyBudget,
  setMonthlyBudget,
  getBudgetUsage,
  getBudgetAlertStatus,
  maskPhone,
  maskEmail,
  formatTimeAgo,
  MIN_ADD_FUNDS,
  MAX_ADD_FUNDS,
} from "@/lib/wallet-utils"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function WalletPage() {
  const { canView, canEdit, canApprove } = usePermissions()
  const { currentUser } = useAppStore()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [balance, setBalance] = useState(getWalletBalance())
  const [lastUpdated, setLastUpdated] = useState(getLastUpdatedTimestamp())
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  
  // Filters - Date range required, default last 30 days
  const [dateFrom, setDateFrom] = useState<Date>(subDays(new Date(), 30))
  const [dateTo, setDateTo] = useState<Date>(new Date())
  const [transactionType, setTransactionType] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [productType, setProductType] = useState<string>("all")
  
  // Budget management
  const [budgetUsage, setBudgetUsage] = useState<{ percentage: number; spent: number; budget: number | null }>({
    percentage: 0,
    spent: 0,
    budget: null,
  })
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false)
  
  // Data masking
  const [revealedTransactions, setRevealedTransactions] = useState<Set<string>>(new Set())
  const isSuperAdmin = currentUser.role === "SUPER_ADMIN"
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null)
  
  // For Super Admin: Get all agents and agency admins
  const agentsWithWallets = isSuperAdmin 
    ? MOCK_USERS.filter(u => (u.role === "AGENT" || u.role === "AGENCY_ADMIN" || u.role === "SUB_AGENT") && u.walletBalance !== undefined)
    : []

  useEffect(() => {
    loadTransactions()
    loadBudgetUsage()
    // Auto-refresh balance every 30 seconds
    const interval = setInterval(() => {
      refreshBalance()
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadTransactions = async () => {
    try {
      setLoading(true)
      const allTransactions = await transactionsDB.readAll()
      setTransactions(allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      // Update balance from latest transaction
      if (allTransactions.length > 0) {
        const latestTx = allTransactions[0]
        if (latestTx.balanceAfter !== undefined) {
          setBalance(latestTx.balanceAfter)
          setWalletBalance(latestTx.balanceAfter)
        }
      }
    } catch (error) {
      console.error("Failed to load transactions:", error)
      toast.error("Failed to load transactions")
    } finally {
      setLoading(false)
    }
  }

  const loadBudgetUsage = async () => {
    const usage = await getBudgetUsage()
    setBudgetUsage(usage)
  }

  const refreshBalance = async () => {
    setRefreshing(true)
    try {
      await loadTransactions()
      setLastUpdated(new Date())
      setLastUpdatedTimestamp()
    } finally {
      setRefreshing(false)
    }
  }

  const handleAddFunds = async (amount: number, paymentMethod: string) => {
    try {
      // Validate amount
      const validation = validateAddFundsAmount(amount)
      if (!validation.valid) {
        toast.error(validation.error)
        return
      }

      // Mock payment processing (instant credit)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create transaction
      await createTransaction({
        date: new Date().toISOString().split("T")[0],
        description: `Wallet Top-up via ${paymentMethod}`,
        amount,
        type: "CREDIT",
        status: "Completed",
        paymentMethod,
        productType: "Wallet Top-up",
      })

      // Update balance
      const newBalance = balance + amount
      setBalance(newBalance)
      setLastUpdated(new Date())
      setLastUpdatedTimestamp()

      await audit.create("wallet", `tx-${Date.now()}`, { amount, type: "CREDIT", paymentMethod })
      await loadTransactions()
      await loadBudgetUsage()
      toast.success("Funds added successfully")
    } catch (error) {
      console.error("Failed to add funds:", error)
      toast.error("Failed to add funds")
    }
  }

  const handleGenerateStatement = async (format: "pdf" | "csv" | "excel") => {
    try {
      if (!dateFrom || !dateTo) {
        toast.error("Please select date range for statement")
        return
      }

      // Validate date range (max 1 year)
      const daysDiff = Math.ceil((dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24))
      if (daysDiff > 365) {
        toast.error("Date range cannot exceed 1 year")
        return
      }

      const filtered = transactions.filter((tx) => {
        const txDate = new Date(tx.date)
        return txDate >= dateFrom && txDate <= dateTo
      })

      // Calculate opening balance (balance before from date)
      const beforeDate = transactions.filter((tx) => {
        const txDate = new Date(tx.date)
        return txDate < dateFrom && tx.status === "Completed"
      })
      
      let openingBalance = 0
      if (beforeDate.length > 0) {
        // Get the latest transaction before the date range
        const latestBefore = beforeDate.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
        openingBalance = latestBefore.balanceAfter ?? 0
      } else {
        // If no transactions before, calculate from all completed transactions
        openingBalance = transactions
          .filter((tx) => {
            const txDate = new Date(tx.date)
            return txDate < dateFrom && tx.status === "Completed"
          })
          .reduce((sum, tx) => {
            if (tx.type === "CREDIT" || tx.type === "REFUND") return sum + Math.abs(tx.amount)
            if (tx.type === "DEBIT") return sum - Math.abs(tx.amount)
            return sum
          }, 0)
      }

      const closingBalance = filtered.length > 0 
        ? (filtered[filtered.length - 1].balanceAfter ?? balance)
        : balance

      if (format === "pdf") {
        exportWalletStatement(
          filtered,
          openingBalance,
          closingBalance,
          {
            from: formatDateFns(dateFrom, "yyyy-MM-dd"),
            to: formatDateFns(dateTo, "yyyy-MM-dd"),
          }
        )
      } else if (format === "csv") {
        exportTransactions(filtered, format)
      } else {
        exportTransactions(filtered, format)
      }

      toast.success("Statement generated successfully")
    } catch (error) {
      console.error("Failed to generate statement:", error)
      toast.error("Failed to generate statement")
    }
  }

  const handleRevealMaskedData = async (transactionId: string) => {
    if (!isSuperAdmin) return
    
    setRevealedTransactions((prev) => new Set([...prev, transactionId]))
    await audit.create("wallet", transactionId, {
      action: "REVEAL",
      module: "wallet",
      description: "Revealed masked transaction data",
    })
    toast.success("Data revealed (logged in audit trail)")
  }

  const handleSetBudget = async (budget: number | null) => {
    setMonthlyBudget(budget)
    await loadBudgetUsage()
    setBudgetDialogOpen(false)
    toast.success(budget ? `Monthly budget set to ₹${budget.toLocaleString("en-IN")}` : "Budget removed")
  }

  if (!canView("wallet")) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You do not have permission to view wallet. Only users with wallet access can view this page.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const filteredTransactions = transactions.filter((tx) => {
    if (dateFrom && new Date(tx.date) < dateFrom) return false
    if (dateTo && new Date(tx.date) > dateTo) return false
    if (transactionType !== "all" && tx.type !== transactionType) return false
    if (statusFilter !== "all" && tx.status !== statusFilter) return false
    if (productType !== "all" && tx.productType !== productType) return false
    return true
  })

  // Super Admin View: Show all agent wallets
  if (isSuperAdmin) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Wallets</h1>
          <p className="text-muted-foreground">View wallet balances for all agents and agency admins.</p>
        </div>

        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Wallet Balance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentsWithWallets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No agents with wallets found
                  </TableCell>
                </TableRow>
              ) : (
                agentsWithWallets.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 overflow-hidden rounded-full border bg-background">
                          <img
                            src={agent.avatar || "/placeholder.svg"}
                            alt={agent.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-xs text-muted-foreground">{agent.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {agent.role.toLowerCase().replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>{agent.department || "N/A"}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ₹{agent.walletBalance?.toLocaleString("en-IN") || "0"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedAgentId(agent.id)
                          // Load transactions for this agent
                          loadTransactions()
                        }}
                      >
                        View Transactions
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {selectedAgentId && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Transactions for {agentsWithWallets.find(a => a.id === selectedAgentId)?.name}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedAgentId(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                      </TableRow>
                    ) : filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">No transactions found</TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>{formatDate(tx.date)}</TableCell>
                          <TableCell className="font-medium">{tx.description}</TableCell>
                          <TableCell>
                            {tx.type === "CREDIT" || tx.type === "REFUND" ? (
                              <div className="flex items-center text-green-600">
                                <ArrowDownLeft className="mr-1 h-3 w-3" /> {tx.type}
                              </div>
                            ) : (
                              <div className="flex items-center text-muted-foreground">
                                <ArrowUpRight className="mr-1 h-3 w-3" /> {tx.type}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                tx.status === "Completed" && "bg-green-50 text-green-700 border-green-200",
                                tx.status === "Pending" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                                tx.status === "Failed" && "bg-red-50 text-red-700 border-red-200"
                              )}
                            >
                              {tx.status}
                            </Badge>
                          </TableCell>
                          <TableCell className={cn("text-right font-medium", tx.amount > 0 && "text-green-600")}>
                            {tx.amount > 0 ? "+" : ""}
                            ₹{Math.abs(tx.amount).toLocaleString("en-IN")}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const budgetAlertStatus = getBudgetAlertStatus(budgetUsage.percentage)
  const canSetBudget = currentUser.role === "AGENCY_ADMIN" // Super Admin cannot set budget (no wallet)

  const handleClearFilters = () => {
    setDateFrom(subDays(new Date(), 30))
    setDateTo(new Date())
    setTransactionType("all")
    setStatusFilter("all")
    setProductType("all")
  }

  const hasActiveFilters =
    transactionType !== "all" || statusFilter !== "all" || productType !== "all"

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agency Wallet</h1>
          <p className="text-muted-foreground">Manage funds and view transaction history.</p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download Statement
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleGenerateStatement("pdf")}>PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleGenerateStatement("csv")}>CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleGenerateStatement("excel")}>Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {canEdit("wallet") && (
            <AddFundsButton onAddFunds={handleAddFunds} />
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium opacity-90">Available Balance</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={refreshBalance}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Wallet className="h-6 w-6 opacity-75" />
              <div className="text-4xl font-bold">₹{balance.toLocaleString("en-IN")}</div>
            </div>
            <p className="mt-2 text-sm opacity-75">
              Updated {formatTimeAgo(lastUpdated)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Spent (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{budgetUsage.spent.toLocaleString("en-IN")}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-red-500" />
              This month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
              {canSetBudget && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setBudgetDialogOpen(true)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {budgetUsage.budget ? (
              <>
                <div className="text-2xl font-bold">₹{budgetUsage.budget.toLocaleString("en-IN")}</div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={cn(
                      "h-full transition-all",
                      budgetAlertStatus === "error" && "bg-red-500",
                      budgetAlertStatus === "warning" && "bg-yellow-500",
                      budgetAlertStatus === "none" && "bg-green-500"
                    )}
                    style={{ width: `${Math.min(budgetUsage.percentage, 100)}%` }}
                  ></div>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{budgetUsage.percentage.toFixed(1)}% used</span>
                  {budgetAlertStatus === "warning" && (
                    <span className="text-yellow-600 flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" /> Warning
                    </span>
                  )}
                  {budgetAlertStatus === "error" && (
                    <span className="text-red-600 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" /> Exceeded
                    </span>
                  )}
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                No budget set
                {canSetBudget && (
                  <Button
                    variant="link"
                    className="p-0 h-auto ml-2"
                    onClick={() => setBudgetDialogOpen(true)}
                  >
                    Set Budget
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transaction History</h2>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={handleClearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              <div className="space-y-2">
                <Label>Date From *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? formatDateFns(dateFrom, "PPP") : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateFrom} onSelect={(date) => date && setDateFrom(date)} initialFocus required={false} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Date To *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? formatDateFns(dateTo, "PPP") : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateTo} onSelect={(date) => date && setDateTo(date)} initialFocus required={false} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Transaction Type</Label>
                <Select value={transactionType} onValueChange={setTransactionType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="CREDIT">Credit</SelectItem>
                    <SelectItem value="DEBIT">Debit</SelectItem>
                    <SelectItem value="REFUND">Refund</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Product Type</Label>
                <Select value={productType} onValueChange={setProductType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Flight">Flight</SelectItem>
                    <SelectItem value="Hotel">Hotel</SelectItem>
                    <SelectItem value="Wallet Top-up">Wallet Top-up</SelectItem>
                    <SelectItem value="Refund">Refund</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance After</TableHead>
                {isSuperAdmin && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={isSuperAdmin ? 7 : 6} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isSuperAdmin ? 7 : 6} className="text-center">
                    No transactions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((tx) => {
                  const isRevealed = revealedTransactions.has(tx.id)
                  const shouldMask = !isRevealed && tx.maskedData
                  
                  return (
                    <TableRow key={tx.id}>
                      <TableCell>{formatDate(tx.date)}</TableCell>
                      <TableCell className="font-medium">
                        {shouldMask && tx.maskedData?.phone
                          ? maskPhone(tx.description)
                          : shouldMask && tx.maskedData?.email
                          ? maskEmail(tx.description)
                          : tx.description}
                      </TableCell>
                      <TableCell>
                        {tx.type === "CREDIT" || tx.type === "REFUND" ? (
                          <div className="flex items-center text-green-600">
                            <ArrowDownLeft className="mr-1 h-3 w-3" /> {tx.type}
                          </div>
                        ) : (
                          <div className="flex items-center text-muted-foreground">
                            <ArrowUpRight className="mr-1 h-3 w-3" /> {tx.type}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            tx.status === "Completed" && "bg-green-50 text-green-700 border-green-200",
                            tx.status === "Pending" && "bg-yellow-50 text-yellow-700 border-yellow-200",
                            tx.status === "Failed" && "bg-red-50 text-red-700 border-red-200"
                          )}
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className={cn("text-right font-medium", tx.amount > 0 && "text-green-600")}>
                        {tx.amount > 0 ? "+" : ""}
                        ₹{Math.abs(tx.amount).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        ₹{tx.balanceAfter?.toLocaleString("en-IN") ?? "N/A"}
                      </TableCell>
                      {isSuperAdmin && shouldMask && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevealMaskedData(tx.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Budget Setting Dialog */}
      <Dialog open={budgetDialogOpen} onOpenChange={setBudgetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Monthly Budget</DialogTitle>
            <DialogDescription>
              Set a monthly budget limit. You'll receive alerts at 80% and 100% usage.
            </DialogDescription>
          </DialogHeader>
          <BudgetSettingDialog
            currentBudget={budgetUsage.budget}
            onSetBudget={handleSetBudget}
            onCancel={() => setBudgetDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Add Funds Button with MFA
function AddFundsButton({ onAddFunds }: { onAddFunds: (amount: number, paymentMethod: string) => Promise<void> }) {
  const [mfaOpen, setMfaOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("UPI")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [error, setError] = useState<string>()

  const handleClick = () => {
    setDialogOpen(true)
    setError(undefined)
  }

  const handleMFASuccess = async () => {
    const amountNum = parseFloat(amount)
    const validation = validateAddFundsAmount(amountNum)
    
    if (!validation.valid) {
      setError(validation.error)
      return
    }

    await onAddFunds(amountNum, paymentMethod)
    setDialogOpen(false)
    setMfaOpen(false)
    setAmount("")
    setPaymentMethod("UPI")
    setError(undefined)
  }

  const handleContinue = () => {
    const amountNum = parseFloat(amount)
    const validation = validateAddFundsAmount(amountNum)
    
    if (!validation.valid) {
      setError(validation.error)
      return
    }

    setError(undefined)
    setMfaOpen(true)
  }

  return (
    <>
      <Button onClick={handleClick}>
        <PlusCircle className="mr-2 h-4 w-4" /> Add Funds
      </Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds</DialogTitle>
            <DialogDescription>
              Enter the amount (₹{MIN_ADD_FUNDS.toLocaleString("en-IN")} - ₹{MAX_ADD_FUNDS.toLocaleString("en-IN")}) and select payment method
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Amount (₹)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  setError(undefined)
                }}
                placeholder={`Min: ₹${MIN_ADD_FUNDS.toLocaleString("en-IN")}, Max: ₹${MAX_ADD_FUNDS.toLocaleString("en-IN")}`}
                min={MIN_ADD_FUNDS}
                max={MAX_ADD_FUNDS}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Net Banking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleContinue}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <MFAModal open={mfaOpen} onOpenChange={setMfaOpen} onSuccess={handleMFASuccess} action="add funds" />
    </>
  )
}

// Budget Setting Dialog
function BudgetSettingDialog({
  currentBudget,
  onSetBudget,
  onCancel,
}: {
  currentBudget: number | null
  onSetBudget: (budget: number | null) => void
  onCancel: () => void
}) {
  const [budget, setBudget] = useState(currentBudget?.toString() || "")
  const [option, setOption] = useState<"set" | "remove">(currentBudget ? "set" : "remove")

  return (
    <>
      <div className="space-y-4">
        <RadioGroup value={option} onValueChange={(v) => setOption(v as "set" | "remove")}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="set" id="set" />
            <Label htmlFor="set">Set Budget</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="remove" id="remove" />
            <Label htmlFor="remove">Remove Budget</Label>
          </div>
        </RadioGroup>
        {option === "set" && (
          <div>
            <Label>Monthly Budget (₹)</Label>
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter monthly budget"
            />
          </div>
        )}
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (option === "set") {
              const budgetNum = parseFloat(budget)
              if (isNaN(budgetNum) || budgetNum <= 0) {
                toast.error("Please enter a valid budget amount")
                return
              }
              onSetBudget(budgetNum)
            } else {
              onSetBudget(null)
            }
          }}
        >
          {option === "set" ? "Set Budget" : "Remove Budget"}
        </Button>
      </DialogFooter>
    </>
  )
}

// Request Deposit Button
function RequestDepositButton() {
  const { currentUser } = useAppStore()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [proofType, setProofType] = useState<"Bank Transfer Screenshot" | "Payment Receipt">("Bank Transfer Screenshot")
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB")
        return
      }
      setProofFile(file)
    }
  }

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }
    if (!proofFile) {
      toast.error("Please upload proof document")
      return
    }

    setLoading(true)
    try {
      // Convert file to base64
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64File = reader.result as string

        await walletDepositRequestsDB.create({
          agentId: currentUser.id,
          agentName: currentUser.name,
          amount: parseFloat(amount),
          proofType,
          proofFile: base64File,
        })

        await audit.create("wallet", `deposit-${Date.now()}`, {
          action: "DEPOSIT_REQUEST",
          amount: parseFloat(amount),
        })

        toast.success("Deposit request submitted successfully", {
          description: "Your request will be reviewed by the finance team.",
        })

        setDialogOpen(false)
        setAmount("")
        setProofFile(null)
        setProofType("Bank Transfer Screenshot")
      }
      reader.readAsDataURL(proofFile)
    } catch (error) {
      console.error("Failed to submit deposit request:", error)
      toast.error("Failed to submit deposit request")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => setDialogOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" /> Request Deposit
      </Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Wallet Deposit</DialogTitle>
            <DialogDescription>
              Request a wallet top-up by uploading proof of payment. Finance team will review and approve.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Amount (₹)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min={MIN_ADD_FUNDS}
                max={MAX_ADD_FUNDS}
              />
            </div>
            <div>
              <Label>Proof Type</Label>
              <Select value={proofType} onValueChange={(v) => setProofType(v as "Bank Transfer Screenshot" | "Payment Receipt")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Transfer Screenshot">Bank Transfer Screenshot</SelectItem>
                  <SelectItem value="Payment Receipt">Payment Receipt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Upload Proof</Label>
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {proofFile && (
                <p className="text-sm text-muted-foreground mt-1">
                  Selected: {proofFile.name} ({(proofFile.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePermissions } from "@/hooks/use-permissions"
import ContractsTab from "./contracts-tab"
import ERPTab from "./erp-tab"
import LedgerReconciliationTab from "./ledger-tab"
import InvoiceReconciliationTab from "./invoice-tab"
import CreditControlTab from "./credit-control-tab"
import { FileText, Database, FileSpreadsheet, Receipt, TrendingUp } from "lucide-react"

export default function FinancialManagementPage() {
  const { canView } = usePermissions()

  if (!canView("systemSettings")) {
    return (
      <div className="space-y-6">
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Access Denied</h2>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
        <p className="text-muted-foreground">
          Manage contracts, ERP integrations, reconciliations, and credit control in one place.
        </p>
      </div>

      <Tabs defaultValue="contracts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Contracts
          </TabsTrigger>
          <TabsTrigger value="erp" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            ERP Integration
          </TabsTrigger>
          <TabsTrigger value="ledger" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Ledger Reconciliation
          </TabsTrigger>
          <TabsTrigger value="invoice" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Invoice Reconciliation
          </TabsTrigger>
          <TabsTrigger value="credit" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Credit Control
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contracts">
          <ContractsTab />
        </TabsContent>

        <TabsContent value="erp">
          <ERPTab />
        </TabsContent>

        <TabsContent value="ledger">
          <LedgerReconciliationTab />
        </TabsContent>

        <TabsContent value="invoice">
          <InvoiceReconciliationTab />
        </TabsContent>

        <TabsContent value="credit">
          <CreditControlTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}







// Export utilities for CSV, Excel, and PDF

import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import Papa from "papaparse"

// CSV Export
export function exportToCSV<T extends Record<string, any>>(data: T[], filename: string, columns?: string[]) {
  const csv = Papa.unparse(data, {
    columns: columns || Object.keys(data[0] || {}),
  })

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Excel Export
export function exportToExcel<T extends Record<string, any>>(data: T[], filename: string, sheetName = "Sheet1") {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  XLSX.writeFile(workbook, `${filename}.xlsx`)
}

// PDF Export
export function exportToPDF<T extends Record<string, any>>(
  data: T[],
  filename: string,
  title: string,
  columns: Array<{ header: string; dataKey: string }>
) {
  const doc = new jsPDF()

  // Add title
  doc.setFontSize(16)
  doc.text(title, 14, 15)

  // Add date
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22)

  // Prepare data for table
  const tableData = data.map((row) => columns.map((col) => row[col.dataKey] || ""))

  // Add table
  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: tableData,
    startY: 28,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [66, 139, 202] },
  })

  doc.save(`${filename}.pdf`)
}

// JSON Export
export function exportToJSON<T extends Record<string, any>>(data: T[], filename: string) {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: "application/json;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.json`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Specific export functions for different data types

export function exportBookings(bookings: any[], format: "csv" | "excel" | "pdf" | "json") {
  const columns = [
    { header: "Booking ID", dataKey: "bookingId" },
    { header: "PNR", dataKey: "pnr" },
    { header: "Type", dataKey: "type" },
    { header: "Status", dataKey: "status" },
    { header: "Date", dataKey: "date" },
    { header: "Amount", dataKey: "amount" },
    { header: "Agent", dataKey: "agentName" },
  ]

  const filename = `bookings-${new Date().toISOString().slice(0, 10)}`

  if (format === "csv") {
    exportToCSV(bookings, filename, columns.map((c) => c.dataKey))
  } else if (format === "excel") {
    exportToExcel(bookings, filename)
  } else if (format === "json") {
    exportToJSON(bookings, filename)
  } else {
    exportToPDF(bookings, filename, "Bookings Report", columns)
  }
}

export function exportTransactions(transactions: any[], format: "csv" | "excel" | "pdf") {
  const columns = [
    { header: "Date", dataKey: "date" },
    { header: "Description", dataKey: "description" },
    { header: "Type", dataKey: "type" },
    { header: "Amount", dataKey: "amount" },
    { header: "Status", dataKey: "status" },
    { header: "Payment Method", dataKey: "paymentMethod" },
    { header: "Product Type", dataKey: "productType" },
  ]

  const filename = `transactions-${new Date().toISOString().slice(0, 10)}`

  if (format === "csv") {
    exportToCSV(transactions, filename, columns.map((c) => c.dataKey))
  } else if (format === "excel") {
    exportToExcel(transactions, filename)
  } else {
    exportToPDF(transactions, filename, "Transactions Report", columns)
  }
}

export function exportAuditLogs(auditLogs: any[], format: "csv" | "excel" | "pdf") {
  const columns = [
    { header: "Timestamp", dataKey: "timestamp" },
    { header: "User ID", dataKey: "userId" },
    { header: "Role", dataKey: "role" },
    { header: "Action", dataKey: "action" },
    { header: "Module", dataKey: "module" },
    { header: "Record ID", dataKey: "recordId" },
    { header: "IP Address", dataKey: "ipAddress" },
  ]

  const filename = `audit-logs-${new Date().toISOString().slice(0, 10)}`

  if (format === "csv") {
    exportToCSV(auditLogs, filename, columns.map((c) => c.dataKey))
  } else if (format === "excel") {
    exportToExcel(auditLogs, filename)
  } else {
    exportToPDF(auditLogs, filename, "Audit Logs Report", columns)
  }
}

export function exportRefunds(refunds: any[], format: "csv" | "excel" | "pdf") {
  const columns = [
    { header: "Refund ID", dataKey: "refundId" },
    { header: "Booking ID", dataKey: "bookingId" },
    { header: "Amount", dataKey: "amount" },
    { header: "Type", dataKey: "type" },
    { header: "Status", dataKey: "status" },
    { header: "Reason", dataKey: "reason" },
    { header: "Created At", dataKey: "createdAt" },
  ]

  const filename = `refunds-${new Date().toISOString().slice(0, 10)}`

  if (format === "csv") {
    exportToCSV(refunds, filename, columns.map((c) => c.dataKey))
  } else if (format === "excel") {
    exportToExcel(refunds, filename)
  } else {
    exportToPDF(refunds, filename, "Refunds Report", columns)
  }
}

export function exportDisputes(disputes: any[], format: "csv" | "excel" | "pdf") {
  const columns = [
    { header: "Dispute ID", dataKey: "disputeId" },
    { header: "Title", dataKey: "title" },
    { header: "Category", dataKey: "category" },
    { header: "Status", dataKey: "status" },
    { header: "Booking ID", dataKey: "bookingId" },
    { header: "Created At", dataKey: "createdAt" },
  ]

  const filename = `disputes-${new Date().toISOString().slice(0, 10)}`

  if (format === "csv") {
    exportToCSV(disputes, filename, columns.map((c) => c.dataKey))
  } else if (format === "excel") {
    exportToExcel(disputes, filename)
  } else {
    exportToPDF(disputes, filename, "Disputes Report", columns)
  }
}

// Wallet Statement PDF
export function exportWalletStatement(
  transactions: any[],
  openingBalance: number,
  closingBalance: number,
  period: { from: string; to: string }
) {
  const doc = new jsPDF()

  // Header
  doc.setFontSize(18)
  doc.text("Wallet Statement", 14, 15)

  doc.setFontSize(10)
  doc.text(`Period: ${period.from} to ${period.to}`, 14, 22)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28)

  // Summary
  doc.setFontSize(12)
  doc.text("Summary", 14, 38)
  doc.setFontSize(10)
  doc.text(`Opening Balance: ₹${openingBalance.toLocaleString("en-IN")}`, 14, 45)
  doc.text(`Closing Balance: ₹${closingBalance.toLocaleString("en-IN")}`, 14, 52)

  const totalCredit = transactions.filter((t) => t.type === "CREDIT").reduce((sum, t) => sum + t.amount, 0)
  const totalDebit = transactions.filter((t) => t.type === "DEBIT").reduce((sum, t) => sum + Math.abs(t.amount), 0)

  doc.text(`Total Credits: ₹${totalCredit.toLocaleString("en-IN")}`, 14, 59)
  doc.text(`Total Debits: ₹${totalDebit.toLocaleString("en-IN")}`, 14, 66)

  // Transactions table
  const columns = [
    { header: "Date", dataKey: "date" },
    { header: "Description", dataKey: "description" },
    { header: "Type", dataKey: "type" },
    { header: "Amount", dataKey: "amount" },
    { header: "Status", dataKey: "status" },
  ]

  const tableData = transactions.map((row) => [
    row.date,
    row.description,
    row.type,
    `₹${row.amount.toLocaleString("en-IN")}`,
    row.status,
  ])

  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: tableData,
    startY: 72,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [66, 139, 202] },
  })

  doc.save(`wallet-statement-${period.from}-${period.to}.pdf`)
}













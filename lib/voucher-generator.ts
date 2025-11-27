// Hotel Voucher Generator Utility
// Generates professional hotel voucher in PDF format

import jsPDF from "jspdf"

export interface HotelVoucherData {
  bookingId: string
  voucherNumber: string
  hotel: {
    name: string
    location: string
    rating: number
    address?: string
    phone?: string
  }
  guest: {
    name: string
    mobile: string
    nationality?: string
    gstin?: string
  }
  checkIn: string
  checkOut: string
  nights: number
  rooms: Array<{
    type: string
    boardBasis: string
    price: number
  }>
  addOns?: {
    extraBed: boolean
    airportTransfer: boolean
    meals: boolean
    insurance: boolean
  }
  totalAmount: number
  finalAmount: number
  paymentMode: string
  bookingDate: string
  specialRequests?: string
}

export function generateHotelVoucherPDF(data: HotelVoucherData) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  let yPos = 20

  // Helper function to format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Header with gradient effect (simulated with colored rectangle)
  doc.setFillColor(102, 126, 234) // Purple-blue gradient start
  doc.rect(0, 0, pageWidth, 50, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text("HOTEL VOUCHER", pageWidth / 2, 20, { align: "center" })

  doc.setFontSize(10)
  doc.text(`Booking ID: ${data.bookingId}`, 14, 30)
  doc.text(`Voucher Number: ${data.voucherNumber}`, pageWidth - 14, 30, { align: "right" })
  doc.text(`Booking Date: ${formatDate(data.bookingDate)}`, pageWidth / 2, 30, { align: "center" })

  yPos = 60

  // Hotel Information Section
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text("Hotel Details", 14, yPos)
  yPos += 10

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text(`${data.hotel.name}`, 14, yPos)
  yPos += 7

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  const stars = "★".repeat(data.hotel.rating) + "☆".repeat(5 - data.hotel.rating)
  doc.text(stars, 14, yPos)
  yPos += 6

  doc.text(`Location: ${data.hotel.location}`, 14, yPos)
  yPos += 6

  if (data.hotel.address) {
    doc.text(`Address: ${data.hotel.address}`, 14, yPos)
    yPos += 6
  }

  if (data.hotel.phone) {
    doc.text(`Phone: ${data.hotel.phone}`, 14, yPos)
    yPos += 6
  }

  yPos += 5

  // Check-in/Check-out Section
  doc.setDrawColor(200, 200, 200)
  doc.rect(14, yPos, pageWidth - 28, 30, "S")
  yPos += 8

  doc.setFontSize(11)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(0, 0, 0)
  doc.text("Check-in", 20, yPos)
  doc.text("Check-out", pageWidth / 2 + 10, yPos)
  yPos += 7

  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.text(formatDate(data.checkIn), 20, yPos)
  doc.text(formatDate(data.checkOut), pageWidth / 2 + 10, yPos)
  yPos += 7

  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`${data.nights} Night${data.nights !== 1 ? "s" : ""}`, 20, yPos)
  doc.text(
    `${Math.ceil((new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / (1000 * 60 * 60 * 24))} Night${data.nights !== 1 ? "s" : ""}`,
    pageWidth / 2 + 10,
    yPos,
  )

  yPos += 15

  // Guest Information
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(0, 0, 0)
  doc.text("Guest Information", 14, yPos)
  yPos += 10

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`Name: ${data.guest.name}`, 14, yPos)
  yPos += 6
  doc.text(`Mobile: ${data.guest.mobile}`, 14, yPos)
  yPos += 6

  if (data.guest.nationality) {
    doc.text(`Nationality: ${data.guest.nationality}`, 14, yPos)
    yPos += 6
  }

  if (data.guest.gstin) {
    doc.text(`GSTIN: ${data.guest.gstin}`, 14, yPos)
    yPos += 6
  }

  yPos += 5

  // Room Details
  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text("Room Details", 14, yPos)
  yPos += 10

  data.rooms.forEach((room, index) => {
    if (yPos > pageHeight - 50) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.text(`Room ${index + 1}: ${room.type}`, 14, yPos)
    yPos += 6

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Board Basis: ${room.boardBasis}`, 20, yPos)
    yPos += 6
    doc.text(`Price: ₹${room.price.toLocaleString("en-IN")} per night`, 20, yPos)
    yPos += 8
  })

  // Add-ons
  if (data.addOns && (data.addOns.extraBed || data.addOns.airportTransfer || data.addOns.meals || data.addOns.insurance)) {
    if (yPos > pageHeight - 50) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Add-ons", 14, yPos)
    yPos += 10

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    if (data.addOns.extraBed) {
      doc.text("✓ Extra Bed", 20, yPos)
      yPos += 6
    }
    if (data.addOns.airportTransfer) {
      doc.text("✓ Airport Transfer", 20, yPos)
      yPos += 6
    }
    if (data.addOns.meals) {
      doc.text("✓ Additional Meals", 20, yPos)
      yPos += 6
    }
    if (data.addOns.insurance) {
      doc.text("✓ Travel Insurance", 20, yPos)
      yPos += 6
    }
    yPos += 5
  }

  // Special Requests
  if (data.specialRequests) {
    if (yPos > pageHeight - 50) {
      doc.addPage()
      yPos = 20
    }

    doc.setFontSize(11)
    doc.setFont("helvetica", "bold")
    doc.text("Special Requests", 14, yPos)
    yPos += 7

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    const splitText = doc.splitTextToSize(data.specialRequests, pageWidth - 40)
    doc.text(splitText, 20, yPos)
    yPos += splitText.length * 6 + 5
  }

  // Price Breakdown
  if (yPos > pageHeight - 80) {
    doc.addPage()
    yPos = 20
  }

  doc.setDrawColor(200, 200, 200)
  doc.rect(14, yPos, pageWidth - 28, 50, "S")
  yPos += 8

  doc.setFontSize(16)
  doc.setFont("helvetica", "bold")
  doc.text("Price Breakdown", 20, yPos)
  yPos += 10

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`Base Amount:`, 20, yPos)
  doc.text(`₹${data.totalAmount.toLocaleString("en-IN")}`, pageWidth - 20, yPos, { align: "right" })
  yPos += 7

  if (data.totalAmount !== data.finalAmount) {
    const discount = data.totalAmount - data.finalAmount
    doc.text(`Discount:`, 20, yPos)
    doc.setTextColor(0, 150, 0)
    doc.text(`-₹${discount.toLocaleString("en-IN")}`, pageWidth - 20, yPos, { align: "right" })
    doc.setTextColor(0, 0, 0)
    yPos += 7
  }

  doc.setDrawColor(200, 200, 200)
  doc.line(20, yPos, pageWidth - 20, yPos)
  yPos += 7

  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text(`Total Amount:`, 20, yPos)
  doc.text(`₹${data.finalAmount.toLocaleString("en-IN")}`, pageWidth - 20, yPos, { align: "right" })
  yPos += 8

  doc.setFontSize(9)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(100, 100, 100)
  doc.text(`Payment Mode: ${data.paymentMode}`, 20, yPos)

  // Footer
  yPos = pageHeight - 30
  doc.setDrawColor(200, 200, 200)
  doc.line(14, yPos, pageWidth - 14, yPos)
  yPos += 5

  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  const footerText = [
    "Important: Please carry a valid ID proof and this voucher to the hotel.",
    "For any queries, contact support at support@makemove.com or call +91-1800-XXX-XXXX",
    `Voucher Number: ${data.voucherNumber}`,
  ]

  footerText.forEach((text) => {
    doc.text(text, pageWidth / 2, yPos, { align: "center" })
    yPos += 4
  })

  // Save PDF
  const filename = `hotel-voucher-${data.voucherNumber}.pdf`
  doc.save(filename)

  return filename
}







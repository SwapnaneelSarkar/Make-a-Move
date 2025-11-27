// Ticket Generator Utility
// Generates professional flight ticket in HTML/PDF format

export interface TicketData {
  bookingId: string
  pnr: string
  flight: {
    airline: string
    flightNumber: string
    departure: {
      code: string
      city: string
      time: string
    }
    arrival: {
      code: string
      city: string
      time: string
    }
    duration: string
  }
  passenger: {
    name: string
    dob: string
    gender: string
    mobile: string
    email: string
    passport?: string
  }
  passengerCount: {
    adults: number
    children: number
    infants: number
  }
  bookingDate: string
  totalAmount: number
  ancillaries?: {
    extraBaggage: boolean
    mealSelection: boolean
    seatSelection: boolean
  }
}

export function generateTicketHTML(data: TicketData): string {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const ancillariesTotal =
    (data.ancillaries?.extraBaggage ? 1500 : 0) +
    (data.ancillaries?.mealSelection ? 1200 : 0) +
    (data.ancillaries?.seatSelection ? 800 : 0)

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flight Ticket - ${data.bookingId}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    .ticket {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .ticket-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .ticket-header h1 {
      font-size: 28px;
      margin-bottom: 10px;
      font-weight: 600;
    }
    .ticket-header .booking-info {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 15px;
      font-size: 14px;
      opacity: 0.95;
    }
    .ticket-body {
      padding: 30px;
    }
    .flight-section {
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 25px;
    }
    .flight-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #e5e7eb;
    }
    .airline-name {
      font-size: 22px;
      font-weight: 600;
      color: #1f2937;
    }
    .flight-number {
      font-size: 16px;
      color: #6b7280;
    }
    .route-info {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 20px;
      align-items: center;
      margin: 25px 0;
    }
    .airport {
      text-align: center;
    }
    .airport-code {
      font-size: 32px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 5px;
    }
    .airport-city {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
    }
    .airport-time {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
    }
    .airport-date {
      font-size: 12px;
      color: #9ca3af;
    }
    .route-line {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }
    .route-duration {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }
    .route-arrow {
      width: 60px;
      height: 2px;
      background: #d1d5db;
      position: relative;
    }
    .route-arrow::after {
      content: '';
      position: absolute;
      right: -6px;
      top: -4px;
      width: 0;
      height: 0;
      border-left: 8px solid #d1d5db;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
    .passenger-section {
      background: #f9fafb;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .passenger-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .detail-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .detail-value {
      font-size: 15px;
      font-weight: 500;
      color: #1f2937;
    }
    .ancillaries-section {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
    .ancillaries-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }
    .ancillary-badge {
      background: #e0e7ff;
      color: #4338ca;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
    }
    .price-breakdown {
      background: #f9fafb;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
    }
    .price-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
    }
    .price-row.total {
      border-top: 2px solid #e5e7eb;
      margin-top: 10px;
      padding-top: 15px;
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
    }
    .price-label {
      color: #6b7280;
    }
    .price-value {
      font-weight: 600;
      color: #1f2937;
    }
    .ticket-footer {
      background: #f9fafb;
      padding: 20px 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer-text {
      font-size: 12px;
      color: #6b7280;
      line-height: 1.6;
    }
    .barcode {
      margin-top: 15px;
      padding: 15px;
      background: white;
      border-radius: 6px;
      display: inline-block;
    }
    .barcode-text {
      font-family: 'Courier New', monospace;
      font-size: 24px;
      letter-spacing: 3px;
      font-weight: 700;
      color: #1f2937;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .ticket {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="ticket-header">
      <h1>FLIGHT TICKET</h1>
      <div class="booking-info">
        <div>
          <strong>Booking ID:</strong> ${data.bookingId}
        </div>
        <div>
          <strong>PNR:</strong> ${data.pnr}
        </div>
      </div>
    </div>
    
    <div class="ticket-body">
      <div class="flight-section">
        <div class="flight-header">
          <div>
            <div class="airline-name">${data.flight.airline}</div>
            <div class="flight-number">Flight ${data.flight.flightNumber}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: #6b7280;">Booking Date</div>
            <div style="font-size: 16px; font-weight: 600; color: #1f2937;">
              ${formatDate(data.bookingDate)}
            </div>
          </div>
        </div>
        
        <div class="route-info">
          <div class="airport">
            <div class="airport-code">${data.flight.departure.code}</div>
            <div class="airport-city">${data.flight.departure.city}</div>
            <div class="airport-time">${formatTime(data.flight.departure.time)}</div>
            <div class="airport-date">${formatDate(data.flight.departure.time)}</div>
          </div>
          
          <div class="route-line">
            <div class="route-duration">${data.flight.duration}</div>
            <div class="route-arrow"></div>
          </div>
          
          <div class="airport">
            <div class="airport-code">${data.flight.arrival.code}</div>
            <div class="airport-city">${data.flight.arrival.city}</div>
            <div class="airport-time">${formatTime(data.flight.arrival.time)}</div>
            <div class="airport-date">${formatDate(data.flight.arrival.time)}</div>
          </div>
        </div>
      </div>
      
      <div class="passenger-section">
        <div class="section-title">Passenger Information</div>
        <div class="passenger-details">
          <div class="detail-item">
            <div class="detail-label">Passenger Name</div>
            <div class="detail-value">${data.passenger.name}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Date of Birth</div>
            <div class="detail-value">${formatDate(data.passenger.dob)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Gender</div>
            <div class="detail-value">${data.passenger.gender.charAt(0).toUpperCase() + data.passenger.gender.slice(1)}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Mobile</div>
            <div class="detail-value">${data.passenger.mobile}</div>
          </div>
          <div class="detail-item">
            <div class="detail-label">Email</div>
            <div class="detail-value">${data.passenger.email}</div>
          </div>
          ${data.passenger.passport ? `
          <div class="detail-item">
            <div class="detail-label">Passport</div>
            <div class="detail-value">${data.passenger.passport}</div>
          </div>
          ` : ""}
          <div class="detail-item">
            <div class="detail-label">Travelers</div>
            <div class="detail-value">
              ${data.passengerCount.adults} Adult${data.passengerCount.adults !== 1 ? "s" : ""}
              ${data.passengerCount.children > 0 ? `, ${data.passengerCount.children} Child${data.passengerCount.children !== 1 ? "ren" : ""}` : ""}
              ${data.passengerCount.infants > 0 ? `, ${data.passengerCount.infants} Infant${data.passengerCount.infants !== 1 ? "s" : ""}` : ""}
            </div>
          </div>
        </div>
        
        ${data.ancillaries && (data.ancillaries.extraBaggage || data.ancillaries.mealSelection || data.ancillaries.seatSelection) ? `
        <div class="ancillaries-section">
          <div class="section-title">Selected Ancillaries</div>
          <div class="ancillaries-list">
            ${data.ancillaries.extraBaggage ? '<span class="ancillary-badge">Extra Baggage</span>' : ''}
            ${data.ancillaries.mealSelection ? '<span class="ancillary-badge">Meal Selection</span>' : ''}
            ${data.ancillaries.seatSelection ? '<span class="ancillary-badge">Seat Selection</span>' : ''}
          </div>
        </div>
        ` : ""}
      </div>
      
      <div class="price-breakdown">
        <div class="section-title">Price Breakdown</div>
        <div class="price-row">
          <span class="price-label">Base Fare</span>
          <span class="price-value">₹${(data.totalAmount - 3750 - ancillariesTotal).toLocaleString("en-IN")}</span>
        </div>
        <div class="price-row">
          <span class="price-label">Taxes & Fees</span>
          <span class="price-value">₹3,750</span>
        </div>
        ${ancillariesTotal > 0 ? `
        <div class="price-row">
          <span class="price-label">Ancillaries</span>
          <span class="price-value">₹${ancillariesTotal.toLocaleString("en-IN")}</span>
        </div>
        ` : ""}
        <div class="price-row total">
          <span class="price-label">Total Amount</span>
          <span class="price-value">₹${data.totalAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
    
    <div class="ticket-footer">
      <div class="barcode">
        <div class="barcode-text">${data.pnr}</div>
      </div>
      <div class="footer-text">
        <p><strong>Important:</strong> Please arrive at the airport at least 2 hours before departure for domestic flights and 3 hours for international flights.</p>
        <p style="margin-top: 10px;">This is an electronic ticket. Please carry a valid ID proof and this ticket (digital or printed) to the airport.</p>
        <p style="margin-top: 10px; color: #9ca3af;">For any queries, contact support at support@makemove.com or call +91-1800-XXX-XXXX</p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}

export function downloadTicket(data: TicketData) {
  const html = generateTicketHTML(data)
  const blob = new Blob([html], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `Flight-Ticket-${data.bookingId}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  // Also open in new window for printing
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()
    // Auto-print after a short delay
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }
}







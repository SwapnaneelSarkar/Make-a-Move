// Calendar sync utilities - Generate .ics files

import { bookingsDB, type Booking } from "./local-db"

// Generate .ics file content
function generateICS(bookings: Booking[]): string {
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

  let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Travel Booking Platform//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`

  bookings.forEach((booking) => {
    const startDate = new Date(booking.date)
    const endDate = new Date(startDate)
    if (booking.type === "HOTEL") {
      endDate.setDate(endDate.getDate() + 1) // Assume 1 night for hotels
    } else {
      endDate.setHours(endDate.getHours() + 2) // Assume 2 hours for flights
    }

    const dtstart = startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    const dtend = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

    const summary = `${booking.type} - ${booking.bookingId}`
    const description = `Booking ID: ${booking.bookingId}\nPNR: ${booking.pnr}\nAmount: ₹${booking.amount.toLocaleString("en-IN")}\nAgent: ${booking.agentName}`

    icsContent += `BEGIN:VEVENT
UID:${booking.id}@travel-booking-platform
DTSTAMP:${now}
DTSTART:${dtstart}
DTEND:${dtend}
SUMMARY:${summary}
DESCRIPTION:${description.replace(/\n/g, "\\n")}
STATUS:CONFIRMED
END:VEVENT
`
  })

  icsContent += `END:VCALENDAR`

  return icsContent
}

// Download .ics file
export async function downloadCalendarSync() {
  try {
    const bookings = await bookingsDB.readAll()
    const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED" || b.status === "COMPLETED")

    if (confirmedBookings.length === 0) {
      throw new Error("No confirmed bookings to sync")
    }

    const icsContent = generateICS(confirmedBookings)
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", `travel-bookings-${new Date().toISOString().slice(0, 10)}.ics`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    return true
  } catch (error) {
    console.error("Failed to generate calendar sync:", error)
    throw error
  }
}







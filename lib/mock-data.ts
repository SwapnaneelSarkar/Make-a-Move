// Comprehensive mock data for the Travel Booking Platform

export type Role = 
  | "SUPER_ADMIN" 
  | "AGENCY_ADMIN"  // Previously CORPORATE_ADMIN
  | "AGENT"  // Previously EMPLOYEE
  | "SUB_AGENT"
  | "FINANCE_TEAM"
  | "SUPPORT_TEAM"
  | "KYC_COMPLIANCE_TEAM"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar: string
  department?: string
  policyId?: string
  walletBalance?: number
}

export interface HotelRoom {
  id: string
  type: string
  description: string
  maxOccupancy: number
  pricePerNight: number
  available: boolean
  boardBasis: {
    id: string
    name: string
    price: number
  }[]
  cancellationPolicy: string
  inclusions: string[]
}

export interface Hotel {
  id: string
  name: string
  location: string
  rating: number
  pricePerNight: number
  currency: string
  image: string
  amenities: string[]
  description: string
  policyCompliant: boolean
  rooms?: HotelRoom[]
  requiresNationality?: boolean
  requiresGST?: boolean
  minAge?: number
}

export interface Flight {
  id: string
  airline: string
  airlineLogo: string
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
  price: number
  currency: string
  policyCompliant: boolean
  stops: number
}

export interface Booking {
  id: string
  type: "FLIGHT" | "HOTEL"
  status: "CONFIRMED" | "PENDING_APPROVAL" | "CANCELLED" | "COMPLETED" | "REFUNDED"
  details: any
  date: string
  amount: number
  agentName: string
  agentId: string
  approvalStatus?: "APPROVED" | "REJECTED" | "PENDING"
}

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Alex Super",
    email: "superadmin@example.com",
    role: "SUPER_ADMIN",
    avatar: "/admin-interface.png",
  },
  {
    id: "u2",
    name: "Sarah Agency",
    email: "agencyadmin@example.com",
    role: "AGENCY_ADMIN",
    avatar: "/diverse-team-manager.png",
    department: "Operations",
    walletBalance: 25000,
  },
  {
    id: "u3",
    name: "John Agent",
    email: "agent@example.com",
    role: "AGENT",
    avatar: "/diverse-office-employee.png",
    department: "Sales",
    policyId: "p1",
  },
  {
    id: "u4",
    name: "Mike SubAgent",
    email: "subagent@example.com",
    role: "SUB_AGENT",
    avatar: "/placeholder-user.jpg",
    department: "Sales",
    walletBalance: 5000,
  },
  {
    id: "u5",
    name: "Emma Finance",
    email: "finance@example.com",
    role: "FINANCE_TEAM",
    avatar: "/placeholder-user.jpg",
    department: "Finance",
  },
  {
    id: "u6",
    name: "David Support",
    email: "support@example.com",
    role: "SUPPORT_TEAM",
    avatar: "/placeholder-user.jpg",
    department: "Support",
  },
  {
    id: "u7",
    name: "Lisa KYC",
    email: "kyc@example.com",
    role: "KYC_COMPLIANCE_TEAM",
    avatar: "/placeholder-user.jpg",
    department: "Compliance",
  },
]

// Mock Hotels
export const MOCK_HOTELS: Hotel[] = [
  {
    id: "h1",
    name: "Grand Hyatt Mumbai",
    location: "Mumbai, India",
    rating: 4.8,
    pricePerNight: 15000,
    currency: "INR",
    image: "/luxury-hotel-room.png",
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Breakfast"],
    description: "Luxury hotel located in the heart of Mumbai with state-of-the-art amenities.",
    policyCompliant: true,
    requiresNationality: true,
    requiresGST: true,
    minAge: 18,
    rooms: [
      {
        id: "r1",
        type: "Deluxe King Room",
        description: "King bed, City view, Free WiFi, 35 sqm",
        maxOccupancy: 2,
        pricePerNight: 15000,
        available: true,
        boardBasis: [
          { id: "ro", name: "Room Only", price: 0 },
          { id: "bb", name: "Bed & Breakfast", price: 2000 },
          { id: "hb", name: "Half Board", price: 3500 },
          { id: "fb", name: "Full Board", price: 5000 },
        ],
        cancellationPolicy: "Free cancellation until 48 hours before check-in",
        inclusions: ["WiFi", "Air Conditioning", "TV", "Mini Bar"],
      },
      {
        id: "r2",
        type: "Club Suite",
        description: "Lounge access, Breakfast included, 50 sqm",
        maxOccupancy: 3,
        pricePerNight: 23000,
        available: true,
        boardBasis: [
          { id: "ro", name: "Room Only", price: 0 },
          { id: "bb", name: "Bed & Breakfast", price: 2000 },
          { id: "hb", name: "Half Board", price: 3500 },
          { id: "fb", name: "Full Board", price: 5000 },
        ],
        cancellationPolicy: "Free cancellation until 72 hours before check-in",
        inclusions: ["WiFi", "Air Conditioning", "TV", "Mini Bar", "Lounge Access", "Breakfast"],
      },
    ],
  },
  {
    id: "h2",
    name: "Ibis Styles Bangalore",
    location: "Bangalore, India",
    rating: 4.2,
    pricePerNight: 7000,
    currency: "INR",
    image: "/modern-hotel-room.png",
    amenities: ["WiFi", "Restaurant", "Meeting Rooms"],
    description: "Contemporary hotel perfect for business travelers.",
    policyCompliant: true,
    requiresNationality: false,
    requiresGST: false,
    rooms: [
      {
        id: "r3",
        type: "Standard Twin Room",
        description: "Twin beds, City view, Free WiFi, 25 sqm",
        maxOccupancy: 2,
        pricePerNight: 7000,
        available: true,
        boardBasis: [
          { id: "ro", name: "Room Only", price: 0 },
          { id: "bb", name: "Bed & Breakfast", price: 1500 },
        ],
        cancellationPolicy: "Free cancellation until 24 hours before check-in",
        inclusions: ["WiFi", "Air Conditioning", "TV"],
      },
      {
        id: "r4",
        type: "Executive Room",
        description: "King bed, Workspace, Free WiFi, 30 sqm",
        maxOccupancy: 2,
        pricePerNight: 9000,
        available: true,
        boardBasis: [
          { id: "ro", name: "Room Only", price: 0 },
          { id: "bb", name: "Bed & Breakfast", price: 1500 },
        ],
        cancellationPolicy: "Free cancellation until 24 hours before check-in",
        inclusions: ["WiFi", "Air Conditioning", "TV", "Workspace"],
      },
    ],
  },
  {
    id: "h3",
    name: "The Oberoi New Delhi",
    location: "New Delhi, India",
    rating: 4.9,
    pricePerNight: 21000,
    currency: "INR",
    image: "/luxury-lobby.jpg",
    amenities: ["WiFi", "Pool", "Spa", "Fine Dining", "Concierge"],
    description: "Iconic luxury hotel overlooking the Delhi Golf Course.",
    policyCompliant: false, // Too expensive for standard policy
    requiresNationality: true,
    requiresGST: true,
    minAge: 18,
    rooms: [
      {
        id: "r5",
        type: "Deluxe Room",
        description: "King bed, Golf course view, 45 sqm",
        maxOccupancy: 2,
        pricePerNight: 21000,
        available: true,
        boardBasis: [
          { id: "ro", name: "Room Only", price: 0 },
          { id: "bb", name: "Bed & Breakfast", price: 3000 },
          { id: "hb", name: "Half Board", price: 5000 },
          { id: "fb", name: "Full Board", price: 7000 },
        ],
        cancellationPolicy: "Free cancellation until 7 days before check-in",
        inclusions: ["WiFi", "Air Conditioning", "TV", "Mini Bar", "Butler Service"],
      },
    ],
  },
]

// Mock Flights - Expanded dataset
export const MOCK_FLIGHTS: Flight[] = [
  // Delhi to Mumbai routes
  {
    id: "f1",
    airline: "Indigo",
    airlineLogo: "/indigo-logo.jpg",
    flightNumber: "6E-554",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T08:00:00" },
    arrival: { code: "BOM", city: "Mumbai", time: "2024-06-15T10:15:00" },
    duration: "2h 15m",
    price: 10000,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  {
    id: "f2",
    airline: "Air India",
    airlineLogo: "/air-india-logo.jpg",
    flightNumber: "AI-887",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T09:30:00" },
    arrival: { code: "BOM", city: "Mumbai", time: "2024-06-15T11:45:00" },
    duration: "2h 15m",
    price: 12000,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  {
    id: "f3",
    airline: "Vistara",
    airlineLogo: "/vistara-logo.jpg",
    flightNumber: "UK-994",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T14:00:00" },
    arrival: { code: "BOM", city: "Mumbai", time: "2024-06-15T16:10:00" },
    duration: "2h 10m",
    price: 17500,
    currency: "INR",
    policyCompliant: false, // Business class mock
    stops: 0,
  },
  {
    id: "f4",
    airline: "Indigo",
    airlineLogo: "/indigo-logo.jpg",
    flightNumber: "6E-612",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T06:30:00" },
    arrival: { code: "BOM", city: "Mumbai", time: "2024-06-15T08:45:00" },
    duration: "2h 15m",
    price: 9500,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  {
    id: "f5",
    airline: "SpiceJet",
    airlineLogo: "/placeholder-logo.svg",
    flightNumber: "SG-234",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T11:00:00" },
    arrival: { code: "BOM", city: "Mumbai", time: "2024-06-15T13:20:00" },
    duration: "2h 20m",
    price: 8800,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  {
    id: "f6",
    airline: "Go First",
    airlineLogo: "/placeholder-logo.svg",
    flightNumber: "G8-456",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T16:30:00" },
    arrival: { code: "BOM", city: "Mumbai", time: "2024-06-15T18:50:00" },
    duration: "2h 20m",
    price: 9200,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  // Delhi to Bangalore routes
  {
    id: "f7",
    airline: "Indigo",
    airlineLogo: "/indigo-logo.jpg",
    flightNumber: "6E-789",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T07:00:00" },
    arrival: { code: "BLR", city: "Bangalore", time: "2024-06-15T09:45:00" },
    duration: "2h 45m",
    price: 11000,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  {
    id: "f8",
    airline: "Air India",
    airlineLogo: "/air-india-logo.jpg",
    flightNumber: "AI-512",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T10:00:00" },
    arrival: { code: "BLR", city: "Bangalore", time: "2024-06-15T12:50:00" },
    duration: "2h 50m",
    price: 13000,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  {
    id: "f9",
    airline: "Vistara",
    airlineLogo: "/vistara-logo.jpg",
    flightNumber: "UK-823",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T15:30:00" },
    arrival: { code: "BLR", city: "Bangalore", time: "2024-06-15T18:15:00" },
    duration: "2h 45m",
    price: 16000,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  // Mumbai to Bangalore routes
  {
    id: "f10",
    airline: "Indigo",
    airlineLogo: "/indigo-logo.jpg",
    flightNumber: "6E-345",
    departure: { code: "BOM", city: "Mumbai", time: "2024-06-15T08:30:00" },
    arrival: { code: "BLR", city: "Bangalore", time: "2024-06-15T10:00:00" },
    duration: "1h 30m",
    price: 7500,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  {
    id: "f11",
    airline: "SpiceJet",
    airlineLogo: "/placeholder-logo.svg",
    flightNumber: "SG-567",
    departure: { code: "BOM", city: "Mumbai", time: "2024-06-15T12:00:00" },
    arrival: { code: "BLR", city: "Bangalore", time: "2024-06-15T13:35:00" },
    duration: "1h 35m",
    price: 7200,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  // Delhi to Chennai routes
  {
    id: "f12",
    airline: "Indigo",
    airlineLogo: "/indigo-logo.jpg",
    flightNumber: "6E-901",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T09:00:00" },
    arrival: { code: "MAA", city: "Chennai", time: "2024-06-15T11:30:00" },
    duration: "2h 30m",
    price: 10500,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  {
    id: "f13",
    airline: "Air India",
    airlineLogo: "/air-india-logo.jpg",
    flightNumber: "AI-678",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T13:00:00" },
    arrival: { code: "MAA", city: "Chennai", time: "2024-06-15T15:40:00" },
    duration: "2h 40m",
    price: 12500,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  // Mumbai to Chennai routes
  {
    id: "f14",
    airline: "Indigo",
    airlineLogo: "/indigo-logo.jpg",
    flightNumber: "6E-234",
    departure: { code: "BOM", city: "Mumbai", time: "2024-06-15T10:00:00" },
    arrival: { code: "MAA", city: "Chennai", time: "2024-06-15T11:45:00" },
    duration: "1h 45m",
    price: 8000,
    currency: "INR",
    policyCompliant: true,
    stops: 0,
  },
  // Routes with stops
  {
    id: "f15",
    airline: "SpiceJet",
    airlineLogo: "/placeholder-logo.svg",
    flightNumber: "SG-890",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T08:00:00" },
    arrival: { code: "BLR", city: "Bangalore", time: "2024-06-15T12:30:00" },
    duration: "4h 30m",
    price: 8500,
    currency: "INR",
    policyCompliant: true,
    stops: 1,
  },
  {
    id: "f16",
    airline: "Go First",
    airlineLogo: "/placeholder-logo.svg",
    flightNumber: "G8-123",
    departure: { code: "BOM", city: "Mumbai", time: "2024-06-15T14:00:00" },
    arrival: { code: "MAA", city: "Chennai", time: "2024-06-15T17:20:00" },
    duration: "3h 20m",
    price: 7800,
    currency: "INR",
    policyCompliant: true,
    stops: 1,
  },
  // Premium/Business class options
  {
    id: "f17",
    airline: "Vistara",
    airlineLogo: "/vistara-logo.jpg",
    flightNumber: "UK-456",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T11:00:00" },
    arrival: { code: "BOM", city: "Mumbai", time: "2024-06-15T13:10:00" },
    duration: "2h 10m",
    price: 25000,
    currency: "INR",
    policyCompliant: false, // Business class - out of policy
    stops: 0,
  },
  {
    id: "f18",
    airline: "Air India",
    airlineLogo: "/air-india-logo.jpg",
    flightNumber: "AI-999",
    departure: { code: "DEL", city: "New Delhi", time: "2024-06-15T16:00:00" },
    arrival: { code: "BLR", city: "Bangalore", time: "2024-06-15T18:45:00" },
    duration: "2h 45m",
    price: 22000,
    currency: "INR",
    policyCompliant: false, // Premium class - out of policy
    stops: 0,
  },
]

// Mock Bookings (Mixed types for dashboard)
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "b1",
    type: "FLIGHT",
    status: "CONFIRMED",
    details: MOCK_FLIGHTS[0],
    date: "2024-05-20",
    amount: 10000,
    agentName: "John Agent",
    agentId: "u3",
  },
  {
    id: "b2",
    type: "HOTEL",
    status: "PENDING_APPROVAL",
    details: MOCK_HOTELS[2],
    date: "2024-06-01",
    amount: 21000,
    agentName: "John Agent",
    agentId: "u3",
    approvalStatus: "PENDING",
  },
  {
    id: "b3",
    type: "FLIGHT",
    status: "REFUNDED",
    details: MOCK_FLIGHTS[1],
    date: "2024-04-10",
    amount: 12000,
    agentName: "Sarah Agency",
    agentId: "u2",
  },
]

export const MOCK_STATS = {
  totalSpend: 125000,
  activeTravelers: 45,
  pendingApprovals: 8,
  policyViolations: 3,
}

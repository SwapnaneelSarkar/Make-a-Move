# Make a Move - B2B Travel Booking Platform

## Project Overview

**Make a Move** is a comprehensive B2B travel booking and management platform built with Next.js 16, React 19, TypeScript, and Tailwind CSS. The platform enables travel agencies to manage agent bookings, approvals, policies, and expenses in a unified system.

**Platform Name:** Make a Move  
**Type:** Enterprise Travel Booking & Management System  
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Zustand, Radix UI

---

## Table of Contents

1. [Architecture & Technology Stack](#architecture--technology-stack)
2. [User Roles & Permissions](#user-roles--permissions)
3. [Core Features](#core-features)
4. [Modules & Pages](#modules--pages)
5. [Components](#components)
6. [State Management](#state-management)
7. [UI/UX Features](#uiux-features)
8. [Security & Compliance](#security--compliance)
9. [Mock Data Structure](#mock-data-structure)
10. [Project Structure](#project-structure)

---

## Architecture & Technology Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **UI:** Radix UI (30+ components), Tailwind CSS 4, Lucide React
- **State:** Zustand, React Hook Form, Zod
- **Other:** date-fns, recharts, cmdk, sonner, next-themes

---

## User Roles & Permissions

The platform supports seven distinct user roles with granular View/Edit/Approve permission-based access control. Each permission is defined with three action levels:
- **View**: Can see/read the data
- **Edit**: Can modify/update the data
- **Approve**: Can approve/reject/authorize actions

### 1. **SUPER_ADMIN**
Full access to all modules, user management, system settings, financial reports, and audit logs.

### 2. **AGENCY_ADMIN**
Manages agency bookings, agents, wallet, and markups. Cannot access system settings or approve refunds.

### 3. **AGENT**
Can create bookings, view own bookings, edit passenger/guest details before confirmation. Cannot view other agents' data or change settings.

### 4. **SUB_AGENT**
Limited access: own bookings only, assigned wallet balance, edit passenger info before booking. Cannot change markups or view main agent data.

### 5. **FINANCE_TEAM**
Manages wallet transactions, refunds, invoices. Can approve refunds and wallet top-ups. Cannot create bookings or manage roles.

### 6. **SUPPORT_TEAM**
Manages disputes and support tickets. Can close/reject disputes. Cannot create bookings or modify financial data.

### 7. **KYC_COMPLIANCE_TEAM**
Reviews and approves/rejects KYC documents. Cannot access bookings or wallet.

---

## Core Features

### 1. **Multi-Product Booking System**

#### Flight Booking
7-stage flow: Search → Listing → Fare Review → Passenger Details → Ancillaries → Payment → Confirmed. Includes policy compliance, airline filters, and real-time pricing.

#### Hotel Booking
6-stage flow: Search → Listing → Room Selection → Guest Details → Payment → Confirmed. Includes location search, star rating, amenities filters, and policy compliance.

**Note:** Only Flights and Hotels supported.

### 2. **Approval Workflow System**
Pending approvals dashboard with request tracking, policy compliance status, one-click approve/reject, and auto-approval for compliant bookings.

### 3. **Travel Policy Management**
Configurable policies (Default, Executive, Department-specific) with flight price limits, cabin class restrictions, hotel rate limits, and approval workflow settings.

### 4. **Agent Management**
Agent listing with search, role/policy assignment, status tracking, email masking, and export functionality.

### 5. **Agency Wallet Management**
Balance tracking, transaction history, budget management, add funds, and export statements.

### 6. **Booking Management**
Comprehensive booking list with search, status filtering, bulk actions (resend tickets, export, cancel), and detailed booking information.

### 7. **Reports & Analytics**
Monthly spend charts, department breakdowns, spending trends, and export capabilities (PDF, CSV, scheduled reports).

### 8. **Dispute Resolution Center**
Dispute tracking with status timeline (Raised → Acknowledged → Under Review → Resolution Proposed → Closed), communication interface, and file attachments.

### 9. **Refund Management**
Refund request creation with booking selection, reason types, full/partial options, and status tracking.

### 10. **KYC Verification**
Document upload (PAN, GST, Address Proof), business details validation, status tracking (Submitted → In Progress → Approved/Rejected), and re-submission capability.

### 11. **Booking Calendar**
Month/Week/Day views with color-coded status, filters by type and status, booking details modal, and CSV export.

### 12. **Audit Logs**
Tracks CREATE, UPDATE, DELETE, APPROVE, REVEAL actions with timestamp, user, module, IP address. Includes search, filtering, and CSV export.

### 13. **Corporate Management (Super Admin)**
Corporate listing with industry tracking, employee count, spend tracking, status management, and platform metrics.

### 14. **Platform Settings (Super Admin)**
General settings (maintenance mode, support email, default currency INR/₹), notification preferences (Email/SMS/WhatsApp channels and types), and platform fees configuration.


### 15. **Session Management**
30-minute timeout with 2-minute warning, activity tracking, and auto-logout.

### 16. **Global Search**
Command palette (⌘K) for searching flights, hotels, bookings, and disputes.

### 17. **Support Widget**
Floating chat widget with real-time messaging, file attachments, and message history.

---

## Modules & Pages

### Dashboard Pages

1. **`/dashboard`** - Main dashboard with stats and recent bookings
2. **`/dashboard/flights`** - Flight booking interface
3. **`/dashboard/hotels`** - Hotel booking interface
4. **`/dashboard/bookings`** - All bookings management
5. **`/dashboard/employees`** - Agent management
6. **`/dashboard/approvals`** - Approval workflow
7. **`/dashboard/policies`** - Travel policy configuration
8. **`/dashboard/wallet`** - Corporate wallet
9. **`/dashboard/corporates`** - Corporate management (Super Admin)
10. **`/dashboard/settings`** - Platform settings (Super Admin)
11. **`/dashboard/reports`** - Reports & analytics
12. **`/dashboard/reports/scheduled`** - Scheduled Reports (form, table with Edit/Delete/Pause actions, generated reports with Download)
13. **`/dashboard/disputes`** - Dispute resolution
14. **`/dashboard/refunds`** - Refund management
15. **`/dashboard/calendar`** - Booking calendar view
16. **`/dashboard/kyc`** - KYC verification
17. **`/dashboard/audit-logs`** - Audit trail
18. **`/dashboard/profile`** - User profile
19. **`/dashboard/profile/login-history`** - Login history with device tracking
20. **`/dashboard/notifications`** - Notifications center with read/unread tracking
21. **`/dashboard/downloads`** - Download center for reports
22. **`/dashboard/system/errors`** - Error monitoring (Super Admin only)

**Note:** `/dashboard/contracts` and `/dashboard/performance` pages have been removed as they were not part of the original specification.

### Authentication

- **`/login`** - Login page with role-based authentication
  - Demo credentials display
  - Form validation
  - Session management

---

## Components

### Layout Components

1. **`Sidebar`** (`components/layout/sidebar.tsx`)
   - Role-based navigation
   - Dynamic menu items
   - User profile display

2. **`Header`** (`components/layout/header.tsx`)
   - Global search (Command palette)
   - Role switcher (demo)
   - Notifications
   - User menu

### Dashboard Components

1. **`StatsCards`** (`components/dashboard/stats-cards.tsx`)
   - Role-based statistics
   - Agent view: Upcoming trips, Pending approvals, Wallet balance, YTD spend
   - Admin view: Total spend, Active travelers, Pending approvals, Policy violations

2. **`RecentBookings`** (`components/dashboard/recent-bookings.tsx`)
   - Recent booking list
   - Status indicators
   - Quick actions

3. **`QuickLinksWidget`** (`components/dashboard/quick-links-widget.tsx`)
   - Quick access links
   - Common actions

4. **`PromotionalBanners`** (`components/dashboard/promotional-banners.tsx`)
   - Promotional content display

5. **`UrgentAlertsPanel`** (`components/dashboard/urgent-alerts-panel.tsx`)
   - Displays urgent alerts (refunds, payments, KYC)
   - One-click resolution buttons

6. **`WalletBalanceWidget`** (`components/dashboard/wallet-balance-widget.tsx`)
   - Real-time wallet balance display
   - Last updated timestamp
   - Refresh functionality

7. **`DashboardPersonalization`** (`components/dashboard/dashboard-personalization.tsx`)
   - Widget toggle on/off
   - Save preferences to localStorage

8. **`SessionTimer`** (`components/dashboard/session-timer.tsx`)
   - Session timeout warning
   - Activity tracking

### Booking Components

1. **`FlightSearch`** (`components/booking/flight-search.tsx`)
   - Flight search form
   - Origin/destination selection
   - Date picker

2. **`FlightCard`** (`components/booking/flight-card.tsx`)
   - Flight details display
   - Airline logo
   - Price and duration
   - Policy compliance indicator
   - Book button

3. **`HotelCard`** (`components/booking/hotel-card.tsx`)
   - Hotel details display
   - Rating and amenities
   - Price per night
   - Policy compliance indicator
   - Book button

4. **`SeatMap`** (`components/booking/seat-map.tsx`)
   - Interactive seat selection (6×20 grid)
   - Seat states: Available, Paid, Selected, Unavailable
   - Price display per seat

### UI Components (30+ Radix UI Components)

Located in `components/ui/`:
- Accordion, Alert, Alert Dialog, Aspect Ratio
- Avatar, Badge, Breadcrumb, Button, Button Group
- Calendar, Card, Carousel, Chart, Checkbox
- Collapsible, Command, Context Menu, Dialog, Drawer
- Dropdown Menu, Empty, Field, Form, Hover Card
- Input, Input Group, Input OTP, Item, KBD
- Label, Masked Text, Menubar, Navigation Menu
- Pagination, Popover, Progress, Radio Group
- Resizable, Scroll Area, Select, Separator
- Sheet, Sidebar, Skeleton, Slider, Sonner
- Spinner, Switch, Table, Tabs, Textarea
- Toast, Toaster, Toggle, Toggle Group, Tooltip

### Utility Components

1. **`SupportWidget`** (`components/support-widget.tsx`)
   - Floating chat widget
   - Message interface

2. **`ThemeProvider`** (`components/theme-provider.tsx`)
   - Theme management
   - Light/dark mode support

3. **`SystemStatusBanner`** (`components/layout/system-status-banner.tsx`)
   - System status notifications (Info/Warning/Error)
   - Dismissible with localStorage persistence

4. **`MFAModal`** (`components/mfa-modal.tsx`)
   - Multi-factor authentication placeholder
   - OTP input for critical actions

5. **`CalendarSyncButton`** (`components/calendar-sync-button.tsx`)
   - Google Calendar / Outlook Calendar sync
   - Mock integration placeholder

---

## State Management

### Zustand Store (`lib/store.ts`)

**State Structure:**
```typescript
{
  currentUser: User
  setCurrentUser: (user: User) => void
  setRole: (role: Role) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}
```

**Features:**
- User session management
- Role switching (demo)
- Loading states

---

## UI/UX Features

### Design System
- **Color Scheme:** Primary, secondary, muted, destructive colors
- **Typography:** Inter (sans-serif), Playfair Display (serif for headings)
- **Spacing:** Consistent padding and margins
- **Shadows:** Subtle elevation system
- **Borders:** Rounded corners, consistent border styles

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Collapsible sidebar on mobile
- Responsive tables and grids

### Accessibility
- Radix UI primitives (ARIA compliant)
- Keyboard navigation
- Screen reader support
- Focus management

### Animations
- Fade-in animations
- Slide transitions
- Hover effects
- Loading states
- Toast notifications

### User Experience
- Progressive disclosure
- Multi-step forms
- Real-time validation
- Error handling
- Success feedback
- Loading indicators

---

## Security & Compliance

### Security Features

1. **Session Management:**
   - 30-minute timeout
   - Activity tracking
   - Auto-logout

2. **Data Masking:**
   - Email masking component
   - Sensitive data protection

3. **Audit Logging:**
   - All actions logged
   - IP address tracking
   - User activity tracking


### Compliance Features

1. **Policy Compliance:**
   - Real-time policy checking
   - Violation alerts
   - Compliance indicators

2. **KYC Verification:**
   - Document verification
   - Business validation
   - Status tracking

---

## Mock Data Structure

### Data Types (`lib/mock-data.ts`)

1. **User:**
   - id, name, email, role, avatar
   - department, policyId, walletBalance

2. **Hotel:**
   - id, name, location, rating
   - pricePerNight, currency, image
   - amenities, description, policyCompliant

3. **Flight:**
   - id, airline, airlineLogo, flightNumber
   - departure (code, city, time)
   - arrival (code, city, time)
   - duration, price, currency
   - policyCompliant, stops

4. **Booking:**
   - id, type, status
   - details, date, amount
   - agentName, agentId
   - approvalStatus

### Mock Data Sets

- **MOCK_USERS:** 7 users (Super Admin, Agency Admin, Agent, Sub Agent, Finance Team, Support Team, KYC Team)
- **MOCK_HOTELS:** 3 hotels with varying prices and compliance
- **MOCK_FLIGHTS:** 3 flights from different airlines
- **MOCK_BOOKINGS:** Mixed booking types
- **MOCK_STATS:** Dashboard statistics

---

## Project Structure

```
travel-booking-platform/
├── app/
│   ├── dashboard/          # Dashboard pages
│   │   ├── approvals/
│   │   ├── audit-logs/
│   │   ├── bookings/
│   │   ├── calendar/
│   │   ├── contracts/
│   │   ├── corporates/
│   │   ├── disputes/
│   │   ├── employees/
│   │   ├── flights/
│   │   ├── hotels/
│   │   ├── kyc/
│   │   ├── policies/
│   │   ├── profile/
│   │   ├── refunds/
│   │   ├── reports/
│   │   ├── settings/
│   │   ├── wallet/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── login/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── booking/            # Booking-specific components
│   ├── dashboard/          # Dashboard widgets
│   ├── layout/             # Layout components
│   ├── ui/                 # UI component library
│   ├── support-widget.tsx
│   └── theme-provider.tsx
├── hooks/                  # Custom React hooks
├── lib/
│   ├── mock-data.ts        # Mock data
│   ├── store.ts            # Zustand store
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── styles/
│   └── globals.css
├── package.json
├── tsconfig.json
└── next.config.mjs
```

---

## Key Features Summary

### Booking Management
✅ Multi-product booking (Flights, Hotels only)  
✅ Multi-stage booking flows (7 stages for Flights, 6 stages for Hotels)  
✅ Policy compliance checking  
✅ Real-time pricing  
✅ Booking confirmation & tickets  
✅ Stage transition validation (blocks skipping, validates mandatory fields, locks previous stages)

### Approval & Workflow
✅ Approval workflow system  
✅ Policy violation detection  
✅ Auto-approval for compliant bookings  
✅ Approval history tracking

### Policy Management
✅ Flexible policy configuration  
✅ Department-specific policies  
✅ Price limits & restrictions  
✅ Approval rules

### Financial Management
✅ Corporate wallet  
✅ Transaction tracking  
✅ Budget management  
✅ Refund processing

### Analytics & Reporting
✅ Spending analytics  
✅ Department breakdowns  
✅ Export capabilities  
✅ Scheduled reports

### User Management
✅ Role-based access control  
✅ Agent management  
✅ Corporate management  
✅ Profile management

### Support & Compliance
✅ Dispute resolution  
✅ KYC verification  
✅ Audit logging  
✅ Support mode  
✅ Support widget

### Additional Features
✅ Booking calendar  
✅ Global search  
✅ Session management  
✅ Theme support  
✅ Responsive design

---

## Technology Highlights

- **Modern Stack:** Next.js 16, React 19, TypeScript
- **UI Framework:** Radix UI (30+ accessible components)
- **Styling:** Tailwind CSS 4 with custom design system
- **State Management:** Zustand for global state
- **Forms:** React Hook Form with Zod validation
- **Icons:** Lucide React
- **Notifications:** Sonner toast system
- **Date Handling:** date-fns
- **Charts:** Recharts (ready for implementation)

---

## Development Notes

### Demo Credentials
- **Super Admin:** superadmin@example.com / admin123
- **Corporate Admin:** agencyadmin@example.com / agency123
- **Agent:** agent@example.com / agent123

### Key Design Decisions
1. **Role-based navigation** - Different menu items per role
2. **Multi-stage booking flows** - Progressive disclosure
3. **Policy-first approach** - Compliance checking at every step
5. **Session management** - Security-focused timeout system

---

## Functional Requirements (FRs) - Implementation Status

This section documents all functional requirements with their current implementation status. 

**Legend:**
- ✅ **Implemented** - Feature is fully implemented in the codebase
- ⚠️ **Partially Implemented** - Feature exists but missing some requirements
- ❌ **Not Implemented** - Feature is not present in the codebase

### 1. Dashboard & User Interface

**FR1: Real-time Wallet Balance** ✅ **Implemented**
- ✅ Display wallet balance widget on dashboard
- ✅ Show last updated time in minutes ("Updated X minutes ago")
- ✅ Refresh button functionality
- ✅ Wallet is rechargeable (Add Funds button exists)
- ✅ Refunds can be credited directly to wallet (transaction log shows refunds)

**FR2: Urgent Alerts Panel** ✅ **Implemented**
- ✅ Display up to 5 urgent alerts
- ✅ Alerts for: pending refunds, failed payments, KYC issues
- ✅ One-click resolution buttons
- ✅ Clicking redirects to relevant resolution page

**FR3: Promotional Banners** ✅ **Implemented**
- ✅ Auto-rotating banners every 6 seconds
- ✅ Click tracking (console.log only, no analytics)
- ✅ Expiration date support
- ✅ Admin configurable in Settings (Add/Edit/Delete)
- ✅ Automatic filtering of expired banners
- ✅ Visible to all agents (displayed on dashboard)

**FR4: Role-aware Sidebar Navigation** ⚠️ **Partially Implemented**
- ✅ Dynamically hide unauthorized sections (role-based menu)
- ❌ Admin configurable access per B2B partner
- ❌ Service-level role definition (flights, hotels, etc.)
- ✅ Roles: Travel agents, Super Admin (basic roles exist)

**FR5: Dashboard Personalization** ✅ **Implemented**
- ✅ Toggle widgets on/off
- ✅ Save widget preferences to localStorage
- ✅ "Reset to Default" functionality
- ⚠️ Drag-drop repositioning (UI ready, full drag-drop to be enhanced)

**FR6: Theme Support** ✅ **Implemented**
- ✅ Dark mode and light mode (ThemeProvider with next-themes)
- ✅ Preference saved across sessions (localStorage via next-themes)

**FR7: Multilingual Interface** ❌ **Not Implemented**
- ❌ Language preference saved in user profile
- ✅ Phase 1: English only (currently English only, but no language switching)

**FR8: System Status Banner** ✅ **Implemented**
- ✅ Real-time maintenance window updates
- ✅ Active incident notifications
- ✅ Types: Info (blue), Warning (yellow), Error (red)
- ✅ Dismissible with localStorage persistence

**FR9: WCAG 2.1 Accessibility** ⚠️ **Partially Implemented**
- ✅ Screen reader support (Radix UI components are ARIA compliant)
- ❌ High contrast mode (not explicitly implemented)
- ✅ Keyboard navigation (Radix UI supports keyboard navigation)

### 2. Profile & Compliance Management

**FR10: Agent Profile Updates** ⚠️ **Partially Implemented**
- ⚠️ Update business name, PAN, GSTIN, address, contact details (profile page exists but limited fields)
- ✅ Validation on all fields (form validation present)
- ❌ No KYC updates after initial completion (not enforced)

**FR11: KYC Verification** ✅ **Implemented**
- ✅ Upload PAN, GST, address proofs (upload UI exists)
- ✅ Live status tracking (status badges: Submitted, In Progress, Approved, Rejected)
- ✅ Rejection reasons display (shown in KYC page)
- ✅ Re-upload option (re-submit functionality)
- ✅ Phase 1: Manual review process (review page exists)

**FR12: Audit Log** ⚠️ **Partially Implemented**
- ✅ Profile edits tracking (audit log page exists)
- ✅ KYC submission tracking (audit log shows KYC actions)
- ⚠️ Permission changes tracking (audit log exists but may not track all permission changes)
- ✅ Filters and export capability (filters and export button exist)

**FR13: Document Expiry Alerts** ✅ **Implemented**
- ✅ Expiry badges in KYC page (Orange: 30-7 days, Red: <7 days)
- ✅ Expiry dates displayed per document
- ✅ Integration with Urgent Alerts panel for expiring documents

### 3. Transactions & Wallet

**FR14: Transaction Log** ✅ **Implemented**
- ✅ Advanced filters: date range, payment method, status, product type
- ✅ "Clear Filters" button
- ⚠️ Export up to 50,000 rows in CSV/XLS/PDF (export button exists but functionality not verified)

**FR15: Automated Account Statements** ⚠️ **Partially Implemented**
- ⚠️ Monthly or custom date range (statement download button exists)
- ❌ Opening/closing balances (not shown)
- ✅ Detailed line items (transaction history displayed)

**FR16: Secure Data Masking** ✅ **Implemented**
- ✅ Mask sensitive details (phone, email, PAN) (MaskedText component exists)
- ✅ Role-based reveal permissions (only Super Admin can reveal)
- ✅ Lower role members cannot view sensitive data (implemented in MaskedText)

**FR17: Transaction Dispute Management** ❌ **Not Implemented**
- ❌ Ticket creation
- ❌ Resolution tracking

### 4. Authentication & Security

**FR18: Login History** ✅ **Implemented**
- ✅ Device type tracking
- ✅ IP address logging
- ✅ Browser information
- ✅ Location display
- ✅ Status (Success/Failed)
- ✅ "Logout All Devices" button

**FR19: Logout All Devices** ❌ **Not Implemented**
- ❌ Option available when updating password
- ❌ Logout from all devices functionality

**FR20: Session Timeout** ✅ **Implemented**
- ✅ 30-minute timeout (SessionTimer component)
- ✅ 2-minute warning prompt before automatic logout (warning dialog)

**FR21: Multi-Factor Authentication (MFA)** ⚠️ **Partially Implemented**
- ✅ Required for critical actions (withdraw funds, update KYC, change password)
- ✅ OTP input modal (6 digits, accepts any code for mock)
- ✅ Toast notification: "MFA will be implemented in production"
- ⚠️ Full OTP validation to be implemented in production

### 5. Admin Tools

**FR22: Account Management** ⚠️ **Partially Implemented**
- ⚠️ Suspend/reactivate agent accounts (dropdown menu has deactivate option, but suspend/reactivate not fully implemented)
- ❌ Mandatory reason capture
- ❌ Timestamp logging

**FR23: Global Search** ✅ **Implemented**
- ✅ Search across Booking ID, PNR, customer name, invoice number (Command palette with search for flights, hotels, bookings, disputes)

**FR24: Notifications Center** ✅ **Implemented**
- ✅ Read/unread tracking with badges
- ✅ Filter: All/Unread/Read
- ✅ Mark as read on click
- ✅ Bulk actions: Mark all as read, Delete all
- ✅ Customizable delivery preferences (email, SMS, WhatsApp) (settings page has notification preferences)
- ⚠️ WhatsApp integration to be confirmed (UI exists but integration status unknown)

**FR25: Role & Permission Management** ✅ **Implemented**
- ✅ Granular control of agent access levels
- ✅ Roles: SUPER_ADMIN, AGENCY_ADMIN, AGENT, SUB_AGENT, FINANCE_TEAM, SUPPORT_TEAM, KYC_COMPLIANCE_TEAM
- ✅ Permission Matrix in Settings (Super Admin): Grid view with View/Edit/Approve checkboxes per module
- ✅ Save to localStorage

### 6. Booking & Calendar

**FR26: Interactive Booking Calendar** ✅ **Implemented**
- ✅ Upcoming and past reservations (calendar page with month/week/day views)
- ✅ Color-coded by status (green: Confirmed, yellow: Pending, red: Cancelled)

**FR27: Domestic/International Toggle** ✅ **Implemented**
- ✅ Toggle button in flight search form
- ✅ Remembers user's last selection (localStorage)
- ✅ Pre-selects on next search

**FR28: Calendar Synchronization** ⚠️ **Partially Implemented**
- ✅ "Sync with Calendar" button in calendar page
- ✅ Modal with Google Calendar / Outlook Calendar options
- ✅ Toast notification: "Will be available in production"
- ⚠️ Full integration to be implemented in production

### 7. Reporting & Downloads

**FR29: Download Center** ✅ **Implemented**
- ✅ List all generated reports/statements
- ✅ Status tracking (Ready/Processing/Failed) with color-coded badges
- ✅ Re-download option
- ✅ Delete functionality
- ✅ Report type, date, size display

**FR30: Export Capabilities** ⚠️ **Partially Implemented**
- ✅ Audit logs export (export CSV button exists)
- ⚠️ Transactions export (export button exists but functionality not verified)
- ❌ Compliance reports export
- ⚠️ Multiple formats support (CSV buttons exist, PDF/XLS not verified)

**FR31: Scheduled Reporting** ❌ **Not Implemented**
- ❌ Automatic delivery to registered email addresses

### 8. System Intelligence & Analytics

**FR32: User Activity Analytics** ✅ **Implemented**
- ✅ Most used features tracking (bar chart)
- ✅ Time spent analytics (pie chart by module)
- ✅ Active users tracking (line chart - last 7 days)
- ✅ Available in Reports page "User Activity" tab

**FR33: Real-time Error Monitoring** ✅ **Implemented**
- ✅ Error reporting table (Super Admin only)
- ✅ Color-coded status: Red (new), Yellow (acknowledged), Green (resolved)
- ✅ Filters: Timestamp, Error Type, Module, User, Message, Status

**FR34: Personalized Quick Links** ✅ **Implemented**
- ✅ Suggestions based on agent behavior patterns (QuickLinksWidget uses frequency and recency scoring)
- ✅ Quick links list created (6 quick actions available)

### 9. Flight Booking & Management

**Note:** Most Flight Booking FRs require backend API integration with GDS/NDC providers and are marked as ❌ Not Implemented. The prototype includes basic UI flows for search, booking, and passenger details.

**FR01: Flexible Flight Search** ⚠️ **Partially Implemented**
- ⚠️ One-way, round-trip, multi-city (basic search exists, multi-city not implemented)
- ❌ ±3-day date flexibility for price comparison

**FR02: Fare Category Filters** ❌ **Not Implemented**
- ❌ Regular, Deals, Student, Senior, Armed Forces, SOTO
- ❌ Eligibility notes and tooltips

**FR03: Flight Filtering** ⚠️ **Partially Implemented**
- ✅ Stop count (non-stop, 1-stop) (filter exists in flights page)
- ❌ Departure/arrival time windows
- ✅ Preferred or blocked airlines (airline filter exists)

**FR04: NDC-Enabled Fares**
- Branded fare families
- Seats, baggage, meal ancillaries
- Available pre-ticketing and post-ticketing
- Data from third-party APIs

**FR05: Passenger Input Form** ⚠️ **Partially Implemented**
- ⚠️ Adults, children, infants (passenger details form exists but only for single passenger)
- ❌ Cabin class selection
- ❌ Special service requests (meals, wheelchairs)

**FR06: Fare Rules Display**
- Change fees
- Cancellation fees
- No-show fees
- Baggage allowance
- Refund timelines
- Airline penalties

**FR07: Post-Booking Management**
- PNR modification
- Ticket issuance/voiding
- Cancellations with refunds
- E-ticket re-sending

**FR08: Schedule Change Detection**
- Automatic detection
- Notify agents and customers
- Workflows for accepting airline options or requesting alternates
- Data from airlines/aggregators

**FR09: Reprice and Reissue**
- Fare and tax differences display
- Service charges
- Customer/agent approval capture
- To be decided by MaM

**FR10: Airline Queue Management**
- Auto-ticketing queue
- SLA alerts for pending items
- SLA defined by Provider

**FR11: Split and Merge PNR**
- Passenger reassignment across bookings
- Complete audit tracking
- Group booking support (e.g., 45 economy + 5 business)

**FR12: Name Correction**
- One-time minor edits per airline policy
- Before/after audit logs
- Handled by backend/admin team connecting to airline/provider

**FR13: Multi-Currency Pricing**
- FX rate timestamps
- Rounding rules
- Final invoice in base currency
- India: INR base currency
- Geo-location based default currency
- Conversion from initial pricing to base currency

**FR14: Corporate Fare Codes**
- Validate and apply corporate fare codes
- Error messages for invalid entries
- Different pricing for corporates vs. other customers
- To be clarified by Heizen team with MaM

**FR15: EMD Issuance**
- Electronic Miscellaneous Document for ancillaries
- Baggage and seat selection
- EMD-A or EMD-S support
- Secure storage of EMD numbers
- To be clarified by Heizen team with MaM

**FR16: Payment Hold**
- Visible countdown timers
- Automated booking cancellation upon expiry

**FR17: Fraud Prevention**
- Velocity rules on card numbers, emails, IP addresses
- Booking blocks
- Clear error display for agents
- In-house algorithm development
- Threshold/pattern definition needed

**FR18: Tax Invoice Generation**
- HSN/SAC codes mapping
- Place of supply
- GSTIN printing where applicable

**FR19: Traveler Profile Saving**
- Frequent flyer numbers
- Meal preferences
- Passport details
- Contact information
- Faster future bookings

**FR20: Loyalty Program Integration**
- Accumulation and redemption of airline miles
- Platform reward points
- Algorithm: 300-500 rs points per booking
- To be finalized by Heizen team

**FR21: Automated Fare Alerts**
- Track routes and dates
- Notify when prices drop below threshold
- Email notifications
- Tracking frequency: with every API call for flight prices

**FR22: Group Booking**
- Seat allocation
- Passenger manifest upload
- Consolidated invoicing
- Abide by PNR ticket limits

**FR23: Corporate Approval Workflows**
- Route bookings to managers for approval
- Before ticket issuance
- Not part of B2B - to be moved to B2E

**FR24: Seat Map Visualization** ✅ **Implemented**
- ✅ Interactive seat map (6 columns × 20 rows)
- ✅ Seat states: Available (white), Paid (blue), Selected (green), Unavailable (gray)
- ✅ Click to select, shows seat number + price
- ✅ Available as component for integration in booking flow

**FR25: Ancillary Upselling**
- Extra baggage, lounge access, insurance
- Transparent pricing during checkout
- List to be updated by MaM team

**FR26: Real-time PNR Synchronization**
- GDS/NDC source sync
- Accurate status, seat assignments, ticketing updates
- Cached with TTL of 1 hour

**FR27: Automated Refund Timeline Tracker**
- Expected refund date
- Status (initiated/processed)
- Reference numbers
- Backend processed - exact flow to be defined

**FR28: Predictive Suggestions**
- Alternate dates
- Nearby airports
- Cheaper routing options
- AI-based fare intelligence
- Scope to be determined by Heizen team

### 10. Hotel Booking & Management

**Note:** Most Hotel Booking FRs (FR01-FR31) require third-party provider integration (GDS, hotel aggregators) and are marked as ❌ Not Implemented. The prototype includes basic UI flows for search, room selection, and guest details.

**Key Implemented Features:**
- ⚠️ **FR01: Hotel Search** - Search by city/location (radius filters pending)
- ⚠️ **FR06: Room Selection Workflow** - Basic room selection with inclusions (bedding preferences pending)

**Pending Backend Integration:**
- Rich filtering, corporate rates, cancellation policies, post-booking management, inventory management, map views, group bookings, loyalty programs, customer reviews, tax invoicing, and other advanced features require hotel aggregator/GDS provider APIs.

### 11. Admin & Agent Management Module

**Note:** Most Admin & Agent Management FRs (FR01-FR30) require backend services, database implementation, and integration with accounting/ERP systems. Many are marked as ❌ Not Implemented. The prototype includes basic UI for user management, KYC review, and settings.

**Key Implemented Features:**
- ✅ **FR02: KYC Verification Workflow** - Manual review process with approval/rejection
- ✅ **FR22: Role-Based Access Control** - Granular permissions (View/Edit/Approve) with Permission Matrix
- ✅ **FR23: Audit Log** - Admin activities tracking with filters and export
- ✅ **FR24: Notifications Center** - Full notifications page with read/unread tracking

**Pending Backend Integration:**
- Agent user management, configurable markups, commission structures, shopping cart, credit control, tax engine, accounting/ERP integration, profitability dashboard, contract repository, and other advanced admin features require backend services and database implementation.

---

## Implementation Summary

### Overall Status
**Dashboard & UI (9 FRs):** ✅ 6 Fully, ⚠️ 2 Partial, ❌ 1 Not  
**Profile & Compliance (4 FRs):** ✅ 2 Fully, ⚠️ 2 Partial  
**Transactions & Wallet (4 FRs):** ✅ 2 Fully, ⚠️ 1 Partial, ❌ 1 Not  
**Authentication & Security (4 FRs):** ✅ 1 Fully, ⚠️ 2 Partial, ❌ 1 Not  
**Admin Tools (4 FRs):** ✅ 3 Fully, ⚠️ 1 Partial  
**Booking & Calendar (3 FRs):** ✅ 1 Fully, ⚠️ 2 Partial  
**Reporting & Downloads (3 FRs):** ✅ 1 Fully, ⚠️ 1 Partial, ❌ 1 Not  
**System Intelligence (3 FRs):** ✅ 3 Fully

### Key Implemented Features
✅ Session management, KYC workflow, data masking, global search, booking calendar, theme support, urgent alerts, wallet widget, dashboard personalization, system status banner, document expiry alerts, transaction filters, login history, MFA placeholder, notifications center, download center, calendar sync, error monitoring, permission matrix, seat map, user activity analytics

### Pending Features
❌ Multilingual interface, scheduled reporting automation, most Flight/Hotel/Admin advanced features (require backend API integration)

---

## Future Enhancements (Potential)

- Real-time booking updates
- Mobile app integration
- Advanced analytics dashboard
- Multi-currency support
- Integration with external GDS systems
- Automated expense reporting
- Travel itinerary management
- Loyalty program integration
- Advanced search filters
- Booking modifications
- Group bookings
- Recurring travel patterns

---

**Documentation Version:** 1.1  
**Last Updated:** 2025  
**Platform:** Make a Move B2B Travel Booking Platform

---

## Recent Changes (v1.3)

### Feature-Complete Implementation (19 Features)
✅ **Urgent Alerts Panel (FR2)**, **Wallet Balance Widget (FR1)**, **Dashboard Personalization (FR5)**, **Admin Config for Banners (FR3)**, **System Status Banner (FR8)**, **Document Expiry Alerts (FR13)**, **Transaction Filters (FR14)**, **Login History (FR18)**, **MFA Placeholder (FR21)**, **Notifications Center (FR24)**, **Download Center (FR29)**, **Calendar Sync (FR28)**, **Domestic/International Toggle (FR27)**, **Error Monitoring (FR33)**, **Permission Matrix (FR25)**, **Seat Map (FR24)**, **User Activity Analytics (FR32)**, **Multi-Step Form Progress**, **4 Missing User Roles**

### New Pages & Components
**Pages:** `/dashboard/profile/login-history`, `/dashboard/notifications`, `/dashboard/downloads`, `/dashboard/system/errors`  
**Components:** `urgent-alerts-panel`, `wallet-balance-widget`, `dashboard-personalization`, `system-status-banner`, `mfa-modal`, `calendar-sync-button`, `seat-map`  
**Updated:** Settings (Banners & Permission Matrix tabs), Reports (User Activity tab), Calendar (Sync button), Wallet (filters), KYC (expiry alerts)

---

## Recent Changes (v1.2)

### Support Mode Removal
- ✅ Removed Support Mode functionality completely
- ✅ Removed `isSupportMode`, `supportAgentName`, `setSupportMode` from store
- ✅ Removed Support Mode button and dialog from header
- ✅ Removed SupportModeBanner component
- ✅ Removed all `restrictedInSupportMode` props from buttons
- ✅ Deleted `components/layout/support-mode-banner.tsx` file

### Currency Update
- ✅ Changed default currency from USD ($) to INR (₹)
- ✅ Updated all mock data prices to INR values
- ✅ Updated all currency displays throughout the platform
- ✅ Updated wallet balances, transaction amounts, booking prices
- ✅ Updated settings page default currency to "INR (₹)"
- ✅ Updated all financial displays with Indian number formatting

### B2E to B2B Conversion
- ✅ Removed all B2E (Business-to-Employee) references
- ✅ Changed all "employee" terminology to "agent" or "customer"
- ✅ Updated Booking interface fields
- ✅ Updated all UI labels and descriptions
- ✅ Updated approvals page terminology
- ✅ Updated calendar and reports terminology

### Flight Booking Fix
- ✅ Fixed flight booking validation issue
- ✅ Added proper stage transition validation
- ✅ Ensured booking only works from "Listing" stage
- ✅ Fixed mandatory field validation for Listing stage

---

## Recent Changes (v1.1)

### Branding
- ✅ Replaced "TraveLynn" with "Make a Move" throughout codebase
- ✅ Updated all UI labels and documentation

### Feature Removals
- ✅ Removed `/dashboard/contracts` page (not in original spec)
- ✅ Removed `/dashboard/performance` page (not in original spec)
- ✅ Removed Cab, Bus, Train booking modules (only Flights & Hotels requested)
- ✅ Removed API Integrations tab from settings (Amadeus/Sabre - not requested)
- ✅ Removed Cab markup from Platform Fees

### Feature Additions
- ✅ Added Scheduled Reports page at `/dashboard/reports/scheduled`:
  - Form: Report type, Frequency (Daily/Weekly/Monthly), Format (CSV/XLS/PDF), Email recipients, Schedule time
  - Table: Saved schedules with Edit/Delete/Pause actions
  - Generated reports with Download button
- ✅ Enhanced Notification Preferences in `/dashboard/settings`:
  - Toggle switches: Email, SMS, WhatsApp
  - Checkboxes: Booking confirmations, Refund updates, Dispute status, KYC results, Payment alerts
  - Save button with mock toast

### Terminology Updates
- ✅ CORPORATE_ADMIN → "Agency Admin" (in UI labels only, enum values unchanged)
- ✅ EMPLOYEE → "Agent" (in UI labels and data structures)
- ✅ Changed all "employee" references to "agent" throughout the platform
- ✅ Updated Booking interface: `employeeName` → `agentName`, `employeeId` → `agentId`
- ✅ Updated "Corporate Wallet" → "Agency Wallet"
- ✅ Updated "Employee Management" → "Agent Management"

### Booking Types Simplification
- ✅ Removed CAB, BUS, TRAIN from Booking type enum
- ✅ Updated all components to only support FLIGHT and HOTEL
- ✅ Added REFUNDED status to booking status enum

### Calendar Enhancements
- ✅ Fixed color coding: Confirmed (#22C55E), Pending (#F59E0B), Cancelled (#EF4444), Refunded (#6B7280)
- ✅ Added REFUNDED to status filter
- ✅ Verified Month/Week/Day view toggle
- ✅ Verified filter by booking type (Flight/Hotel only)
- ✅ Verified filter by status
- ✅ Verified Export CSV button

### Stage Transition Validation
- ✅ Verified booking flows block stage skipping
- ✅ Disable "Continue" if mandatory fields empty
- ✅ Show validation errors inline
- ✅ Lock previous stage fields (read-only) after moving forward
- ✅ Show progress indicator (Step X of Y)

### Component Verification
- ✅ Quick Links Widget: Frequency + recency tracking in localStorage
- ✅ Promotional Banners: Auto-rotate 6 seconds
- ✅ Global Search: Search Booking ID, PNR, Customer name, Invoice, Transaction ID (via Command palette)


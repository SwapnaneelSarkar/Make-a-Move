# Master Settings Overview

This document explains the Super Admin only **Master Settings** area (`/dashboard/settings`). Use it as a runbook to understand each tab, what data it controls, and the operational safeguards baked into the UI.

## Access & Guardrails

- Only roles with `systemSettings.view` permission (default: Super Admin) can open the page.  
- Non-authorized users are blocked with an inline alert.  
- Most sections persist data in `localStorage`, so changes are instant for the current browser session and survive refreshes. In production you would replace these stubs with API calls.

## Tabs & Responsibilities

| Tab | Purpose | Key Actions |
| --- | --- | --- |
| General | High-level platform controls (maintenance, contact details, currency). | Toggle maintenance mode, update support email, view locked default currency. |
| Notifications | Define alert channels and event types for platform-wide communications. | Enable/disable Email/SMS/WhatsApp, choose which events trigger outreach, save preferences. |
| Platform Fees | Configure global markups and flat fees per booking type. | Adjust flight/hotel markup %, set flat booking fee, save changes. |
| Commissions | Maintain per-agent incentive structures. | Add/edit commission rows, select fixed vs percentage payouts, persist to storage. |
| Promotional Banners | Manage dashboard hero banners surfaced to agencies. | Add/edit/delete creatives with expiry tracking, view Active vs Expired lists. |
| Permission Matrix | Fine-tune View/Edit/Approve rights per module and role. | Toggle permissions inline, store the resulting matrix, export-ready grid layout. |

### 1. General

- **Maintenance Mode:** Instant kill switch to restrict access to Super Admins during incidents.  
- **Support Email:** Central address surfaced in emails and UI footers.  
- **Default Currency:** Pre-set to INR (₹) and read-only to prevent accidental multi-currency drift.

### 2. Notification Preferences

- **Channels:** Email, SMS, WhatsApp toggles allow phased rollout of communication mediums.  
- **Event Types:** Booking confirmations, refund updates, dispute status, KYC results, and payment alerts ensure stakeholders are notified across the booking lifecycle.  
- **Save Preferences:** Triggers a toast confirming the mock notification dispatch.

### 3. Platform Fees

- **Flight/Hotel Markup %:** Global adjustable markups used by pricing engines.  
- **Flat Fee per Booking:** Optional surcharge applied to every transaction (default ₹0).  
- **Save Changes:** Commits the current fee card to storage and signals success.

### 4. Commission Management

- **Commission Table:** Displays each agent/sub-agent with separate flight and hotel rates plus type badge.  
- **Add Commission Rule:** Modal-like card to pick an agent, set percentages or flat rupee amounts, and choose payout type.  
- **Save Changes:** Serializes the entire commission array to `localStorage` to mimic persistence. Use this when bulk adjustments are complete.

### 5. Promotional Banners

- **Active vs Expired Lists:** Banners are automatically classified by expiration date and manual status.  
- **Add Banner Form:** Captures title, creative URL, target link, and expiry. Saves with auto-generated ID.  
- **Edit/Delete:** Inline actions on each row for lifecycle management. Deleting immediately updates storage and surfaces a success toast.

### 6. Permission Matrix

- **Role Columns:** Super Admin, Agency Admin, Agent, Sub Agent, Finance, Support, and KYC columns with View (V), Edit (E), Approve (A) checkboxes.  
- **Module Rows:** Bookings, Wallet, Agents, KYC Documents, Disputes, Reports, System Settings.  
- **Interaction Model:** Checking a box flips the corresponding access flag and saves state to `localStorage`.  
- **Save Changes:** Provides a single action to confirm the snapshot after multiple tweaks.

## Implementation Notes

- All forms currently mock persistence through browser storage. To productionize, wire the submit handlers to your backend (REST or GraphQL) and enforce audit logging via `audit-utils`.  
- Tabs rely on `@radix-ui/react-tabs` via the shared UI kit, so adding new sections (e.g., “ERP Integrations”) just requires adding another `TabsTrigger`/`TabsContent` pair.

## When to Update This Doc

Update this reference whenever a new tab is introduced, existing settings gain additional controls, or persistence moves from client storage to an API so operators understand the impact scope.




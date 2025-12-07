// Audit logging utilities

import { auditLogsDB } from "./local-db"
import { useAppStore } from "./store"

// Get mock IP address (in real app, this would come from request)
function getMockIPAddress(): string {
  return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
}

// Log an action
export async function logAction(
  action: string,
  module: string,
  recordId?: string,
  previousValue?: any,
  newValue?: any
) {
  try {
    const store = useAppStore.getState()
    const userId = store.currentUser.id
    const role = store.currentUser.role

    await auditLogsDB.create({
      userId,
      role,
      action,
      module,
      recordId,
      previousValue,
      newValue,
      ipAddress: getMockIPAddress(),
    })
  } catch (error) {
    console.error("Failed to log action:", error)
  }
}

// Helper functions for common actions
export const audit = {
  create: (module: string, recordId: string, newValue: any) =>
    logAction("Create", module, recordId, undefined, newValue),
  update: (module: string, recordId: string, previousValue: any, newValue: any) =>
    logAction("Update", module, recordId, previousValue, newValue),
  delete: (module: string, recordId: string, previousValue: any) =>
    logAction("Delete", module, recordId, previousValue, undefined),
  approve: (module: string, recordId: string, newValue: any) =>
    logAction("Approve", module, recordId, undefined, newValue),
  reject: (module: string, recordId: string, newValue: any) =>
    logAction("Reject", module, recordId, undefined, newValue),
  reveal: (module: string, recordId: string) =>
    logAction("Reveal", module, recordId, undefined, undefined),
}













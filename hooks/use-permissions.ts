// Hook for easy permission checking

import { useAppStore } from "@/lib/store"
import {
  getPermissions,
  hasPermission,
  canView,
  canEdit,
  canApprove,
  type Permissions,
  type PermissionAction,
} from "@/lib/permissions"

export function usePermissions() {
  const { currentUser } = useAppStore()
  const permissions = getPermissions(currentUser.role)

  return {
    permissions,
    hasPermission: (permission: keyof Permissions, action?: PermissionAction) =>
      hasPermission(currentUser.role, permission, action),
    canView: (permission: keyof Permissions) => canView(currentUser.role, permission),
    canEdit: (permission: keyof Permissions) => canEdit(currentUser.role, permission),
    canApprove: (permission: keyof Permissions) => canApprove(currentUser.role, permission),
    role: currentUser.role,
  }
}


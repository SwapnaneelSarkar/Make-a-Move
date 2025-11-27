// Permission matrix storage in localStorage

import { type Role } from "./mock-data"
import { type Permissions } from "./permissions"

const PERMISSION_STORAGE_KEY = "permission_matrix"

// Save permission matrix to localStorage
export function savePermissionMatrix(matrix: Record<Role, Permissions>) {
  try {
    localStorage.setItem(PERMISSION_STORAGE_KEY, JSON.stringify(matrix))
  } catch (error) {
    console.error("Failed to save permission matrix:", error)
  }
}

// Load permission matrix from localStorage
export function loadPermissionMatrix(): Record<Role, Permissions> | null {
  try {
    const stored = localStorage.getItem(PERMISSION_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Failed to load permission matrix:", error)
  }
  return null
}

// Get permission matrix (from localStorage or default)
export function getPermissionMatrix(): Record<Role, Permissions> {
  const stored = loadPermissionMatrix()
  if (stored) {
    return stored
  }
  // Return default from permissions.ts (imported dynamically to avoid circular deps)
  return {} as Record<Role, Permissions>
}







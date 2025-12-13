import { create } from "zustand"
import { type User, MOCK_USERS, type Role } from "./mock-data"

interface AppState {
  currentUser: User
  setCurrentUser: (user: User) => void
  setRole: (role: Role) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  // Support Mode State
  isSupportMode: boolean
  supportAgentName: string | null
  setSupportMode: (active: boolean, agentName: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: MOCK_USERS[1],
  setCurrentUser: (user) => set({ currentUser: user }),
  setRole: (role) => {
    const user = MOCK_USERS.find((u) => u.role === role)
    if (user) set({ currentUser: user })
  },
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  // Support Mode Implementation
  isSupportMode: false,
  supportAgentName: null,
  setSupportMode: (active, agentName) => set({ isSupportMode: active, supportAgentName: agentName }),
}))

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

const DEFAULT_PASSWORD = "0611"

type AuthStore = {
  password: string
  setPassword: (password: string) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      password: DEFAULT_PASSWORD,
      setPassword: (password: string) => set(() => ({ password })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

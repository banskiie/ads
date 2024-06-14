import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface Media {
  uri: string | null
  type: string | null
}

interface ImageStore {
  primary: Media
  side: Media
  bottom: Media
  setPrimary: (media: Media) => void
  setSide: (media: Media) => void
  setBottom: (media: Media) => void
}

export const useImageStore = create<ImageStore>()(
  persist(
    (set) => ({
      primary: {
        uri: null,
        type: null,
      },
      side: {
        uri: null,
        type: null,
      },
      bottom: {
        uri: null,
        type: null,
      },
      setPrimary: (media: Media) => set(() => ({ primary: media })),
      setSide: (media: Media) => set(() => ({ side: media })),
      setBottom: (media: Media) => set(() => ({ bottom: media })),
    }),
    {
      name: "image-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

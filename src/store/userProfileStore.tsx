import { supabase } from '@/lib/supabase'
import { create } from 'zustand'

interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  gender: string
  admission_number: string
  phone_number: number
  batch: number
  branch: string
}

interface UserProfileStore {
  userProfile: UserProfile | null
  fetch: () => Promise<void>
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  userProfile: null,
  fetch: async () => {
    try {
      const user = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from('Profile')
        .select('*')
        .eq('id', user?.data.user?.id)
        .single()

      if (error) {
        throw error
      }

      if (data || user) {
        set({
          userProfile: {
            id: user?.data.user?.id!,
            email: user?.data.user?.email!,
            first_name: data?.first_name!,
            last_name: data?.last_name!,
            gender: data?.gender!,
            admission_number: data?.admission_number!,
            phone_number: data?.phone_number!,
            batch: data?.batch!,
            branch: data?.branch!,
          },
        })
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    }
  },
}))

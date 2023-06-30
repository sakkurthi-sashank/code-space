import { supabaseAnonKey, supabaseUrl } from '@/util/constants'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    persistSession: false,
  },
})

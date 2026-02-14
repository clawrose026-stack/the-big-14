import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ojampranqzwvnstwanlc.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_8qbws1j4O590wrRHQNPCgg_Wh_Qi-lm'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Booking = {
  id: string
  created_at: string
  check_in: string
  check_out: string
  guest_name: string
  guest_email: string
  guest_phone: string
  num_guests: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled'
  notes?: string
}

export type BlockedDate = {
  id: string
  date: string
  reason?: string
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ugbzfqldtivqhjkkkban.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_4KdcmhzmlFoF1jHZNaUGrQ_wdesgLZZ'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Booking = {
  id: string
  created_at: string
  updated_at?: string
  booking_ref: string
  guest_first_name: string
  guest_last_name: string
  guest_email: string
  guest_phone: string
  id_type: 'sa_id' | 'passport'
  id_number: string
  check_in: string
  check_out: string
  num_guests: number
  base_rate: number
  cleaning_fee: number
  total_price: number
  payment_status: 'pending' | 'paid' | 'refunded' | 'failed'
  payment_method: string
  payment_reference?: string
  paid_at?: string
  status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'no_show'
  special_requests?: string
  notes?: string
  actual_check_in?: string
  actual_check_out?: string
  cancelled_at?: string
  cancellation_reason?: string
  refund_amount?: number
}

export type BlockedDate = {
  id: string
  date: string
  reason?: string
}

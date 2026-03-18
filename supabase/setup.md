-- The Big 14 Database Setup Instructions
-- ======================================

-- Step 1: Go to Supabase Dashboard
-- URL: https://app.supabase.com/project/ugbzfqldtivqhjkkkban

-- Step 2: Open SQL Editor
-- Click "SQL Editor" in the left sidebar
-- Click "New Query"

-- Step 3: Copy and paste the schema
-- Open: /home/openclaw/.openclaw/workspace/the-big-14/supabase/schema.sql
-- Copy all content
-- Paste into SQL Editor
-- Click "Run"

-- Step 4: Verify tables created
-- Go to "Table Editor" in left sidebar
-- You should see: bookings, blocked_dates, email_logs, payments

-- Step 5: Set up Row Level Security (RLS) - Optional but recommended
-- Go to each table → Policies → Enable RLS
-- Add policies based on your needs

-- ======================================
-- SAMPLE DATA (Optional - for testing)
-- ======================================

-- Insert a test booking
INSERT INTO bookings (
    booking_ref,
    guest_first_name,
    guest_last_name,
    guest_email,
    guest_phone,
    id_type,
    id_number,
    check_in,
    check_out,
    num_guests,
    base_rate,
    cleaning_fee,
    total_price,
    payment_status,
    payment_method,
    status,
    special_requests,
    notes
) VALUES (
    'TBF-TEST-001',
    'John',
    'Doe',
    'test@example.com',
    '0821234567',
    'sa_id',
    '9001015009087',
    '2026-03-15',
    '2026-03-17',
    2,
    150000, -- R1500 per night
    35000,  -- R350 cleaning fee
    335000, -- R3350 total (2 nights + cleaning)
    'paid',
    'yoco',
    'confirmed',
    'Late check-in please',
    'Test booking for development'
);

-- Insert a test blocked date
INSERT INTO blocked_dates (date, reason, blocked_by)
VALUES ('2026-12-25', 'Christmas - Owner Use', 'owner');

-- ======================================
-- USEFUL QUERIES
-- ======================================

-- Get all bookings for a date range
-- SELECT * FROM bookings 
-- WHERE check_in <= '2026-03-31' 
-- AND check_out >= '2026-03-01';

-- Get booked dates for calendar
-- SELECT * FROM get_booked_dates('2026-03-01', '2026-03-31');

-- Check if dates are available
-- SELECT check_availability('2026-03-15', '2026-03-17');

-- Get booking with payment info
-- SELECT b.*, p.amount, p.status as payment_status
-- FROM bookings b
-- LEFT JOIN payments p ON b.id = p.booking_id
-- WHERE b.booking_ref = 'TBF-TEST-001';

-- ======================================
-- ENVIRONMENT VARIABLES NEEDED
-- ======================================

-- Add these to your Vercel project:
-- NEXT_PUBLIC_SUPABASE_URL=https://ugbzfqldtivqhjkkkban.supabase.co
-- NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_4KdcmhzmlFoF1jHZNaUGrQ_wdesgLZZ

-- Optional: Add service role key for server-side operations
-- SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

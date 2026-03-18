-- The Big 14 Guesthouse Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Booking reference (for guest communication)
    booking_ref VARCHAR(20) UNIQUE NOT NULL,
    
    -- Guest Information
    guest_first_name VARCHAR(100) NOT NULL,
    guest_last_name VARCHAR(100) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(20) NOT NULL,
    
    -- ID Verification
    id_type VARCHAR(20) CHECK (id_type IN ('sa_id', 'passport')),
    id_number VARCHAR(50),
    
    -- Booking Details
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    num_guests INTEGER NOT NULL CHECK (num_guests > 0 AND num_guests <= 14),
    
    -- Pricing
    base_rate INTEGER NOT NULL, -- per night in cents
    cleaning_fee INTEGER NOT NULL, -- in cents
    total_price INTEGER NOT NULL, -- in cents
    
    -- Payment
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
    payment_method VARCHAR(50) DEFAULT 'yoco',
    payment_reference VARCHAR(100),
    paid_at TIMESTAMP WITH TIME ZONE,
    
    -- Status
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show')),
    
    -- Additional Info
    special_requests TEXT,
    notes TEXT,
    
    -- Check-in/Check-out tracking
    actual_check_in TIMESTAMP WITH TIME ZONE,
    actual_check_out TIMESTAMP WITH TIME ZONE,
    
    -- Cancellation
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    refund_amount INTEGER -- in cents
);

-- Create indexes for common queries
CREATE INDEX idx_bookings_check_in ON bookings(check_in);
CREATE INDEX idx_bookings_check_out ON bookings(check_out);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_booking_ref ON bookings(booking_ref);
CREATE INDEX idx_bookings_email ON bookings(guest_email);

-- Blocked dates table (for maintenance, owner use, etc.)
CREATE TABLE blocked_dates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    date DATE NOT NULL UNIQUE,
    reason VARCHAR(255),
    blocked_by VARCHAR(100) -- admin, maintenance, owner, etc.
);

-- Create index on blocked dates
CREATE INDEX idx_blocked_dates_date ON blocked_dates(date);

-- Email logs table (track sent emails)
CREATE TABLE email_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    email_type VARCHAR(50) NOT NULL, -- confirmation, reminder, check_in, etc.
    recipient VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
    error_message TEXT,
    resend_email_id VARCHAR(100)
);

-- Create index on email logs
CREATE INDEX idx_email_logs_booking ON email_logs(booking_id);

-- Payments table (detailed payment tracking)
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    
    -- Payment details
    amount INTEGER NOT NULL, -- in cents
    currency VARCHAR(3) DEFAULT 'ZAR',
    payment_method VARCHAR(50) NOT NULL, -- yoco, cash, eft, etc.
    
    -- External reference
    external_reference VARCHAR(100), -- Yoco checkout ID, etc.
    external_payment_id VARCHAR(100), -- Yoco payment ID
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    
    -- Metadata
    metadata JSONB,
    
    -- Timestamps
    completed_at TIMESTAMP WITH TIME ZONE,
    failed_at TIMESTAMP WITH TIME ZONE,
    failure_reason TEXT
);

-- Create index on payments
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_external_ref ON payments(external_reference);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at on bookings
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to get booked dates (for calendar)
CREATE OR REPLACE FUNCTION get_booked_dates(start_date DATE, end_date DATE)
RETURNS TABLE (booked_date DATE) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT generate_series(b.check_in, b.check_out - INTERVAL '1 day', INTERVAL '1 day')::DATE
    FROM bookings b
    WHERE b.status IN ('confirmed', 'checked_in')
    AND b.check_in <= end_date
    AND b.check_out > start_date;
END;
$$ LANGUAGE plpgsql;

-- Function to check availability
CREATE OR REPLACE FUNCTION check_availability(check_in_date DATE, check_out_date DATE)
RETURNS BOOLEAN AS $$
DECLARE
    has_conflict BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM bookings b
        WHERE b.status IN ('confirmed', 'checked_in')
        AND b.check_in < check_out_date
        AND b.check_out > check_in_date
    ) INTO has_conflict;
    
    RETURN NOT has_conflict;
END;
$$ LANGUAGE plpgsql;

-- Insert sample blocked dates (if needed)
-- INSERT INTO blocked_dates (date, reason, blocked_by) VALUES
-- ('2026-12-25', 'Christmas - Owner Use', 'owner'),
-- ('2026-12-26', 'Boxing Day - Owner Use', 'owner');

-- Grant permissions (Supabase handles this automatically, but good to document)
-- ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies (examples - adjust based on your auth setup)
-- CREATE POLICY "Allow public to create bookings" ON bookings
--     FOR INSERT WITH CHECK (true);

-- CREATE POLICY "Allow guests to view their own bookings" ON bookings
--     FOR SELECT USING (auth.uid() IS NULL OR guest_email = auth.email());

COMMENT ON TABLE bookings IS 'Stores all guest bookings and reservations';
COMMENT ON TABLE blocked_dates IS 'Dates when the property is not available for booking';
COMMENT ON TABLE email_logs IS 'Tracks all emails sent to guests';
COMMENT ON TABLE payments IS 'Detailed payment records for each booking';

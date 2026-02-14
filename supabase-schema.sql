-- Supabase Database Schema for The Big 14
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  num_guests INTEGER NOT NULL DEFAULT 1,
  total_price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  notes TEXT,
  CONSTRAINT valid_dates CHECK (check_out > check_in)
);

-- Blocked dates table (for manual blocking or iCal sync)
CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_blocked_dates ON blocked_dates(date);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only for booked dates, insert for new bookings)
CREATE POLICY "Allow public to view confirmed bookings" 
  ON bookings FOR SELECT 
  USING (status IN ('confirmed', 'pending'));

CREATE POLICY "Allow public to create bookings" 
  ON bookings FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public to view blocked dates" 
  ON blocked_dates FOR SELECT 
  USING (true);

-- Admin policies (you'll need to set up authentication for admin access)
-- For now, this allows full access - in production, restrict to authenticated admin users
CREATE POLICY "Allow all operations on bookings" 
  ON bookings FOR ALL 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow all operations on blocked dates" 
  ON blocked_dates FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Sample data (optional - for testing)
-- INSERT INTO blocked_dates (date, reason) VALUES 
--   ('2026-02-20', 'Maintenance'),
--   ('2026-02-21', 'Maintenance');

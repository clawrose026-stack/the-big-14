-- The Big 14 — PostgreSQL Database Schema
-- Run this against your local Postgres: psql -d the_big_14 -f schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- BOOKINGS TABLE
-- Matches the Booking TypeScript type in src/lib/supabase.ts
-- and the insert payload in src/app/book/page.tsx
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ,
  booking_ref     TEXT             NOT NULL UNIQUE,

  -- Guest information
  guest_first_name TEXT            NOT NULL,
  guest_last_name  TEXT            NOT NULL,
  guest_email      TEXT            NOT NULL,
  guest_phone      TEXT            NOT NULL,
  id_type          TEXT            NOT NULL CHECK (id_type IN ('sa_id', 'passport')),
  id_number        TEXT            NOT NULL,

  -- Booking dates (check-out day is available for next guest)
  check_in         DATE            NOT NULL,
  check_out        DATE            NOT NULL,
  num_guests       INTEGER         NOT NULL DEFAULT 1 CHECK (num_guests >= 1),

  -- Pricing (all amounts in cents — stored as integer to avoid float issues)
  base_rate        INTEGER         NOT NULL DEFAULT 0,
  cleaning_fee     INTEGER         NOT NULL DEFAULT 0,
  total_price      INTEGER         NOT NULL DEFAULT 0,

  -- Payment tracking
  payment_status   TEXT            NOT NULL DEFAULT 'pending'
                                   CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  payment_method   TEXT            NOT NULL DEFAULT '',
  payment_reference TEXT,
  paid_at          TIMESTAMPTZ,

  -- Booking status lifecycle
  status           TEXT            NOT NULL DEFAULT 'pending'
                                   CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show')),

  -- Optional notes from guest or admin
  special_requests TEXT,
  notes            TEXT,

  -- Operational timestamps
  actual_check_in  TIMESTAMPTZ,
  actual_check_out TIMESTAMPTZ,
  cancelled_at     TIMESTAMPTZ,
  cancellation_reason TEXT,
  refund_amount    INTEGER,

  -- Enforce valid date range
  CONSTRAINT valid_dates CHECK (check_out > check_in),
  CONSTRAINT valid_guests CHECK (num_guests <= 2)  -- max 2 guests per property config
);

-- ============================================================
-- BLOCKED DATES TABLE
-- For manual blocking, maintenance, or iCal sync
-- ============================================================
CREATE TABLE IF NOT EXISTS blocked_dates (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date       DATE        NOT NULL UNIQUE,
  reason     TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES (performance)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_bookings_dates       ON bookings(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_bookings_status      ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_ref         ON bookings(booking_ref);
CREATE INDEX IF NOT EXISTS idx_bookings_payment     ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_created     ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blocked_dates_date   ON blocked_dates(date);

-- ============================================================
-- HELPER FUNCTION: generate a unique booking reference
-- Format: TBF-XXXXXXXX (8-character hex timestamp fragment)
-- ============================================================
CREATE OR REPLACE FUNCTION generate_booking_ref()
RETURNS TEXT
LANGUAGE SQL
AS $$
  SELECT 'TBF-' || upper(substr(md5(clock_timestamp()::text || random()::text), 1, 8));
$$;

-- ============================================================
-- TRIGGER: auto-set updated_at on row modification
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_bookings_updated_at ON bookings;
CREATE TRIGGER trg_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- VERIFICATION
-- ============================================================
SELECT 'Schema created successfully' AS status;
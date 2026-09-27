import { Pool } from "pg";

/**
 * Postgres connection pool.
 *
 * Every value comes from the environment — never hard-code credentials here,
 * they end up in the git history. Set PG_* (or DATABASE_URL) in the Vercel
 * project settings for each environment.
 *
 * The pool is created lazily so that a build, or a request to a route that
 * never touches the database, does not fail just because these are unset.
 */
let pool: Pool | undefined;

function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Set it in the Vercel project settings.`
    );
  }
  return value;
}

export function getPool(): Pool {
  if (!pool) {
    pool = process.env.DATABASE_URL
      ? new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false },
          max: 5,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 5000,
        })
      : new Pool({
          host: required("PG_HOST"),
          port: parseInt(process.env.PG_PORT || "5432", 10),
          database: required("PG_DATABASE"),
          user: required("PG_USER"),
          password: required("PG_PASSWORD"),
          // Serverless functions each hold their own pool; keep it small.
          max: 5,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 5000,
        });
  }
  return pool;
}

export type Booking = {
  id: string;
  created_at: string;
  updated_at?: string;
  booking_ref: string;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string;
  id_type: "sa_id" | "passport";
  id_number: string;
  check_in: string;
  check_out: string;
  num_guests: number;
  base_rate: number;
  cleaning_fee: number;
  total_price: number;
  payment_status: "pending" | "paid" | "refunded" | "failed";
  payment_method: string;
  payment_reference?: string;
  paid_at?: string;
  status: "pending" | "confirmed" | "checked_in" | "checked_out" | "cancelled" | "no_show";
  special_requests?: string;
  notes?: string;
  actual_check_in?: string;
  actual_check_out?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  refund_amount?: number;
};

export type BlockedDate = {
  id: string;
  date: string;
  reason?: string;
};
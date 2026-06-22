import { Pool } from "pg";

const pool = new Pool({
  host: process.env.PG_HOST || "ec2-13-48-44-228.eu-north-1.compute.amazonaws.com",
  port: parseInt(process.env.PG_PORT || "5432"),
  database: process.env.PG_DATABASE || "the_big_14",
  user: process.env.PG_USER || "brendon",
  password: process.env.PG_PASSWORD || "justcoop18",
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export default pool;

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
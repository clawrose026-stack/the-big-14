import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

// GET /api/bookings — get all non-blocked dates (for calendar availability)
export async function GET(request: NextRequest) {
  try {
    const client = await pool.connect();
    try {
      const { searchParams } = new URL(request.url);
      const ref = searchParams.get("ref");

      // If ref provided, get single booking
      if (ref) {
        const result = await client.query(
          "SELECT * FROM bookings WHERE booking_ref = $1",
          [ref]
        );
        if (result.rows.length === 0) {
          return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }
        return NextResponse.json(result.rows[0]);
      }

      // Otherwise return booked date ranges + blocked dates for calendar
      const [bookings, blocked] = await Promise.all([
        client.query(
          "SELECT check_in, check_out FROM bookings WHERE status IN ($1, $2, $3)",
          ["confirmed", "checked_in", "pending"]
        ),
        client.query("SELECT date FROM blocked_dates"),
      ]);

      return NextResponse.json({
        bookedDates: bookings.rows,
        blockedDates: blocked.rows.map((r) => r.date),
      });
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

// POST /api/bookings — create a new booking
// TEMPORARILY DISABLED: direct bookings are not live yet. Guests book via
// external platforms (Airbnb, Booking.com, Lekkeslaap).
// Flip this flag to re-enable direct bookings.
const DIRECT_BOOKINGS_ENABLED = false;

export async function POST(request: NextRequest) {
  if (!DIRECT_BOOKINGS_ENABLED) {
    return NextResponse.json(
      { error: "Direct bookings are temporarily unavailable. Please book through Airbnb, Booking.com or Lekkeslaap." },
      { status: 403 }
    );
  }
  try {
    const body = await request.json();
    const client = await pool.connect();

    try {
      // Use client-provided ref (generated before Yoco checkout) or fall back to server-generated
      const bookingRef = body.booking_ref || (await client.query("SELECT generate_booking_ref() as ref")).rows[0].ref;

      const result = await client.query(
        `INSERT INTO bookings (
          booking_ref, check_in, check_out, guest_first_name, guest_last_name,
          guest_email, guest_phone, id_type, id_number, num_guests,
          base_rate, cleaning_fee, total_price, payment_status, payment_method,
          payment_reference, paid_at, status, special_requests, notes
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
        RETURNING *`,
        [
          bookingRef,
          body.check_in,
          body.check_out,
          body.guest_first_name,
          body.guest_last_name,
          body.guest_email,
          body.guest_phone,
          body.id_type || "sa_id",
          body.id_number || "",
          body.num_guests,
          body.base_rate,
          body.cleaning_fee,
          body.total_price,
          body.payment_status || "pending",
          body.payment_method || "manual",
          body.payment_reference || null,
          body.paid_at || null,
          body.status || "pending",
          body.special_requests || null,
          body.notes || null,
        ]
      );

      return NextResponse.json(result.rows[0], { status: 201 });
    } finally {
      client.release();
    }
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
const TOKEN = 'sbp_88245df99f92e7367523a6dcf3291c9a3b8f81e9';
const PROJECT_REF = 'ugbzfqldtivqhjkkkban';

const statements = [
  `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
  
  `CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    booking_ref VARCHAR(20) UNIQUE NOT NULL,
    guest_first_name VARCHAR(100) NOT NULL,
    guest_last_name VARCHAR(100) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(20) NOT NULL,
    id_type VARCHAR(20) CHECK (id_type IN ('sa_id', 'passport')),
    id_number VARCHAR(50),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    num_guests INTEGER NOT NULL CHECK (num_guests > 0 AND num_guests <= 14),
    base_rate INTEGER NOT NULL,
    cleaning_fee INTEGER NOT NULL,
    total_price INTEGER NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
    payment_method VARCHAR(50) DEFAULT 'yoco',
    payment_reference VARCHAR(100),
    paid_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show')),
    special_requests TEXT,
    notes TEXT,
    actual_check_in TIMESTAMP WITH TIME ZONE,
    actual_check_out TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    refund_amount INTEGER
  )`,
  
  `CREATE INDEX IF NOT EXISTS idx_bookings_check_in ON bookings(check_in)`,
  `CREATE INDEX IF NOT EXISTS idx_bookings_check_out ON bookings(check_out)`,
  `CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)`,
  `CREATE INDEX IF NOT EXISTS idx_bookings_booking_ref ON bookings(booking_ref)`,
  `CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(guest_email)`,
  
  `CREATE TABLE IF NOT EXISTS blocked_dates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date DATE NOT NULL UNIQUE,
    reason VARCHAR(255),
    blocked_by VARCHAR(100)
  )`,
  
  `CREATE INDEX IF NOT EXISTS idx_blocked_dates_date ON blocked_dates(date)`,
  
  `CREATE TABLE IF NOT EXISTS email_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    email_type VARCHAR(50) NOT NULL,
    recipient VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
    error_message TEXT,
    resend_email_id VARCHAR(100)
  )`,
  
  `CREATE INDEX IF NOT EXISTS idx_email_logs_booking ON email_logs(booking_id)`,
  
  `CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'ZAR',
    payment_method VARCHAR(50) NOT NULL,
    external_reference VARCHAR(100),
    external_payment_id VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    metadata JSONB,
    completed_at TIMESTAMP WITH TIME ZONE,
    failed_at TIMESTAMP WITH TIME ZONE,
    failure_reason TEXT
  )`,
  
  `CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id)`,
  `CREATE INDEX IF NOT EXISTS idx_payments_external_ref ON payments(external_reference)`,
  
  `CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
       NEW.updated_at = NOW();
       RETURN NEW;
   END;
   $$ language 'plpgsql'`,
  
  `DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings`,
  
  `CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column()`
];

async function runStatements() {
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    console.log(`Running statement ${i + 1}/${statements.length}...`);
    
    try {
      const response = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: stmt })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        console.error(`Error on statement ${i + 1}:`, result);
      } else {
        console.log(`✓ Statement ${i + 1} completed`);
      }
    } catch (err) {
      console.error(`Failed statement ${i + 1}:`, err.message);
    }
    
    // Small delay between statements
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\nSchema setup complete!');
}

runStatements();

import { Resend } from 'resend';

// Resend Email API Route
// Sends booking confirmation emails

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, bookingRef, guestName, checkIn, checkOut, numGuests, total, propertyName } = body;

    // Validate required fields
    if (!to || !bookingRef || !guestName) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Resend API key setup
    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      return Response.json(
        { error: 'Resend API key not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendKey);

    // Format dates - ensuring we treat the input as a local date string to avoid timezone shifts
    const formatDate = (dateStr: string) => {
      const [year, month, day] = dateStr.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      
      return date.toLocaleDateString('en-ZA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    // Sender settings
    const finalFromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    // Testing logic: Resend trial accounts can only send to the account owner email.
    // If RESEND_TEST_EMAIL is set (e.g. in your local .env.local), we use it for testing.
    // In production (Vercel), you should REMOVE this variable to send to real guests.
    const testEmailOverride = process.env.RESEND_TEST_EMAIL;
    const finalToEmail = testEmailOverride || to;
    
    if (testEmailOverride) {
      console.log(`[TEST MODE] Redirecting email from ${to} to authorized test email: ${testEmailOverride}`);
    }
    
    console.log(`Sending email via Resend SDK: From=${finalFromEmail}, To=${finalToEmail}`);
    
    // Send email to guest
    const guestEmailResult = await resend.emails.send({
      from: finalFromEmail,
      to: [finalToEmail],
      subject: `Booking Confirmation - ${bookingRef}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1c1917; color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px; }
    .booking-ref { font-size: 24px; font-weight: bold; color: #1c1917; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e5e5; }
    .detail-label { font-weight: 600; color: #666; }
    .detail-value { font-weight: 500; }
    .total { font-size: 20px; font-weight: bold; color: #1c1917; margin-top: 20px; padding-top: 20px; border-top: 2px solid #1c1917; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 14px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Booking Confirmed!</h1>
    <p>Thank you for choosing The Big 14</p>
  </div>
  
  <div class="content">
    <p>Hi ${guestName},</p>
    <p>Your booking has been confirmed. Here are your booking details:</p>
    
    <div class="booking-ref">Reference: ${bookingRef}</div>
    
    <div class="detail-row">
      <span class="detail-label">Property</span>
      <span class="detail-value">${propertyName || 'The Big 14 Guesthouse'}</span>
    </div>
    
    <div class="detail-row">
      <span class="detail-label">Check-in</span>
      <span class="detail-value">${formatDate(checkIn)}</span>
    </div>
    
    <div class="detail-row">
      <span class="detail-label">Check-out</span>
      <span class="detail-value">${formatDate(checkOut)}</span>
    </div>
    
    <div class="detail-row">
      <span class="detail-label">Guests</span>
      <span class="detail-value">${numGuests}</span>
    </div>
    
    <div class="total">
      <div class="detail-row">
        <span class="detail-label">Total Paid</span>
        <span class="detail-value">R${Number(total).toLocaleString()}</span>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Check-in Instructions:</strong></p>
      <p>• Check-in time: 2:00 PM - 8:00 PM</p>
      <p>• Please have your ID ready for verification</p>
      <p>• Contact us at +27 63 900 1897 for any questions</p>
      <br>
      <p>We look forward to hosting you!</p>
      <p><strong>The Big 14 Team</strong></p>
    </div>
  </div>
</body>
</html>
      `,
    });

    if (guestEmailResult.error) {
      console.error('Resend SDK error (guest):', guestEmailResult.error);
      return Response.json(
        { error: guestEmailResult.error.message || 'Failed to send email' },
        { status: 400 }
      );
    }

    // Also send notification to admin email
    try {
      const adminToEmail = testEmailOverride || 'thebigfourteen03@gmail.com';
      console.log(`Sending admin notification to ${adminToEmail}`);
      await resend.emails.send({
        from: finalFromEmail,
        to: [adminToEmail],
        subject: `New Booking - ${bookingRef}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1c1917; color: white; padding: 20px; text-align: center; }
    .content { background: #f9f9f9; padding: 20px; }
    .detail-row { padding: 8px 0; border-bottom: 1px solid #e5e5e5; }
  </style>
</head>
<body>
  <div class="header">
    <h2>New Booking Alert</h2>
  </div>
  <div class="content">
    <p><strong>Reference:</strong> ${bookingRef}</p>
    <p><strong>Guest:</strong> ${guestName}</p>
    <p><strong>Email:</strong> ${to}</p>
    <p><strong>Dates:</strong> ${formatDate(checkIn)} - ${formatDate(checkOut)}</p>
    <p><strong>Guests:</strong> ${numGuests}</p>
    <p><strong>Total:</strong> R${Number(total).toLocaleString()}</p>
  </div>
</body>
</html>
        `,
      });
    } catch (adminError) {
      console.error('Failed to send admin notification:', adminError);
    }

    return Response.json({
      success: true,
      emailId: guestEmailResult.data?.id,
    });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return Response.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

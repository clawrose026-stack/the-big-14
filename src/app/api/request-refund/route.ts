import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, bookingRef, guestName, checkIn, checkOut, total } = body;

    if (!to || !bookingRef || !guestName) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;

    if (!resendKey) {
      return Response.json(
        { error: 'Resend API key not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(resendKey);
    const finalFromEmail = process.env.RESEND_FROM_EMAIL || 'bookings@big14.co.za';
    const adminEmail = 'thebigfourteen03@gmail.com';

    console.log(`Sending refund request via Resend SDK: From=${finalFromEmail}, To=${to}, CC=${adminEmail}`);

    const result = await resend.emails.send({
      from: finalFromEmail,
      to: [to],
      cc: [adminEmail],
      replyTo: adminEmail,
      subject: `Refund Request - ${bookingRef}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1c1917; color: white; padding: 20px; text-align: center; border-radius: 12px 12px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px; }
    .booking-ref { font-size: 20px; font-weight: bold; color: #1c1917; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h2>Refund Request Received</h2>
  </div>
  
  <div class="content">
    <p>Hi ${guestName},</p>
    <p>We have received your request for a refund for the following booking:</p>
    
    <div class="booking-ref">Reference: ${bookingRef}</div>
    
    <p><strong>Check-in:</strong> ${checkIn}</p>
    <p><strong>Check-out:</strong> ${checkOut}</p>
    <p><strong>Total Paid:</strong> R${Number(total).toLocaleString()}</p>
    
    <br/>
    <p>Our team will validate your request in accordance with our cancellation policy (requests must be made at least 24 hours before the 14:00 check-in time). We will be in touch shortly regarding the status of your refund.</p>
    <br/>
    <p>Best regards,</p>
    <p><strong>The Big 14 Team</strong></p>
  </div>
</body>
</html>
      `,
    });

    if (result.error) {
      console.error('Resend SDK error (refund):', result.error);
      return Response.json(
        { error: result.error.message || 'Failed to send email' },
        { status: 400 }
      );
    }

    return Response.json({ success: true });

  } catch (error: any) {
    console.error('Email sending error:', error);
    return Response.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

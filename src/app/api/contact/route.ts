import { Resend } from 'resend';
import { propertyDetails } from '@/lib/property';

export const runtime = 'nodejs';

const SUBJECTS: Record<string, string> = {
  booking: 'Booking Inquiry',
  availability: 'Check Availability',
  special: 'Special Request',
  feedback: 'Feedback',
  other: 'Other',
};

const LIMITS = { name: 120, email: 254, phone: 40, message: 4000 };

/** Escape anything a guest typed before it goes into the HTML email body. */
function esc(value: string) {
  return value.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
  );
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const subject = String(body.subject ?? '').trim();
  const message = String(body.message ?? '').trim();
  // Bots fill hidden fields; humans leave them empty. Accept silently so the
  // bot does not learn it was caught.
  const honeypot = String(body.company ?? '').trim();

  if (honeypot) return Response.json({ ok: true });

  if (!name || !email || !message || !SUBJECTS[subject]) {
    return Response.json(
      { error: 'Please fill in your name, email, subject and message.' },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    phone.length > LIMITS.phone ||
    message.length > LIMITS.message
  ) {
    return Response.json({ error: 'One of your fields is too long.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error('Contact form: RESEND_API_KEY or RESEND_FROM_EMAIL is not set.');
    return Response.json(
      { error: 'Our contact form is temporarily unavailable. Please WhatsApp or email us instead.' },
      { status: 503 }
    );
  }

  const to = process.env.CONTACT_INBOX ?? propertyDetails.contact.email;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject: `[${SUBJECTS[subject]}] ${name}`,
      html: `
        <h2>New enquiry from the website</h2>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone) || '—'}</p>
        <p><strong>Subject:</strong> ${esc(SUBJECTS[subject])}</p>
        <hr />
        <p style="white-space:pre-wrap">${esc(message)}</p>
      `,
    });

    if (error) {
      console.error('Contact form: Resend rejected the message:', error);
      return Response.json(
        { error: 'We could not send your message. Please WhatsApp or email us instead.' },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Contact form: unexpected failure:', err);
    return Response.json(
      { error: 'We could not send your message. Please WhatsApp or email us instead.' },
      { status: 502 }
    );
  }
}

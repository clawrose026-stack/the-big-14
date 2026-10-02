import type { Metadata } from 'next';
import DocPage from '../components/DocPage';
import { propertyDetails } from '@/lib/property';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How The Big 14 collects, uses and protects personal information, in line with the Protection of Personal Information Act (POPIA).',
  alternates: { canonical: '/privacy/' },
};

const { contact, name } = propertyDetails;

export default function PrivacyPage() {
  return (
    <DocPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="What personal information this website collects, why, who it is shared with, and how to have it corrected or deleted. Written to comply with the Protection of Personal Information Act 4 of 2013 (POPIA)."
      updated="2026-10-03"
      current="/privacy"
    >
      <div className="callout">
        <p>
          <strong>The short version.</strong> This website collects very
          little: what you type into the contact form, and anonymous visit
          statistics with no cookies. We use it only to answer you. We never
          sell it. Your booking itself is held by Airbnb, Booking.com or
          LekkeSlaap under their own privacy policies, not by us.
        </p>
      </div>

      <h2>1. Who is responsible</h2>

      <p>
        The responsible party for personal information collected through this
        website is the owner of {name}, Randburg, Johannesburg, South Africa.
        Our Information Officer can be contacted at{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2>2. What we collect</h2>

      <h3>When you use the contact form</h3>

      <ul>
        <li>Your name and email address (required);</li>
        <li>Your phone number (optional);</li>
        <li>The subject you choose and the message you write.</li>
      </ul>

      <p>
        Please do not include identity numbers, passport details or payment
        information in a message. We never need them through this website.
      </p>

      <h3>When you visit the site</h3>

      <p>
        We measure visits using Vercel Web Analytics, which is{' '}
        <strong>cookieless</strong>. It records which pages are viewed, the
        referring site, broad location (country), device type and browser, and
        which booking platform links are clicked. It does not identify you,
        does not track you across other websites, and does not store anything
        on your device.
      </p>

      <p>
        Like every website, our hosting provider also keeps short-lived
        technical logs — including IP addresses — to keep the site running and
        secure.
      </p>

      <h3>When you message us directly</h3>

      <p>
        If you contact us by WhatsApp or email instead, we receive whatever you
        send, along with your number or address. Those services&apos; own
        privacy policies apply to the message in transit.
      </p>

      <h2>3. Why we use it</h2>

      <table>
        <thead>
          <tr>
            <th scope="col">Purpose</th>
            <th scope="col">Lawful basis under POPIA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Answering your enquiry</td>
            <td>Your consent, given by sending the message, and steps you have asked us to take before a stay</td>
          </tr>
          <tr>
            <td>Understanding how the site is used, so we can improve it</td>
            <td>Our legitimate interest — using anonymous, aggregated data only</td>
          </tr>
          <tr>
            <td>Keeping the site and the contact form secure, and preventing abuse</td>
            <td>Our legitimate interest</td>
          </tr>
          <tr>
            <td>Meeting a legal obligation</td>
            <td>Compliance with the law</td>
          </tr>
        </tbody>
      </table>

      <p>
        We do not use your information for marketing, and we will not add you
        to a mailing list.
      </p>

      <h2>4. Who we share it with</h2>

      <p>
        We share personal information only with the service providers
        (&ldquo;operators&rdquo;, in POPIA&apos;s terms) needed to run this
        website, each bound to protect it:
      </p>

      <table>
        <thead>
          <tr>
            <th scope="col">Provider</th>
            <th scope="col">What they do</th>
            <th scope="col">Where</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vercel Inc.</td>
            <td>Hosts the website; provides cookieless analytics</td>
            <td>United States and global edge network</td>
          </tr>
          <tr>
            <td>Resend</td>
            <td>Delivers contact-form messages to our inbox</td>
            <td>United States</td>
          </tr>
          <tr>
            <td>Google (Gmail)</td>
            <td>Our email inbox, where your message is received</td>
            <td>United States and elsewhere</td>
          </tr>
        </tbody>
      </table>

      <p>
        Because these providers process information outside South Africa, this
        is a cross-border transfer under section 72 of POPIA. Each is subject to
        data-protection law and contractual obligations that provide
        protection substantially similar to POPIA&apos;s.
      </p>

      <p>
        We will otherwise disclose personal information only where the law
        requires it. We never sell or rent it.
      </p>

      <h2>5. Your booking</h2>

      <p>
        Bookings are not made on this website. When you book through Airbnb,
        Booking.com or LekkeSlaap, that platform collects your details and
        payment and shares with us what we need to host you — typically your
        name, the number of guests and a way to contact you. That information
        is governed by the platform&apos;s privacy policy, and we use it only to
        manage your stay.
      </p>

      <h2>6. Security cameras</h2>

      <p>
        The property has exterior security cameras covering the entrance and
        outdoor approaches, for the security of guests and the premises. There
        are no cameras inside the unit. Footage is kept only as long as needed
        for security and is not shared except with law enforcement where an
        incident requires it.
      </p>

      <h2>7. How long we keep it</h2>

      <ul>
        <li>
          <strong>Contact-form enquiries:</strong> up to 24 months after our
          last exchange, so we have context if you write again, then deleted.
        </li>
        <li>
          <strong>Analytics:</strong> anonymous and aggregated, so it contains
          no personal information to delete.
        </li>
        <li>
          <strong>Hosting logs:</strong> kept by Vercel for a short period under
          their retention policy.
        </li>
      </ul>

      <h2>8. Your rights</h2>

      <p>Under POPIA you have the right to:</p>

      <ul>
        <li>Ask whether we hold personal information about you, and for a copy of it;</li>
        <li>Ask us to correct information that is inaccurate or out of date;</li>
        <li>Ask us to delete information we no longer have a reason to keep;</li>
        <li>Object to us processing your information;</li>
        <li>Withdraw consent you have given, at any time;</li>
        <li>
          Lodge a complaint with the Information Regulator if you believe we
          have mishandled your information.
        </li>
      </ul>

      <p>
        To exercise any of these, email{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>. We will respond
        within 30 days and will not charge you for a reasonable request.
      </p>

      <h3>The Information Regulator</h3>

      <p>
        The Information Regulator (South Africa)
        <br />
        Website:{' '}
        <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">
          inforegulator.org.za
        </a>
        <br />
        Complaints:{' '}
        <a href="mailto:POPIAComplaints@inforegulator.org.za">
          POPIAComplaints@inforegulator.org.za
        </a>
      </p>

      <h2>9. Security</h2>

      <p>
        The website is served only over an encrypted (HTTPS) connection.
        Contact-form messages are transmitted securely to our email provider
        and are not stored in a separate database. Access to our inbox is
        limited to the people who host the property.
      </p>

      <p>
        If a security compromise affecting your personal information occurs,
        we will notify you and the Information Regulator as POPIA requires.
      </p>

      <h2>10. Children</h2>

      <p>
        This website is not aimed at children, and we do not knowingly collect
        personal information from anyone under 18.
      </p>

      <h2>11. Changes to this policy</h2>

      <p>
        If we change how we handle personal information, we will update this
        page and the date at the top of it.
      </p>
    </DocPage>
  );
}

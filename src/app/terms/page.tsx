import type { Metadata } from 'next';
import DocPage from '../components/DocPage';
import { propertyDetails } from '@/lib/property';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms governing use of The Big 14 website, and how they relate to bookings made through Airbnb, Booking.com and LekkeSlaap.',
  alternates: { canonical: '/terms/' },
};

const { contact, name } = propertyDetails;

export default function TermsPage() {
  return (
    <DocPage
      eyebrow="Legal"
      title="Terms of Use"
      intro="These terms cover your use of this website. They are deliberately short, because this site gives you information and sends you to a booking platform — it does not take your money or hold your reservation."
      updated="2026-10-02"
      current="/terms"
    >
      <div className="callout">
        <p>
          <strong>Most importantly:</strong> no booking is made on this
          website. Your reservation is a contract between you and the platform
          you book through, under their terms. Nothing here replaces those.
        </p>
      </div>

      <h2>1. Who we are</h2>

      <p>
        This website is operated by the owners of {name}, a guesthouse in
        Randburg, Johannesburg, South Africa. Contact:{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2>2. Accepting these terms</h2>

      <p>
        By using this website you accept these terms. If you do not accept
        them, please do not use the site. We may update them, and the date at
        the top of this page shows the last revision.
      </p>

      <h2>3. What this website does</h2>

      <p>This site exists to:</p>

      <ul>
        <li>Describe the property and show photographs of it;</li>
        <li>Set out our house rules and policies;</li>
        <li>
          Link you to our listings on Airbnb, Booking.com and LekkeSlaap;
        </li>
        <li>Let you send us a message.</li>
      </ul>

      <p>
        It does not process payments, take reservations or store booking
        records. Any page suggesting otherwise is not live.
      </p>

      <h2>4. Bookings are made elsewhere</h2>

      <p>
        When you follow a link to a booking platform, you leave this site. From
        that point:
      </p>

      <ul>
        <li>That platform&apos;s terms, privacy policy and fees apply;</li>
        <li>
          Your payment, cancellation rights and refunds are governed by them —
          see our <a href="/cancellation-policy">cancellation policy</a>;
        </li>
        <li>
          Your reservation is a contract between you, the platform and us, on
          the platform&apos;s terms.
        </li>
      </ul>

      <p>
        Our <a href="/house-rules">house rules</a> apply to every stay,
        whichever platform you booked through.
      </p>

      <h2>5. Accuracy of information</h2>

      <p>
        We work to keep this site accurate, but descriptions, photographs,
        amenities and indicative rates may change or contain errors.
      </p>

      <p>
        <strong>
          Where this site and the booking platform disagree, the platform is
          correct.
        </strong>{' '}
        Any price shown here is indicative only. The rate that applies is the
        one shown at checkout on the platform for your dates.
      </p>

      <p>
        Photographs show the property as accurately as we can manage.
        Furnishings and finishes may change over time.
      </p>

      <h2>6. Using this site</h2>

      <p>You agree not to:</p>

      <ul>
        <li>Use the site unlawfully, or to break anyone else&apos;s rights;</li>
        <li>
          Attempt to gain unauthorised access to the site, its servers or any
          connected system;
        </li>
        <li>
          Submit false, abusive or misleading information through the contact
          form, or use it to send unsolicited marketing;
        </li>
        <li>
          Interfere with the site&apos;s operation, including by automated
          scraping or by overwhelming it with requests;
        </li>
        <li>
          Reproduce our photographs or text commercially without written
          permission.
        </li>
      </ul>

      <h2>7. The contact form</h2>

      <p>
        Please send accurate information and only about your own enquiry. What
        happens to that information is set out in our{' '}
        <a href="/privacy">privacy policy</a>.
      </p>

      <p>
        We aim to reply quickly, but sending a message creates no obligation on
        us and does not reserve any dates. A booking exists only once a
        platform confirms it.
      </p>

      <h2>8. Intellectual property</h2>

      <p>
        The text, photographs, design and branding on this site belong to us or
        are used with permission, and are protected by copyright. You may view
        and print pages for your own personal use.
      </p>

      <p>
        Third-party names and marks referred to on this site — including
        Airbnb, Booking.com and LekkeSlaap — belong to their respective owners
        and are used only to identify where our listings appear. We are not
        affiliated with, endorsed by, or acting as an agent for any of them.
      </p>

      <h2>9. Links to other sites</h2>

      <p>
        We link to booking platforms and occasionally to local recommendations.
        We do not control those sites and are not responsible for their
        content, their terms or how they handle your data.
      </p>

      <h2>10. Availability</h2>

      <p>
        We do not promise the site will always be available or error-free. We
        may change, suspend or withdraw any part of it without notice.
      </p>

      <h2>11. Liability</h2>

      <p>
        To the extent the law allows, we are not liable for any indirect or
        consequential loss arising from your use of this website or from
        reliance on information published here.
      </p>

      <p>
        Nothing in these terms excludes or limits liability that cannot
        lawfully be excluded — including for death or personal injury caused by
        negligence, for fraud, or under the Consumer Protection Act 68 of 2008.
        Your rights under that Act are unaffected by anything on this page.
      </p>

      <p>
        Liability relating to a stay is governed by the booking platform&apos;s
        terms and by applicable South African law, not by this page.
      </p>

      <h2>12. Privacy</h2>

      <p>
        How we handle personal information is set out in our{' '}
        <a href="/privacy">privacy policy</a>, which forms part of these terms.
      </p>

      <h2>13. Governing law</h2>

      <p>
        These terms are governed by the law of the Republic of South Africa,
        and the South African courts have jurisdiction over any dispute arising
        from them.
      </p>

      <h2>14. Contact</h2>

      <p>
        Questions about these terms:{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </DocPage>
  );
}

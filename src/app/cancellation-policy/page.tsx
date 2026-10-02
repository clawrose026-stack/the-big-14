import type { Metadata } from 'next';
import DocPage from '../components/DocPage';
import { propertyDetails, livePlatforms, formatPhone, whatsappLink } from '@/lib/property';

export const metadata: Metadata = {
  title: 'Cancellation Policy',
  description:
    'How cancellations and refunds work for bookings at The Big 14 — set by the platform you booked through, explained plainly.',
  alternates: { canonical: '/cancellation-policy/' },
};

const { contact } = propertyDetails;

export default function CancellationPolicyPage() {
  return (
    <DocPage
      eyebrow="Booking Information"
      title="Cancellation Policy"
      intro="Your cancellation terms come from the platform you booked through, not from us. Here is what that means in practice and how to act on it."
      updated="2026-10-02"
      current="/cancellation-policy"
    >
      <div className="callout">
        <p>
          <strong>The short version.</strong> Cancel through the same platform
          you booked on. The terms you agreed to at checkout are the ones that
          apply, and the refund comes from them, not from us. We cannot
          override a platform&apos;s policy, in either direction.
        </p>
      </div>

      <h2>Why the platform decides</h2>

      <p>
        We do not take bookings directly on this website. Every reservation is
        made and held by Airbnb, Booking.com or LekkeSlaap, which means each of
        them handles your payment, your cancellation window and your refund
        under their own terms.
      </p>

      <p>
        This works in your favour. You get that platform&apos;s payment
        protection, their dispute process, and a written record of exactly what
        you agreed to — none of which you would have from an informal
        arrangement with us.
      </p>

      <p>
        It does mean the terms differ depending on where you booked, and that
        we genuinely cannot tell you what your refund will be without knowing
        which platform you used.
      </p>

      <h2>How to cancel</h2>

      <ol>
        <li>
          Open the booking in the app or website you booked through, or find
          the confirmation email.
        </li>
        <li>
          Use that platform&apos;s own cancellation option. It will show you
          the refund amount <strong>before</strong> you confirm.
        </li>
        <li>Keep the confirmation of cancellation.</li>
      </ol>

      <p>
        Messaging us is not a cancellation. We have no way to cancel a booking
        on your behalf, and a reservation left uncancelled is treated as a
        no-show. Please always cancel through the platform itself.
      </p>

      <h2>Where to find your terms</h2>

      <table>
        <thead>
          <tr>
            <th scope="col">Platform</th>
            <th scope="col">Where to look</th>
          </tr>
        </thead>
        <tbody>
          {livePlatforms.map((platform) => (
            <tr key={platform.id}>
              <th scope="row">{platform.name}</th>
              <td>
                Your confirmation email, or the booking in your account. The
                policy is also shown on{' '}
                <a href={platform.url} target="_blank" rel="noopener noreferrer">
                  our listing
                </a>{' '}
                before you book.
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Policies also vary by rate: a discounted or non-refundable rate will
        have tighter terms than a flexible one, on the same listing and the
        same dates. Check what you actually selected.
      </p>

      <h2>If we have to cancel</h2>

      <p>
        This is rare, and we take it seriously when it happens. If something
        makes the property genuinely unusable — a burst geyser, a power or
        water failure we cannot resolve, damage from a previous stay — we will:
      </p>

      <ul>
        <li>Tell you as soon as we know, not at the last possible moment;</li>
        <li>
          Cancel through the platform so your full refund is processed
          automatically;
        </li>
        <li>
          Help you find somewhere comparable nearby where we can, though we
          cannot guarantee availability.
        </li>
      </ul>

      <p>
        We will not cancel a confirmed booking to re-let the dates at a higher
        rate. If that ever appears to have happened, raise it with the platform
        — every one of them penalises hosts for it, and rightly so.
      </p>

      <h2>Changing dates</h2>

      <p>
        Ask us before you cancel. If the new dates are free, a change is often
        simpler and cheaper than cancelling and rebooking, and most platforms
        support it as a modification request. We will say yes where we
        reasonably can.
      </p>

      <h2>Shortened stays and no-shows</h2>

      <p>
        If you leave earlier than booked, whether the unused nights are
        refunded is determined by the platform&apos;s policy, not by us.
      </p>

      <p>
        A booking where nobody arrives and nothing was cancelled is a no-show,
        and is normally non-refundable under every platform&apos;s terms. If
        you are delayed, even very late, message us — a late arrival is not a
        problem and is entirely different from a no-show.
      </p>

      <h2>Stays ended for breaking the house rules</h2>

      <p>
        A serious breach of the{' '}
        <a href="/house-rules">house rules</a> — a party, smoking indoors,
        significantly more guests than booked — may end the stay immediately,
        with no refund for the remaining nights. We would always rather have a
        conversation first, and in practice almost always do.
      </p>

      <h2>Questions before you book</h2>

      <p>
        If the cancellation terms matter to your plans, ask us before you
        commit, and compare the options across platforms — they are not the
        same. WhatsApp{' '}
        <a href={whatsappLink(contact.whatsapp)} target="_blank" rel="noopener noreferrer">
          {formatPhone(contact.whatsapp)}
        </a>{' '}
        or email{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <p>
        Nothing on this page limits your rights under the Consumer Protection
        Act 68 of 2008.
      </p>
    </DocPage>
  );
}

import type { Metadata } from 'next';
import DocPage from '../components/DocPage';
import { propertyDetails, formatPhone, whatsappLink } from '@/lib/property';

export const metadata: Metadata = {
  title: 'Accessibility',
  description:
    'An honest description of The Big 14 for guests with access needs, and the accessibility of this website.',
  alternates: { canonical: '/accessibility/' },
};

const { contact, specs, stay } = propertyDetails;

export default function AccessibilityPage() {
  return (
    <DocPage
      eyebrow="Guest Information"
      title="Accessibility"
      intro="We would rather tell you plainly what the property is like than have you arrive somewhere that does not work for you. If anything here leaves a question open, ask us before you book."
      updated="2026-10-03"
      current="/accessibility"
    >
      <div className="callout">
        <p>
          <strong>The Big 14 is not a specially adapted unit.</strong> It is a
          standard private guesthouse. Some guests with access needs will find
          it suits them well, and some will not — the details below are meant
          to help you decide.
        </p>
      </div>

      <h2>The property</h2>

      <table>
        <tbody>
          <tr>
            <th scope="row">Layout</th>
            <td>
              A single open-plan unit: sleeping and living area, with the
              kitchenette and dining area through a wide opening in the wall.
            </td>
          </tr>
          <tr>
            <th scope="row">Bed</th>
            <td>One {specs.bedType.toLowerCase()}.</td>
          </tr>
          <tr>
            <th scope="row">Bathroom</th>
            <td>Private, with a shower, toilet and basin.</td>
          </tr>
          <tr>
            <th scope="row">Parking</th>
            <td>
              Free, on the premises, for{' '}
              {stay.parkingSpaces === 1 ? 'one vehicle' : `${stay.parkingSpaces} vehicles`}.
            </td>
          </tr>
          <tr>
            <th scope="row">Outdoors</th>
            <td>Garden, patio and outdoor seating.</td>
          </tr>
          <tr>
            <th scope="row">Power</th>
            <td>
              Backup generator during load-shedding — relevant if you rely on
              powered medical equipment. Tell us what you need to run and we
              will confirm whether the generator can support it.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Ask us before you book</h2>

      <p>
        Every guest&apos;s needs are different, so we would rather answer your
        exact question than guess. Common things guests ask about, and we are
        happy to measure or photograph for you:
      </p>

      <ul>
        <li>Steps or thresholds between the parking area, the entrance and the unit;</li>
        <li>Door widths;</li>
        <li>The shower — its entry, and whether there is a step or lip;</li>
        <li>Toilet height and the space around it;</li>
        <li>Bed height;</li>
        <li>Lighting levels, and the route from the car to the door after dark.</li>
      </ul>

      <p>
        WhatsApp{' '}
        <a href={whatsappLink(contact.whatsapp)} target="_blank" rel="noopener noreferrer">
          {formatPhone(contact.whatsapp)}
        </a>{' '}
        or email{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>, and we will
        reply with honest answers and photos where they help.
      </p>

      <h2>Assistance animals</h2>

      <p>
        Pets are not permitted, but we will always discuss a trained
        assistance or guide dog. Please contact us before booking so we can
        make sure the platform booking reflects it.
      </p>

      <h2>This website</h2>

      <p>
        We aim for this website to meet the Web Content Accessibility
        Guidelines (WCAG) 2.2 at level AA. In practice that means:
      </p>

      <ul>
        <li>Every page can be used with a keyboard alone, with a visible focus outline;</li>
        <li>A &ldquo;skip to content&rdquo; link at the top of every page;</li>
        <li>Text alternatives for images, and labels on every form field;</li>
        <li>Animations switch off if your device is set to reduce motion;</li>
        <li>The layout works when zoomed to 200% and on small screens.</li>
      </ul>

      <p>
        If you find something on this site that is hard to use, please tell
        us — it is genuinely useful to know, and we will fix it.
      </p>
    </DocPage>
  );
}

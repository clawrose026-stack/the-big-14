import type { Metadata } from 'next';
import DocPage from '../components/DocPage';
import { propertyDetails, formatPhone, whatsappLink } from '@/lib/property';

export const metadata: Metadata = {
  title: 'Safety & Security',
  description:
    'Safety equipment, security measures, camera disclosure, load-shedding backup and emergency numbers for guests at The Big 14 in Randburg.',
  alternates: { canonical: '/safety/' },
};

const { contact } = propertyDetails;

export default function SafetyPage() {
  return (
    <DocPage
      eyebrow="Guest Information"
      title="Safety & Security"
      intro="What is in place to keep you safe, what to do in an emergency, and an honest disclosure of the security cameras on the property."
      updated="2026-10-03"
      current="/safety"
    >
      <div className="callout">
        <p>
          <strong>In an emergency, call for help first, then tell us.</strong>
        </p>
        <table>
          <tbody>
            <tr>
              <th scope="row">Any emergency, from a mobile</th>
              <td>
                <a href="tel:112">112</a>
              </td>
            </tr>
            <tr>
              <th scope="row">Police (SAPS)</th>
              <td>
                <a href="tel:10111">10111</a>
              </td>
            </tr>
            <tr>
              <th scope="row">Ambulance and fire</th>
              <td>
                <a href="tel:10177">10177</a>
              </td>
            </tr>
            <tr>
              <th scope="row">Your hosts</th>
              <td>
                <a href={whatsappLink(contact.whatsapp)} target="_blank" rel="noopener noreferrer">
                  {formatPhone(contact.whatsapp)}
                </a>{' '}
                (WhatsApp or call)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Safety equipment</h2>

      <ul>
        <li>
          <strong>Smoke alarm</strong> — please never cover or disable it. If
          it sounds while cooking, open a window rather than removing it.
        </li>
        <li>
          <strong>Carbon monoxide alarm</strong>.
        </li>
        <li>
          <strong>Fire extinguisher</strong> — we will show you where it is, or
          it is described in your arrival instructions.
        </li>
        <li>
          <strong>First aid kit</strong> — for minor cuts and scrapes. Please
          tell us if you use something, so we can restock it.
        </li>
      </ul>

      <p>
        If you notice that any of these is missing, damaged or beeping, please
        let us know straight away.
      </p>

      <h2>Security</h2>

      <ul>
        <li>The property is secured, with free parking on the premises.</li>
        <li>
          Keep the gate and doors locked whenever you go out, and overnight.
        </li>
        <li>
          Do not share access codes or keys with anyone who is not named on
          your booking.
        </li>
        <li>
          Do not leave valuables visible in your car, here or anywhere in
          Johannesburg.
        </li>
        <li>
          After dark, use Uber or Bolt rather than walking, and wait inside
          until your driver arrives.
        </li>
      </ul>

      <h2>Security cameras</h2>

      <p>
        We believe guests should know exactly what is recorded, before they
        book.
      </p>

      <ul>
        <li>
          There are <strong>exterior security cameras</strong> on the
          property. They cover the entrance and the outdoor approaches.
        </li>
        <li>
          There are <strong>no cameras, microphones or recording devices of
          any kind inside the unit</strong> — not in the living area, the
          bedroom, or the bathroom.
        </li>
        <li>
          Footage is used for security only. It is not monitored live for
          guest behaviour, and it is shared only with police if an incident
          requires it. See our{' '}
          <a href="/privacy">privacy policy</a>.
        </li>
      </ul>

      <h2>Load-shedding</h2>

      <p>
        The property has a <strong>backup generator</strong>, so lights, WiFi
        and the essentials keep running during load-shedding. During an outage,
        please avoid running the stove, air-conditioning and washing machine at
        the same time so the generator is not overloaded. If the power goes and
        does not come back within a minute or two, message us.
      </p>

      <h2>Fire safety</h2>

      <ul>
        <li>Never leave cooking unattended.</li>
        <li>
          Use the braai only in its place in the garden, never under cover or
          indoors, and make sure the coals are fully out — doused with water —
          before you leave them.
        </li>
        <li>
          No candles, and no smoking anywhere on the property.
        </li>
        <li>
          In a fire, get out first and call <a href="tel:10177">10177</a> or{' '}
          <a href="tel:112">112</a>. Do not go back inside for belongings.
        </li>
      </ul>

      <h2>Water and electricity</h2>

      <ul>
        <li>
          Johannesburg tap water is generally safe to drink, and bottled water
          is provided as well.
        </li>
        <li>
          If the electricity trips, the distribution board location is in your
          arrival instructions — or message us and we will talk you through
          it.
        </li>
        <li>
          Johannesburg occasionally has planned water outages. If one is
          scheduled during your stay, we will tell you in advance.
        </li>
      </ul>

      <h2>Medical help</h2>

      <p>
        For anything serious, call <a href="tel:10177">10177</a> or{' '}
        <a href="tel:112">112</a>. For anything else — a pharmacy, a GP, the
        nearest emergency room — message us and we will point you to the right
        place nearby.
      </p>

      <h2>Reporting a problem</h2>

      <p>
        If something feels unsafe, or anything on the property is broken or
        not working, tell us immediately on{' '}
        <a href={whatsappLink(contact.whatsapp)} target="_blank" rel="noopener noreferrer">
          {formatPhone(contact.whatsapp)}
        </a>
        . You will never be charged for reporting a fault, and we would always
        rather know.
      </p>
    </DocPage>
  );
}

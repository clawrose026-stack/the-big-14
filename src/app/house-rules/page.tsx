import type { Metadata } from 'next';
import DocPage from '../components/DocPage';
import { propertyDetails, formatPhone, whatsappLink } from '@/lib/property';

export const metadata: Metadata = {
  title: 'House Rules',
  description:
    'House rules for The Big 14 guesthouse in Randburg — check-in and check-out times, quiet hours, guest policy, smoking and parking.',
  alternates: { canonical: '/house-rules/' },
};

const { contact, specs, stay } = propertyDetails;

export default function HouseRulesPage() {
  return (
    <DocPage
      eyebrow="Guest Information"
      title="House Rules"
      intro="A short list, written so there are no surprises. Booking the property means agreeing to these, and they apply whichever platform you booked through."
      updated="2026-10-02"
      current="/house-rules"
    >
      <h2>The essentials</h2>

      <table>
        <tbody>
          <tr>
            <th scope="row">Check-in</th>
            <td>{stay.checkInFrom} to {stay.checkInUntil}. Arriving later? Tell us in advance and we will arrange it.</td>
          </tr>
          <tr>
            <th scope="row">Check-out</th>
            <td>By {stay.checkOutBy}.</td>
          </tr>
          <tr>
            <th scope="row">Maximum guests</th>
            <td>{specs.maxGuests} — including children and infants.</td>
          </tr>
          <tr>
            <th scope="row">Quiet hours</th>
            <td>{stay.quietHoursFrom} to {stay.quietHoursUntil}.</td>
          </tr>
          <tr>
            <th scope="row">Smoking</th>
            <td>Not permitted anywhere on the property, including outdoors.</td>
          </tr>
          <tr>
            <th scope="row">Pets</th>
            <td>Not permitted.</td>
          </tr>
          <tr>
            <th scope="row">Parties and events</th>
            <td>Not permitted.</td>
          </tr>
          <tr>
            <th scope="row">Parking</th>
            <td>Free, on the property, for {stay.parkingSpaces === 1 ? 'one vehicle' : `${stay.parkingSpaces} vehicles`}.</td>
          </tr>
        </tbody>
      </table>

      <h2>Arrival and departure</h2>

      <p>
        Check-in runs from <strong>{stay.checkInFrom} to {stay.checkInUntil}</strong>.
        We send arrival instructions and the full address by WhatsApp before
        you arrive — please make sure the number on your booking is one you
        can reach. If you will be later than {stay.checkInUntil}, let us know
        and we will make a plan.
      </p>

      <p>
        <strong>Arriving early or leaving late?</strong> Ask us. If the
        property is free either side of your stay we will usually say yes at no
        charge. What we cannot do is accommodate it unannounced, because the
        space may be mid-turnaround.
      </p>

      <p>
        Please leave by the agreed time. A late departure that delays our
        cleaning team can mean the next guest arrives to an unready space, and
        we may charge for the additional hour.
      </p>

      <h2>Guests and visitors</h2>

      <p>
        The property sleeps {specs.maxGuests}. Everyone staying overnight must
        be named on the booking — this matters for insurance and for the
        security of the complex, not just for our records.
      </p>

      <p>
        Day visitors are fine within reason. Please let us know in advance,
        keep to the quiet hours, and remember that the guest whose name is on
        the booking is responsible for anyone they bring onto the property.
      </p>

      <h2>Noise and neighbours</h2>

      <p>
        The Big 14 sits in a residential area with permanent residents either
        side. Quiet hours run from <strong>22:00 to 07:00</strong>. Outside
        those hours, normal conversation and music at a considerate level are
        perfectly fine.
      </p>

      <div className="callout">
        <p>
          <strong>No parties or events.</strong> This is not negotiable, and it
          is the one rule we will end a stay over. Gatherings that disturb
          neighbours or breach complex rules may be stopped on the spot, with
          no refund for the remaining nights.
        </p>
      </div>

      <h2>Smoking</h2>

      <p>
        The entire property is non-smoking, indoors and out. This includes
        vaping and e-cigarettes.
      </p>

      <p>
        Smoke gets into soft furnishings and takes a specialist clean to
        remove, which takes the property out of service. If we find evidence of
        smoking, we will charge the actual cost of that deep clean plus any
        nights we are unable to let the space.
      </p>

      <h2>Looking after the space</h2>

      <ul>
        <li>Please treat the property as you would a friend&apos;s home.</li>
        <li>
          Accidents happen and we are not precious about it — just tell us. A
          broken glass mentioned is nothing; a broken glass discovered is
          awkward for everyone.
        </li>
        <li>
          Damage beyond fair wear and tear will be charged at the cost of
          repair or replacement, through the platform you booked on.
        </li>
        <li>
          Please do not rearrange furniture, remove items from the property, or
          use the space for commercial photography or filming without asking.
        </li>
      </ul>

      <h2>Safety and security</h2>

      <ul>
        <li>
          Please lock up whenever you leave, and keep the gate and doors
          secured overnight.
        </li>
        <li>
          Do not share access codes with anyone who is not on the booking.
        </li>
        <li>
          There are <strong>exterior security cameras</strong> on the
          property, covering the entrance and outdoor approaches. There are no
          cameras or recording devices of any kind inside the unit. See{' '}
          <a href="/safety">safety &amp; security</a> for details.
        </li>
        <li>
          In an emergency call <strong>10111</strong> (police) or{' '}
          <strong>10177</strong> (ambulance), then let us know.
        </li>
      </ul>

      <h2>The braai and garden</h2>

      <ul>
        <li>
          The private charcoal braai is yours to use. Please use it only in
          its spot in the garden, never on the patio under cover or indoors.
        </li>
        <li>
          Make sure coals are completely out before you leave them or go to
          bed — douse them with water rather than leaving them to burn down.
        </li>
        <li>Please clean the grid after use, as you would at home.</li>
      </ul>

      <h2>Load-shedding</h2>

      <p>
        The property has a backup generator, so lights, WiFi and the
        essentials stay on during load-shedding. It is sized for normal use,
        not for everything at once: during an outage please avoid running
        high-draw appliances — the stove, air-conditioning and washing machine
        — at the same time.
      </p>

      <h2>Laundry</h2>

      <p>
        The washing machine is available to guests. Please do not leave a load
        in the machine when you check out.
      </p>

      <h2>Rubbish and recycling</h2>

      <p>
        Please bag household waste and leave it in the bin provided. If you are
        with us over a collection day we will let you know which day that is.
      </p>

      <h2>If something goes wrong</h2>

      <p>
        Message us. Most problems — a tripped breaker, a cold tap, a missing
        towel — take minutes to sort out if we hear about them while you are
        still here. We would far rather fix something during your stay than
        read about it in a review.
      </p>

      <p>
        WhatsApp{' '}
        <a href={whatsappLink(contact.whatsapp)} target="_blank" rel="noopener noreferrer">
          {formatPhone(contact.whatsapp)}
        </a>{' '}
        or email{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2>Breaking the rules</h2>

      <p>
        We are reasonable people and these rules exist to protect the property
        and the neighbours, not to catch anyone out. That said, a serious or
        repeated breach — a party, smoking indoors, far more guests than booked
        — may end the stay immediately without a refund for the remaining
        nights, and we will report it to the platform you booked through.
      </p>

      <p>
        Cancellation and refunds are handled by that platform. See our{' '}
        <a href="/cancellation-policy">cancellation policy</a> for how that
        works.
      </p>
    </DocPage>
  );
}

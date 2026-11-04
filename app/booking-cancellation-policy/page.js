import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Booking & Cancellation Policy | BookMyFotographer",
  description: "Booking and cancellation policy for BookMyFotographer marketplace.",
};

export default function BookingCancellationPolicyPage() {
  return (
    <main className={styles.page}>
      <Navbar current="booking-cancellation-policy" />

      <div className={styles.hero}>
        <p className={styles.eyebrow}>POLICY</p>
        <h1>Booking &amp; Cancellation Policy</h1>
        <p>
          Practical guidance for customers and freelance photography
          professionals
        </p>
      </div>

      <section className={styles.content}>
        <p className={styles.introduction}>
          BookMyFotographer helps customers discover and connect with
          independent freelance photographers and videographers. This policy
          explains the recommended booking, confirmation, availability,
          cancellation and feedback process on the Platform.
        </p>
        <p>
          BookMyFotographer is a connecting platform. The service agreement,
          including fees and cancellation consequences, is directly between the
          customer and the selected Professional.
        </p>

        <article>
          <h2>1. Purpose of This Policy</h2>
          <p>
            BookMyFotographer helps customers discover and connect with
            independent freelance photographers and videographers. This policy
            explains the recommended booking, confirmation, availability,
            cancellation and feedback process on the Platform.
          </p>
          <p>
            BookMyFotographer is a connecting platform. The service agreement,
            including fees and cancellation consequences, is directly between
            the customer and the selected Professional.
          </p>
        </article>

        <article>
          <h2>2. Before You Request a Booking</h2>
          <p>
            Customers should review the Professional&rsquo;s profile, portfolio,
            service area, indicative pricing, ratings and availability
            information. A profile or calendar entry is a guide and does not by
            itself guarantee availability.
          </p>
          <p>
            Before confirming, discuss and agree directly with the
            Professional:
          </p>
          <ul>
            <li>
              Event type, date, start and end time, location and expected
              duration.
            </li>
            <li>
              Type of coverage, number of photographers or videographers and
              any special requirements.
            </li>
            <li>
              Deliverables, such as edited photographs, raw files, video
              format, album or other outputs.
            </li>
            <li>
              Editing, delivery method and expected delivery timeline.
            </li>
            <li>
              Total fee, hourly rate or package, travel or additional charges,
              taxes if applicable, advance and balance payment.
            </li>
            <li>
              Cancellation, postponement, rescheduling, overtime and refund
              terms.
            </li>
          </ul>
        </article>

        <article>
          <h2>3. When Is a Booking Confirmed?</h2>
          <p>
            A booking should be treated as confirmed only when the customer and
            Professional have mutually accepted the assignment and agreed its
            material terms, preferably in writing through a message, email or
            booking confirmation record by any means.
          </p>
          <p>
            Customers should retain the Professional&rsquo;s confirmation and the
            agreed details. Professionals should ensure that they can fulfil
            the assignment before accepting it.
          </p>
        </article>

        <article>
          <h2>4. Direct Payments and Receipts</h2>
          <p>
            All payments are made directly between the customer and
            Professional; BookMyFotographer does not get involved here. The
            parties must agree who will receive payment, the amount, due dates,
            advance, balance, payment method and any refund or cancellation
            charge. The Professional should provide appropriate acknowledgement
            for the amounts received.
          </p>
          <p>
            BookMyFotographer does not collect, hold, transfer, refund or
            guarantee payments made directly between users and cannot decide a
            payment dispute arising from their private agreement.
          </p>
        </article>

        <article>
          <h2>5. Customer Cancellation or Rescheduling</h2>
          <p>
            If a customer needs to cancel or reschedule, they should contact
            the Professional directly as soon as possible and follow the
            cancellation or rescheduling terms agreed before booking.
          </p>
          <p>
            The customer should also notify BookMyFotographer by direct phone
            calling so that the Professional&rsquo;s availability calendar can be
            corrected from back-end wherever it is necessary.
          </p>
          <p>
            Any advance refund, cancellation charge, rescheduling fee or other
            financial adjustment must be resolved directly between the customer
            and Professional under their mutual agreement.
          </p>
        </article>

        <article>
          <h2>6. Professional Cancellation or Unavailability</h2>
          <p>
            If a Professional cannot attend a confirmed assignment, they should
            inform the customer immediately, explain the situation where
            appropriate, and discuss any next steps under their agreement.
          </p>
          <p>
            The Professional should also call BookMyFotographer at [insert
            official phone number] so that the Platform can update the
            availability calendar and booking information.
          </p>
          <p>
            The customer may contact BookMyFotographer to request assistance in
            finding an alternative Professional. We will make reasonable
            efforts to help identify an available replacement, but a
            replacement is not guaranteed, particularly at short notice or
            during peak dates.
          </p>
          <p>
            Any refund or other financial settlement remains a matter between
            the customer and Professional under their direct agreement.
            BookMyFotographer does not promise to fund a replacement, reimburse
            a customer or compensate either party for a cancellation.
          </p>
        </article>

        <article>
          <h2>7. Calendar and Availability Updates</h2>
          <p>
            The Platform may automatically block or mark a Professional as
            unavailable when a booking is recorded. This is intended to reduce
            overlapping bookings but is not a substitute for direct
            confirmation.
          </p>
          <p>
            Professionals should keep their calendars updated through their
            profiles. If either party cancels or changes a booking, both
            parties should notify BookMyFotographer by phone so the calendar
            can be manually corrected where required.
          </p>
          <p>
            Until an update is visible, users should confirm availability
            directly with the Professional. Professionals remain responsible
            for managing their own schedules and avoiding double bookings.
          </p>
        </article>

        <article>
          <h2>8. Changes to Event Requirements</h2>
          <p>
            Any material change to the event date, time, location, duration,
            scope, deliverables or number of professionals should be discussed
            and accepted by both parties in writing.
          </p>
          <p>
            A change may affect the agreed fee or availability. Neither party
            should assume that a change has been accepted until the other party
            confirms it.
          </p>
        </article>

        <article>
          <h2>9. Late Arrival, Overtime and Deliverables</h2>
          <p>
            The customer and Professional should agree in advance how delays,
            overtime, travel, breaks, additional editing, extra deliverables
            and delivery extensions will be handled.
          </p>
          <p>
            If an issue arises on the event day, the parties should
            communicate promptly and keep a written record of any revised
            arrangement. BookMyFotographer does not determine the professional
            fee or the scope of the direct service agreement.
          </p>
        </article>

        <article>
          <h2>10. Feedback and Complaints</h2>
          <p>
            After the assignment, both parties are encouraged to share honest
            feedback with BookMyFotographer. Customer reviews may contribute to
                        a Professional&rsquo;s displayed rating, subject to moderation and
                        the Platform&rsquo;s review standards.
          </p>
          <p>
            If misconduct, harassment, safety concerns, fraud or another
            serious incident occurs, report it to [insert support email] or
            [insert phone number] as soon as possible. We may review the report
            and take appropriate platform action, but we cannot guarantee that
            we can resolve every dispute.
          </p>
          <p>
            If anyone is in immediate danger or a crime may have occurred,
            contact the appropriate emergency service or law-enforcement
            authority first.
          </p>
        </article>

        <article>
          <h2>11. Practical Checklist</h2>
          <ul>
            <li>
              Confirm the date, time, location and duration directly with the
              Professional.
            </li>
            <li>
              Agree the complete scope, deliverables and delivery timeline.
            </li>
            <li>
              Agree all fees, advances, balance payments and cancellation terms
              in writing.
            </li>
            <li>Keep confirmation messages and payment receipts.</li>
            <li>
              Notify the Professional and BookMyFotographer promptly if a
              booking changes or is cancelled.
            </li>
            <li>
              After the assignment, share feedback and report serious concerns
              promptly.
            </li>
          </ul>
        </article>

        <article>
          <h2>12. Our Role and Important Notice</h2>
          <p>
            BookMyFotographer provides the platform through which customers
            and independent Professionals can find and connect with one
            another. The actual photography or videography service is provided
            under a direct agreement between those parties.
          </p>
          <p>
            We will make reasonable efforts to assist with platform-related
            communication and, where possible, identify an alternative
            Professional following a cancellation. We do not guarantee service
            delivery, a replacement, a refund or a particular dispute outcome.
          </p>
          <p>
            Nothing in this policy limits any right or remedy that a customer
            or Professional has under applicable Indian law.
          </p>
        </article>

        <article>
          <h2>13. Contact Us</h2>
          <p>
            For booking-calendar updates, cancellation notifications,
            replacement requests or platform assistance, contact:
          </p>
          <p>
            BookMyFotographer | West Bengal, India
          </p>
          <p>
            Website: <strong>bookmyfotographer.co.in</strong>
          </p>
          <p>
            Email: <strong>bookmyfotographer@gmail.com</strong>
          </p>
          <p>Phone: <strong>+91 9804060342</strong></p>
          <p>
            Grievance contact: Anit Dey, +91 8334934147
          </p>
          <p>
            <strong>
              BookMyFotographer — Connecting Customers. Empowering Creators.
            </strong>
          </p>
        </article>
      </section>
      <Footer />
    </main>
  );
}

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Booking & Cancellation Policy | BookMyFotographer",
  description:
    "Booking and cancellation policy for BookMyFotographer marketplace.",
};

const policySections = [
  {
    title: "1. Purpose of This Policy",
    content: (
      <>
        <p>
          BookMyFotographer connects customers with independent freelance
          photographers and videographers (each a &quot;Professional&quot;).
          This policy explains how bookings, platform payments, cancellations
          and related refunds are handled. It should be read together with
          BookMyFotographer Terms &amp; Conditions.
        </p>
        <p>
          The customer and Professional agree the photography or videography
          services directly. BookMyFotographer separately administers the 25%
          booking advance and collects the applicable Customer Processing Fee
          and Photographer Processing Fee described in this policy.
        </p>
      </>
    ),
  },
  {
    title: "2. Before You Request a Booking",
    content: (
      <>
        <p>
          Customers should review a Professional&apos;s profile, portfolio,
          service area, indicative pricing and availability. Profile and
          calendar information is indicative and should be confirmed directly
          with the Professional.
        </p>
        <p>
          Before confirming a booking, the customer and Professional should
          agree on:
        </p>
        <ul>
          <li>
            Event type, date, venue, start and end times, and expected duration.
          </li>
          <li>
            Coverage requirements, number of photographers or videographers and
            any special requests.
          </li>
          <li>
            Deliverables, including edited photographs, raw files, videos,
            albums or other outputs.
          </li>
          <li>
            Editing requirements, delivery method and expected delivery
            timeline.
          </li>
          <li>
            The Professional&apos;s total fee, package or hourly rate, and any
            travel, additional or applicable tax charges.
          </li>
          <li>
            Any other agreed arrangements, including postponement, rescheduling,
            overtime and changes.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. When Is a Booking Confirmed?",
    content: (
      <>
        <p>
          A booking is officially confirmed only after the customer and
          Professional have agreed the material assignment details, the
          Professional has expressly accepted the assignment, and
          BookMyFotographer has received the customer&apos;s 25% advance, the
          Customer Processing Fee and the Photographer Processing Fee. A
          request, tentative availability indication or preliminary discussion
          is not a confirmed booking.
        </p>
        <p>The booking process is as follows:</p>
        <ol>
          <li>
            The customer and Professional first agree the event date, venue,
            timings, scope, deliverables and the Professional&apos;s total fee,
            and the Professional confirms availability and willingness to accept
            the assignment.
          </li>
          <li>
            Before confirmation, the customer pays BookMyFotographer the 25%
            advance and the applicable Customer Processing Fee.
          </li>
          <li>
            The Professional then accepts the assignment and pays the applicable
            Photographer Processing Fee before the booking is confirmed.
          </li>
          <li>
            Once the Professional&apos;s acceptance and all three payments (the
            25% advance and both Processing Fees) have been received,
            BookMyFotographer confirms the booking and shares the parties&apos;
            direct contact details for coordination.
          </li>
        </ol>
        <p>
          Direct contact details will not be shared before official booking
          confirmation, except where disclosure is required by law or is
          otherwise expressly agreed by BookMyFotographer.
        </p>
        <p>
          Professionals should accept a booking only when they reasonably expect
          to be available and able to perform the assignment.
        </p>
      </>
    ),
  },
  {
    title: "4. Processing Fees and Advance Payment",
    content: (
      <>
        <p>
          Before a booking is confirmed, the customer must pay BookMyFotographer
          an advance equal to 25% of the Professional&apos;s total agreed fee.
          This advance is separate from the Customer Processing Fee. The advance
          will be held by BookMyFotographer and handled after confirmation in
          accordance with this policy.
        </p>
        <p>
          BookMyFotographer will hold the advance until the Professional
          completes the assigned work at the event. We will then contact the
          customer by telephone. Once the customer confirms that the
          Professional attended and completed the assigned work, we will release
          the full 25% advance directly to the Professional.
        </p>
        <p>
          If the Professional declines or is unable to accept the assignment
          after the customer has paid but before the booking is confirmed,
          BookMyFotographer will refund the customer&apos;s full 25% advance and
          Customer Processing Fee. If the Professional cancels a confirmed
          booking or does not attend on the event day, the customer will also
          receive a full refund of the 25% advance and Customer Processing Fee.
        </p>
        <p>
          Before the booking is confirmed, the customer must pay a nominal,
          non-refundable Customer Processing Fee. This fee covers platform
          administration, booking processing and coordination. If the
          Professional declines the assignment after the customer has paid, or
          subsequently cancels or does not attend, the Customer Processing Fee
          will be refunded in full. The fee is separate from the 25% advance and
          is not cancellation compensation, subject to applicable law.
        </p>
        <p>
          After accepting the assignment and before the booking is confirmed,
          the Professional must pay a nominal, non-refundable Photographer
          Processing Fee. This fee covers platform administration, booking
          processing and coordination and is separate from the
          Professional&apos;s service fee and the customer&apos;s advance. It is
          <strong> not a refundable security deposit or caution money.</strong>
        </p>
        <p>
          The applicable Customer Processing Fee and Photographer Processing
          Fee, payment methods and instructions will be communicated upfront
          before payment is due. Both Processing Fees and the customer&apos;s
          25% advance must be received before official booking confirmation.
          Users should retain their payment acknowledgements.
        </p>
      </>
    ),
  },
  {
    title: "5. Customer Cancellation or Rescheduling",
    content: (
      <>
        <p>
          A customer who wishes to cancel or reschedule must notify the
          Professional and BookMyFotographer as soon as possible. Any revised
          event date or material change must be accepted by both the customer
          and Professional.
        </p>
        <p>
          BookMyFotographer should be promptly notified by telephone or email,
          so that the booking record and Professional&apos;s availability can be
          updated.
        </p>
        <p>
          If the customer cancels a confirmed booking after paying the advance,
          cancellation compensation may be deducted from the advance and paid to
          the Professional, with the remaining balance refunded to the customer.
          The indicative maximum compensation schedule is:
          <em>
            {" "}
            more than 30 days before the event, up to 10% of the advance; 15-30
            days before the event, up to 25% of the advance; 7-15 days before
            the event, up to 50% of the advance; 3-7 days before the event, up
            to 75% of the advance; and less than 3 days before the event, up to
            100% of the advance.
          </em>{" "}
          The percentage is applied to the advance payment made by the customer,
          not to the Professional&apos;s total fee. The amount must be
          reasonable in the circumstances and may take account of the notice
          given, preparation or costs already incurred, the time reserved and
          the Professional&apos;s reasonable opportunity to obtain another
          assignment. BookMyFotographer may reduce or waive compensation where
          appropriate. Any remaining balance will be refunded promptly to the
          customer. The Customer Processing Fee remains non-refundable where the
          booking-processing service has been provided, subject to applicable
          law.
        </p>
      </>
    ),
  },
  {
    title: "6. Professional's Cancellation or Unavailability",
    content: (
      <>
        <p>
          A Professional who cannot fulfil a confirmed booking must notify both
          the customer and BookMyFotographer immediately.
        </p>
        <p>
          The Professional must contact BookMyFotographer by telephone so that
          the booking record and availability calendar can be updated promptly.
        </p>
        <p>
          At the customer&apos;s request, BookMyFotographer will make reasonable
          efforts to help identify an available alternative Professional.
          However, a replacement cannot be guaranteed.
        </p>
        <p>
          If the Professional cancels or does not attend on the event day, the
          customer will receive a full refund of the 25% advance and the
          Customer Processing Fee. If the Professional sends a substitute on
          their behalf, the 25% advance will be refunded to the customer, and
          the Professional will not receive that amount from BookMyFotographer.
          In this case, the Customer Processing Fee will not be refunded to the
          customer.
        </p>
        <p>
          The Photographer Processing Fee is a separate fee for
          booking-processing work already undertaken and is not a customer
          charge. Where cancellation results from a genuine emergency,
          circumstances beyond the Professional&apos;s reasonable control, or
          another reason not attributable to the Professional&apos;s fault,
          BookMyFotographer will review the circumstances fairly before deciding
          whether any platform action or further contractual consequence is
          appropriate. No automatic forfeiture of any fee applies here.
        </p>
      </>
    ),
  },
  {
    title: "7. Calendar and Availability Updates",
    content: (
      <>
        <p>
          The Platform may mark a Professional as unavailable when a booking is
          recorded. Calendar information is provided for convenience and may not
          always reflect real-time availability.
        </p>
        <p>
          Professionals must keep their availability information current. Both
          parties should notify BookMyFotographer promptly by telephone if a
          booking is cancelled or changed.
        </p>
        <p>
          Customers should confirm availability directly with the Professional
          before relying on a calendar entry. Professionals are responsible for
          avoiding double bookings.
        </p>
      </>
    ),
  },
  {
    title: "8. Changes to Event Requirements",
    content: (
      <>
        <p>
          Any material change to the event date, time, venue, duration, scope or
          deliverables must be discussed and accepted by both parties. A change
          may affect the fee or availability and is not effective until both
          parties agree.
        </p>
      </>
    ),
  },
  {
    title: "9. Late Arrival, Overtime and Deliverables",
    content: (
      <>
        <p>
          The customer and Professional should agree in advance how late
          arrival, overtime, travel, breaks, extra editing, additional
          deliverables and delivery extensions will be handled.
        </p>
        <p>
          Any revised arrangement should be communicated promptly and recorded
          where practicable. BookMyFotographer does not determine the
          Professional&apos;s service fee or the scope of the direct service
          agreement.
        </p>
      </>
    ),
  },
  {
    title: "10. Feedback and Complaints",
    content: (
      <>
        <p>
          After an assignment, both parties may share honest feedback. Customer
          reviews may contribute to a Professional&apos;s displayed rating on
          our website, subject to moderation and platform standards.
        </p>
        <p>
          Report misconduct, harassment, fraud or safety concerns to{" "}
          <a href="mailto:email@bookmyfotographer.co.in">
            email@bookmyfotographer.co.in
          </a>{" "}
          or <a href="tel:+918334934147">+91 8334934147</a> as soon as possible.
          We may review reports and take appropriate platform action but cannot
          always guarantee a particular outcome.
        </p>
        <p>
          If anyone is in immediate danger or a crime may have occurred, contact
          the appropriate emergency service or law-enforcement authority first.
        </p>
      </>
    ),
  },
  {
    title: "11. Our Role and Important Notice",
    content: (
      <>
        <p>
          BookMyFotographer connects customers and independent Professionals,
          administers the customer advance and the separate Processing Fees, and
          shares direct contact details only after a booking has been officially
          confirmed in accordance with this policy.
        </p>
        <p>
          We may assist with booking-related communication and attempts to
          identify a replacement. Except for the specific payment and refund
          commitments stated here, we do not guarantee a Professional&apos;s
          performance, a replacement or a particular dispute outcome.
        </p>
        <p>
          Customers and Professionals must not deliberately bypass
          BookMyFotographer in relation to an assignment introduced or confirmed
          through the Platform by falsely reporting it as cancelled, concealing
          that it will proceed, or privately arranging the same assignment to
          avoid applicable Processing Fees or booking obligations. If a
          confirmed assignment is moved off-platform by agreement, applicable
          fees already earned for booking-processing work remain payable,
          subject to applicable law. We may contact both parties independently,
          request relevant information and review booking and payment records
          before updating a booking as cancelled. Any claim for additional
          compensation must be reasonable, supported by the circumstances and
          permitted by law.
        </p>
        <p>
          Nothing in this policy limits any right or remedy that cannot lawfully
          be excluded under applicable Indian law.
        </p>
      </>
    ),
  },
];

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
          Customer and Professional booking procedures
        </p>
        <p>
          This policy explains the payment-handling process administered by
          BookMyFotographer. It should be read with the Terms &amp; Conditions.
          The customer and Professional must agree the service scope, total
          professional fee, deliverables and any other engagement terms before
          confirming a booking.
        </p>

        {policySections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            {section.content}
          </article>
        ))}

        <article>
          <h2>12. Contact Us</h2>
          <p>
            For booking updates, cancellations, complaints or platform
            assistance, contact:
          </p>
          <p>BookMyFotographer | West Bengal, India</p>
          <p>
            Website:{" "}
            <a
              href="https://bookmyfotographer.co.in"
              target="_blank"
              rel="noreferrer"
            >
              bookmyfotographer.co.in
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:email@bookmyfotographer.co.in">
              email@bookmyfotographer.co.in
            </a>
          </p>
          <p>
            Phone: <a href="tel:+919804060342">+91 9804060342</a>
          </p>
          <p>
            Grievance contact: Anit Dey,{" "}
            <a href="tel:+918334934147">+91 8334934147</a>
          </p>
          <p>
            <strong>
              BookMyFotographer — Your Moments. Their Creativity. One Platform.
            </strong>
          </p>
        </article>
      </section>

      <Footer />
    </main>
  );
}

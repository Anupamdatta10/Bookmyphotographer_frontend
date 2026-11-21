import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Terms & Conditions | BookMyFotographer",
  description: "Terms and conditions for using BookMyFotographer marketplace.",
};

const termsSections = [
  {
    title: "1. About the Platform and Our Role",
    content: (
      <>
        <p>
          BookMyFotographer (&quot;we&quot;, &quot;us&quot;, &quot;our&quot; or the
          &quot;Platform&quot;) is an online
          marketplace intended to help individuals, families, businesses and
          organisations discover and connect with independent freelance
          photographers and videographers for professional work.
        </p>
        <p>
          We provide a digital listing, discovery and connection facility and
          administer the booking payments expressly described in these Terms
          and the Booking &amp; Cancellation Policy. We do not provide
          photography or videography services or employ listed Professionals.
          Each service engagement is agreed directly between the customer and
          the selected photographer or videographer (the &quot;Professional&quot;).
        </p>
        <p>
          BookMyFotographer is not a party to the customer-Professional service
          agreement. This does not exclude any duty or liability that cannot
          lawfully be excluded under Indian law.
        </p>
      </>
    ),
  },
  {
    title: "2. Acceptance and Eligibility",
    content: (
      <>
        <p>
          By accessing, registering for, or using the Platform, you agree to
          these Terms &amp; Conditions and any policies incorporated by
          reference. If you do not agree, do not use the Platform.
        </p>
        <p>
          You must be legally capable of entering into a binding agreement to
          create an account or make a booking. A parent or legal guardian must
          make arrangements on behalf of a minor where appropriate.
        </p>
      </>
    ),
  },
  {
    title: "3. Account Registration and Verification",
    content: (
      <>
        <p>
          Users must provide accurate, current and complete information and
          keep it updated. Professionals must provide truthful information
          about their identity, experience, portfolio, service area and
          availability.
        </p>
        <p>
          We may request information or documents for verification, safety,
          fraud prevention or platform administration. Verification does not
          amount to a guarantee, certification or endorsement of a Professional&apos;s
          skill, conduct or service quality.
        </p>
        <p>
          You are responsible for safeguarding your login credentials and for
          activity carried out through your account. Notify us promptly if you
          suspect unauthorised access.
        </p>
      </>
    ),
  },
  {
    title: "4. Listings, Discovery and Booking",
    content: (
      <>
        <p>
          The Platform may display profiles, portfolios, service descriptions,
          indicative rates, availability and ratings. Customers should verify
          relevant details directly with the Professional before confirming a
          booking.
        </p>
        <p>
          Before confirmation, the customer and Professional should agree the
          event date, venue, working hours, scope, deliverables, editing,
          delivery timeline and the Professional&apos;s total fee. The Professional
          must confirm availability and expressly accept the assignment. The
          customer must review the payment and cancellation rules in Section 6
          and the Booking &amp; Cancellation Policy.
        </p>
        <p>
          A booking is officially confirmed only after the customer and
          Professional have agreed the material assignment details, the
          Professional has expressly accepted the assignment, and
          BookMyFotographer has received the customer&apos;s 25% advance, the
          Customer Processing Fee and the Photographer Processing Fee. A
          booking request, tentative availability indication or preliminary
          discussion is not a confirmed booking. BookMyFotographer will share
          the parties&apos; direct contact details only after official confirmation.
        </p>
        <p>The booking process is:</p>
        <ol>
          <li>
            The customer and Professional agree the assignment details, and the
            Professional confirms availability and willingness to accept.
          </li>
          <li>
            The customer pays the 25% advance and Customer Processing Fee.
          </li>
          <li>
            The Professional accepts the assignment and pays the Photographer
            Processing Fee.
          </li>
          <li>
            Once the Professional&apos;s acceptance and all required payments have
            been received, BookMyFotographer confirms the booking and shares
            direct contact details.
          </li>
        </ol>
      </>
    ),
  },
  {
    title: "5. Direct Service Agreement",
    content: (
      <>
        <p>
          The customer and Professional are responsible for agreeing and
          performing their service arrangement, including the scope, total fee,
          deliverables and required permissions. The service engagement is
          treated as confirmed through the Platform only when the confirmation
          requirements in Section 4 have been met. The payment obligations to
          BookMyFotographer in Section 6 must be completed before that
          confirmation.
        </p>
        <p>
          BookMyFotographer does not set or guarantee the Professional&apos;s fee,
          service quality or deliverables. We are not the Professional&apos;s
          employer or partner. Our role in receiving, holding and releasing the
          specified booking advance and collecting Processing Fees is limited
          to the arrangements set out in Section 6.
        </p>
      </>
    ),
  },
  {
    title: "6. Payments, Processing Fees and Financial Arrangements",
    content: (
      <>
        <p>
          Before a booking is confirmed, the customer must pay
          BookMyFotographer an advance equal to 25% of the Professional&apos;s total
          agreed fee and a separate nominal, non-refundable Customer Processing
          Fee. After accepting the assignment and before confirmation, the
          Professional must pay a separate nominal, non-refundable Photographer
          Processing Fee. The remaining Professional fee, if any, is payable as
          agreed directly between the customer and Professional. The two
          Processing Fees compensate BookMyFotographer for administration,
          booking processing and coordination; they are not security deposits or
          cancellation penalties.
        </p>
        <p>
          BookMyFotographer will confirm the booking and share direct contact
          details only after the Professional has accepted the assignment and
          the 25% advance and both Processing Fees have been received.
          BookMyFotographer will hold the 25% advance until the Professional
          completes the event assignment. We will telephone the customer for
          confirmation. Once the customer confirms that the Professional
          attended and completed the assigned work, we will release the full
          advance directly to the Professional. If the Professional declines
          after the customer has paid but before confirmation, cancels a
          confirmed booking, or does not attend on the event day, the customer
          will receive a full refund of the 25% advance and Customer Processing
          Fee.
        </p>
        <p>
          If the customer cancels a confirmed booking after paying the advance,
          reasonable cancellation compensation may be deducted from the advance
          and paid to the Professional, with the remaining balance refunded to
          the customer. The indicative maximum compensation schedule is:
          <em>
            {" "}
            more than 30 days before the event, up to 10% of the advance; 15-30
            days before the event, up to 25% of the advance; 7-15 days before
            the event, up to 50% of the advance; 3-7 days before the event, up
            to 75% of the advance; and less than 3 days before the event, up to
            100% of the advance.
          </em>{" "}
          The percentage is applied to the advance payment made by the customer,
          not to the Professional&apos;s total fee. Compensation must be reasonable
          in the circumstances and may take account of the notice given,
          preparation or costs already incurred, the time reserved and the
          Professional&apos;s reasonable opportunity to obtain another assignment.
          BookMyFotographer may reduce or waive compensation where appropriate.
          Any remaining balance will be refunded to the customer. The Customer
          Processing Fee remains non-refundable where the booking-processing
          service has been provided, subject to applicable law.
        </p>
        <p>
          The applicable Customer Processing Fee and Photographer Processing
          Fee, payment methods and instructions will be communicated before
          payment is due. Both Processing Fees and the customer&apos;s 25% advance
          must be received before official booking confirmation. Users should
          retain payment acknowledgements. The Photographer Processing Fee is
          not a refundable security deposit or caution money. No automatic
          forfeiture of any fee applies.
        </p>
      </>
    ),
  },
  {
    title: "7. Cancellations and Last-Minute Unavailability",
    content: (
      <>
        <p>
          A customer or Professional who needs to cancel or change a booking
          must notify the other party and BookMyFotographer as soon as possible.
          Any revised date or material change must be accepted by both parties.
        </p>
        <p>
          If a Professional cancels, the customer may ask BookMyFotographer to
          help identify an alternative. We will make reasonable efforts to
          assist, but a replacement cannot be guaranteed.
        </p>
        <p>
          If a Professional cancels or does not attend for reasons attributable
          to the Professional, the customer will receive a full refund of the
          25% advance and the Customer Processing Fee. A genuine emergency,
          circumstances beyond the Professional&apos;s reasonable control, or a
          cancellation not attributable to the Professional&apos;s fault will be
          reviewed fairly before any platform action or further contractual
          consequence is considered. The Photographer Processing Fee is a
          separate fee for booking-processing work already undertaken.
        </p>
      </>
    ),
  },
  {
    title: "8. Availability Calendar and Booking Updates",
    content: (
      <>
        <p>
          The Platform automatically marks a Professional as unavailable for a
          date or time when a booking is recorded. Calendar information is
          provided as a convenience and may not always reflect real-time
          availability.
        </p>
        <p>
          Professionals must keep their availability information current. If a
          booking is cancelled or changed, both parties must notify
          BookMyFotographer by telephone so the calendar can be corrected where
          necessary.
        </p>
        <p>
          Users should obtain direct confirmation from the Professional before
          relying on a calendar entry. We are not responsible for conflicts
          caused by stale, incomplete or inaccurate availability information,
          except to the extent required by law.
        </p>
      </>
    ),
  },
  {
    title: "9. Feedback, Ratings and Reviews",
    content: (
      <>
        <p>
          After an assignment, customers and Professionals are encouraged to
          provide honest feedback. We may use relevant feedback to display,
          calculate or update ratings and to improve the Platform.
        </p>
        <p>
          Reviews must be truthful, relevant and based on genuine experience.
          Do not post threats, hate speech, personal data, confidential
          information, knowingly false allegations or content that infringes
          another person&apos;s rights.
        </p>
        <p>
          We may moderate, hide or remove content that appears unlawful,
          abusive, irrelevant, manipulated or inconsistent with our review
          standards. Ratings are user opinions and are not a guarantee of
          future performance.
        </p>
      </>
    ),
  },
  {
    title: "10. Complaints and Reporting Incidents",
    content: (
      <>
        <p>
          Users should promptly report misconduct, harassment, threats, fraud,
          safety concerns or material breaches. Contact
          bookmyfotographer@gmail.com or +91 9804060342 and provide relevant
          details where safe and appropriate.
        </p>
        <p>
          We may review a report, seek information from the parties, restrict an
          account or listing where appropriate, and facilitate communication.
          We cannot guarantee a particular outcome, adjudicate every private
          dispute, recover money, or replace the role of police, courts or other
          competent authorities.
        </p>
        <p>
          If anyone is in immediate danger or a crime may have occurred, contact
          the appropriate emergency service or law-enforcement authority first.
          Reporting an incident to us does not replace that step.
        </p>
      </>
    ),
  },
  {
    title: "11. Responsibilities of Professionals",
    content: (
      <>
        <ul>
          <li>
            Provide accurate profile, identity, portfolio, pricing and
            availability information.
          </li>
          <li>Communicate clearly and behave professionally with customers.</li>
          <li>
            Honour confirmed engagements or notify the customer promptly if
            unable to do so.
          </li>
          <li>
            Agree the scope, fees, deliverables and payment terms directly with
            the customer before work begins.
          </li>
          <li>
            Obtain permissions and consents required to photograph, record,
            publish or use images and videos.
          </li>
          <li>Respect customer privacy, property, safety and lawful instructions.</li>
          <li>
            Comply with applicable laws, tax obligations and professional
            requirements.
          </li>
        </ul>
        <p>
          Pay the Photographer Processing Fee for each confirmed assignment
          when due and promptly notify the customer and BookMyFotographer if
          unable to fulfil a confirmed booking.
        </p>
      </>
    ),
  },
  {
    title: "12. Responsibilities of Customers",
    content: (
      <ul>
        <li>Provide accurate event information, location, timings and requirements.</li>
        <li>
          Agree the scope, fees, deliverables and payment terms directly with
          the Professional.
        </li>
        <li>
          Provide safe and lawful access to the event location and any
          permissions within the customer&apos;s control.
        </li>
        <li>
          Pay the 25% advance and Customer Processing Fee to
          BookMyFotographer when due; pay any remaining Professional fee as
          agreed; and promptly communicate changes or cancellations.
        </li>
        <li>Treat Professionals respectfully and provide genuine, relevant feedback.</li>
      </ul>
    ),
  },
  {
    title: "13. Privacy and Personal Information",
    content: (
      <>
        <p>
          We handle personal information in accordance with our Privacy Policy.
          Information collected during registration or verification is used for
          purposes such as account administration, verification, communication,
          platform safety and legal compliance.
        </p>
        <p>
          We do not sell users&apos; personal information. Information may be shared
          with service providers who support our operations, with other users
          where necessary to facilitate a requested connection, or with
          authorities where required or permitted by law. Please review the
          Privacy Policy for details.
        </p>
      </>
    ),
  },
  {
    title: "14. Prohibited Use",
    content: (
      <>
        <ul>
          <li>Using the Platform for unlawful, fraudulent, deceptive or abusive purposes.</li>
          <li>
            Impersonating another person or submitting false identity,
            portfolio or qualification information.
          </li>
          <li>Harassing, threatening, discriminating against or exploiting another user.</li>
          <li>Uploading content without the necessary rights or permissions.</li>
          <li>
            Attempting to access accounts, systems or information without
            authorisation, or disrupting Platform security or operation.
          </li>
          <li>Manipulating reviews, ratings, bookings or profiles.</li>
        </ul>
        <p>
          Customers and Professionals must not deliberately circumvent
          BookMyFotographer in relation to an assignment introduced or confirmed
          through the Platform by falsely reporting it as cancelled, concealing
          that it will proceed, or privately arranging the same assignment to
          avoid applicable Processing Fees or booking obligations. If a
          confirmed assignment is moved off-platform by agreement, Processing
          Fees already earned for booking-processing work remain payable,
          subject to applicable law. We may contact both parties independently,
          request relevant information and review booking and payment records
          before updating a booking as cancelled. Any claim for additional
          compensation must be reasonable, supported by the circumstances and
          permitted by law.
        </p>
      </>
    ),
  },
  {
    title: "15. Intellectual Property and User Content",
    content: (
      <>
        <p>
          The Platform&apos;s name, logo, website design, text, graphics and other
          materials owned by BookMyFotographer are protected by applicable
          intellectual property laws. You may not copy or commercially use them
          without written permission.
        </p>
        <p>
          Users retain responsibility for content they upload and must have the
          rights and permissions needed to do so. By submitting content, you
          give us a limited, non-exclusive permission to host, display and use
          it as reasonably necessary to operate, maintain and promote the
          Platform, subject to our Privacy Policy and any permissions or
          settings we provide. This does not transfer ownership of the content
          to us.
        </p>
      </>
    ),
  },
  {
    title: "16. Platform Availability and Changes",
    content: (
      <p>
        We aim to keep the Platform available but do not promise uninterrupted
        or error-free operation. Access may be interrupted for maintenance,
        upgrades, security reasons, technical failures or events beyond our
        reasonable control. We may update, add, restrict or discontinue specific
        features based on certain situations. Where a change materially affects
        users, we will take reasonable steps to provide notice where
        practicable.
      </p>
    ),
  },
  {
    title: "17. Suspension and Termination",
    content: (
      <>
        <p>
          We may suspend, restrict or terminate an account or listing where we
          reasonably believe that a user has breached these Terms, provided
          false information, engaged in misconduct, created a safety or security
          risk, or where action is required by law.
        </p>
        <p>
          Users may request account closure by contacting us by email. Closure
          does not remove obligations or liabilities that arose before closure,
          and some information may need to be retained where required by law or
          for legitimate record-keeping.
        </p>
      </>
    ),
  },
  {
    title: "18. Disclaimer and Limitation of Liability",
    content: (
      <>
        <p>
          The Platform is provided as a discovery and connection facility. To
          the extent permitted by law, we do not warrant that a listing is
          complete or continuously current, that a Professional will accept or
          complete an engagement, or that a service will meet a customer&apos;s
          expectations.
        </p>
        <p>
          To the extent permitted by applicable law, BookMyFotographer is not
          liable for the acts or omissions of independent users or for losses
          arising from a direct service agreement or direct payment between
          users. Nothing in these Terms excludes or limits liability that cannot
          be excluded or limited by law, including applicable consumer rights
          or liability arising from our own breach of a non-excludable legal
          duty.
        </p>
      </>
    ),
  },
  {
    title: "19. Indemnity",
    content: (
      <p>
        To the extent permitted by law, you agree to be responsible for
        third-party claims and reasonable losses directly arising from your
        unlawful conduct, infringement of another person&apos;s rights, or material
        breach of these Terms. This clause does not require you to indemnify us
        for our own negligence, unlawful conduct or breach of a duty that
        cannot legally be transferred.
      </p>
    ),
  },
  {
    title: "20. Force Majeure",
    content: (
      <p>
        We are not responsible for delay or failure to operate the Platform
        caused by events beyond our reasonable control, such as natural
        disasters, severe weather, public emergencies, government restrictions,
        civil disturbance, widespread telecommunications failure or major
        infrastructure outages. This clause does not affect any non-excludable
        legal rights.
      </p>
    ),
  },
  {
    title: "21. Governing Law and Disputes",
    content: (
      <>
        <p>
          These Terms are governed by the laws of India. Disputes concerning use
          of the Platform may be brought before a competent court or authority
          having jurisdiction under applicable law. Nothing in this clause
          limits a consumer&apos;s statutory right to approach a competent consumer
          forum or other authority.
        </p>
        <p>
          Disputes under a direct service agreement should first be raised
          between the customer and Professional, without limiting either
          party&apos;s legal rights or remedies.
        </p>
      </>
    ),
  },
  {
    title: "22. Changes to These Terms",
    content: (
      <p>
        We may revise these Terms from time to time. The updated version will
        be published on the Platform with a revised date. Where required by
        law, we will obtain fresh consent or provide notice before material
        changes take effect.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className={styles.page}>
      <Navbar current="terms-and-conditions" />

      <div className={styles.hero}>
        <p className={styles.eyebrow}>LEGAL</p>
        <h1>Terms &amp; Conditions</h1>
        <p>Last updated: November 21, 2026</p>
      </div>

      <section className={styles.content}>
        <p className={styles.introduction}>
          <em>
            Rules governing access to and use of the BookMyFotographer
            marketplace.
          </em>
        </p>

        {termsSections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            {section.content}
          </article>
        ))}

        <article>
          <h2>23. Contact</h2>
          <p>For questions, complaints or notices relating to these Terms, contact:</p>
          <p>
            <strong>BookMyFotographer | West Bengal, India</strong>
          </p>
          <p>
            Website:{" "}
            <a href="https://bookmyfotographer.co.in" target="_blank" rel="noreferrer">
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
              BookMyFotographer — Connecting Customers. Empowering Creators.
            </strong>
          </p>
        </article>
      </section>

      <Footer />
    </main>
  );
}

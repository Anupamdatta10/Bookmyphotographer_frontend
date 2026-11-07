import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Terms & Conditions | BookMyFotographer",
  description: "Terms and conditions for using BookMyFotographer marketplace.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className={styles.page}>
      <Navbar current="terms-and-conditions" />

      <div className={styles.hero}>
        <p className={styles.eyebrow}>LEGAL</p>
        <h1>Terms &amp; Conditions</h1>
        <p>Last updated: November 1, 2026</p>
      </div>

      <section className={styles.content}>
        <p className={styles.introduction}>
          Welcome to BookMyFotographer. These Terms &amp; Conditions govern
          your access to and use of our marketplace. By accessing, registering
          for, or using the Platform, you agree to these terms.
        </p>

        <article>
          <h2>1. About the Platform and Our Role</h2>
          <p>
            BookMyFotographer ("we", "us", "our" or the "Platform") is an
            online marketplace intended to help individuals, families,
            businesses and organisations discover and connect with independent
            freelance photographers and videographers for any professional
            work.
          </p>
          <p>
            Our role is to provide a digital listing, discovery and connection
            facility. We do not ourselves undertake photography or videography
            assignments, employ listed professionals, or supervise how they
            perform their work. A service engagement is entered into directly
            between the customer and the selected photographer or videographer
            (each, a "Professional").
          </p>
          <p>
            The Platform is not a party to that direct service agreement. This
            description of our role does not exclude any legal duty that may
            apply to us under Indian law.
          </p>
        </article>

        <article>
          <h2>2. Acceptance and Eligibility</h2>
          <p>
            By accessing, registering for, or using the Platform, you agree to
            these Terms &amp; Conditions and any policies incorporated by
            reference. If you do not agree, do not use the Platform.
          </p>
          <p>
            You must be legally capable of entering into a binding agreement to
            create an account or make a booking. A parent or legal guardian
            must make arrangements on behalf of a minor where appropriate.
          </p>
        </article>

        <article>
          <h2>3. Account Registration and Verification</h2>
          <p>
            Users must provide accurate, current and complete information and
            keep it updated. Professionals must provide truthful information
            about their identity, experience, portfolio, service area and
            availability.
          </p>
          <p>
            We may request information or documents for verification, safety,
            fraud prevention or platform administration. Verification does not
            amount to a guarantee, certification or endorsement of a
            Professional's skill, conduct or service quality.
          </p>
          <p>
            You are responsible for safeguarding your login credentials and for
            activity carried out through your account. Notify us promptly if
            you suspect unauthorised access.
          </p>
        </article>

        <article>
          <h2>4. Listings, Discovery and Booking</h2>
          <p>
            The Platform may display profiles, portfolios, service descriptions,
            indicative rates, availability and ratings to help customers
            identify suitable Professionals. Information supplied by
            Professionals should be checked directly with them before a booking
            is finalised.
          </p>
          <p>
            Before confirming an engagement, the customer and Professional
            should agree directly on the event date, location, working hours,
            scope, deliverables, editing, delivery timelines, equipment, fees,
            taxes (if applicable), advance, balance payment and cancellation
            terms.
          </p>
          <p>
            A booking shown or requested through the Platform should not be
            treated as confirmed until the customer and Professional have
            mutually accepted the engagement and agreed its material terms. The
            parties should retain written confirmation of their agreement.
          </p>
        </article>

        <article>
          <h2>5. Direct Service Agreement</h2>
          <p>
            The customer and Professional are solely responsible for negotiating
            and performing their service agreement. They are responsible for
            complying with applicable laws, obtaining required permissions, and
            resolving their contractual obligations.
          </p>
          <p>
            BookMyFotographer does not set or guarantee the final service fee,
            scope, quality, deliverables or outcome of a direct engagement. We
            do not act as the Professional's employer, partner, agent or
            representative, or as the customer's agent, unless expressly stated
            otherwise in a separate written agreement.
          </p>
        </article>

        <article>
          <h2>6. Payments and Financial Arrangements</h2>
          <p>
            Unless we expressly introduce a separate payment facility through
            written terms, all advances, fees, balances, refunds,
            reimbursements and other payments are arranged and settled directly
            between the customer and the Professional.
          </p>
          <p>
            BookMyFotographer does not collect, hold, transfer, escrow, insure
            or guarantee those direct payments. We are not responsible for a
            party's failure to pay, a payment dispute, or a refund obligation
            arising under the direct agreement, subject always to rights and
            obligations that cannot lawfully be excluded.
          </p>
          <p>
            Users should agree payment milestones in writing and retain receipts
            or other proof of payment. Do not share passwords, OTPs or sensitive
            banking credentials with another user.
          </p>
        </article>

        <article>
          <h2>7. Cancellations and Last-Minute Unavailability</h2>
          <p>
            A customer or Professional who needs to cancel or change an
            engagement should notify the other party as soon as possible and
            communicate directly about any consequences under their agreement.
          </p>
          <p>
            If a Professional cancels at short notice, the customer may contact
            BookMyFotographer and request help locating an alternative. We will
            make reasonable efforts to identify an available replacement where
            practicable, but we do not guarantee that a replacement will be
            available or that an alternative can be arranged within the time
            available.
          </p>
          <p>
            Any cancellation fee, advance adjustment or refund is a matter for
            the customer and Professional to resolve under their direct
            agreement. We may help facilitate communication but shall not remain
            responsible anyhow for deciding or funding the settlement.
          </p>
        </article>

        <article>
          <h2>8. Availability Calendar and Booking Updates</h2>
          <p>
            The Platform automatically marks a Professional as unavailable for
            a date or time when a booking is recorded. Calendar information is
            provided as a convenience and may not always reflect real-time
            availability.
          </p>
          <p>
            Professionals are responsible for keeping their calendars accurate
            and are encouraged to update availability through their profiles.
            If a booking is cancelled or changed by either party, the parties
            must inform BookMyFotographer by direct phone calling so that we
            can manually correct the calendar where necessary.
          </p>
          <p>
            Users should obtain direct confirmation from the Professional
            before relying on a calendar entry. We are not responsible for
            conflicts caused by stale, incomplete or inaccurate availability
            information, except to the extent required by law.
          </p>
        </article>

        <article>
          <h2>9. Feedback, Ratings and Reviews</h2>
          <p>
            After an assignment, customers and Professionals are encouraged to
            provide honest feedback. We may use relevant feedback to display,
            calculate or update ratings and to improve the Platform.
          </p>
          <p>
            Reviews must be truthful, relevant and based on genuine experience.
            Do not post threats, hate speech, personal data, confidential
            information, knowingly false allegations or content that infringes
            another person's rights.
          </p>
          <p>
            We may moderate, hide or remove content that appears unlawful,
            abusive, irrelevant, manipulated or inconsistent with our review
            standards. Ratings are user opinions and are not a guarantee of
            future performance.
          </p>
        </article>

        <article>
          <h2>10. Complaints and Reporting Incidents</h2>
          <p>
            Users should promptly report serious or undesirable incidents,
            including alleged misconduct, harassment, threats, fraud, safety
            concerns, or material breaches of an engagement. Contact us at
            bookmyfotographer@gmail.com or +91 9804060342, providing relevant
            details and supporting information where safe and appropriate.
          </p>
          <p>
            We may review a report, seek information from the parties, restrict
            an account or listing where appropriate, and facilitate
            communication. We cannot guarantee a particular outcome, adjudicate
            every private dispute, recover money, or replace the role of
            police, courts or other competent authorities.
          </p>
          <p>
            If anyone is in immediate danger or a crime may have occurred,
            contact the appropriate emergency service or law-enforcement
            authority first. Reporting an incident to us does not replace that
            step.
          </p>
        </article>

        <article>
          <h2>11. Responsibilities of Professionals</h2>
          <ul>
            <li>Provide accurate profile, identity, portfolio, pricing and availability information.</li>
            <li>Communicate clearly and behave professionally with customers.</li>
            <li>Honour confirmed engagements or notify the customer promptly if unable to do so.</li>
            <li>Agree the scope, fees, deliverables and payment terms directly with the customer before work begins.</li>
            <li>Obtain permissions and consents required to photograph, record, publish or use images and videos.</li>
            <li>Respect customer privacy, property, safety and lawful instructions.</li>
            <li>Comply with applicable laws, tax obligations and professional requirements.</li>
          </ul>
        </article>

        <article>
          <h2>12. Responsibilities of Customers</h2>
          <ul>
            <li>Provide accurate event information, location, timings and requirements.</li>
            <li>Agree the scope, fees, deliverables and payment terms directly with the Professional.</li>
            <li>Provide safe and lawful access to the event location and any permissions within the customer's control.</li>
            <li>Make payments as agreed and communicate changes or cancellations promptly.</li>
            <li>Treat Professionals respectfully and provide genuine, relevant feedback.</li>
          </ul>
        </article>

        <article>
          <h2>13. Privacy and Personal Information</h2>
          <p>
            We handle personal information in accordance with our Privacy
            Policy. Information collected during registration or verification
            is used for purposes such as account administration, verification,
            communication, platform safety and legal compliance.
          </p>
          <p>
            We do not sell users' personal information. Information may be
            shared with service providers who support our operations, with
            other users where necessary to facilitate a requested connection,
            or with authorities where required or permitted by law. Please
            review the Privacy Policy for details.
          </p>
        </article>

        <article>
          <h2>14. Prohibited Use</h2>
          <ul>
            <li>Using the Platform for unlawful, fraudulent, deceptive or abusive purposes.</li>
            <li>Impersonating another person or submitting false identity, portfolio or qualification information.</li>
            <li>Harassing, threatening, discriminating against or exploiting another user.</li>
            <li>Uploading content without the necessary rights or permissions.</li>
            <li>Attempting to access accounts, systems or information without authorisation, or disrupting Platform security or operation.</li>
            <li>Manipulating reviews, ratings, bookings or profiles.</li>
          </ul>
        </article>

        <article>
          <h2>15. Intellectual Property and User Content</h2>
          <p>
            The Platform's name, logo, website design, text, graphics and other
            materials owned by BookMyFotographer are protected by applicable
            intellectual property laws. You may not copy or commercially use
            them without written permission.
          </p>
          <p>
            Users retain responsibility for content they upload and must have
            the rights and permissions needed to do so. By submitting content,
            you give us a limited, non-exclusive permission to host, display
            and use it as reasonably necessary to operate, maintain and promote
            the Platform, subject to our Privacy Policy and any permissions or
            settings we provide. This does not transfer ownership of the
            content to us.
          </p>
        </article>

        <article>
          <h2>16. Platform Availability and Changes</h2>
          <p>
            We aim to keep the Platform available but do not promise
            uninterrupted or error-free operation. Access may be interrupted for
            maintenance, upgrades, security reasons, technical failures or
            events beyond our reasonable control. We may update, add, restrict
            or discontinue specific features based on certain situations. Where
            a change materially affects users, we will take reasonable steps to
            provide notice where practicable.
          </p>
        </article>

        <article>
          <h2>17. Suspension and Termination</h2>
          <p>
            We may suspend, restrict or terminate an account or listing where
            we reasonably believe that a user has breached these Terms,
            provided false information, engaged in misconduct, created a safety
            or security risk, or where action is required by law.
          </p>
          <p>
            Users may request account closure by contacting us over email.
            Closure does not remove obligations or liabilities that arose
            before closure, and some information may need to be retained where
            required by law or for legitimate record-keeping.
          </p>
        </article>

        <article>
          <h2>18. Disclaimer and Limitation of Liability</h2>
          <p>
            The Platform is provided as a discovery and connection facility. To
            the extent permitted by law, we do not warrant that a listing is
            complete or continuously current, that a Professional will accept
            or complete an engagement, or that a service will meet a
            customer's expectations.
          </p>
          <p>
            To the extent permitted by applicable law, BookMyFotographer is not
            liable for the acts or omissions of independent users or for losses
            arising from a direct service agreement or direct payment between
            users. Nothing in these Terms excludes or limits liability that
            cannot be excluded or limited by law, including applicable consumer
            rights or liability arising from our own breach of a non-excludable
            legal duty.
          </p>
        </article>

        <article>
          <h2>19. Indemnity</h2>
          <p>
            To the extent permitted by law, you agree to be responsible for
            third-party claims and reasonable losses directly arising from your
            unlawful conduct, infringement of another person's rights, or
            material breach of these Terms. This clause does not require you to
            indemnify us for our own negligence, unlawful conduct or breach of
            a duty that cannot legally be transferred.
          </p>
        </article>

        <article>
          <h2>20. Force Majeure</h2>
          <p>
            We are not responsible for delay or failure to operate the Platform
            caused by events beyond our reasonable control, such as natural
            disasters, severe weather, public emergencies, government
            restrictions, civil disturbance, widespread telecommunications
            failure or major infrastructure outages. This clause does not
            affect any non-excludable legal rights.
          </p>
        </article>

        <article>
          <h2>21. Governing Law and Disputes</h2>
          <p>
            These Terms are governed by the laws of India. Disputes concerning
            use of the Platform may be brought before a competent court or
            authority having jurisdiction under applicable law. Nothing in this
            clause limits a consumer's statutory right to approach a competent
            consumer forum or other authority.
          </p>
          <p>
            Disputes under a direct service agreement should first be raised
            between the customer and Professional, without limiting either
            party's legal rights or remedies.
          </p>
        </article>

        <article>
          <h2>22. Changes to These Terms</h2>
          <p>
            We may revise these Terms from time to time. The updated version
            will be published on the Platform with a revised date. Where
            required by law, we will obtain fresh consent or provide notice
            before material changes take effect.
          </p>
        </article>

        <article>
          <h2>23. Contact</h2>
          <p>
            For questions, complaints or notices relating to these Terms,
            contact:
          </p>
          <p><strong>BookMyFotographer | West Bengal, India</strong></p>
          <p>Website: <a href="https://bookmyfotographer.co.in" target="_blank" rel="noreferrer">bookmyfotographer.co.in</a></p>
          <p>Email: <a href="mailto:bookmyfotographer@gmail.com">bookmyfotographer@gmail.com</a></p>
          <p>Phone: <a href="tel:+919804060342">+91 9804060342</a></p>
          <p>Grievance contact: Anit Dey, <a href="tel:+918334934147">+91 8334934147</a></p>
          <p><strong>BookMyFotographer — Connecting Customers. Empowering Creators.</strong></p>
        </article>

        {/* <Link className={styles.backLink} href="/signup">
          Back to Sign Up
        </Link> */}
      </section>

      <Footer />
    </main>
  );
}

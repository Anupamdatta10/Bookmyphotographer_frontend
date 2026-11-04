import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Privacy Policy | BookMyFotographer",
  description: "Privacy policy for BookMyFotographer marketplace.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <Navbar current="privacy-policy" />

      <div className={styles.hero}>
        <p className={styles.eyebrow}>LEGAL</p>
        <h1>Privacy Policy</h1>
        <p>
          How BookMyFotographer collects, uses, stores and protects personal
          information
        </p>
      </div>

      <section className={styles.content}>
        <p className={styles.introduction}>
          This Privacy Policy explains how BookMyFotographer (&quot;we&quot;,
          &quot;us&quot; or &quot;our&quot;) collects, uses, stores, shares and
          protects personal information when you visit our website, create an
          account, submit a profile, request a booking connection or contact
          us.
        </p>
        <p>
          BookMyFotographer is a marketplace intended to connect customers with
          independent freelance photographers and videographers. This Policy
          applies to information processed by us through our Platform and
          related communications. A Professional or customer may separately
          process information under their own privacy practices when they deal
          directly with one another.
        </p>

        <article>
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how BookMyFotographer (&quot;we&quot;,
            &quot;us&quot; or &quot;our&quot;) collects, uses, stores, shares
            and protects personal information when you visit our website, create
            an account, submit a profile, request a booking connection or
            contact us.
          </p>
          <p>
            BookMyFotographer is a marketplace intended to connect customers
            with independent freelance photographers and videographers. This
            Policy applies to information processed by us through our Platform
            and related communications. A Professional or customer may
            separately process information under their own privacy practices
            when they deal directly with one another.
          </p>
        </article>

        <article>
          <h2>2. Information We May Collect</h2>
          <p>
            Depending on how you use the Platform, we may collect the following
            categories of information:
          </p>
          <ul>
            <li>
              <strong>Account and contact details:</strong> name, email address,
              phone number, city, general location and login/account details.
            </li>
            <li>
              <strong>Verification information:</strong> information or
              documents you choose or are required to submit to help verify
              identity, eligibility or profile authenticity. Avoid collecting
              more information than is reasonably necessary.
            </li>
            <li>
              <strong>Professional profile information:</strong> portfolio
              images, biography, experience, services, service area, indicative
              rates, equipment or other professional details submitted by
              photographers and videographers.
            </li>
            <li>
              <strong>Booking and enquiry information:</strong> event type,
              date, time, location, requested services, messages and information
              needed to connect the parties.
            </li>
            <li>
              <strong>Feedback and support information:</strong> ratings,
              reviews, complaints, correspondence and supporting information you
              provide.
            </li>
            <li>
              <strong>Technical information:</strong> device, browser, IP
              address, access logs, approximate usage information, cookies and
              similar technologies, depending on the website configuration.
            </li>
          </ul>
        </article>

        <article>
          <h2>3. Why We Use Personal Information</h2>
          <p>
            We use personal information for specific and legitimate platform
            purposes, including:
          </p>
          <ul>
            <li>Creating and administering user accounts and profiles.</li>
            <li>
              Verifying user or Professional information and helping prevent
              fake, duplicate or fraudulent accounts.
            </li>
            <li>
              Helping customers discover and contact suitable Professionals and
              helping Professionals receive relevant enquiries.
            </li>
            <li>
              Managing booking requests, availability information, customer
              support and platform communications.
            </li>
            <li>
              Receiving and reviewing feedback, ratings, complaints and reports
              of misconduct.
            </li>
            <li>
              Maintaining platform security, troubleshooting, improving website
              performance and understanding usage.
            </li>
            <li>
              Complying with applicable legal requirements, responding to
              lawful requests and establishing or defending legal claims.
            </li>
            <li>
              Sending service-related notices and, where permitted and with any
              required consent, promotional communications.
            </li>
          </ul>
        </article>

        <article>
          <h2>4. Sharing and Disclosure</h2>
          <p>
            We do not sell personal information to third parties. We may share
            information only where reasonably necessary for the purposes
            described in this Policy, including:
          </p>
          <ul>
            <li>
              <strong>With another user:</strong> limited contact or
              booking-related information may be shared when needed to
              facilitate a connection or booking request. Please do not assume
              that information submitted to a public profile is confidential.
            </li>
            <li>
              <strong>With service providers:</strong> hosting, website
              maintenance, email, security, analytics, customer support or
              verification providers who assist us under appropriate
              confidentiality and security arrangements.
            </li>
            <li>
              <strong>With authorities or other parties:</strong> where
              required by law, court order, lawful government request, or where
              reasonably necessary to protect users, the Platform or legal
              rights.
            </li>
            <li>
              <strong>In a business change:</strong> in connection with a
              merger, restructuring, sale or transfer of the business, subject
              to appropriate safeguards and applicable law.
            </li>
          </ul>
        </article>

        <article>
          <h2>5. Direct Contact Between Customers and Professionals</h2>
          <p>
            BookMyFotographer connects users but does not manage the service
            contract between a customer and a Professional. Once connected, the
            parties may exchange contact details and other information directly
            to arrange the assignment.
          </p>
          <p>
            Information shared directly between users is no longer controlled
            solely by BookMyFotographer. Users should share only information
            needed for the engagement and should take care when sharing
            sensitive or confidential details.
          </p>
        </article>

        <article>
          <h2>6. Public Profiles, Portfolios and Reviews</h2>
          <p>
            Professional names, profile descriptions, service areas, portfolio
            materials, ratings and reviews may be visible to visitors if the
            relevant profile or feature is public. Do not upload personal,
            confidential or copyrighted material unless you have the necessary
            rights and intend it to be displayed.
          </p>
          <p>
            We may moderate content in accordance with our Terms &amp;
            Conditions. Please contact us if you believe personal information
            has been published in error or without appropriate permission.
          </p>
        </article>

        <article>
          <h2>7. Data Security</h2>
          <p>
            We take reasonable technical and organisational steps appropriate
            to the nature of the information we handle to protect personal
            information against unauthorised access, loss, misuse, alteration
            or disclosure.
          </p>
          <p>
            No website, internet transmission or electronic storage method can
            be guaranteed to be completely secure. Users should use strong
            passwords, keep login details confidential and notify us promptly
            if they suspect account compromise.
          </p>
        </article>

        <article>
          <h2>8. Data Retention</h2>
          <p>
            We retain personal information only for as long as reasonably
            necessary for the purposes for which it was collected, including
            account administration, verification, dispute handling, security,
            record-keeping and compliance with legal obligations.
          </p>
          <p>
            Retention periods may vary depending on the type of information,
            the user&rsquo;s relationship with us, whether a dispute is pending
            and
            applicable legal requirements. When information is no longer
            required, we will take reasonable steps to delete it or de-identify
            it, subject to lawful retention obligations.
          </p>
        </article>

        <article>
          <h2>9. Cookies and Similar Technologies</h2>
          <p>
            Our website may use cookies or similar technologies to support
            essential website functions, remember preferences, maintain
            sessions, improve security and understand website usage. The
            technologies used depend on the website configuration.
          </p>
          <p>
            You may be able to control cookies through your browser settings.
            Disabling certain cookies may affect website functionality. If we
            use non-essential analytics or advertising cookies that require
            consent, we will provide an appropriate choice mechanism.
          </p>
        </article>

        <article>
          <h2>10. Your Choices and Privacy Rights</h2>
          <p>
            Subject to applicable law, you may request access to, correction or
            updating of personal information associated with your account,
            request deletion where appropriate, withdraw consent where
            processing is based on consent, or raise a grievance about our
            handling of your information.
          </p>
          <p>
            Some information may need to be retained where required by law or
            for legitimate security, dispute-resolution or record-keeping
            purposes. We may need to verify your identity before acting on a
            request.
          </p>
          <p>
            To exercise a privacy right, contact us using the details in
            Section 14. We will handle requests in accordance with applicable
            Indian data protection law and prescribed timelines.
          </p>
        </article>

        <article>
          <h2>11. Children&rsquo;s Information</h2>
          <p>
            The Platform is not intended to encourage children to create
            accounts independently. If a user is under the age at which they
            can legally provide consent for the relevant processing, a parent
            or lawful guardian should contact us and provide any required
            consent. If we become aware that personal information has been
            collected in violation of applicable law, we will take appropriate
            steps.
          </p>
        </article>

        <article>
          <h2>12. Third-Party Websites and Services</h2>
          <p>
            The Platform may contain links to third-party websites, social
            media pages or services. We do not control those services and are
            not responsible for their privacy practices. Review the privacy
            policy of each third-party service before providing information to
            it.
          </p>
        </article>

        <article>
          <h2>13. Changes to This Privacy Policy</h2>
          <p>
            We may update this Policy to reflect changes in our services,
            technology, legal requirements or data practices. The updated
            version will be published on our website with a revised date. Where
            required, we will provide notice or obtain consent for material
            changes.
          </p>
        </article>

        <article>
          <h2>14. Contact and Privacy Grievances</h2>
          <p>
            For privacy questions, requests or complaints, contact:
          </p>
          <p>
            BookMyFotographer | West Bengal, India
          </p>
          <p>
            Website: <strong>bookmyfotographer.co.in</strong>
          </p>
          <p>Email: <strong>bookmyfotographer@gmail.com</strong></p>
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

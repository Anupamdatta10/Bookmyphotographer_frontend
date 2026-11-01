import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "Terms & Conditions | BookMyPhotografer",
  description: "Terms and conditions for using BookMyPhotografer.",
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
          Welcome to BookMyPhotografer. These Terms &amp; Conditions govern
          your use of our platform. By creating an account or using our
          services, you agree to follow these terms.
        </p>

        <article>
          <h2>1. Eligibility and Accounts</h2>
          <p>
            You must provide accurate registration information and keep your
            account details secure. You are responsible for all activity
            carried out through your account.
          </p>
        </article>

        <article>
          <h2>2. Photographer Services</h2>
          <p>
            Photographers must provide truthful profile and portfolio
            information, maintain professional standards, and honor confirmed
            bookings. Commission, payment, and service fees may apply as shown
            during a booking.
          </p>
        </article>

        <article>
          <h2>3. Bookings and Payments</h2>
          <p>
            Booking availability is confirmed only through the platform. Users
            must review the booking details, price, cancellation terms, and
            payment instructions before confirming. Applicable cancellation
            policies must be followed.
          </p>
        </article>

        <article>
          <h2>4. Cancellations and Refunds</h2>
          <p>
            Cancellation eligibility and refunds depend on the applicable
            booking policy and timing. Fees already paid may be non-refundable
            where stated in the booking confirmation.
          </p>
        </article>

        <article>
          <h2>5. User Conduct</h2>
          <p>
            Users must not misuse the platform, upload unlawful or misleading
            content, infringe intellectual property rights, harass others, or
            interfere with platform operations.
          </p>
        </article>

        <article>
          <h2>6. Content and Intellectual Property</h2>
          <p>
            Photographers retain ownership of their original portfolio work,
            subject to the rights granted for displaying it on the platform.
            You must have permission to upload and share every image or item of
            content you provide.
          </p>
        </article>

        <article>
          <h2>7. Privacy and Data</h2>
          <p>
            We process account and booking information as needed to operate the
            platform, provide support, prevent fraud, and meet legal obligations.
          </p>
        </article>

        <article>
          <h2>8. Liability</h2>
          <p>
            The platform is provided on an as-is basis. To the extent permitted
            by law, BookMyPhotografer is not liable for indirect losses arising
            from use of the platform or arrangements made between users and
            photographers.
          </p>
        </article>

        <article>
          <h2>9. Changes and Contact</h2>
          <p>
            We may update these terms when needed. Continued use of the platform
            after an update means you accept the revised terms. Questions may be
            sent to{" "}
            <a href="mailto:support@BookMyPhotografer.com">
              support@BookMyPhotografer.com
            </a>
            .
          </p>
        </article>

        <Link className={styles.backLink} href="/signup">
          Back to Sign Up
        </Link>
      </section>

      <Footer />
    </main>
  );
}

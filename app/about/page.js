import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "About Us | BookMyPhotographer",
  description: "Learn about BookMyPhotographer and how we connect people with professional photographers.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <Navbar current="about" />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>ABOUT US</p>
          <h1>Capture People.<br />Create Moments.</h1>
          <p className={styles.tagline}>
            BookMyPhotographer connects you with talented photographers
            who turn your special occasions into lasting memories.
          </p>
          <Link href="/signup" className={styles.ctaButton}>
            Join as a Photographer
          </Link>
        </div>
      </section>

      <section className={styles.mission}>
        <div className={styles.container}>
          <h2>Our Mission</h2>
          <p>
            We believe every moment deserves to be captured beautifully.
            Our platform makes it simple to find, compare, and book
            professional photographers for weddings, events, portraits,
            and commercial shoots—all in one place.
          </p>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.container}>
          <h2>What We Stand For</h2>
          <div className={styles.grid}>
            <article className={styles.card}>
              <div className={styles.icon}>🎯</div>
              <h3>Quality First</h3>
              <p>
                Every photographer is verified and reviewed so you can
                book with confidence.
              </p>
            </article>
            <article className={styles.card}>
              <div className={styles.icon}>🤝</div>
              <h3>Fair & Transparent</h3>
              <p>
                Clear pricing, honest policies, and no hidden fees for
                clients or photographers.
              </p>
            </article>
            <article className={styles.card}>
              <div className={styles.icon}>⚡</div>
              <h3>Effortless Booking</h3>
              <p>
                Search, compare, and confirm in minutes—no endless
                emails or phone calls.
              </p>
            </article>
            <article className={styles.card}>
              <div className={styles.icon}>📸</div>
              <h3>Empowering Creators</h3>
              <p>
                We give photographers the tools to showcase their work,
                manage bookings, and grow their business.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Photographers</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10,000+</span>
              <span className={styles.statLabel}>Moments Captured</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Cities Covered</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4.9/5</span>
              <span className={styles.statLabel}>Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Ready to Book or Join?</h2>
          <p>
            Whether you&apos;re looking for the perfect photographer or
            want to grow your photography business, we&apos;re here to help.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/signup" className={styles.ctaPrimary}>
              Get Started
            </Link>
            <Link href="/contact" className={styles.ctaSecondary}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
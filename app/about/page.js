import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export const metadata = {
  title: "About Us | BookMyPhotografer",
  description: "Learn about BookMyPhotografer and how we connect people with professional photographers and videographers.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <Navbar current="about" />

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>ABOUT US</p>
          <h1>Bringing People, Photographers & Moments Together.</h1>
          <p className={styles.tagline}>
            BookMyPhotografer is a new-age digital marketplace built to connect people
            and businesses with talented freelance photographers and videographers
            through a simple, convenient, and flexible booking platform.
          </p>
          <Link href="/signup" className={styles.ctaButton}>
            Join as a Photographer
          </Link>
        </div>
      </section>

      <section className={styles.mission}>
        <div className={styles.container}>
          <h2>Our Idea</h2>
          <p>
            Finding the right photographer or videographer for an occasion, event, or
            professional requirement can often be challenging. Whether it&apos;s a
            wedding, birthday, anniversary, corporate gathering, product shoot,
            promotional campaign, or a personal photoshoot, people need reliable
            creative professionals who understand their requirements and budget.
          </p>
          <p>
            On the other side, thousands of talented photographers and videographers
            work independently, often relying on personal contacts, references, and
            social media to find assignments. We envision bringing both sides together
            through one common digital platform.
          </p>
          <p>
            BookMyPhotografer aims to simplify this process by creating a marketplace
            where customers can discover freelance photography and videography
            professionals, explore their work, and hire them according to their
            specific requirements.
          </p>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.container}>
          <h2>What We Stand For</h2>
          <div className={styles.grid}>
            <article className={styles.card}>
              <div className={styles.icon}>📸</div>
              <h3>What We Do</h3>
              <p>
                Flexible, requirement-based booking for photography and
                videography services—from hourly engagements to full-day events.
              </p>
            </article>
            <article className={styles.card}>
              <div className={styles.icon}>🤝</div>
              <h3>Empowering Creators</h3>
              <p>
                A common space for independent photographers and videographers to
                showcase portfolios, reach customers, and grow independently.
              </p>
            </article>
            <article className={styles.card}>
              <div className={styles.icon}>🌍</div>
              <h3>Our Vision</h3>
              <p>
                A trusted marketplace from West Bengal, India, connecting customers
                and creative professionals everywhere.
              </p>
            </article>
            <article className={styles.card}>
              <div className={styles.icon}>✨</div>
              <h3>Our Commitment</h3>
              <p>
                Valuing creativity, flexibility, accessibility, and meaningful
                connections for every moment.
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
          <h2>Your Moments. Their Creativity. One Platform.</h2>
          <p>
            BookMyPhotografer is not just about booking a photographer. It&apos;s
            about creating opportunities for creators and making professional
            photography accessible to everyone.
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
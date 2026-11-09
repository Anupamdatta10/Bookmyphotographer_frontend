"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div>
        <Link href="/" className={styles.logo}>
          <Image
            className={styles.footerLogoImage}
            src={`${basePath}/main_logo.png`}
            alt="BookMyPhotografer logo"
            width={2182}
            height={240}
            unoptimized
          />
        </Link>
        <p>Connecting customers with independent creative photographers.</p>
        {/* <div className={styles.social}>
          <a href="https://facebook.com" aria-label="Facebook">
            <Image src={`${basePath}/facebook.svg`} alt="" width={17} height={17} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <Image src={`${basePath}/instagram.svg`} alt="" width={17} height={17} />
          </a>
          <a href="https://youtube.com" aria-label="YouTube">
            <Image src={`${basePath}/youtube.svg`} alt="" width={17} height={17} />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <Image src={`${basePath}/linkedin.svg`} alt="" width={17} height={17} />
          </a>
        </div> */}
      </div>
      <div>
        <h4>Quick Links</h4>
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/booking-cancellation-policy">Booking &amp; Cancellation Policy</Link>
      </div>
      <div>
        <h4>Contact</h4>
        <a className={styles.contactItem} href="https://bookmyfotographer.co.in" target="_blank" rel="noreferrer">
          <span aria-hidden="true">🌐</span>
          <span>bookmyfotographer.co.in</span>
        </a>
        <a className={styles.contactItem} href="mailto:bookmyfotographer@gmail.com">
          <span aria-hidden="true">✉</span>
          <span>bookmyfotographer@gmail.com</span>
        </a>
        <a className={styles.contactItem} href="tel:+919804060342">
          <span aria-hidden="true">☎</span>
          <span>+91 9804060342</span>
        </a>
        <a className={styles.contactItem} href="tel:+918334934147">
          <span aria-hidden="true">⚠</span>
          <span>Grievance: Anit Dey, +91 8334934147</span>
        </a>
        <a className={styles.contactItem}>
          <span aria-hidden="true">●</span>
          <span>BookMyFotographer | West Bengal, India</span>
        </a>
      </div>
      <small className={styles.copyright}>
        © {new Date().getFullYear()} BookMyPhotografer. All rights reserved.
      </small>
    </footer>
  );
}

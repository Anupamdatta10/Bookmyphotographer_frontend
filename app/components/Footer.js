"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "./Modal";
import styles from "../page.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const savedUserKey = "photoConnectUser";

export default function Footer() {
  const router = useRouter();
  const [showLoginRequired, setShowLoginRequired] = useState(false);

  function handleUpdateProfile() {
    try {
      const savedUser = JSON.parse(
        window.localStorage.getItem(savedUserKey) || "null",
      );

      if (
        savedUser?.userId &&
        savedUser.expiresAt &&
        savedUser.expiresAt > Date.now()
      ) {
        router.push("/profile");
        return;
      }

      window.localStorage.removeItem(savedUserKey);
    } catch {
      window.localStorage.removeItem(savedUserKey);
    }

    setShowLoginRequired(true);
  }

  return (
    <footer id="footer" className={styles.footer}>
      <div>
        <Link href="/" className={styles.logo}>
          <Image
            src={`${basePath}/BookMyPhotografer-logo.svg`}
            alt="BookMyPhotografer logo"
            width="31"
            height="24"
          />
          <span>
            <b>BookMyPhotografer</b>
            <small>Capture People. Create Moments.</small>
          </span>
        </Link>
        <p>Connecting great photographers with amazing opportunities.</p>
        <div className={styles.social}>
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
        </div>
      </div>
      <div>
        <h4>Quick Links</h4>
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
      </div>
      <div>
        <h4>For Photographers</h4>
        <Link href="/signup">Sign Up</Link>
        <Link href="/signin">Sign In</Link>
        <button
          className={styles.footerLinkButton}
          type="button"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
      </div>
      <div>
        <h4>Contact</h4>
        <a className={styles.contactItem} href="mailto:support@BookMyPhotografer.com">
          <span aria-hidden="true">✉</span>
          <span>support@BookMyPhotografer.com</span>
        </a>
        <a className={styles.contactItem} href="tel:+919876543210">
          <span aria-hidden="true">☎</span>
          <span>+91 98765 43210</span>
        </a>
        <a
          className={styles.contactItem}
          href="https://www.google.com/maps/search/?api=1&query=Bengaluru%2C%20Karnataka%2C%20India"
          target="_blank"
          rel="noreferrer"
        >
          <span aria-hidden="true">●</span>
          <span>Bengaluru, India</span>
        </a>
      </div>
      <small className={styles.copyright}>
        © {new Date().getFullYear()} BookMyPhotografer. All rights reserved.
      </small>

      <Modal
        isOpen={showLoginRequired}
        onClose={() => setShowLoginRequired(false)}
        title="Login Required"
        confirmText="Sign In"
        onConfirm={() => router.push("/signin")}
        cancelText="Cancel"
      >
        <p>Please log in to update your profile.</p>
      </Modal>
    </footer>
  );
}

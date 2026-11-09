"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submitForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setSent(false);
    setError("");

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      setError(
        "The contact form is temporarily unavailable. Please try again later.",
      );
      setSending(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const submission = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(
        `${backendUrl.replace(/\/+$/, "")}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submission),
        },
      );
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          typeof result?.message === "string"
            ? result.message
            : "We could not send your message. Please try again.",
        );
      }

      form.reset();
      setSent(true);
    } catch (submitError) {
      console.error("Contact form submission failed:", submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not send your message. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className={styles.page}>
      <Navbar current="contact" />

      <section className={styles.contactWrap}>
        <div className={styles.intro}>
          <p>LET&apos;S TALK</p>
          <h1>Contact Us</h1>
          <span>
            We&apos;d love to hear from you. Get in touch with us for any
            queries or support.
          </span>
        </div>
        <div className={styles.contactCard}>
          <form onSubmit={submitForm}>
            <label>
              Name
              <input
                required
                name="name"
                maxLength={100}
                placeholder="Enter your name"
              />
            </label>
            <label>
              Email
              <input
                required
                name="email"
                type="email"
                maxLength={254}
                placeholder="Enter your email"
              />
            </label>
            <label>
              Subject
              <input
                required
                name="subject"
                maxLength={150}
                placeholder="Enter subject"
              />
            </label>
            <label>
              Message
              <textarea
                required
                name="message"
                maxLength={5000}
                placeholder="Your message"
                rows="5"
              />
            </label>
            {sent && (
              <p className={styles.formSuccess} role="status">
                Your message has been sent successfully.
              </p>
            )}
            {error && (
              <p className={styles.formError} role="alert">
                {error}
              </p>
            )}
            <button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
          <aside>
            <a
              className={styles.contactDetail}
              href="https://bookmyfotographer.co.in"
              target="_blank"
              rel="noreferrer"
            >
              <i>🌐</i>
              <div>
                <b>Website</b>
                <p>bookmyfotographer.co.in</p>
              </div>
            </a>
            <a
              className={styles.contactDetail}
              href="mailto:bookmyfotographer@gmail.com"
            >
              <i>✉</i>
              <div>
                <b>Email</b>
                <p>bookmyfotographer@gmail.com</p>
              </div>
            </a>
            <a className={styles.contactDetail} href="tel:+919804060342">
              <i>☎</i>
              <div>
                <b>Phone</b>
                <p>+91 9804060342</p>
              </div>
            </a>
            <a className={styles.contactDetail} href="tel:+918334934147">
              <i>⚠</i>
              <div>
                <b>Grievance Contact</b>
                <p>Anit Dey, +91 8334934147</p>
              </div>
            </a>
            <a className={styles.contactDetail}>
              <i>●</i>
              <div>
                <b>Address</b>
                <p>BookMyFotographer | West Bengal, India</p>
              </div>
            </a>
            {/* <section className={styles.follow}>
              <b>Follow Us</b>
              <div>
                <a href="https://facebook.com" aria-label="Facebook">
                  <Image src={`${basePath}/facebook.svg`} alt="" width={18} height={18} />
                </a>
                <a href="https://instagram.com" aria-label="Instagram">
                  <Image src={`${basePath}/instagram.svg`} alt="" width={18} height={18} />
                </a>
                <a href="https://linkedin.com" aria-label="LinkedIn">
                  <Image src={`${basePath}/linkedin.svg`} alt="" width={18} height={18} />
                </a>
                <a href="https://youtube.com" aria-label="YouTube">
                  <Image src={`${basePath}/youtube.svg`} alt="" width={18} height={18} />
                </a>
              </div>
            </section> */}
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}

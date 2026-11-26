"use client";

import { usePathname } from "next/navigation";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return null;
  }

  return (
    <a
      className={styles.button}
      href="https://wa.me/919804060342"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" className={styles.icon}>
        <path
          fill="currentColor"
          d="M16.02 3.2A12.7 12.7 0 0 0 5.1 22.38L3.4 28.6l6.37-1.67A12.7 12.7 0 1 0 16.02 3.2Zm0 23.1c-1.9 0-3.76-.5-5.4-1.45l-.39-.23-3.78.99 1.01-3.68-.25-.4a10.35 10.35 0 1 1 8.81 4.77Zm5.68-7.76c-.31-.16-1.84-.91-2.13-1.01-.29-.11-.5-.16-.71.16-.21.31-.81 1.01-.99 1.22-.18.21-.36.23-.67.08-.31-.16-1.31-.49-2.5-1.55-.92-.82-1.55-1.83-1.73-2.14-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.71-1.71-.97-2.34-.25-.61-.51-.53-.71-.54h-.6c-.21 0-.54.08-.83.39-.29.31-1.09 1.06-1.09 2.6 0 1.53 1.12 3.02 1.27 3.23.16.21 2.2 3.36 5.33 4.71.75.32 1.33.51 1.79.65.75.24 1.43.21 1.97.13.6-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.36Z"
        />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}

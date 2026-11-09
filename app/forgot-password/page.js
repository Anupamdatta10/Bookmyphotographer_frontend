"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../auth.module.css";
import Navbar from "../components/Navbar";

const steps = ["email", "otp", "password"];

function getApiErrorMessage(result, status, fallback) {
  const message = result?.message;
  if (Array.isArray(message)) {
    const messages = message.filter((item) => typeof item === "string").join(" ");
    if (messages) return messages;
  }
  if (typeof message === "string" && message.trim()) {
    return message;
  }

  if (status === 400) return "Please check the information and try again.";
  if (status === 404) return "No account was found with this email address.";
  if (status === 429) return "Too many attempts. Please wait a moment and try again.";
  if (status >= 500) return "The service is temporarily unavailable. Please try again later.";
  return fallback;
}

async function postJson(path, payload, fallback) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("Password reset is temporarily unavailable. Please try again later.");
  }

  let response;
  try {
    response = await fetch(`${backendUrl.replace(/\/+$/, "")}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Unable to connect to the server. Check your connection and try again.");
  }

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(getApiErrorMessage(result, response.status, fallback));
  }
  return result;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function requestCode(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await postJson(
        "/api/users/forgot-password",
        { email: email.trim() },
        "Unable to send a reset code. Please try again.",
      );
      setStep("otp");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to send a reset code. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await postJson(
        "/api/users/verify-password-reset-otp",
        { email: email.trim(), otp },
        "Invalid or expired reset code. Please check the code and try again.",
      );
      setStep("password");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to verify the code. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function resetPassword(event) {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please enter the same password in both fields.");
      return;
    }

    setBusy(true);
    try {
      await postJson(
        "/api/users/reset-password",
        { email: email.trim(), otp, password },
        "Unable to reset your password. Please try again.",
      );
      router.push("/signin?passwordReset=success");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to reset your password. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }

  const stepIndex = steps.indexOf(step);
  const titles = {
    email: "Reset your password",
    otp: "Check your inbox",
    password: "Create a new password",
  };
  const descriptions = {
    email: "Enter the email address linked to your account and we’ll send you a reset code.",
    otp: "Enter the 6-digit code we sent to your email address.",
    password: "Choose a new password to secure your account.",
  };

  return (
    <main className={styles.page}>
      <Navbar current="signin" />
      <section className={styles.content}>
        <div className={styles.resetLayout}>
          <aside className={styles.resetIntro}>
            <span className={styles.resetEyebrow}>ACCOUNT RECOVERY</span>
            <div className={styles.resetIllustration} aria-hidden="true">
              <svg viewBox="0 0 64 64" fill="none">
                <path d="M32 7 51 15v14c0 13-8 22-19 28C21 51 13 42 13 29V15l19-8Z" />
                <path d="M24 31l5 5 11-12" />
              </svg>
            </div>
            <h1>A fresh start is just a few steps away.</h1>
            <p>
              We’ll help you securely get back into your BookMyFotographer
              account.
            </p>
            <div className={styles.resetTrust}>
              <span aria-hidden="true">✓</span>
              Your account stays protected throughout the process
            </div>
          </aside>

          <div className={styles.resetCard}>
            <div className={styles.resetProgress} aria-label={`Step ${stepIndex + 1} of 3`}>
              {steps.map((item, index) => (
                <div
                  className={`${styles.resetProgressStep} ${index <= stepIndex ? styles.resetProgressActive : ""}`}
                  key={item}
                >
                  <span>{index < stepIndex ? "✓" : index + 1}</span>
                  <small>
                    {item === "email" ? "Email" : item === "otp" ? "Verify" : "New password"}
                  </small>
                </div>
              ))}
            </div>

            <div className={styles.resetHeading}>
              <span className={styles.resetIcon} aria-hidden="true">
                {step === "email" ? "✉" : step === "otp" ? "✳" : "⌑"}
              </span>
              <h2>{titles[step]}</h2>
              <p>{descriptions[step]}</p>
              {step === "otp" && (
                <p className={styles.resetEmail}>{email.trim()}</p>
              )}
            </div>

            {error && (
              <p className={styles.formError} role="alert" aria-live="assertive">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" />
                  <path d="M10 6v4m0 3h.01" />
                </svg>
                <span>{error}</span>
              </p>
            )}

            {step === "email" && (
              <form className={styles.form} onSubmit={requestCode}>
                <label className={styles.field} htmlFor="reset-email">
                  Email address
                  <input
                    autoComplete="email"
                    id="reset-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    placeholder="you@example.com"
                  />
                </label>
                <button className={styles.submit} type="submit" disabled={busy || !email.trim()}>
                  {busy ? "Sending code..." : "Send reset code"}
                  {!busy && <span aria-hidden="true">→</span>}
                </button>
              </form>
            )}

            {step === "otp" && (
              <form className={styles.form} onSubmit={verifyCode}>
                <label className={styles.field} htmlFor="reset-otp">
                  6-digit verification code
                  <input
                    autoComplete="one-time-code"
                    id="reset-otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(event) => {
                      setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
                      setError("");
                    }}
                    placeholder="Enter your code"
                  />
                </label>
                <button className={styles.submit} type="submit" disabled={busy || otp.length !== 6}>
                  {busy ? "Verifying..." : "Verify code"}
                  {!busy && <span aria-hidden="true">→</span>}
                </button>
                <button
                  className={styles.resetTextButton}
                  type="button"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                    setError("");
                  }}
                  disabled={busy}
                >
                  Change email address
                </button>
              </form>
            )}

            {step === "password" && (
              <form className={styles.form} onSubmit={resetPassword}>
                <label className={styles.field} htmlFor="new-password">
                  New password
                  <input
                    autoComplete="new-password"
                    id="new-password"
                    name="password"
                    type="password"
                    minLength={8}
                    maxLength={50}
                    required
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="At least 8 characters"
                  />
                </label>
                <label className={styles.field} htmlFor="confirm-password">
                  Confirm new password
                  <input
                    autoComplete="new-password"
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    minLength={8}
                    maxLength={50}
                    required
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password again"
                  />
                </label>
                <button className={styles.submit} type="submit" disabled={busy}>
                  {busy ? "Updating password..." : "Update password"}
                  {!busy && <span aria-hidden="true">→</span>}
                </button>
              </form>
            )}

            <p className={styles.switch}>
              Remembered your password? <Link href="/signin">Back to sign in</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

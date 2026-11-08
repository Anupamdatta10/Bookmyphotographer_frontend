"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../auth.module.css";
import Navbar from "../components/Navbar";

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.message || "Unable to request a reset code.");
      setStep("otp");
    } catch (requestError) {
      setError(requestError.message || "Unable to connect to the server.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verify-password-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.message || "Invalid or expired reset code.");
      setStep("password");
    } catch (requestError) {
      setError(requestError.message || "Unable to connect to the server.");
    } finally {
      setBusy(false);
    }
  }

  async function resetPassword(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.message || "Unable to reset your password.");
      router.push("/signin?passwordReset=success");
    } catch (requestError) {
      setError(requestError.message || "Unable to connect to the server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className={styles.page}>
      <Navbar current="signin" />
      <section className={styles.content}>
        <div className={styles.card}>
          <div className={styles.heading}>
            <h1>{step === "email" ? "Forgot Password" : step === "otp" ? "Verify Reset Code" : "Create New Password"}</h1>
            <p>{step === "email" ? "Enter your account email" : step === "otp" ? `Enter the code sent to ${email}` : "Choose a strong new password"}</p>
          </div>
          {error && <p className={styles.formError}>{error}</p>}
          {step === "email" && (
            <form className={styles.form} onSubmit={requestCode}>
              <label className={styles.field}>Email Address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
              <button className={styles.submit} type="submit" disabled={busy}>{busy ? "Sending..." : "Send Reset Code"}</button>
            </form>
          )}
          {step === "otp" && (
            <form className={styles.form} onSubmit={verifyCode}>
              <label className={styles.field}>6-digit code<input required inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} /></label>
              <button className={styles.submit} type="submit" disabled={busy}>{busy ? "Verifying..." : "Verify Code"}</button>
            </form>
          )}
          {step === "password" && (
            <form className={styles.form} onSubmit={resetPassword}>
              <label className={styles.field}>New Password<input required type="password" minLength={8} maxLength={50} value={password} onChange={(event) => setPassword(event.target.value)} /></label>
              <label className={styles.field}>Confirm Password<input required type="password" minLength={8} maxLength={50} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} /></label>
              <button className={styles.submit} type="submit" disabled={busy}>{busy ? "Resetting..." : "Reset Password"}</button>
            </form>
          )}
          <p className={styles.switch}><Link href="/signin">Back to Sign In</Link></p>
        </div>
      </section>
    </main>
  );
}

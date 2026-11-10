"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const sensitiveFieldPattern = /password|token|secret|otp|credential/i;

function getAccessToken() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("photoConnectUser") || "{}");
    return saved.accessToken || null;
  } catch {
    return null;
  }
}

function formatLabel(key) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatValue(value) {
  if (value === null || value === undefined || value === "") {
    return "Not available";
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) {
    return value.length ? value.map(formatValue).join(", ") : "Not available";
  }
  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => !sensitiveFieldPattern.test(key))
      .map(([key, nestedValue]) => `${formatLabel(key)}: ${formatValue(nestedValue)}`)
      .join(", ") || "Not available";
  }
  return String(value);
}

function formatDate(value) {
  if (!value) return "Not available";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? formatValue(value)
    : date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export default function ClientDetails() {
  const params = useParams();
  const router = useRouter();
  const clientId = params?.id;
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!clientId) return;
    let isCurrent = true;

    async function loadClient() {
      const token = getAccessToken();
      if (!token) {
        router.replace("/admin/security");
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_URL}/api/users/${encodeURIComponent(clientId)}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const result = await response.json().catch(() => null);
        if (response.status === 401 || response.status === 403) {
          router.replace("/admin/security");
          return;
        }
        if (!response.ok) {
          throw new Error(result?.message || "Could not load client details.");
        }

        const user = result?.data ?? result;
        if (user?.type !== "PARTNER") {
          throw new Error("Client not found.");
        }
        if (isCurrent) setClient(user);
      } catch (loadError) {
        if (isCurrent) {
          setError(loadError.message || "Could not load client details.");
        }
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadClient();
    return () => {
      isCurrent = false;
    };
  }, [clientId, router]);

  const details = useMemo(() => {
    if (!client) return [];
    return Object.entries(client)
      .filter(
        ([key, value]) =>
          key !== "__v" &&
          !sensitiveFieldPattern.test(key),
      )
      .map(([key, value]) => [
        formatLabel(key),
        key === "createdAt" || key === "updatedAt"
          ? formatDate(value)
          : formatValue(value),
      ]);
  }, [client]);

  if (isLoading) {
    return <div className={styles.state}>Loading client details...</div>;
  }

  if (error) {
    return (
      <div className={styles.state} role="alert">
        <p>{error}</p>
        <Link className={styles.backButton} href="/admin/clients">
          Return to clients
        </Link>
      </div>
    );
  }

  if (!client) {
    return <div className={styles.state}>Client not found.</div>;
  }

  const clientName = client.name || "Unnamed client";
  const initials = clientName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "C";

  return (
    <div className={styles.page}>
      <Link className={styles.backButton} href="/admin/clients">
        <span aria-hidden="true">←</span> Back to clients
      </Link>

      <section className={styles.hero}>
        <div className={styles.avatar} aria-hidden="true">{initials}</div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>CLIENT PROFILE</p>
          <h1>{clientName}</h1>
          <p>{client.email || "Email not provided"}</p>
        </div>
        <span className={styles.accountType}>Client</span>
      </section>

      <section className={styles.card}>
        <h2>Complete details</h2>
        <div className={styles.detailGrid}>
          {details.map(([label, value]) => (
            <div className={styles.detailItem} key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

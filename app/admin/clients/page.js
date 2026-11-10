"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import adminStyles from "../page.module.css";
import InfiniteScrollTrigger from "../../components/InfiniteScrollTrigger";
import styles from "./page.module.css";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const savedUserKey = "photoConnectUser";
const PAGE_SIZE = 10;

function formatDate(value) {
  if (!value) return "Not available";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Not available" : date.toLocaleDateString();
}

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [loadMoreError, setLoadMoreError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    let isCurrent = true;
    const controller = new AbortController();
    let token;

    try {
      const user = JSON.parse(window.localStorage.getItem(savedUserKey) || "null");
      if (
        !user?.userId ||
        user.expiresAt <= Date.now() ||
        !["ADMIN", "SUPERADMIN"].includes(user.type) ||
        !user.accessToken
      ) {
        router.replace("/admin/security");
        return () => {
          isCurrent = false;
        };
      }
      token = user.accessToken;
    } catch {
      router.replace("/admin/security");
      return () => {
        isCurrent = false;
      };
    }

    fetch(
      `${BACKEND_URL}/api/users?type=PARTNER&page=1&limit=${PAGE_SIZE}&sortBy=createdAt&sortOrder=desc&search=${encodeURIComponent(searchTerm.trim())}`,
      { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal },
    )
      .then(async (response) => {
        if (response.status === 401) {
          router.replace("/admin/security");
        }
        const result = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(result?.message || "Could not load client accounts.");
        }
        return result;
      })
      .then((result) => {
        if (isCurrent) {
          const records = (Array.isArray(result?.data) ? result.data : [])
              .filter((user) => user.type === "PARTNER")
              .map((user) => ({
                ...user,
                id: String(user._id || user.id),
              }));
          setClients(records);
          setPage(1);
          setHasMore(Number(result?.total) > records.length);
        }
      })
      .catch((error) => {
        if (isCurrent && error.name !== "AbortError") {
          setLoadError(error.message || "Could not load client accounts.");
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [router, searchTerm]);

  const loadMoreClients = useCallback(async () => {
    if (!hasMore || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    setIsLoadingMore(true);
    setLoadMoreError("");
    try {
      const savedUser = JSON.parse(window.localStorage.getItem(savedUserKey) || "null");
      const token = savedUser?.accessToken;
      if (!token) {
        router.replace("/admin/security");
        return;
      }
      const nextPage = page + 1;
      const response = await fetch(
        `${BACKEND_URL}/api/users?type=PARTNER&page=${nextPage}&limit=${PAGE_SIZE}&sortBy=createdAt&sortOrder=desc&search=${encodeURIComponent(searchTerm.trim())}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.status === 401) {
        router.replace("/admin/security");
        throw new Error("Your admin session has expired.");
      }
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.message || "Could not load more clients.");
      }
      const records = (Array.isArray(result?.data) ? result.data : [])
        .filter((user) => user.type === "PARTNER")
        .map((user) => ({ ...user, id: String(user._id || user.id) }));
      setClients((current) => [...current, ...records]);
      setPage(nextPage);
      setHasMore(nextPage * PAGE_SIZE < Number(result?.total ?? nextPage * PAGE_SIZE + records.length));
    } catch (error) {
      setLoadMoreError(error.message || "Could not load more clients.");
    } finally {
      loadingMoreRef.current = false;
      setIsLoadingMore(false);
    }
  }, [hasMore, page, router, searchTerm]);

  return (
    <div>
      <div className={adminStyles.pageIntro}>
        <div>
          <p className={adminStyles.eyebrow}>WORKSPACE / CLIENTS</p>
          <h1>Clients</h1>
          <p>Accounts registered to book a photographer.</p>
        </div>
      </div>

      <section className={styles.directory} aria-label="Client accounts">
        <header className={styles.directoryHeader}>
          <div>
            <h2>Client accounts</h2>
            <p>{clients.length} accounts shown</p>
          </div>
          <label className={styles.search}>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={searchTerm}
              placeholder="Search clients"
              aria-label="Search client accounts"
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setIsLoading(true);
                setLoadError("");
                setLoadMoreError("");
                setClients([]);
                setPage(1);
                setHasMore(false);
              }}
            />
          </label>
        </header>

        {loadError && (
          <p className={styles.error} role="alert">
            {loadError}
          </p>
        )}

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Client</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Location</th>
                <th scope="col">Joined</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td className={styles.empty} colSpan={5}>
                    Loading client accounts...
                  </td>
                </tr>
              )}
              {!isLoading &&
                !loadError &&
                clients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <Link
                        className={styles.clientLink}
                        href={`/admin/clients/${encodeURIComponent(client.id)}`}
                      >
                        {client.name || "Unnamed client"}
                      </Link>
                    </td>
                    <td>{client.email || "Not provided"}</td>
                    <td>{client.phone || "Not provided"}</td>
                    <td>
                      {[client.city, client.state, client.country]
                        .filter(Boolean)
                        .join(", ") || "Not provided"}
                    </td>
                    <td>{formatDate(client.createdAt)}</td>
                  </tr>
                ))}
              {!isLoading && !loadError && clients.length === 0 && (
                <tr>
                  <td className={styles.empty} colSpan={5}>
                    {searchTerm.trim()
                      ? "No clients match your search."
                      : "No client accounts found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <InfiniteScrollTrigger
          hasMore={hasMore}
          isLoading={isLoadingMore}
          onLoadMore={loadMoreClients}
          error={loadMoreError}
          onRetry={loadMoreClients}
          loadingLabel="Loading more clients..."
        />
      </section>
    </div>
  );
}

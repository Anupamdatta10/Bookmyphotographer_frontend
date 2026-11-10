"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import InfiniteScrollTrigger from "../components/InfiniteScrollTrigger";
import styles from "./page.module.css";

const PAGE_SIZE = 10;

const statusLabels = {
  pending: "Pending",
  active: "Approved",
  inactive: "Deactivated",
};
const fallbackProfileImage = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/defolt_profile_pic.jpg`;

function getProfileImageUrl(path) {
  if (!path) return fallbackProfileImage;
  if (/^https?:\/\//i.test(path)) return path;
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
}

function mapPhotographer(user) {
  const name = user.name || "Unnamed photographer";
  const status = statusLabels[user.status] || "Pending";
  const joinedDate = user.createdAt ? new Date(user.createdAt) : null;

  return {
    id: String(user._id),
    name,
    email: user.email || "",
    location:
      [user.city, user.state, user.country].filter(Boolean).join(", ") ||
      "Location not provided",
    joined:
      joinedDate && !Number.isNaN(joinedDate.getTime())
        ? joinedDate.toLocaleDateString()
        : "Not available",
    status,
    initials: name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join(""),
    profileImageUrl: getProfileImageUrl(user.profileImageUrl),
  };
}

function getAccessToken() {
  try {
    const saved = window.localStorage.getItem("photoConnectUser");
    if (!saved) return null;
    const user = JSON.parse(saved);
    return user.accessToken || null;
  } catch {
    return null;
  }
}

function handleUnauthorized(router) {
  router.replace("/admin/security");
}

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Pending");
  const [photographers, setPhotographers] = useState([]);
  const [photographersPage, setPhotographersPage] = useState(1);
  const [photographersTotal, setPhotographersTotal] = useState(0);
  const [hasMorePhotographers, setHasMorePhotographers] = useState(false);
  const [isLoadingPhotographers, setIsLoadingPhotographers] = useState(true);
  const [isLoadingMorePhotographers, setIsLoadingMorePhotographers] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState("");
  const [photographersError, setPhotographersError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [savingPhotographerId, setSavingPhotographerId] = useState("");
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    let isCurrent = true;
    const controller = new AbortController();
    const token = getAccessToken();
    if (!token) {
      router.replace("/admin/security");
      return () => {
        isCurrent = false;
      };
    }
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?type=PHOTOGRAPHER&page=1&limit=${PAGE_SIZE}&sortBy=createdAt&sortOrder=desc&search=${encodeURIComponent(searchTerm.trim())}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      },
    )
      .then(async (response) => {
        if (response.status === 401) {
          handleUnauthorized(router);
          return null;
        }
        const result = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(
            result?.message || "Could not load photographer records.",
          );
        }
        return result;
      })
      .then((result) => {
        if (!result) return;
        if (isCurrent) {
          const users = Array.isArray(result?.data) ? result.data : [];
          setPhotographers(users.map(mapPhotographer));
          setPhotographersTotal(Number(result?.total) || 0);
          setHasMorePhotographers(Number(result?.total) > users.length);
        }
      })
      .catch((error) => {
        if (isCurrent && error.name !== "AbortError") {
          setPhotographersError(
            error.message || "Could not load photographer records.",
          );
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoadingPhotographers(false);
      });

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [router, searchTerm]);

  const filteredPhotographers = photographers.filter((photographer) => {
    const matchesTab = photographer.status === activeTab;
    const searchValue = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !searchValue ||
      [photographer.name, photographer.email, photographer.location]
        .join(" ")
        .toLowerCase()
        .includes(searchValue);
    return matchesTab && matchesSearch;
  });

  const loadMorePhotographers = useCallback(async () => {
    if (!hasMorePhotographers || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    setIsLoadingMorePhotographers(true);
    setLoadMoreError("");
    try {
      const token = getAccessToken();
      if (!token) {
        router.replace("/admin/security");
        return;
      }
      const nextPage = photographersPage + 1;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?type=PHOTOGRAPHER&page=${nextPage}&limit=${PAGE_SIZE}&sortBy=createdAt&sortOrder=desc&search=${encodeURIComponent(searchTerm.trim())}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.status === 401) {
        handleUnauthorized(router);
        throw new Error("Your admin session has expired.");
      }
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.message || "Could not load more photographers.");
      }
      const users = Array.isArray(result?.data) ? result.data : [];
      setPhotographers((current) => [...current, ...users.map(mapPhotographer)]);
      setPhotographersPage(nextPage);
      setPhotographersTotal(Number(result?.total) || 0);
      setHasMorePhotographers(nextPage * PAGE_SIZE < Number(result?.total ?? nextPage * PAGE_SIZE + users.length));
    } catch (error) {
      setLoadMoreError(error.message || "Could not load more photographers.");
    } finally {
      loadingMoreRef.current = false;
      setIsLoadingMorePhotographers(false);
    }
  }, [hasMorePhotographers, photographersPage, router, searchTerm]);

  async function updateStatus(id, status) {
    setSavingPhotographerId(id);
    setStatusError("");
    try {
      const token = getAccessToken();
      if (!token) {
        router.replace("/admin/security");
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${encodeURIComponent(id)}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: status === "Approved" ? "active" : "inactive",
          }),
        },
      );
      if (response.status === 401) {
        handleUnauthorized(router);
        return;
      }
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.message || "Could not update photographer status.");
      }
      const updatedPhotographer = mapPhotographer(result?.data ?? result);
      setPhotographers((current) =>
        current.map((photographer) =>
          photographer.id === id ? updatedPhotographer : photographer,
        ),
      );
    } catch (error) {
      setStatusError(
        error.message || "Could not update photographer status. Please try again.",
      );
    } finally {
      setSavingPhotographerId("");
    }
  }

  const pendingCount = photographers.filter(
    (photographer) => photographer.status === "Pending",
  ).length;
  const approvedCount = photographers.filter(
    (photographer) => photographer.status === "Approved",
  ).length;
  const deactivatedCount = photographers.filter(
    (photographer) => photographer.status === "Deactivated",
  ).length;
  const approvalRate = photographers.length
    ? Math.round((approvedCount / photographers.length) * 100)
    : 0;

  // if (!hasAdminAccess) return null;

  return (
    <div>
          <div className={styles.pageIntro}>
            <div>
              <p className={styles.eyebrow}>WORKSPACE / MODERATION</p>
              <h1>Photographer Approvals</h1>
              <p>Review and manage photographer applications from one place.</p>
            </div>
            <button
              className={styles.exportButton}
              onClick={() => window.print()}
            >
              ⇩ <span>Export report</span>
            </button>
          </div>

          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <span className={styles.statIconPending}>◷</span>
              <div>
                <small>Pending review</small>
                <strong>{pendingCount}</strong>
              </div>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIconApproved}>✓</span>
              <div>
                <small>Approved photographers</small>
                <strong>{approvedCount}</strong>
              </div>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIconTotal}>♟</span>
              <div>
                <small>Total photographers</small>
                <strong>{photographers.length}</strong>
              </div>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIconRate}>↗</span>
              <div>
                <small>Approval rate</small>
                <strong>{approvalRate}%</strong>
              </div>
            </div>
          </div>

          <section className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2>Applications</h2>
                <p>Keep your photographer directory accurate and trusted.</p>
              </div>
              <label className={styles.search}>
                <span>⌕</span>
                <input
                  placeholder="Search photographers"
                  aria-label="Search photographers"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setIsLoadingPhotographers(true);
                    setPhotographers([]);
                    setLoadMoreError("");
                    setPhotographersPage(1);
                    setHasMorePhotographers(false);
                  }}
                />
              </label>
            </div>
            <div className={styles.tabs} role="tablist">
              {["Pending", "Approved", "Deactivated"].map((tab) => (
                <button
                  className={activeTab === tab ? styles.tabActive : styles.tab}
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={activeTab === tab}
                >
                  {tab}{" "}
                  <span>{
                    tab === "Pending"
                      ? pendingCount
                      : tab === "Approved"
                        ? approvedCount
                        : deactivatedCount
                  }</span>
                </button>
              ))}
            </div>
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Photographer</th>
                    <th>Location</th>
                    <th>Joined on</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingPhotographers && (
                    <tr>
                      <td className={styles.empty} colSpan="5">
                        Loading photographer records...
                      </td>
                    </tr>
                  )}
                  {!isLoadingPhotographers && photographersError && (
                    <tr>
                      <td className={styles.empty} colSpan="5" role="alert">
                        {photographersError}
                      </td>
                    </tr>
                  )}
                  {!isLoadingPhotographers && !photographersError && statusError && (
                    <tr>
                      <td className={styles.actionError} colSpan="5" role="alert">
                        {statusError}
                      </td>
                    </tr>
                  )}
                  {!isLoadingPhotographers &&
                    !photographersError &&
                    filteredPhotographers.map((photographer) => (
                    <tr key={photographer.id}>
                      <td>
                        <button
                          type="button"
                          className={styles.personLink}
                          onClick={() => router.push(`/admin/photographers/${photographer.id}`)}
                        >
                          <div className={styles.person}>
                          <span className={styles.personAvatar}>
                            <Image
                              className={styles.personPhoto}
                              src={photographer.profileImageUrl}
                              alt=""
                              width={30}
                              height={30}
                              unoptimized
                              onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = fallbackProfileImage;
                              }}
                            />
                          </span>
                          <div>
                            <b>{photographer.name}</b>
                            <small>{photographer.email}</small>
                          </div>
                        </div>
                        </button>
                      </td>
                      <td>{photographer.location}</td>
                      <td>{photographer.joined}</td>
                      <td>
                        <span
                          className={`${styles.status} ${styles[photographer.status.toLowerCase()]}`}
                        >
                          {photographer.status}
                        </span>
                      </td>
                      <td>
                        <div className={styles.rowActions}>
                          <button
                            type="button"
                            className={styles.secondaryAction}
                            onClick={() => router.push(`/admin/photographers/${photographer.id}`)}
                          >
                            View details
                          </button>
                          {photographer.status === "Pending" && (
                            <>
                              <button
                                className={styles.approve}
                                disabled={savingPhotographerId === photographer.id}
                                onClick={() =>
                                  updateStatus(photographer.id, "Approved")
                                }
                              >
                                Approve
                              </button>
                              <button
                                className={styles.reject}
                                disabled={savingPhotographerId === photographer.id}
                                onClick={() =>
                                  updateStatus(photographer.id, "Deactivated")
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {photographer.status === "Approved" && (
                            <button
                              className={styles.secondaryAction}
                              disabled={savingPhotographerId === photographer.id}
                              onClick={() =>
                                updateStatus(photographer.id, "Deactivated")
                              }
                            >
                              Deactivate
                            </button>
                          )}
                          {photographer.status === "Deactivated" && (
                            <button
                              className={styles.secondaryAction}
                              disabled={savingPhotographerId === photographer.id}
                              onClick={() =>
                                updateStatus(photographer.id, "Approved")
                              }
                            >
                              Reactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!isLoadingPhotographers &&
                    !photographersError &&
                    filteredPhotographers.length === 0 && (
                    <tr>
                      <td className={styles.empty} colSpan="5">
                        No photographers match this list.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <InfiniteScrollTrigger
              hasMore={hasMorePhotographers}
              isLoading={isLoadingMorePhotographers}
              onLoadMore={loadMorePhotographers}
              error={loadMoreError}
              onRetry={loadMorePhotographers}
              loadingLabel="Loading more photographers..."
            />
          </section>
          <p className={styles.footerNote}>
            Showing {filteredPhotographers.length}; loaded {photographers.length} of {photographersTotal}{" "}
            photographers <span>Live records</span>
          </p>
    </div>
  );
}

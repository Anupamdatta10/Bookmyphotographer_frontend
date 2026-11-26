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
    phone: user.phone || "",
    location:
      [user.city, user.state, user.country].filter(Boolean).join(", ") ||
      "Location not provided",
    joined:
      joinedDate && !Number.isNaN(joinedDate.getTime())
        ? joinedDate.toLocaleDateString()
        : "Not available",
    status,
    isBlocked: Boolean(user.isBlocked),
    rating: Number.isFinite(Number(user.rating)) ? Number(user.rating) : 0,
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
  const [ratingDrafts, setRatingDrafts] = useState({});
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownOpenUpward, setDropdownOpenUpward] = useState({});
  const dropdownWrapperRefs = useRef({});
  const loadingMoreRef = useRef(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const wrapper = dropdownWrapperRefs.current[openDropdownId];
      if (wrapper && !wrapper.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdownId]);

  // Calculate if dropdown should open upward when it opens
  useEffect(() => {
    if (openDropdownId) {
      const wrapper = dropdownWrapperRefs.current[openDropdownId];
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect();
        const dropdownHeight = 280; // approximate max height of dropdown
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        
        // Open upward if there's not enough space below but enough space above
        const shouldOpenUp = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;
        setDropdownOpenUpward(prev => ({ ...prev, [openDropdownId]: shouldOpenUp }));
      }
    }
  }, [openDropdownId]);

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
      const updatedUser = result?.data ?? result ?? {};
      setPhotographers((current) => current.map((photographer) => {
        if (photographer.id !== id) return photographer;
        const nextStatus = updatedUser.status ?? (status === "Approved" ? "active" : "inactive");
        return { ...photographer, status: statusLabels[nextStatus] || status };
      }));
      setOpenDropdownId(null);
    } catch (error) {
      setStatusError(
        error.message || "Could not update photographer status. Please try again.",
      );
    } finally {
      setSavingPhotographerId("");
    }
  }

  async function togglePhotographerBlock(photographer) {
    setSavingPhotographerId(photographer.id);
    setStatusError("");
    try {
      const token = getAccessToken();
      if (!token) {
        router.replace("/admin/security");
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${encodeURIComponent(photographer.id)}/block`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isBlocked: !photographer.isBlocked }),
        },
      );
      if (response.status === 401 || response.status === 403) {
        handleUnauthorized(router);
        return;
      }
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.message || "Could not update photographer access.");
      }
      const updatedUser = result?.data ?? result ?? {};
      setPhotographers((current) => current.map((item) =>
        item.id === photographer.id
          ? { ...item, isBlocked: updatedUser.isBlocked ?? !photographer.isBlocked }
          : item,
      ));
      setOpenDropdownId(null);
    } catch (error) {
      setStatusError(
        error.message || "Could not update photographer access. Please try again.",
      );
    } finally {
      setSavingPhotographerId("");
    }
  }

  async function updateRating(id, rating) {
    setSavingPhotographerId(id);
    setStatusError("");
    try {
      const token = getAccessToken();
      if (!token) {
        router.replace("/admin/security");
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${encodeURIComponent(id)}/rating`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating: Number(rating) }),
        },
      );
      if (response.status === 401 || response.status === 403) {
        handleUnauthorized(router);
        return;
      }
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.message || "Could not update photographer rating.");
      }
      const updatedUser = result?.data ?? result ?? {};
      setPhotographers((current) => current.map((item) =>
        item.id === id
          ? { ...item, rating: Number(updatedUser.rating ?? rating) }
          : item,
      ));
      setRatingDrafts((current) => ({ ...current, [id]: String(updatedUser.rating ?? rating) }));
    } catch (error) {
      setStatusError(
        error.message || "Could not update photographer rating. Please try again.",
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
                <h2>PHOTOGRAPHERS</h2>
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
                    <th>Photographer ID</th>
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
                      <td className={styles.empty} colSpan="6">
                        Loading photographer records...
                      </td>
                    </tr>
                  )}
                  {!isLoadingPhotographers && photographersError && (
                    <tr>
                      <td className={styles.empty} colSpan="6" role="alert">
                        {photographersError}
                      </td>
                    </tr>
                  )}
                  {!isLoadingPhotographers && !photographersError && statusError && (
                    <tr>
                      <td className={styles.actionError} colSpan="6" role="alert">
                        {statusError}
                      </td>
                    </tr>
                  )}
                  {!isLoadingPhotographers &&
                    !photographersError &&
                    filteredPhotographers.map((photographer) => (
                    <tr key={photographer.id}>
                      <td>
                        <div className={styles.idCell}>
                          <code className={styles.bookingId}>{photographer.id}</code>
                          <button
                            type="button"
                            className={styles.copyButton}
                            onClick={() => navigator.clipboard.writeText(photographer.id)}
                            aria-label="Copy photographer ID"
                            title="Copy ID"
                          >
                            📋
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={styles.personLink}
                          onClick={() =>
                            router.push(
                              `/admin/photographers/details?id=${encodeURIComponent(photographer.id)}`,
                            )
                          }
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
                            <small>{photographer.phone || "N/A"}</small>
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
                        <div
                          ref={(el) => { dropdownWrapperRefs.current[photographer.id] = el; }}
                          className={`${styles.dropdownWrapper} ${openDropdownId === photographer.id ? styles.dropdownWrapperOpen : ""}`}
                          data-dropdown-id={photographer.id}
                        >
                          <button
                            type="button"
                            className={styles.dropdownTrigger}
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === photographer.id ? null : photographer.id);
                            }}
                            aria-expanded={openDropdownId === photographer.id}
                            aria-haspopup="true"
                          >
                            Actions
                            <span className={openDropdownId === photographer.id ? styles.dropdownArrowOpen : styles.dropdownArrow}>▼</span>
                          </button>
                          {openDropdownId === photographer.id && (
                            <div
                              className={`${styles.dropdownMenu} ${dropdownOpenUpward[photographer.id] ? styles.dropdownMenuUp : ''}`}
                              role="menu"
                            >
                              <button
                                type="button"
                                className={styles.dropdownItem}
                                role="menuitem"
                                onClick={() => router.push(`/admin/photographers/details?id=${encodeURIComponent(photographer.id)}`)}
                              >
                                View details
                              </button>
                              {photographer.status === "Pending" && (
                                <>
                                  <button
                                    type="button"
                                    className={`${styles.dropdownItem} ${styles.dropdownItemApprove}`}
                                    role="menuitem"
                                    disabled={savingPhotographerId === photographer.id}
                                    onClick={() => updateStatus(photographer.id, "Approved")}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    type="button"
                                    className={`${styles.dropdownItem} ${styles.dropdownItemReject}`}
                                    role="menuitem"
                                    disabled={savingPhotographerId === photographer.id}
                                    onClick={() => updateStatus(photographer.id, "Deactivated")}
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              {photographer.status === "Approved" && (
                                <button
                                  type="button"
                                  className={styles.dropdownItem}
                                  role="menuitem"
                                  disabled={savingPhotographerId === photographer.id}
                                  onClick={() => updateStatus(photographer.id, "Deactivated")}
                                >
                                  Deactivate
                                </button>
                              )}
                              {photographer.status === "Deactivated" && (
                                <button
                                  type="button"
                                  className={styles.dropdownItem}
                                  role="menuitem"
                                  disabled={savingPhotographerId === photographer.id}
                                  onClick={() => updateStatus(photographer.id, "Approved")}
                                >
                                  Reactivate
                                </button>
                              )}
                              <button
                                type="button"
                                className={`${styles.dropdownItem} ${photographer.isBlocked ? styles.dropdownItemApprove : styles.dropdownItemReject}`}
                                role="menuitem"
                                disabled={savingPhotographerId === photographer.id}
                                onClick={() => togglePhotographerBlock(photographer)}
                              >
                                {photographer.isBlocked ? "Unblock" : "Block"}
                              </button>
                              <div className={styles.dropdownItemRating}>
                                <label className={styles.ratingLabel} htmlFor={`rating-${photographer.id}`}>Rating (0–5)</label>
                                <input
                                  id={`rating-${photographer.id}`}
                                  className={styles.ratingInput}
                                  type="number"
                                  min="0"
                                  max="5"
                                  step="any"
                                  value={ratingDrafts[photographer.id] ?? String(photographer.rating)}
                                  onChange={(event) => setRatingDrafts((current) => ({ ...current, [photographer.id]: event.target.value }))}
                                  disabled={savingPhotographerId === photographer.id}
                                  aria-label={`Rating for ${photographer.name}, from 0 to 5`}
                                />
                                <button
                                  type="button"
                                  className={styles.saveRatingButton}
                                  disabled={savingPhotographerId === photographer.id || ratingDrafts[photographer.id] === "" || !Number.isFinite(Number(ratingDrafts[photographer.id] ?? photographer.rating)) || Number(ratingDrafts[photographer.id] ?? photographer.rating) < 0 || Number(ratingDrafts[photographer.id] ?? photographer.rating) > 5}
                                  onClick={() => updateRating(photographer.id, ratingDrafts[photographer.id] ?? photographer.rating)}
                                >
                                  {savingPhotographerId === photographer.id ? "Saving…" : "Save"}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!isLoadingPhotographers &&
                    !photographersError &&
                    filteredPhotographers.length === 0 && (
                    <tr>
                      <td className={styles.empty} colSpan="6">
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

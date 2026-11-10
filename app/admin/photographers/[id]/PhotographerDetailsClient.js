"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import InfiniteScrollTrigger from "../../../components/InfiniteScrollTrigger";
import styles from "./page.module.css";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const FALLBACK_IMAGE = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/defolt_profile_pic.jpg`;
const GALLERY_PAGE_SIZE = 10;

function getAccessToken() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("photoConnectUser") || "{}");
    return saved.accessToken || null;
  } catch {
    return null;
  }
}

function mediaUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${BACKEND_URL}${path}`;
}

function value(valueToDisplay) {
  if (valueToDisplay === null || valueToDisplay === undefined || valueToDisplay === "") {
    return "Not available";
  }
  if (Array.isArray(valueToDisplay)) {
    return valueToDisplay.length ? valueToDisplay.join(", ") : "Not available";
  }
  return String(valueToDisplay);
}

function formatDate(dateValue) {
  if (!dateValue) return "Not available";
  const date = new Date(dateValue);
  return Number.isNaN(date.getTime())
    ? "Not available"
    : date.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
}

function formatDateOnly(dateValue) {
  if (!dateValue) return "Not available";
  const date = new Date(dateValue);
  return Number.isNaN(date.getTime())
    ? "Not available"
    : date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

function initials(name) {
  return String(name || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "P";
}

export default function PhotographerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const photographerId = params?.id;
  const [photographer, setPhotographer] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [galleryHasMore, setGalleryHasMore] = useState(false);
  const [galleryLoadingMore, setGalleryLoadingMore] = useState(false);
  const [galleryMoreError, setGalleryMoreError] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const galleryLoadingRef = useRef(false);

  useEffect(() => {
    if (!photographerId) return;
    let current = true;

    async function loadDetails() {
      const token = getAccessToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      try {
        const [profileResponse, galleryResponse, videoResponse] = await Promise.all([
          fetch(`${BACKEND_URL}/api/users/${encodeURIComponent(photographerId)}`, { headers }),
          fetch(
            `${BACKEND_URL}/api/photo-galleries/user/${encodeURIComponent(photographerId)}?page=1&limit=${GALLERY_PAGE_SIZE}&sortBy=sequence&sortOrder=asc`,
          ),
          fetch(`${BACKEND_URL}/api/users/${encodeURIComponent(photographerId)}/profile-videos`, { headers }),
        ]);

        const [profileResult, galleryResult, videoResult] = await Promise.all([
          profileResponse.json().catch(() => null),
          galleryResponse.json().catch(() => null),
          videoResponse.json().catch(() => null),
        ]);

        if (profileResponse.status === 401 || profileResponse.status === 403) {
          window.localStorage.removeItem("photoConnectUser");
          router.replace("/admin/security");
          return;
        }
        if (!profileResponse.ok) {
          throw new Error(profileResult?.message || "Could not load photographer details.");
        }

        if (current) {
          setPhotographer(profileResult);
          setGallery(
            galleryResponse.ok && Array.isArray(galleryResult?.data)
              ? galleryResult.data
              : [],
          );
          const galleryRecords = Array.isArray(galleryResult?.data) ? galleryResult.data : [];
          setGalleryPage(1);
          setGalleryHasMore(Number(galleryResult?.total) > galleryRecords.length);
          setGalleryMoreError("");
          setVideos(videoResponse.ok && Array.isArray(videoResult) ? videoResult : []);
        }
      } catch (loadError) {
        if (current) setError(loadError.message || "Could not load photographer details.");
      } finally {
        if (current) setLoading(false);
      }
    }

    loadDetails();
    return () => {
      current = false;
    };
  }, [photographerId, router]);

  const loadMoreGallery = useCallback(async () => {
    if (!galleryHasMore || galleryLoadingRef.current) return;
    galleryLoadingRef.current = true;
    setGalleryLoadingMore(true);
    setGalleryMoreError("");
    try {
      const nextPage = galleryPage + 1;
      const response = await fetch(
        `${BACKEND_URL}/api/photo-galleries/user/${encodeURIComponent(photographerId)}?page=${nextPage}&limit=${GALLERY_PAGE_SIZE}&sortBy=sequence&sortOrder=asc`,
      );
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.message || "Could not load more portfolio photos.");
      }
      const records = Array.isArray(result?.data) ? result.data : [];
      setGallery((current) => [...current, ...records]);
      setGalleryPage(nextPage);
      setGalleryHasMore(nextPage * GALLERY_PAGE_SIZE < Number(result?.total ?? nextPage * GALLERY_PAGE_SIZE + records.length));
    } catch (loadError) {
      setGalleryMoreError(loadError.message || "Could not load more portfolio photos.");
    } finally {
      galleryLoadingRef.current = false;
      setGalleryLoadingMore(false);
    }
  }, [galleryHasMore, galleryPage, photographerId]);

  if (loading) return <div className={styles.state}>Loading photographer details...</div>;
  if (error) {
    return (
      <div className={styles.errorState}>
        <p>{error}</p>
        <button type="button" onClick={() => router.back()}>Return to previous page</button>
      </div>
    );
  }
  if (!photographer) return <div className={styles.state}>Photographer not found.</div>;

  const profileImage = mediaUrl(photographer.profileImageUrl) || FALLBACK_IMAGE;
  const details = [
    ["Name", value(photographer.name)],
    ["Email", value(photographer.email)],
    ["Phone", value(photographer.phone)],
    ["Account type", value(photographer.type)],
    ["Status", value(photographer.status)],
    ["Approval active", value(photographer.isActive)],
    ["Country", value(photographer.country)],
    ["State", value(photographer.state)],
    ["District", value(photographer.district)],
    ["City", value(photographer.city)],
    ["Address 1", value(photographer.address1)],
    ["Address 2", value(photographer.address2)],
    ["PIN code", value(photographer.pincode)],
    ["Profession", value(photographer.proffession)],
    ["Experience", photographer.experienceYears == null ? "Not available" : `${photographer.experienceYears} years`],
    ["Date of birth", formatDateOnly(photographer.dob)],
    ["Specialties", value(photographer.specialties)],
    ["Languages", value(photographer.languages)],
    ["Rating", value(photographer.rating)],
    ["Total reviews", value(photographer.totalReviews)],
    ["Bio", value(photographer.bio)],
    ["About", value(photographer.about)],
    ["Joined", formatDate(photographer.createdAt)],
    ["Last updated", formatDate(photographer.updatedAt)],
  ];

  return (
    <div className={styles.page}>
      <button className={styles.backButton} type="button" onClick={() => router.back()}>
        <span aria-hidden="true">←</span> Back to photographers
      </button>

      <section className={styles.hero}>
        <div className={styles.coverAvatar}>
          <Image src={profileImage} alt={`${photographer.name || "Photographer"} profile`} fill unoptimized priority />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>PHOTOGRAPHER PROFILE</p>
          <h1>{value(photographer.name)}</h1>
          <p>{value(photographer.email)}</p>
        </div>
        <span className={`${styles.statusBadge} ${styles[String(photographer.status || "").toLowerCase()]}`}>
          {value(photographer.status)}
        </span>
      </section>

      <div className={styles.layout}>
        <section className={styles.card}>
          <h2>Complete details</h2>
          <div className={styles.detailGrid}>
            {details.map(([label, detailValue]) => (
              <div className={styles.detailItem} key={label}>
                <span>{label}</span>
                <strong>{detailValue}</strong>
              </div>
            ))}
          </div>
        </section>

        <aside className={styles.sideColumn}>
          <section className={styles.card}>
            <h2>Profile image</h2>
            <div className={styles.profileImageFrame}>
              {photographer.profileImageUrl ? (
                <Image src={profileImage} alt="Photographer profile" fill unoptimized />
              ) : (
                <div className={styles.initials}>{initials(photographer.name)}</div>
              )}
            </div>
          </section>
          <section className={styles.card}>
            <h2>Identity proof</h2>
            {photographer.identityProofUrl ? (
              <a href={mediaUrl(photographer.identityProofUrl)} target="_blank" rel="noreferrer">
                <Image src={mediaUrl(photographer.identityProofUrl)} alt="Identity proof" width={280} height={180} unoptimized />
              </a>
            ) : (
              <p className={styles.emptyMedia}>Not available</p>
            )}
            <InfiniteScrollTrigger
              hasMore={galleryHasMore}
              isLoading={galleryLoadingMore}
              onLoadMore={loadMoreGallery}
              error={galleryMoreError}
              onRetry={loadMoreGallery}
              loadingLabel="Loading more portfolio photos..."
            />
          </section>
        </aside>
      </div>

      <section className={styles.card}>
        <h2>Portfolio photos</h2>
        {gallery.length ? (
          <div className={styles.mediaGrid}>
            {gallery.map((photo) => (
              <figure key={photo._id} className={styles.mediaCard}>
                {photo.link ? (
                  <Image src={mediaUrl(photo.link)} alt={photo.description || "Portfolio photo"} fill unoptimized />
                ) : (
                  <div className={styles.emptyMedia}>Not available</div>
                )}
                <figcaption>{value(photo.description)}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className={styles.emptyMedia}>Not available</p>
        )}
      </section>

      <section className={styles.card}>
        <h2>Profile videos</h2>
        {videos.length ? (
          <div className={styles.mediaGrid}>
            {videos.map((video) => (
              <figure key={video._id || video.slot} className={styles.mediaCard}>
                {video.videoUrl ? (
                  <video src={mediaUrl(video.videoUrl)} controls className={styles.video} />
                ) : (
                  <div className={styles.emptyMedia}>Not available</div>
                )}
                <figcaption>{value(video.originalName)}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className={styles.emptyMedia}>Not available</p>
        )}
      </section>

      <div className={styles.footerAction}>
        <Link href="/admin" className={styles.backLink}>Return to Manage Photographers</Link>
      </div>
    </div>
  );
}

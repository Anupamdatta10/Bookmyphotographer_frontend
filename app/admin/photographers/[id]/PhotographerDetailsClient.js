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
const EDITABLE_FIELDS = [
  ["minimumDailyFees", "Minimum daily fees", "number"],
  ["country", "Country", "text"],
  ["state", "State", "text"],
  ["district", "District", "text"],
  ["city", "City", "text"],
  ["address1", "Address 1", "text"],
  ["address2", "Address 2", "text"],
  ["pincode", "PIN code", "text"],
  ["proffession", "Profession", "text"],
  ["experienceYears", "Experience (years)", "number"],
  ["dob", "Date of birth", "date"],
  ["specialties", "Specialties", "tags"],
  ["languages", "Languages", "tags"],
  ["bio", "Bio", "textarea"],
  ["about", "About", "textarea"],
];

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

function TagInput({ label, tags, onChange }) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const next = draft.trim();
    if (!next || tags.some((tag) => tag.label.toLowerCase() === next.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...tags, { label: next }]);
    setDraft("");
  }

  return (
    <div className={styles.tagInput} aria-label={label}>
      <div className={styles.tagList}>
        {tags.map((tag, index) => (
          <span className={styles.tag} key={`${tag.label}-${index}`}>
            <span className={styles.tagName}>{tag.label}</span>
            <button className={styles.tagRemove} type="button" aria-label={`Remove ${tag.label}`} onClick={() => onChange(tags.filter((_, itemIndex) => itemIndex !== index))}>×</button>
          </span>
        ))}
      </div>
      <input
        className={styles.tagTextInput}
        aria-label={`Add ${label.toLowerCase()}`}
        placeholder="Type and press Enter"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            addTag();
          }
          if (event.key === "Backspace" && !draft && tags.length) {
            onChange(tags.slice(0, -1));
          }
        }}
      />
    </div>
  );
}

export default function PhotographerDetailsPage({ photographerId: requestedId }) {
  const params = useParams();
  const router = useRouter();
  const photographerId = requestedId || params?.id;
  const [photographer, setPhotographer] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [galleryHasMore, setGalleryHasMore] = useState(false);
  const [galleryLoadingMore, setGalleryLoadingMore] = useState(false);
  const [galleryMoreError, setGalleryMoreError] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");
  const [specialtyTags, setSpecialtyTags] = useState([]);
  const [languageTags, setLanguageTags] = useState([]);
  const [photoSaving, setPhotoSaving] = useState("");
  const [photoMessage, setPhotoMessage] = useState("");
  const [photoError, setPhotoError] = useState("");
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
          setSpecialtyTags((profileResult.specialties || []).map((label) => ({ label: String(label) })));
          setLanguageTags((profileResult.languages || []).map((label) => ({ label: String(label) })));
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

  async function savePhotographer(event) {
    event.preventDefault();
    setIsSaving(true);
    setSaveMessage("");
    setSaveError("");
    const formData = new FormData(event.currentTarget);
    const update = {};
    EDITABLE_FIELDS.forEach(([field, , type]) => {
      const raw = String(formData.get(field) || "").trim();
      if (type === "number") update[field] = raw === "" ? null : Number(raw);
      else if (type !== "tags") update[field] = raw || null;
    });
    update.specialties = specialtyTags.map((tag) => tag.label);
    update.languages = languageTags.map((tag) => tag.label);

    try {
      const token = getAccessToken();
      if (!token) {
        router.replace("/admin/security");
        return;
      }
      const response = await fetch(`${BACKEND_URL}/api/users/${encodeURIComponent(photographerId)}/admin-profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(update),
      });
      const result = await response.json().catch(() => null);
      if (response.status === 401) {
        window.localStorage.removeItem("photoConnectUser");
        router.replace("/admin/security");
        return;
      }
      if (!response.ok) throw new Error(result?.message || "Could not update photographer details.");
      setPhotographer((current) => ({ ...current, ...(result?.data ?? result ?? update) }));
      setIsEditing(false);
      setSaveMessage("Photographer details updated.");
    } catch (saveFailure) {
      setSaveError(saveFailure.message || "Could not update photographer details.");
    } finally {
      setIsSaving(false);
    }
  }

  async function updatePhotographerPhoto(event, photoKind) {
    event.preventDefault();
    const form = event.currentTarget;
    const file = new FormData(form).get("file");
    if (!(file instanceof File) || !file.size) {
      setPhotoError("Choose a photo before saving.");
      return;
    }
    setPhotoSaving(photoKind);
    setPhotoMessage("");
    setPhotoError("");
    try {
      const token = getAccessToken();
      if (!token) {
        router.replace("/admin/security");
        return;
      }
      const body = new FormData();
      body.append(photoKind === "identity" ? "identityProof" : "file", file);
      const response = await fetch(`${BACKEND_URL}/api/users/${encodeURIComponent(photographerId)}/admin-${photoKind === "identity" ? "identity-proof" : "profile-picture"}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });
      const result = await response.json().catch(() => null);
      if (response.status === 401) {
        window.localStorage.removeItem("photoConnectUser");
        router.replace("/admin/security");
        return;
      }
      if (!response.ok) throw new Error(result?.message || "Could not update the photo.");
      const updated = result?.data ?? result ?? {};
      setPhotographer((current) => ({ ...current, ...updated }));
      form.reset();
      setPhotoMessage(photoKind === "identity" ? "Identity proof updated." : "Profile picture updated.");
    } catch (updateError) {
      setPhotoError(updateError.message || "Could not update the photo.");
    } finally {
      setPhotoSaving("");
    }
  }

  async function replacePortfolioPhoto(event, photo) {
    event.preventDefault();
    const form = event.currentTarget;
    const file = new FormData(form).get("file");
    if (!(file instanceof File) || !file.size) {
      setPhotoError("Choose a photo before saving.");
      return;
    }
    setPhotoSaving(photo._id);
    setPhotoMessage("");
    setPhotoError("");
    try {
      const token = getAccessToken();
      if (!token) {
        router.replace("/admin/security");
        return;
      }
      const body = new FormData();
      body.append("file", file);
      const response = await fetch(`${BACKEND_URL}/api/photo-galleries/${encodeURIComponent(photo._id)}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });
      const result = await response.json().catch(() => null);
      if (response.status === 401) {
        window.localStorage.removeItem("photoConnectUser");
        router.replace("/admin/security");
        return;
      }
      if (!response.ok) throw new Error(result?.message || "Could not replace the portfolio photo.");
      const updatedPhoto = result?.data ?? result;
      setGallery((current) => current.map((item) => item._id === photo._id ? { ...item, ...updatedPhoto } : item));
      form.reset();
      setPhotoMessage("Portfolio photo updated.");
    } catch (updateError) {
      setPhotoError(updateError.message || "Could not replace the portfolio photo.");
    } finally {
      setPhotoSaving("");
    }
  }

  async function replaceProfileVideo(event, slot) {
    event.preventDefault();
    const form = event.currentTarget;
    const file = new FormData(form).get("file");
    if (!(file instanceof File) || !file.size) {
      setPhotoError("Choose a video before saving.");
      return;
    }
    setPhotoSaving(`video-${slot}`);
    setPhotoMessage("");
    setPhotoError("");
    try {
      const token = getAccessToken();
      if (!token) {
        router.replace("/admin/security");
        return;
      }
      const body = new FormData();
      body.append("file", file);
      const response = await fetch(`${BACKEND_URL}/api/users/${encodeURIComponent(photographerId)}/admin-profile-videos/${slot}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });
      const result = await response.json().catch(() => null);
      if (response.status === 401) {
        window.localStorage.removeItem("photoConnectUser");
        router.replace("/admin/security");
        return;
      }
      if (!response.ok) throw new Error(result?.message || "Could not update the video.");
      const updatedVideo = result?.data ?? result;
      setVideos((current) => [...current.filter((video) => video.slot !== slot), updatedVideo].sort((a, b) => a.slot - b.slot));
      form.reset();
      setPhotoMessage(`Profile video ${slot + 1} updated.`);
    } catch (updateError) {
      setPhotoError(updateError.message || "Could not update the video.");
    } finally {
      setPhotoSaving("");
    }
  }

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
    ["Account access", photographer.isBlocked ? "Blocked" : "Active"],
    ["Approval active", value(photographer.isActive)],
    ["Minimum daily fees", photographer.minimumDailyFees == null ? "Not available" : `₹${Number(photographer.minimumDailyFees).toLocaleString("en-IN")} / day`],
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
          <div className={styles.detailsHeading}>
            <h2>Complete details</h2>
            {!isEditing && <button className={styles.editButton} type="button" onClick={() => { setSaveMessage(""); setSaveError(""); setIsEditing(true); }}>Edit details</button>}
          </div>
          {saveMessage && <p className={styles.saveMessage} role="status">{saveMessage}</p>}
          {saveError && <p className={styles.saveError} role="alert">{saveError}</p>}
          {isEditing ? (
            <form onSubmit={savePhotographer}>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}><span>Name (cannot be edited)</span><strong>{value(photographer.name)}</strong></div>
                <div className={styles.detailItem}><span>Email (cannot be edited)</span><strong>{value(photographer.email)}</strong></div>
                <div className={styles.detailItem}><span>Mobile number (cannot be edited)</span><strong>{value(photographer.phone)}</strong></div>
                {EDITABLE_FIELDS.map(([field, label, type]) => (
                  <label className={styles.editField} key={field}>
                    <span>{label}</span>
                    {type === "tags" ? (
                      <TagInput
                        label={label}
                        tags={field === "specialties" ? specialtyTags : languageTags}
                        onChange={field === "specialties" ? setSpecialtyTags : setLanguageTags}
                      />
                    ) : type === "textarea" ? (
                      <textarea name={field} rows={4} placeholder={field === "specialties" || field === "languages" ? "Enter one item per line" : undefined} defaultValue={Array.isArray(photographer[field]) && (field === "specialties" || field === "languages") ? photographer[field].join("\n") : photographer[field] || ""} />
                    ) : (
                      <input name={field} type={type} min={type === "number" ? 0 : undefined} step={field === "minimumDailyFees" ? "0.01" : "1"} defaultValue={type === "date" && photographer[field] ? String(photographer[field]).slice(0, 10) : Array.isArray(photographer[field]) ? photographer[field].join(", ") : photographer[field] ?? ""} />
                    )}
                  </label>
                ))}
              </div>
              <div className={styles.editActions}>
                <button className={styles.cancelButton} type="button" disabled={isSaving} onClick={() => setIsEditing(false)}>Cancel</button>
                <button className={styles.saveButton} type="submit" disabled={isSaving}>{isSaving ? "Saving..." : "Save changes"}</button>
              </div>
            </form>
          ) : (
          <div className={styles.detailGrid}>
            {details.map(([label, detailValue]) => (
              <div className={styles.detailItem} key={label}>
                <span>{label}</span>
                <strong>{detailValue}</strong>
              </div>
            ))}
          </div>
          )}
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
            <form className={styles.photoForm} onSubmit={(event) => updatePhotographerPhoto(event, "profile")}>
              <label>Replace profile picture<input type="file" name="file" accept="image/*" /></label>
              <button className={styles.saveButton} type="submit" disabled={photoSaving === "profile"}>{photoSaving === "profile" ? "Uploading..." : "Save photo"}</button>
            </form>
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
            <form className={styles.photoForm} onSubmit={(event) => updatePhotographerPhoto(event, "identity")}>
              <label>Replace identity proof<input type="file" name="identityProof" accept="image/*" /></label>
              <button className={styles.saveButton} type="submit" disabled={photoSaving === "identity"}>{photoSaving === "identity" ? "Uploading..." : "Save photo"}</button>
            </form>
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

      {photoMessage && <p className={styles.saveMessage} role="status">{photoMessage}</p>}
      {photoError && <p className={styles.saveError} role="alert">{photoError}</p>}

      {/* <section className={styles.card}>
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
      </section> */}

      <section className={styles.card}>
        <h2>Portfolio photos</h2>
        {gallery.length ? (
          <div className={styles.mediaGrid}>
            {gallery.map((photo) => (
              <figure key={photo._id} className={styles.mediaCard}>
                {photo.link ? <Image src={mediaUrl(photo.link)} alt={photo.description || "Portfolio photo"} fill unoptimized /> : <div className={styles.emptyMedia}>Not available</div>}
                <figcaption>{value(photo.description)}</figcaption>
                <form className={styles.photoForm} onSubmit={(event) => replacePortfolioPhoto(event, photo)}>
                  <label>Replace photo<input type="file" name="file" accept="image/*" /></label>
                  <button className={styles.saveButton} type="submit" disabled={photoSaving === photo._id}>{photoSaving === photo._id ? "Uploading..." : "Save photo"}</button>
                </form>
              </figure>
            ))}
          </div>
        ) : (
          <p className={styles.emptyMedia}>No portfolio photos available</p>
        )}
      </section>

      <section className={styles.card}>
        <h2>Profile videos</h2>
        <div className={styles.mediaGrid}>
          {[0, 1, 2, 3, 4].map((slot) => {
            const video = videos.find((item) => item.slot === slot);
            return (
              <figure key={slot} className={styles.mediaCard}>
                {video?.videoUrl ? (
                  <video className={styles.video} src={mediaUrl(video.videoUrl)} controls preload="metadata">
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <div className={styles.emptyMedia}>No video in this slot</div>
                )}
                <figcaption>{video ? value(video.originalName) : `Video slot ${slot + 1}`}</figcaption>
                <form className={styles.photoForm} onSubmit={(event) => replaceProfileVideo(event, slot)}>
                  <label>{video ? "Replace video" : "Add video"}<input type="file" name="file" accept="video/*" /></label>
                  <button className={styles.saveButton} type="submit" disabled={photoSaving === `video-${slot}`}>
                    {photoSaving === `video-${slot}` ? "Uploading..." : video ? "Save video" : "Add video"}
                  </button>
                </form>
              </figure>
            );
          })}
        </div>
      </section>

      <div className={styles.footerAction}>
        <Link href="/admin" className={styles.backLink}>Return to Manage Photographers</Link>
      </div>
    </div>
  );
}

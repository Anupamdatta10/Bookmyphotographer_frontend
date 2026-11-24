import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

export default function PhotographerCard({ person }) {
  const professionValue = Array.isArray(person.proffession)
    ? person.proffession.filter(Boolean).join(" and ")
    : person.proffession;
  const profession =
    typeof professionValue === "string" ? professionValue.trim() : "";
  const professionLabel = profession
    ? `${profession[0].toUpperCase()}${profession.slice(1)}`
    : "";

  return (
    <article className={styles.card}>
      <Link
        className={styles.cardOpen}
        href={`/photographers/profile?id=${encodeURIComponent(person._id)}`}
        aria-label={`View ${person.name}'s photographer profile`}
      >
        <div className={styles.photo}>
        <Image
          src={person.image}
          alt={person.name}
          width={700}
          height={520}
          unoptimized
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/defolt_profile_pic.jpg`;
          }}
        />
        </div>
        <div className={styles.cardInfo}>
          <h3>
            {person.name}
            <span className={styles.verifiedBadge}>✓ Verified</span>
          </h3>
          <p className={styles.location}>● &nbsp;{person.location}</p>
          {professionLabel && (
            <p className={styles.profession}>Profession: {professionLabel}</p>
          )}
          {person.minimumDailyFees !== null &&
            person.minimumDailyFees !== undefined &&
            person.minimumDailyFees !== "" && (
              <p className={styles.dailyFee}>
                From ₹{Number(person.minimumDailyFees).toLocaleString("en-IN")} / day
              </p>
            )}
          <div className={styles.tags}>
            {person.tags.length ? (
              person.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)
            ) : (
              <span>No specialties listed</span>
            )}
          </div>
          {/* <p className={styles.rating}>
            {person.rating > 0 ? (
              <>★ <b>{person.rating.toFixed(1)}</b> <small>({person.reviews} reviews)</small></>
            ) : (
              <small>No reviews yet</small>
            )}
          </p> */}
        </div>
      </Link>
    </article>
  );
}

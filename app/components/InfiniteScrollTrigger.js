"use client";

import { useEffect, useRef } from "react";
import styles from "./InfiniteScrollTrigger.module.css";

export default function InfiniteScrollTrigger({
  hasMore,
  isLoading,
  onLoadMore,
  error = "",
  onRetry,
  loadingLabel = "Loading more...",
}) {
  const triggerRef = useRef(null);

  useEffect(() => {
    const element = triggerRef.current;
    if (!element || !hasMore || isLoading || error || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) onLoadMore();
      },
      { rootMargin: "250px" },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [error, hasMore, isLoading, onLoadMore]);

  if (error) {
    return (
      <div className={styles.error} ref={triggerRef} role="alert">
        <p>{error}</p>
        {onRetry && (
          <button type="button" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    );
  }

  if (!hasMore && !isLoading) return null;

  return (
    <div className={styles.trigger} ref={triggerRef} role="status" aria-live="polite">
      {isLoading ? loadingLabel : "Scroll to load more"}
    </div>
  );
}

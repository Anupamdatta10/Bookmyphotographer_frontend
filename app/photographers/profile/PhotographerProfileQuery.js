"use client";

import { useSearchParams } from "next/navigation";
import PhotographerDetailsClient from "../[id]/PhotographerDetailsClient";

export default function PhotographerProfileQuery() {
  const searchParams = useSearchParams();
  const photographerId = searchParams.get("id") || "";

  return <PhotographerDetailsClient requestedId={photographerId} />;
}

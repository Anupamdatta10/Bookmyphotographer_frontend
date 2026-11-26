"use client";

import { useSearchParams } from "next/navigation";
import PhotographerDetailsClient from "../[id]/PhotographerDetailsClient";

export default function PhotographerDetailsQueryClient() {
  const searchParams = useSearchParams();
  const photographerId = searchParams.get("id");

  if (!photographerId) {
    return <p role="alert">Photographer ID is missing from this link.</p>;
  }
  return <PhotographerDetailsClient photographerId={photographerId} />;
}

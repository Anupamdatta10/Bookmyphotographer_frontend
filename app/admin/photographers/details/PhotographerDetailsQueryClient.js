"use client";

import { useState } from "react";
import PhotographerDetailsClient from "../[id]/PhotographerDetailsClient";

export default function PhotographerDetailsQueryClient() {
  const [photographerId] = useState(() =>
    typeof window === "undefined"
      ? ""
      : new URLSearchParams(window.location.search).get("id") || "",
  );

  return <PhotographerDetailsClient photographerId={photographerId} />;
}

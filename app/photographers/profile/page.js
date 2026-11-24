import { Suspense } from "react";
import PhotographerDetailsClient from "../[id]/PhotographerDetailsClient";
import PhotographerProfileQuery from "./PhotographerProfileQuery";

export default function PhotographerProfilePage() {
  return (
    <Suspense fallback={<PhotographerDetailsClient />}>
      <PhotographerProfileQuery />
    </Suspense>
  );
}

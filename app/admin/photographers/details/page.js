import { Suspense } from "react";
import PhotographerDetailsQueryClient from "./PhotographerDetailsQueryClient";

export default function PhotographerDetailsQueryPage() {
  return (
    <Suspense fallback={<p role="status">Loading photographer details...</p>}>
      <PhotographerDetailsQueryClient />
    </Suspense>
  );
}

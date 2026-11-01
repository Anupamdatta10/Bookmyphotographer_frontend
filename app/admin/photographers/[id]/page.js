import PhotographerDetailsClient from "./PhotographerDetailsClient";

export async function generateStaticParams() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const fallbackParam = [{ id: "_" }];

  if (!backendUrl) return fallbackParam;

  try {
    const response = await fetch(
      `${backendUrl}/api/users?type=PHOTOGRAPHER&page=1&limit=1000`,
      { cache: "no-store" },
    );
    if (!response.ok) return fallbackParam;

    const result = await response.json();
    const photographers = Array.isArray(result) ? result : result.data || [];
    const params = photographers
      .map((photographer) => {
        const id = photographer._id || photographer.id || photographer.userId;
        return typeof id === "string" ? { id } : null;
      })
      .filter(Boolean);

    return params.length ? params : fallbackParam;
  } catch {
    return fallbackParam;
  }
}

export default function PhotographerDetailsPage() {
  return <PhotographerDetailsClient />;
}

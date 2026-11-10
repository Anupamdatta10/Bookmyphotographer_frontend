import PhotographerDetailsClient from "./PhotographerDetailsClient";

export async function generateStaticParams() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const pageSize = 10;
  const fallbackParam = [{ id: "_" }];

  if (!backendUrl) return fallbackParam;

  try {
    const params = [];
    for (let page = 1; ; page += 1) {
      const response = await fetch(
        `${backendUrl}/api/users?type=PHOTOGRAPHER&page=${page}&limit=${pageSize}`,
        { cache: "no-store" },
      );
      if (!response.ok) return fallbackParam;

      const result = await response.json();
      const photographers = Array.isArray(result) ? result : result.data || [];
      params.push(
        ...photographers
          .map((photographer) => {
            const id = photographer._id || photographer.id || photographer.userId;
            return typeof id === "string" ? { id } : null;
          })
          .filter(Boolean),
      );
      if (
        photographers.length < pageSize ||
        (Number.isFinite(result.total) && page * pageSize >= result.total)
      ) {
        break;
      }
    }

    return params.length ? params : fallbackParam;
  } catch {
    return fallbackParam;
  }
}

export default function PhotographerDetailsPage() {
  return <PhotographerDetailsClient />;
}

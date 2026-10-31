import PhotographerDetailsClient from "./PhotographerDetailsClient";

export async function generateStaticParams() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const fallbackParam = [{ id: "_" }];

  if (!backendUrl) {
    return fallbackParam;
  }

  try {
    const response = await fetch(
      `${backendUrl}/api/users?type=PHOTOGRAPHER&page=1&limit=1000`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return fallbackParam;
    }

    const result = await response.json();
    const users = Array.isArray(result) ? result : result.data || [];

    const params = users
      .map((user) => {
        const id = user._id || user.id || user.userId;
        return typeof id === "string" ? { id } : null;
      })
      .filter(Boolean);

    return params.length > 0 ? params : fallbackParam;
  } catch {
    return fallbackParam;
  }
}

export default function PhotographerDetailsPage() {
  return <PhotographerDetailsClient />;
}

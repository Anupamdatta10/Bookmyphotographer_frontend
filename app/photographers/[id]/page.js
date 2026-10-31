import PhotographerDetailsClient from "./PhotographerDetailsClient";

export async function generateStaticParams() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  if (!backendUrl) {
    return [];
  }

  try {
    const response = await fetch(
      `${backendUrl}/api/users?type=PHOTOGRAPHER&page=1&limit=1000`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    const users = Array.isArray(result) ? result : result.data || [];

    return users
      .map((user) => {
        const id = user._id || user.id || user.userId;
        return typeof id === "string" ? { id } : null;
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

export default function PhotographerDetailsPage() {
  return <PhotographerDetailsClient />;
}

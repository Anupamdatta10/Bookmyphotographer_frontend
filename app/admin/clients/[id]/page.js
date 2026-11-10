import ClientDetails from "./ClientDetails";

export async function generateStaticParams() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const pageSize = 10;
  const fallbackParam = [{ id: "_" }];

  if (!backendUrl) return fallbackParam;

  try {
    const params = [];
    for (let page = 1; ; page += 1) {
      const response = await fetch(
        `${backendUrl}/api/users?type=PARTNER&page=${page}&limit=${pageSize}`,
        { cache: "no-store" },
      );
      if (!response.ok) return fallbackParam;

      const result = await response.json();
      const clients = Array.isArray(result) ? result : result.data || [];
      params.push(
        ...clients
          .filter((client) => client.type === "PARTNER")
          .map((client) => {
            const id = client._id || client.id || client.userId;
            return typeof id === "string" ? { id } : null;
          })
          .filter(Boolean),
      );
      if (
        clients.length < pageSize ||
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

export default function ClientDetailsPage() {
  return <ClientDetails />;
}

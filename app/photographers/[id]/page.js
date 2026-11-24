import PhotographerDetailsClient from "./PhotographerDetailsClient";

export async function generateStaticParams() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const pageSize = 10;

  if (!backendUrl) {
    throw new Error(
      "NEXT_PUBLIC_BACKEND_URL is required to generate photographer detail pages.",
    );
  }

  const params = [];
  for (let page = 1; ; page += 1) {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(pageSize),
    });
    const response = await fetch(
      `${backendUrl}/api/photographers?${query.toString()}`,
      { cache: "no-store" },
    );
    if (!response.ok) {
      throw new Error(
        `Could not generate photographer detail pages: listing request failed with status ${response.status}.`,
      );
    }

    const result = await response.json();
    if (!Array.isArray(result?.data)) {
      throw new Error(
        "Could not generate photographer detail pages: the listing response did not contain a data array.",
      );
    }

    const photographers = result.data;
    params.push(
      ...photographers
        .map((photographer) => {
          const id =
            photographer._id || photographer.id || photographer.userId;
          return typeof id === "string" ? { id } : null;
        })
        .filter(Boolean),
    );

    const total =
      result.total !== undefined &&
      result.total !== null &&
      result.total !== "" &&
      Number.isFinite(Number(result.total))
        ? Number(result.total)
        : null;
    if (
      photographers.length < pageSize ||
      (total !== null && page * pageSize >= total)
    ) {
      break;
    }
  }

  return params.length ? params : [{ id: "_" }];
}

export default function PhotographerDetailsPage() {
  return <PhotographerDetailsClient />;
}

import "./globals.css";

export const metadata = {
  title: "BookMyPhotographer | Find & Book Photographers Online",

  description:
    "Discover and book professional wedding, birthday, event and portrait photographers in Kolkata and across India. Find the perfect photographer for every special moment.",

  keywords: [
    "book photographer online",
    "wedding photographers in Kolkata",
    "event photographers",
    "birthday photographers",
    "photographers in Tarakeswar",
  ],

  openGraph: {
    title: "BookMyPhotographer | Find Your Photographer",
    description:
      "Find and book talented photographers for weddings, birthdays and special events.",
    url: "https://bookmyfotographer.co.in",
    siteName: "BookMyPhotographer",
    type: "website",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

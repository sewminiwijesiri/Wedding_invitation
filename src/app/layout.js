import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://yasas-sanduni.wedding"),
  title: "Yasas & Sanduni | Wedding Invitation",
  description: "Join us in celebrating the wedding of Yasas & Sanduni on Friday, October 16, 2026. Schedule, venue details, dress code, and RSVP.",
  keywords: "wedding, wedding invitation, Yasas and Sanduni, luxury wedding, ceremony, reception, Sri Lanka wedding",
  openGraph: {
    title: "Yasas & Sanduni | Our Wedding Invitation",
    description: "You are cordially invited to celebrate our wedding on Friday, October 16, 2026.",
    images: [
      {
        url: "/images/couple_hero.jpg",
        width: 1200,
        height: 1600,
        alt: "Yasas & Sanduni"
      }
    ]
  }
};

export const viewport = {
  themeColor: "#D4AF37",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

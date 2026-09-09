import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://fernanda-gustavo.wedding"),
  title: "Fernanda & Gustavo | Wedding Invitation",
  description: "Join us in celebrating the wedding of Fernanda & Gustavo on November 14, 2026. Schedule, venue details, dress code, and RSVP.",
  keywords: "wedding, wedding invitation, Fernanda and Gustavo, luxury wedding, ceremony, reception",
  openGraph: {
    title: "Fernanda & Gustavo | Our Wedding Invitation",
    description: "You are cordially invited to celebrate our wedding on November 14, 2026.",
    images: [
      {
        url: "/images/couple_hero.jpg",
        width: 1200,
        height: 1600,
        alt: "Fernanda & Gustavo"
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

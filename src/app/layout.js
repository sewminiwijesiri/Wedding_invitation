

import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://yasas-sanduni.wedding"),
  title: "Yasas & Sanduni | Wedding Invitation",
  description: "Join us in celebrating the wedding of Yasas & Sanduni on Friday, October 16, 2026 from 9:30 AM to 3:30 PM (Poruwa Ceremony at 9:40 AM) at Royal Rest House, Peradeniya (Queen's Ballroom Hall).",
  keywords: "wedding, wedding invitation, Yasas and Sanduni, Poruwa ceremony, luxury wedding, ceremony, reception, Sri Lanka wedding, Royal Rest House Peradeniya, Queens Ballroom Hall",
  openGraph: {
    title: "Yasas & Sanduni | Our Wedding Invitation",
    description: "You are cordially invited to celebrate our wedding on Friday, October 16, 2026 (9:30 AM – 3:30 PM) at Royal Rest House, Peradeniya.",
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
  themeColor: "#F1ECE3",
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

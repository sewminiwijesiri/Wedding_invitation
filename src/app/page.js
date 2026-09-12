"use client";

import { useState } from "react";
import { weddingData } from "@/data/wedding";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import HeroSection from "@/components/HeroSection";
import MusicPlayer from "@/components/MusicPlayer";
import CountdownCalendar from "@/components/CountdownCalendar";
import EventDetails from "@/components/EventDetails";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import RsvpForm from "@/components/RsvpForm";
import WishesFeed from "@/components/WishesFeed";
import Recommendations from "@/components/Recommendations";
import GoldPetals from "@/components/GoldPetals";
import FloatingBar from "@/components/FloatingBar";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function WeddingPage() {
  const [lang, setLang] = useState("en"); // English as primary default
  const [envelopeKey, setEnvelopeKey] = useState(0); // for re-opening envelope
  const [wishesRefreshKey, setWishesRefreshKey] = useState(0); // for refreshing guestbook wishes

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "si" : "en"));
  };

  const reopenEnvelope = () => {
    setEnvelopeKey((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRsvpSubmitted = () => {
    setWishesRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="page-container">
      {/* Floating Ambient Gold Dust */}
      <GoldPetals />

      {/* Wax Seal 3D Envelope Opener */}
      <EnvelopeIntro
        key={envelopeKey}
        weddingData={weddingData}
        lang={lang}
      />

      {/* Main Wedding Invitation Editorial Card */}
      <article className="invitation-wrapper animate-fade-in" id="invitation-card">
        {/* Hero Section */}
        <HeroSection weddingData={weddingData} lang={lang} />

        {/* Music Player */}
        <MusicPlayer weddingData={weddingData} lang={lang} />

        {/* Countdown & Circled Calendar */}
        <CountdownCalendar weddingData={weddingData} lang={lang} />

        {/* Ceremony & Reception with Maps */}
        <EventDetails weddingData={weddingData} lang={lang} />

        {/* Activities Itinerary Timeline */}
        <ItineraryTimeline weddingData={weddingData} lang={lang} />

        {/* Interactive RSVP Form with Confetti & Supabase sync */}
        <RsvpForm weddingData={weddingData} lang={lang} onRsvpSubmitted={handleRsvpSubmitted} />

        {/* Guestbook & Well Wishes Feed */}
        <WishesFeed lang={lang} refreshKey={wishesRefreshKey} />

        {/* Recommendations, Guidelines & Closing Portrait */}
        <Recommendations weddingData={weddingData} lang={lang} />

        {/* Refined Footer */}
        <footer style={{
          padding: "36px 20px 80px",
          textAlign: "center",
          background: "rgba(235, 226, 213, 0.35)",
          borderTop: "1px solid rgba(182, 155, 126, 0.2)"
        }}>
          <div className="monogram-split" style={{ marginBottom: "14px" }}>
            <span className="monogram-split-initial">Y</span>
            <span className="monogram-split-bar" />
            <span className="monogram-split-initial">S</span>
          </div>

          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "var(--gold-dark)",
            fontWeight: 700,
            marginBottom: "6px"
          }}>
            {weddingData.couple.hashtag}
          </p>

          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "0.95rem",
            color: "#595041",
            marginBottom: "16px"
          }}>
            "{weddingData.couple.quote[lang]}"
          </p>

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap"
          }}>
            <button
              onClick={reopenEnvelope}
              className="btn-outline-gold"
              style={{ fontSize: "0.68rem", padding: "8px 18px" }}
            >
              <Mail size={14} />
              <span>{lang === "si" ? "ආරාධනා පත්‍රය නැවත බලන්න" : "Replay Envelope"}</span>
            </button>

            <Link
              href="/login"
              className="btn-outline-gold"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none"
              }}
              title={lang === "si" ? "පරිපාලක පිවිසුම" : "Admin Login"}
              aria-label="Admin Login"
            >
              <Lock size={14} />
            </Link>
          </div>
        </footer>
      </article>

      {/* Floating Bottom Quick Navigation Bar */}
      <FloatingBar lang={lang} onToggleLang={toggleLanguage} />
    </main>
  );
}

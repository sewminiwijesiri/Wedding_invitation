"use client";

import styles from "./HeroSection.module.css";
import { Sparkles } from "lucide-react";

export default function HeroSection({ weddingData, lang }) {
  const { couple, date } = weddingData;
  const isSi = lang === "si";
  const heroImageSrc = couple.heroImage || "/images/couple_hero.jpg";

  return (
    <section className={styles.heroWrapper}>
      {/* Top Envelope Flap Inspired Header with Couple Photo as Background */}
      <div
        className={styles.topFlapCard}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(22, 18, 14, 0.48) 0%, rgba(28, 23, 17, 0.20) 25%, rgba(20, 16, 12, 0.38) 55%, rgba(16, 13, 9, 0.80) 80%, rgba(12, 9, 6, 0.95) 100%), url('${heroImageSrc}')`
        }}
      >
        {/* Subtle Luxury Gold Corner Accents */}
        <div className={styles.goldCornerTopLeft} />
        <div className={styles.goldCornerTopRight} />

        {/* Top Monogram Heart Seal & Invitation Header */}
        <div className={styles.topHeaderContent}>
          <div className={styles.monogramHeartWrapper}>
            <svg
              viewBox="0 0 24 24"
              className={styles.monogramHeartSvg}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="heroGoldHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2C6" />
                  <stop offset="35%" stopColor="#F5D26D" />
                  <stop offset="70%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#967215" />
                </linearGradient>
                <filter id="heroHeartGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.4" />
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#D4AF37" floodOpacity="0.45" />
                </filter>
              </defs>
              <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                fill="url(#heroGoldHeart)"
                stroke="#FFFDF5"
                strokeWidth="0.85"
                strokeLinejoin="round"
                filter="url(#heroHeartGlow)"
              />
            </svg>
            <span className={styles.monogramHeartText}>{couple.monogram}</span>
          </div>

          <p className={styles.invitationTag}>
            {isSi ? "අපගේ මංගල දිනය" : "Our Wedding"}
          </p>
        </div>

        {/* Couple Names & Date Pill positioned gracefully in lower portion */}
        <div className={styles.bottomHeaderContent}>
          <h1 className={`${styles.coupleNames} ${isSi ? styles.coupleNamesSi : ""}`}>
            <span>{isSi ? (couple.groomSi || couple.groom) : couple.groom}</span>
            <span className={styles.ampersand}>&</span>
            <span>{isSi ? (couple.brideSi || couple.bride) : couple.bride}</span>
          </h1>

          <div className={styles.weddingDatePill}>
            <span>
              {date.day} · {isSi ? (date.monthSi || date.month).toUpperCase() : date.monthEn.toUpperCase()} · {date.year}
            </span>
          </div>
        </div>
      </div>

      {/* Quote & Parents' Blessing Card */}
      <div className={styles.blessingCard}>
        <Sparkles size={20} className={styles.flourishIcon} />
        <p className={styles.blessingText}>
          "{couple.parentBlessing[lang]}"
        </p>
        <p className={styles.parentNames}>
          {isSi ? "දෙපස දෙමාපියන්ගේ ආදරණීය ආශිර්වාදයෙන්" : "With our families' eternal love"}
        </p>
      </div>
    </section>
  );
}

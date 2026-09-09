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

        {/* Top Monogram Seal & Invitation Header */}
        <div className={styles.topHeaderContent}>
          <div className={styles.monogramCircle}>
            {couple.monogram}
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

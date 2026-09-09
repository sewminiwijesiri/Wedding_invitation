"use client";

import styles from "./HeroSection.module.css";
import { Sparkles } from "lucide-react";

export default function HeroSection({ weddingData, lang }) {
  const { couple, date } = weddingData;

  return (
    <section className={styles.heroWrapper}>
      {/* Top Envelope Flap Inspired Header */}
      <div className={styles.topFlapCard}>
        <div className={styles.monogramCircle}>
          {couple.monogram}
        </div>

        <p className={styles.invitationTag}>
          {lang === "si" ? "අපගේ මංගල දිනය" : "Our Wedding"}
        </p>

        <h1 className={styles.coupleNames}>
          <span>{lang === "si" ? (couple.groomSi || couple.groom) : couple.groom}</span>
          <span className={styles.ampersand}>&</span>
          <span>{lang === "si" ? (couple.brideSi || couple.bride) : couple.bride}</span>
        </h1>

        <div className={styles.weddingDatePill}>
          <span>
            {date.day} · {lang === "si" ? (date.monthSi || date.month).toUpperCase() : date.monthEn.toUpperCase()} · {date.year}
          </span>
        </div>
      </div>

      {/* Romantic Editorial Photo */}
      <div className={styles.photoContainer}>
        <div className={styles.photoFrame}>
          <div className={styles.goldOverlayCornerTopLeft} />
          <div className={styles.goldOverlayCornerBottomRight} />

          <img
            src="/images/couple_hero.jpg"
            alt={`${couple.bride} & ${couple.groom}`}
            className={styles.heroImage}
          />
        </div>
      </div>

      {/* Quote & Blessing */}
      <div className={styles.blessingCard}>
        <Sparkles size={20} className={styles.flourishIcon} />
        <p className={styles.blessingText}>
          "{couple.parentBlessing[lang]}"
        </p>
        <p className={styles.parentNames}>
          {lang === "si" ? "දෙපස දෙමාපියන්ගේ ආදරණීය ආශිර්වාදයෙන්" : "With our families' eternal love"}
        </p>
      </div>
    </section>
  );
}

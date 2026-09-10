"use client";

import styles from "./HeroSection.module.css";

export default function HeroSection({ weddingData, lang }) {
  const { couple, date } = weddingData;
  const isSi = lang === "si";
  const heroImageSrc = couple.heroImage || "/images/couple_hero.jpg";

  // Derive 2-digit month for dotted date (e.g. 16.10.2026)
  const monthNum = String(new Date(date.target).getMonth() + 1).padStart(2, "0");

  return (
    <section className={styles.heroWrapper}>
      {/* Luxury Editorial Photo Card matching reference image */}
      <div
        className={styles.editorialPhotoCard}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(16, 12, 8, 0.05) 0%, rgba(16, 12, 8, 0.0) 35%, rgba(14, 10, 6, 0.28) 60%, rgba(12, 8, 5, 0.68) 82%, rgba(10, 7, 4, 0.88) 100%), url('${heroImageSrc}')`
        }}
      >
        {/* Centered Romantic Typography Stack */}
        <div className={styles.photoOverlayContent}>
          {/* Pre-header Tagline */}
          <p className={styles.weddingTagline}>
            {isSi ? "අපගේ විවාහ මංගල්‍යය" : "WE'RE GETTING MARRIED"}
          </p>

          {/* Couple Names in Flowing Signature Script */}
          <h1 className={`${styles.coupleNames} ${isSi ? styles.coupleNamesSi : ""}`}>
            {isSi ? (
              `${couple.groomSi || couple.groom} සහ ${couple.brideSi || couple.bride}`
            ) : (
              <>
                <span className={styles.firstName}>{couple.groom}</span>
                <span className={styles.ampersand}>&</span>
                <span className={styles.secondName}>{couple.bride}</span>
              </>
            )}
          </h1>

          {/* Minimalist Dotted Serif Date matching reference image */}
          <p className={styles.weddingDateNum}>
            {`${date.day}.${monthNum}.${date.year}`}
          </p>

          {/* Botanical Olive Branch Flourish */}
          <div className={styles.flourishWrapper}>
            <svg
              viewBox="0 0 160 26"
              className={styles.botanicalFlourish}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="20"
                y1="13"
                x2="140"
                y2="13"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M 64 13 C 58 6, 46 7, 49 13 C 46 19, 58 20, 64 13 Z"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="1"
                fill="rgba(255, 255, 255, 0.35)"
              />
              <path
                d="M 48 13 C 42 7, 31 8, 34 13 C 31 18, 42 19, 48 13 Z"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="1"
                fill="rgba(255, 255, 255, 0.35)"
              />
              <path
                d="M 32 13 C 27 8, 17 9, 20 13 C 17 17, 27 18, 32 13 Z"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="1"
                fill="rgba(255, 255, 255, 0.35)"
              />
              <circle cx="80" cy="13" r="1.8" fill="rgba(255, 255, 255, 0.95)" />
              <path
                d="M 96 13 C 102 6, 114 7, 111 13 C 114 19, 102 20, 96 13 Z"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="1"
                fill="rgba(255, 255, 255, 0.35)"
              />
              <path
                d="M 112 13 C 118 7, 129 8, 126 13 C 129 18, 118 19, 112 13 Z"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="1"
                fill="rgba(255, 255, 255, 0.35)"
              />
              <path
                d="M 128 13 C 133 8, 143 9, 140 13 C 143 17, 133 18, 128 13 Z"
                stroke="rgba(255, 255, 255, 0.95)"
                strokeWidth="1"
                fill="rgba(255, 255, 255, 0.35)"
              />
            </svg>
          </div>
        </div>

        {/* Realistic Deckle / Torn Paper Edge at bottom of card */}
        <div className={styles.tornPaperEdge}>
          <svg
            viewBox="0 0 1200 48"
            preserveAspectRatio="none"
            className={styles.tornPaperSvg}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Subtle paper depth shadow */}
            <path
              d="M 0 48 L 0 24 C 35 20, 75 27, 110 21 C 160 16, 210 28, 260 22 C 310 16, 360 29, 410 23 C 460 17, 510 27, 560 21 C 620 16, 680 29, 740 23 C 800 17, 860 27, 920 22 C 980 16, 1040 29, 1100 23 L 1200 22 L 1200 48 Z"
              fill="rgba(215, 204, 190, 0.45)"
            />
            {/* Main torn paper edge */}
            <path
              d="M 0 48 L 0 20 C 30 16, 55 24, 85 18 C 115 13, 140 23, 170 18 C 200 13, 225 24, 255 18 C 285 12, 310 23, 340 17 C 370 11, 395 24, 425 18 C 455 12, 480 22, 510 17 C 540 12, 565 25, 595 19 C 625 13, 650 22, 680 17 C 710 12, 735 24, 765 18 C 795 12, 820 22, 850 17 C 880 12, 905 24, 935 18 C 965 12, 990 22, 1020 17 C 1050 12, 1075 24, 1105 18 C 1135 12, 1170 22, 1200 17 L 1200 48 Z"
              fill="var(--card-ivory, #FAF7F2)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

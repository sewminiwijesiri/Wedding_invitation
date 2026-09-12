"use client";

import styles from "./HeroSection.module.css";
import { motion } from "framer-motion";

export default function HeroSection({ weddingData, lang }) {
  const { couple, date } = weddingData;
  const isSi = lang === "si";
  const heroImageSrc = couple.heroImage || "/images/couple_hero.jpg";

  // Derive 2-digit month for dotted date (e.g. 16.10.2026)
  const monthNum = String(new Date(date.target).getMonth() + 1).padStart(2, "0");

  return (
    <section className={styles.heroWrapper}>
      {/* Luxury Editorial Photo Card matching reference image */}
      <motion.div
        className={styles.editorialPhotoCard}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(16, 12, 8, 0.05) 0%, rgba(16, 12, 8, 0.0) 35%, rgba(14, 10, 6, 0.28) 60%, rgba(12, 8, 5, 0.68) 82%, rgba(10, 7, 4, 0.88) 100%), url('${heroImageSrc}')`
        }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Centered Romantic Typography Stack */}
        <motion.div 
          className={styles.photoOverlayContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Pre-header Tagline */}
          <motion.p 
            className={styles.weddingTagline}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isSi ? "අපගේ විවාහ මංගල්‍යය" : "WE'RE GETTING MARRIED"}
          </motion.p>

          {/* Couple Names in Flowing Signature Script */}
          <motion.h1 
            className={`${styles.coupleNames} ${isSi ? styles.coupleNamesSi : ""}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {isSi ? (
              `${couple.groomSi || couple.groom} සහ ${couple.brideSi || couple.bride}`
            ) : (
              <>
                <span className={styles.firstName}>{couple.groom}</span>
                <span className={styles.ampersand}>&</span>
                <span className={styles.secondName}>{couple.bride}</span>
              </>
            )}
          </motion.h1>

          {/* Minimalist Dotted Serif Date matching reference image */}
          <motion.p 
            className={styles.weddingDateNum}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {`${date.day}.${monthNum}.${date.year}`}
          </motion.p>

          {/* Botanical Olive Branch Flourish */}
          <motion.div 
            className={styles.flourishWrapper}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
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
          </motion.div>
        </motion.div>

        {/* Realistic Deckle / Torn Paper Edge at bottom of card */}
        <div className={styles.tornPaperEdge}>
          <svg
            viewBox="0 0 1200 36"
            preserveAspectRatio="none"
            className={styles.tornPaperSvg}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 0 36 L 0 14 C 40 8, 80 18, 120 12 C 160 6, 200 16, 240 10 C 280 4, 320 16, 360 10 C 400 4, 440 14, 480 8 C 520 2, 560 14, 600 8 C 640 2, 680 14, 720 8 C 760 2, 800 14, 840 8 C 880 2, 920 14, 960 8 C 1000 2, 1040 14, 1080 8 C 1120 2, 1160 12, 1200 6 L 1200 36 Z"
              fill="var(--card-ivory, #F8F4ED)"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}


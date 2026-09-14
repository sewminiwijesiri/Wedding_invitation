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
              `${couple.brideSi || couple.bride} සහ ${couple.groomSi || couple.groom}`
            ) : (
              <>
                <span className={styles.firstName}>{couple.bride}</span>
                <span className={styles.ampersand}>&</span>
                <span className={styles.secondName}>{couple.groom}</span>
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
        </motion.div>
      </motion.div>
    </section>
  );
}


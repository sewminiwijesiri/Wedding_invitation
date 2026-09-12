"use client";

import styles from "./Recommendations.module.css";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Recommendations({ weddingData, lang }) {
  const { recommendations } = weddingData;

  return (
    <motion.div 
      className={styles.recCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Heart size={20} className={styles.heartHeaderIcon} fill="var(--gold-dark)" />
      <h4 className={styles.recHeaderTitle}>
        {lang === "si" ? "විශේෂ උපදෙස්" : "GUEST GUIDELINES"}
      </h4>

      {recommendations.map((rec, idx) => (
        <motion.div 
          key={idx} 
          className={styles.recItem}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
          <h5 className={styles.recItemTitle}>{rec.title[lang]}</h5>
          <p className={styles.recItemDesc}>{rec.desc[lang]}</p>
          {idx < recommendations.length - 1 && <div className={styles.divider} />}
        </motion.div>
      ))}

      <div className={styles.divider} style={{ width: "120px", margin: "28px auto 14px" }} />

      <p className={styles.closingInvitationPrompt}>
        {lang === "si" ? "ඔබගේ පැමිණීම අප මහත් සේ අගය කරමු" : "WE LOOK FORWARD TO CELEBRATING TOGETHER"}
      </p>

      <h3 className={styles.thankYouScript}>
        {lang === "si" ? "ඉතාමත් ස්තූතියි!" : "Thank You!"}
      </h3>
    </motion.div>
  );
}


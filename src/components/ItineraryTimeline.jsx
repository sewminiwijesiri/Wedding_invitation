"use client";

import styles from "./ItineraryTimeline.module.css";
import { 
  Church, 
  Wine, 
  HeartHandshake, 
  UtensilsCrossed, 
  PartyPopper, 
  Clock,
  Music2,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

// Custom Line-Art Dancing Bride & Groom Icon matching user reference image
const DancingCoupleIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Bride Silhouette & Gown */}
    <circle cx="8" cy="4" r="1.5" />
    <path d="M7 6c-0.8 1.8-2 5-3.2 10.5 3.2 0.8 6.5 0.8 9.5 0C12 11 10.8 7.8 10 6" />
    <path d="M5 14c2.5.5 5.5.5 8 0" />

    {/* Groom Silhouette & Suit */}
    <circle cx="16" cy="3.5" r="1.5" />
    <path d="M16 5v6" />
    <path d="M16 11l-2 6" />
    <path d="M16 11l2 6" />

    {/* Joined Embracing Arms */}
    <path d="M9.5 7c2 0 3.5.5 5 1" />
    <path d="M14.5 6.5c-2 0-3.5 1-4.5 1.5" />
  </svg>
);

export default function ItineraryTimeline({ weddingData, lang }) {
  const getIcon = (type) => {
    switch (type) {
      case "church":
        return <Church size={20} />;
      case "cocktail":
        return <Wine size={20} />;
      case "dance":
      case "party":
        return <DancingCoupleIcon size={22} />;
      case "dinner":
        return <UtensilsCrossed size={20} />;
      case "sparkler":
        return <Sparkles size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  return (
    <motion.div 
      className={styles.timelineCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
    >
      <h3 className={styles.timelineTitle}>
        {lang === "si" ? "විවාහ දින කාලසටහන" : "Wedding Itinerary"}
      </h3>
      <p className={styles.timelineSubtitle}>
        {lang === "si" ? "අපගේ විශේෂ දවසේ සුන්දර හෝරාවන්" : "The flow of our special day"}
      </p>

      <div className={styles.timelineTrack}>
        {weddingData.itinerary.map((item, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <motion.div 
              key={idx} 
              className={`${styles.timelineItem} ${isLeft ? styles.left : ""}`}
              initial={{ opacity: 0, x: isLeft ? -25 : 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Text content side */}
              <div className={styles.timelineContent}>
                <span className={styles.itemTime}>{lang === "si" ? (item.timeSi || item.time) : item.time}</span>
                <h4 className={styles.itemTitle}>{item.title[lang]}</h4>
                <p className={styles.itemDesc}>{item.desc[lang]}</p>
              </div>

              {/* Center icon node */}
              <div className={styles.timelineNode}>
                {getIcon(item.icon)}
              </div>

              {/* Empty placeholder for opposite side */}
              <div className={styles.timelineEmptySpace} />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}


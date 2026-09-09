"use client";

import styles from "./ItineraryTimeline.module.css";
import { 
  Church, 
  Wine, 
  HeartHandshake, 
  UtensilsCrossed, 
  PartyPopper, 
  Clock 
} from "lucide-react";

export default function ItineraryTimeline({ weddingData, lang }) {
  const getIcon = (type) => {
    switch (type) {
      case "church":
        return <Church size={20} />;
      case "cocktail":
        return <Wine size={20} />;
      case "dance":
        return <HeartHandshake size={20} />;
      case "dinner":
        return <UtensilsCrossed size={20} />;
      case "party":
        return <PartyPopper size={20} />;
      case "sparkler":
        return <Clock size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  return (
    <div className={styles.timelineCard}>
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
            <div 
              key={idx} 
              className={`${styles.timelineItem} ${isLeft ? styles.left : ""}`}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

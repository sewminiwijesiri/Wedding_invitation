"use client";

import styles from "./Recommendations.module.css";
import { Heart } from "lucide-react";

export default function Recommendations({ weddingData, lang }) {
  const { recommendations, gallery } = weddingData;
  const closingPhoto = gallery[2]; // Intimate photo

  return (
    <div className={styles.recCard}>
      <Heart size={20} className={styles.heartHeaderIcon} fill="var(--gold-dark)" />
      <h4 className={styles.recHeaderTitle}>
        {lang === "es" ? "RECOMENDACIONES" : "GUEST GUIDELINES"}
      </h4>

      {recommendations.map((rec, idx) => (
        <div key={idx} className={styles.recItem}>
          <h5 className={styles.recItemTitle}>{rec.title[lang]}</h5>
          <p className={styles.recItemDesc}>{rec.desc[lang]}</p>
          {idx < recommendations.length - 1 && <div className={styles.divider} />}
        </div>
      ))}

      <div className={styles.divider} style={{ width: "120px", margin: "28px auto 14px" }} />

      <p className={styles.closingInvitationPrompt}>
        {lang === "es" ? "ESPERAMOS CONTAR CON SU PRESENCIA" : "WE LOOK FORWARD TO CELEBRATING TOGETHER"}
      </p>

      <h3 className={styles.thankYouScript}>
        {lang === "es" ? "¡Muchas Gracias!" : "Thank You!"}
      </h3>

      {/* Final Intimate Portrait */}
      <div className={styles.finalPhotoFrame}>
        <img
          src={closingPhoto.src}
          alt={closingPhoto.caption[lang]}
          className={styles.finalPhoto}
        />
      </div>
    </div>
  );
}

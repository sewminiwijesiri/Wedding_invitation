"use client";

import { useState } from "react";
import styles from "./EnvelopeIntro.module.css";
import { Sparkles, Heart } from "lucide-react";

export default function EnvelopeIntro({ weddingData, lang, onOpen }) {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opening || opened) return;
    setOpening(true);

    // After animation steps, complete opening
    setTimeout(() => {
      setOpened(true);
      if (onOpen) onOpen();
    }, 1200);
  };

  if (opened) return null;

  return (
    <div className={`${styles.envelopeScreen} ${opened ? styles.opened : ""}`}>
      <div className={styles.ambientGlow} />

      <p className={styles.introSubtitle}>
        {lang === "es" ? "Nuestra Invitación de Boda" : "Our Wedding Invitation"}
      </p>

      {/* 3D Envelope */}
      <div 
        className={styles.envelopeContainer} 
        onClick={handleOpen} 
        role="button" 
        tabIndex={0} 
        aria-label={lang === "es" ? "Abrir invitación" : "Open invitation"}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleOpen(); }}
      >
        <div className={styles.envelopeBody}>
          {/* Card Peek */}
          <div className={`${styles.innerCardPeek} ${opening ? styles.slideOut : ""}`}>
            <span className={styles.innerNames}>
              {weddingData.couple.bride} & {weddingData.couple.groom}
            </span>
            <span className={styles.innerDate}>
              {weddingData.date.day} · {lang === "es" ? weddingData.date.month : weddingData.date.monthEn} · {weddingData.date.year}
            </span>
          </div>

          {/* Envelope Flaps */}
          <div className={styles.flapBottom} />
          <div className={styles.flapLeft} />
          <div className={styles.flapRight} />
          <div className={`${styles.flapTop} ${opening ? styles.open : ""}`} />

          {/* 3D Gold Wax Seal */}
          <div className={`${styles.waxSealWrapper} ${opening ? styles.broken : ""}`}>
            <div className={styles.waxSeal}>
              <div className={styles.waxSealInnerRing}>
                <span className={styles.monogramText}>{weddingData.couple.monogram}</span>
                <Heart className={styles.sealHeart} size={12} fill="#FFF2B2" strokeWidth={0} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tap Instruction */}
      <div className={styles.tapInstruction} onClick={handleOpen}>
        <Sparkles size={16} className={styles.tapSparkle} />
        <span>
          {lang === "es" ? "Toca el sello para abrir" : "Tap the seal to open"}
        </span>
        <Sparkles size={16} className={styles.tapSparkle} />
      </div>
    </div>
  );
}

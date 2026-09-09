"use client";

import styles from "./DressCode.module.css";
import { Sparkles } from "lucide-react";

export default function DressCode({ weddingData, lang }) {
  const { dressCode } = weddingData;

  return (
    <div className={styles.dressCodeCard}>
      <h3 className={styles.dressCodeTitle}>{dressCode.title[lang]}</h3>
      <p className={styles.dressCodeType}>{dressCode.type[lang]}</p>

      {/* Attire Icons */}
      <div className={styles.attireIconsRow}>
        <div className={styles.attireFigure}>
          <div className={styles.figureIconWrapper}>
            {/* Elegant Suit / Tuxedo Icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 3h12v18H6z" stroke="none" />
              <path d="M7 3l5 8 5-8" />
              <path d="M12 11v10" />
              <path d="M9 3v4" />
              <path d="M15 3v4" />
              <path d="M10 8l2 2 2-2" />
              <circle cx="12" cy="15" r="1" fill="currentColor" />
              <circle cx="12" cy="18" r="1" fill="currentColor" />
            </svg>
          </div>
          <span className={styles.figureLabel}>{lang === "si" ? "පිරිමින් සඳහා" : "Gentlemen"}</span>
        </div>

        <div className={styles.attireFigure}>
          <div className={styles.figureIconWrapper}>
            {/* Evening Gown Icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 3l3 4 3-4" />
              <path d="M8 7h8l2 14H6L8 7z" />
              <path d="M10 7c0 3 4 3 4 0" />
            </svg>
          </div>
          <span className={styles.figureLabel}>{lang === "si" ? "කාන්තාවන් සඳහා" : "Ladies"}</span>
        </div>
      </div>

      <div className={styles.guidelinesBox}>
        <p className={styles.guidelineItem}>
          <strong>{lang === "si" ? "කාන්තාවන්: " : "Ladies: "}</strong>
          {dressCode.women[lang]}
        </p>
        <p className={styles.guidelineItem}>
          <strong>{lang === "si" ? "පිරිමින්: " : "Gentlemen: "}</strong>
          {dressCode.men[lang]}
        </p>
      </div>

      <div className={styles.reservedNote}>
        <Sparkles size={14} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
        {dressCode.note[lang]}
      </div>

      {/* Suggested Palette Swatches */}
      <p className={styles.paletteTitle}>
        {lang === "si" ? "යෝජිත වර්ණ සංයෝජනය" : "Suggested Color Palette"}
      </p>
      <div className={styles.swatchesRow}>
        {dressCode.palette.map((item, idx) => (
          <div
            key={idx}
            className={styles.swatchCircle}
            style={{
              backgroundColor: item.hex,
              border: `2px solid ${item.border}`
            }}
            title={item.name}
          />
        ))}
      </div>
    </div>
  );
}

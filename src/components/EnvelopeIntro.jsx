"use client";

import { useState } from "react";
import styles from "./EnvelopeIntro.module.css";

export default function EnvelopeIntro({ weddingData, lang, onOpen }) {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);
  const { date } = weddingData;

  const monthNum = String(new Date(date.target).getMonth() + 1).padStart(2, "0");

  const handleOpen = () => {
    if (opening || opened) return;
    setOpening(true);

    if (onOpen) onOpen();

    setTimeout(() => {
      setOpened(true);
    }, 4500);
  };

  if (opened) return null;

  return (
    <div
      className={`${styles.envelopeScreen} ${opening ? styles.opening : ""} ${opened ? styles.opened : ""}`}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      aria-label="Open wedding invitation"
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleOpen(); }}
    >
      {/* Top Triangular V-Flap opening UPWARDS */}
      <div className={`${styles.topFlap} ${opening ? styles.topFlapOpen : ""}`}>
        <svg
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          className={styles.flapSvg}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FAF6F0" />
              <stop offset="65%" stopColor="#F4EFE6" />
              <stop offset="100%" stopColor="#E9DFD0" />
            </linearGradient>
          </defs>
          {/* Top flap extending down to cover side crease shapes completely */}
          <path
            d="M 0 0 L 1000 0 L 1000 480 L 518 590 Q 500 600 482 590 L 0 480 Z"
            fill="url(#flapGrad)"
          />
        </svg>

        {/* Monogram Initials S | Y */}
        <div className={styles.flapMonogram}>
          <span className={styles.initialBride}>S</span>
          <span className={styles.verticalBar} />
          <span className={styles.initialGroom}>Y</span>
        </div>

        {/* Botanical Wax Seal Closure & Tap prompt matching reference image */}
        <div className={styles.sealWrapper}>
          {/* Golden Ambient Pulsing Halo */}
          <div className={styles.sealGlow} aria-hidden="true" />

          {/* Botanical Wax Seal Stamp */}
          <picture className={styles.sealPicture}>
            <source srcSet="/images/botanical_wax_seal.webp" type="image/webp" />
            <img
              src="/images/botanical_wax_seal.png"
              alt="Botanical wax seal"
              className={styles.sealImage}
              draggable="false"
              loading="eager"
            />
          </picture>
        </div>
      </div>

      {/* Bottom Envelope Body opening DOWNWARDS */}
      <div className={`${styles.bottomFlap} ${opening ? styles.bottomFlapOpen : ""}`}>
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          className={styles.bottomFlapSvg}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="bottomFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F4EFE6" />
              <stop offset="45%" stopColor="#ECE3D4" />
              <stop offset="100%" stopColor="#DCCEB8" />
            </linearGradient>
          </defs>
          {/* Solid full-width bottom envelope body */}
          <rect width="1000" height="500" fill="url(#bottomFlapGrad)" />
          {/* Thin elegant diagonal crease lines matching reference image */}
          <line x1="0" y1="10" x2="260" y2="180" stroke="rgba(160, 135, 105, 0.32)" strokeWidth="1.2" />
          <line x1="1000" y1="10" x2="740" y2="180" stroke="rgba(160, 135, 105, 0.32)" strokeWidth="1.2" />
        </svg>

        {/* Minimalist Date at bottom center matching reference image */}
        <p className={styles.envelopeDate}>
          {`${date.day}.${monthNum}.${date.year}`}
        </p>
      </div>
    </div>
  );
}

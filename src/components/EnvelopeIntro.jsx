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

    setTimeout(() => {
      setOpened(true);
      if (onOpen) onOpen();
    }, 950);
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
      {/* Subtle side crease lines matching reference */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className={styles.sideCreasesSvg}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="420"
          x2="240"
          y2="570"
          stroke="rgba(140, 115, 85, 0.22)"
          strokeWidth="2"
        />
        <line
          x1="1000"
          y1="420"
          x2="760"
          y2="570"
          stroke="rgba(140, 115, 85, 0.22)"
          strokeWidth="2"
        />
      </svg>

      {/* Top Triangular V-Flap with website beige gradient */}
      <div className={`${styles.topFlap} ${opening ? styles.topFlapOpen : ""}`}>
        <svg
          viewBox="0 0 1000 650"
          preserveAspectRatio="none"
          className={styles.flapSvg}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="flapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FAF5ED" />
              <stop offset="55%" stopColor="#EFE7DA" />
              <stop offset="100%" stopColor="#E2D6C3" />
            </linearGradient>
          </defs>
          <path
            d="M 0 0 L 1000 0 L 1000 420 L 518 610 Q 500 626 482 610 L 0 420 Z"
            fill="url(#flapGrad)"
          />
        </svg>

        {/* Monogram Initials matching Image 2 in deep charcoal */}
        <div className={styles.flapMonogram}>
          <span className={styles.initialGroom}>Y</span>
          <span className={styles.verticalBar} />
          <span className={styles.initialBride}>S</span>
        </div>
      </div>

      {/* Minimalist Date at bottom center matching reference image */}
      <p className={styles.envelopeDate}>
        {`${date.day}.${monthNum}.${date.year}`}
      </p>
    </div>
  );
}

"use client";

import styles from "./FloatingBar.module.css";
import { Globe, Heart, ArrowUp } from "lucide-react";

export default function FloatingBar({ lang, onToggleLang }) {
  const scrollToRsvp = () => {
    const el = document.getElementById("rsvp");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.floatingBarWrapper}>
      {/* Language Switcher */}
      <button 
        onClick={onToggleLang} 
        className={styles.langBtn}
        title={lang === "si" ? "Switch to English" : "සිංහල භාෂාවට මාරු වන්න (Switch to Sinhala)"}
      >
        <Globe size={14} />
        <span>{lang === "si" ? "English" : "සිංහල"}</span>
      </button>

      {/* Quick RSVP action */}
      <button onClick={scrollToRsvp} className={styles.rsvpQuickBtn}>
        <Heart size={14} fill="#111111" />
        <span>{lang === "si" ? "තහවුරු කරන්න" : "RSVP"}</span>
      </button>

      {/* Scroll to Top */}
      <button onClick={scrollToTop} className={styles.topBtn} title={lang === "si" ? "ඉහළට යන්න" : "Scroll to top"}>
        <ArrowUp size={16} />
      </button>
    </div>
  );
}

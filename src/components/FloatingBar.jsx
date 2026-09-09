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
        title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      >
        <Globe size={14} />
        <span>{lang.toUpperCase()}</span>
      </button>

      {/* Quick RSVP action */}
      <button onClick={scrollToRsvp} className={styles.rsvpQuickBtn}>
        <Heart size={14} fill="#111111" />
        <span>{lang === "es" ? "Confirmar" : "RSVP"}</span>
      </button>

      {/* Scroll to Top */}
      <button onClick={scrollToTop} className={styles.topBtn} title={lang === "es" ? "Volver arriba" : "Scroll to top"}>
        <ArrowUp size={16} />
      </button>
    </div>
  );
}

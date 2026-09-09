"use client";

import { useState, useEffect } from "react";
import styles from "./RsvpForm.module.css";
import { MailCheck, Send, CheckCircle, RefreshCw, Heart } from "lucide-react";

export default function RsvpForm({ weddingData, lang }) {
  const [formData, setFormData] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    diet: "none",
    song: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check saved RSVP
    try {
      const saved = localStorage.getItem("wedding_rsvp_data");
      if (saved) {
        setFormData(JSON.parse(saved));
        setSubmitted(true);
      }
    } catch (e) {}
  }, []);

  const triggerGoldConfetti = async () => {
    try {
      if (typeof window !== "undefined") {
        const confettiModule = await import("canvas-confetti");
        const confetti = confettiModule.default || confettiModule;
        if (typeof confetti === "function") {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#D4AF37", "#ECC87A", "#FFFFFF", "#AA7C11", "#FFF8E1", "#E5C158"]
          });
        }
      }
    } catch (e) {
      console.warn("Confetti error", e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      localStorage.setItem("wedding_rsvp_data", JSON.stringify(formData));
    } catch (e) {}

    setSubmitted(true);
    triggerGoldConfetti();
  };

  const handleReset = () => {
    try {
      localStorage.removeItem("wedding_rsvp_data");
    } catch (e) {}
    setSubmitted(false);
  };

  return (
    <div className={styles.rsvpCard} id="rsvp">
      <div className={styles.rsvpIconWrapper}>
        <MailCheck size={26} strokeWidth={1.5} />
      </div>

      <h3 className={styles.rsvpTitle}>
        {lang === "es" ? "Confirmación" : "RSVP"}
      </h3>
      <p className={styles.rsvpSubtitle}>
        {lang === "es"
          ? "Agradecemos confirmar su asistencia antes del 01 de Noviembre."
          : "Kindly confirm your attendance before November 1st."}
      </p>

      {submitted ? (
        <div className={styles.thankYouBox}>
          <Heart size={44} fill="#D4AF37" color="#D4AF37" style={{ margin: "0 auto 12px" }} />
          <h4 className={styles.thankYouTitle}>
            {lang === "es" ? "¡Muchas Gracias!" : "Thank You!"}
          </h4>
          <p className={styles.thankYouText}>
            {formData.attending === "yes"
              ? lang === "es"
                ? `¡Nos llena de emoción celebrar juntos, ${formData.name}! Tu lugar está reservado.`
                : `We are thrilled to celebrate with you, ${formData.name}! Your place is reserved.`
              : lang === "es"
                ? `Lamentamos que no puedas acompañarnos, ${formData.name}. ¡Estarás en nuestros corazones!`
                : `We'll miss you, ${formData.name}, but you will be with us in spirit!`}
          </p>

          <div className={styles.attendeeSummary}>
            <strong>{formData.name}</strong> ·{" "}
            {formData.attending === "yes"
              ? lang === "es"
                ? `Asistirá (${formData.guests} ${formData.guests === "1" ? "persona" : "personas"})`
                : `Attending (${formData.guests} ${formData.guests === "1" ? "guest" : "guests"})`
              : lang === "es"
                ? "No podrá asistir"
                : "Unable to attend"}
          </div>

          <button onClick={handleReset} className="btn-outline-gold">
            <RefreshCw size={14} />
            <span>{lang === "es" ? "Modificar Respuesta" : "Update Response"}</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          {/* Guest Name */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              {lang === "es" ? "Nombre Completo *" : "Full Name *"}
            </label>
            <input
              type="text"
              required
              placeholder={lang === "es" ? "Ej. Familia Martínez o Juan Pérez" : "e.g. John Doe & Family"}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.textInput}
            />
          </div>

          {/* Attendance Radio */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              {lang === "es" ? "¿Nos acompañarás? *" : "Will you attend? *"}
            </label>
            <div className={styles.radioGroup}>
              <div
                className={`${styles.radioOption} ${formData.attending === "yes" ? styles.selected : ""}`}
                onClick={() => setFormData({ ...formData, attending: "yes" })}
              >
                <div className={styles.radioCircle}>
                  {formData.attending === "yes" && <div className={styles.radioInnerDot} />}
                </div>
                <span>{lang === "es" ? "¡Sí, asistiré con alegría!" : "Joyfully accept!"}</span>
              </div>

              <div
                className={`${styles.radioOption} ${formData.attending === "no" ? styles.selected : ""}`}
                onClick={() => setFormData({ ...formData, attending: "no" })}
              >
                <div className={styles.radioCircle}>
                  {formData.attending === "no" && <div className={styles.radioInnerDot} />}
                </div>
                <span>{lang === "es" ? "Lamentablemente no podré asistir" : "Regretfully decline"}</span>
              </div>
            </div>
          </div>

          {formData.attending === "yes" && (
            <>
              {/* Number of guests */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  {lang === "es" ? "Número de Asistentes" : "Number of Guests"}
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className={styles.selectInput}
                >
                  <option value="1">1 {lang === "es" ? "Persona" : "Guest"}</option>
                  <option value="2">2 {lang === "es" ? "Personas" : "Guests"}</option>
                  <option value="3">3 {lang === "es" ? "Personas" : "Guests"}</option>
                  <option value="4">4 {lang === "es" ? "Personas" : "Guests"}</option>
                </select>
              </div>

              {/* Dietary */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  {lang === "es" ? "Requerimientos Dietéticos" : "Dietary Restrictions"}
                </label>
                <select
                  value={formData.diet}
                  onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                  className={styles.selectInput}
                >
                  <option value="none">{lang === "es" ? "Ninguno / Menú Regular" : "None / Standard Menu"}</option>
                  <option value="vegetarian">{lang === "es" ? "Vegetariano" : "Vegetarian"}</option>
                  <option value="vegan">{lang === "es" ? "Vegano" : "Vegan"}</option>
                  <option value="gluten-free">{lang === "es" ? "Sin Gluten (Celiaquía)" : "Gluten-Free"}</option>
                  <option value="other">{lang === "es" ? "Otra alergia alimentaria" : "Other allergy"}</option>
                </select>
              </div>

              {/* Song request */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  {lang === "es" ? "Canción que te hará bailar" : "Song to get you dancing"}
                </label>
                <input
                  type="text"
                  placeholder={lang === "es" ? "Título y artista sugerido" : "Title and artist"}
                  value={formData.song}
                  onChange={(e) => setFormData({ ...formData, song: e.target.value })}
                  className={styles.textInput}
                />
              </div>
            </>
          )}

          {/* Wishes / Message */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              {lang === "es" ? "Mensaje para los Novios" : "Message for the Bride & Groom"}
            </label>
            <textarea
              rows="3"
              placeholder={lang === "es" ? "Escribe tus buenos deseos..." : "Share your wishes..."}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={styles.textareaInput}
            />
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <button type="submit" className="btn-gold" style={{ width: "100%" }}>
              <Send size={16} />
              <span>{lang === "es" ? "Enviar Confirmación" : "Send RSVP"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

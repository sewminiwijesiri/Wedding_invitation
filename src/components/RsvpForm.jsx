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
        {lang === "si" ? "පැමිණීම තහවුරු කිරීම" : "RSVP"}
      </h3>
      <p className={styles.rsvpSubtitle}>
        {lang === "si"
          ? "කරුණාකර නොවැම්බර් 01 වන දිනට පෙර ඔබගේ පැමිණීම තහවුරු කරන්න."
          : "Kindly confirm your attendance before November 1st."}
      </p>

      {submitted ? (
        <div className={styles.thankYouBox}>
          <Heart size={44} fill="#D4AF37" color="#D4AF37" style={{ margin: "0 auto 12px" }} />
          <h4 className={styles.thankYouTitle}>
            {lang === "si" ? "ඉතාමත් ස්තූතියි!" : "Thank You!"}
          </h4>
          <p className={styles.thankYouText}>
            {formData.attending === "yes"
              ? lang === "si"
                ? `ඔබගේ පැමිණීම ගැන අප අතිශය සතුටට පත්වෙමු, ${formData.name}! ඔබ වෙනුවෙන් ආසන වෙන් කර ඇත.`
                : `We are thrilled to celebrate with you, ${formData.name}! Your place is reserved.`
              : lang === "si"
                ? `ඔබට සහභාගී වීමට නොහැකි වීම ගැන කනගාටු වෙමු, ${formData.name}. ඔබගේ ආශිර්වාදය අප සමඟ පවතිනු ඇත!`
                : `We'll miss you, ${formData.name}, but you will be with us in spirit!`}
          </p>

          <div className={styles.attendeeSummary}>
            <strong>{formData.name}</strong> ·{" "}
            {formData.attending === "yes"
              ? lang === "si"
                ? `සහභාගී වේ (අමුත්තන් ${formData.guests} දෙනෙක්)`
                : `Attending (${formData.guests} ${formData.guests === "1" ? "guest" : "guests"})`
              : lang === "si"
                ? "සහභාගී විය නොහැක"
                : "Unable to attend"}
          </div>

          <button onClick={handleReset} className="btn-outline-gold">
            <RefreshCw size={14} />
            <span>{lang === "si" ? "පිළිතුර වෙනස් කරන්න" : "Update Response"}</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          {/* Guest Name */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              {lang === "si" ? "සම්පූර්ණ නම *" : "Full Name *"}
            </label>
            <input
              type="text"
              required
              placeholder={lang === "si" ? "උදා: නිමල් පෙරේරා සහ පවුලේ අය" : "e.g. John Doe & Family"}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={styles.textInput}
            />
          </div>

          {/* Attendance Radio */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              {lang === "si" ? "ඔබ අපගේ මංගල්‍යයට සහභාගී වනවාද? *" : "Will you attend? *"}
            </label>
            <div className={styles.radioGroup}>
              <div
                className={`${styles.radioOption} ${formData.attending === "yes" ? styles.selected : ""}`}
                onClick={() => setFormData({ ...formData, attending: "yes" })}
              >
                <div className={styles.radioCircle}>
                  {formData.attending === "yes" && <div className={styles.radioInnerDot} />}
                </div>
                <span>{lang === "si" ? "ඔව්, සතුටින් සහභාගී වෙමි!" : "Joyfully accept!"}</span>
              </div>

              <div
                className={`${styles.radioOption} ${formData.attending === "no" ? styles.selected : ""}`}
                onClick={() => setFormData({ ...formData, attending: "no" })}
              >
                <div className={styles.radioCircle}>
                  {formData.attending === "no" && <div className={styles.radioInnerDot} />}
                </div>
                <span>{lang === "si" ? "කනගාටුයි, සහභාගී විය නොහැක" : "Regretfully decline"}</span>
              </div>
            </div>
          </div>

          {formData.attending === "yes" && (
            <>
              {/* Number of guests */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  {lang === "si" ? "සහභාගී වන සංඛ්‍යාව" : "Number of Guests"}
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className={styles.selectInput}
                >
                  <option value="1">1 {lang === "si" ? "දෙනෙක්" : "Guest"}</option>
                  <option value="2">2 {lang === "si" ? "දෙනෙක්" : "Guests"}</option>
                  <option value="3">3 {lang === "si" ? "දෙනෙක්" : "Guests"}</option>
                  <option value="4">4 {lang === "si" ? "දෙනෙක්" : "Guests"}</option>
                </select>
              </div>

              {/* Dietary */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  {lang === "si" ? "ආහාර මනාපයන් / රුචිකත්වය" : "Dietary Restrictions"}
                </label>
                <select
                  value={formData.diet}
                  onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                  className={styles.selectInput}
                >
                  <option value="none">{lang === "si" ? "සාමාන්‍ය ආහාර වේල" : "None / Standard Menu"}</option>
                  <option value="vegetarian">{lang === "si" ? "එළවළු පමණක් (Vegetarian)" : "Vegetarian"}</option>
                  <option value="vegan">{lang === "si" ? "වීගන් (Vegan)" : "Vegan"}</option>
                  <option value="gluten-free">{lang === "si" ? "ග්ලූටන් රහිත (Gluten-Free)" : "Gluten-Free"}</option>
                  <option value="other">{lang === "si" ? "වෙනත් විශේෂ ආහාර අවශ්‍යතාවක්" : "Other allergy"}</option>
                </select>
              </div>

              {/* Song request */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  {lang === "si" ? "ඔබ ප්‍රියකරන මංගල ගීතය" : "Song to get you dancing"}
                </label>
                <input
                  type="text"
                  placeholder={lang === "si" ? "ගීතයේ නම සහ ගායකයා" : "Title and artist"}
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
              {lang === "si" ? "නවතම යුවලට සුබපැතුම් පණිවිඩයක්" : "Message for the Bride & Groom"}
            </label>
            <textarea
              rows="3"
              placeholder={lang === "si" ? "ඔබගේ ආදරණීය සුබපැතුම් මෙහි ලියන්න..." : "Share your wishes..."}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={styles.textareaInput}
            />
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <button type="submit" className="btn-gold" style={{ width: "100%" }}>
              <Send size={16} />
              <span>{lang === "si" ? "තහවුරු කිරීම යවන්න" : "Send RSVP"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

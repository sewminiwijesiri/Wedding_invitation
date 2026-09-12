"use client";

import { useState, useEffect } from "react";
import styles from "./CountdownCalendar.module.css";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function CountdownCalendar({ weddingData, lang }) {
  const { date } = weddingData;

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  useEffect(() => {
    const target = new Date(date.target).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0")
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [date.target]);

  // Dynamic Calendar generation based on wedding target date
  const weekdaysSi = ["ඉරි", "සඳු", "අඟ", "බදා", "බ්‍රහ", "සිකු", "සෙන"];
  const weekdaysEn = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekdays = lang === "si" ? weekdaysSi : weekdaysEn;

  const weddingDateObj = new Date(date.target);
  const targetYear = weddingDateObj.getFullYear() || 2026;
  const targetMonth = weddingDateObj.getMonth() || 9; // October is 9
  const targetDay = weddingDateObj.getDate() || parseInt(date.day, 10) || 16;

  // Days in month & first day index (0 = Sun, 1 = Mon, ..., 4 = Thu)
  const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
  const firstDayIndex = new Date(targetYear, targetMonth, 1).getDay();
  const calendarCells = [];

  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }

  // Split into rows of 7
  const rows = [];
  for (let i = 0; i < calendarCells.length; i += 7) {
    rows.push(calendarCells.slice(i, i + 7));
  }

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const isSi = lang === "si";
    const title = encodeURIComponent(`${weddingData.couple.groom} & ${weddingData.couple.bride} - ${isSi ? "අපගේ විවාහ මංගල්‍යය" : "Our Wedding"}`);
    const details = encodeURIComponent(
      isSi
        ? `මංගල චාරිත්‍ර: ${weddingData.events[0].venueSi || weddingData.events[0].venue} (${weddingData.events[0].timeSi || weddingData.events[0].time})\nමංගල සාදය: ${weddingData.events[1].venueSi || weddingData.events[1].venue} (${weddingData.events[1].timeSi || weddingData.events[1].time})`
        : `Ceremony: ${weddingData.events[0].venue} (${weddingData.events[0].time})\nReception: ${weddingData.events[1].venue} (${weddingData.events[1].time})`
    );
    const location = encodeURIComponent(`${weddingData.events[0].venue}, ${weddingData.events[0].address}`);
    const dates = "20261016T093000/20261016T153000";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <motion.div 
      className={styles.countdownCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Editorial Date Display matching reference Image 1 */}
      <motion.div 
        className={styles.editorialDateBlock}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p className={styles.dateMonthName}>
          {lang === "si" ? (date.monthSi || date.month) : (date.monthEn || date.month).toUpperCase()}
        </p>

        <div className={styles.dateWingsRow}>
          <div className={styles.dateWing}>
            <div className={styles.wingLine} />
            <span className={styles.wingText}>
              {lang === "si" ? (date.dayNameSi || date.dayName) : (date.dayNameEn || date.dayName).toUpperCase()}
            </span>
            <div className={styles.wingLine} />
          </div>

          <span className={styles.centerDayNumber}>{date.day}</span>

          <div className={styles.dateWing}>
            <div className={styles.wingLine} />
            <span className={styles.wingText}>{date.year}</span>
            <div className={styles.wingLine} />
          </div>
        </div>
      </motion.div>

      {/* Countdown Clock */}
      <p className={styles.countdownTitle}>
        {lang === "si" ? "ඉතිරි කාලය" : "COUNTDOWN"}
      </p>

      <motion.div 
        className={styles.clockGrid}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className={styles.timeBox}>
          <span className={styles.timeDigit}>{timeLeft.days}</span>
          <span className={styles.timeLabel}>{lang === "si" ? "දින" : "Days"}</span>
        </div>
        <span className={styles.colonDivider}>:</span>
        <div className={styles.timeBox}>
          <span className={styles.timeDigit}>{timeLeft.hours}</span>
          <span className={styles.timeLabel}>{lang === "si" ? "පැය" : "Hours"}</span>
        </div>
        <span className={styles.colonDivider}>:</span>
        <div className={styles.timeBox}>
          <span className={styles.timeDigit}>{timeLeft.minutes}</span>
          <span className={styles.timeLabel}>{lang === "si" ? "මිනිත්තු" : "Mins"}</span>
        </div>
        <span className={styles.colonDivider}>:</span>
        <div className={styles.timeBox}>
          <span className={styles.timeDigit}>{timeLeft.seconds}</span>
          <span className={styles.timeLabel}>{lang === "si" ? "තත්පර" : "Secs"}</span>
        </div>
      </motion.div>

      <div className={styles.calendarDivider} />

      {/* Calendar Section */}
      <h4 className={styles.calendarTitle}>
        {lang === "si" ? "මංගල දිනය" : "THE BIG DAY"}
      </h4>
      <p className={styles.calendarMonthName}>
        {lang === "si" ? date.monthSi : date.monthEn} {date.year}
      </p>

      <motion.table 
        className={styles.calendarTable}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <thead>
          <tr>
            {weekdays.map((w, idx) => (
              <th key={idx} className={styles.weekHeader}>{w}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((dayNum, cIdx) => (
                <td key={cIdx} className={styles.calendarDayCell}>
                  {dayNum === null ? (
                    <span className={styles.emptyCell}>-</span>
                  ) : dayNum === targetDay ? (
                    <div className={styles.circledDay}>
                      <svg className={styles.heartRing} viewBox="0 0 36 36" fill="none">
                        <path
                          d="M18 31s-10.5-6.5-13.5-12.5C1.8 13 4.5 7.5 10 7.5c3.2 0 6 2 8 5 2-3 4.8-5 8-5 5.5 0 8.2 5.5 5.5 11C28.5 24.5 18 31 18 31z"
                          stroke="var(--gold-primary, #B69B7E)"
                          strokeWidth="1.8"
                          fill="rgba(182, 155, 126, 0.18)"
                        />
                      </svg>
                      <span>{targetDay}</span>
                    </div>
                  ) : (
                    <span>{dayNum}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </motion.table>

      {/* Add to Calendar Button */}
      <motion.div 
        className={styles.calendarActions}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-gold"
        >
          <Calendar size={14} />
          <span>{lang === "si" ? "දින දර්ශනයට එක් කරන්න" : "Add to Calendar"}</span>
        </a>
      </motion.div>
    </motion.div>
  );
}


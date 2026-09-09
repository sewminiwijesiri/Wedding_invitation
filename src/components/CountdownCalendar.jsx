"use client";

import { useState, useEffect } from "react";
import styles from "./CountdownCalendar.module.css";
import { Calendar, Heart } from "lucide-react";

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

  // Calendar for November 2026 (Nov 1 is Sunday, 30 days)
  // Day of week: Dom (0), Lun (1), Mar (2), Mie (3), Jue (4), Vie (5), Sab (6)
  const weekdaysEs = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
  const weekdaysEn = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekdays = lang === "es" ? weekdaysEs : weekdaysEn;

  // Generate calendar days for November 2026 (Nov 1 is Sunday, 0 padding)
  const daysInMonth = 30;
  const firstDayIndex = 0; // Sunday
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
    const isEn = lang !== "es";
    const title = encodeURIComponent(`${weddingData.couple.bride} & ${weddingData.couple.groom} - ${isEn ? "Our Wedding" : "Nuestra Boda"}`);
    const details = encodeURIComponent(
      isEn
        ? `Ceremony: ${weddingData.events[0].venue} (${weddingData.events[0].time})\nReception: ${weddingData.events[1].venue} (${weddingData.events[1].time})`
        : `Ceremonia: ${weddingData.events[0].venue} (${weddingData.events[0].time})\nRecepción: ${weddingData.events[1].venue} (${weddingData.events[1].time})`
    );
    const location = encodeURIComponent(`${weddingData.events[0].venue}, ${weddingData.events[0].address}`);
    // 20261114T163000 to 20261115T020000
    const dates = "20261114T163000/20261115T020000";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <div className={styles.countdownCard}>
      {/* Date Header matching inspiration */}
      <div className={styles.dateHeaderRow}>
        <div className={styles.headerLine} />
        <div className={styles.dateBadge}>
          <span>{lang === "es" ? (date.dayNameEs || date.dayName).toUpperCase() : (date.dayNameEn || date.dayName).toUpperCase()}</span>
          <span className={styles.dayNumber}>{date.day}</span>
          <span>{date.year}</span>
        </div>
        <div className={styles.headerLine} />
      </div>

      {/* Countdown Clock */}
      <p className={styles.countdownTitle}>
        {lang === "es" ? "FALTAN" : "COUNTDOWN"}
      </p>

      <div className={styles.clockGrid}>
        <div className={styles.timeBox}>
          <span className={styles.timeDigit}>{timeLeft.days}</span>
          <span className={styles.timeLabel}>{lang === "es" ? "Días" : "Days"}</span>
        </div>
        <span className={styles.colonDivider}>:</span>
        <div className={styles.timeBox}>
          <span className={styles.timeDigit}>{timeLeft.hours}</span>
          <span className={styles.timeLabel}>{lang === "es" ? "Horas" : "Hours"}</span>
        </div>
        <span className={styles.colonDivider}>:</span>
        <div className={styles.timeBox}>
          <span className={styles.timeDigit}>{timeLeft.minutes}</span>
          <span className={styles.timeLabel}>{lang === "es" ? "Min" : "Min"}</span>
        </div>
        <span className={styles.colonDivider}>:</span>
        <div className={styles.timeBox}>
          <span className={styles.timeDigit}>{timeLeft.seconds}</span>
          <span className={styles.timeLabel}>{lang === "es" ? "Seg" : "Sec"}</span>
        </div>
      </div>

      <div className={styles.calendarDivider} />

      {/* Calendar Section */}
      <h4 className={styles.calendarTitle}>
        {lang === "es" ? "EL GRAN DÍA" : "THE BIG DAY"}
      </h4>
      <p className={styles.calendarMonthName}>
        {lang === "es" ? date.month : date.monthEn} {date.year}
      </p>

      <table className={styles.calendarTable}>
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
                  ) : dayNum === 14 ? (
                    <div className={styles.circledDay}>
                      <svg className={styles.heartRing} viewBox="0 0 36 36" fill="none">
                        <path
                          d="M18 31s-10.5-6.5-13.5-12.5C1.8 13 4.5 7.5 10 7.5c3.2 0 6 2 8 5 2-3 4.8-5 8-5 5.5 0 8.2 5.5 5.5 11C28.5 24.5 18 31 18 31z"
                          stroke="#D4AF37"
                          strokeWidth="1.8"
                          fill="rgba(212, 175, 55, 0.15)"
                        />
                      </svg>
                      <span>14</span>
                    </div>
                  ) : (
                    <span>{dayNum}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add to Calendar Button */}
      <div className={styles.calendarActions}>
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-gold"
        >
          <Calendar size={14} />
          <span>{lang === "es" ? "Agregar a Calendario" : "Add to Calendar"}</span>
        </a>
      </div>
    </div>
  );
}

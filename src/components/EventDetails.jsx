"use client";

import { useState } from "react";
import styles from "./EventDetails.module.css";
import { Church, Wine, MapPin, ExternalLink, Check, Crown } from "lucide-react";

export default function EventDetails({ weddingData, lang }) {
  const [copied, setCopied] = useState(false);
  const isSi = lang === "si";
  const { events, location } = weddingData;

  const handleCopyAddress = (text) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hallName = isSi ? (location?.hallSi || "ක්වීන්ස් බෝල්රූම් ශාලාව") : (location?.hall || "Queen's Ballroom Hall");
  const hotelName = isSi ? (location?.nameSi || "රෝයල් රෙස්ට් හවුස්, පේරාදෙණිය") : (location?.name || "Royal Rest House, Peradeniya");
  const addressText = isSi ? (location?.addressSi || "නුවර පාර, පේරාදෙණිය") : (location?.address || "Kandy Road, Peradeniya");
  const mapQuery = location?.mapQuery || "Royal Rest House Peradeniya";
  const mapUrl = location?.mapUrl || "https://maps.google.com/?q=Royal+Rest+House+Peradeniya";

  return (
    <section className={styles.eventSection}>
      {/* Event Details Cards */}
      {events.map((evt) => (
        <div key={evt.id} className={styles.eventCard}>
          <div className={styles.iconWrapper}>
            {evt.type === "religious" || evt.type === "church" ? (
              <Church size={26} strokeWidth={1.5} />
            ) : evt.type === "ceremony" ? (
              <Crown size={26} strokeWidth={1.5} />
            ) : (
              <Wine size={26} strokeWidth={1.5} />
            )}
          </div>

          <h3 className={styles.eventTitle}>{evt.title[lang]}</h3>
          <p className={styles.eventTime}>{isSi ? (evt.timeSi || evt.time) : evt.time}</p>
          <h4 className={styles.venueName}>{isSi ? (evt.venueSi || evt.venue) : evt.venue}</h4>
          <p className={styles.eventNote}>{evt.note[lang]}</p>
        </div>
      ))}

      {/* Single Unified Venue & Location Map Card */}
      <div className={styles.venueMapCard}>
        <div className={styles.mapPinBadge}>
          <MapPin size={22} />
        </div>

        <p className={styles.venueSectionTitle}>
          {isSi ? "මංගල ස්ථානය සහ සිතියම" : "WEDDING VENUE & MAP"}
        </p>

        <h3 className={styles.venueTitle}>{hallName}</h3>
        <p className={styles.venueHotel}>{hotelName}</p>
        <p className={styles.venueAddress}>{addressText}</p>

        {/* Single Interactive Map Embed */}
        <div className={styles.mapEmbedFrame}>
          <iframe
            title={`Map ${hallName}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              mapQuery
            )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          />
        </div>

        {/* Map Actions: Copy Address and Open in Google Maps */}
        <div className={styles.mapActions}>
          <button
            className="btn-outline-gold"
            onClick={() => handleCopyAddress(`${hallName}, ${hotelName}, ${addressText}`)}
          >
            {copied ? <Check size={14} /> : <MapPin size={14} />}
            <span>
              {copied
                ? (isSi ? "පිටපත් විය!" : "Copied!")
                : (isSi ? "ලිපිනය පිටපත් කරන්න" : "Copy Address")}
            </span>
          </button>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <span>{isSi ? "සිතියම විවෘත කරන්න" : "Open in Maps"}</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

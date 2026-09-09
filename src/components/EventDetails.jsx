"use client";

import { useState } from "react";
import styles from "./EventDetails.module.css";
import { Church, Wine, MapPin, ExternalLink, X, Check } from "lucide-react";

export default function EventDetails({ weddingData, lang }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = (text) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className={styles.eventSection}>
      {weddingData.events.map((evt) => (
        <div key={evt.id} className={styles.eventCard}>
          <div className={styles.iconWrapper}>
            {evt.type === "religious" ? (
              <Church size={26} strokeWidth={1.5} />
            ) : (
              <Wine size={26} strokeWidth={1.5} />
            )}
          </div>

          <h3 className={styles.eventTitle}>{evt.title[lang]}</h3>
          <p className={styles.eventTime}>{evt.time}</p>
          <h4 className={styles.venueName}>{evt.venue}</h4>
          <p className={styles.venueAddress}>{evt.address}</p>
          <p className={styles.eventNote}>{evt.note[lang]}</p>

          <button
            onClick={() => setSelectedEvent(evt)}
            className="btn-outline-gold"
          >
            <MapPin size={14} />
            <span>{lang === "es" ? "Ver Ubicación" : "View Location"}</span>
          </button>
        </div>
      ))}

      {/* Interactive Map Modal */}
      {selectedEvent && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedEvent(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedEvent(null)}
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>

            <h3 className={styles.modalVenueTitle}>{selectedEvent.venue}</h3>
            <p className={styles.modalVenueAddress}>{selectedEvent.address}</p>

            <div className={styles.mapEmbedFrame}>
              <iframe
                title={`Mapa ${selectedEvent.venue}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  selectedEvent.venue + " " + selectedEvent.address
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            </div>

            <div className={styles.mapActions}>
              <button
                className="btn-outline-gold"
                onClick={() => handleCopyAddress(selectedEvent.address)}
              >
                {copied ? <Check size={14} /> : <MapPin size={14} />}
                <span>{copied ? (lang === "es" ? "Copiado!" : "Copied!") : (lang === "es" ? "Copiar Dirección" : "Copy Address")}</span>
              </button>

              <a
                href={selectedEvent.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <span>{lang === "es" ? "Abrir en Maps" : "Open in Maps"}</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import styles from "./EventDetails.module.css";
import { ExternalLink, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function EventDetails({ weddingData, lang }) {
  const isSi = lang === "si";
  const { events, location } = weddingData;

  const hallName = isSi ? (location?.hallSi || "ක්වීන්ස් බෝල්රූම් ශාලාව") : (location?.hall || "Queen's Ballroom Hall");
  const hotelName = isSi ? (location?.nameSi || "රෝයල් රෙස්ට් හවුස්, පේරාදෙණිය") : (location?.name || "Royal Rest House, Peradeniya");
  const addressText = isSi ? (location?.addressSi || "නුවර පාර, පේරාදෙණිය") : (location?.address || "Kandy Road, Peradeniya");
  const mapQuery = location?.mapQuery || "Royal Rest House Peradeniya";
  const mapUrl = location?.mapUrl || "https://maps.google.com/?q=Royal+Rest+House+Peradeniya";

  return (
    <motion.section 
      className={styles.eventSection}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <p className={styles.sectionKicker}>
          {isSi ? "මංගල උත්සවය" : "THE CEREMONY & RECEPTION"}
        </p>
      </div>

      {/* Simplified Events Flow */}
      <div className={styles.eventsList}>
        {events.map((evt, idx) => (
          <motion.div 
            key={evt.id} 
            className={styles.eventItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            <h3 className={styles.eventTitle}>{evt.title[lang]}</h3>
            <p className={styles.eventTime}>{isSi ? (evt.timeSi || evt.time) : evt.time}</p>
            <p className={styles.eventNote}>{evt.note[lang]}</p>
            {idx < events.length - 1 && (
              <div className={styles.coupleDivider}>
                <img
                  src="/images/kandyan_couple.png"
                  alt="Kandyan Couple"
                  className={styles.kandyanCoupleImg}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className={styles.venueDivider} />

      {/* Hotel Preview Photo */}
      <motion.div 
        className={styles.hotelImageWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <img
          src="/images/hotel.jpeg"
          alt="Royal Rest House Hotel Venue"
          className={styles.hotelImage}
        />
      </motion.div>

      {/* Single Unified Venue & Location Map */}
      <motion.div 
        className={styles.venueContainer}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
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

        {/* Map Action: Open in Google Maps */}
        <div className={styles.mapActions}>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <span>{isSi ? "සිතියම විවෘත කරන්න" : "Open in Maps"}</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}


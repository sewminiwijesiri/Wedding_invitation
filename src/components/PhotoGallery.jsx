"use client";

import styles from "./PhotoGallery.module.css";

export default function PhotoGallery({ weddingData, lang }) {
  const photo = weddingData.gallery[1]; // Walk photo

  return (
    <div className={styles.gallerySection}>
      <div className={styles.featuredPhotoCard}>
        <img
          src={photo.src}
          alt={photo.caption[lang]}
          className={styles.galleryImg}
        />
        <div className={styles.photoCaptionOverlay}>
          <span className={styles.photoTag}>{photo.tag}</span>
          <p className={styles.captionText}>"{photo.caption[lang]}"</p>
        </div>
      </div>
    </div>
  );
}

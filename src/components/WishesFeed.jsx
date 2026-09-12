"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./WishesFeed.module.css";
import { MessageSquareHeart, RefreshCw } from "lucide-react";
import { fetchWishesFromSupabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

export default function WishesFeed({ lang, refreshKey }) {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadWishes = useCallback(async () => {
    setLoading(true);
    const res = await fetchWishesFromSupabase(50);
    if (res.success && res.data) {
      setWishes(res.data);
    } else {
      setWishes([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (mounted) {
      loadWishes();
    }
  }, [loadWishes, refreshKey, mounted]);

  const formatDate = (isoString) => {
    if (!isoString) return "";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(lang === "si" ? "si-LK" : "en-US", {
        month: "short",
        day: "numeric"
      });
    } catch (e) {
      return "";
    }
  };

  if (!mounted) {
    return (
      <div className={styles.wishesCard} id="guestbook">
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <MessageSquareHeart size={24} strokeWidth={1.5} />
          </div>
          <h3 className={styles.title}>
            {lang === "si" ? "අමුත්තන්ගේ ආශිර්වාද සහ සුබපැතුම්" : "Guestbook & Wishes"}
          </h3>
        </div>
        <div className={styles.emptyState}>
          <RefreshCw size={20} className="animate-spin" style={{ margin: "0 auto 8px" }} />
          <span>{lang === "si" ? "සුබපැතුම් ලබා ගනිමින්..." : "Loading wishes..."}</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.wishesCard} 
      id="guestbook" 
      suppressHydrationWarning
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <MessageSquareHeart size={24} strokeWidth={1.5} />
        </div>
        <h3 className={styles.title}>
          {lang === "si" ? "අමුත්තන්ගේ ආශිර්වාද සහ සුබපැතුම්" : "Guestbook & Wishes"}
        </h3>
        <p className={styles.subtitle}>
          {lang === "si"
            ? "අපගේ හිතමිතුරන් විසින් තබන ලද ආදරණීය සුබපැතුම්"
            : "Warm wishes shared by our loving family and friends"}
        </p>
      </div>

      {loading ? (
        <div className={styles.emptyState}>
          <RefreshCw size={20} className="animate-spin" style={{ margin: "0 auto 8px" }} />
          <span>{lang === "si" ? "සුබපැතුම් ලබා ගනිමින්..." : "Loading wishes..."}</span>
        </div>
      ) : wishes.length === 0 ? (
        <div className={styles.emptyState}>
          <p>
            {lang === "si"
              ? "තවම සුබපැතුම් එක් කර නැත. පළමු සුබපැතුම තබන්නා ඔබ වන්න!"
              : "No wishes shared yet. Be the first to send your blessings above!"}
          </p>
        </div>
      ) : (
        <div className={styles.feedGrid}>
          {wishes.map((item, idx) => (
            <motion.div 
              key={item.id} 
              className={styles.wishBubble}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <div className={styles.wishHeader}>
                <span className={styles.guestName}>{item.name}</span>
                <span className={styles.wishDate} suppressHydrationWarning>{formatDate(item.created_at)}</span>
              </div>
              <p className={styles.wishMessage}>"{item.message}"</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}


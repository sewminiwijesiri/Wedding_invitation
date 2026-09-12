"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./MusicPlayer.module.css";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer({ weddingData, lang, autoPlaySignal }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const musicInfo = weddingData?.music || {
    title: "Wildest Dreams",
    artist: "Taylor Swift",
    audioSrc: "/audio/Wildest Dreams.mp3",
    subtitle: { en: "Play our favorite song", si: "අපගේ ආදර ගීතයට සවන් දෙන්න" }
  };

  const audioSrc = musicInfo.audioSrc || "/audio/Wildest Dreams.mp3";

  // Audio Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Autoplay handler
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startPlayback = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        // If autoplay blocked by browser policy, play on first user interaction
        const handleUserGesture = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
          } catch (e) {}
          window.removeEventListener("click", handleUserGesture);
          window.removeEventListener("touchstart", handleUserGesture);
        };
        window.addEventListener("click", handleUserGesture, { once: true });
        window.addEventListener("touchstart", handleUserGesture, { once: true });
      }
    };

    startPlayback();
  }, [autoPlaySignal]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("Audio play error:", err);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = newPercent * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSkipBack = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const handleSkipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(duration, audio.currentTime + 10);
  };

  const handleShuffle = () => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const randomTime = Math.random() * duration;
    audio.currentTime = randomTime;
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div 
      className={styles.playerCard}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={encodeURI(audioSrc)} preload="metadata" />

      <h3 className={styles.songPrompt}>
        {musicInfo.subtitle[lang] || musicInfo.subtitle.en}
      </h3>
      <p className={styles.songTitle}>
        {musicInfo.title} {musicInfo.artist ? `— ${musicInfo.artist}` : ""}
      </p>

      {/* Animated Equalizer Bars */}
      <div className={styles.equalizerContainer}>
        <div className={`eq-bar ${isPlaying ? "active" : ""}`} style={{ height: isPlaying ? "16px" : "6px" }} />
        <div className={`eq-bar ${isPlaying ? "active" : ""}`} style={{ height: isPlaying ? "24px" : "10px" }} />
        <div className={`eq-bar ${isPlaying ? "active" : ""}`} style={{ height: isPlaying ? "18px" : "8px" }} />
        <div className={`eq-bar ${isPlaying ? "active" : ""}`} style={{ height: isPlaying ? "26px" : "12px" }} />
        <div className={`eq-bar ${isPlaying ? "active" : ""}`} style={{ height: isPlaying ? "14px" : "6px" }} />
        <div className={`eq-bar ${isPlaying ? "active" : ""}`} style={{ height: isPlaying ? "22px" : "9px" }} />
        <div className={`eq-bar ${isPlaying ? "active" : ""}`} style={{ height: isPlaying ? "12px" : "5px" }} />
      </div>

      {/* Controls */}
      <div className={styles.controlsRow}>
        <button 
          className={styles.controlBtn} 
          title="Random seek"
          onClick={handleShuffle}
        >
          <Shuffle size={16} />
        </button>

        <button 
          className={styles.controlBtn} 
          title="Rewind 10s"
          onClick={handleSkipBack}
        >
          <SkipBack size={18} />
        </button>

        <button 
          className={styles.playPauseBtn} 
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause size={22} fill="#1A1A1A" />
          ) : (
            <Play size={22} fill="#1A1A1A" style={{ marginLeft: "2px" }} />
          )}
        </button>

        <button 
          className={styles.controlBtn} 
          title="Forward 10s"
          onClick={handleSkipForward}
        >
          <SkipForward size={18} />
        </button>

        <button 
          className={styles.controlBtn} 
          title={isMuted ? "Unmute" : "Mute"}
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Progress Track */}
      <div className={styles.progressContainer}>
        <span className={styles.timeText}>{formatTime(currentTime)}</span>
        <div className={styles.progressBar} onClick={handleSeek}>
          <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
        </div>
        <span className={styles.timeText}>{formatTime(duration)}</span>
      </div>
    </motion.div>
  );
}



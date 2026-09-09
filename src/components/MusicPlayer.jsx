"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./MusicPlayer.module.css";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle } from "lucide-react";

export default function MusicPlayer({ weddingData, lang, isAutoPlaying }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(12);
  const [currentTime, setCurrentTime] = useState(18);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const melodyStepRef = useRef(0);

  const duration = 195; // 3:15

  // Romantic chord progression notes in Hz (D - A - Bm - F#m - G - D - G - A)
  const chordNotes = [
    [293.66, 369.99, 440.00, 587.33], // D maj
    [220.00, 277.18, 329.63, 440.00], // A maj
    [246.94, 293.66, 369.99, 493.88], // B min
    [185.00, 220.00, 277.18, 369.99], // F# min
    [196.00, 246.94, 293.66, 392.00], // G maj
    [146.83, 220.00, 293.66, 369.99], // D maj low
    [196.00, 293.66, 392.00, 493.88], // G maj
    [220.00, 277.18, 329.63, 440.00], // A maj
  ];

  // Play a soft acoustic tone using Web Audio API
  const playRomanticNote = (freq, gainVal = 0.08, delay = 0) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.value = 1400; // Warm soft piano tone

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      const startTime = ctx.currentTime + delay;
      gainNode.gain.setValueAtTime(0.0001, startTime);
      gainNode.gain.linearRampToValueAtTime(gainVal, startTime + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.85);
    } catch (err) {
      console.warn("Audio playback note error", err);
    }
  };

  const playChordStep = () => {
    const chord = chordNotes[melodyStepRef.current % chordNotes.length];
    melodyStepRef.current += 1;

    // Arpeggiate notes
    chord.forEach((note, idx) => {
      playRomanticNote(note, 0.07, idx * 0.18);
    });
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlaying(true);
      playChordStep();
      timerRef.current = setInterval(() => {
        playChordStep();
        setCurrentTime((prev) => {
          const next = (prev + 1) % duration;
          setProgress(Math.round((next / duration) * 100));
          return next;
        });
      }, 1400);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className={styles.playerCard}>
      <h3 className={styles.songPrompt}>
        {weddingData.music.subtitle[lang]}
      </h3>
      <p className={styles.songTitle}>
        {weddingData.music.title}
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
          title="Shuffle"
          onClick={() => { melodyStepRef.current = Math.floor(Math.random() * chordNotes.length); if (isPlaying) playChordStep(); }}
        >
          <Shuffle size={16} />
        </button>

        <button 
          className={styles.controlBtn} 
          title="Previous"
          onClick={() => { melodyStepRef.current = Math.max(0, melodyStepRef.current - 1); if (isPlaying) playChordStep(); }}
        >
          <SkipBack size={18} />
        </button>

        <button 
          className={styles.playPauseBtn} 
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause size={22} fill="#1A1A1A" /> : <Play size={22} fill="#1A1A1A" style={{ marginLeft: "2px" }} />}
        </button>

        <button 
          className={styles.controlBtn} 
          title="Next"
          onClick={() => { melodyStepRef.current += 1; if (isPlaying) playChordStep(); }}
        >
          <SkipForward size={18} />
        </button>

        <button 
          className={styles.controlBtn} 
          title={isMuted ? "Unmute" : "Mute"}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Progress Track */}
      <div className={styles.progressContainer}>
        <span className={styles.timeText}>{formatTime(currentTime)}</span>
        <div 
          className={styles.progressBar}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newPercent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
            setProgress(newPercent);
            setCurrentTime(Math.round((newPercent / 100) * duration));
          }}
        >
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.timeText}>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

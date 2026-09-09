"use client";

import { useState } from "react";
import styles from "./GiftRegistry.module.css";
import { Gift, Copy, Check } from "lucide-react";

export default function GiftRegistry({ weddingData, lang }) {
  const { giftRegistry } = weddingData;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const isEn = lang !== "es";
    const textToCopy = isEn
      ? `Bank: ${giftRegistry.bankDetails.bank}\nAccount Holder: ${giftRegistry.bankDetails.holder}\nRouting / CLABE: ${giftRegistry.bankDetails.clabe}\nAccount Number: ${giftRegistry.bankDetails.account}\nReference: ${giftRegistry.bankDetails.concept}`
      : `Banco: ${giftRegistry.bankDetails.bank}\nTitular: ${giftRegistry.bankDetails.holder}\nCLABE: ${giftRegistry.bankDetails.clabe}\nCuenta: ${giftRegistry.bankDetails.account}\nConcepto: ${giftRegistry.bankDetails.concept}`;

    if (navigator?.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className={styles.registryCard}>
      <div className={styles.giftIconWrapper}>
        <Gift size={24} />
      </div>

      <h3 className={styles.registryTitle}>{giftRegistry.title[lang]}</h3>
      <p className={styles.registryMessage}>{giftRegistry.message[lang]}</p>

      {/* QR Code Container matching inspiration */}
      <div className={styles.qrCodeWrapper}>
        <div className={styles.qrFrame}>
          {/* Detailed SVG QR Code with Gold & Charcoal accents */}
          <svg className={styles.qrSvg} viewBox="0 0 160 160" fill="none">
            <rect width="160" height="160" fill="#FCFAF7" rx="8" />
            
            {/* Corner Position Markers */}
            {/* Top-Left */}
            <rect x="14" y="14" width="34" height="34" rx="4" stroke="#1A1A1A" strokeWidth="6" />
            <rect x="23" y="23" width="16" height="16" rx="2" fill="#D4AF37" />

            {/* Top-Right */}
            <rect x="112" y="14" width="34" height="34" rx="4" stroke="#1A1A1A" strokeWidth="6" />
            <rect x="121" y="23" width="16" height="16" rx="2" fill="#D4AF37" />

            {/* Bottom-Left */}
            <rect x="14" y="112" width="34" height="34" rx="4" stroke="#1A1A1A" strokeWidth="6" />
            <rect x="23" y="121" width="16" height="16" rx="2" fill="#D4AF37" />

            {/* Data patterns (simulated QR matrices) */}
            <path
              d="M58 18h8v8h-8z M76 18h8v8h-8z M94 18h8v8h-8z
                 M58 36h16v8H58z M84 36h18v8H84z
                 M18 58h8v16h-8z M36 58h8v8h-8z M44 66h16v8H44z
                 M70 58h14v8H70z M94 58h8v16h-8z M112 58h16v8h-16z M138 58h8v8h-8z
                 M18 84h8v8h-8z M36 84h16v8H36z M62 84h8v16h-8z M80 76h8v16h-8z
                 M98 84h14v8H98z M122 76h16v8h-16z M138 84h8v16h-8z
                 M58 102h16v8H58z M84 102h8v14h-8z M102 102h18v8h-18z
                 M58 120h8v16h-8z M76 120h16v8H76z M102 120h8v8h-8z M120 120h18v8h-18z
                 M68 138h16v8H68z M94 138h26v8H94z M130 138h8v8h-8z"
              fill="#222222"
            />

            {/* Center Heart Emblem */}
            <circle cx="80" cy="80" r="15" fill="#FCFAF7" stroke="#D4AF37" strokeWidth="2" />
            <path
              d="M80 87s-5-3.2-6.5-6c-1.3-2.3 0-4.8 2.5-4.8 1.5 0 2.8 1 4 2.4 1.2-1.4 2.5-2.4 4-2.4 2.5 0 3.8 2.5 2.5 4.8C85 83.8 80 87 80 87z"
              fill="#D4AF37"
            />
          </svg>
        </div>
        <p className={styles.qrScanHint}>
          {lang === "es" ? "Escanear para transferir" : "Scan to send digital gift"}
        </p>
      </div>

      {/* Bank Details */}
      <div className={styles.bankDetailsBox}>
        <div className={styles.bankRow}>
          <span className={styles.bankLabel}>{lang === "es" ? "Banco" : "Bank"}</span>
          <span className={styles.bankValue}>{giftRegistry.bankDetails.bank}</span>
        </div>
        <div className={styles.bankRow}>
          <span className={styles.bankLabel}>{lang === "es" ? "Beneficiario" : "Holder"}</span>
          <span className={styles.bankValue}>{giftRegistry.bankDetails.holder}</span>
        </div>
        <div className={styles.bankRow}>
          <span className={styles.bankLabel}>{lang === "es" ? "CLABE" : "Routing / CLABE"}</span>
          <span className={styles.bankValue}>{giftRegistry.bankDetails.clabe}</span>
        </div>
        <div className={styles.bankRow}>
          <span className={styles.bankLabel}>{lang === "es" ? "Cuenta" : "Account"}</span>
          <span className={styles.bankValue}>{giftRegistry.bankDetails.account}</span>
        </div>
      </div>

      {/* Copy Button */}
      <button className="btn-gold" onClick={handleCopy}>
        {copied ? <Check size={16} /> : <Copy size={16} />}
        <span>{copied ? (lang === "es" ? "¡Datos Copiados!" : "Copied!") : (lang === "es" ? "Copiar Datos Bancarios" : "Copy Bank Details")}</span>
      </button>

      {copied && (
        <div>
          <div className={styles.copySuccessToast}>
            <Check size={14} />
            <span>{lang === "es" ? "Datos copiados al portapapeles con éxito" : "Information copied to clipboard"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

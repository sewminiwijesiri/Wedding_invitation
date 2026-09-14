"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../admin/admin.module.css";
import { Lock, ShieldCheck, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState(false);
  const router = useRouter();

  const requiredPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "wedding2026";

  useEffect(() => {
    setMounted(true);
    // If already logged in, redirect immediately to admin dashboard
    if (typeof window !== "undefined") {
      const savedAuth = sessionStorage.getItem("wedding_admin_auth");
      if (savedAuth === "true") {
        router.push("/admin");
      }
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === requiredPassword) {
      sessionStorage.setItem("wedding_admin_auth", "true");
      setPassError(false);
      router.push("/admin");
    } else {
      setPassError(true);
    }
  };

  if (!mounted) {
    return (
      <main className={styles.adminPage} suppressHydrationWarning>
        <div className={styles.loginContainer}>
          <div className={styles.loginCard}>
            <RefreshCw size={24} className="animate-spin" style={{ margin: "0 auto 12px", color: "#D4AF37" }} />
            <p style={{ color: "#A09587", fontSize: "0.9rem" }}>Loading portal...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.adminPage} suppressHydrationWarning>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginIcon}>
            <Lock size={26} strokeWidth={1.5} />
          </div>
          <h2 className={styles.loginTitle}>Client Admin Login</h2>
          <p className={styles.loginSubtitle}>Enter password to manage RSVPs and view guest headcount</p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className={styles.passwordInput}
              autoFocus
            />

            {passError && (
              <div style={{ color: "#EF5350", fontSize: "0.8rem", marginBottom: "14px" }}>
                Incorrect password. Please try again.
              </div>
            )}

            <button type="submit" className={styles.loginBtn}>
              <ShieldCheck size={18} />
              <span>Login to Dashboard</span>
            </button>
          </form>

          <div style={{ marginTop: "24px" }}>
            <Link href="/" style={{ color: "#A09587", fontSize: "0.82rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <ArrowLeft size={14} /> Back to Invitation
            </Link>
          </div>
        </div>
      </div >
    </main>
  );
}

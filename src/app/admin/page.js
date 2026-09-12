"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./admin.module.css";
import { 
  Lock, 
  Users, 
  UserCheck, 
  UserX, 
  MessageSquare, 
  Search, 
  Download, 
  RefreshCw, 
  Trash2, 
  ArrowLeft, 
  ShieldCheck
} from "lucide-react";
import { fetchAdminRsvpList, deleteRsvpRecord, isSupabaseConfigured } from "@/lib/supabaseClient";

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState(false);

  const [rsvpList, setRsvpList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | attending | declined

  const requiredPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "wedding2026";

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedAuth = sessionStorage.getItem("wedding_admin_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const loadAdminData = useCallback(async () => {
    setLoading(true);
    const res = await fetchAdminRsvpList();

    if (res.success && res.data) {
      setRsvpList(res.data);
    } else {
      setRsvpList([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (mounted && isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated, loadAdminData, mounted]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.trim() === requiredPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("wedding_admin_auth", "true");
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("wedding_admin_auth");
  };

  const handleDelete = async (id, name) => {
    if (confirm(`Are you sure you want to remove the RSVP for "${name}"?`)) {
      if (isSupabaseConfigured) {
        await deleteRsvpRecord(id);
      }
      setRsvpList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Compute Metrics
  const stats = useMemo(() => {
    const totalResponses = rsvpList.length;
    const attendingResponses = rsvpList.filter((r) => r.attending);
    const totalGuestsAttending = attendingResponses.reduce((sum, r) => sum + (Number(r.guests) || 1), 0);
    const declinedCount = rsvpList.filter((r) => !r.attending).length;
    const wishesCount = rsvpList.filter((r) => r.message && r.message.trim() !== "").length;

    return {
      totalResponses,
      acceptedResponsesCount: attendingResponses.length,
      totalGuestsAttending,
      declinedCount,
      wishesCount
    };
  }, [rsvpList]);

  // Filtered List
  const filteredList = useMemo(() => {
    return rsvpList.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.message && item.message.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = 
        statusFilter === "all" ? true :
        statusFilter === "attending" ? item.attending :
        !item.attending;

      return matchesSearch && matchesStatus;
    });
  }, [rsvpList, searchQuery, statusFilter]);

  // Export CSV
  const exportToCSV = () => {
    if (filteredList.length === 0) return;

    const headers = ["Name", "Attending", "Guests Count", "Message", "Date Submitted"];
    const rows = filteredList.map((item) => [
      `"${item.name.replace(/"/g, '""')}"`,
      item.attending ? "Attending" : "Declined",
      item.attending ? item.guests : 0,
      `"${(item.message || "").replace(/"/g, '""')}"`,
      `"${new Date(item.created_at).toLocaleString()}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wedding_rsvp_list_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // Login Screen
  if (!isAuthenticated) {
    return (
      <main className={styles.adminPage} suppressHydrationWarning>
        <div className={styles.loginContainer}>
          <div className={styles.loginCard}>
            <div className={styles.loginIcon}>
              <Lock size={26} strokeWidth={1.5} />
            </div>
            <h2 className={styles.loginTitle}>Admin Portal</h2>
            <p className={styles.loginSubtitle}>Enter client password to access RSVP manager</p>

            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={styles.passwordInput}
                autoFocus
              />

              {passError && (
                <div style={{ color: "#EF5350", fontSize: "0.8rem", marginBottom: "14px" }}>
                  Incorrect password. Try default: <strong>{requiredPassword}</strong>
                </div>
              )}

              <button type="submit" className={styles.loginBtn}>
                <ShieldCheck size={18} />
                <span>Login to Dashboard</span>
              </button>
            </form>

            <div style={{ marginTop: "24px" }}>
              <a href="/" style={{ color: "#A09587", fontSize: "0.82rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <ArrowLeft size={14} /> Back to Invitation
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.adminPage} suppressHydrationWarning>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Wedding RSVP Dashboard</h1>
            <p className={styles.subtitle}>Guest responses & headcount analytics</p>
          </div>

          <div className={styles.headerActions}>
            <button onClick={loadAdminData} className={styles.btnOutline} title="Refresh data">
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>

            <button onClick={exportToCSV} className={styles.btnOutline} title="Export CSV for venue/catering" disabled={filteredList.length === 0}>
              <Download size={14} />
              <span>Export CSV</span>
            </button>

            <button onClick={handleLogout} className={styles.btnOutline} style={{ borderColor: "rgba(255,255,255,0.2)", color: "#A09587" }}>
              Logout
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span>Attending Headcount</span>
              <Users size={18} color="#D4AF37" />
            </div>
            <div className={styles.statValue}>{stats.totalGuestsAttending}</div>
            <div className={styles.statSubtext}>Total guest seats reserved for venue</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span>Accepted RSVPs</span>
              <UserCheck size={18} color="#81C784" />
            </div>
            <div className={styles.statValue}>{stats.acceptedResponsesCount}</div>
            <div className={styles.statSubtext}>Invitation responses confirmed yes</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span>Declined RSVPs</span>
              <UserX size={18} color="#E57373" />
            </div>
            <div className={styles.statValue}>{stats.declinedCount}</div>
            <div className={styles.statSubtext}>Guests unable to attend</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span>Wishes Received</span>
              <MessageSquare size={18} color="#64B5F6" />
            </div>
            <div className={styles.statValue}>{stats.wishesCount}</div>
            <div className={styles.statSubtext}>Messages left in guestbook</div>
          </div>
        </section>

        {/* Controls */}
        <section className={styles.controlsBar}>
          <div className={styles.searchBox}>
            <Search size={16} color="#A09587" />
            <input
              type="text"
              placeholder="Search guest by name or wish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterTab} ${statusFilter === "all" ? styles.active : ""}`}
              onClick={() => setStatusFilter("all")}
            >
              All ({stats.totalResponses})
            </button>
            <button
              className={`${styles.filterTab} ${statusFilter === "attending" ? styles.active : ""}`}
              onClick={() => setStatusFilter("attending")}
            >
              Attending ({stats.acceptedResponsesCount})
            </button>
            <button
              className={`${styles.filterTab} ${statusFilter === "declined" ? styles.active : ""}`}
              onClick={() => setStatusFilter("declined")}
            >
              Declined ({stats.declinedCount})
            </button>
          </div>
        </section>

        {/* Table */}
        <section className={styles.tableWrapper}>
          {loading ? (
            <div className={styles.emptyTable}>
              <RefreshCw size={24} className="animate-spin" style={{ margin: "0 auto 8px" }} />
              <span>Loading RSVP entries from database...</span>
            </div>
          ) : filteredList.length === 0 ? (
            <div className={styles.emptyTable}>
              No RSVP entries found in database.
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Guest Name</th>
                  <th>Status</th>
                  <th>Guests</th>
                  <th>Wish / Message</th>
                  <th>Date</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, color: "#FFF" }}>{item.name}</td>
                    <td>
                      {item.attending ? (
                        <span className={`${styles.statusBadge} ${styles.statusAttending}`}>
                          <UserCheck size={12} /> Attending
                        </span>
                      ) : (
                        <span className={`${styles.statusBadge} ${styles.statusDeclined}`}>
                          <UserX size={12} /> Declined
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: "center", fontWeight: 700 }}>
                      {item.attending ? item.guests : "-"}
                    </td>
                    <td style={{ maxWidth: "300px", fontSize: "0.85rem", fontStyle: item.message ? "italic" : "normal", color: item.message ? "#ECE5DB" : "#7A7063" }}>
                      {item.message ? `"${item.message}"` : "No message"}
                    </td>
                    <td style={{ fontSize: "0.78rem", color: "#8C8275" }} suppressHydrationWarning>
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        className={styles.deleteBtn}
                        title="Delete record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </main>
  );
}

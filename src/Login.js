import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 seconds cooldown on 5 failures

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const navigate = useNavigate();

  // Check lockout on mount and tick countdown
  useEffect(() => {
    const checkLockout = () => {
      const lockUntil = parseInt(localStorage.getItem("pb_login_lockout") || "0", 10);
      const now = Date.now();
      if (lockUntil > now) {
        setLockoutRemaining(Math.ceil((lockUntil - now) / 1000));
      } else {
        setLockoutRemaining(0);
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {
    if (lockoutRemaining > 0) {
      setError(`Too many failed attempts. Please wait ${lockoutRemaining}s before trying again.`);
      return;
    }

    const cleanEmail = email.trim();
    const cleanPassword = password;

    if (!cleanEmail || !cleanPassword) {
      setError("Please enter both email and password.");
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (authError) {
        // Increment failed attempts
        const attempts = parseInt(localStorage.getItem("pb_login_attempts") || "0", 10) + 1;
        if (attempts >= MAX_ATTEMPTS) {
          const lockUntil = Date.now() + LOCKOUT_DURATION_MS;
          localStorage.setItem("pb_login_lockout", lockUntil.toString());
          localStorage.setItem("pb_login_attempts", "0");
          setLockoutRemaining(Math.ceil(LOCKOUT_DURATION_MS / 1000));
          setError(`Account temporarily locked due to repeated failed attempts. Please wait 60s.`);
        } else {
          localStorage.setItem("pb_login_attempts", attempts.toString());
          setError(`Invalid login credentials. (${MAX_ATTEMPTS - attempts} attempts remaining)`);
        }
        setLoading(false);
        return;
      }

      // Reset attempts on successful login
      localStorage.removeItem("pb_login_attempts");
      localStorage.removeItem("pb_login_lockout");

      const isAdmin = data.user?.user_metadata?.role === "admin";
      setLoading(false);
      navigate(isAdmin ? "/admin" : "/dashboard");
    } catch (err) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const isLocked = lockoutRemaining > 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#060912",
      color: "#e8edf7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Outfit',sans-serif",
      position: "relative",
      overflow: "hidden",
      padding: "1.5rem",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes loginGlow {
          0%,100% { box-shadow:0 0 50px rgba(37,99,235,.15),0 30px 80px rgba(0,0,0,.5); }
          50%     { box-shadow:0 0 80px rgba(34,211,238,.18),0 30px 80px rgba(0,0,0,.5); }
        }
      `}</style>

      {/* ambient orbs */}
      <div style={{ position: "absolute", top: "20%", left: "20%", width: 400, height: 400, background: "radial-gradient(circle,rgba(37,99,235,.1),transparent 70%)", pointerEvents: "none", filter: "blur(20px)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "15%", width: 300, height: 300, background: "radial-gradient(circle,rgba(34,211,238,.07),transparent 70%)", pointerEvents: "none", filter: "blur(20px)" }} />

      <div style={{
        width: "100%",
        maxWidth: 440,
        background: "rgba(8,6,22,.93)",
        border: "1px solid rgba(37,99,235,.2)",
        borderRadius: 22,
        padding: "2.8rem",
        backdropFilter: "blur(32px)",
        animation: "fadeUp .7s cubic-bezier(.22,1,.36,1) both, loginGlow 6s ease-in-out infinite",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#2563eb,#22d3ee,transparent)" }} />

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", marginBottom: "1.6rem" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 13,
              background: "linear-gradient(135deg,#1e3a8a,#22d3ee)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff",
            }}>PB</div>
            <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: "1.3rem", background: "linear-gradient(135deg,#60a5fa,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: ".03em" }}>
              Pixel &amp; Brush
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", marginBottom: ".6rem" }}>
            <span style={{ width: 6, height: 6, background: "#22d3ee", borderRadius: "50%", display: "inline-block", animation: "blink 1.5s ease infinite" }} />
            <span style={{ color: "#6f7a96", fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600 }}>Client Portal</span>
          </div>
          <h1 style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: "1.9rem", letterSpacing: "-.02em", marginBottom: ".3rem" }}>Welcome Back</h1>
          <p style={{ color: "#6f7a96", fontSize: ".86rem" }}>Sign in to your project dashboard</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,.1)",
            border: "1px solid rgba(239,68,68,.25)",
            borderRadius: 9,
            padding: ".95rem 1.1rem",
            marginBottom: "1.3rem",
            color: "#f87171",
            fontSize: ".85rem",
            display: "flex",
            alignItems: "center",
            gap: ".6rem",
          }}>
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <div>
            <label style={{
              display: "block",
              fontSize: ".68rem",
              color: "#6f7a96",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              fontFamily: "'Baloo 2',sans-serif",
              fontWeight: 600,
              marginBottom: ".42rem",
            }}>Email Address</label>
            <input
              type="email"
              maxLength={254}
              placeholder="you@company.com"
              value={email}
              disabled={loading || isLocked}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKey}
              onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,.15)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(37,99,235,.18)"; e.target.style.boxShadow = "none"; }}
              style={{
                width: "100%",
                background: "rgba(3,3,12,.8)",
                border: "1px solid rgba(37,99,235,.18)",
                borderRadius: 9,
                padding: ".9rem 1rem",
                color: "#e8edf7",
                fontFamily: "'Outfit',sans-serif",
                fontSize: ".92rem",
                outline: "none",
                transition: "border-color .3s,box-shadow .3s",
                boxSizing: "border-box",
                opacity: isLocked ? 0.6 : 1,
              }}
            />
          </div>

          <div>
            <label style={{
              display: "block",
              fontSize: ".68rem",
              color: "#6f7a96",
              letterSpacing: ".1em",
              textTransform: "uppercase",
              fontFamily: "'Baloo 2',sans-serif",
              fontWeight: 600,
              marginBottom: ".42rem",
            }}>Password</label>
            <input
              type="password"
              maxLength={128}
              placeholder="••••••••"
              value={password}
              disabled={loading || isLocked}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKey}
              onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,.15)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(37,99,235,.18)"; e.target.style.boxShadow = "none"; }}
              style={{
                width: "100%",
                background: "rgba(3,3,12,.8)",
                border: "1px solid rgba(37,99,235,.18)",
                borderRadius: 9,
                padding: ".9rem 1rem",
                color: "#e8edf7",
                fontFamily: "'Outfit',sans-serif",
                fontSize: ".92rem",
                outline: "none",
                transition: "border-color .3s,box-shadow .3s",
                boxSizing: "border-box",
                opacity: isLocked ? 0.6 : 1,
              }}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleLogin}
          disabled={loading || isLocked}
          style={{
            width: "100%",
            marginTop: "1.6rem",
            padding: "1rem",
            background: loading || isLocked ? "rgba(37,99,235,.45)" : "linear-gradient(135deg,#1e3a8a,#2563eb)",
            color: "white",
            border: "none",
            borderRadius: 9,
            cursor: loading || isLocked ? "not-allowed" : "pointer",
            fontFamily: "'Baloo 2',sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: ".04em",
            transition: "opacity .3s,box-shadow .3s",
            boxShadow: loading || isLocked ? "none" : "0 0 28px rgba(37,99,235,.45)",
          }}
          onMouseEnter={(e) => { if (!loading && !isLocked) e.currentTarget.style.boxShadow = "0 0 40px rgba(37,99,235,.6)"; }}
          onMouseLeave={(e) => { if (!loading && !isLocked) e.currentTarget.style.boxShadow = "0 0 28px rgba(37,99,235,.45)"; }}
        >
          {loading ? "Signing in…" : isLocked ? `Locked (${lockoutRemaining}s)` : "Sign In →"}
        </button>

        {/* Back link */}
        <div style={{ textAlign: "center", marginTop: "1.6rem" }}>
          <a
            href="/"
            style={{ color: "#6f7a96", fontSize: ".84rem", textDecoration: "none", transition: "color .3s" }}
            onMouseEnter={(e) => { e.target.style.color = "#8a93ab"; }}
            onMouseLeave={(e) => { e.target.style.color = "#6f7a96"; }}
          >
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
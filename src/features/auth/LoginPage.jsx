import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAdminUser, signInWithPassword } from "../../services/authService";
import { isValidEmail } from "../../utils/validators";

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const navigate = useNavigate();

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

    if (!isValidEmail(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await signInWithPassword(cleanEmail, cleanPassword);

      if (authError) {
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

      localStorage.removeItem("pb_login_attempts");
      localStorage.removeItem("pb_login_lockout");

      const isAdmin = isAdminUser(data.user);
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
      background: "#07040e",
      color: "#f4f1fa",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Outfit',sans-serif",
      position: "relative",
      overflow: "hidden",
      padding: "1.5rem",
    }}>
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes loginGlow {
          0%,100% { box-shadow:0 0 50px rgba(147,51,234,.2),0 30px 80px rgba(0,0,0,.55); }
          50%     { box-shadow:0 0 80px rgba(249,115,22,.22),0 30px 80px rgba(0,0,0,.55); }
        }
      `}</style>

      {/* ambient orbs */}
      <div style={{ position: "absolute", top: "20%", left: "20%", width: 400, height: 400, background: "radial-gradient(circle,rgba(147,51,234,.14),transparent 70%)", pointerEvents: "none", filter: "blur(24px)" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "15%", width: 320, height: 320, background: "radial-gradient(circle,rgba(249,115,22,.12),transparent 70%)", pointerEvents: "none", filter: "blur(24px)" }} />

      <div style={{
        width: "100%",
        maxWidth: 440,
        background: "rgba(12,6,26,.94)",
        border: "1px solid rgba(249,115,22,.25)",
        borderRadius: 22,
        padding: "2.8rem",
        backdropFilter: "blur(32px)",
        animation: "fadeUp .7s cubic-bezier(.22,1,.36,1) both, loginGlow 6s ease-in-out infinite",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: "linear-gradient(90deg,transparent,#7c3aed,#ec4899,#f97316,#fbbf24,transparent)" }} />

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".65rem", marginBottom: "1.5rem" }}>
            <img
              src="/logo-icon.webp"
              alt="Pixel and Brush logo"
              width="44"
              height="44"
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                border: "1px solid rgba(249,115,22,.35)",
                boxShadow: "0 0 18px rgba(249,115,22,.28)",
              }}
            />
            <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: "1.35rem", letterSpacing: ".02em", display: "inline-flex", alignItems: "baseline", gap: ".32rem" }}>
              <span style={{ color: "#ffffff" }}>Pixel</span>
              <span style={{ color: "#a1a1aa", fontStyle: "italic", fontWeight: 400, fontSize: ".76em", fontFamily: "'Outfit',sans-serif" }}>and</span>
              <span style={{ background: "linear-gradient(135deg,#fbbf24,#f97316,#ea580c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Brush</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", marginBottom: ".6rem" }}>
            <span style={{ width: 6, height: 6, background: "#fb923c", borderRadius: "50%", display: "inline-block", animation: "blink 1.5s ease infinite" }} />
            <span style={{ color: "#a79ab8", fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600 }}>Client Portal</span>
          </div>
          <h1 style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: "1.9rem", letterSpacing: "-.02em", marginBottom: ".3rem" }}>Welcome Back</h1>
          <p style={{ color: "#8f84a6", fontSize: ".86rem" }}>Sign in to your project dashboard</p>
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
              color: "#8f84a6",
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
              onFocus={(e) => { e.target.style.borderColor = "#f97316"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,.18)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(168,85,247,.22)"; e.target.style.boxShadow = "none"; }}
              style={{
                width: "100%",
                background: "rgba(7,3,16,.85)",
                border: "1px solid rgba(168,85,247,.22)",
                borderRadius: 9,
                padding: ".9rem 1rem",
                color: "#f4f1fa",
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
              color: "#8f84a6",
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
              onFocus={(e) => { e.target.style.borderColor = "#f97316"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,.18)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(168,85,247,.22)"; e.target.style.boxShadow = "none"; }}
              style={{
                width: "100%",
                background: "rgba(7,3,16,.85)",
                border: "1px solid rgba(168,85,247,.22)",
                borderRadius: 9,
                padding: ".9rem 1rem",
                color: "#f4f1fa",
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
            background: loading || isLocked ? "rgba(147,51,234,.4)" : "linear-gradient(135deg,#7c3aed 0%,#db2777 45%,#f97316 100%)",
            color: "white",
            border: "none",
            borderRadius: 9,
            cursor: loading || isLocked ? "not-allowed" : "pointer",
            fontFamily: "'Baloo 2',sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: ".04em",
            transition: "opacity .3s,box-shadow .3s",
            boxShadow: loading || isLocked ? "none" : "0 8px 28px rgba(249,115,22,.35),0 0 18px rgba(147,51,234,.25)",
          }}
          onMouseEnter={(e) => { if (!loading && !isLocked) e.currentTarget.style.boxShadow = "0 12px 36px rgba(249,115,22,.5),0 0 24px rgba(147,51,234,.35)"; }}
          onMouseLeave={(e) => { if (!loading && !isLocked) e.currentTarget.style.boxShadow = "0 8px 28px rgba(249,115,22,.35),0 0 18px rgba(147,51,234,.25)"; }}
        >
          {loading ? "Signing in…" : isLocked ? `Locked (${lockoutRemaining}s)` : "Sign In →"}
        </button>

        {/* Back link */}
        <div style={{ textAlign: "center", marginTop: "1.6rem" }}>
          <a
            href="/"
            style={{ color: "#8f84a6", fontSize: ".84rem", textDecoration: "none", transition: "color .3s" }}
            onMouseEnter={(e) => { e.target.style.color = "#fb923c"; }}
            onMouseLeave={(e) => { e.target.style.color = "#8f84a6"; }}
          >
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}

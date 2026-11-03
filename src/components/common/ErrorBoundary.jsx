import { Component } from "react";
import { logError } from "../../services/errors";

/**
 * Catches render-time errors anywhere below it so a single bug never produces a blank page.
 * (Event-handler and async errors are handled where they occur, in hooks/services.)
 */
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logError("ErrorBoundary", { error, componentStack: info?.componentStack });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
          background: "#060912",
          color: "#e8edf7",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: "1.8rem", margin: 0 }}>
          Something went wrong
        </h1>
        <p style={{ color: "#8a93ab", maxWidth: 420, margin: 0 }}>
          An unexpected error occurred. Reloading usually fixes it.
        </p>
        <div style={{ display: "flex", gap: ".8rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{ padding: ".7rem 1.4rem", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#1e3a8a,#2563eb)" }}
          >
            Reload page
          </button>
          <a
            href="/"
            style={{ padding: ".7rem 1.4rem", borderRadius: 8, border: "1px solid rgba(37,99,235,.35)", color: "#e8edf7", textDecoration: "none", fontWeight: 700 }}
          >
            Back to home
          </a>
        </div>
      </div>
    );
  }
}

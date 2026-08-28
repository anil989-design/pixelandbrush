import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Inquiries");
  const [inquiries, setInquiries] = useState([]);
  const [clientMessages, setClientMessages] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [progress, setProgress] = useState(75);
  const [stage, setStage] = useState("Development");
  const [health, setHealth] = useState("On Track");
  const [launchDate, setLaunchDate] = useState("2026-07-28");
  const [saveStatus, setSaveStatus] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInquiries();
    fetchClientMessages();
    fetchProject();

    // Realtime listeners
    const inqChannel = supabase
      .channel("admin-inquiries")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, () => fetchInquiries())
      .subscribe();

    const msgChannel = supabase
      .channel("admin-client-msgs")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "client_messages" }, () => fetchClientMessages())
      .subscribe();

    return () => {
      supabase.removeChannel(inqChannel);
      supabase.removeChannel(msgChannel);
    };
  }, []);

  useEffect(() => {
    if (activeTab === "ClientChat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [clientMessages, activeTab]);

  const fetchInquiries = async () => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    setInquiries(data || []);
  };

  const fetchClientMessages = async () => {
    const { data } = await supabase
      .from("client_messages")
      .select("*")
      .order("created_at", { ascending: true });
    setClientMessages(data || []);
  };

  const fetchProject = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .limit(1)
      .single();
    if (data) {
      if (data.progress !== undefined) setProgress(data.progress);
      if (data.stage) setStage(data.stage);
      if (data.health) setHealth(data.health);
      if (data.launch_date) setLaunchDate(data.launch_date);
    }
  };

  const sendAdminReply = async () => {
    if (!replyText.trim()) return;
    const { error } = await supabase.from("client_messages").insert([
      { sender: "Pixel & Brush (Admin)", message: replyText.trim(), is_admin: true },
    ]);
    if (!error) {
      setReplyText("");
      fetchClientMessages();
    } else {
      alert("Error sending message: " + error.message);
    }
  };

  const saveProject = async () => {
    setSaveStatus("Saving...");
    const { error } = await supabase
      .from("projects")
      .update({
        progress: Number(progress),
        stage,
        health,
        launch_date: launchDate,
        updated_at: new Date(),
      })
      .eq("title", "Website Project");

    if (error) {
      alert("Error saving: " + error.message);
      setSaveStatus("");
      return;
    }

    setSaveStatus("✅ Project updated successfully!");
    setTimeout(() => setSaveStatus(""), 4000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#060912",
      color: "#e8edf7",
      padding: "2rem clamp(1rem, 4vw, 3rem)",
      fontFamily: "'Outfit', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        marginBottom: "2rem",
        paddingBottom: "1.5rem",
        borderBottom: "1px solid rgba(37,99,235,.15)",
      }}>
        <div>
          <div style={{ color: "#22d3ee", fontSize: ".75rem", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Baloo 2', sans-serif" }}>
            Pixel &amp; Brush Admin Portal
          </div>
          <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: "2.2rem", fontWeight: 800, margin: ".2rem 0" }}>
            Admin Dashboard
          </h1>
        </div>
        <div style={{ display: "flex", gap: ".8rem" }}>
          <a href="/" style={{ padding: ".65rem 1.2rem", borderRadius: 10, background: "rgba(37,99,235,.1)", border: "1px solid rgba(37,99,235,.25)", color: "#60a5fa", textDecoration: "none", fontSize: ".88rem", fontWeight: 600 }}>
            ← View Website
          </a>
          <button onClick={handleLogout} style={{ padding: ".65rem 1.2rem", borderRadius: 10, background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.25)", color: "#f87171", cursor: "pointer", fontSize: ".88rem", fontWeight: 600 }}>
            Log Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: ".8rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {[
          { id: "Inquiries", label: `📩 Website Inquiries (${inquiries.length})` },
          { id: "ClientChat", label: "💬 Client Messages & Chat" },
          { id: "ProjectSettings", label: "⚙️ Project Status & Milestones" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: ".85rem 1.5rem",
              borderRadius: 12,
              border: activeTab === t.id ? "1px solid rgba(34,211,238,.4)" : "1px solid rgba(37,99,235,.12)",
              background: activeTab === t.id ? "linear-gradient(135deg, rgba(37,99,235,.3), rgba(34,211,238,.15))" : "rgba(8,4,20,.7)",
              color: activeTab === t.id ? "#fff" : "#8a93ab",
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 700,
              fontSize: ".95rem",
              cursor: "pointer",
              transition: "all .2s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: WEBSITE INQUIRIES ── */}
      {activeTab === "Inquiries" && (
        <div style={{ background: "rgba(8,4,20,.88)", border: "1px solid rgba(37,99,235,.14)", borderRadius: 20, padding: "2rem" }}>
          <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.2rem" }}>
            Contact Form Submissions ({inquiries.length})
          </h2>
          {inquiries.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "#8a93ab" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📭</div>
              <p>No contact form inquiries yet. When visitors submit the form on your homepage, they will appear here in real-time!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {inquiries.map((inq) => (
                <div key={inq.id} style={{ background: "rgba(3,3,10,.6)", border: "1px solid rgba(37,99,235,.12)", borderRadius: 14, padding: "1.4rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: ".6rem" }}>
                    <div>
                      <strong style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: "1.1rem", color: "#60a5fa" }}>
                        {inq.sender_name || "Anonymous"}
                      </strong>
                      <div style={{ color: "#8a93ab", fontSize: ".85rem", marginTop: ".15rem" }}>
                        ✉️ <a href={`mailto:${inq.sender_email}`} style={{ color: "#22d3ee", textDecoration: "none" }}>{inq.sender_email}</a>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ background: "rgba(37,99,235,.2)", border: "1px solid rgba(37,99,235,.35)", borderRadius: 100, padding: ".22rem .8rem", color: "#93c5fd", fontSize: ".75rem", fontWeight: 700, fontFamily: "'Baloo 2', sans-serif" }}>
                        {inq.service_needed || "General Inquiry"}
                      </span>
                      <div style={{ color: "#4a5268", fontSize: ".75rem", marginTop: ".35rem" }}>
                        {inq.created_at ? new Date(inq.created_at).toLocaleString("en-GB") : ""}
                      </div>
                    </div>
                  </div>
                  <p style={{ color: "#c5cfe0", fontSize: ".92rem", lineHeight: 1.6, background: "rgba(0,0,0,.25)", padding: "1rem", borderRadius: 8, marginTop: ".8rem" }}>
                    {inq.message}
                  </p>
                  <div style={{ marginTop: "1rem" }}>
                    <a href={`mailto:${inq.sender_email}?subject=Re: Pixel %26 Brush Inquiry - ${inq.service_needed || ''}`} style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", background: "linear-gradient(135deg,#2563eb,#22d3ee)", color: "#fff", padding: ".55rem 1.1rem", borderRadius: 8, fontSize: ".84rem", fontWeight: 700, textDecoration: "none", fontFamily: "'Baloo 2', sans-serif" }}>
                      ✉️ Reply via Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: CLIENT CHAT ── */}
      {activeTab === "ClientChat" && (
        <div style={{ background: "rgba(8,4,20,.88)", border: "1px solid rgba(37,99,235,.14)", borderRadius: 20, padding: "2rem" }}>
          <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.2rem" }}>
            Client Portal Messages
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: ".8rem", maxHeight: 440, overflowY: "auto", padding: ".5rem", marginBottom: "1.2rem" }}>
            {clientMessages.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "#8a93ab" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>💬</div>
                <p>No client messages yet.</p>
              </div>
            ) : (
              clientMessages.map((msg) => (
                <div key={msg.id} style={{ alignSelf: msg.is_admin ? "flex-end" : "flex-start", maxWidth: "78%", background: msg.is_admin ? "rgba(37,99,235,.22)" : "rgba(3,3,10,.7)", border: `1px solid ${msg.is_admin ? "rgba(37,99,235,.4)" : "rgba(37,99,235,.12)"}`, padding: ".9rem 1.2rem", borderRadius: 14 }}>
                  <strong style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: ".8rem", color: msg.is_admin ? "#22d3ee" : "#60a5fa" }}>
                    {msg.sender}
                  </strong>
                  <p style={{ color: "#c5cfe0", marginTop: ".3rem", fontSize: ".92rem", lineHeight: 1.55 }}>
                    {msg.message}
                  </p>
                  <small style={{ color: "#4a5268", fontSize: ".7rem", display: "block", marginTop: ".35rem" }}>
                    {msg.created_at ? new Date(msg.created_at).toLocaleString("en-GB") : ""}
                  </small>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ display: "flex", gap: ".8rem", alignItems: "flex-end" }}>
            <textarea
              placeholder="Type an official reply to the client..."
              rows={2}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendAdminReply(); } }}
              style={{ flex: 1, background: "rgba(3,3,10,.88)", border: "1px solid rgba(37,99,235,.2)", borderRadius: 10, padding: ".85rem 1rem", color: "#e8edf7", fontFamily: "'Outfit', sans-serif", fontSize: ".9rem", outline: "none", resize: "vertical" }}
            />
            <button onClick={sendAdminReply} style={{ padding: ".85rem 1.6rem", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#2563eb,#22d3ee)", color: "#fff", fontWeight: 800, cursor: "pointer", fontFamily: "'Baloo 2', sans-serif", fontSize: ".92rem" }}>
              Send Reply →
            </button>
          </div>
        </div>
      )}

      {/* ── TAB 3: PROJECT STATUS ── */}
      {activeTab === "ProjectSettings" && (
        <div style={{ background: "rgba(8,4,20,.88)", border: "1px solid rgba(37,99,235,.14)", borderRadius: 20, padding: "2rem", maxWidth: 650 }}>
          <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.2rem" }}>
            Update Client Project Status
          </h2>
          <p style={{ color: "#8a93ab", fontSize: ".88rem", marginBottom: "1.6rem" }}>
            Changes made here will instantly update what your clients see on their dashboard at <code>/dashboard</code>.
          </p>

          {saveStatus && (
            <div style={{ background: "rgba(34,197,94,.12)", border: "1px solid rgba(34,197,94,.3)", borderRadius: 10, padding: ".9rem 1.2rem", color: "#86efac", marginBottom: "1.2rem", fontWeight: 600, fontSize: ".9rem" }}>
              {saveStatus}
            </div>
          )}

          <label style={{ fontSize: ".75rem", color: "#6f7a96", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Baloo 2', sans-serif" }}>Progress % ({progress}%)</label>
          <input type="number" min="0" max="100" value={progress} onChange={(e) => setProgress(e.target.value)} style={inputStyle} />

          <label style={{ fontSize: ".75rem", color: "#6f7a96", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Baloo 2', sans-serif" }}>Current Stage</label>
          <select value={stage} onChange={(e) => setStage(e.target.value)} style={inputStyle}>
            <option>Discovery</option>
            <option>Design</option>
            <option>Development</option>
            <option>Testing</option>
            <option>Launch</option>
          </select>

          <label style={{ fontSize: ".75rem", color: "#6f7a96", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Baloo 2', sans-serif" }}>Project Health</label>
          <select value={health} onChange={(e) => setHealth(e.target.value)} style={inputStyle}>
            <option>Excellent</option>
            <option>On Track</option>
            <option>Needs Attention</option>
          </select>

          <label style={{ fontSize: ".75rem", color: "#6f7a96", letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700, fontFamily: "'Baloo 2', sans-serif" }}>Launch Target Date</label>
          <input type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} style={inputStyle} />

          <button onClick={saveProject} style={{ marginTop: "1rem", width: "100%", padding: "1rem", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#2563eb,#22d3ee)", color: "#fff", fontWeight: 800, cursor: "pointer", fontFamily: "'Baloo 2', sans-serif", fontSize: "1rem", boxShadow: "0 0 20px rgba(37,99,235,.35)" }}>
            Save &amp; Publish Project Update
          </button>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  margin: ".4rem 0 1.2rem",
  padding: ".85rem 1rem",
  borderRadius: 10,
  border: "1px solid rgba(37,99,235,.18)",
  background: "rgba(3,3,10,.88)",
  color: "#e8edf7",
  fontSize: ".9rem",
  fontFamily: "'Outfit', sans-serif",
  outline: "none",
  boxSizing: "border-box",
};
import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function AdminDashboard() {
  const [progress, setProgress] = useState(75);
  const [stage, setStage] = useState("Development");
  const [health, setHealth] = useState("On Track");
  const [launchDate, setLaunchDate] = useState("2026-07-28");

  const saveProject = async () => {
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
      alert(error.message);
      return;
    }

    alert("Project updated successfully");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#060912",
      color: "#e8edf7",
      padding: "3rem",
      fontFamily: "'Outfit', sans-serif",
    }}>
      <h1 style={{
        fontFamily: "'Baloo 2', sans-serif",
        fontSize: "2.5rem",
        marginBottom: "2rem",
      }}>
        Admin Dashboard
      </h1>

      <div style={{
        background: "rgba(8,4,20,.88)",
        border: "1px solid rgba(37,99,235,.14)",
        borderRadius: 20,
        padding: "2rem",
        maxWidth: 600,
      }}>
        <label>Progress %</label>
        <input
          type="number"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          style={inputStyle}
        />

        <label>Current Stage</label>
        <select value={stage} onChange={(e) => setStage(e.target.value)} style={inputStyle}>
          <option>Discovery</option>
          <option>Design</option>
          <option>Development</option>
          <option>Testing</option>
          <option>Launch</option>
        </select>

        <label>Project Health</label>
        <select value={health} onChange={(e) => setHealth(e.target.value)} style={inputStyle}>
          <option>Excellent</option>
          <option>On Track</option>
          <option>Needs Attention</option>
        </select>

        <label>Launch Date</label>
        <input
          type="date"
          value={launchDate}
          onChange={(e) => setLaunchDate(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={saveProject}
          style={{
            marginTop: "1rem",
            width: "100%",
            padding: ".9rem 1rem",
            borderRadius: 999,
            border: "none",
            background: "linear-gradient(135deg,#2563eb,#22d3ee)",
            color: "#fff",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Save Project Update
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  margin: ".5rem 0 1.2rem",
  padding: ".85rem 1rem",
  borderRadius: 10,
  border: "1px solid rgba(37,99,235,.18)",
  background: "rgba(3,3,10,.88)",
  color: "#e8edf7",
};
import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────────────────
   FULLY FUNCTIONAL CLIENT DASHBOARD
   Features:
   • Real-time messages with unread badge
   • Toast notifications for new admin messages
   • Working approvals (read + approve/reject in Supabase)
   • Invoice listing (fetched from Supabase)
   • File listing + client file upload (Supabase storage)
   • Logout with signOut
   • Auto-scroll messages
   • Enter-to-send
   • Overview with milestone tracker
───────────────────────────────────────────────────────────────────────── */

/* ── Toast notification system ─────────────────────────────────────────── */
const Toasts = ({ toasts }) => (
  <div style={{ position:"fixed", top:"1.2rem", right:"1.2rem", zIndex:9999, display:"flex", flexDirection:"column", gap:".6rem" }}>
    {toasts.map(t => (
      <div key={t.id} style={{
        background:"rgba(8,6,22,.96)",
        border:`1px solid ${t.type==="success"?"rgba(34,197,94,.4)":t.type==="error"?"rgba(239,68,68,.4)":"rgba(37,99,235,.4)"}`,
        borderRadius:12, padding:"1rem 1.3rem",
        color:"#e8edf7", fontSize:".88rem",
        boxShadow:"0 8px 30px rgba(0,0,0,.45)",
        display:"flex", alignItems:"center", gap:".7rem",
        animation:"toastIn .35s cubic-bezier(.22,1,.36,1) both",
        minWidth:260, maxWidth:340,
        backdropFilter:"blur(20px)",
      }}>
        <span style={{fontSize:"1.1rem",flexShrink:0}}>{t.type==="success"?"✅":t.type==="error"?"❌":"💬"}</span>
        <span>{t.message}</span>
      </div>
    ))}
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab]   = useState("Overview");
  const [project, setProject]       = useState(null);
  const [projectFiles, setProjectFiles] = useState([]);
  const [clientMessages, setClientMessages] = useState([]);
  const [approvals, setApprovals]   = useState([]);
  const [invoices, setInvoices]     = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userEmail, setUserEmail]   = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [toasts, setToasts]         = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef   = useRef(null);
  const navigate       = useNavigate();

  const progress   = project?.progress   || 0;
  const stage      = project?.stage      || "Development";
  const health     = project?.health     || "On Track";
  const launchDate = project?.launch_date || null;

  /* ── toast helper ── */
  const addToast = useCallback((message, type="info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  /* ── fonts ── */
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap";
    link.rel  = "stylesheet";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch(e){} };
  }, []);

  /* ── fetch everything ── */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email) setUserEmail(data.user.email);
    });

    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects").select("*").limit(1).single();
      if (!error && data) setProject(data);

      const { data: filesData } = await supabase
        .from("project_files").select("*").order("created_at", { ascending: false });
      setProjectFiles(filesData || []);
    };

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("client_messages").select("*").order("created_at", { ascending: true });
      const msgs = data || [];
      setClientMessages(msgs);

      // count unread (admin messages since last read)
      const lastRead = parseInt(localStorage.getItem("lastMsgRead") || "0");
      const unread = msgs.filter(m => m.is_admin && new Date(m.created_at).getTime() > lastRead).length;
      setUnreadCount(unread);
    };

    const fetchApprovals = async () => {
      const { data } = await supabase
        .from("approvals").select("*").order("created_at", { ascending: false });
      setApprovals(data || []);
    };

    const fetchInvoices = async () => {
      const { data } = await supabase
        .from("invoices").select("*").order("created_at", { ascending: false });
      setInvoices(data || []);
    };

    fetchProject();
    fetchMessages();
    fetchApprovals();
    fetchInvoices();

    /* ── real-time ── */
    const projectChannel = supabase.channel("db-projects")
      .on("postgres_changes", { event:"*", schema:"public", table:"projects" }, () => fetchProject())
      .subscribe();

    const msgChannel = supabase.channel("db-messages")
      .on("postgres_changes", { event:"INSERT", schema:"public", table:"client_messages" }, payload => {
        fetchMessages();
        if (payload.new?.is_admin) {
          addToast("New message from Pixel & Brush", "info");
        }
      }).subscribe();

    const approvChannel = supabase.channel("db-approvals")
      .on("postgres_changes", { event:"*", schema:"public", table:"approvals" }, () => fetchApprovals())
      .subscribe();

    return () => {
      supabase.removeChannel(projectChannel);
      supabase.removeChannel(msgChannel);
      supabase.removeChannel(approvChannel);
    };
  }, [addToast]);

  /* ── auto-scroll messages ── */
  useEffect(() => {
    if (activeTab === "Messages") {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior:"smooth" }), 100);
    }
  }, [clientMessages, activeTab]);

  /* ── tab change ── */
  const handleTabChange = tab => {
    if (tab === "Messages") {
      localStorage.setItem("lastMsgRead", Date.now().toString());
      setUnreadCount(0);
    }
    setActiveTab(tab);
  };

  /* ── send message ── */
  const sendClientMessage = async () => {
    const cleanMsg = newMessage.trim().slice(0, 2000);
    if (!cleanMsg) return;
    const { error } = await supabase.from("client_messages").insert([
      { sender:"Client", message:cleanMsg, is_admin:false },
    ]);
    if (error) { addToast("Failed to send message: " + error.message, "error"); return; }
    setNewMessage("");
  };

  const handleMessageKey = e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendClientMessage(); }
  };

  /* ── approval action ── */
  const handleApproval = async (id, status) => {
    const allowedStatuses = ["approved", "rejected", "pending"];
    if (!allowedStatuses.includes(status)) return;
    const { error } = await supabase.from("approvals").update({ status }).eq("id", id);
    if (error) { addToast("Update failed: " + error.message, "error"); return; }
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    addToast(status === "approved" ? "Item approved! ✅" : "Change request sent.", status === "approved" ? "success" : "info");
  };

  /* ── file upload with strict security validation ── */
  const handleFileUpload = async e => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Max size check: 10MB
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      addToast("File too large. Maximum allowed size is 10 MB.", "error");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // 2. Allowed extensions whitelist
    const allowedExtensions = [
      "pdf", "png", "jpg", "jpeg", "gif", "svg", "webp",
      "doc", "docx", "xls", "xlsx", "csv", "txt", "zip"
    ];
    const fileExt = (file.name.split(".").pop() || "").toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      addToast(`Invalid file type (.${fileExt}). Allowed: PDF, Images, Word, Excel, CSV, Text, ZIP.`, "error");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // 3. Allowed MIME types whitelist
    const allowedMimeTypes = [
      "application/pdf",
      "image/png", "image/jpeg", "image/gif", "image/svg+xml", "image/webp",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv", "text/plain",
      "application/zip", "application/x-zip-compressed", "application/octet-stream"
    ];
    if (file.type && !allowedMimeTypes.includes(file.type)) {
      addToast("File format not permitted for security reasons.", "error");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);

    // 4. File name sanitization: strip directory traversal, non-alphanumeric chars
    const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || "file";
    const sanitizedBase = baseName.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 50);
    const safeFileName = `${Date.now()}_${sanitizedBase}.${fileExt}`;

    try {
      // upload to Supabase Storage
      const { error: storageError } = await supabase.storage
        .from("project-files")
        .upload(safeFileName, file, { cacheControl:"3600", upsert:false });

      if (storageError) {
        addToast("Upload failed: " + storageError.message, "error");
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      // get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("project-files").getPublicUrl(safeFileName);

      // save to project_files table
      const { error: dbError } = await supabase.from("project_files").insert([{
        file_name: `${sanitizedBase}.${fileExt}`,
        file_url: publicUrl,
        uploaded_by: "client",
      }]);

      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";

      if (dbError) {
        addToast("Saved to storage, but database record failed: " + dbError.message, "error");
        return;
      }

      const { data: filesData } = await supabase.from("project_files").select("*").order("created_at", { ascending:false });
      setProjectFiles(filesData || []);
      addToast("File uploaded successfully! ✅", "success");
    } catch (err) {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      addToast("An error occurred during upload. Please try again.", "error");
    }
  };

  /* ── logout ── */
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  /* ── stage & timeline logic ── */
  const stageOrder = ["Discovery","Design","Development","Testing","Launch"];
  const currentStageIndex = stageOrder.indexOf(stage);
  const stages = stageOrder.map((title, index) => ({
    title,
    desc: {
      Discovery:"Requirements gathering & brief confirmed",
      Design:"Main layout & brand direction approved",
      Development:"Website build actively in progress",
      Testing:"Final QA checks and revisions",
      Launch:"Deployment & go-live",
    }[title],
    status: index < currentStageIndex ? "done" : index === currentStageIndex ? "active" : "pending",
  }));

  /* ── nav items ── */
  const navItems = [
    { id:"Overview",  icon:"📊" },
    { id:"Timeline",  icon:"🗓️" },
    { id:"Files",     icon:"📁" },
    { id:"Messages",  icon:"💬", badge: unreadCount },
    { id:"Approvals", icon:"✅" },
    { id:"Invoices",  icon:"💳" },
    { id:"Support",   icon:"🛟" },
  ];

  /* ── shared styles ── */
  const cardSt = {
    background:"rgba(8,4,20,.82)", border:"1px solid rgba(37,99,235,.12)",
    borderRadius:20, padding:"1.6rem", marginBottom:"1.5rem",
  };
  const inputSt = {
    width:"100%", background:"rgba(3,3,10,.8)", border:"1px solid rgba(37,99,235,.18)",
    borderRadius:10, padding:".85rem 1rem", color:"#e8edf7",
    fontFamily:"'Outfit',sans-serif", fontSize:".9rem", outline:"none",
    transition:"border-color .3s", boxSizing:"border-box",
  };
  const btn = (primary=true) => ({
    border:"none", borderRadius:999, padding:".7rem 1.4rem",
    background:primary?"linear-gradient(135deg,#2563eb,#22d3ee)":"rgba(37,99,235,.1)",
    color:primary?"#fff":"#8a93ab", fontWeight:700, cursor:"pointer",
    fontFamily:"'Baloo 2',sans-serif", fontSize:".86rem",
    boxShadow:primary?"0 0 16px rgba(37,99,235,.3)":"none",
    transition:"opacity .2s",
  });

  /* ── label ── */
  const Lbl = ({text}) => (
    <p style={{color:"#2563eb",fontSize:".68rem",letterSpacing:".2em",textTransform:"uppercase",marginBottom:"1.1rem",fontFamily:"'Baloo 2',sans-serif",fontWeight:700}}>{text}</p>
  );

  /* ── badge status chip ── */
  const StatusChip = ({status}) => {
    const map = {
      approved:  { bg:"rgba(34,197,94,.12)", border:"rgba(34,197,94,.3)", color:"#86efac", label:"Approved" },
      rejected:  { bg:"rgba(239,68,68,.12)", border:"rgba(239,68,68,.3)", color:"#fca5a5", label:"Changes Requested" },
      pending:   { bg:"rgba(37,99,235,.12)", border:"rgba(37,99,235,.3)", color:"#93c5fd", label:"Awaiting Review" },
      paid:      { bg:"rgba(34,197,94,.12)", border:"rgba(34,197,94,.3)", color:"#86efac", label:"Paid" },
      unpaid:    { bg:"rgba(234,179,8,.12)", border:"rgba(234,179,8,.3)", color:"#fde047", label:"Unpaid" },
      overdue:   { bg:"rgba(239,68,68,.12)", border:"rgba(239,68,68,.3)", color:"#fca5a5", label:"Overdue" },
    };
    const s = map[status] || map.pending;
    return (
      <span style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:100,padding:".22rem .8rem",color:s.color,fontSize:".72rem",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,letterSpacing:".06em",whiteSpace:"nowrap"}}>{s.label}</span>
    );
  };

  return (
    <div style={{ background:"radial-gradient(circle at top left,rgba(37,99,235,.18),transparent 36%),#060912", color:"#e8edf7", minHeight:"100vh", fontFamily:"'Outfit',sans-serif", padding:"clamp(.8rem,2vw,1.5rem)" }}>
      <style>{`
        @keyframes toastIn { from{opacity:0;transform:translateX(100px)} to{opacity:1;transform:none} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
        @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:.3} }
        @media(max-width:700px){
          .db-grid{grid-template-columns:1fr !important;}
          .db-sidebar{min-height:auto !important;flex-direction:row !important;flex-wrap:wrap !important;gap:.4rem !important;padding:.9rem !important;border-radius:16px !important;}
          .db-sidebar .brand-block{display:none !important;}
          .db-sidebar .logout-btn{display:none !important;}
          .sidebar-item span.label{display:none;}
        }
      `}</style>

      <Toasts toasts={toasts}/>

      <div className="db-grid" style={{ display:"grid", gridTemplateColumns:"250px 1fr", gap:"1.2rem" }}>

        {/* ══════════════ SIDEBAR ══════════════ */}
        <aside className="db-sidebar" style={{ background:"rgba(8,4,20,.9)", border:"1px solid rgba(37,99,235,.14)", borderRadius:22, padding:"1.3rem", minHeight:"calc(100vh - 3rem)", display:"flex", flexDirection:"column", gap:".08rem", position:"sticky", top:"1.5rem", height:"fit-content" }}>
          {/* Brand */}
          <div className="brand-block" style={{ marginBottom:"1.6rem" }}>
            <div style={{ width:44, height:44, borderRadius:13, background:"linear-gradient(135deg,#2563eb,#22d3ee)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Baloo 2',sans-serif", fontWeight:800, color:"#fff", marginBottom:".7rem" }}>PB</div>
            <h2 style={{ fontFamily:"'Baloo 2',sans-serif", fontSize:"1rem", fontWeight:700 }}>Pixel &amp; Brush</h2>
            <p style={{ color:"#6f7a96", fontSize:".75rem", marginTop:".1rem" }}>Client Portal</p>
            {userEmail && <p style={{ color:"#3a4268", fontSize:".7rem", marginTop:".3rem", wordBreak:"break-all" }}>{userEmail}</p>}
          </div>

          {/* Nav */}
          <div style={{ flex:1 }}>
            {navItems.map(({ id, icon, badge }) => (
              <div key={id} className="sidebar-item"
                onClick={() => handleTabChange(id)}
                style={{ padding:".78rem .95rem", borderRadius:11, marginBottom:".28rem", cursor:"pointer", display:"flex", alignItems:"center", gap:".7rem", background:activeTab===id?"linear-gradient(135deg,rgba(37,99,235,.28),rgba(34,211,238,.1))":"transparent", border:activeTab===id?"1px solid rgba(34,211,238,.22)":"1px solid transparent", color:activeTab===id?"#e8edf7":"#8a93ab", fontSize:".88rem", transition:"all .22s", position:"relative" }}>
                <span style={{ fontSize:"1rem" }}>{icon}</span>
                <span className="label">{id}</span>
                {badge > 0 && (
                  <span style={{ marginLeft:"auto", background:"#ef4444", color:"#fff", borderRadius:"50%", width:18, height:18, fontSize:".65rem", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Baloo 2',sans-serif", fontWeight:800 }}>{badge}</span>
                )}
              </div>
            ))}
          </div>

          {/* Logout */}
          <button className="logout-btn" onClick={handleLogout}
            style={{ marginTop:"1rem", padding:".75rem .95rem", borderRadius:11, border:"1px solid rgba(239,68,68,.2)", background:"rgba(239,68,68,.06)", color:"#f87171", cursor:"pointer", fontFamily:"'Baloo 2',sans-serif", fontWeight:600, fontSize:".86rem", display:"flex", alignItems:"center", gap:".65rem", transition:"all .22s" }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(239,68,68,.14)"; e.currentTarget.style.borderColor="rgba(239,68,68,.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(239,68,68,.06)"; e.currentTarget.style.borderColor="rgba(239,68,68,.2)"; }}>
            <span>🚪</span> Log Out
          </button>
        </aside>

        {/* ══════════════ MAIN ══════════════ */}
        <main style={{ minWidth:0 }}>

          {/* ── OVERVIEW ── */}
          {activeTab === "Overview" && (
            <>
              {/* header card */}
              <div style={{ ...cardSt, display:"flex", justifyContent:"space-between", gap:"1.5rem", flexWrap:"wrap", animation:"fadeUp .5s ease both" }}>
                <div>
                  <Lbl text="Client Dashboard"/>
                  <h1 style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem,3.5vw,2.8rem)", letterSpacing:"-.02em", lineHeight:1.05 }}>
                    Dashboard Overview<br/>
                    <span style={{ background:"linear-gradient(135deg,#60a5fa,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Your Project Is Moving</span>
                  </h1>
                  <p style={{ color:"#8a93ab", marginTop:".8rem", maxWidth:440, fontSize:".9rem", lineHeight:1.65 }}>
                    Currently in the <strong style={{color:"#60a5fa"}}>{stage}</strong> phase — health status: <strong style={{color:health==="On Track"?"#22d3ee":"#f87171"}}>{health}</strong>.
                  </p>
                </div>
                <div style={{ minWidth:200, background:"rgba(3,3,10,.65)", border:"1px solid rgba(34,211,238,.18)", borderRadius:16, padding:"1.3rem", flexShrink:0 }}>
                  <p style={{ color:"#6f7a96", fontSize:".72rem", marginBottom:".35rem", letterSpacing:".08em", textTransform:"uppercase" }}>Launch Target</p>
                  <h3 style={{ fontFamily:"'Baloo 2',sans-serif", fontSize:"1.4rem" }}>
                    {launchDate ? new Date(launchDate).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}) : "TBC"}
                  </h3>
                  <p style={{ color:"#22d3ee", marginTop:".55rem", fontWeight:700, fontSize:".88rem" }}>
                    {launchDate ? Math.max(0,Math.ceil((new Date(launchDate)-new Date())/(86400000)))+" days remaining" : "No deadline set"}
                  </p>
                </div>
              </div>

              {/* stats row */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"1rem", marginBottom:"1.5rem", animation:"fadeUp .5s .1s ease both" }}>
                {[
                  { label:"Overall Progress", value:`${progress}%`, sub:"Current completion" },
                  { label:"Current Stage",     value:stage,          sub:stageOrder[currentStageIndex+1]?`Next: ${stageOrder[currentStageIndex+1]}`:"Final stage" },
                  { label:"Project Health",    value:health,         sub:"No major blockers" },
                  { label:"Unread Messages",   value:unreadCount,    sub:"From your team" },
                ].map(c => (
                  <div key={c.label} style={cardSt}>
                    <p style={{ color:"#6f7a96", fontSize:".72rem", marginBottom:".35rem" }}>{c.label}</p>
                    <h2 style={{ fontFamily:"'Baloo 2',sans-serif", fontSize:"1.8rem", background:"linear-gradient(135deg,#60a5fa,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{c.value}</h2>
                    <p style={{ color:"#8a93ab", fontSize:".78rem", marginTop:".18rem" }}>{c.sub}</p>
                  </div>
                ))}
              </div>

              {/* progress bar */}
              <div style={{ ...cardSt, animation:"fadeUp .5s .2s ease both" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:".85rem", alignItems:"center" }}>
                  <h2 style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:700 }}>Build Progress</h2>
                  <strong style={{ color:"#22d3ee", fontFamily:"'Baloo 2',sans-serif", fontSize:"1.1rem" }}>{progress}%</strong>
                </div>
                <div style={{ height:10, background:"rgba(37,99,235,.1)", borderRadius:100, overflow:"hidden" }}>
                  <div style={{ width:`${progress}%`, height:"100%", background:"linear-gradient(90deg,#1e3a8a,#2563eb,#22d3ee)", boxShadow:"0 0 18px rgba(37,99,235,.55)", transition:"width 1.2s cubic-bezier(.22,1,.36,1)" }}/>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:".5rem", marginTop:"1.2rem" }}>
                  {stageOrder.map((s,i) => (
                    <div key={s} style={{ textAlign:"center" }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", margin:"0 auto .4rem", background:i<currentStageIndex?"#22d3ee":i===currentStageIndex?"#2563eb":"rgba(37,99,235,.2)", boxShadow:i===currentStageIndex?"0 0 10px #2563eb":"none" }}/>
                      <div style={{ fontSize:".65rem", color:i<=currentStageIndex?"#8a93ab":"#3a4268", fontFamily:"'Baloo 2',sans-serif", fontWeight:600 }}>{s}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* quick actions */}
              <div style={{ ...cardSt, animation:"fadeUp .5s .3s ease both" }}>
                <Lbl text="Quick Actions"/>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".8rem" }}>
                  {[["💬 Send Message","Messages"],["📁 View Files","Files"],["✅ Approvals","Approvals"],["💳 Invoices","Invoices"]].map(([label,tab]) => (
                    <button key={tab} onClick={() => handleTabChange(tab)} style={{ ...btn(false), border:"1px solid rgba(37,99,235,.2)" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── TIMELINE ── */}
          {activeTab === "Timeline" && (
            <div style={{ ...cardSt, animation:"fadeUp .4s ease both" }}>
              <Lbl text="Project Timeline"/>
              <h2 style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:700, marginBottom:"1.4rem" }}>Build Stages</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:".8rem" }}>
                {stages.map((s,i) => (
                  <div key={s.title} style={{ padding:"1.1rem", borderRadius:14, background:s.status==="active"?"rgba(37,99,235,.12)":"rgba(3,3,10,.55)", border:`1px solid ${s.status==="active"?"rgba(37,99,235,.4)":s.status==="done"?"rgba(34,211,238,.15)":"rgba(37,99,235,.05)"}`, display:"flex", gap:"1rem", alignItems:"flex-start" }}>
                    <div style={{ width:34, height:34, borderRadius:"50%", flexShrink:0, background:s.status==="done"?"rgba(34,211,238,.18)":s.status==="active"?"rgba(37,99,235,.28)":"rgba(37,99,235,.06)", border:`1.5px solid ${s.status==="done"?"#22d3ee":s.status==="active"?"#2563eb":"rgba(37,99,235,.18)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem" }}>
                      {s.status==="done"?"✓":s.status==="active"?"⚡":"○"}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:".8rem", flexWrap:"wrap", marginBottom:".2rem" }}>
                        <div style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:700, fontSize:"1rem" }}>{s.title}</div>
                        {s.status==="active" && <span style={{ background:"rgba(37,99,235,.2)", border:"1px solid rgba(37,99,235,.35)", borderRadius:100, padding:".18rem .6rem", color:"#60a5fa", fontSize:".68rem", fontFamily:"'Baloo 2',sans-serif", fontWeight:700, letterSpacing:".06em" }}>IN PROGRESS</span>}
                        {s.status==="done"   && <span style={{ color:"#22d3ee", fontSize:".75rem", fontFamily:"'Baloo 2',sans-serif", fontWeight:600 }}>Complete</span>}
                      </div>
                      <p style={{ color:"#8a93ab", fontSize:".86rem" }}>{s.desc}</p>
                    </div>
                    <div style={{ flexShrink:0, fontSize:"1.2rem" }}>{s.status==="done"?"✅":s.status==="active"?"🔄":"⏳"}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FILES ── */}
          {activeTab === "Files" && (
            <div style={{ ...cardSt, animation:"fadeUp .4s ease both" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.4rem", flexWrap:"wrap", gap:"1rem" }}>
                <div><Lbl text="Project Files"/><h2 style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:700 }}>Files &amp; Assets</h2></div>
                <button onClick={() => fileInputRef.current?.click()} disabled={isUploading} style={{ ...btn(), display:"flex", alignItems:"center", gap:".5rem" }}>
                  {isUploading ? "Uploading…" : "📤 Upload File"}
                </button>
              </div>
              <input ref={fileInputRef} type="file" accept=".pdf,.png,.jpg,.jpeg,.gif,.svg,.webp,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip" style={{ display:"none" }} onChange={handleFileUpload}/>

              {isUploading && (
                <div style={{ background:"rgba(37,99,235,.08)", border:"1px solid rgba(37,99,235,.2)", borderRadius:10, padding:"1rem", marginBottom:"1rem", display:"flex", alignItems:"center", gap:"1rem" }}>
                  <div style={{ width:8, height:8, background:"#22d3ee", borderRadius:"50%", animation:"pulseDot 1s ease-in-out infinite" }}/>
                  <span style={{ color:"#8a93ab", fontSize:".88rem" }}>Uploading your file to the project…</span>
                </div>
              )}

              {projectFiles.length === 0 ? (
                <div style={{ textAlign:"center", padding:"3rem 1rem", color:"#8a93ab" }}>
                  <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>📂</div>
                  <p style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:600, marginBottom:".4rem" }}>No files yet</p>
                  <p style={{ fontSize:".86rem" }}>Upload a file or wait for your agency to share deliverables.</p>
                </div>
              ) : (
                projectFiles.map(file => (
                  <div key={file.id} style={{ padding:"1rem 1.2rem", borderRadius:12, background:"rgba(3,3,10,.55)", border:"1px solid rgba(37,99,235,.08)", marginBottom:".7rem", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:".8rem" }}>
                      <span style={{ fontSize:"1.4rem" }}>📄</span>
                      <div>
                        <div style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:600, fontSize:".9rem" }}>{file.file_name}</div>
                        <div style={{ color:"#6f7a96", fontSize:".73rem", marginTop:".1rem" }}>
                          {file.uploaded_by === "client" ? "Uploaded by you" : "From agency"}{file.created_at ? " · " + new Date(file.created_at).toLocaleDateString("en-GB") : ""}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => file.file_url ? window.open(file.file_url,"_blank") : alert("No URL")} style={btn()}>Download</button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── MESSAGES ── */}
          {activeTab === "Messages" && (
            <div style={{ ...cardSt, animation:"fadeUp .4s ease both" }}>
              <Lbl text="Project Chat"/>
              <h2 style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:700, marginBottom:"1.2rem" }}>Messages</h2>

              {/* chat window */}
              <div style={{ display:"flex", flexDirection:"column", gap:".8rem", maxHeight:440, overflowY:"auto", padding:".5rem", marginBottom:"1rem", scrollBehavior:"smooth" }}>
                {clientMessages.length === 0 ? (
                  <div style={{ textAlign:"center", padding:"3rem", color:"#8a93ab" }}>
                    <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>💬</div>
                    <p>No messages yet. Send a message to your project team below.</p>
                  </div>
                ) : (
                  clientMessages.map(msg => (
                    <div key={msg.id} style={{ alignSelf:msg.is_admin?"flex-start":"flex-end", maxWidth:"76%", background:msg.is_admin?"rgba(3,3,10,.7)":"rgba(37,99,235,.18)", border:`1px solid ${msg.is_admin?"rgba(37,99,235,.1)":"rgba(37,99,235,.3)"}`, padding:".9rem 1.1rem", borderRadius:14, animation:"fadeUp .3s ease both" }}>
                      <strong style={{ fontFamily:"'Baloo 2',sans-serif", fontSize:".78rem", color:msg.is_admin?"#22d3ee":"#60a5fa" }}>{msg.sender}</strong>
                      <p style={{ color:"#c5cfe0", marginTop:".3rem", fontSize:".9rem", lineHeight:1.55 }}>{msg.message}</p>
                      <small style={{ color:"#4a5268", fontSize:".7rem", display:"block", marginTop:".35rem" }}>{new Date(msg.created_at).toLocaleString("en-GB")}</small>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef}/>
              </div>

              {/* input */}
              <textarea
                placeholder="Write a message… (Enter to send, Shift+Enter for new line)"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={handleMessageKey}
                rows={3}
                style={{ ...inputSt, resize:"vertical", marginBottom:"1rem" }}
                onFocus={e => e.target.style.borderColor="#2563eb"}
                onBlur={e => e.target.style.borderColor="rgba(37,99,235,.18)"}
              />
              <button onClick={sendClientMessage} style={btn()}>Send Message →</button>
            </div>
          )}

          {/* ── APPROVALS ── */}
          {activeTab === "Approvals" && (
            <div style={{ ...cardSt, animation:"fadeUp .4s ease both" }}>
              <Lbl text="Pending Reviews"/>
              <h2 style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:700, marginBottom:"1.3rem" }}>Approvals</h2>

              {approvals.length === 0 ? (
                <div style={{ textAlign:"center", padding:"3rem 1rem", color:"#8a93ab" }}>
                  <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>✅</div>
                  <p style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:600, marginBottom:".4rem" }}>All caught up!</p>
                  <p style={{ fontSize:".86rem" }}>No items need your approval right now. Check back soon.</p>
                </div>
              ) : (
                approvals.map(item => (
                  <div key={item.id} style={{ background:"rgba(3,3,10,.55)", padding:"1.4rem", borderRadius:14, border:"1px solid rgba(37,99,235,.1)", marginBottom:"1rem" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"1rem", flexWrap:"wrap", marginBottom:".8rem" }}>
                      <div>
                        <div style={{ display:"flex", alignItems:"center", gap:".7rem", marginBottom:".35rem" }}>
                          <span style={{ fontSize:"1.2rem" }}>🖼️</span>
                          <h3 style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:700, fontSize:"1rem" }}>{item.title}</h3>
                        </div>
                        {item.description && <p style={{ color:"#8a93ab", fontSize:".86rem", lineHeight:1.6, maxWidth:420 }}>{item.description}</p>}
                        {item.created_at && <p style={{ color:"#4a5268", fontSize:".74rem", marginTop:".4rem" }}>Added {new Date(item.created_at).toLocaleDateString("en-GB")}</p>}
                      </div>
                      <StatusChip status={item.status || "pending"}/>
                    </div>
                    {item.file_url && (
                      <a href={item.file_url} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:".4rem", color:"#60a5fa", fontSize:".84rem", textDecoration:"none", marginBottom:"1rem", fontFamily:"'Baloo 2',sans-serif", fontWeight:600 }}>
                        👁 View File →
                      </a>
                    )}
                    {(item.status === "pending" || !item.status) && (
                      <div style={{ display:"flex", gap:".8rem", flexWrap:"wrap" }}>
                        <button style={btn()} onClick={() => handleApproval(item.id,"approved")}>✓ Approve</button>
                        <button style={{ ...btn(false), border:"1px solid rgba(239,68,68,.25)", color:"#f87171" }} onClick={() => handleApproval(item.id,"rejected")}>✗ Request Changes</button>
                      </div>
                    )}
                    {item.status === "approved" && <p style={{ color:"#22d3ee", fontSize:".84rem", fontFamily:"'Baloo 2',sans-serif", fontWeight:600 }}>✅ You approved this item.</p>}
                    {item.status === "rejected"  && <p style={{ color:"#f87171", fontSize:".84rem", fontFamily:"'Baloo 2',sans-serif", fontWeight:600 }}>📝 Changes have been requested.</p>}
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── INVOICES ── */}
          {activeTab === "Invoices" && (
            <div style={{ ...cardSt, animation:"fadeUp .4s ease both" }}>
              <Lbl text="Billing & Payments"/>
              <h2 style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:700, marginBottom:"1.3rem" }}>Invoices</h2>

              {invoices.length === 0 ? (
                <div style={{ textAlign:"center", padding:"3rem 1rem", color:"#8a93ab" }}>
                  <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>💳</div>
                  <p style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:600, marginBottom:".4rem" }}>No invoices yet</p>
                  <p style={{ fontSize:".86rem" }}>Invoices from Pixel &amp; Brush will appear here when issued.</p>
                </div>
              ) : (
                <>
                  {/* summary */}
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:".8rem", marginBottom:"1.4rem" }}>
                    {[
                      { label:"Total Invoiced", value:"£"+invoices.reduce((sum,inv)=>sum+(inv.amount||0),0).toLocaleString() },
                      { label:"Paid",           value:"£"+invoices.filter(i=>i.status==="paid").reduce((sum,inv)=>sum+(inv.amount||0),0).toLocaleString() },
                      { label:"Outstanding",    value:"£"+invoices.filter(i=>i.status!=="paid").reduce((sum,inv)=>sum+(inv.amount||0),0).toLocaleString() },
                    ].map(c => (
                      <div key={c.label} style={{ background:"rgba(3,3,10,.55)", border:"1px solid rgba(37,99,235,.1)", borderRadius:12, padding:"1rem" }}>
                        <p style={{ color:"#6f7a96", fontSize:".7rem", marginBottom:".3rem" }}>{c.label}</p>
                        <p style={{ fontFamily:"'Baloo 2',sans-serif", fontSize:"1.4rem", fontWeight:800, background:"linear-gradient(135deg,#60a5fa,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{c.value}</p>
                      </div>
                    ))}
                  </div>

                  {invoices.map(inv => (
                    <div key={inv.id} style={{ padding:"1.1rem 1.3rem", borderRadius:12, background:"rgba(3,3,10,.55)", border:"1px solid rgba(37,99,235,.08)", marginBottom:".7rem", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
                      <div>
                        <div style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:700, fontSize:".95rem", marginBottom:".2rem" }}>
                          {inv.number ? `INV-${inv.number}` : `Invoice #${inv.id}`}
                        </div>
                        {inv.description && <p style={{ color:"#8a93ab", fontSize:".82rem" }}>{inv.description}</p>}
                        {inv.due_date && <p style={{ color:"#6f7a96", fontSize:".74rem", marginTop:".2rem" }}>Due: {new Date(inv.due_date).toLocaleDateString("en-GB")}</p>}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
                        <span style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:800, fontSize:"1.15rem" }}>£{(inv.amount||0).toLocaleString()}</span>
                        <StatusChip status={inv.status || "unpaid"}/>
                        {inv.invoice_url && (
                          <button onClick={() => window.open(inv.invoice_url,"_blank")} style={btn()}>View PDF</button>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* ── SUPPORT ── */}
          {activeTab === "Support" && (
            <div style={{ ...cardSt, animation:"fadeUp .4s ease both" }}>
              <Lbl text="Help & Support"/>
              <h2 style={{ fontFamily:"'Baloo 2',sans-serif", fontWeight:700, marginBottom:"1.1rem" }}>Support Centre</h2>
              <p style={{ color:"#8a93ab", marginBottom:"1.6rem", lineHeight:1.68, fontSize:".9rem" }}>
                Need help with your project? Reach out directly — we typically respond within a few hours on weekdays.
              </p>

              <div style={{ display:"flex", flexDirection:"column", gap:"1rem", marginBottom:"2rem" }}>
                {[
                  { icon:"✉️", label:"Email", value:"anilpte232@gmail.com", href:"mailto:anilpte232@gmail.com" },
                  { icon:"💬", label:"WhatsApp", value:"Chat on WhatsApp", href:"https://wa.me/447700000000" },
                  { icon:"📍", label:"Location", value:"United Kingdom", href:null },
                ].map((c,i) => (
                  <div key={i} style={{ background:"rgba(3,3,10,.55)", padding:"1rem 1.2rem", borderRadius:12, border:"1px solid rgba(37,99,235,.1)", display:"flex", alignItems:"center", gap:".9rem" }}>
                    <span style={{ fontSize:"1.3rem" }}>{c.icon}</span>
                    <div>
                      <div style={{ color:"#6f7a96", fontSize:".7rem", letterSpacing:".08em", textTransform:"uppercase", fontFamily:"'Baloo 2',sans-serif", fontWeight:600, marginBottom:".2rem" }}>{c.label}</div>
                      {c.href
                        ? <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ color:"#60a5fa", fontSize:".9rem", textDecoration:"none" }}>{c.value}</a>
                        : <span style={{ color:"#c5cfe0", fontSize:".9rem" }}>{c.value}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ snippet */}
              <div style={{ background:"rgba(37,99,235,.06)", border:"1px solid rgba(37,99,235,.16)", borderRadius:14, padding:"1.4rem" }}>
                <Lbl text="Quick Tips"/>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:".8rem" }}>
                  {[
                    "Use the Messages tab to send questions directly to your project team.",
                    "Check Approvals regularly — your feedback keeps the project moving.",
                    "All files shared by the agency are available in the Files tab.",
                    "Invoices and payment history are tracked in the Invoices tab.",
                  ].map((tip,i) => (
                    <li key={i} style={{ display:"flex", gap:".7rem", alignItems:"flex-start", color:"#8a93ab", fontSize:".86rem", lineHeight:1.6 }}>
                      <span style={{ color:"#2563eb", flexShrink:0 }}>▸</span>{tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
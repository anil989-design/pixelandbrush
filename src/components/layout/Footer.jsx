const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        padding: "1.5rem 1rem",
        background: "rgba(12, 6, 26, 0.78)",
        borderTop: "1px solid rgba(249,115,22,0.18)",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem" }}>
        <a
          href="https://www.linkedin.com/in/anilpanday-digital"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Anil Panday LinkedIn"
          style={{ color: "#fb923c", fontSize: 22 }}
        >
          <i className="bi bi-linkedin" />
        </a>
        <a
          href="mailto:chhetrianil232@gmail.com"
          aria-label="Email Anil Panday"
          style={{ color: "#c084fc", fontSize: 22 }}
        >
          <i className="bi bi-envelope-fill" />
        </a>
        <a
          href="/about"
          aria-label="About Anil Panday"
          style={{ color: "#fbbf24", fontSize: 14, fontWeight: 600, textDecoration: "none" }}
        >
          About Anil Panday
        </a>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "#a79ab8", textAlign: "center" }}>
        © {new Date().getFullYear()} <strong style={{ color: "#fff" }}>Pixel and Brush</strong> · Founded by{" "}
        <strong style={{ color: "#fb923c" }}>Anil Panday</strong> · Stratford, London, United Kingdom
      </p>
    </footer>
  );
};

export default Footer;

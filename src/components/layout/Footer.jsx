const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        padding: "1rem 0",
        background: "rgba(16, 13, 37, 0.55)",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        gap: "1.5rem",
      }}
    >
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        style={{ color: "#ffffff", fontSize: 22 }}
      >
        <i className="bi bi-instagram" />
      </a>
      <a
        href="https://x.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
        style={{ color: "#ffffff", fontSize: 22 }}
      >
        <i className="bi bi-twitter-x" />
      </a>
      <a
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        style={{ color: "#ffffff", fontSize: 22 }}
      >
        <i className="bi bi-linkedin" />
      </a>
    </footer>
  );
};

export default Footer;

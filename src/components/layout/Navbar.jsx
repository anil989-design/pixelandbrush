import { useState, useEffect } from "react";

const NAV_LINKS = [
  ["About", "/#about"],
  ["Work", "/#work"],
  ["Projects", "/#portfolio"],
  ["Pricing", "/#pricing"],
  ["Contact", "/#contact"],
  ["Bio", "/about"],
];

const Navbar = ({ vis = true }) => {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setSc(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: "1.1rem clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: sc ? "#050816" : "transparent",
          borderBottom: sc ? "1px solid rgba(145,94,255,0.18)" : "1px solid transparent",
          transition: "all 0.35s ease",
          opacity: vis ? 1 : 0,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a
            href="/"
            aria-label="Pixel and Brush home"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.65rem",
            }}
          >
            <img
              src="/logo-icon.webp"
              alt="Pixel and Brush logo"
              width="38"
              height="38"
              style={{
                width: 38,
                height: 38,
                borderRadius: 9,
                objectFit: "contain",
              }}
            />
            <span
              style={{
                color: "#ffffff",
                fontSize: 18,
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              Anil &nbsp;
              <span style={{ color: "#fb923c" }}>| Pixel and Brush</span>
            </span>
          </a>

          <ul
            className="nav-links"
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "row",
              gap: "2.25rem",
              margin: 0,
              padding: 0,
              alignItems: "center",
            }}
          >
            {NAV_LINKS.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  style={{
                    color: "#aaa6c3",
                    fontSize: 16,
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#aaa6c3";
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/login"
                style={{
                  background: "#151030",
                  border: "1px solid rgba(145,94,255,0.45)",
                  color: "#ffffff",
                  padding: "0.48rem 1.1rem",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Client Login
              </a>
            </li>
          </ul>

          <button
            className="hamburger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
            style={{
              display: "none",
              flexDirection: "column",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              zIndex: 810,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 24,
                  height: 2,
                  background: "#ffffff",
                  borderRadius: 2,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      <div className={`mobile-overlay${open ? " open" : ""}`} onClick={close} />
      <div className={`mobile-drawer${open ? " open" : ""}`}>
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1.2rem" }}>
          <img
            src="/logo-icon.webp"
            alt="Pixel and Brush logo"
            width="36"
            height="36"
            style={{ width: 36, height: 36, borderRadius: 9 }}
          />
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
            Anil | <span style={{ color: "#fb923c" }}>Pixel and Brush</span>
          </span>
        </div>
        {NAV_LINKS.map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={close}
            style={{
              color: "#aaa6c3",
              textDecoration: "none",
              fontSize: 16,
              fontWeight: 500,
              padding: ".75rem 0",
              borderBottom: "1px solid rgba(145,94,255,.12)",
              display: "block",
            }}
          >
            {label}
          </a>
        ))}
        <a
          href="/login"
          onClick={close}
          style={{
            marginTop: "1.2rem",
            textAlign: "center",
            padding: ".8rem",
            background: "#915EFF",
            borderRadius: 10,
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Client Login
        </a>
      </div>
    </>
  );
};

export default Navbar;

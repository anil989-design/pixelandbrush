import { useEffect, useState } from "react";
import menu from "../../assets/menu.svg";
import close from "../../assets/close.svg";

const NAV_LINKS = [
  { id: "about", title: "About" },
  { id: "work", title: "Experience" },
  { id: "portfolio", title: "Projects" },
  { id: "contact", title: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "1.15rem clamp(1.5rem, 5vw, 4rem)",
        position: "fixed",
        top: 0,
        zIndex: 20,
        background: scrolled ? "rgba(7, 4, 14, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(249,115,22,0.18)" : "1px solid transparent",
        transition: "all 0.25s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            textDecoration: "none",
          }}
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src="/logo-icon.webp"
            alt="Pixel and Brush logo"
            width="40"
            height="40"
            style={{
              width: 40,
              height: 40,
              objectFit: "contain",
              borderRadius: 10,
              border: "1px solid rgba(249,115,22,0.35)",
              boxShadow: "0 0 16px rgba(249,115,22,0.28)",
            }}
          />
          <div
            style={{
              fontSize: 19,
              fontWeight: 800,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "baseline",
              gap: "0.3rem",
              margin: 0,
            }}
          >
            <span style={{ color: "#ffffff" }}>Pixel</span>
            <span style={{ color: "#a1a1aa", fontStyle: "italic", fontWeight: 400, fontSize: "0.8em" }}>and</span>
            <span
              style={{
                background: "linear-gradient(135deg,#fbbf24,#f97316,#ea580c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Brush
            </span>
            <span className="d-none d-md-inline" style={{ color: "#c084fc", fontSize: 15, fontWeight: 600 }}>
              &nbsp;| Anil Panday
            </span>
          </div>
        </a>

        <ul
          className="d-none d-sm-flex"
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "2.2rem",
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((nav) => (
            <li
              key={nav.id}
              onClick={() => setActive(nav.title)}
              style={{
                color: active === nav.title ? "#fb923c" : "#c4b5dc",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fb923c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = active === nav.title ? "#fb923c" : "#c4b5dc";
              }}
            >
              <a href={`#${nav.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                {nav.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/login"
              style={{
                background: "linear-gradient(135deg,#7c3aed 0%,#db2777 45%,#f97316 100%)",
                color: "#ffffff",
                padding: "0.48rem 1.15rem",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(249,115,22,0.3)",
              }}
            >
              Client Login
            </a>
          </li>
        </ul>

        <div
          className="d-flex d-sm-none"
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={toggle ? close : menu}
            alt="menu"
            width="28"
            height="28"
            style={{ width: 28, height: 28, objectFit: "contain", cursor: "pointer" }}
            onClick={() => setToggle(!toggle)}
          />

          <div
            className="black-gradient"
            style={{
              display: !toggle ? "none" : "flex",
              padding: "1.5rem",
              position: "absolute",
              top: 52,
              right: 0,
              margin: "0.5rem 0",
              minWidth: 160,
              zIndex: 10,
              borderRadius: 12,
              border: "1px solid rgba(249,115,22,0.3)",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                flex: 1,
                flexDirection: "column",
                gap: "1rem",
                margin: 0,
                padding: 0,
              }}
            >
              {NAV_LINKS.map((nav) => (
                <li
                  key={nav.id}
                  style={{
                    fontWeight: 500,
                    cursor: "pointer",
                    fontSize: 16,
                    color: active === nav.title ? "#fb923c" : "#c4b5dc",
                  }}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {nav.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/login"
                  style={{
                    color: "#fb923c",
                    fontWeight: 700,
                    fontSize: 15,
                    textDecoration: "none",
                  }}
                >
                  Client Login →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

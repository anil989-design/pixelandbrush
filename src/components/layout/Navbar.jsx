import { useEffect, useState } from "react";
import menu from "../../assets/menu.svg";
import close from "../../assets/close.svg";

const NAV_LINKS = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
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
        padding: "1.25rem clamp(1.5rem, 5vw, 4rem)",
        position: "fixed",
        top: 0,
        zIndex: 20,
        background: scrolled ? "#050816" : "transparent",
        transition: "background 0.25s ease",
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
            gap: "0.5rem",
            textDecoration: "none",
          }}
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src="/logo-icon.webp"
            alt="logo"
            width="36"
            height="36"
            style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 8 }}
          />
          <p
            style={{
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              margin: 0,
            }}
          >
            Anil &nbsp;
            <span className="d-none d-sm-inline">| Pixel and Brush</span>
          </p>
        </a>

        <ul
          className="d-none d-sm-flex"
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "row",
            gap: "2.5rem",
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((nav) => (
            <li
              key={nav.id}
              onClick={() => setActive(nav.title)}
              style={{
                color: active === nav.title ? "#ffffff" : "#aaa6c3",
                fontSize: 18,
                fontWeight: 500,
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = active === nav.title ? "#ffffff" : "#aaa6c3";
              }}
            >
              <a href={`#${nav.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                {nav.title}
              </a>
            </li>
          ))}
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
              minWidth: 140,
              zIndex: 10,
              borderRadius: 12,
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
                    color: active === nav.title ? "#ffffff" : "#aaa6c3",
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
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

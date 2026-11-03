import BackToTop from "../../components/effects/BackToTop";
import Cursor from "../../components/effects/Cursor";
import HexMesh from "../../components/effects/HexMesh";
import ScrollProgress from "../../components/effects/ScrollProgress";
import WhatsAppButton from "../../components/effects/WhatsAppButton";
import Button from "../../components/common/Button";
import SectionLabel from "../../components/common/SectionLabel";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import { CONTACT } from "../../config/constants";
import { PAGE_META, SOCIAL } from "../../config/seo";
import usePageMeta from "../../hooks/usePageMeta";
import GlobalStyles from "../../styles/GlobalStyles";

const gradientText = { background: "linear-gradient(135deg,#60a5fa,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" };
const paragraph = { color: "#8a93ab", lineHeight: 1.8, fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", marginBottom: "1.3rem" };
const inlineLink = { color: "#60a5fa", textDecoration: "none" };
const frameRadius = "50% 50% 46% 46% / 40% 40% 60% 60%";

/** /about – who Anil Panday is, what Pixel & Brush does, and how to get in touch. */
export default function AboutPage() {
  usePageMeta(PAGE_META.about);

  return (
    <div style={{ background: "#060912", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <GlobalStyles />
      <HexMesh />
      <Cursor />
      <ScrollProgress />
      <BackToTop />
      <WhatsAppButton />
      <Navbar vis />

      <main>
        <section style={{ padding: "9rem 0 6rem", position: "relative", zIndex: 1 }}>
          <div className="container px-4 px-lg-5">
            <div className="row align-items-center justify-content-between g-5">
              <div className="col-12 col-lg-7">
                <SectionLabel text="About Anil Panday" />
                <h1 style={{ fontWeight: 800, fontSize: "clamp(2.2rem,4.5vw,3.6rem)", letterSpacing: "-.02em", lineHeight: 1.08, marginBottom: "1.8rem" }}>
                  Anil Panday, Digital Designer &amp; <span style={gradientText}>Founder of Pixel &amp; Brush</span>
                </h1>

                <p style={paragraph}>
                  Hi, I'm Anil Panday, a digital designer based in London and originally from Nepal. Alongside
                  running my studio, I'm studying Business Management at Ravensbourne University London, so I
                  approach every project from both sides: how it looks, and how it helps a business grow.
                </p>
                <p style={paragraph}>
                  Pixel &amp; Brush is the freelance agency founded by Anil Panday to give small businesses
                  senior-level digital work without agency overheads. We offer web development, branding, digital
                  marketing and AI solutions, plus friendly ongoing client support once your project is live. You
                  work directly with me from the first call to launch day.
                </p>
                <p style={paragraph}>
                  Want to work with Anil Panday and Pixel &amp; Brush? Send a message through the{" "}
                  <a href="/#contact" style={inlineLink}>contact form</a>, email me at{" "}
                  <a href={`mailto:${CONTACT.email}`} style={inlineLink}>{CONTACT.email}</a>, or connect with me on{" "}
                  <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" style={inlineLink}>LinkedIn</a>.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
                  <Button primary href="/#contact">Start a Project →</Button>
                  <Button href={`mailto:${CONTACT.email}`}>Email Me</Button>
                </div>
              </div>

              <div className="col-12 col-lg-5 text-center">
                <div style={{ position: "relative", width: "clamp(240px,26vw,360px)", margin: "0 auto" }}>
                  <div style={{ position: "absolute", bottom: "-8%", left: "10%", right: "10%", height: "55%", background: "radial-gradient(ellipse,rgba(37,99,235,.42) 0%,transparent 70%)", filter: "blur(26px)", zIndex: 0 }} />
                  <div style={{ position: "relative", zIndex: 1, border: "1px solid rgba(37,99,235,.25)", borderRadius: frameRadius, overflow: "hidden", aspectRatio: "3/4", background: "linear-gradient(160deg,rgba(30,58,138,.18),rgba(34,211,238,.07))" }}>
                    <img
                      src="/me.webp"
                      alt="Anil Panday, Digital Designer in London"
                      width="720"
                      height="960"
                      fetchPriority="high"
                      decoding="async"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

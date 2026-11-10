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
import { PAGE_META } from "../../config/seo";
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
                <SectionLabel text="About Anil Pandey" />
                <h1 style={{ fontWeight: 800, fontSize: "clamp(2.2rem,4.5vw,3.6rem)", letterSpacing: "-.02em", lineHeight: 1.08, marginBottom: "1.8rem" }}>
                  Anil Pandey — <span style={gradientText}>Business, AI &amp; Technology in London</span>
                </h1>

                <p style={paragraph}>
                  Hi, I'm <strong>Anil Pandey</strong> (also spelled <strong>Anil Panday</strong>), based in{" "}
                  <strong>London, United Kingdom</strong> and originally from Nepal. I am studying{" "}
                  <strong>Business Management with International</strong> at{" "}
                  <strong>Ravensbourne University London</strong>, where I focus on connecting business strategy with
                  modern technology.
                </p>
                <p style={paragraph}>
                  My core interests include <strong>Artificial Intelligence</strong>, <strong>Business Analytics</strong>,{" "}
                  <strong>Python and Data Analysis</strong>, <strong>AI Agents and Automation</strong>, and{" "}
                  <strong>Entrepreneurship</strong>. I am the creator of <strong>FinAI</strong>, a student finance
                  project that applies Python data analysis and AI automation to help university students manage budgets
                  and understand spending patterns, and the founder of Pixel &amp; Brush.
                </p>
                <p style={paragraph}>
                  Want to connect with Anil Pandey or discuss a project? Send a message through the{" "}
                  <a href="/#contact" style={inlineLink}>contact form</a> or email me at{" "}
                  <a href={`mailto:${CONTACT.email}`} style={inlineLink}>{CONTACT.email}</a>.
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
                  <Button primary href="/#contact">Get in Touch →</Button>
                  <Button href={`mailto:${CONTACT.email}`}>Email Me</Button>
                </div>

                <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(37,99,235,.18)" }}>
                  <h2 style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, fontSize: "1.35rem", color: "#e8edf7", marginBottom: "1rem" }}>
                    Articles &amp; Case Studies by Anil Pandey
                  </h2>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
                    <li>
                      <a href="/articles/who-is-anil-pandey" style={inlineLink}>
                        Who Is Anil Pandey? My Journey in Business and Technology →
                      </a>
                    </li>
                    <li>
                      <a href="/articles/finai-student-finance-project" style={inlineLink}>
                        FinAI: Building an AI &amp; Analytics Approach to Student Finance in London →
                      </a>
                    </li>
                    <li>
                      <a href="/articles/learning-python-and-business-analytics" style={inlineLink}>
                        Learning Python and Business Analytics as a Business Management Student in London →
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-12 col-lg-5 text-center">
                <div style={{ position: "relative", width: "clamp(240px,26vw,360px)", margin: "0 auto" }}>
                  <div style={{ position: "absolute", bottom: "-8%", left: "10%", right: "10%", height: "55%", background: "radial-gradient(ellipse,rgba(37,99,235,.42) 0%,transparent 70%)", filter: "blur(26px)", zIndex: 0 }} />
                  <div style={{ position: "relative", zIndex: 1, border: "1px solid rgba(37,99,235,.25)", borderRadius: frameRadius, overflow: "hidden", aspectRatio: "3/4", background: "linear-gradient(160deg,rgba(30,58,138,.18),rgba(34,211,238,.07))" }}>
                    <img
                      src="/anil-pandey-anil-panday.jpg"
                      alt="Anil Panday (Anil Pandey) — Business Management with International student at Ravensbourne University London"
                      width="768"
                      height="1024"
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

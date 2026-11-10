/**
 * SEO constants shared by the per-page meta hook (usePageMeta).
 * The static defaults + JSON-LD for crawlers live in public/index.html – keep the two in sync.
 */

export const SITE_URL = "https://pixelandbrush.vercel.app";

/**
 * Public profiles (no social media or GitHub links).
 */
export const SOCIAL = Object.freeze({});

export const PAGE_META = Object.freeze({
  home: {
    path: "/",
    title: "Anil Pandey | Business, AI & Digital Builder in London",
    description:
      "Anil Pandey is a London-based Business Management with International student at Ravensbourne University London, building FinAI and working across AI, Python, and Business Analytics.",
  },
  about: {
    path: "/about",
    title: "About Anil Pandey | Ravensbourne University London & FinAI",
    description:
      "Meet Anil Pandey, a London-based Business Management with International student at Ravensbourne University London exploring Artificial Intelligence, Python, Business Analytics, and FinAI.",
  },
});

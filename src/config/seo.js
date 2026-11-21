/**
 * SEO constants shared by the per-page meta hook (usePageMeta).
 * The static defaults + JSON-LD for crawlers live in public/index.html – keep the two in sync.
 */

export const SITE_URL = "https://pixelandbrush.vercel.app";
export const SITE_NAME = "Pixel & Brush";

/**
 * Public profiles (no social media or GitHub links).
 */
export const SOCIAL = Object.freeze({});

export const PAGE_META = Object.freeze({
  home: {
    path: "/",
    title: "Pixel & Brush | Anil Pandey — Business, AI & Digital Studio in London",
    description:
      "Pixel & Brush is a London digital creative & AI studio founded by Anil Pandey, a Business Management with International student at Ravensbourne University London and creator of FinAI.",
  },
  about: {
    path: "/about",
    title: "About Anil Pandey | Pixel & Brush · Ravensbourne University London & FinAI",
    description:
      "Meet Anil Pandey, founder of Pixel & Brush and a London-based Business Management with International student at Ravensbourne University London exploring Artificial Intelligence, Python, Business Analytics, and FinAI.",
  },
});

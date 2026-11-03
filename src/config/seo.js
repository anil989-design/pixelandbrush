/**
 * SEO constants shared by the per-page meta hook (usePageMeta).
 * The static defaults + JSON-LD for crawlers live in public/index.html – keep the two in sync.
 */

export const SITE_URL = "https://pixelandbrush.vercel.app";

/**
 * Social profiles.
 */
export const SOCIAL = Object.freeze({
  linkedin: "https://www.linkedin.com/in/anilpanday-digital/",
  github: "https://github.com/anil989-design",
});

export const PAGE_META = Object.freeze({
  home: {
    path: "/",
    title: "Anil Panday | Digital Designer & Founder of Pixel & Brush, London",
    description:
      "Anil Panday is a London-based digital designer and founder of Pixel & Brush, a freelance agency for web development, branding and digital marketing.",
  },
  about: {
    path: "/about",
    title: "About Anil Panday | Digital Designer & Founder of Pixel & Brush",
    description:
      "Meet Anil Panday, a London-based digital designer, Ravensbourne University London student and founder of Pixel & Brush – web development, branding, digital marketing and AI solutions.",
  },
});

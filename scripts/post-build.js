const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");
const INDEX_HTML = path.join(BUILD_DIR, "index.html");

if (!fs.existsSync(INDEX_HTML)) {
  console.error("Error: build/index.html not found. Run react-scripts build first.");
  process.exit(1);
}

// Always clean up any previously injected static fallback markup if re-running
const rawBuiltHtml = fs.readFileSync(INDEX_HTML, "utf8");
const baseHtml = rawBuiltHtml.replace(/<div id="root">[\s\S]*?<\/div>/, '<div id="root"></div>');

// 1. Prepare static / (Home) HTML: ensure canonical, verification comment and home metadata are exact
let homeHtml = baseHtml;

// Ensure Google Search Console verification comment is present for the user
if (!homeHtml.includes("<!-- GOOGLE SEARCH CONSOLE VERIFICATION TAG GOES HERE -->")) {
  homeHtml = homeHtml.replace(
    /<head>/i,
    "<head>\n    <!-- GOOGLE SEARCH CONSOLE VERIFICATION TAG GOES HERE -->"
  );
}

if (!homeHtml.includes('<link rel="canonical" href="https://pixelandbrush.vercel.app/" />')) {
  homeHtml = homeHtml.replace(
    /<\/head>/i,
    '  <link rel="canonical" href="https://pixelandbrush.vercel.app/" />\n</head>'
  );
}

// 2. Prepare static /about HTML
// Update Title, Description, Canonical, OG tags, Twitter tags, and inject static fallback markup
let aboutHtml = baseHtml;

if (!aboutHtml.includes("<!-- GOOGLE SEARCH CONSOLE VERIFICATION TAG GOES HERE -->")) {
  aboutHtml = aboutHtml.replace(
    /<head>/i,
    "<head>\n    <!-- GOOGLE SEARCH CONSOLE VERIFICATION TAG GOES HERE -->"
  );
}

const aboutTitle = "About Anil Panday | Digital Designer & Founder of Pixel & Brush";
const aboutDesc = "Meet Anil Panday, a London-based digital designer, Ravensbourne University London student and founder of Pixel & Brush – web development, branding, digital marketing and AI solutions.";
const aboutUrl = "https://pixelandbrush.vercel.app/about";

aboutHtml = aboutHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${aboutTitle}</title>`);
aboutHtml = aboutHtml.replace(/<meta name="description" content="[^"]*"/i, `<meta name="description" content="${aboutDesc}"`);
aboutHtml = aboutHtml.replace(/<meta property="og:title" content="[^"]*"/i, `<meta property="og:title" content="${aboutTitle}"`);
aboutHtml = aboutHtml.replace(/<meta property="og:description" content="[^"]*"/i, `<meta property="og:description" content="${aboutDesc}"`);
aboutHtml = aboutHtml.replace(/<meta property="og:url" content="[^"]*"/i, `<meta property="og:url" content="${aboutUrl}"`);
aboutHtml = aboutHtml.replace(/<meta name="twitter:title" content="[^"]*"/i, `<meta name="twitter:title" content="${aboutTitle}"`);
aboutHtml = aboutHtml.replace(/<meta name="twitter:description" content="[^"]*"/i, `<meta name="twitter:description" content="${aboutDesc}"`);

// Replace canonical link
if (aboutHtml.includes('<link rel="canonical"')) {
  aboutHtml = aboutHtml.replace(/<link rel="canonical" href="[^"]*"/i, `<link rel="canonical" href="${aboutUrl}"`);
} else {
  aboutHtml = aboutHtml.replace(/<\/head>/i, `  <link rel="canonical" href="${aboutUrl}" />\n</head>`);
}

// Inject static prerendered HTML content inside <div id="root"></div> so search engine bots without JS see the exact H1, paragraphs, image with alt text
const aboutPrerenderContent = `
  <main style="background:#060912;color:#e8edf7;padding:9rem 1.5rem 6rem;font-family:'Outfit',sans-serif;">
    <div style="max-width:1140px;margin:0 auto;">
      <p style="color:#2563eb;font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:0.7rem;margin-bottom:0.65rem;">About Anil Panday</p>
      <h1 style="font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(2.2rem,4.5vw,3.6rem);letter-spacing:-.02em;line-height:1.08;margin-bottom:1.8rem;color:#e8edf7;">
        Anil Panday, Digital Designer &amp; <span style="background:linear-gradient(135deg,#60a5fa,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Founder of Pixel &amp; Brush</span>
      </h1>
      <p style="color:#8a93ab;line-height:1.8;font-size:1.05rem;margin-bottom:1.3rem;">
        Hi, I'm Anil Panday, a digital designer based in London and originally from Nepal. Alongside running my studio, I'm studying Business Management at Ravensbourne University London, so I approach every project from both sides: how it looks, and how it helps a business grow.
      </p>
      <p style="color:#8a93ab;line-height:1.8;font-size:1.05rem;margin-bottom:1.3rem;">
        Pixel &amp; Brush is the freelance agency founded by Anil Panday to give small businesses senior-level digital work without agency overheads. We offer web development, branding, digital marketing and AI solutions, plus friendly ongoing client support once your project is live. You work directly with me from the first call to launch day.
      </p>
      <p style="color:#8a93ab;line-height:1.8;font-size:1.05rem;margin-bottom:1.3rem;">
        Want to work with Anil Panday and Pixel &amp; Brush? Send a message through the <a href="/#contact" style="color:#60a5fa;text-decoration:none;">contact form</a>, email me at <a href="mailto:anilpte232@gmail.com" style="color:#60a5fa;text-decoration:none;">anilpte232@gmail.com</a>, or connect with me on <a href="https://www.linkedin.com/in/anilpanday-digital/" target="_blank" rel="noopener noreferrer" style="color:#60a5fa;text-decoration:none;">LinkedIn</a>.
      </p>
      <div style="margin-top:2rem;">
        <img src="/me.webp" alt="Anil Panday, Digital Designer in London" width="720" height="960" style="max-width:320px;border-radius:18px;display:block;" />
      </div>
    </div>
  </main>
`;

aboutHtml = aboutHtml.replace('<div id="root"></div>', `<div id="root">${aboutPrerenderContent}</div>`);

// Also provide Home static fallback content inside index.html for bots
const homePrerenderContent = `
  <main style="background:#060912;color:#e8edf7;padding:8rem 1.5rem 5rem;font-family:'Outfit',sans-serif;">
    <div style="max-width:1140px;margin:0 auto;">
      <h1 style="font-family:'Baloo 2',sans-serif;font-size:clamp(3rem,8vw,6.5rem);font-weight:800;line-height:1.02;color:#e8edf7;">
        We Craft Digital World
      </h1>
      <p style="font-size:clamp(1.1rem,2.2vw,1.4rem);color:#9aa6c4;line-height:1.65;max-width:480px;margin:1.6rem 0 2.4rem;">
        Web development, graphic design &amp; social media management — for businesses ready to own their digital space. Founded by Anil Panday.
      </p>
      <img src="/me.webp" alt="Anil Panday, Digital Designer in London" width="720" height="960" style="max-width:320px;display:none;" />
    </div>
  </main>
`;
homeHtml = homeHtml.replace('<div id="root"></div>', `<div id="root">${homePrerenderContent}</div>`);

// Write build/index.html (Home)
fs.writeFileSync(INDEX_HTML, homeHtml, "utf8");

// Create build/about/index.html (and build/about.html for direct route support)
const aboutDir = path.join(BUILD_DIR, "about");
if (!fs.existsSync(aboutDir)) {
  fs.mkdirSync(aboutDir, { recursive: true });
}
fs.writeFileSync(path.join(aboutDir, "index.html"), aboutHtml, "utf8");
fs.writeFileSync(path.join(BUILD_DIR, "about.html"), aboutHtml, "utf8");

console.log("Static HTML generated successfully:");
console.log("- build/index.html (Home with static H1, Anil Panday metadata & schema)");
console.log("- build/about/index.html & build/about.html (About with static H1, Anil Panday bio & metadata)");

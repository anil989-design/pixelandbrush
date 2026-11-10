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
let aboutHtml = baseHtml;

if (!aboutHtml.includes("<!-- GOOGLE SEARCH CONSOLE VERIFICATION TAG GOES HERE -->")) {
  aboutHtml = aboutHtml.replace(
    /<head>/i,
    "<head>\n    <!-- GOOGLE SEARCH CONSOLE VERIFICATION TAG GOES HERE -->"
  );
}

const aboutTitle = "About Anil Pandey | Ravensbourne University London & FinAI";
const aboutDesc = "Meet Anil Pandey, a London-based Business Management with International student at Ravensbourne University London exploring Artificial Intelligence, Python, Business Analytics, and FinAI.";
const aboutUrl = "https://pixelandbrush.vercel.app/about";

aboutHtml = aboutHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${aboutTitle}</title>`);
aboutHtml = aboutHtml.replace(/<meta name="description" content="[^"]*"/i, `<meta name="description" content="${aboutDesc}"`);
aboutHtml = aboutHtml.replace(/<meta property="og:title" content="[^"]*"/i, `<meta property="og:title" content="${aboutTitle}"`);
aboutHtml = aboutHtml.replace(/<meta property="og:description" content="[^"]*"/i, `<meta property="og:description" content="${aboutDesc}"`);
aboutHtml = aboutHtml.replace(/<meta property="og:url" content="[^"]*"/i, `<meta property="og:url" content="${aboutUrl}"`);
aboutHtml = aboutHtml.replace(/<meta name="twitter:title" content="[^"]*"/i, `<meta name="twitter:title" content="${aboutTitle}"`);
aboutHtml = aboutHtml.replace(/<meta name="twitter:description" content="[^"]*"/i, `<meta name="twitter:description" content="${aboutDesc}"`);

if (aboutHtml.includes('<link rel="canonical"')) {
  aboutHtml = aboutHtml.replace(/<link rel="canonical" href="[^"]*"/i, `<link rel="canonical" href="${aboutUrl}"`);
} else {
  aboutHtml = aboutHtml.replace(/<\/head>/i, `  <link rel="canonical" href="${aboutUrl}" />\n</head>`);
}

const aboutPrerenderContent = `
  <main style="background:#060912;color:#e8edf7;padding:9rem 1.5rem 6rem;font-family:'Outfit',sans-serif;">
    <div style="max-width:1140px;margin:0 auto;">
      <p style="color:#2563eb;font-weight:700;letter-spacing:.22em;text-transform:uppercase;font-size:0.7rem;margin-bottom:0.65rem;">About Anil Pandey</p>
      <h1 style="font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(2.2rem,4.5vw,3.6rem);letter-spacing:-.02em;line-height:1.08;margin-bottom:1.8rem;color:#e8edf7;">
        Anil Pandey — <span style="background:linear-gradient(135deg,#60a5fa,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Business, AI &amp; Technology in London</span>
      </h1>
      <p style="color:#8a93ab;line-height:1.8;font-size:1.05rem;margin-bottom:1.3rem;">
        Hi, I'm <strong>Anil Pandey</strong> (also spelled <strong>Anil Panday</strong>), based in London, United Kingdom and originally from Nepal. I am studying <strong>Business Management with International</strong> at <strong>Ravensbourne University London</strong>, where I focus on connecting business strategy with modern technology.
      </p>
      <p style="color:#8a93ab;line-height:1.8;font-size:1.05rem;margin-bottom:1.3rem;">
        My core interests include Artificial Intelligence, Business Analytics, Python and Data Analysis, AI Agents and Automation, and Entrepreneurship. I am the creator of <strong>FinAI</strong>, a student finance project that applies Python data analysis and AI automation to help university students manage budgets and understand spending patterns, and the founder of Pixel &amp; Brush.
      </p>
      <p style="color:#8a93ab;line-height:1.8;font-size:1.05rem;margin-bottom:1.3rem;">
        Want to connect with Anil Pandey or discuss a project? Send a message through the <a href="/#contact" style="color:#60a5fa;text-decoration:none;">contact form</a> or email me at <a href="mailto:anilpte232@gmail.com" style="color:#60a5fa;text-decoration:none;">anilpte232@gmail.com</a>.
      </p>
      <div style="margin-top:2rem;">
        <img src="/anil-pandey-anil-panday.jpg" alt="Anil Pandey — Business Management with International student at Ravensbourne University London" width="768" height="1024" style="max-width:320px;border-radius:18px;display:block;" />
      </div>
      <div style="margin-top:3rem;padding-top:2rem;border-top:1px solid rgba(37,99,235,.18);">
        <h2 style="font-family:'Baloo 2',sans-serif;font-weight:700;font-size:1.35rem;color:#e8edf7;margin-bottom:1rem;">Articles &amp; Case Studies by Anil Pandey</h2>
        <ul>
          <li><a href="/articles/who-is-anil-pandey" style="color:#60a5fa;">Who Is Anil Pandey? My Journey in Business and Technology</a></li>
          <li><a href="/articles/finai-student-finance-project" style="color:#60a5fa;">FinAI: Building an AI &amp; Analytics Approach to Student Finance in London</a></li>
          <li><a href="/articles/learning-python-and-business-analytics" style="color:#60a5fa;">Learning Python and Business Analytics as a Business Management Student in London</a></li>
        </ul>
      </div>
    </div>
  </main>
`;

aboutHtml = aboutHtml.replace('<div id="root"></div>', `<div id="root">${aboutPrerenderContent}</div>`);

const homePrerenderContent = `
  <main style="background:#060912;color:#e8edf7;padding:8rem 1.5rem 5rem;font-family:'Outfit',sans-serif;">
    <div style="max-width:1140px;margin:0 auto;">
      <h1 style="font-family:'Baloo 2',sans-serif;font-size:clamp(3rem,8vw,6.5rem);font-weight:800;line-height:1.02;color:#e8edf7;">
        We Craft Digital World
      </h1>
      <p style="font-size:clamp(1.1rem,2.2vw,1.4rem);color:#9aa6c4;line-height:1.65;max-width:480px;margin:1.6rem 0 2.4rem;">
        Web development, graphic design &amp; digital solutions — founded by Anil Pandey, Business Management with International student at Ravensbourne University London and creator of FinAI.
      </p>
      <img src="/anil-pandey-anil-panday.jpg" alt="Anil Pandey — Ravensbourne University London" width="768" height="1024" style="max-width:320px;display:none;" />
    </div>
  </main>
`;
homeHtml = homeHtml.replace('<div id="root"></div>', `<div id="root">${homePrerenderContent}</div>`);

fs.writeFileSync(INDEX_HTML, homeHtml, "utf8");

const aboutDir = path.join(BUILD_DIR, "about");
if (!fs.existsSync(aboutDir)) {
  fs.mkdirSync(aboutDir, { recursive: true });
}
fs.writeFileSync(path.join(aboutDir, "index.html"), aboutHtml, "utf8");
fs.writeFileSync(path.join(BUILD_DIR, "about.html"), aboutHtml, "utf8");

// 3. Generate standalone SEO Article Pages under build/articles/<slug>/index.html
const articles = [
  {
    slug: "who-is-anil-pandey",
    title: "Who Is Anil Pandey? My Journey in Business and Technology | Anil Pandey, London",
    h1: "Who Is Anil Pandey? My Journey in Business and Technology",
    description:
      "Meet Anil Pandey, a Business Management with International student at Ravensbourne University London exploring AI, Python, business analytics, and FinAI in London, UK.",
    bodyHtml: `
      <p>If you search for <strong>Anil Pandey</strong> on Google, you will find several people around the world who share my name—from film lyricists and academic researchers to software developers in other countries.</p>
      <p>I wrote this article to introduce who I am, share my academic and technical journey in <strong>London, United Kingdom</strong>, and document the projects I am building across <strong>business management, artificial intelligence, Python, and business analytics</strong>.</p>
      <h2>From Nepal to London: Studying Business Management with International</h2>
      <p>My name is <strong>Anil Pandey</strong> (also spelled <strong>Anil Panday</strong>). I am originally from Nepal and based in <strong>London, United Kingdom</strong>, where I study <strong>Business Management with International</strong> at <strong>Ravensbourne University London</strong>.</p>
      <p>Studying international business management in London has shaped how I view modern organisations. In today's economy, business management and technology are inseparable. Whether an organisation is planning its finances, analysing market trends, or improving everyday operations, the strongest decisions combine clear management thinking with data analysis and intelligent automation.</p>
      <h2>Bridging Business Strategy, Python, and Artificial Intelligence</h2>
      <p>Alongside my university studies in <strong>Business Management with International</strong>, I spend my time learning and building with practical technology tools across four main areas:</p>
      <ul>
        <li><strong>Artificial Intelligence &amp; AI Agents:</strong> Exploring how AI models, autonomous agents, and workflow automation simplify complex research, reporting, and operational tasks.</li>
        <li><strong>Business Analytics:</strong> Using quantitative analysis to turn raw numbers into clear business insights—tracking KPIs, cash flow, and performance trends.</li>
        <li><strong>Python and Data Analysis:</strong> Writing Python scripts to clean datasets, explore patterns, and automate repetitive analytical work.</li>
        <li><strong>Entrepreneurship &amp; Practical Projects:</strong> Applying management and technical concepts to real-world problems, starting with student finance through my project, <strong>FinAI</strong>.</li>
      </ul>
      <h2>Building FinAI: A Student Finance &amp; Analytics Project</h2>
      <p>Living and studying in <strong>London</strong> makes one challenge immediately obvious: managing student finance requires constant attention. That experience led me to start <strong>FinAI</strong>, a student finance project built around <strong>business analytics, Python data analysis, and artificial intelligence</strong>.</p>
      <p>Instead of relying on complicated manual spreadsheets, FinAI focuses on structuring student expenses clearly, applying cash-flow runway and budget variance metrics, and using AI summarization to give students practical feedback on weekly spending habits.</p>
    `,
  },
  {
    slug: "finai-student-finance-project",
    title: "FinAI by Anil Pandey | AI Student Finance & Business Analytics Project in London",
    h1: "FinAI: Building an AI & Analytics Approach to Student Finance in London",
    description:
      "How Anil Pandey, a Business Management with International student at Ravensbourne University London, is building FinAI to simplify student finance with AI and Python.",
    bodyHtml: `
      <p>Anyone who has studied in <strong>London, United Kingdom</strong> knows that managing money as a university student is rarely simple. Income often arrives in uneven intervals while expenses happen every day across rent, TfL transport, groceries, subscriptions, and study materials.</p>
      <p>As a student studying <strong>Business Management with International</strong> at <strong>Ravensbourne University London</strong>, I asked a practical question: <em>What if we applied the same business analytics and AI automation tools that organisations use for cash-flow forecasting to everyday student finance?</em> That question led to <strong>FinAI</strong>.</p>
      <h2>What Is FinAI?</h2>
      <p><strong>FinAI</strong> is a student finance project created by <strong>Anil Pandey</strong> combining <strong>Python data analysis</strong>, <strong>business analytics principles</strong>, and <strong>artificial intelligence</strong> to help students understand and manage their personal finances more effectively.</p>
      <h2>1. Clear Expense Categorisation with Python</h2>
      <p>By structuring transaction data cleanly using <strong>Python</strong>, FinAI organises spending into meaningful student categories: accommodation, transport, groceries, academic essentials, and discretionary spending.</p>
      <h2>2. Business Analytics Applied to Personal Cash Flow</h2>
      <p>In <strong>business management</strong>, managers rely on burn rate, runway, and variance analysis. FinAI translates these concepts into student metrics:</p>
      <ul>
        <li><strong>Term Runway:</strong> At the current daily spending pace, how many weeks will the student's balance last?</li>
        <li><strong>Budget Variance:</strong> Which spending categories are trending above the planned weekly average?</li>
        <li><strong>Recurring Costs:</strong> Which small subscriptions compound over a 12-week semester?</li>
      </ul>
      <h2>3. AI-Assisted Financial Guidance and Automation</h2>
      <p>Where <strong>Artificial Intelligence</strong> and <strong>AI agents</strong> add real value is interpretation—summarising weekly spending patterns in plain English and suggesting realistic adjustments to stay on track for the semester.</p>
    `,
  },
  {
    slug: "learning-python-and-business-analytics",
    title: "Learning Python and Business Analytics in London | Anil Pandey",
    h1: "Learning Python and Business Analytics as a Business Management Student in London",
    description:
      "Anil Pandey shares how learning Python, data analysis, and AI automation complements studying Business Management with International at Ravensbourne University London.",
    bodyHtml: `
      <p>When I began studying <strong>Business Management with International</strong> at <strong>Ravensbourne University London</strong>, one reality stood out early: almost every modern business decision is also a data decision.</p>
      <p>Spreadsheets remain foundational in business management, but as soon as you want to clean larger datasets, automate recurring reports, test financial scenarios, or connect structured data to <strong>artificial intelligence (AI) agents</strong>, manual spreadsheets show their limits. That led me to start learning <strong>Python and business analytics</strong> in <strong>London, United Kingdom</strong>.</p>
      <h2>How Business Management Shapes the Way I Learn Python</h2>
      <p>Learning to code from a <strong>business management</strong> background is driven by specific commercial and financial questions—particularly while developing <strong>FinAI</strong>, my student finance project:</p>
      <ul>
        <li><strong>Starting with the Decision, Not the Code:</strong> Defining the financial or operational metric before writing Python scripts.</li>
        <li><strong>Automating Repetitive Analytical Tasks:</strong> Standardising CSV transaction files, categorising expenses in FinAI, and generating repeatable summary metrics.</li>
        <li><strong>Connecting Data Analysis with AI Agents:</strong> Preparing clean, validated data pipelines so AI workflows produce reliable business summaries.</li>
      </ul>
      <h2>Core Learning Roadmap for Business &amp; Analytics Students</h2>
      <p>My focus spans Python data structures (CSV/JSON processing), Exploratory Data Analysis (EDA), translating financial management metrics (burn rate, runway, budget variance) into code, and building practical AI agent workflows.</p>
    `,
  },
];

for (const article of articles) {
  const canonicalUrl = `https://pixelandbrush.vercel.app/articles/${article.slug}`;
  const articleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="google-site-verification" content="zxJ9NwoEE3Z6vaX_07ZiyXqKPhk7I0Zl0Y7QyEbEDcs" />
  <title>${article.title}</title>
  <meta name="description" content="${article.description}" />
  <meta name="author" content="Anil Pandey" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${article.title}" />
  <meta property="og:description" content="${article.description}" />
  <meta property="og:image" content="https://pixelandbrush.vercel.app/anil-pandey-anil-panday.jpg" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${article.title}" />
  <meta name="twitter:description" content="${article.description}" />
  <meta name="twitter:image" content="https://pixelandbrush.vercel.app/anil-pandey-anil-panday.jpg" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": ${JSON.stringify(article.h1)},
    "description": ${JSON.stringify(article.description)},
    "image": "https://pixelandbrush.vercel.app/anil-pandey-anil-panday.jpg",
    "datePublished": "2026-11-10",
    "dateModified": "2026-11-10",
    "author": {
      "@type": "Person",
      "@id": "https://pixelandbrush.vercel.app/#anil-pandey",
      "name": "Anil Pandey",
      "alternateName": ["Anil Panday", "anilpandey"],
      "url": "https://pixelandbrush.vercel.app/about",
      "image": "https://pixelandbrush.vercel.app/anil-pandey-anil-panday.jpg",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Ravensbourne University London"
      }
    }
  }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Outfit:wght@400;500;600&display=swap" />
  <style>
    body { margin: 0; background: #060912; color: #e8edf7; font-family: 'Outfit', sans-serif; line-height: 1.8; }
    .container { max-width: 820px; margin: 0 auto; padding: 4.5rem 1.5rem 5rem; }
    .nav { margin-bottom: 2.5rem; font-size: 0.92rem; }
    .nav a { color: #60a5fa; text-decoration: none; margin-right: 1.2rem; }
    h1 { font-family: 'Baloo 2', sans-serif; font-size: clamp(2rem, 4vw, 3rem); line-height: 1.15; margin-bottom: 1rem; color: #ffffff; }
    h2 { font-family: 'Baloo 2', sans-serif; font-size: 1.5rem; color: #60a5fa; margin-top: 2.2rem; margin-bottom: 0.7rem; }
    p, li { color: #9aa6c4; font-size: 1.06rem; }
    strong { color: #e8edf7; }
    .byline { display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0 2.2rem; padding: 1rem; background: rgba(37,99,235,0.08); border: 1px solid rgba(37,99,235,0.22); border-radius: 14px; }
    .byline img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; }
    .byline-text { font-size: 0.92rem; color: #9aa6c4; line-height: 1.5; }
    .portrait { width: 100%; max-width: 420px; border-radius: 16px; border: 1px solid rgba(37,99,235,0.25); margin: 1.5rem 0; display: block; }
    .footer-links { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid rgba(37,99,235,0.2); font-size: 0.95rem; }
    .footer-links a { color: #60a5fa; text-decoration: none; }
  </style>
</head>
<body>
  <main class="container">
    <nav class="nav">
      <a href="/about">← About Anil Pandey</a>
    </nav>
    <h1>${article.h1}</h1>
    <div class="byline">
      <img src="/anil-pandey-headshot-square.jpg" alt="Anil Pandey — Ravensbourne University London" width="64" height="64" />
      <div class="byline-text">
        <strong>Anil Pandey</strong><br />
        Business Management with International, Ravensbourne University London • London, United Kingdom
      </div>
    </div>
    <img class="portrait" src="/anil-pandey-anil-panday.jpg" alt="Anil Pandey outside Ravensbourne University London in Greenwich Peninsula, London, UK" width="768" height="1024" />
    ${article.bodyHtml}
    <div class="footer-links">
      <p><strong>More by Anil Pandey:</strong></p>
      <ul>
        <li><a href="/about">About Anil Pandey — London, UK</a></li>
        <li><a href="/articles/who-is-anil-pandey">Who Is Anil Pandey? My Journey in Business and Technology</a></li>
        <li><a href="/articles/finai-student-finance-project">FinAI: Building an AI &amp; Analytics Approach to Student Finance in London</a></li>
        <li><a href="/articles/learning-python-and-business-analytics">Learning Python and Business Analytics as a Business Management Student in London</a></li>
      </ul>
    </div>
  </main>
</body>
</html>`;

  const articleDir = path.join(BUILD_DIR, "articles", article.slug);
  fs.mkdirSync(articleDir, { recursive: true });
  fs.writeFileSync(path.join(articleDir, "index.html"), articleHtml, "utf8");
}

console.log("Static HTML generated successfully:");
console.log("- build/index.html (Home with static H1, Anil Pandey metadata & schema)");
console.log("- build/about/index.html & build/about.html (About with static H1, bio & schema)");
console.log("- build/articles/who-is-anil-pandey/index.html");
console.log("- build/articles/finai-student-finance-project/index.html");
console.log("- build/articles/learning-python-and-business-analytics/index.html");

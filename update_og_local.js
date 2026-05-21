const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const imagesDir = path.join(rootDir, "assets", "images");

const siteName = "AI Research Hub";
const locale = "en_US";
const twitterHandle = "@AIResearchHub";
const defaultSocialImage = "ai-research-hub.svg";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function decodeHtml(value) {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function metaContent(html, keyType, keyName) {
  const pattern = new RegExp(
    `<meta\\s+${keyType}="${keyName}"\\s+content="([^"]*)"[^>]*>`,
    "i",
  );
  return html.match(pattern)?.[1] || "";
}

function titleFromHtml(html) {
  return decodeHtml(html.match(/<title>([^<]+)<\/title>/i)?.[1] || siteName);
}

function makeHomeImage() {
  fs.mkdirSync(imagesDir, { recursive: true });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">AI Research Hub social preview</title>
  <desc id="desc">Professional AI guides for machine learning, generative AI, LLMs, agents, automation, and MLOps.</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050816"/><stop offset="0.5" stop-color="#111936"/><stop offset="1" stop-color="#0a0e1a"/></linearGradient>
    <radialGradient id="g1" cx="18%" cy="18%" r="62%"><stop offset="0" stop-color="#667eea" stop-opacity=".6"/><stop offset="1" stop-color="#667eea" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="88%" cy="78%" r="58%"><stop offset="0" stop-color="#00d9a5" stop-opacity=".5"/><stop offset="1" stop-color="#00d9a5" stop-opacity="0"/></radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4facfe"/><stop offset=".5" stop-color="#667eea"/><stop offset="1" stop-color="#00d9a5"/></linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="30"/></filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <g opacity=".28" stroke="rgba(255,255,255,.15)">${Array.from({ length: 15 }, (_, i) => `<path d="M${i * 86} 0V630"/>`).join("")}${Array.from({ length: 9 }, (_, i) => `<path d="M0 ${i * 78}H1200"/>`).join("")}</g>
  <g filter="url(#blur)" opacity=".9"><circle cx="230" cy="500" r="110" fill="#4facfe"/><circle cx="985" cy="150" r="105" fill="#667eea"/><circle cx="970" cy="460" r="120" fill="#00d9a5"/></g>
  <rect x="54" y="54" width="1092" height="522" rx="44" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.17)"/>
  <text x="88" y="130" fill="#dbeafe" font-family="Inter,Segoe UI,Arial" font-size="24" font-weight="800">AI Research Hub</text>
  <rect x="88" y="160" width="210" height="9" rx="5" fill="url(#accent)"/>
  <text x="88" y="280" fill="#fff" font-family="Inter,Segoe UI,Arial" font-size="74" font-weight="900" letter-spacing="-2.4">Professional AI</text>
  <text x="88" y="360" fill="#fff" font-family="Inter,Segoe UI,Arial" font-size="74" font-weight="900" letter-spacing="-2.4">Guides 2026</text>
  <text x="88" y="445" fill="#c7d2fe" font-family="Inter,Segoe UI,Arial" font-size="28" font-weight="500">Machine Learning • Generative AI • LLMs • Agents • MLOps</text>
  <text x="88" y="525" fill="#93c5fd" font-family="Inter,Segoe UI,Arial" font-size="24" font-weight="800">SEO-ready knowledge base with tutorials, FAQs, and practical examples</text>
</svg>`;
  fs.writeFileSync(path.join(imagesDir, defaultSocialImage), svg, "utf8");
}

function pageInfo(filePath, html) {
  const rel = path.relative(rootDir, filePath).replace(/\\/g, "/");
  const isRootHome = rel === "index.html";
  const isTopicsIndex = rel === "topics/index.html";
  const slug = path.basename(filePath, ".html");
  const title = decodeHtml(
    metaContent(html, "property", "og:title") || titleFromHtml(html),
  );
  const description = decodeHtml(
    metaContent(html, "name", "description") ||
      metaContent(html, "property", "og:description") ||
      "Professional AI, machine learning, generative AI, LLM, agentic AI, automation, and MLOps education guides.",
  );
  const imageFile =
    isRootHome || isTopicsIndex ? defaultSocialImage : `${slug}.svg`;
  return {
    title,
    description,
    type: isRootHome || isTopicsIndex ? "website" : "article",
    localUrl: rel,
    imagePath: isRootHome
      ? `assets/images/${imageFile}`
      : `../assets/images/${imageFile}`,
    imageAlt: `${title.replace(/ \| .*$/, "")} social preview image`,
  };
}

function socialTags(info) {
  const title = escapeHtml(info.title);
  const description = escapeHtml(info.description);
  const imageAlt = escapeHtml(info.imageAlt);
  return [
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:image" content="${info.imagePath}">`,
    `<meta property="og:image:secure_url" content="${info.imagePath}">`,
    `<meta property="og:image:type" content="image/svg+xml">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${imageAlt}">`,
    `<meta property="og:url" content="${info.localUrl}">`,
    `<meta property="og:type" content="${info.type}">`,
    `<meta property="og:site_name" content="${siteName}">`,
    `<meta property="og:locale" content="${locale}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:site" content="${twitterHandle}">`,
    `<meta name="twitter:creator" content="${twitterHandle}">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${info.imagePath}">`,
    `<meta name="twitter:image:alt" content="${imageAlt}">`,
    `<meta name="twitter:url" content="${info.localUrl}">`,
    `<meta name="pinterest-rich-pin" content="true">`,
  ].join("\n  ");
}

function stripSocialTags(html) {
  return html
    .replace(
      /\n?\s*<meta\s+(?:property|name)="(?:og:[^"]+|twitter:[^"]+|pinterest-rich-pin)"\s+content="[^"]*"\s*\/?>/gi,
      "",
    )
    .replace(
      /\n?\s*<meta\s+content="[^"]*"\s+(?:property|name)="(?:og:[^"]+|twitter:[^"]+|pinterest-rich-pin)"\s*\/?>/gi,
      "",
    );
}

function findHtmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return findHtmlFiles(fullPath);
    return entry.isFile() && entry.name.endsWith(".html") ? [fullPath] : [];
  });
}

function updateHtml(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  const info = pageInfo(filePath, html);
  html = stripSocialTags(html);
  html = html.replace(/\s*<\/head>/i, `\n  ${socialTags(info)}\n</head>`);
  fs.writeFileSync(filePath, html, "utf8");
}

makeHomeImage();

const pages = findHtmlFiles(rootDir).filter(
  (file) => !file.includes(`${path.sep}.git${path.sep}`),
);
pages.forEach(updateHtml);

console.log(`Updated social SEO metadata on ${pages.length} HTML pages.`);
console.log(
  "All og:url and twitter:url values now use local project-relative URLs.",
);

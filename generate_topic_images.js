const fs = require("fs");
const path = require("path");

const topics = [
  [
    "introduction-to-artificial-intelligence",
    "Introduction to Artificial Intelligence",
    "AI fundamentals, concepts, and real-world impact",
  ],
  [
    "history-of-artificial-intelligence",
    "History of Artificial Intelligence",
    "Milestones from symbolic AI to agentic systems",
  ],
  [
    "machine-learning-basics",
    "Machine Learning Basics",
    "Supervised, unsupervised, and reinforcement learning",
  ],
  [
    "deep-learning-fundamentals",
    "Deep Learning Fundamentals",
    "Neural architectures powering modern AI",
  ],
  [
    "neural-network-basics",
    "Neural Network Basics",
    "Layers, activations, training, and inference",
  ],
  [
    "natural-language-processing",
    "Natural Language Processing",
    "Text, embeddings, language understanding, and LLMs",
  ],
  [
    "computer-vision-ai",
    "Computer Vision AI",
    "Image intelligence, detection, and multimodal vision",
  ],
  [
    "generative-ai-overview",
    "Generative AI Overview",
    "Creative AI for text, image, audio, and video",
  ],
  [
    "large-language-models",
    "Large Language Models",
    "Transformers, pretraining, fine-tuning, and deployment",
  ],
  [
    "prompt-engineering-basics",
    "Prompt Engineering Basics",
    "Practical prompting for reliable AI outputs",
  ],
  [
    "advanced-prompt-engineering",
    "Advanced Prompt Engineering",
    "ReAct, chaining, guardrails, and evaluation",
  ],
  [
    "retrieval-augmented-generation",
    "Retrieval Augmented Generation",
    "Embeddings, vector search, reranking, and grounded answers",
  ],
  [
    "ai-agents",
    "AI Agent Architectures",
    "Planning, memory, tools, and autonomous workflows",
  ],
  [
    "multi-agent-ai-systems",
    "Multi-Agent AI Systems",
    "Collaborative agents, orchestration, and delegation",
  ],
  [
    "ai-ethics-responsible-development",
    "AI Ethics and Responsible Development",
    "Fairness, transparency, safety, and governance",
  ],
  [
    "ai-in-healthcare",
    "AI in Healthcare",
    "Diagnostics, imaging, clinical copilots, and drug discovery",
  ],
  [
    "ai-in-finance",
    "AI in Finance",
    "Fraud detection, risk models, trading, and compliance",
  ],
  [
    "ai-in-marketing-ecommerce",
    "AI in Marketing & E-Commerce",
    "Personalization, recommendations, analytics, and content",
  ],
  [
    "ai-automation-workflows",
    "AI Automation Workflows",
    "Agents, RPA, APIs, triggers, and human review",
  ],
  [
    "mlops-fundamentals",
    "MLOps Fundamentals",
    "CI/CD, model registries, monitoring, and governance",
  ],
  [
    "ai-future-trends-2026",
    "AI Future Trends 2026",
    "Multimodal AI, agents, edge AI, and regulation",
  ],
];

const palette = [
  ["#667eea", "#764ba2", "#4facfe"],
  ["#4facfe", "#00f2fe", "#667eea"],
  ["#00d9a5", "#4facfe", "#764ba2"],
  ["#f093fb", "#f5576c", "#667eea"],
  ["#764ba2", "#667eea", "#00d9a5"],
  ["#4facfe", "#667eea", "#f093fb"],
  ["#ff7e5f", "#feb47b", "#4facfe"],
];

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrap(text, max = 28) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > max) {
      lines.push(line.trim());
      line = word;
    } else {
      line = `${line} ${word}`.trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, 3);
}

function svg(slug, title, subtitle, index) {
  const [a, b, c] = palette[index % palette.length];
  const titleLines = wrap(title, 24);
  const titleText = titleLines
    .map((line, i) => `<tspan x="88" y="${244 + i * 72}">${esc(line)}</tspan>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)} - AI Research Hub</title>
  <desc id="desc">${esc(subtitle)}</desc>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a0e1a"/><stop offset="0.45" stop-color="#111936"/><stop offset="1" stop-color="#050816"/></linearGradient>
    <radialGradient id="glow1" cx="20%" cy="20%" r="60%"><stop offset="0" stop-color="${a}" stop-opacity="0.55"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></radialGradient>
    <radialGradient id="glow2" cx="88%" cy="78%" r="56%"><stop offset="0" stop-color="${b}" stop-opacity="0.48"/><stop offset="1" stop-color="${b}" stop-opacity="0"/></radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${a}"/><stop offset="0.5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="28"/></filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <g opacity="0.32" stroke="rgba(255,255,255,.14)" stroke-width="1">
    ${Array.from({ length: 14 }, (_, i) => `<path d="M${60 + i * 86} 0 V630"/>`).join("")}
    ${Array.from({ length: 8 }, (_, i) => `<path d="M0 ${54 + i * 78} H1200"/>`).join("")}
  </g>
  <g filter="url(#blur)" opacity="0.9"><circle cx="930" cy="158" r="92" fill="${a}"/><circle cx="1030" cy="455" r="112" fill="${b}"/><circle cx="240" cy="500" r="90" fill="${c}"/></g>
  <rect x="54" y="54" width="1092" height="522" rx="42" fill="rgba(255,255,255,.055)" stroke="rgba(255,255,255,.16)"/>
  <rect x="88" y="88" width="220" height="44" rx="22" fill="rgba(255,255,255,.09)" stroke="rgba(255,255,255,.16)"/>
  <text x="118" y="118" fill="#dbeafe" font-family="Inter,Segoe UI,Arial" font-size="20" font-weight="700">AI Research Hub</text>
  <rect x="88" y="154" width="160" height="8" rx="4" fill="url(#accent)"/>
  <text fill="#ffffff" font-family="Inter,Segoe UI,Arial" font-size="62" font-weight="800" letter-spacing="-1.8">${titleText}</text>
  <text x="88" y="478" fill="#c7d2fe" font-family="Inter,Segoe UI,Arial" font-size="26" font-weight="500">${esc(subtitle)}</text>
  <text x="88" y="535" fill="#93c5fd" font-family="Inter,Segoe UI,Arial" font-size="22" font-weight="700">Complete SEO Guide • 2026 • Beginner to Advanced</text>
  <g transform="translate(924 128)">
    <circle cx="92" cy="92" r="90" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.18)"/>
    <path d="M92 34 L146 66 V128 L92 160 L38 128 V66 Z" fill="none" stroke="url(#accent)" stroke-width="10" stroke-linejoin="round"/>
    <circle cx="92" cy="92" r="28" fill="url(#accent)"/>
  </g>
  <text x="88" y="594" fill="#64748b" font-family="JetBrains Mono,Consolas,monospace" font-size="14">/assets/images/${esc(slug)}.svg</text>
</svg>`;
}

const imagesDir = path.join(__dirname, "assets", "images");
const topicsDir = path.join(__dirname, "topics");
fs.mkdirSync(imagesDir, { recursive: true });

topics.forEach(([slug, title, subtitle], index) => {
  fs.writeFileSync(
    path.join(imagesDir, `${slug}.svg`),
    svg(slug, title, subtitle, index),
    "utf8",
  );

  const file = path.join(topicsDir, `${slug}.html`);
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, "utf8");
  const absoluteImage = `https://airesearchhub.com/assets/images/${slug}.svg`;
  const relativeImage = `../assets/images/${slug}.svg`;

  html = html.replace(
    /<meta property="og:image" content="[^"]*">/,
    `<meta property="og:image" content="${absoluteImage}">`,
  );

  if (html.includes('name="twitter:image"')) {
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*">/,
      `<meta name="twitter:image" content="${absoluteImage}">`,
    );
  } else {
    html = html.replace(
      /(<meta name="twitter:description" content="[^"]*">)/,
      `$1\n  <meta name="twitter:image" content="${absoluteImage}">`,
    );
  }

  if (!html.includes("topic-hero-image")) {
    const heroImage = `<img class="topic-hero-image" src="${relativeImage}" alt="${esc(title)} visual guide" width="1200" height="630" loading="lazy" decoding="async">`;
    const firstSectionMarker =
      '\n    <section class="content-section animate-on-scroll" id="definition">';
    html = html.replace(
      firstSectionMarker,
      `\n      ${heroImage}\n${firstSectionMarker}`,
    );
  }

  fs.writeFileSync(file, html, "utf8");
});

console.log(
  `Generated ${topics.length} topic SVG images and updated topic page metadata.`,
);

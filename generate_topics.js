const fs = require("fs");
const path = require("path");

const topics = [
  [
    "introduction-to-artificial-intelligence",
    "Introduction to Artificial Intelligence",
    "A complete beginner-to-advanced guide to AI definitions, architectures, applications, ethics, careers, and 2026 trends.",
  ],
  [
    "history-of-artificial-intelligence",
    "History of Artificial Intelligence",
    "Trace AI from early symbolic systems and AI winters to deep learning, generative AI, and agentic systems.",
  ],
  [
    "machine-learning-basics",
    "Machine Learning Basics",
    "Learn supervised, unsupervised, and reinforcement learning workflows with tools, examples, and practical career guidance.",
  ],
  [
    "deep-learning-fundamentals",
    "Deep Learning Fundamentals",
    "Understand neural architectures, backpropagation, CNNs, RNNs, Transformers, optimization, and production trends.",
  ],
  [
    "neural-network-basics",
    "Neural Network Basics",
    "Explore perceptrons, layers, activation functions, loss functions, training loops, and neural network use cases.",
  ],
  [
    "natural-language-processing",
    "Natural Language Processing (NLP)",
    "Master NLP foundations including tokenization, embeddings, Transformers, text classification, and LLM-powered workflows.",
  ],
  [
    "computer-vision-ai",
    "Computer Vision AI",
    "Discover image classification, object detection, segmentation, visual search, multimodal models, and healthcare vision AI.",
  ],
  [
    "generative-ai-overview",
    "Generative AI Overview",
    "Understand GANs, VAEs, diffusion models, LLMs, multimodal generation, creative workflows, and enterprise adoption.",
  ],
  [
    "large-language-models",
    "Large Language Models",
    "Learn how LLMs work, how they are trained, fine-tuned, evaluated, deployed, and used in modern products.",
  ],
  [
    "prompt-engineering-basics",
    "Prompt Engineering Basics",
    "Build effective prompts with role prompting, zero-shot, few-shot, structured outputs, and evaluation patterns.",
  ],
  [
    "advanced-prompt-engineering",
    "Advanced Prompt Engineering",
    "Use ReAct, chain-of-thought variants, self-consistency, prompt chaining, guardrails, and advanced evaluation.",
  ],
  [
    "retrieval-augmented-generation",
    "Retrieval Augmented Generation",
    "Design RAG systems using embeddings, chunking, vector databases, retrieval strategies, reranking, and evaluation.",
  ],
  [
    "ai-agents",
    "AI Agent Architectures",
    "Study autonomous AI agents, planning loops, tools, memory, ReAct, multi-step reasoning, and agent observability.",
  ],
  [
    "multi-agent-ai-systems",
    "Multi-Agent AI Systems",
    "Learn agent collaboration, orchestration, delegation, debate, swarm patterns, governance, and enterprise workflows.",
  ],
  [
    "ai-ethics-responsible-development",
    "AI Ethics and Responsible Development",
    "Explore fairness, bias mitigation, explainability, governance, privacy, safety, and regulatory readiness.",
  ],
  [
    "ai-in-healthcare",
    "AI in Healthcare",
    "Analyze diagnostics, medical imaging, drug discovery, patient monitoring, clinical copilots, and responsible adoption.",
  ],
  [
    "ai-in-finance",
    "AI in Finance",
    "Understand fraud detection, credit risk, trading, robo-advice, compliance automation, and model governance.",
  ],
  [
    "ai-in-marketing-ecommerce",
    "AI in Marketing & E-Commerce",
    "Apply AI to personalization, recommendations, customer analytics, dynamic pricing, and generative content workflows.",
  ],
  [
    "ai-automation-workflows",
    "AI Automation Workflows",
    "Build intelligent automations with agents, RPA, APIs, triggers, orchestration, human review, and monitoring.",
  ],
  [
    "mlops-fundamentals",
    "MLOps Fundamentals",
    "Learn ML lifecycle automation, experiment tracking, model registries, CI/CD, deployment, monitoring, and governance.",
  ],
  [
    "ai-future-trends-2026",
    "AI Future Trends 2026",
    "Explore multimodal AI, agentic systems, edge AI, regulation, synthetic data, robotics, and emerging career paths.",
  ],
];

const bySlug = Object.fromEntries(
  topics.map(([slug, title, subtitle]) => [slug, { slug, title, subtitle }]),
);
const related = {
  "introduction-to-artificial-intelligence": [
    "machine-learning-basics",
    "deep-learning-fundamentals",
    "ai-future-trends-2026",
  ],
  "history-of-artificial-intelligence": [
    "introduction-to-artificial-intelligence",
    "neural-network-basics",
    "ai-future-trends-2026",
  ],
  "machine-learning-basics": [
    "deep-learning-fundamentals",
    "neural-network-basics",
    "mlops-fundamentals",
  ],
  "deep-learning-fundamentals": [
    "neural-network-basics",
    "large-language-models",
    "computer-vision-ai",
  ],
  "neural-network-basics": [
    "deep-learning-fundamentals",
    "machine-learning-basics",
    "large-language-models",
  ],
  "natural-language-processing": [
    "large-language-models",
    "prompt-engineering-basics",
    "generative-ai-overview",
  ],
  "computer-vision-ai": [
    "deep-learning-fundamentals",
    "ai-in-healthcare",
    "generative-ai-overview",
  ],
  "generative-ai-overview": [
    "large-language-models",
    "ai-agents",
    "prompt-engineering-basics",
  ],
  "large-language-models": [
    "prompt-engineering-basics",
    "retrieval-augmented-generation",
    "ai-agents",
  ],
  "prompt-engineering-basics": [
    "advanced-prompt-engineering",
    "large-language-models",
    "ai-agents",
  ],
  "advanced-prompt-engineering": [
    "prompt-engineering-basics",
    "ai-agents",
    "retrieval-augmented-generation",
  ],
  "retrieval-augmented-generation": [
    "large-language-models",
    "ai-agents",
    "advanced-prompt-engineering",
  ],
  "ai-agents": [
    "multi-agent-ai-systems",
    "retrieval-augmented-generation",
    "ai-automation-workflows",
  ],
  "multi-agent-ai-systems": [
    "ai-agents",
    "ai-automation-workflows",
    "ai-future-trends-2026",
  ],
  "ai-ethics-responsible-development": [
    "ai-future-trends-2026",
    "ai-in-healthcare",
    "introduction-to-artificial-intelligence",
  ],
  "ai-in-healthcare": [
    "ai-ethics-responsible-development",
    "computer-vision-ai",
    "ai-future-trends-2026",
  ],
  "ai-in-finance": [
    "machine-learning-basics",
    "ai-automation-workflows",
    "ai-ethics-responsible-development",
  ],
  "ai-in-marketing-ecommerce": [
    "generative-ai-overview",
    "machine-learning-basics",
    "ai-automation-workflows",
  ],
  "ai-automation-workflows": [
    "ai-agents",
    "multi-agent-ai-systems",
    "mlops-fundamentals",
  ],
  "mlops-fundamentals": [
    "machine-learning-basics",
    "ai-automation-workflows",
    "ai-future-trends-2026",
  ],
  "ai-future-trends-2026": [
    "multi-agent-ai-systems",
    "ai-ethics-responsible-development",
    "generative-ai-overview",
  ],
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toc() {
  return [
    ["definition", "Definition"],
    ["history", "History"],
    ["concepts", "Core Concepts"],
    ["architecture", "Architecture"],
    ["workflow", "Workflow"],
    ["use-cases", "Use Cases"],
    ["pros-cons", "Pros & Cons"],
    ["tools", "Tools"],
    ["tutorial", "Tutorial"],
    ["code", "Code"],
    ["careers", "Careers"],
    ["future", "2026 Trends"],
    ["faq", "FAQ"],
  ]
    .map(([id, label]) => `          <li><a href="#${id}">${label}</a></li>`)
    .join("\n");
}

function section(n, id, title, body) {
  return `
    <section class="content-section animate-on-scroll" id="${id}">
      <div class="section-header"><div class="section-number">${String(n).padStart(2, "0")}</div><h2 class="section-title">${title}</h2></div>
      <div class="section-content">${body}</div>
    </section>`;
}

function page(topic) {
  const { slug, title, subtitle } = topic;
  const canonical = `https://airesearchhub.com/topics/${slug}.html`;
  const meta = `${subtitle} Includes definition, history, architecture, workflow, use cases, tools, code examples, FAQs, careers, and 2026 updates.`;
  const relatedCards = (related[slug] || [])
    .map((s) => bySlug[s])
    .filter(Boolean)
    .map(
      (r) => `
          <a class="related-card" href="${r.slug}.html"><div class="related-card-tag">Related</div><div class="related-card-title">${esc(r.title)}</div><div class="related-card-desc">${esc(r.subtitle.slice(0, 120))}...</div></a>`,
    )
    .join("\n");
  const ld = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: meta,
      author: { "@type": "Organization", name: "AI Research Hub" },
      publisher: { "@type": "Organization", name: "AI Research Hub" },
      datePublished: "2026-05-21",
      dateModified: "2026-05-21",
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    },
    null,
    2,
  );

  const sections = [
    section(
      1,
      "definition",
      `What is ${esc(title)}?`,
      `<p><strong>${esc(title)}</strong> is a strategic AI discipline focused on building systems that perceive, reason, learn, generate, automate, or support decision-making. It combines data, algorithms, computing infrastructure, human oversight, and domain knowledge to solve real business and research problems.</p><p>For beginners, the easiest way to understand it is as a layered capability: data enters the system, models learn useful patterns, applications expose those patterns to users, and feedback improves the system over time. Advanced teams treat it as a full lifecycle involving architecture, evaluation, security, governance, and measurable ROI.</p>`,
    ),
    section(
      2,
      "history",
      "History and Evolution",
      `<div class="timeline"><div class="timeline-item"><div class="timeline-date">1950s-1970s</div><div class="timeline-title">Foundations</div><p class="timeline-desc">Symbolic AI, search, logic, the Turing Test, and early neural networks established the conceptual foundation.</p></div><div class="timeline-item"><div class="timeline-date">1980s-2000s</div><div class="timeline-title">Data and Expert Systems</div><p class="timeline-desc">Expert systems, statistical learning, support vector machines, and scalable data processing shifted AI from theory to enterprise use.</p></div><div class="timeline-item"><div class="timeline-date">2012-2022</div><div class="timeline-title">Deep Learning Breakthrough</div><p class="timeline-desc">GPUs, big datasets, CNNs, Transformers, and self-supervised learning enabled state-of-the-art perception and language systems.</p></div><div class="timeline-item"><div class="timeline-date">2023-2026</div><div class="timeline-title">Generative and Agentic Era</div><p class="timeline-desc">LLMs, multimodal models, RAG, tool-using agents, and AI copilots moved AI into everyday workflows.</p></div></div>`,
    ),
    section(
      3,
      "concepts",
      "Core Concepts",
      `<div class="info-grid"><div class="info-card"><div class="info-card-header"><div class="info-card-icon blue">&#128202;</div><div class="info-card-title">Data</div></div><p class="info-card-text">Structured, unstructured, synthetic, and streaming data provide the raw signal for learning and inference.</p></div><div class="info-card"><div class="info-card-header"><div class="info-card-icon green">&#129504;</div><div class="info-card-title">Models</div></div><p class="info-card-text">Models transform inputs into predictions, classifications, generated text, actions, or recommendations.</p></div><div class="info-card"><div class="info-card-header"><div class="info-card-icon pink">&#128269;</div><div class="info-card-title">Evaluation</div></div><p class="info-card-text">Accuracy, latency, safety, bias, robustness, cost, and user satisfaction determine production readiness.</p></div><div class="info-card"><div class="info-card-header"><div class="info-card-icon orange">&#128737;</div><div class="info-card-title">Governance</div></div><p class="info-card-text">Policies, monitoring, documentation, and human review reduce operational and ethical risk.</p></div></div>`,
    ),
    section(
      4,
      "architecture",
      "Reference Architecture",
      `<p>A professional ${esc(title)} architecture typically includes ingestion, preprocessing, feature extraction or embedding, model training or API integration, evaluation, deployment, monitoring, and feedback loops.</p><table class="comparison-table"><thead><tr><th>Layer</th><th>Purpose</th></tr></thead><tbody><tr><td>Data layer</td><td>Collects, cleans, versions, and secures data assets.</td></tr><tr><td>Model layer</td><td>Hosts ML models, foundation models, prompts, retrieval logic, or agent planners.</td></tr><tr><td>Application layer</td><td>Provides APIs, dashboards, copilots, automations, and user interfaces.</td></tr><tr><td>Governance layer</td><td>Tracks safety, privacy, drift, access, compliance, and auditability.</td></tr></tbody></table>`,
    ),
    section(
      5,
      "workflow",
      "Workflow and Implementation Steps",
      `<ol><li><strong>Define the goal:</strong> connect the AI outcome to a measurable business, research, or user problem.</li><li><strong>Collect data:</strong> gather trustworthy datasets, documents, APIs, events, or human feedback.</li><li><strong>Design architecture:</strong> choose ML, deep learning, RAG, agent, automation, or hybrid patterns.</li><li><strong>Build prototype:</strong> test quickly with baseline models, prompts, notebooks, or low-code tools.</li><li><strong>Evaluate:</strong> measure quality, safety, bias, latency, and cost before deployment.</li><li><strong>Deploy and monitor:</strong> release with logs, metrics, alerts, versioning, and rollback plans.</li></ol>`,
    ),
    section(
      6,
      "use-cases",
      "Real-World Use Cases and Industry Applications",
      `<div class="info-grid"><div class="info-card"><div class="info-card-header"><div class="info-card-icon green">&#127973;</div><div class="info-card-title">Healthcare</div></div><p class="info-card-text">Diagnostics, medical imaging, triage, clinical documentation, drug discovery, and patient monitoring.</p></div><div class="info-card"><div class="info-card-header"><div class="info-card-icon purple">&#128176;</div><div class="info-card-title">Finance</div></div><p class="info-card-text">Fraud detection, risk scoring, trading analytics, compliance review, and personalized financial assistants.</p></div><div class="info-card"><div class="info-card-header"><div class="info-card-icon orange">&#128722;</div><div class="info-card-title">Marketing</div></div><p class="info-card-text">Segmentation, recommendations, ad optimization, creative generation, and customer journey automation.</p></div><div class="info-card"><div class="info-card-header"><div class="info-card-icon blue">&#127981;</div><div class="info-card-title">Operations</div></div><p class="info-card-text">Forecasting, supply-chain optimization, predictive maintenance, robotic process automation, and support copilots.</p></div></div>`,
    ),
    section(
      7,
      "pros-cons",
      "Advantages and Disadvantages",
      `<table class="comparison-table"><thead><tr><th>Advantages</th><th>Disadvantages / Risks</th></tr></thead><tbody><tr><td>Automates repetitive and complex workflows at scale.</td><td>Requires high-quality data and careful validation.</td></tr><tr><td>Improves personalization, speed, and decision support.</td><td>May introduce bias, hallucinations, or privacy concerns.</td></tr><tr><td>Discovers patterns humans may miss.</td><td>Can be expensive to train, run, and maintain.</td></tr><tr><td>Supports 24/7 services and faster experimentation.</td><td>Needs governance, monitoring, explainability, and human oversight.</td></tr></tbody></table>`,
    ),
    section(
      8,
      "tools",
      "Best Tools, Frameworks, and Related Technologies",
      `<ul><li><strong>Python, NumPy, pandas, scikit-learn:</strong> foundational data science and ML stack.</li><li><strong>PyTorch, TensorFlow, JAX:</strong> deep learning model development and research.</li><li><strong>Hugging Face, OpenAI, Anthropic, Google AI:</strong> foundation model APIs, datasets, and deployment tooling.</li><li><strong>LangChain, LlamaIndex, CrewAI, AutoGen:</strong> RAG, tool use, and agent orchestration.</li><li><strong>Vector databases:</strong> Pinecone, Weaviate, Milvus, FAISS, pgvector, and Chroma.</li><li><strong>MLOps:</strong> MLflow, W&B, Kubeflow, Docker, Kubernetes, GitHub Actions, and cloud model registries.</li></ul>`,
    ),
    section(
      9,
      "tutorial",
      "Mini Tutorial",
      `<p>Start with a narrow use case: classify customer tickets, summarize documents, recommend products, or automate a research task. Build a baseline first, then improve it iteratively.</p><ol><li>Create a dataset or document collection.</li><li>Choose a simple model or LLM API.</li><li>Write evaluation examples before optimizing.</li><li>Add logging, cost tracking, and human review.</li><li>Deploy behind an API or lightweight web interface.</li></ol>`,
    ),
    section(
      10,
      "code",
      "Code Example",
      `<p>The following Python-style example shows a basic ML workflow that can be adapted for many ${esc(title)} projects.</p><div class="code-block-wrapper"><div class="code-block-header"><span class="code-block-lang">Python</span><button class="copy-btn" type="button"><span>&#128203;</span> Copy</button></div><pre class="code-block"><code><span class="keyword">from</span> sklearn.model_selection <span class="keyword">import</span> train_test_split
<span class="keyword">from</span> sklearn.ensemble <span class="keyword">import</span> RandomForestClassifier
<span class="keyword">from</span> sklearn.metrics <span class="keyword">import</span> classification_report

<span class="comment"># X contains features; y contains target labels</span>
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=<span class="number">0.2</span>, random_state=<span class="number">42</span>)

model = RandomForestClassifier(n_estimators=<span class="number">200</span>, random_state=<span class="number">42</span>)
model.fit(X_train, y_train)

predictions = model.predict(X_test)
<span class="function">print</span>(classification_report(y_test, predictions))</code></pre></div>`,
    ),
    section(
      11,
      "careers",
      "Career Opportunities",
      `<p>Career demand remains strong in 2026 because organizations need people who can turn AI capability into reliable outcomes.</p><ul><li><strong>AI Engineer:</strong> builds LLM, RAG, agent, and automation applications.</li><li><strong>Machine Learning Engineer:</strong> trains, deploys, and monitors predictive models.</li><li><strong>Data Scientist:</strong> performs experimentation, forecasting, segmentation, and insight generation.</li><li><strong>MLOps Engineer:</strong> manages infrastructure, CI/CD, model registries, and observability.</li><li><strong>AI Product Manager:</strong> translates business needs into AI-powered products.</li><li><strong>Responsible AI Specialist:</strong> handles fairness, compliance, audits, and risk management.</li></ul>`,
    ),
    section(
      12,
      "future",
      "Latest Updates and Future Trends for 2026",
      `<div class="info-grid"><div class="info-card"><div class="info-card-header"><div class="info-card-icon blue">&#129309;</div><div class="info-card-title">Agentic Workflows</div></div><p class="info-card-text">AI systems increasingly plan tasks, use tools, call APIs, and collaborate with humans.</p></div><div class="info-card"><div class="info-card-header"><div class="info-card-icon pink">&#127912;</div><div class="info-card-title">Multimodal Models</div></div><p class="info-card-text">Text, image, audio, video, and sensor data are converging into unified AI interfaces.</p></div><div class="info-card"><div class="info-card-header"><div class="info-card-icon green">&#128187;</div><div class="info-card-title">Edge and Private AI</div></div><p class="info-card-text">Smaller optimized models run locally for privacy, speed, and cost efficiency.</p></div><div class="info-card"><div class="info-card-header"><div class="info-card-icon orange">&#9878;</div><div class="info-card-title">Regulation</div></div><p class="info-card-text">Governance, auditability, safety testing, and model documentation are becoming standard requirements.</p></div></div>`,
    ),
    section(
      13,
      "faq",
      "Frequently Asked Questions",
      `<div class="faq-list"><div class="faq-item"><button class="faq-question" type="button">Is ${esc(title)} beginner friendly?</button><div class="faq-answer"><p>Yes. Beginners can start with core concepts, visual explanations, and simple projects before moving into mathematics, architecture, and production practices.</p></div></div><div class="faq-item"><button class="faq-question" type="button">What should I learn first?</button><div class="faq-answer"><p>Start with Python, data handling, basic statistics, model evaluation, and one practical project. Then learn deep learning, LLMs, RAG, agents, or MLOps depending on your goals.</p></div></div><div class="faq-item"><button class="faq-question" type="button">What is new in 2026?</button><div class="faq-answer"><p>The biggest updates are multimodal AI, autonomous agents, private/on-device models, stronger regulation, and enterprise-grade AI governance.</p></div></div><div class="faq-item"><button class="faq-question" type="button">Which tools are best?</button><div class="faq-answer"><p>Python, PyTorch, scikit-learn, Hugging Face, LangChain, LlamaIndex, vector databases, MLflow, and cloud AI platforms cover most modern workflows.</p></div></div><div class="faq-item"><button class="faq-question" type="button">Can this lead to a career?</button><div class="faq-answer"><p>Yes. AI engineering, data science, MLOps, AI product, responsible AI, and automation consulting are high-growth paths.</p></div></div></div>`,
    ),
  ].join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)} | AI Research Hub - Complete Guide 2026</title>
  <meta name="description" content="${esc(meta)}">
  <meta name="keywords" content="${esc(title)}, AI, machine learning, generative AI, LLM, automation, tutorial, 2026, tools, career">
  <meta name="author" content="AI Research Hub">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${esc(title)} | AI Research Hub">
  <meta property="og:description" content="${esc(meta)}">
  <meta property="og:image" content="https://airesearchhub.com/assets/images/${slug}.png">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)} | AI Research Hub">
  <meta name="twitter:description" content="${esc(meta)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/styles.css">
  <script type="application/ld+json">${ld}</script>
</head>
<body>
  <div class="progress-bar" aria-hidden="true"></div>
  <header class="site-header"><div class="header-container"><a href="../index.html" class="header-logo"><span class="logo-icon">&#129302;</span><span>AI Research Hub</span></a><nav class="header-nav" aria-label="Main navigation"><a href="../index.html">Home</a><a href="index.html" class="active">Topics</a><a href="#newsletter">Newsletter</a></nav></div></header>
  <div class="page-container"><aside class="sidebar" aria-label="Table of contents"><div class="toc-title">On this page</div><ul class="toc-list">\n${toc()}\n      </ul></aside>
    <main class="main-content">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a href="../index.html">Home</a><span class="breadcrumb-separator">/</span><a href="index.html">Topics</a><span class="breadcrumb-separator">/</span><span class="breadcrumb-current">${esc(title)}</span></nav>
      <section class="hero-section"><h1 class="hero-title">${esc(title)}</h1><p class="hero-subtitle">${esc(subtitle)}</p><div class="hero-meta"><span>&#128197; Updated May 2026</span><span>&#9201; 15 min read</span><span>&#128218; Beginner to Advanced</span></div><div class="tag-list"><span class="tag-pill">AI</span><span class="tag-pill">SEO Guide</span><span class="tag-pill">2026</span><span class="tag-pill">Tutorial</span></div></section>
${sections}
      <section class="newsletter-section" id="newsletter"><h3 class="newsletter-title">Stay Ahead in AI</h3><p class="newsletter-desc">Get weekly AI research summaries, tool reviews, tutorials, and career insights.</p><form class="newsletter-form" onsubmit="event.preventDefault(); alert('Thanks for subscribing!');"><input class="newsletter-input" type="email" placeholder="you@example.com" required aria-label="Email address"><button class="btn-primary" type="submit">Subscribe</button></form></section>
      <div class="social-share"><span class="social-label">Share this article:</span><div class="social-links"><a class="social-link" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(canonical)}" target="_blank" rel="noopener">X</a><a class="social-link" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}" target="_blank" rel="noopener">in</a><a class="social-link" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}" target="_blank" rel="noopener">f</a></div></div>
      <section class="related-section"><h3 class="related-title">&#128218; Related Articles</h3><div class="related-grid">${relatedCards}</div></section>
      <section class="cta-section"><h3 class="cta-title">Ready to Build with AI?</h3><p class="cta-desc">Continue exploring the AI Research Hub and turn theory into practical projects.</p><a class="btn-primary" href="index.html">Browse All Topics</a></section>
    </main></div>
  <footer class="site-footer"><div class="footer-content"><p class="footer-text">&copy; 2026 AI Research Hub. All rights reserved.</p><div class="footer-links"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Contact</a></div></div></footer>
  <button class="scroll-top" type="button" aria-label="Scroll to top">&#8593;</button><button class="sidebar-toggle" type="button" aria-label="Toggle sidebar">&#9776;</button><div class="overlay"></div><script src="../assets/js/main.js"></script>
</body>
</html>`;
}

function indexPage() {
  const cards = topics
    .map(
      ([slug, title, subtitle]) =>
        `<a class="related-card" href="${slug}.html"><div class="related-card-tag">AI Topic</div><div class="related-card-title">${esc(title)}</div><div class="related-card-desc">${esc(subtitle)}</div></a>`,
    )
    .join("\n");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>AI Topics Library | AI Research Hub</title><meta name="description" content="Browse 21 professional SEO-ready AI, machine learning, generative AI, LLM, agentic AI, automation, and MLOps topic guides."><meta name="robots" content="index, follow"><link rel="stylesheet" href="../assets/css/styles.css"></head><body><div class="progress-bar"></div><header class="site-header"><div class="header-container"><a href="../index.html" class="header-logo"><span class="logo-icon">&#129302;</span><span>AI Research Hub</span></a><nav class="header-nav"><a href="../index.html">Home</a><a class="active" href="index.html">Topics</a></nav></div></header><main class="main-content" style="margin-left:auto;margin-right:auto;padding-top:6rem;"><section class="hero-section"><h1 class="hero-title">AI Topics Library</h1><p class="hero-subtitle">Explore professional guides for AI, ML, Generative AI, LLMs, Agents, Automation, Ethics, MLOps, and industry applications.</p></section><section class="related-section"><div class="related-grid">${cards}</div></section></main><script src="../assets/js/main.js"></script></body></html>`;
}

function homePage() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>AI Research Hub | Professional AI Guides 2026</title><meta name="description" content="A professional SEO-ready website for AI, machine learning, generative AI, LLM, agentic AI, automation, and MLOps education."><link rel="stylesheet" href="assets/css/styles.css"></head><body><div class="progress-bar"></div><header class="site-header"><div class="header-container"><a href="index.html" class="header-logo"><span class="logo-icon">&#129302;</span><span>AI Research Hub</span></a><nav class="header-nav"><a class="active" href="index.html">Home</a><a href="topics/index.html">Topics</a></nav></div></header><main class="main-content" style="margin-left:auto;margin-right:auto;padding-top:6rem;"><section class="hero-section"><h1 class="hero-title">AI Research Hub</h1><p class="hero-subtitle">Complete SEO-ready AI knowledge base with dark futuristic UI, glassmorphism cards, tutorials, code examples, FAQs, and 2026 trends.</p><a class="btn-primary" href="topics/index.html">Browse AI Topics</a></section><section class="info-grid">${topics
    .slice(0, 6)
    .map(
      ([slug, title, subtitle]) =>
        `<a class="related-card" href="topics/${slug}.html"><div class="related-card-tag">Featured</div><div class="related-card-title">${esc(title)}</div><div class="related-card-desc">${esc(subtitle)}</div></a>`,
    )
    .join(
      "",
    )}</section></main><script src="assets/js/main.js"></script></body></html>`;
}

fs.mkdirSync(path.join(__dirname, "topics"), { recursive: true });
for (const [slug, title, subtitle] of topics)
  fs.writeFileSync(
    path.join(__dirname, "topics", `${slug}.html`),
    page({ slug, title, subtitle }),
    "utf8",
  );
fs.writeFileSync(
  path.join(__dirname, "topics", "index.html"),
  indexPage(),
  "utf8",
);
fs.writeFileSync(path.join(__dirname, "index.html"), homePage(), "utf8");
console.log(
  `Generated ${topics.length} topic pages plus topics/index.html and index.html`,
);

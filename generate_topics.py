#!/usr/bin/env python3
"""
AI Research Hub - Topic Page Generator
Generates all 21 SEO-ready HTML topic pages with glassmorphism dark theme.
"""

import os

# Topic data: slug, title, description, accent color, related slugs
TOPICS = [
    {
        "slug": "introduction-to-artificial-intelligence",
        "title": "Introduction to Artificial Intelligence",
        "subtitle": "A comprehensive beginner-to-advanced guide covering AI fundamentals, types, and real-world applications in 2026.",
        "accent": "purple",
        "related": ["machine-learning-basics", "deep-learning-fundamentals", "ai-future-trends-2026"],
    },
    {
        "slug": "history-of-artificial-intelligence",
        "title": "History of Artificial Intelligence",
        "subtitle": "From the 1956 Dartmouth Conference to modern AGI research. Explore the milestones, winters, and revolutions of AI.",
        "accent": "blue",
        "related": ["introduction-to-artificial-intelligence", "ai-future-trends-2026", "neural-network-basics"],
    },
    {
        "slug": "machine-learning-basics",
        "title": "Machine Learning Basics",
        "subtitle": "Master supervised, unsupervised, and reinforcement learning with practical Python examples and 2026 best practices.",
        "accent": "green",
        "related": ["deep-learning-fundamentals", "neural-network-basics", "mlops-fundamentals"],
    },
    {
        "slug": "deep-learning-fundamentals",
        "title": "Deep Learning Fundamentals",
        "subtitle": "Understanding neural networks, backpropagation, CNNs, RNNs, Transformers, and the latest architectures driving AI in 2026.",
        "accent": "pink",
        "related": ["neural-network-basics", "machine-learning-basics", "computer-vision-ai"],
    },
    {
        "slug": "neural-network-basics",
        "title": "Neural Network Basics",
        "subtitle": "From perceptrons to deep neural networks. Learn architecture, activation functions, and training fundamentals.",
        "accent": "purple",
        "related": ["deep-learning-fundamentals", "machine-learning-basics", "large-language-models"],
    },
    {
        "slug": "natural-language-processing",
        "title": "Natural Language Processing (NLP)",
        "subtitle": "Explore tokenization, embeddings, transformers, sentiment analysis, and modern NLP pipelines with code examples.",
        "accent": "blue",
        "related": ["large-language-models", "prompt-engineering-basics", "generative-ai-overview"],
    },
    {
        "slug": "computer-vision-ai",
        "title": "Computer Vision AI",
        "subtitle": "Image classification, object detection, segmentation, and modern vision models. Practical tutorials and frameworks.",
        "accent": "orange",
        "related": ["deep-learning-fundamentals", "ai-in-healthcare", "generative-ai-overview"],
    },
    {
        "slug": "generative-ai-overview",
        "title": "Generative AI Overview",
        "subtitle": "GANS, VAEs, diffusion models, and autoregressive models. The technology powering ChatGPT, Midjourney, and DALL-E.",
        "accent": "pink",
        "related": ["large-language-models", "ai-agents", "ai-automation-workflows"],
    },
    {
        "slug": "large-language-models",
        "title": "Large Language Models",
        "subtitle": "From GPT to Claude to Gemini. Architecture, training, fine-tuning, and deployment of LLMs in production.",
        "accent": "purple",
        "related": ["prompt-engineering-basics", "retrieval-augmented-generation", "ai-agents"],
    },
    {
        "slug": "prompt-engineering-basics",
        "title": "Prompt Engineering Basics",
        "subtitle": "Learn to craft effective prompts with zero-shot, few-shot, chain-of-thought, and role-based prompting techniques.",
        "accent": "green",
        "related": ["advanced-prompt-engineering", "large-language-models", "ai-agents"],
    },
    {
        "slug": "advanced-prompt-engineering",
        "title": "Advanced Prompt Engineering",
        "subtitle": "Master ReAct, Tree of Thoughts, Self-Consistency, and meta-prompting for maximum LLM performance.",
        "accent": "blue",
        "related": ["prompt-engineering-basics", "ai-agents", "retrieval-augmented-generation"],
    },
    {
        "slug": "retrieval-augmented-generation",
        "title": "Retrieval Augmented Generation",
        "subtitle": "Build RAG pipelines with vector databases, embeddings, chunking strategies, and evaluation frameworks.",
        "accent": "green",
        "related": ["large-language-models", "ai-agents", "advanced-prompt-engineering"],
    },
    {
        "slug": "ai-agents",
        "title": "AI Agent Architectures",
        "subtitle": "Understanding ReAct, Toolformer, AutoGPT, and the building blocks of autonomous AI agents in 2026.",
        "accent": "orange",
        "related": ["multi-agent-ai-systems", "retrieval-augmented-generation", "ai-automation-workflows"],
    },
    {
        "slug": "multi-agent-ai-systems",
        "title": "Multi-Agent AI Systems",
        "subtitle": "Collaborative AI agents, agent orchestration, communication protocols, and swarm intelligence patterns.",
        "accent": "pink",
        "related": ["ai-agents", "ai-automation-workflows", "ai-future-trends-2026"],
    },
    {
        "slug": "ai-ethics-responsible-development",
        "title": "AI Ethics and Responsible Development",
        "subtitle": "Bias mitigation, fairness, transparency, accountability, and governance frameworks for ethical AI.",
        "accent": "blue",
        "related": ["ai-future-trends-2026", "introduction-to-artificial-intelligence", "ai-in-healthcare"],
    },
    {
        "slug": "ai-in-healthcare",
        "title": "AI in Healthcare",
        "subtitle": "Medical imaging, drug discovery, diagnostics, personalized medicine, and FDA-approved AI tools in 2026.",
        "accent": "green",
        "related": ["ai-ethics-responsible-development", "computer-vision-ai", "ai-future-trends-2026"],
    },
    {
        "slug": "ai-in-finance",
        "title": "AI in Finance",
        "subtitle": "Algorithmic trading, fraud detection, risk modeling, robo-advisors, and regulatory compliance in fintech.",
        "accent": "purple",
        "related": ["machine-learning-basics", "ai-automation-workflows", "ai-future-trends-2026"],
    },
    {
        "slug": "ai-in-marketing-ecommerce",
        "title": "AI in Marketing & E-Commerce",
        "subtitle": "Personalization, recommendation engines, predictive analytics, content generation, and customer segmentation.",
        "accent": "pink",
        "related": ["generative-ai-overview", "ai-automation-workflows", "machine-learning-basics"],
    },
    {
        "slug": "ai-automation-workflows",
        "title": "AI Automation Workflows",
        "subtitle": "Build end-to-end AI pipelines with LangChain, CrewAI, and modern orchestration tools for enterprise automation.",
        "accent": "blue",
        "accent": "orange",
        "related": ["ai-agents", "multi-agent-ai-systems", "mlops-fundamentals"],
    },
    {
        "slug": "mlops-fundamentals",
        "title": "MLOps Fundamentals",
        "subtitle": "CI/CD for ML, model monitoring, versioning, A/B testing, and deploying ML at scale in production.",
        "accent": "green",
        "related": ["machine-learning-basics", "ai-automation-workflows", "ai-future-trends-2026"],
    },
    {
        "slug": "ai-future-trends-2026",
        "title": "AI Future Trends 2026",
        "subtitle": "AGI timelines, quantum AI, neuromorphic computing, AI regulation, and the technologies shaping tomorrow.",
        "accent": "purple",
        "related": ["introduction-to-artificial-intelligence", "ai-ethics-responsible-development", "multi-agent-ai-systems"],
    },
]

# Section templates
SECTIONS_TEMPLATE = """
    <!-- Definition -->
    <section class="content-section animate-on-scroll" id="definition">
      <div class="section-header">
        <div class="section-number">01</div>
        <h2 class="section-title">What is {title}?</h2>
      </div>
      <div class="section-content">
        <p>{title} represents one of the most transformative areas in modern technology. At its core, it encompasses the theories, methodologies, and practical applications that enable machines to perform tasks that traditionally require human intelligence.</p>
        <p>The field has evolved rapidly from academic research to production-ready systems deployed across industries. Understanding {title} requires familiarity with its foundational principles, current state-of-the-art approaches, and emerging trends that define the landscape in 2026.</p>
        <div class="info-grid">
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon blue">&#128161;</div>
              <div class="info-card-title">Key Insight</div>
            </div>
            <p class="info-card-text">This technology bridges the gap between theoretical research and real-world impact, driving innovation across healthcare, finance, and automation.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon pink">&#127775;</div>
              <div class="info-card-title">2026 Status</div>
            </div>
            <p class="info-card-text">Currently experiencing rapid adoption with enterprise deployment rates increasing 300% year-over-year according to industry reports.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- History -->
    <section class="content-section animate-on-scroll" id="history">
      <div class="section-header">
        <div class="section-number">02</div>
        <h2 class="section-title">History & Evolution</h2>
      </div>
      <div class="section-content">
        <p>The journey of {title} spans decades of research, breakthroughs, and paradigm shifts. From early theoretical frameworks to modern implementations, understanding this history provides essential context.</p>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-date">1950s - 1970s</div>
            <div class="timeline-title">Foundational Era</div>
            <p class="timeline-desc">Early theoretical work established the mathematical and logical foundations. The Turing Test (1950) and the first neural networks (Perceptron, 1958) marked the beginning.</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">1980s - 1990s</div>
            <div class="timeline-title">Knowledge-Based Systems</div>
            <p class="timeline-desc">Expert systems and symbolic AI dominated. The backpropagation algorithm enabled multi-layer neural network training, sparking renewed interest in connectionist approaches.</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">2000s - 2010s</div>
            <div class="timeline-title">Data-Driven Revolution</div>
            <p class="timeline-desc">Big data, GPUs, and deep learning architectures (AlexNet 2012, Transformers 2017) transformed the field. {title} became practical at scale.</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-date">2020s - 2026</div>
            <div class="timeline-title">Generative & Agentic Era</div>
            <p class="timeline-desc">Large-scale models, autonomous agents, and multimodal systems define the current landscape. Integration into enterprise workflows is now standard practice.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Concepts -->
    <section class="content-section animate-on-scroll" id="concepts">
      <div class="section-header">
        <div class="section-number">03</div>
        <h2 class="section-title">Core Concepts & Architecture</h2>
      </div>
      <div class="section-content">
        <p>Understanding the architecture and core concepts of {title} is essential for practitioners and researchers alike. This section breaks down the fundamental building blocks.</p>
        <h3>Key Components</h3>
        <div class="info-grid">
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon purple">&#9881;</div>
              <div class="info-card-title">Architecture</div>
            </div>
            <p class="info-card-text">The structural design patterns that define how systems process information, make decisions, and learn from data.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon green">&#128268;</div>
              <div class="info-card-title">Data Pipeline</div>
            </div>
            <p class="info-card-text">End-to-end data flows from ingestion and preprocessing through model training to deployment and monitoring.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon orange">&#128200;</div>
              <div class="info-card-title">Training Process</div>
            </div>
            <p class="info-card-text">Optimization algorithms, loss functions, and evaluation metrics that drive model improvement during training.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon pink">&#128161;</div>
              <div class="info-card-title">Inference Engine</div>
            </div>
            <p class="info-card-text">Production deployment patterns including model serving, batch processing, and real-time prediction systems.</p>
          </div>
        </div>
        <h3>Workflow Overview</h3>
        <p>A typical {title} workflow involves several stages: problem definition, data collection, preprocessing, model selection, training, evaluation, deployment, and continuous monitoring. Each stage requires specific tools and expertise.</p>
      </div>
    </section>

    <!-- Use Cases -->
    <section class="content-section animate-on-scroll" id="use-cases">
      <div class="section-header">
        <div class="section-number">04</div>
        <h2 class="section-title">Real-World Use Cases</h2>
      </div>
      <div class="section-content">
        <p>{title} powers countless applications across industries. Here are the most impactful use cases in 2026:</p>
        <div class="info-grid">
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon blue">&#127973;</div>
              <div class="info-card-title">Healthcare</div>
            </div>
            <p class="info-card-text">Medical imaging analysis, drug discovery acceleration, patient triage systems, and personalized treatment recommendations.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon green">&#128176;</div>
              <div class="info-card-title">Finance</div>
            </div>
            <p class="info-card-text">Algorithmic trading, fraud detection, credit risk assessment, and automated compliance monitoring.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon orange">&#128722;</div>
              <div class="info-card-title">E-Commerce</div>
            </div>
            <p class="info-card-text">Product recommendations, dynamic pricing, demand forecasting, and personalized customer experiences.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon pink">&#128187;</div>
              <div class="info-card-title">Software</div>
            </div>
            <p class="info-card-text">Code generation, automated testing, bug detection, and intelligent documentation systems.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Advantages & Disadvantages -->
    <section class="content-section animate-on-scroll" id="advantages">
      <div class="section-header">
        <div class="section-number">05</div>
        <h2 class="section-title">Advantages & Disadvantages</h2>
      </div>
      <div class="section-content">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Advantages</th>
              <th>Disadvantages</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Scalable automation of complex tasks</td>
              <td>High computational and energy costs</td>
            </tr>
            <tr>
              <td>Improved accuracy over time with more data</td>
              <td>Requires large, high-quality datasets</td>
            </tr>
            <tr>
              <td>24/7 operation without fatigue</td>
              <td>Potential bias in training data</td>
            </tr>
            <tr>
              <td>Pattern discovery beyond human capability</td>
              <td>Interpretability and explainability challenges</td>
            </tr>
            <tr>
              <td>Personalization at massive scale</td>
              <td>Regulatory and compliance complexity</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Tools & Frameworks -->
    <section class="content-section animate-on-scroll" id="tools">
      <div class="section-header">
        <div class="section-number">06</div>
        <h2 class="section-title">Best Tools & Frameworks (2026)</h2>
      </div>
      <div class="section-content">
        <p>The ecosystem around {title} is rich with tools. Here are the industry standards:</p>
        <div class="info-grid">
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon purple">&#9881;</div>
              <div class="info-card-title">TensorFlow / PyTorch</div>
            </div>
            <p class="info-card-text">The dominant deep learning frameworks. PyTorch leads in research; TensorFlow in production deployments.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon blue">&#128230;</div>
              <div class="info-card-title">Hugging Face</div>
            </div>
            <p class="info-card-text">The central hub for pre-trained models, datasets, and community-driven AI research and tools.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon green">&#128295;</div>
              <div class="info-card-title">LangChain / CrewAI</div>
            </div>
            <p class="info-card-text">Orchestration frameworks for building agentic applications and complex AI workflows.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon orange">&#128202;</div>
              <div class="info-card-title">Weights & Biases</div>
            </div>
            <p class="info-card-text">Experiment tracking, model versioning, and visualization for ML lifecycle management.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Example -->
    <section class="content-section animate-on-scroll" id="code">
      <div class="section-header">
        <div class="section-number">07</div>
        <h2 class="section-title">Code Example</h2>
      </div>
      <div class="section-content">
        <p>Here is a practical example demonstrating core concepts:</p>
        <div class="code-block-wrapper">
          <div class="code-block-header">
            <span class="code-block-lang">Python</span>
            <button class="copy-btn" type="button">
              <span>&#128203;</span> Copy
            </button>
          </div>
          <pre class="code-block"><code><span class="keyword">import</span> numpy <span class="keyword">as</span> np
<span class="keyword">from</span> sklearn.model_selection <span class="keyword">import</span> train_test_split
<span class="keyword">from</span> sklearn.ensemble <span class="keyword">import</span> RandomForestClassifier
<span class="keyword">from</span> sklearn.metrics <span class="keyword">import</span> accuracy_score

<span class="comment"># Load and prepare data</span>
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=<span class="number">0.2</span>, random_state=<span class="number">42</span>
)

<span class="comment"># Initialize and train model</span>
model = RandomForestClassifier(n_estimators=<span class="number">100</span>, random_state=<span class="number">42</span>)
model.fit(X_train, y_train)

<span class="comment"># Evaluate</span>
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
<span class="function">print</span>(<span class="string">f"Accuracy: {{accuracy:.2%}}"</span>)</code></pre>
        </div>
      </div>
    </section>

    <!-- Career -->
    <section class="content-section animate-on-scroll" id="career">
      <div class="section-header">
        <div class="section-number">08</div>
        <h2 class="section-title">Career Opportunities</h2>
      </div>
      <div class="section-content">
        <p>The demand for professionals skilled in {title} continues to grow exponentially. Key roles include:</p>
        <ul>
          <li><strong>AI/ML Engineer:</strong> Build and deploy models into production systems ($140K - $250K+)</li>
          <li><strong>Data Scientist:</strong> Extract insights and build predictive models ($120K - $220K)</li>
          <li><strong>Research Scientist:</strong> Push boundaries of what is possible ($150K - $300K+)</li>
          <li><strong>MLOps Engineer:</strong> Manage ML infrastructure and CI/CD pipelines ($130K - $240K)</li>
          <li><strong>AI Product Manager:</strong> Bridge technical and business domains ($130K - $250K)</li>
        </ul>
        <p>Certifications from Google, AWS, Microsoft, and specialized platforms like DeepLearning.AI remain highly valued in 2026.</p>
      </div>
    </section>

    <!-- Future Trends -->
    <section class="content-section animate-on-scroll" id="future">
      <div class="section-header">
        <div class="section-number">09</div>
        <h2 class="section-title">Future Trends (2026 & Beyond)</h2>
      </div>
      <div class="section-content">
        <p>The field is evolving rapidly. Key trends to watch:</p>
        <div class="info-grid">
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon blue">&#127758;</div>
              <div class="info-card-title">Multimodal AI</div>
            </div>
            <p class="info-card-text">Systems that seamlessly process text, images, audio, and video in unified architectures.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon green">&#128736;</div>
              <div class="info-card-title">Edge AI</div>
            </div>
            <p class="info-card-text">Deploying models directly on devices for lower latency, privacy, and reduced cloud costs.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon pink">&#128737;</div>
              <div class="info-card-title">Trustworthy AI</div>
            </div>
            <p class="info-card-text">Explainability, fairness, and robustness becoming mandatory for enterprise adoption.</p>
          </div>
          <div class="info-card">
            <div class="info-card-header">
              <div class="info-card-icon orange">&#9889;</div>
              <div class="info-card-title">Agentic Systems</div>
            </div>
            <p class="info-card-text">Autonomous AI agents that plan, use tools, and collaborate to accomplish complex goals.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="content-section animate-on-scroll" id="faq">
      <div class="section-header">
        <div class="section-number">10</div>
        <h2 class="section-title">Frequently Asked Questions</h2>
      </div>
      <div class="section-content">
        <div class="faq-list">
          <div class="faq-item">
            <button class="faq-question" type="button">
              What prerequisites do I need to learn {title}?
            </button>
            <div class="faq-answer">
              <p>Basic programming (Python recommended), statistics, linear algebra, and calculus form the foundation. Familiarity with data structures and algorithms is also beneficial. Many successful practitioners start with online courses and build projects to reinforce learning.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">
              How long does it take to become proficient?
            </button>
            <div class="faq-answer">
              <p>With consistent study (10-15 hours/week), most learners achieve intermediate proficiency within 6-12 months. Mastery typically requires 2-3 years of hands-on project experience and continuous learning as the field evolves.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">
              Is a degree required to work in this field?
            </button>
            <div class="faq-answer">
              <p>No. While a degree in computer science, math, or statistics can help, many professionals enter through bootcamps, certifications, and self-study. A strong portfolio of projects often matters more than formal credentials.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">
              What are the biggest challenges in 2026?
            </button>
            <div class="faq-answer">
              <p>Key challenges include managing computational costs, ensuring model reliability in production, addressing bias and fairness, navigating evolving regulations, and the shortage of specialized talent.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">
              Which industries are hiring the most?
            </button>
            <div class="faq-answer">
              <p>Technology, finance, healthcare, consulting, and e-commerce lead hiring. However, virtually every industry is integrating AI, creating opportunities in manufacturing, agriculture, education, and government sectors.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
"""


def get_related_cards(topic, all_topics):
    cards = []
    for slug in topic["related"]:
        for t in all_topics:
            if t["slug"] == slug:
                cards.append(t)
                break
    return cards


def generate_html(topic, all_topics):
    title = topic["title"]
    slug = topic["slug"]
    subtitle = topic["subtitle"]
    meta_keywords = f"{title}, AI, Machine Learning, Deep Learning, 2026, Tutorial, Guide"
    meta_desc = f"{subtitle} Complete guide with code examples, tools, career paths, and future trends."
    canonical = f"https://airesearchhub.com/topics/{slug}.html"
    og_image = f"https://airesearchhub.com/assets/images/{slug}.png"

    # Build TOC links
    toc_links = """
          <li><a href="#definition">What is it?</a></li>
          <li><a href="#history">History & Evolution</a></li>
          <li><a href="#concepts">Core Concepts</a></li>
          <li><a href="#use-cases">Real-World Use Cases</a></li>
          <li><a href="#advantages">Pros & Cons</a></li>
          <li><a href="#tools">Tools & Frameworks</a></li>
          <li><a href="#code">Code Example</a></li>
          <li><a href="#career">Career Opportunities</a></li>
          <li><a href="#future">Future Trends</a></li>
          <li><a href="#faq">FAQs</a></li>
"""

    # Build breadcrumb
    breadcrumb = f"""
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span class="breadcrumb-separator">/</span>
      <a href="/topics/">Topics</a>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-current">{title}</span>
    </nav>
"""

    # Build related articles
    related_cards = get_related_cards(topic, all_topics)
    related_html = ""
    for rt in related_cards:
        related_html += f"""
          <a class="related-card" href="{rt['slug']}.html">
            <div class="related-card-tag">{rt['title'].split()[0]}</div>
            <div class="related-card-title">{rt['title']}</div>
            <div class="related-card-desc">{rt['subtitle'][:90]}...</div>
          </a>
"""

    # Social share URLs
    share_text = f"Check out this comprehensive guide on {title}"
    share_url = canonical
    social_html = f"""
    <div class="social-share">
      <span class="social-label">Share this article:</span>
      <div class="social-links">
        <a class="social-link" href="https://twitter.com/intent/tweet?text={share_text.replace(' ', '%20')}&url={share_url}" target="_blank" rel="noopener" title="Share on X">X</a>
        <a class="social-link" href="https://www.linkedin.com/sharing/share-offsite/?url={share_url}" target="_blank" rel="noopener" title="Share on LinkedIn">in</a>
        <a class="social-link" href="https://www.facebook.com/sharer/sharer.php?u={share_url}" target="_blank" rel="noopener" title="Share on Facebook">f</a>
      </div>
    </div>
"""

    sections = SECTIONS_TEMPLATE.format(title=title)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | AI Research Hub - Complete Guide 2026</title>
  <meta name="description" content="{meta_desc}">
  <meta name="keywords" content="{meta_keywords}">
  <meta name="author" content="AI Research Hub">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{canonical}">
  <meta property="og:title" content="{title} | AI Research Hub">
  <meta property="og:description" content="{meta_desc}">
  <meta property="og:image" content="{og_image}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="AI Research Hub">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title} | AI Research Hub">
  <meta name="twitter:description" content="{meta_desc}">
  <meta name="twitter:image" content="{og_image}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/styles.css">
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{title}",
    "description": "{meta_desc}",
    "author": {{"@type": "Organization", "name": "AI Research Hub"}},
    "publisher": {{"@type": "Organization", "name": "AI Research Hub"}},
    "datePublished": "2026-05-21",
    "dateModified": "2026-05-21",
    "mainEntityOfPage": {{"@type": "WebPage", "@id": "{canonical}"}}
  }}
  </script>
</head>
<body>
  <div class="progress-bar" aria-hidden="true"></div>

  <header class="site-header">
    <div class="header-container">
      <a href="/" class="header-logo">
        <span class="logo-icon">&#129302;</span>
        <span>AI Research Hub</span>
      </a>
      <nav class="header-nav" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/topics/" class="active">Topics</a>
        <a href="#newsletter">Newsletter</a>
      </nav>
    </div>
  </header>

  <div class="page-container">
    <aside class="sidebar" aria-label="Table of contents">
      <div class="toc-title">On this page</div>
      <ul class="toc-list">
{toc_links}
      </ul>
    </aside>

    <main class="main-content">
{breadcrumb}

      <section class="hero-section">
        <h1 class="hero-title">{title}</h1>
        <p class="hero-subtitle">{subtitle}</p>
        <div class="hero-meta">
          <span>&#128197; May 21, 2026</span>
          <span>&#9201; 12 min read</span>
          <span>&#128218; Beginner to Advanced</span>
        </div>
        <div class="tag-list">
          <span class="tag-pill">AI</span>
          <span class="tag-pill">2026</span>
          <span class="tag-pill">Tutorial</span>
          <span class="tag-pill">Guide</span>
        </div>
      </section>

{sections}

      <!-- Newsletter -->
      <section class="newsletter-section" id="newsletter">
        <h3 class="newsletter-title">Stay Ahead in AI</h3>
        <p class="newsletter-desc">Get weekly insights on the latest AI research, tools, and career opportunities delivered to your inbox.</p>
        <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Thanks for subscribing!');">
          <input class="newsletter-input" type="email" placeholder="your@email.com" required aria-label="Email address">
          <button class="btn-primary" type="submit">Subscribe</button>
        </form>
      </section>

{social_html}

      <!-- Related Articles -->
      <section class="related-section">
        <h3 class="related-title">&#128218; Related Articles</h3>
        <div class="related-grid">
{related_html}
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <h3 class="cta-title">Ready to Apply What You Learned?</h3>
        <p class="cta-desc">Explore our other guides and start building real-world AI projects today.</p>
        <a href="/topics/" class="btn-primary">Browse All Topics</a>
      </section>
    </main>
  </div>

  <footer class="site-footer">
    <div class="footer-content">
      <p class="footer-text">&copy; 2026 AI Research Hub. All rights reserved.</p>
      <div class="footer-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </footer>

  <button class="scroll-top" type="button" aria-label="Scroll to top">&#8593;</button>
  <button class="sidebar-toggle" type="button" aria-label="Toggle sidebar">&#9776;</button>
  <div class="overlay"></div>

  <script src="../assets/js/main.js"></script>
</body>
</html>
"""
    return html


def main():
    topics_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "topics")
    os.makedirs(topics_dir, exist_ok=True)

    generated = []
    for topic in TOPICS:
        html = generate_html(topic, TOPICS)
        filepath = os.path.join(topics_dir, f"{topic['slug']}.html")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html)
        generated.append(topic["slug"])
        print(f"Generated: {filepath}")

    print(f"\nSuccessfully generated {len(generated)} topic pages.")
    print("Files in topics/:")
    for f in sorted(os.listdir(topics_dir)):
        print(f"  - {f}")


if __name__ == "__main__":
    main()

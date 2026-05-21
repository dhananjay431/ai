/**
 * AI Research Hub - Shared JavaScript
 * Handles: progress bar, scroll spy, code copy, FAQ accordion, sidebar toggle, scroll to top
 */

(function () {
  "use strict";

  // DOM Ready
  document.addEventListener("DOMContentLoaded", function () {
    initProgressBar();
    initScrollSpy();
    initCopyButtons();
    initFaqAccordion();
    initSidebarToggle();
    initScrollTop();
    initScrollAnimations();
  });

  // ==================== Progress Bar ====================
  function initProgressBar() {
    const bar = document.querySelector(".progress-bar");
    if (!bar) return;

    function updateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + "%";
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  // ==================== Scroll Spy (Sidebar TOC) ====================
  function initScrollSpy() {
    const sections = document.querySelectorAll(".content-section[id]");
    const tocLinks = document.querySelectorAll('.toc-list a[href^="#"]');
    if (!sections.length || !tocLinks.length) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          tocLinks.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + id,
            );
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ==================== Copy Code Buttons ====================
  function initCopyButtons() {
    document.querySelectorAll(".copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const wrapper = btn.closest(".code-block-wrapper");
        const codeBlock = wrapper ? wrapper.querySelector(".code-block") : null;
        if (!codeBlock) return;

        const text = codeBlock.textContent || codeBlock.innerText;

        navigator.clipboard
          .writeText(text)
          .then(function () {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = "<span>&#10003;</span> Copied";
            btn.classList.add("copied");

            setTimeout(function () {
              btn.innerHTML = originalHTML;
              btn.classList.remove("copied");
            }, 2000);
          })
          .catch(function () {
            // Fallback
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);

            const originalHTML = btn.innerHTML;
            btn.innerHTML = "<span>&#10003;</span> Copied";
            btn.classList.add("copied");
            setTimeout(function () {
              btn.innerHTML = originalHTML;
              btn.classList.remove("copied");
            }, 2000);
          });
      });
    });
  }

  // ==================== FAQ Accordion ====================
  function initFaqAccordion() {
    document.querySelectorAll(".faq-question").forEach(function (question) {
      question.addEventListener("click", function () {
        const item = question.closest(".faq-item");
        const isActive = item.classList.contains("active");

        // Close all others
        document
          .querySelectorAll(".faq-item.active")
          .forEach(function (activeItem) {
            if (activeItem !== item) {
              activeItem.classList.remove("active");
            }
          });

        // Toggle current
        item.classList.toggle("active", !isActive);
      });
    });
  }

  // ==================== Sidebar Toggle (Mobile) ====================
  function initSidebarToggle() {
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    if (!toggleBtn || !sidebar) return;

    toggleBtn.addEventListener("click", function () {
      sidebar.classList.toggle("open");
      if (overlay) overlay.classList.toggle("active");
      document.body.style.overflow = sidebar.classList.contains("open")
        ? "hidden"
        : "";
    });

    if (overlay) {
      overlay.addEventListener("click", function () {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      });
    }

    // Close sidebar when clicking a TOC link on mobile
    document.querySelectorAll(".toc-list a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 1024) {
          sidebar.classList.remove("open");
          if (overlay) overlay.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
    });
  }

  // ==================== Scroll to Top ====================
  function initScrollTop() {
    const btn = document.querySelector(".scroll-top");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      function () {
        btn.classList.toggle(
          "visible",
          (window.scrollY || document.documentElement.scrollTop) > 400,
        );
      },
      { passive: true },
    );

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==================== Scroll Animations ====================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }
})();

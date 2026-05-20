/**
 * BIOMAS ESG — abas principais, serviços, contato e carrossel (Wix)
 */
(function () {
  "use strict";

  function activateTab(buttons, panels, activeId, tabAttr, panelAttr) {
    buttons.forEach(function (btn) {
      var on = btn.getAttribute(tabAttr) === activeId;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach(function (panel) {
      panel.classList.toggle("is-active", panel.getAttribute(panelAttr) === activeId);
    });
  }

  function initMainTabs(root) {
    var tabs = root.querySelectorAll('[role="tab"][data-bio-main-tab]');
    var panels = root.querySelectorAll("[data-bio-main-panel]");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateTab(
          tabs,
          panels,
          tab.getAttribute("data-bio-main-tab"),
          "data-bio-main-tab",
          "data-bio-main-panel"
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function initServiceTabs(root) {
    var tabs = root.querySelectorAll('[role="tab"][data-bio-service-tab]');
    var panels = root.querySelectorAll("[data-bio-service-panel]");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateTab(
          tabs,
          panels,
          tab.getAttribute("data-bio-service-tab"),
          "data-bio-service-tab",
          "data-bio-service-panel"
        );
      });
    });
  }

  function initContactTabs(root) {
    var tabs = root.querySelectorAll('[role="tab"][data-bio-contact-tab]');
    var panels = root.querySelectorAll("[data-bio-contact-panel]");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activateTab(
          tabs,
          panels,
          tab.getAttribute("data-bio-contact-tab"),
          "data-bio-contact-tab",
          "data-bio-contact-panel"
        );
      });
    });
  }

  function initMockForms(root) {
    root.querySelectorAll("[data-bio-form-mock]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = form.querySelector("[data-bio-form-success]");
        if (ok) {
          ok.hidden = false;
        }
        form.reset();
      });
    });
  }

  function initCarousel(root) {
    var carousel = root.querySelector("[data-bio-carousel]");
    if (!carousel) return;

    var track = carousel.querySelector(".bio-carousel__track");
    var slides = carousel.querySelectorAll(".bio-carousel__slide");
    var prev = carousel.querySelector(".bio-carousel__btn--prev");
    var next = carousel.querySelector(".bio-carousel__btn--next");
    var dotsWrap = carousel.querySelector(".bio-carousel__dots");
    var index = 0;
    var total = slides.length;
    var timer;

    if (!track || total === 0) return;

    function goTo(i) {
      index = (i + total) % total;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      if (dotsWrap) {
        dotsWrap.querySelectorAll(".bio-carousel__dot").forEach(function (dot, d) {
          dot.classList.toggle("is-active", d === index);
        });
      }
    }

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "bio-carousel__dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", "Imagem " + (i + 1));
        dot.addEventListener("click", function () {
          goTo(i);
          resetAuto();
        });
        dotsWrap.appendChild(dot);
      });
    }

    function resetAuto() {
      clearInterval(timer);
      timer = setInterval(function () {
        goTo(index + 1);
      }, 6000);
    }

    if (prev) prev.addEventListener("click", function () { goTo(index - 1); resetAuto(); });
    if (next) next.addEventListener("click", function () { goTo(index + 1); resetAuto(); });

    resetAuto();
  }

  function initCtaButtons(root) {
    root.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-bio-main-tab]");
      if (!btn || btn.getAttribute("role") === "tab") return;
      var id = btn.getAttribute("data-bio-main-tab");
      var tabs = root.querySelectorAll('[role="tab"][data-bio-main-tab]');
      var panels = root.querySelectorAll("[data-bio-main-panel]");
      activateTab(tabs, panels, id, "data-bio-main-tab", "data-bio-main-panel");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function init(root) {
    if (!root || root.getAttribute("data-bio-init") === "true") return;
    root.setAttribute("data-bio-init", "true");
    initMainTabs(root);
    initServiceTabs(root);
    initContactTabs(root);
    initMockForms(root);
    initCarousel(root);
    initCtaButtons(root);
  }

  function boot() {
    init(document.getElementById("biomas-site"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

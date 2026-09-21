/*
 * Corporate Learning Institute — website interactions
 * No packages, build step, database, or API key are needed.
 */

"use strict";

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

// Keep the mobile navigation usable with a keyboard and touch screen.
if (menuButton && navigation) {
  document.documentElement.classList.add("js");

  function setMenuOpen(open) {
    navigation.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation"
    );
  }

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("open")) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  window.matchMedia("(min-width: 901px)").addEventListener("change", () => {
    setMenuOpen(false);
  });
}

// Add a subtle divider once the page scrolls below the header.
if (header) {
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

// Content remains visible if JavaScript or IntersectionObserver is unavailable.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-pending");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-pending");
    observer.observe(element);
  });
}

// Keep the footer copyright year current.
const copyrightYear = document.getElementById("year");
if (copyrightYear) {
  copyrightYear.textContent = String(new Date().getFullYear());
}

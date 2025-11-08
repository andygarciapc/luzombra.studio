/* =======================================
   Luzombra Studio - Lazy Load Script
   Purpose: Progressive lazy loading for media
   Author: Luzombra Studio Dev Team
   ======================================= */

document.addEventListener("DOMContentLoaded", () => {
  console.log("🌓 LazyLoad initialized");

  const lazyElements = document.querySelectorAll("[data-src], [data-bg], video[data-poster]");

  // Define observer with root margin for preloading before visibility
  const lazyObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;

          /* ---------- Lazy Images ---------- */
          if (el.dataset.src) {
            el.src = el.dataset.src;
            el.onload = () => {
              el.classList.add("fade-in");
              el.removeAttribute("data-src");
            };
          }

          /* ---------- Lazy Backgrounds ---------- */
          if (el.dataset.bg) {
            el.style.backgroundImage = `url('${el.dataset.bg}')`;
            el.classList.add("fade-in");
            el.removeAttribute("data-bg");
          }

          /* ---------- Lazy Videos (poster preload) ---------- */
          if (el.dataset.poster && el.tagName === "VIDEO") {
            el.poster = el.dataset.poster;
            el.classList.add("fade-in");
            el.removeAttribute("data-poster");
          }

          observer.unobserve(el);
        }
      });
    },
    {
      rootMargin: "200px 0px", // start loading before scrolling into view
      threshold: 0.1,
    }
  );

  // Observe all lazy media
  lazyElements.forEach((el) => {
    lazyObserver.observe(el);
  });
});


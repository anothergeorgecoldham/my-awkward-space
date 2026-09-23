const toggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const systemTheme = matchMedia("(prefers-color-scheme: dark)");
const syncLabel = () => {
  const dark = html.classList.contains("dark");
  html.style.colorScheme = dark ? "dark" : "light";
  toggle?.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  toggle?.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
};
syncLabel();
toggle?.addEventListener("click", () => {
  html.classList.toggle("dark");
  try { localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light"); } catch {}
  syncLabel();
});
systemTheme.addEventListener("change", event => {
  try {
    if (localStorage.getItem("theme") === "system") {
      html.classList.toggle("dark", event.matches);
      syncLabel();
    }
  } catch {}
});
const menu = document.querySelector<HTMLDetailsElement>(".mobile-menu");
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menu?.open) {
    menu.open = false;
    menu.querySelector("summary")?.focus();
  }
});
document.addEventListener("click", event => {
  if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
});
const surface = document.getElementById("site-surface");
const motion = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
let frame = 0;
let cursor: { x: number; y: number } | null = null;
const clear = () => {
  if (frame) cancelAnimationFrame(frame);
  frame = 0; cursor = null;
  if (surface) delete surface.dataset.hexActive;
};
surface?.addEventListener("pointermove", event => {
  if (!motion.matches || event.pointerType === "touch") { clear(); return; }
  cursor = { x: event.clientX, y: event.clientY };
  if (!frame) frame = requestAnimationFrame(() => {
    frame = 0;
    if (!cursor || !motion.matches) return;
    const bounds = surface.getBoundingClientRect();
    surface.style.setProperty("--pointer-x", `${cursor.x - bounds.left}px`);
    surface.style.setProperty("--pointer-y", `${cursor.y - bounds.top}px`);
    surface.dataset.hexActive = "true";
  });
}, { passive: true });
surface?.addEventListener("pointerleave", clear);
surface?.addEventListener("pointercancel", clear);
window.addEventListener("scroll", clear, { passive: true });
window.addEventListener("blur", clear);
window.addEventListener("pagehide", clear);
motion.addEventListener("change", clear);

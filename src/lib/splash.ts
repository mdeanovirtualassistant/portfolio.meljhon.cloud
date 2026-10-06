/**
 * Loading screen. The markup and styles live in index.html so the splash paints before any JavaScript runs;
 * this module removes it once the page is ready. It stays up for at least MIN_VISIBLE_MS so it never just
 * flashes, and never longer than MAX_WAIT_MS, even if an image or font is slow.
 */
const MIN_VISIBLE_MS = 1600;
const MIN_VISIBLE_REDUCED_MS = 250;
const MAX_WAIT_MS = 7000;

const unlock = () => document.documentElement.classList.remove("splash-lock");

const loaded = () =>
  document.readyState === "complete"
    ? Promise.resolve()
    : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));

const imageReady = (img: HTMLImageElement | null) =>
  !img || img.complete
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => resolve(), { once: true });
      });

export const dismissSplash = () => {
  const el = document.getElementById("app-loader");
  if (!el) {
    unlock();
    window.dispatchEvent(new Event("splash-done"));
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minVisible = reduced ? MIN_VISIBLE_REDUCED_MS : MIN_VISIBLE_MS;

  const finish = () => {
    el.classList.add("is-done");
    unlock();
    window.dispatchEvent(new Event("splash-done"));
    window.setTimeout(() => el.remove(), 800);
  };

  const ready = Promise.all([loaded(), imageReady(el.querySelector("img")), document.fonts?.ready ?? Promise.resolve()]);
  const giveUp = new Promise<void>((resolve) => window.setTimeout(resolve, Math.max(0, MAX_WAIT_MS - performance.now())));

  Promise.race([ready, giveUp]).then(() => {
    window.setTimeout(finish, Math.max(0, minVisible - performance.now()));
  });
};

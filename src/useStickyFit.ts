import { useEffect, type RefObject } from "react";

/**
 * Keeps a `position: sticky` column fully reachable. When it fits in the
 * window it pins below the header; when it's taller than the window it pins by
 * its bottom edge instead, so the end of it never gets cut off.
 */
export function useStickyFit(ref: RefObject<HTMLElement>, gap = 40) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 76;
      const preferred = header + gap;
      const fit = window.innerHeight - el.offsetHeight - gap;
      el.style.top = `${Math.min(preferred, fit)}px`;
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [ref, gap]);
}

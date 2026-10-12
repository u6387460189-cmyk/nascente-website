import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A list that lays out as a grid on desktop and becomes a swipeable,
 * snap-scrolling row on phones, with quiet position markers underneath.
 * Layout lives in CSS (`.rail`); this only tracks the active slide.
 */
export function Rail({ children, className = "", label }: { children: ReactNode; className?: string; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      setActive(Math.min(count - 1, Math.round(el.scrollLeft / step)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [count]);

  const go = (i: number) => {
    const item = track.current?.children[i] as HTMLElement | undefined;
    item?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div className={`rail ${className}`}>
      <ul ref={track} className="rail-track" aria-label={label}>
        {children}
      </ul>
      <div className="rail-dots" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <button key={i} type="button" tabIndex={-1} className={i === active ? "is-on" : ""} onClick={() => go(i)} />
        ))}
      </div>
    </div>
  );
}

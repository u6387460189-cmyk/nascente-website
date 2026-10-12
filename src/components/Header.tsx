import { useEffect, useRef, useState } from "react";
import type { Copy, Lang } from "../content";
import { Mark } from "./Mark";
import { Picture } from "./Picture";

/**
 * Fixed header: transparent over the hero, solid ivory once scrolled.
 * "Menu" opens a full-screen olive overlay with the section index.
 */
export function Header({ t, lang, onLang }: { t: Copy; lang: Lang; onLang: (l: Lang) => void }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (menu.current) menu.current.inert = !open;
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const LangSwitch = ({ className }: { className?: string }) => (
    <div className={`lang ${className ?? ""}`} role="group" aria-label="Language">
      {(["en", "pt"] as Lang[]).map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => onLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header className={`site-header ${solid ? "is-solid" : ""}`}>
        <button
          ref={menuBtn}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          <span className="menu-lines" aria-hidden="true" />
          <span className="menu-label">{t.nav.menu}</span>
        </button>

        <a href="#top" className="brand" aria-label="Nascente Project">
          <Mark className="brand-mark" />
          <span className="brand-word">nascente project</span>
        </a>

        <div className="header-end">
          <LangSwitch className="hide-sm" />
          <a href="#inquire" className="header-cta">
            {t.nav.inquire}
          </a>
        </div>
      </header>

      <div id="site-menu" className={`menu ${open ? "is-open" : ""}`} ref={menu} aria-hidden={!open}>
        <div className="menu-inner">
          <div className="menu-top">
            <button type="button" className="menu-btn" onClick={() => setOpen(false)}>
              <span className="menu-x" aria-hidden="true" />
              <span className="menu-label">{t.nav.close}</span>
            </button>
            <LangSwitch />
          </div>
          <nav aria-label="Sections">
            <ol className="menu-links">
              {t.nav.links.map(([id, label], i) => (
                <li key={id} style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}>
                  <a ref={i === 0 ? firstLink : undefined} href={`#${id}`} onClick={() => setOpen(false)}>
                    <span className="menu-num">{String(i + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="menu-foot">
            <span>Comporta · Portugal</span>
            <a href="mailto:info@nascenteproject.com">info@nascenteproject.com</a>
          </div>
        </div>
        <div className="menu-photo" aria-hidden="true">
          <Picture scene="dusk" alt="" portrait={false} />
          <Mark className="menu-photo-mark" />
        </div>
      </div>
    </>
  );
}

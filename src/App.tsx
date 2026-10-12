import { useCallback, useEffect, useRef, useState } from "react";
import { CONTACT, COPY, PEOPLE, type Lang, type SessionId } from "./content";
import { Header } from "./components/Header";
import { InquiryForm } from "./components/InquiryForm";
import { Mark } from "./components/Mark";
import { Picture } from "./components/Picture";
import { Rail } from "./components/Rail";
import { useReveal } from "./useReveal";
import { useStickyFit } from "./useStickyFit";

/** English lives at "/", Portuguese at "/pt". */
function langFromPath(): Lang {
  return /^\/pt(\/|$)/.test(window.location.pathname) ? "pt" : "en";
}

const ROMAN = ["I", "II", "III"];

export function App() {
  const [lang, setLang] = useState<Lang>(langFromPath);
  const [selected, setSelected] = useState<SessionId[]>([]);
  const [storyOpen, setStoryOpen] = useState(false);
  const privacy = useRef<HTMLDialogElement>(null);
  const inquireIntro = useRef<HTMLDivElement>(null);
  const t = COPY[lang];

  useReveal([lang, storyOpen]);
  useStickyFit(inquireIntro);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [lang, t]);

  useEffect(() => {
    const onPop = () => setLang(langFromPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const changeLang = useCallback((l: Lang) => {
    setLang(l);
    window.history.pushState(null, "", (l === "pt" ? "/pt" : "/") + window.location.hash);
  }, []);

  const pickSession = (id: SessionId) => {
    setSelected((s) => (s.includes(id) ? s : [...s, id]));
    document.getElementById("inquire-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openPrivacy = () => {
    const d = privacy.current;
    if (!d) return;
    d.showModal();
    d.scrollTop = 0;
  };

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header t={t} lang={lang} onLang={changeLang} />

      <main id="main">
        {/* Hero */}
        <section id="top" className="hero">
          <Picture scene="coast" alt="Golden cliffs above the beach at Comporta" className="hero-img" eager />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <Mark className="hero-mark" title="Nascente Project" />
            <p className="label label-light">{t.hero.place}</p>
            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <p className="hero-limit">{t.hero.limit}</p>
            <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(t.hero.mailSubject)}`} className="btn btn-light">
              {t.hero.cta}
            </a>
          </div>
          <p className="hero-foot">{t.hero.dates}</p>
        </section>

        {/* Nascente */}
        <section id="nascente" className="section nascente">
          <div className="wrap nascente-head">
            <p className="label reveal">{t.nascente.label}</p>
            <h2 className="statement stagger">
              {`${t.nascente.title} ${t.nascente.lead}`.split(" ").map((w, i, all) => (
                <span
                  key={i}
                  className={`w ${i >= t.nascente.title.split(" ").length ? "w-soft" : ""}`}
                  style={{ transitionDelay: `${i * 45}ms` }}
                >
                  {w}
                  {i < all.length - 1 ? " " : ""}
                </span>
              ))}
            </h2>
          </div>
          <div className="wrap collage">
            <Picture scene="pines" alt="Stone pines against a clear sky" className="frame collage-a unveil float-slow" />
            <Picture scene="touch" alt="A child's hand resting on the bark of a pine tree" className="frame collage-b unveil" />
            <Picture scene="grove" alt="A grove of pines above the dunes" className="frame collage-c unveil float-fast" portrait={false} />
          </div>
          <div className="wrap-narrow nascente-foot">
            <p className="body reveal">{t.nascente.body}</p>
          </div>
        </section>

        {/* Philosophy */}
        <section id="philosophy" className="section section-sand philosophy">
          <div className="wrap-narrow">
            <Mark className="philosophy-mark reveal" />
            <h2 className="title reveal">{t.philosophy.title}</h2>
            <p className="lead reveal">{t.philosophy.lead}</p>
            {t.philosophy.body.map((p) => (
              <p key={p} className="body reveal">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Three streams */}
        <section id="ages" className="band band-ages">
          <Picture scene="dunes" alt="Ochre sandstone formations by the sea" className="band-img drift" />
          <div className="band-shade band-shade-deep" aria-hidden="true" />
          <div className="wrap ages">
            <div className="ages-head">
              <p className="label label-light reveal">{t.ages.label}</p>
              <h2 className="title title-light reveal">{t.ages.title}</h2>
              <p className="body body-light reveal">{t.ages.intro}</p>
            </div>
            <Rail className="streams" label={t.ages.title}>
              {t.ages.items.map((a, i) => (
                <li key={a.name} className="stream reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                  <span className="stream-dot" aria-hidden="true" />
                  <p className="stream-ages">{a.ages}</p>
                  <h3 className="stream-name">{a.name}</h3>
                  <p className="stream-text">{a.text}</p>
                </li>
              ))}
            </Rail>
          </div>
        </section>

        {/* A day */}
        <section id="day" className="section">
          <div className="wrap day">
            <div className="day-media">
              <Picture scene="boardwalk" alt="A wooden boardwalk through the dunes" className="frame day-frame unveil" />
            </div>
            <div className="day-text">
              <p className="label reveal">{t.day.label}</p>
              <h2 className="title reveal">{t.day.title}</h2>
              <p className="body reveal">{t.day.intro}</p>
              <Rail className="timeline" label={t.day.title}>
                {t.day.items.map((it) => (
                  <li key={it.name} className="moment reveal">
                    <span className="moment-time">{it.time}</span>
                    <div>
                      <h3 className="moment-name">{it.name}</h3>
                      <p className="moment-text">{it.text}</p>
                    </div>
                  </li>
                ))}
              </Rail>
            </div>
          </div>
        </section>

        {/* Private immersions */}
        <section id="private" className="band band-private">
          <Picture scene="mist" alt="Umbrella pines in the morning haze" className="band-img drift" />
          <div className="band-shade band-shade-side" aria-hidden="true" />
          <div className="wrap private">
            <div className="private-head">
              <p className="label label-light reveal">{t.private.label}</p>
              <h2 className="title title-light reveal">{t.private.title}</h2>
              <p className="body body-light reveal">{t.private.intro}</p>
            </div>
            <div className="private-side">
              <ul className="private-list">
                {t.private.items.map((it, i) => (
                  <li key={it.name} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                    <h3 className="private-name">{it.name}</h3>
                    <p className="private-text">{it.text}</p>
                  </li>
                ))}
              </ul>
              <button type="button" className="btn btn-light reveal" onClick={() => pickSession("PRIVATE")}>
                {t.private.cta}
              </button>
            </div>
          </div>
        </section>

        {/* The people */}
        <section id="people" className="section">
          <div className="wrap split split-top">
            <div className="split-text">
              <p className="label reveal">{t.people.label}</p>
              <h2 className="title reveal">{t.people.title}</h2>
            </div>
            <div className={`story ${storyOpen ? "is-open" : ""}`}>
              <p className="lead reveal">{t.people.lead}</p>
              <div className="story-more">
                {t.people.body.map((p) => (
                  <p key={p} className="body">
                    {p}
                  </p>
                ))}
              </div>
              {!storyOpen && (
                <button type="button" className="more-btn" onClick={() => setStoryOpen(true)}>
                  {t.people.more}
                </button>
              )}
            </div>
          </div>
          <div className="wrap">
            <Rail className="people" label={t.people.title}>
              {PEOPLE.map((p, i) => (
                <li key={p.name} className="person reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="person-photo">
                    {p.photo ? <img src={p.photo} alt={p.name} loading="lazy" /> : <Mark className="person-mark" />}
                  </div>
                  <p className="person-name">{p.name}</p>
                  <p className="person-line">{p.line[lang]}</p>
                </li>
              ))}
            </Rail>
          </div>
        </section>

        {/* Inquire */}
        <section id="inquire" className="section section-olive">
          <div className="wrap inquire">
            <div className="inquire-intro" ref={inquireIntro}>
              <p className="label label-light reveal">{t.inquire.label}</p>
              <h2 className="title title-light reveal">{t.inquire.title}</h2>
              <ol className="steps">
                {t.inquire.steps.map((s, i) => (
                  <li key={s.title} className="reveal">
                    <span className="step-num">{ROMAN[i]}</span>
                    <div>
                      <h3 className="step-title">{s.title}</h3>
                      <p className="step-text">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="steps-note reveal">{t.inquire.note}</p>
            </div>
            <div id="inquire-form" className="form-wrap reveal">
              <h3 className="form-heading">{t.form.heading}</h3>
              <InquiryForm t={t} lang={lang} selected={selected} setSelected={setSelected} onPrivacy={openPrivacy} />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="band band-contact">
          <Picture scene="dusk" alt="Thatched huts above the beach at dusk" className="band-img drift" />
          <div className="band-shade" aria-hidden="true" />
          <div className="band-content wrap-narrow">
            <p className="label label-light reveal">{t.contact.label}</p>
            <h2 className="title title-light reveal">{t.contact.title}</h2>
            <ul className="contact-list reveal">
              <li>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
              <li>{CONTACT.place}</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a href="#top" className="footer-brand" aria-label="Nascente Project">
            <Mark className="footer-mark" />
            <span>
              <span className="footer-word">nascente project</span>
              <span className="footer-place">Comporta</span>
            </span>
          </a>
          <div className="footer-meta">
            <button type="button" className="footer-link" onClick={openPrivacy}>
              {t.footer.privacy}
            </button>
            <span>
              © {new Date().getFullYear()} {t.footer.rights}
            </span>
          </div>
        </div>
      </footer>

      <dialog
        ref={privacy}
        className="privacy"
        aria-labelledby="privacy-title"
        onClick={(e) => e.target === e.currentTarget && privacy.current?.close()}
      >
        <div className="privacy-inner">
          <h2 id="privacy-title" className="title">
            {t.privacy.title}
          </h2>
          {t.privacy.body.map((p, i) => {
            // Paragraphs open with a short heading sentence ("Who sees it."); set it apart.
            const cut = p.indexOf(". ");
            const head = cut > 0 && cut < 28 ? p.slice(0, cut) : "";
            return (
              <p key={i} className={i === 0 ? "privacy-lead" : undefined}>
                {head && <span className="privacy-head">{head}</span>}
                {head ? p.slice(cut + 2) : p}
              </p>
            );
          })}
          <form method="dialog">
            <button className="btn">{t.privacy.close}</button>
          </form>
        </div>
      </dialog>
    </>
  );
}

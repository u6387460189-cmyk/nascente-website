import { useCallback, useEffect, useRef, useState } from "react";
import { CONTACT, COPY, PEOPLE, SESSIONS, sessionRange, type Lang, type SessionId } from "./content";
import { Header } from "./components/Header";
import { InquiryForm } from "./components/InquiryForm";
import { Mark } from "./components/Mark";
import { Picture } from "./components/Picture";
import { useReveal } from "./useReveal";

/** English lives at "/", Portuguese at "/pt". */
function langFromPath(): Lang {
  return /^\/pt(\/|$)/.test(window.location.pathname) ? "pt" : "en";
}

export function App() {
  const [lang, setLang] = useState<Lang>(langFromPath);
  const [selected, setSelected] = useState<SessionId[]>([]);
  const privacy = useRef<HTMLDialogElement>(null);
  const t = COPY[lang];

  useReveal([lang]);

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

  const openPrivacy = () => privacy.current?.showModal();

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header t={t} lang={lang} onLang={changeLang} />

      <main id="main">
        {/* ——— Hero ——— */}
        <section id="top" className="hero">
          <Picture scene="coast" alt="Golden cliffs above the beach at Comporta" className="hero-img" eager />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <Mark className="hero-mark" title="Nascente Project" />
            <p className="eyebrow eyebrow-light">{t.hero.place}</p>
            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <p className="hero-dates">{t.hero.dates}</p>
            <a href="#inquire" className="btn btn-light">
              {t.hero.cta}
            </a>
          </div>
          <a href="#nascente" className="hero-scroll" aria-label={t.hero.scroll}>
            <span>{t.hero.scroll}</span>
            <i aria-hidden="true" />
          </a>
        </section>

        {/* ——— Nascente ——— */}
        <section id="nascente" className="section">
          <div className="wrap split">
            <div className="split-text">
              <p className="eyebrow reveal">{t.nascente.label}</p>
              <div className="entry reveal">
                <span className="entry-word">{t.nascente.entry}</span>
                <span className="entry-note">{t.nascente.entryNote}</span>
              </div>
              <h2 className="title reveal">{t.nascente.title}</h2>
              {t.nascente.body.map((p, i) => (
                <p key={i} className={`body reveal ${i === 0 ? "body-lead" : ""}`}>
                  {p}
                </p>
              ))}
            </div>
            <div className="split-media reveal">
              <Picture scene="touch" alt="A child's hand resting on the bark of a pine tree" className="frame frame-tall" />
            </div>
          </div>
        </section>

        {/* ——— Philosophy ——— */}
        <section id="philosophy" className="band">
          <Picture scene="mist" alt="Umbrella pines in the morning haze" className="band-img" />
          <div className="band-shade" aria-hidden="true" />
          <div className="band-content wrap-narrow">
            <p className="eyebrow eyebrow-light reveal">{t.philosophy.label}</p>
            <h2 className="title title-light reveal">{t.philosophy.title}</h2>
            <p className="body body-light reveal">{t.philosophy.body}</p>
          </div>
        </section>

        {/* ——— A sample day ——— */}
        <section id="day" className="section">
          <div className="wrap day">
            <div className="day-media">
              <Picture scene="boardwalk" alt="A wooden boardwalk through the dunes" className="frame day-frame" />
            </div>
            <div className="day-text">
              <p className="eyebrow reveal">{t.day.label}</p>
              <h2 className="title reveal">{t.day.title}</h2>
              <p className="body reveal">{t.day.intro}</p>
              <ol className="timeline">
                {t.day.items.map((it) => (
                  <li key={it.name} className="reveal">
                    <span className="tl-time">{it.time}</span>
                    <div>
                      <p className="tl-part">{it.part}</p>
                      <h3 className="tl-name">{it.name}</h3>
                      <p className="tl-text">{it.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ——— Dates ——— */}
        <section id="dates" className="section section-sand">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow reveal">{t.dates.label}</p>
              <h2 className="title reveal">{t.dates.title}</h2>
            </div>
            <div className="date-groups">
            {t.dates.groups.map((g) => (
              <div key={g.name} className="date-group">
                <h3 className="date-group-name reveal">{g.name}</h3>
                <ul className="date-list">
                  {SESSIONS.filter((s) => (g.ids as readonly string[]).includes(s.id)).map((s) => (
                    <li key={s.id} className="reveal">
                      <button type="button" className="date-item" onClick={() => pickSession(s.id)}>
                        <span className="date-num">{s.id}</span>
                        <span className="date-label">
                          {t.dates.session} {s.id}
                        </span>
                        <span className="date-range">{sessionRange(lang, s.start, s.end)}</span>
                        <span className="date-pick">{t.dates.pick} →</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </div>
          </div>
        </section>

        {/* ——— Age groups ——— */}
        <section id="ages" className="section">
          <div className="wrap">
            <div className="section-head section-head-center">
              <p className="eyebrow reveal">{t.ages.label}</p>
              <h2 className="title reveal">{t.ages.title}</h2>
              <p className="body reveal">{t.ages.intro}</p>
            </div>
            <ol className="streams">
              {t.ages.items.map((a, i) => (
                <li key={a.name} className="stream reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                  <svg className="stream-line" viewBox="0 0 120 24" aria-hidden="true">
                    <path d={["M2 12 C 30 4, 50 20, 118 12", "M2 12 C 22 2, 44 22, 66 12 S 104 4, 118 12", "M2 12 C 16 0, 30 24, 46 12 S 74 0, 88 12 S 110 22, 118 12"][i]} />
                  </svg>
                  <p className="stream-ages">
                    {a.ages} <span>{t.ages.ageWord}</span>
                  </p>
                  <h3 className="stream-name">{a.name}</h3>
                  <p className="stream-text">{a.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="wide-photo reveal">
            <Picture scene="dunes" alt="Ochre sandstone formations by the sea" className="frame frame-wide" />
          </div>
        </section>

        {/* ——— The people ——— */}
        <section id="people" className="section section-sand">
          <div className="wrap split split-top">
            <div className="split-text">
              <p className="eyebrow reveal">{t.people.label}</p>
              <h2 className="title reveal">{t.people.title}</h2>
            </div>
            <p className="body body-lead reveal">{t.people.body}</p>
          </div>
          <ul className="wrap people">
            {PEOPLE.map((p, i) => (
              <li key={p.name} className="person reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="person-photo">
                  {p.photo ? <img src={p.photo} alt={p.name} loading="lazy" /> : <Mark className="person-mark" />}
                </div>
                <p className="person-name">{p.name}</p>
                {p.line && <p className="person-line">{p.line[lang]}</p>}
              </li>
            ))}
          </ul>
        </section>

        {/* ——— Inquire ——— */}
        <section id="inquire" className="section section-olive">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow eyebrow-light reveal">{t.inquire.label}</p>
              <h2 className="title title-light reveal">{t.inquire.title}</h2>
            </div>
            <ol className="steps">
              {t.inquire.steps.map((s, i) => (
                <li key={s.title} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-text">{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="steps-note reveal">{t.inquire.note}</p>
            <div id="inquire-form" className="form-wrap reveal">
              <InquiryForm t={t} lang={lang} selected={selected} setSelected={setSelected} onPrivacy={openPrivacy} />
            </div>
          </div>
        </section>

        {/* ——— Contact ——— */}
        <section id="contact" className="band band-contact">
          <Picture scene="dusk" alt="Thatched huts above the beach at dusk" className="band-img" />
          <div className="band-shade" aria-hidden="true" />
          <div className="band-content wrap-narrow">
            <p className="eyebrow eyebrow-light reveal">{t.contact.label}</p>
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
            <button type="button" className="link-btn" onClick={openPrivacy}>
              {t.footer.privacy}
            </button>
            <span>
              © {new Date().getFullYear()} {t.footer.rights}
            </span>
          </div>
        </div>
      </footer>

      <dialog ref={privacy} className="privacy" aria-labelledby="privacy-title" onClick={(e) => e.target === e.currentTarget && privacy.current?.close()}>
        <div className="privacy-inner">
          <h2 id="privacy-title" className="title">
            {t.privacy.title}
          </h2>
          {t.privacy.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <form method="dialog">
            <button className="btn">{t.privacy.close}</button>
          </form>
        </div>
      </dialog>
    </>
  );
}

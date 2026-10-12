import { useState } from "react";
import { CONTACT, SESSIONS, sessionRange, type Copy, type Lang, type SessionId } from "../content";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The inquiry form. Posts JSON to /api/inquire, which stores it in Supabase and
 * emails the team. Selected sessions are lifted to App so the Dates section can
 * pre-select a week.
 */
export function InquiryForm({
  t,
  lang,
  selected,
  setSelected,
  onPrivacy,
}: {
  t: Copy;
  lang: Lang;
  selected: SessionId[];
  setSelected: (s: SessionId[]) => void;
  onPrivacy: () => void;
}) {
  const f = t.form;
  const [status, setStatus] = useState<Status>("idle");
  const [sessionError, setSessionError] = useState(false);
  // Birth years follow the season on offer (ages 3 to 8, with a year of leeway either side),
  // not today's date, so the list stays right whenever someone books.
  const campYear = Number(SESSIONS[0].start.slice(0, 4));
  const birthYears = Array.from({ length: 8 }, (_, i) => campYear - 2 - i);

  function toggle(id: SessionId) {
    setSessionError(false);
    setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selected.length === 0) {
      setSessionError(true);
      document.getElementById("sessions-legend")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: data.get("parentName"),
          email: data.get("email"),
          childName: data.get("childName"),
          birthYear: Number(data.get("birthYear")),
          sessions: [...SESSIONS.map((s) => s.id), "PRIVATE" as const].filter((id) => selected.includes(id)),
          introducedBy: data.get("introducedBy"),
          note: data.get("note"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
          lang,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setSelected([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <p className="form-done-title">{f.successTitle}</p>
        <p>{f.successText}</p>
        <button type="button" className="link-btn" onClick={() => setStatus("idle")}>
          {f.another}
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="parentName">{f.parent}</label>
        <input id="parentName" name="parentName" autoComplete="name" required maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="email">{f.email}</label>
        <input id="email" name="email" type="email" autoComplete="email" required maxLength={200} />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="childName">{f.child}</label>
          <input id="childName" name="childName" required maxLength={120} autoComplete="off" />
        </div>
        <div className="field field-year">
          <label htmlFor="birthYear">{f.birthYear}</label>
          <select id="birthYear" name="birthYear" required defaultValue="">
            <option value="" disabled>
              {lang === "pt" ? "Escolher" : "Select"}
            </option>
            {birthYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className={`field sessions ${sessionError ? "has-error" : ""}`}>
        <legend id="sessions-legend">{f.sessions}</legend>
        <p className="hint" id="sessions-hint">
          {sessionError ? f.errorSessions : f.sessionsHint}
        </p>
        <div className="session-grid" aria-describedby="sessions-hint">
          {SESSIONS.map((s) => (
            <label key={s.id} className={`session-chip ${selected.includes(s.id) ? "is-on" : ""}`}>
              <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggle(s.id)} />
              <span className="chip-num">{s.id}</span>
              <span className="chip-date">{sessionRange(lang, s.start, s.end, true)}</span>
            </label>
          ))}
          <label className={`session-chip chip-private ${selected.includes("PRIVATE") ? "is-on" : ""}`}>
            <input type="checkbox" checked={selected.includes("PRIVATE")} onChange={() => toggle("PRIVATE")} />
            <span className="chip-num">{f.private}</span>
            <span className="chip-date">{f.privateNote}</span>
          </label>
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="introducedBy">
          {f.introducedBy} <span className="optional">({f.optional})</span>
        </label>
        <input id="introducedBy" name="introducedBy" maxLength={200} />
      </div>
      <div className="field">
        <label htmlFor="note">{f.note}</label>
        <textarea id="note" name="note" rows={4} maxLength={3000} placeholder={f.notePlaceholder} />
      </div>

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          {f.consentBefore}
          <button type="button" className="link-btn" onClick={onPrivacy}>
            {f.consentLink}
          </button>
          {f.consentAfter}
        </span>
      </label>

      <button type="submit" className="btn btn-light" disabled={status === "sending"}>
        {status === "sending" ? f.sending : f.submit}
      </button>

      {status === "error" && (
        <p className="form-error" role="alert">
          {f.error} <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
      )}
    </form>
  );
}

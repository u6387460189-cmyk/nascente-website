/**
 * Inquiry handling, kept free of framework code so it can be unit-tested.
 * `api/inquire.ts` is the thin Vercel wrapper around `handleInquiry`.
 *
 * Every valid inquiry is (1) stored in Supabase and (2) emailed to the team via
 * Resend, with a short confirmation to the parent. Either channel may be left
 * unconfigured; the request succeeds as long as at least one of them worked.
 */

export const SESSION_LABELS: Record<string, string> = {
  I: "Session I · July 5 – 9",
  II: "Session II · July 12 – 16",
  III: "Session III · July 19 – 23",
  IV: "Session IV · July 26 – 30",
  V: "Session V · August 2 – 6",
  VI: "Session VI · August 9 – 13",
  VII: "Session VII · August 16 – 20",
  VIII: "Session VIII · August 23 – 27",
  IX: "Session IX · August 30 – September 3",
};

export interface Inquiry {
  parentName: string;
  email: string;
  childName: string;
  birthYear: number;
  sessions: string[];
  introducedBy: string;
  note: string;
  lang: "en" | "pt";
}

export interface Env {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  RESEND_API_KEY?: string;
  INQUIRY_TO?: string;
  INQUIRY_FROM?: string;
}

export interface Result {
  status: number;
  body: { ok: boolean; error?: string };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Returns the cleaned inquiry, or a list of field names that are invalid. */
export function validate(raw: unknown, now = new Date()): { inquiry?: Inquiry; errors: string[] } {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const errors: string[] = [];

  const parentName = str(r.parentName, 120);
  const email = str(r.email, 200);
  const childName = str(r.childName, 120);
  const birthYear = Number(r.birthYear);
  const sessions = Array.isArray(r.sessions)
    ? [...new Set(r.sessions.filter((s): s is string => typeof s === "string" && s in SESSION_LABELS))]
    : [];
  const year = now.getUTCFullYear();

  if (!parentName) errors.push("parentName");
  if (!EMAIL_RE.test(email)) errors.push("email");
  if (!childName) errors.push("childName");
  if (!Number.isInteger(birthYear) || birthYear < year - 15 || birthYear > year) errors.push("birthYear");
  if (sessions.length === 0) errors.push("sessions");
  if (r.consent !== true) errors.push("consent");

  if (errors.length) return { errors };
  return {
    errors,
    inquiry: {
      parentName,
      email,
      childName,
      birthYear,
      sessions,
      introducedBy: str(r.introducedBy, 200),
      note: str(r.note, 3000),
      lang: r.lang === "pt" ? "pt" : "en",
    },
  };
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function store(inq: Inquiry, env: Env, fetchImpl: typeof fetch): Promise<boolean> {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return false;
  const res = await fetchImpl(`${env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      parent_name: inq.parentName,
      email: inq.email,
      child_name: inq.childName,
      birth_year: inq.birthYear,
      sessions: inq.sessions,
      introduced_by: inq.introducedBy || null,
      note: inq.note || null,
      lang: inq.lang,
    }),
  });
  if (!res.ok) console.error("supabase insert failed", res.status, await res.text());
  return res.ok;
}

function teamEmail(inq: Inquiry): { subject: string; html: string; text: string } {
  const rows: [string, string][] = [
    ["Parent / guardian", inq.parentName],
    ["Email", inq.email],
    ["Child", `${inq.childName} (born ${inq.birthYear})`],
    ["Sessions", inq.sessions.map((s) => SESSION_LABELS[s]).join("\n")],
    ["Introduced by", inq.introducedBy || "—"],
    ["Note", inq.note || "—"],
    ["Language", inq.lang === "pt" ? "Portuguese" : "English"],
  ];
  const html =
    `<div style="font-family:Georgia,serif;color:#1f1d18;max-width:560px">` +
    `<h2 style="font-weight:normal">New inquiry — ${esc(inq.childName)}</h2>` +
    `<table cellpadding="8" style="border-collapse:collapse;font-size:15px">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="color:#69644f;vertical-align:top;white-space:nowrap">${esc(k)}</td>` +
          `<td style="white-space:pre-line">${esc(v)}</td></tr>`,
      )
      .join("") +
    `</table><p style="color:#69644f;font-size:13px">Reply to this email to answer ${esc(inq.parentName)} directly.</p></div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  return { subject: `New inquiry — ${inq.childName}, ${inq.sessions.join(", ")}`, html, text };
}

function parentEmail(inq: Inquiry): { subject: string; html: string; text: string } {
  const pt = inq.lang === "pt";
  const lines = pt
    ? [
        `Olá ${inq.parentName},`,
        `Obrigado pelo seu interesse na Nascente. Recebemos o seu pedido para ${inq.childName} e entraremos em contacto pessoalmente muito em breve para combinarmos uma conversa.`,
        "Até breve,",
        "Nascente Project · Comporta",
      ]
    : [
        `Dear ${inq.parentName},`,
        `Thank you for your interest in Nascente. We have received your inquiry for ${inq.childName} and will be in touch personally, very soon, to arrange a conversation.`,
        "Warmly,",
        "Nascente Project · Comporta",
      ];
  return {
    subject: pt ? "Recebemos o seu pedido · Nascente" : "We received your inquiry · Nascente",
    html: `<div style="font-family:Georgia,serif;color:#1f1d18;max-width:520px;font-size:16px;line-height:1.6">${lines
      .map((l) => `<p>${esc(l)}</p>`)
      .join("")}</div>`,
    text: lines.join("\n\n"),
  };
}

async function sendEmails(inq: Inquiry, env: Env, fetchImpl: typeof fetch): Promise<boolean> {
  if (!env.RESEND_API_KEY) return false;
  const from = env.INQUIRY_FROM || "Nascente Project <inquiries@nascenteproject.com>";
  const to = env.INQUIRY_TO || "info@nascenteproject.com";
  const send = (payload: Record<string, unknown>) =>
    fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, ...payload }),
    });

  const team = await send({ to: [to], reply_to: inq.email, ...teamEmail(inq) });
  if (!team.ok) {
    console.error("resend team email failed", team.status, await team.text());
    return false;
  }
  // The confirmation is a courtesy; its failure doesn't fail the inquiry.
  const parent = await send({ to: [inq.email], reply_to: to, ...parentEmail(inq) });
  if (!parent.ok) console.error("resend confirmation failed", parent.status, await parent.text());
  return true;
}

export async function handleInquiry(raw: unknown, env: Env, fetchImpl: typeof fetch = fetch): Promise<Result> {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  // Spam trap: real visitors never see or fill the "website" field.
  if (typeof r.website === "string" && r.website.trim() !== "") return { status: 200, body: { ok: true } };

  const { inquiry, errors } = validate(raw);
  if (!inquiry) return { status: 400, body: { ok: false, error: `invalid: ${errors.join(",")}` } };

  const [stored, emailed] = await Promise.all([
    store(inquiry, env, fetchImpl).catch((e) => (console.error("store threw", e), false)),
    sendEmails(inquiry, env, fetchImpl).catch((e) => (console.error("email threw", e), false)),
  ]);

  if (!stored && !emailed) return { status: 502, body: { ok: false, error: "delivery failed" } };
  return { status: 200, body: { ok: true } };
}

import { test } from "node:test";
import assert from "node:assert/strict";
import { handleInquiry, validate } from "../api/_lib/inquiry.ts";

const good = {
  parentName: "Ana Silva",
  email: "ana@example.com",
  childName: "Rita",
  birthYear: 2021,
  sessions: ["I", "IX", "I", "bogus"],
  introducedBy: "",
  note: "Hello <b>there</b>",
  consent: true,
  lang: "pt",
};

const NOW = new Date("2026-10-12T00:00:00Z");

function fakeFetch(statusFor: (url: string) => number) {
  const calls: { url: string; body: any }[] = [];
  const f = (async (url: string, init: RequestInit) => {
    calls.push({ url, body: JSON.parse(String(init.body)) });
    const status = statusFor(url);
    return new Response(status < 300 ? "{}" : "err", { status });
  }) as unknown as typeof fetch;
  return { f, calls };
}

const fullEnv = {
  SUPABASE_URL: "https://x.supabase.co/",
  SUPABASE_SERVICE_ROLE_KEY: "srk",
  RESEND_API_KEY: "rk",
};

test("validate cleans sessions and keeps language", () => {
  const { inquiry, errors } = validate(good, NOW);
  assert.deepEqual(errors, []);
  assert.deepEqual(inquiry!.sessions, ["I", "IX"]);
  assert.equal(inquiry!.lang, "pt");
});

test("validate rejects missing consent, bad email, bad year and no sessions", () => {
  const { errors } = validate({ ...good, consent: false, email: "nope", birthYear: 1990, sessions: [] }, NOW);
  assert.deepEqual(errors.sort(), ["birthYear", "consent", "email", "sessions"]);
});

test("stores in Supabase and emails team + parent", async () => {
  const { f, calls } = fakeFetch(() => 201);
  const res = await handleInquiry(good, fullEnv, f);
  assert.equal(res.status, 200);
  const db = calls.find((c) => c.url === "https://x.supabase.co/rest/v1/inquiries");
  assert.equal(db?.body.child_name, "Rita");
  const mails = calls.filter((c) => c.url.includes("resend"));
  assert.equal(mails.length, 2);
  assert.deepEqual(mails[0].body.to, ["info@nascenteproject.com"]);
  assert.equal(mails[0].body.reply_to, "ana@example.com");
  assert.ok(!mails[0].body.html.includes("<b>there"), "note must be escaped");
  assert.match(mails[1].body.subject, /Recebemos/);
});

test("succeeds when only email works", async () => {
  const { f } = fakeFetch((u) => (u.includes("supabase") ? 500 : 200));
  assert.equal((await handleInquiry(good, fullEnv, f)).status, 200);
});

test("fails with 502 when nothing is configured", async () => {
  const { f, calls } = fakeFetch(() => 200);
  assert.equal((await handleInquiry(good, {}, f)).status, 502);
  assert.equal(calls.length, 0);
});

test("honeypot submissions are silently accepted and dropped", async () => {
  const { f, calls } = fakeFetch(() => 200);
  const res = await handleInquiry({ ...good, website: "spam.biz" }, fullEnv, f);
  assert.equal(res.status, 200);
  assert.equal(calls.length, 0);
});

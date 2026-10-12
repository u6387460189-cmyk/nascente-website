# Nascente Project — website

One-page bilingual site (English at `/`, Portuguese at `/pt`) for **Nascente Project**,
a private summer day-camp in Comporta, Portugal. Domain: `nascenteproject.com`.

- **Frontend:** Vite + React + TypeScript, hand-written CSS (`src/styles.css`). Fonts are self-hosted (no Google Fonts, no cookies, no analytics).
- **Inquiry form:** `POST /api/inquire` (Vercel function) → stores the inquiry in Supabase **and** emails it to `info@nascenteproject.com` via Resend, with a confirmation to the parent. Works if either one is configured.
- **Hosting:** Vercel, auto-deploys from `main`.

## Editing content

| What | Where |
|---|---|
| All text (EN + PT), dates, people | `src/content.ts` |
| Photos | `materials/photos/` → mapped in `scripts/build-images.py` → run `npm run images` |
| Colours, fonts, spacing | top of `src/styles.css` |
| People portraits | put a file in `public/people/`, then set `photo: "/people/klara.jpg"` and `line` in `PEOPLE` in `src/content.ts` |

## Local development

```sh
npm install
npm run dev        # http://localhost:5173
npm test           # form-handler tests
npm run build      # type-check + production build
```

## Setup (one-time)

1. **Supabase** — SQL Editor → paste and run `supabase/migrations/20261012000000_inquiries.sql`.
   Inquiries then appear in Table Editor → `inquiries`.
2. **Resend** — add domain `nascenteproject.com`, add the DNS records it shows in Namecheap, create an API key.
3. **Vercel** — import this repo (framework: Vite), add the env vars from `.env.example`, deploy.
4. **Domain** — Vercel → Settings → Domains → add `nascenteproject.com` and `www.nascenteproject.com`, then add the records Vercel shows in Namecheap → Advanced DNS.

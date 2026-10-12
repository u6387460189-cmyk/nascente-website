# CLAUDE.md — Nascente website

Marketing site for Nascente Project (summer day-camp, Comporta). Owner's brief: `materials/NascenteWeb-brief.docx`. Visual reference requested by the client: jncquoi.com (quiet luxury, big imagery, serif type).

- All copy lives in `src/content.ts`, EN + European Portuguese (pt-PT). Change both languages together.
- Brand: olive `#69644f` (sampled from logo), ivory `#f6f2ea`, sand `#ece4d6`. Display font Bodoni Moda (matches the wordmark), body Cormorant Garamond, labels Jost.
- Photos: originals in `materials/photos/`, optimized by `npm run images` into `public/images/<scene>-{l,p}-<w>.webp` (l = landscape/desktop, p = portrait/mobile).
- Form backend: `api/_lib/inquiry.ts` (tested in `tests/`), table in `supabase/migrations/`. RLS on, no policies — only the service-role key in the Vercel function writes.
- Keep it cookie-free and analytics-free unless the client asks (no consent banner needed today).
- Run `npm test && npm run build` before pushing.
- Client direction (premium, "for rich people who are not dumb"): no em/en dashes in copy (use "to", colons, commas), no decorative dash lines, no numbered lists or arrows, no gimmicks. Quiet effects only (image unveil, slow parallax).
- Mobile is designed separately, not just stacked: long lists become swipe rails (`src/components/Rail.tsx`), dates become a 3×3 grid, long stories fold behind "Read our story".
- Page order follows the brief (v2, `materials/NascenteWeb-brief-v2.docx`): Hero → Nascente → Philosophy → Three streams → A day → Private immersions → Meet us → Inquire (form) → Contact. Weekly dates live only in the form. Contact email is inquiries@nascenteproject.com. Hero CTA opens an email, per the brief.

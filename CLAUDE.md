# CLAUDE.md — Nascente website

Marketing site for Nascente Project (summer day-camp, Comporta). Owner's brief: `materials/NascenteWeb-brief.docx`. Visual reference requested by the client: jncquoi.com (quiet luxury, big imagery, serif type).

- All copy lives in `src/content.ts`, EN + European Portuguese (pt-PT). Change both languages together.
- Brand: olive `#69644f` (sampled from logo), ivory `#f6f2ea`, sand `#ece4d6`. Display font Bodoni Moda (matches the wordmark), body Cormorant Garamond, labels Jost.
- Photos: originals in `materials/photos/`, optimized by `npm run images` into `public/images/<scene>-{l,p}-<w>.webp` (l = landscape/desktop, p = portrait/mobile).
- Form backend: `api/_lib/inquiry.ts` (tested in `tests/`), table in `supabase/migrations/`. RLS on, no policies — only the service-role key in the Vercel function writes.
- Keep it cookie-free and analytics-free unless the client asks (no consent banner needed today).
- Run `npm test && npm run build` before pushing.

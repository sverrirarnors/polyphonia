# Polyphonia Website

Website for Polyphonia, a student orchestra based in Zurich. Built with Next.js 15, TypeScript, Tailwind CSS 4, and next-intl for i18n.

## Quick Reference

| What | Where |
|---|---|
| Schedule data | `content/schedule/rehearsals.json` |
| Concert content | `content/concerts/<slug>/de.mdx` & `en.mdx` |
| UI translations | `messages/de.json` & `messages/en.json` |
| Types | `types/index.ts` |
| Route definitions | `routing.ts` |
| Notice banner config | `lib/notice.ts` |

## Project Structure

```
app/
  [locale]/           # Locale-based routing (de default, en prefixed)
    about/            # About page (MDX per locale)
    concerts/         # Concert listing + [slug] detail pages
    contact/          # Contact page (MDX per locale)
    join/             # Recruitment page (MDX per locale)
    schedule/         # Rehearsal schedule
  api/calendar/       # ICS calendar export endpoint
components/
  schedule/           # RehearsalItems, FilterMenu, DownloadICSButton
  Navigation, Footer, Gallery, etc.
content/
  concerts/<slug>/    # de.mdx + en.mdx per concert, frontmatter has metadata
  schedule/           # rehearsals.json (the schedule data)
lib/
  schedule.ts         # Reads/sorts/filters/groups rehearsals
  concerts.ts         # Reads concert MDX frontmatter, gallery manifest
  notice.ts           # Notice banner toggle
messages/             # i18n translation strings (de.json, en.json)
```

## i18n

- **Default locale:** German (`de`) — no URL prefix
- **English:** prefixed with `/en`
- Localized pathnames defined in `routing.ts` (e.g. `/konzerte` vs `/concerts`)
- Always import `Link`, `usePathname`, `useRouter` from `@/routing`, not from Next.js
- Page content: MDX files per locale or translation keys from `messages/`

## Schedule / Rehearsals

Data lives in `content/schedule/rehearsals.json` — a flat JSON array of `Rehearsal` objects:

```json
{
  "date": "2026-02-22",       // ISO date (required)
  "date_end": "2026-02-24",   // ISO date, only for multi-day events
  "time": "10:00-16:00",      // HH:MM-HH:MM (required)
  "location": "TBA",
  "notes_de": "German label",
  "notes_en": "English label",
  "section": "strings"         // "tutti" | "strings" | "winds" | "woodwinds" | "brass"
}
```

- Entries should be in chronological order in the file
- `highlight: true` for special events (concerts, weekends)
- Multi-day events need `date_end` and can use `time_de`/`time_en` for display
- The location "Aki Hirschengraben 86, 8001 Zürich" is the default venue and is hidden in the UI

## Concerts

Each concert is a directory under `content/concerts/` with a slug like `fs26` or `hs25` (semester codes). Contains `de.mdx` and `en.mdx` with frontmatter (title, composers, performances, poster) and body content. Gallery images go in `public/gallery/<slug>/`.

## Commands

- `pnpm dev` — local dev server
- `pnpm build` — production build (runs `scripts/generate-gallery-manifest.js` first)
- `pnpm lint` — ESLint

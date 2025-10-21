# Polyphonia Zürich Website

Website for Universitätsorchester Polyphonia Zürich - a symphonic university orchestra composed of students and staff from ETH Zürich and the University of Zürich.

## Features

- 🌍 Full internationalization (German/English) using next-intl
- 📝 MDX-based content management with co-located files
- 🎨 Tailwind CSS styling with dark mode
- ⚡ Next.js 15 with App Router
- 📱 Fully responsive design
- 🎵 Concert program management
- 👥 Recruitment and audition information

## Architecture

This project follows the **next-intl recommended pattern** for MDX internationalization, where locale-specific MDX files are co-located with their page components:

```
app/[locale]/concerts/hs25/
├── page.tsx      # Dynamic loader
├── en.mdx        # English content
└── de.mdx        # German content
```

This approach keeps content and routing logic together, making it easy to maintain and scale.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Visit [http://localhost:3000/de](http://localhost:3000/de) or [http://localhost:3000/en](http://localhost:3000/en)

## Project Structure

- `/app/[locale]` - Localized pages and routes
- `/components` - React components
- `/messages` - i18n translation files for UI strings
- MDX files are co-located with their `page.tsx` files

## Adding Content

### New Concert

1. Create a new folder: `app/[locale]/concerts/your-concert-slug/`
2. Create `page.tsx` using the pattern from `hs25/page.tsx`
3. Create `en.mdx` and `de.mdx` in that folder
4. Add the concert metadata to `concerts/page.tsx`
5. Add the slug to `generateStaticParams` in `[slug]/page.tsx`

### New Page

1. Create folder: `app/[locale]/your-page/`
2. Create `page.tsx` that dynamically imports `${locale}.mdx`
3. Create `en.mdx` and `de.mdx` in that folder
4. Add navigation link in `components/Navigation.tsx`
5. Add translations in `messages/en.json` and `messages/de.json`

## About Polyphonia

Polyphonia is a symphonic university orchestra from ETH Zürich and University of Zürich. We rehearse every Wednesday from 18:00-21:00 and perform classical orchestral works at the end of each semester.

For more information, visit [polyphonia.ch](https://polyphonia.ch)

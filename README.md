# Polyphonia Zürich Website

Website for Universitätsorchester Polyphonia Zürich - a symphonic university orchestra composed of students and staff from ETH Zürich and the University of Zürich.

## Features

- 🌍 Full internationalization (German/English) using next-intl
- 📝 MDX-based content management
- 🎨 Tailwind CSS styling
- ⚡ Next.js 15 with App Router
- 📱 Fully responsive design
- 🎵 Concert program management with multiple performances
- 👥 Recruitment notices system
- 📅 Rehearsal schedule

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) (German, default) or [http://localhost:3000/en](http://localhost:3000/en) (English)

Build for production:

```bash
pnpm build
```

## Project Structure

```
polyphonia/
├── app/
│   ├── [locale]/              # Locale-specific routes
│   │   ├── about/            # About page with de.mdx & en.mdx
│   │   ├── concerts/         # Concerts section
│   │   │   ├── [slug]/       # Dynamic concert routes
│   │   │   └── page.tsx      # Concerts list page
│   │   ├── contact/          # Contact page
│   │   ├── join/             # Join/recruitment page
│   │   ├── schedule/         # Rehearsal schedule page
│   │   ├── layout.tsx        # Locale layout
│   │   └── page.tsx          # Home page
│   └── layout.tsx            # Root layout
├── components/               # Reusable React components
│   ├── Navigation.tsx        # Main navigation with mobile menu
│   ├── Footer.tsx            # Footer with sponsor logos
│   └── NoticeBanner.tsx      # Configurable notice banner
├── content/
│   └── concerts/             # Concert MDX files (see below)
│       ├── hs25/
│       │   ├── de.mdx
│       │   └── en.mdx
│       └── ...
├── lib/
│   ├── concerts.ts           # Concert metadata utilities
│   ├── mdx-page.tsx          # MDX page loader for static pages
│   └── notice.ts             # Notice banner configuration
├── messages/
│   ├── de.json               # German UI translations
│   └── en.json               # English UI translations
└── public/                   # Static assets
```

## Architecture Decisions

### Why Concerts are in `content/` instead of `app/`

Concert MDX files live in `content/concerts/` rather than alongside their route in `app/[locale]/concerts/` for a critical production reason:

**The Problem**: 
- The concert system uses `fs.readdirSync()` to dynamically scan and list all concerts
- During production builds (e.g., on Vercel), the `app/` directory gets transformed and optimized
- The literal folder structure `app/[locale]/concerts/[slug]` doesn't exist in production - the brackets `[locale]` and `[slug]` are route parameters, not actual folders
- File system operations fail when trying to read from transformed/bundled app directories

**The Solution**:
- Static content files go in `content/` directory
- Build systems preserve `content/` in the production bundle
- File system operations (`fs.readdirSync`, `fs.readFileSync`) work reliably
- Dynamic imports still work: `import('@/content/concerts/${slug}/${locale}.mdx')`

**Other pages** (About, Join, Contact, Schedule) don't need directory scanning - they use a helper that directly imports known MDX files, so they can live in `app/[locale]/page-name/`.

### Internationalization Strategy

We use two different approaches for different types of content:

1. **UI Strings** (`messages/de.json`, `messages/en.json`):
   - Navigation labels, buttons, form labels
   - System messages and notifications
   - Accessed via `useTranslations()` hook

2. **Page Content** (MDX files):
   - Full page content with formatting
   - Concert programs and descriptions
   - Each page has `de.mdx` and `en.mdx` versions

## Contributing

### Adding a New Static Page

1. **Create the page structure:**
   ```bash
   mkdir app/[locale]/your-page-name
   ```

2. **Create `page.tsx`:**
   ```tsx
   import { MDXPage } from '@/lib/mdx-page';

   export default async function YourPage({ 
     params 
   }: { 
     params: Promise<{ locale: string }> 
   }) {
     const { locale } = await params;
     return <MDXPage locale={locale} segment="your-page-name" />;
   }
   ```

3. **Create content files:**
   - Create `de.mdx` with German content
   - Create `en.mdx` with English content

4. **Add navigation:**
   - Update `components/Navigation.tsx` to add the link
   - Add translations in `messages/de.json` and `messages/en.json`

5. **Add metadata (optional):**
   - Update the page's metadata in `page.tsx` if needed

### Adding a New Concert

Concerts require special handling because they're dynamically generated from a list.

1. **Create concert folder and content:**
   ```bash
   mkdir content/concerts/your-slug
   ```
   
2. **Create MDX files with frontmatter:**
   
   `content/concerts/your-slug/de.mdx`:
   ```mdx
   ---
   title: "Konzertname"
   composers: "Komponist 1, Komponist 2"
   performances:
     - date: "2025-06-15"
       time: "19:30"
       location: "Konzertsaal"
       ticketUrl: "https://tickets.example.com"
     - date: "2025-06-16"
       time: "19:30"
       location: "Konzertsaal"
   ---

   # Programm

   Your concert content in German...
   ```

   `content/concerts/your-slug/en.mdx`:
   ```mdx
   ---
   title: "Concert Name"
   composers: "Composer 1, Composer 2"
   performances:
     - date: "2025-06-15"
       time: "19:30"
       location: "Concert Hall"
       ticketUrl: "https://tickets.example.com"
     - date: "2025-06-16"
       time: "19:30"
       location: "Concert Hall"
   ---

   # Program

   Your concert content in English...
   ```

3. **That's it!** The concert system automatically:
   - Discovers the new concert by scanning `content/concerts/`
   - Extracts metadata from frontmatter
   - Generates routes for `/concerts/your-slug`
   - Lists it on the concerts page
   - Shows it on the home page if it's upcoming

**Concert Frontmatter Fields:**
- `title` (required): Concert title
- `composers` (required): Composer names
- `performances` (required): Array of performance objects
  - `date` (required): ISO date string (YYYY-MM-DD)
  - `time` (optional): Performance time
  - `location` (optional): Venue name
  - `ticketUrl` (optional): Link to ticket sales

### Configuring the Notice Banner

Edit `lib/notice.ts`:

```typescript
export const noticeConfig: Notice = {
  enabled: true,  // Set to false to hide
  type: 'info',   // 'info' | 'warning' | 'urgent'
  messageKey: 'recruitmentNotice'  // Key in messages/*/Notice
};
```

Add corresponding translations in `messages/de.json` and `messages/en.json`:

```json
{
  "Notice": {
    "recruitmentNotice": "🎻 Wir suchen derzeit Perkussion!",
    "learnMore": "Mehr erfahren"
  }
}
```

The banner appears on the home page when enabled.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: MDX with gray-matter for frontmatter
- **i18n**: next-intl
- **Fonts**: Inter (body), Playfair Display (headings)
- **Deployment**: Vercel (optimized for)

## Color Palette

- Background: `stone-200`
- Cards/Navigation: `stone-100`
- Borders: `stone-300`
- Footer: `stone-600`
- Accents: `red-600`
- Notice Banner: `amber-100`
- Text: `neutral-900`, `neutral-600`

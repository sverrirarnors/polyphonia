# Internationalized Routing Documentation

This document explains how internationalization (i18n) and routing works in the Polyphonia website.

## Overview

The site uses [next-intl](https://next-intl-docs.vercel.app/) for internationalization with localized pathnames. This means:

- URLs are different for each language
- German (default locale) doesn't have a language prefix
- English URLs have the `/en` prefix

## Supported Locales

- **German (de)** - Default locale, no URL prefix
- **English (en)** - URL prefix `/en`

## Route Configuration

Routes are configured in `routing.ts` using the `pathnames` option. This maps internal route names to localized URL paths.

### Route Mappings

| Internal Route     | German URL         | English URL           | Purpose              |
| ------------------ | ------------------ | --------------------- | -------------------- |
| `/`                | `/`                | `/en`                 | Homepage             |
| `/concerts`        | `/konzerte`        | `/en/concerts`        | Concerts list        |
| `/concerts/[slug]` | `/konzerte/[slug]` | `/en/concerts/[slug]` | Concert detail pages |
| `/schedule`        | `/spielplan`       | `/en/schedule`        | Rehearsal schedule   |
| `/about`           | `/ueber-uns`       | `/en/about`           | About the orchestra  |
| `/join`            | `/mitmachen`       | `/en/join`            | Join information     |
| `/contact`         | `/kontakt`         | `/en/contact`         | Contact page         |

## Usage in Code

### Standard Links

Use the `Link` component from `@/routing` (not `next/link`):

```tsx
import { Link } from '@/routing';

// Simple link - automatically localizes to current locale
<Link href="/concerts">Concerts</Link>;

// German user sees: /konzerte
// English user sees: /en/concerts
```

### Dynamic Routes

For routes with parameters (like concert detail pages), use object notation:

```tsx
import { Link } from '@/routing';

<Link
  href={{
    pathname: '/concerts/[slug]',
    params: { slug: 'hs25' },
  }}
>
  Concert Details
</Link>;

// German user sees: /konzerte/hs25
// English user sees: /en/concerts/hs25
```

### Programmatic Navigation

Use the `useRouter` hook from `@/routing`:

```tsx
import { useRouter } from '@/routing';

const router = useRouter();

// Navigate to a page
router.push('/concerts');

// Navigate with parameters
router.push({
  pathname: '/concerts/[slug]',
  params: { slug: 'hs25' },
});
```

### Getting Current Pathname

Use `usePathname` from `@/routing` (locale-aware):

```tsx
import { usePathname } from '@/routing';

const pathname = usePathname();
// Returns: '/concerts' (without locale prefix)
// NOT: '/en/concerts' or '/konzerte'
```

### Locale Switching

To switch languages while staying on the same page:

```tsx
import { useRouter, usePathname } from '@/routing';
import { useTransition } from 'react';

const router = useRouter();
const pathname = usePathname();
const [isPending, startTransition] = useTransition();

const handleLocaleChange = (newLocale: string) => {
  startTransition(() => {
    router.replace(pathname as any, { locale: newLocale });
  });
};

<button onClick={() => handleLocaleChange('en')}>EN</button>;
```

## File Structure

```
app/
  [locale]/                    # Locale parameter
    page.tsx                   # Homepage
    concerts/
      page.tsx                 # Concerts list (/konzerte or /en/concerts)
      [slug]/
        page.tsx               # Concert detail (/konzerte/hs25 or /en/concerts/hs25)
    schedule/
      page.tsx                 # Schedule (/spielplan or /en/schedule)
    about/
      page.tsx                 # About (/ueber-uns or /en/about)
    join/
      page.tsx                 # Join (/mitmachen or /en/join)
    contact/
      page.tsx                 # Contact (/kontakt or /en/contact)
```

**Important:** Keep folder names in English. The localized URLs are handled by the routing configuration.

## TypeScript Types

When using `pathnames`, TypeScript enforces type-safe routing. You must:

1. Use exact pathname strings or type them with `as const`:

```tsx
const links = [{ href: '/concerts' as const, label: 'Concerts' }];
```

2. Use object notation for dynamic routes:

```tsx
// ✅ Correct
href={{ pathname: '/concerts/[slug]', params: { slug: 'hs25' } }}

// ❌ Incorrect (TypeScript error)
href={`/concerts/${slug}`}
```

## Middleware

The middleware in `middleware.ts` handles:

- Locale detection from browser preferences
- Redirects to appropriate localized URLs
- Maintaining locale across navigation

## Translation Keys

Navigation labels are stored in `messages/[locale].json`:

```json
{
  "Navigation": {
    "home": "Home",
    "concerts": "Concerts",
    "schedule": "Schedule",
    "about": "About",
    "join": "Join",
    "contact": "Contact"
  }
}
```

## Adding New Routes

To add a new localized route:

1. **Update `routing.ts`:**

```typescript
export const routing = defineRouting({
  // ... existing config
  pathnames: {
    // ... existing routes
    '/new-page': {
      en: '/new-page',
      de: '/neue-seite',
    },
  },
});
```

2. **Create the page component:**

```
app/[locale]/new-page/page.tsx
```

3. **Add translations:**

```json
// messages/en.json
{
  "Navigation": {
    "newPage": "New Page"
  }
}

// messages/de.json
{
  "Navigation": {
    "newPage": "Neue Seite"
  }
}
```

4. **Add to navigation:**

```tsx
const links = [
  // ... existing links
  { href: '/new-page' as const, label: t('newPage') },
];
```

## Best Practices

1. **Always use routing exports:** Import `Link`, `usePathname`, `useRouter` from `@/routing`, not from Next.js directly.

2. **Use translations for labels:** Never hardcode text in components, always use translation keys.

3. **Type-safe routes:** Use `as const` for href values and object notation for dynamic routes.

4. **Test both locales:** Verify that routes work correctly in both German and English.

5. **Maintain consistency:** Keep German URLs using German words, English URLs using English words.

## Common Issues

### Issue: TypeScript error on dynamic routes

**Problem:** `Type string is not assignable to href`
**Solution:** Use object notation with pathname and params

### Issue: Locale switching doesn't work

**Problem:** Using Next.js's `usePathname` instead of next-intl's
**Solution:** Import from `@/routing`

### Issue: 404 on locale-switched page

**Problem:** Trying to manually construct URLs with locale prefixes
**Solution:** Let next-intl handle locale prefixes automatically

## Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Routing Configuration](https://next-intl-docs.vercel.app/docs/routing)
- [Pathnames](https://next-intl-docs.vercel.app/docs/routing/navigation#pathnames)

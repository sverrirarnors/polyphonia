import type { Metadata } from 'next';
import { getPathname } from '@/routing';
import type { ConcertMetadata } from '@/lib/concerts';
import { getTranslations } from 'next-intl/server';

export const SITE_NAME = 'Universitätsorchester Polyphonia Zürich';
export const SITE_URL = 'https://polyphonia.ch';

// Logo card used whenever a page has no image of its own (e.g. no poster).
export const DEFAULT_SHARE_IMAGE = {
  url: '/images/og-logo.png',
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

const OG_LOCALES: Record<string, string> = { de: 'de_CH', en: 'en_GB' };

type Href = Parameters<typeof getPathname>[0]['href'];

interface ShareMetadataOptions {
  locale: string;
  /** Page route; omit in layouts so subpages don't inherit a wrong canonical URL. */
  href?: Href;
  title?: string;
  description: string;
  image?: { url: string; alt?: string; width?: number; height?: number };
  type?: 'website' | 'article';
}

/**
 * Builds title/description plus the Open Graph and Twitter tags that
 * WhatsApp, Signal, Telegram, Instagram, Facebook, etc. read for link previews.
 *
 * Next.js replaces (does not merge) a parent's `openGraph` object, so every
 * page that sets its own metadata should go through this helper to keep the
 * full set of tags.
 */
export function buildShareMetadata({
  locale,
  href,
  title,
  description,
  image = DEFAULT_SHARE_IMAGE,
  type = 'website',
}: ShareMetadataOptions): Metadata {
  const path = (l: string) => (href ? getPathname({ href, locale: l }) : undefined);
  const ogTitle = title ?? SITE_NAME;

  return {
    ...(title ? { title } : {}),
    description,
    ...(href
      ? {
          alternates: {
            canonical: path(locale),
            languages: { de: path('de'), en: path('en'), 'x-default': path('de') },
          },
        }
      : {}),
    openGraph: {
      type,
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      ...(href ? { url: path(locale) } : {}),
      locale: OG_LOCALES[locale] ?? locale,
      alternateLocale: Object.entries(OG_LOCALES)
        .filter(([l]) => l !== locale)
        .map(([, og]) => og),
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [image.url],
    },
  };
}

/**
 * Compact performance dates, e.g. "17. & 18. Dezember 2026" / "17 & 18 December 2026".
 * Falls back to full dates when performances span several months.
 */
export function formatConcertDates(concert: ConcertMetadata, locale: string): string {
  const intl = locale === 'de' ? 'de-CH' : 'en-GB';
  const dates = concert.performances.map(p => new Date(`${p.date}T12:00:00Z`));
  const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString(intl, { timeZone: 'UTC', ...opts });
  const join = (parts: string[]) =>
    parts.length > 1 ? `${parts.slice(0, -1).join(', ')} & ${parts.at(-1)}` : parts.join('');

  if (dates.length === 0) return '';
  const sameMonth = dates.every(d => fmt(d, { month: 'numeric', year: 'numeric' }) === fmt(dates[0], { month: 'numeric', year: 'numeric' }));
  if (!sameMonth) {
    return join(dates.map(d => fmt(d, { day: 'numeric', month: 'long', year: 'numeric' })));
  }
  const days = dates.map(d => fmt(d, { day: 'numeric' }) + (locale === 'de' ? '.' : ''));
  return `${join(days)} ${fmt(dates[0], { month: 'long', year: 'numeric' })}`;
}

/** e.g. "Vaughan Williams, Chaminade, Dvořák – 17. & 18. Dezember 2026" */
export function describeConcert(concert: ConcertMetadata, locale: string): string {
  return [concert.composers, formatConcertDates(concert, locale)].filter(Boolean).join(' – ');
}

export function concertShareImage(concert: ConcertMetadata) {
  return concert.poster ? { url: concert.poster, alt: concert.title } : DEFAULT_SHARE_IMAGE;
}

/**
 * Share metadata for a plain page: title from the nav label, description from
 * the general site description. Every page should set its own og:url, which
 * the layout can't provide.
 */
export async function pageShareMetadata({
  locale,
  href,
  titleKey,
}: {
  locale: string;
  href: Href;
  titleKey: 'concerts' | 'schedule' | 'about' | 'join' | 'sponsor';
}): Promise<Metadata> {
  const nav = await getTranslations({ locale, namespace: 'Navigation' });
  const meta = await getTranslations({ locale, namespace: 'Meta' });
  return buildShareMetadata({
    locale,
    href,
    title: nav(titleKey),
    description: meta('description'),
  });
}

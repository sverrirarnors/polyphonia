// lib/concerts.ts
import concertsManifest from './concerts-manifest.json';
import galleryManifest from './gallery-manifest.json';

export interface Performance {
  date: string;
  time?: string;
  location?: string;
  ticketUrl?: string;
}

export interface ConcertMetadata {
  slug: string;
  title: string;
  composers: string;
  performances: Performance[];
  poster?: string;
  program?: string;
}

type ConcertEntry = Omit<ConcertMetadata, 'slug'>;
type ConcertsManifest = Record<string, Record<string, ConcertEntry>>;

const manifest = concertsManifest as ConcertsManifest;

export function getAllConcertSlugs(): string[] {
  return Object.keys(manifest);
}

export function getConcertMetadata(slug: string, locale: string): ConcertMetadata {
  const entry = manifest[slug]?.[locale];
  if (!entry) {
    throw new Error(`No concert metadata for slug="${slug}" locale="${locale}"`);
  }
  return { slug, ...entry };
}

export function getAllConcerts(locale: string): ConcertMetadata[] {
  return getAllConcertSlugs()
    .map(slug => getConcertMetadata(slug, locale))
    .sort((a, b) => {
      const dateA = a.performances[0]?.date || '';
      const dateB = b.performances[0]?.date || '';
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
}

export function getConcertGalleryImages(slug: string): string[] {
  return (galleryManifest as Record<string, string[]>)[slug] || [];
}

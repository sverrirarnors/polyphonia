// lib/concerts.ts
import concertsManifest from './concerts-manifest.json';
import galleryManifest from './gallery-manifest.json';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getMediaUrl } from './media';

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
  return {
    slug,
    ...entry,
    poster: entry.poster ? getMediaUrl(entry.poster) : undefined,
    program: entry.program ? getMediaUrl(entry.program) : undefined,
  };
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

const GALLERY_IMAGE_PATTERN = /\.(avif|gif|jpe?g|png|webp)$/i;

function getManifestGalleryImages(slug: string): string[] {
  return ((galleryManifest as Record<string, string[]>)[slug] || []).map(getMediaUrl);
}

export async function getConcertGalleryImages(slug: string): Promise<string[]> {
  if (process.env.WORKERS_CI !== '1') {
    return getManifestGalleryImages(slug);
  }

  const prefix = `images/gallery/${slug}/`;

  try {
    const { env } = await getCloudflareContext({ async: true });
    const objectKeys: string[] = [];
    let cursor: string | undefined;

    do {
      const result = await env.MEDIA.list({ prefix, cursor });
      objectKeys.push(...result.objects.map(object => object.key));
      cursor = result.truncated ? result.cursor : undefined;
    } while (cursor);

    const images = objectKeys
      .filter(key => GALLERY_IMAGE_PATTERN.test(key))
      .sort((a, b) => a.localeCompare(b))
      .map(key => getMediaUrl(`/${key}`));

    return images;
  } catch (error) {
    console.warn(
      `Could not list R2 gallery "${slug}"; using the checked-in manifest instead.`,
      error instanceof Error ? error.message : error
    );
    return getManifestGalleryImages(slug);
  }
}

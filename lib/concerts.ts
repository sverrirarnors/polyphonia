// lib/concerts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
}

// Get all concert slugs by reading the concerts directory
export function getAllConcertSlugs(): string[] {
  const concertsDir = path.join(process.cwd(), 'content/concerts');
  const entries = fs.readdirSync(concertsDir, { withFileTypes: true });
  
  return entries
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
    .map(entry => entry.name);
}

// Get metadata for a specific concert in a specific locale
export function getConcertMetadata(slug: string, locale: string): ConcertMetadata {
  const filePath = path.join(
    process.cwd(),
    'content/concerts',
    slug,
    `${locale}.mdx`
  );
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  
  return {
    slug,
    title: data.title,
    composers: data.composers,
    performances: data.performances || [],
    poster: data.poster,
  };
}

// Get all concerts with their metadata for a specific locale
export function getAllConcerts(locale: string): ConcertMetadata[] {
  const slugs = getAllConcertSlugs();

  return slugs
    .map(slug => getConcertMetadata(slug, locale))
    .sort((a, b) => {
      // Sort by first performance date, newest first
      const dateA = a.performances[0]?.date || '';
      const dateB = b.performances[0]?.date || '';
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
}

// Get gallery images for a specific concert
export function getConcertGalleryImages(slug: string): string[] {
  const galleryDir = path.join(process.cwd(), 'public/images/gallery', slug);

  try {
    const files = fs.readdirSync(galleryDir);
    return files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map(file => `/images/gallery/${slug}/${file}`)
      .sort();
  } catch {
    return [];
  }
}

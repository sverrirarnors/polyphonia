// lib/concerts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ConcertMetadata {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  composers: string;
}

// Get all concert slugs by reading the concerts directory
export function getAllConcertSlugs(): string[] {
  const concertsDir = path.join(process.cwd(), 'app/[locale]/concerts/[slug]');
  const entries = fs.readdirSync(concertsDir, { withFileTypes: true });
  
  return entries
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
    .map(entry => entry.name);
}

// Get metadata for a specific concert in a specific locale
export function getConcertMetadata(slug: string, locale: string): ConcertMetadata {
  const filePath = path.join(
    process.cwd(),
    'app/[locale]/concerts/[slug]',
    slug,
    `${locale}.mdx`
  );
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  
  return {
    slug,
    title: data.title,
    date: data.date,
    time: data.time,
    location: data.location,
    composers: data.composers,
  };
}

// Get all concerts with their metadata for a specific locale
export function getAllConcerts(locale: string): ConcertMetadata[] {
  const slugs = getAllConcertSlugs();
  
  return slugs
    .map(slug => getConcertMetadata(slug, locale))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first
}

// routing.ts
/**
 * Internationalized routing configuration for the Polyphonia website.
 * 
 * This file configures next-intl's routing with localized pathnames.
 * 
 * Supported locales:
 * - German (de): Default locale, no URL prefix
 * - English (en): URLs prefixed with /en
 * 
 * Example URLs:
 * - Homepage: / (de), /en (en)
 * - Concerts: /konzerte (de), /en/concerts (en)
 * - Concert detail: /konzerte/hs25 (de), /en/concerts/hs25 (en)
 * 
 * Usage:
 * Always import Link, usePathname, useRouter from this file (not from Next.js):
 * 
 * import { Link, usePathname, useRouter } from '@/routing';
 * 
 * For dynamic routes, use object notation:
 * <Link href={{ pathname: '/concerts/[slug]', params: { slug: 'hs25' } }}>
 */
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Available locales
  locales: ['en', 'de'],
  
  // Default locale (German) - won't have URL prefix
  defaultLocale: 'de',
  
  // Only add locale prefix when not default locale
  localePrefix: 'as-needed',
  
  // Localized pathnames - maps internal route names to localized URLs
  pathnames: {
    // Homepage
    '/': '/',
    
    // Concerts listing
    '/concerts': {
      en: '/concerts',
      de: '/konzerte'
    },
    
    // Concert detail pages with slug parameter
    '/concerts/[slug]': {
      en: '/concerts/[slug]',
      de: '/konzerte/[slug]'
    },
    
    // Rehearsal schedule
    '/schedule': {
      en: '/schedule',
      de: '/probeplan'
    },
    
    // About page
    '/about': {
      en: '/about',
      de: '/ueber-uns'  // über-uns as ueber-uns for URL safety
    },
    
    // Join/recruitment page
    '/join': {
      en: '/join',
      de: '/mitmachen'
    },
    
    // Contact page
    '/contact': {
      en: '/contact',
      de: '/kontakt'
    },
    
    // Sponsor/support page
    '/sponsor': {
      en: '/sponsor',
      de: '/unterstuetzen'
    }
  }
});

// Export navigation utilities - these are locale-aware
// Always use these instead of Next.js's built-in versions
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

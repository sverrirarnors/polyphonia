// components/Navigation.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: `/${locale}/concerts`, label: t('concerts') },
    { href: `/${locale}/schedule`, label: t('schedule') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/join`, label: t('join') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const switchLocale = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    return `/${newLocale}${currentPath}`;
  };

  // Check if on homepage - handle both /locale and /locale/ and also just /
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === '/';

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-stone-200">
        <div className="container mx-auto px-6 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            {!isHomePage && (
              <Link href={`/${locale}`} className="text-lg font-serif font-semibold text-neutral-700 hover:text-red-600 transition-colors">
                Universitätsorchester Polyphonia
              </Link>
            )}
            
            <div className={`flex items-center gap-6 ${isHomePage ? 'ml-auto' : ''}`}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-700 hover:text-red-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex items-center gap-1 ml-2 pl-2 border-l border-stone-300">
                <Link
                  href={switchLocale('de')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                    locale === 'de'
                      ? 'bg-red-600 text-white'
                      : 'text-neutral-500 hover:text-red-600'
                  }`}
                >
                  DE
                </Link>
                <Link
                  href={switchLocale('en')}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                    locale === 'en'
                      ? 'bg-red-600 text-white'
                      : 'text-neutral-500 hover:text-red-600'
                  }`}
                >
                  EN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header with Logo */}
      {!isHomePage && (
        <div className="md:hidden bg-stone-200 px-6 py-4">
          <Link href={`/${locale}`} className="text-lg font-serif font-semibold text-neutral-700">
            Universitätsorchester Polyphonia
          </Link>
        </div>
      )}

      {/* Mobile Floating Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`md:hidden fixed right-6 z-50 w-14 h-14 bg-stone-300 text-neutral-900 rounded-full shadow-lg hover:bg-stone-400 transition-colors flex items-center justify-center ${
          isHomePage ? 'top-6' : 'top-6'
        }`}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-neutral-900/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="md:hidden fixed top-24 right-6 bg-stone-100 rounded-2xl shadow-xl z-40 p-6 min-w-[200px]">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-neutral-700 hover:text-red-600 transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex items-center gap-2 pt-2 mt-2 border-t border-stone-300">
                <Link
                  href={switchLocale('de')}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    locale === 'de'
                      ? 'bg-red-600 text-white'
                      : 'text-neutral-500 hover:text-red-600 border border-stone-300'
                  }`}
                >
                  DE
                </Link>
                <Link
                  href={switchLocale('en')}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    locale === 'en'
                      ? 'bg-red-600 text-white'
                      : 'text-neutral-500 hover:text-red-600 border border-stone-300'
                  }`}
                >
                  EN
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

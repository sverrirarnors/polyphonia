// components/Navigation.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/routing';
import { useState, useTransition } from 'react';
import { useParams } from 'next/navigation';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const links = [
    { href: '/concerts' as const, label: t('concerts') },
    { href: '/schedule' as const, label: t('schedule') },
    { href: '/about' as const, label: t('about') },
    { href: '/join' as const, label: t('join') },
    { href: '/contact' as const, label: t('contact') },
  ];

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      // Check if we're on a dynamic route (has [slug] parameter)
      if (pathname === '/concerts/[slug]' && params.slug) {
        // For dynamic routes, pass the slug as a parameter
        router.replace(
          {
            pathname: '/concerts/[slug]',
            params: { slug: params.slug as string },
          },
          { locale: newLocale }
        );
      } else {
        // For static routes, just pass the pathname
        router.replace(pathname as any, { locale: newLocale });
      }
    });
  };

  // Check if on homepage - pathname from next-intl is already locale-agnostic
  const isHomePage = pathname === '/';

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-stone-200">
        <div className="container mx-auto px-6 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            {!isHomePage && (
              <Link
                href="/"
                className="text-lg font-serif font-semibold text-neutral-700 hover:text-orange-600 transition-colors"
              >
                Universitätsorchester Polyphonia
              </Link>
            )}

            <div
              className={`flex items-center gap-6 ${isHomePage ? 'ml-auto' : ''}`}
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-700 hover:text-orange-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center gap-1 ml-2 pl-2 border-l border-stone-300">
                <button
                  onClick={() => handleLocaleChange('de')}
                  disabled={isPending}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                    locale === 'de'
                      ? 'bg-orange-600 text-white'
                      : 'text-neutral-500 hover:text-orange-600'
                  }`}
                >
                  DE
                </button>
                <button
                  onClick={() => handleLocaleChange('en')}
                  disabled={isPending}
                  className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                    locale === 'en'
                      ? 'bg-orange-600 text-white'
                      : 'text-neutral-500 hover:text-orange-600'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header with Logo */}
      {!isHomePage && (
        <div className="md:hidden bg-stone-200 px-6 pt-7 pb-4">
          <Link
            href="/"
            className="text-lg font-serif font-semibold text-neutral-700"
          >
            Universitätsorchester Polyphonia
          </Link>
        </div>
      )}

      {/* Mobile Floating Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed right-6 top-4 z-50 w-14 h-14 bg-stone-300 text-neutral-900 rounded-full shadow-lg hover:bg-stone-400 transition-colors flex items-center justify-center"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
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
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm text-neutral-700 hover:text-orange-600 transition-colors py-2"
              >
                {t('home')}
              </Link>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-neutral-700 hover:text-orange-600 transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center gap-2 pt-2 mt-2 border-t border-stone-300">
                <button
                  onClick={() => {
                    handleLocaleChange('de');
                    setIsMenuOpen(false);
                  }}
                  disabled={isPending}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    locale === 'de'
                      ? 'bg-orange-600 text-white'
                      : 'text-neutral-500 hover:text-orange-600 border border-stone-300'
                  }`}
                >
                  DE
                </button>
                <button
                  onClick={() => {
                    handleLocaleChange('en');
                    setIsMenuOpen(false);
                  }}
                  disabled={isPending}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    locale === 'en'
                      ? 'bg-orange-600 text-white'
                      : 'text-neutral-500 hover:text-orange-600 border border-stone-300'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

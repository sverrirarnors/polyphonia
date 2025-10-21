// components/Navigation.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();

  const links = [
    { href: `/${locale}`, label: t('home') },
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

  return (
    <nav className="border-b border-stone-300 bg-stone-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-4xl">
        <Link href={`/${locale}`} className="text-xl font-semibold font-serif text-neutral-900 hover:text-red-600 transition-colors">
          Polyphonia
        </Link>
        
        <div className="flex items-center gap-6">
          {links.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-600 hover:text-red-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
          <div className="flex items-center gap-1 ml-2">
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
    </nav>
  );
}

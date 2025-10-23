// components/TableOfContents.tsx
'use client';

import { useTranslations } from 'next-intl';

interface TocItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const t = useTranslations('Common');
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust for fixed header if any
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="border-l-2 border-stone-300 pl-4 mb-8">
      <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3">{t('onThisPage')}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className="text-sm text-neutral-600 hover:text-orange-600 transition-colors text-left"
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

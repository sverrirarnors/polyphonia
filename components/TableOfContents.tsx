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
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-neutral-600">
        {t('onThisPage')}
      </span>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className="text-sm px-3 py-1 rounded-full bg-stone-200 text-neutral-700 hover:bg-orange-100 hover:text-orange-700 transition-colors"
        >
          {item.title}
        </button>
      ))}
    </nav>
  );
}

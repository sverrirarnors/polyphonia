// app/[locale]/not-found.tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-stone-100 p-12 rounded-lg border border-stone-300 max-w-lg">
        <h1 className="text-6xl font-serif font-semibold mb-4 text-neutral-900">
          404
        </h1>
              <h1 className="text-4xl font-serif font-bold mb-4 text-neutral-900">
        {t('title')}
      </h1>
      <p className="text-neutral-700 mb-8">
        {t('description')}
      </p>
        <Link
          href="/"
          className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-orange-700 transition-colors"
        >
          {t('returnHome')} →
        </Link>
      </div>
    </div>
  );
}

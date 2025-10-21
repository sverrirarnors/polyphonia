// app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Home');

  return (
    <div className="space-y-20">
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl md:text-6xl font-semibold mb-5 font-serif text-neutral-900">
          {t('title')}
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 mb-3">
          {t('subtitle')}
        </p>
        <p className="text-sm text-neutral-500 max-w-xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900">
            {t('upcomingConcerts')}
          </h2>
          <Link
            href={`/${locale}/concerts`}
            className="text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            {t('viewAllConcerts')} →
          </Link>
        </div>
        
        <Link 
          href={`/${locale}/concerts/hs25`}
          className="block bg-stone-100 p-8 rounded-lg border border-stone-300 hover:border-red-600 transition-all group"
        >
          <h3 className="text-xl font-serif font-semibold mb-2 text-neutral-900 group-hover:text-red-600 transition-colors">
            Herbstsemester 2025
          </h3>
          <p className="text-neutral-600 mb-3">
            Borodin, Bruch, Kalinnikow
          </p>
          <p className="text-sm text-neutral-500">
            12. & 17. Dezember 2025
          </p>
        </Link>
      </section>

      <section className="bg-stone-100 rounded-lg p-8 md:p-10 border border-stone-300">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4 text-neutral-900">
          {t('aboutUs')}
        </h2>
        <p className="text-neutral-700 mb-5 leading-relaxed max-w-2xl">
          {t('description')}
        </p>
        <Link
          href={`/${locale}/about`}
          className="inline-block text-sm text-red-600 hover:text-red-700 transition-colors"
        >
          {t('learnMore')} →
        </Link>
      </section>
    </div>
  );
}

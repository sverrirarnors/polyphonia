// app/[locale]/concerts/page.tsx
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getAllConcerts } from '@/lib/concerts';

export default async function ConcertsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Concerts');
  
  // Get all concerts with metadata from MDX frontmatter
  const concerts = getAllConcerts(locale);

  return (
    <div>
      <h1 className="text-4xl font-serif font-semibold mb-10 text-neutral-900">
        {t('title')}
      </h1>
      
      <div className="space-y-6">
        {concerts.map((concert) => (
          <Link
            key={concert.slug}
            href={`/concerts/${concert.slug}`}
            className="block bg-stone-100 p-8 rounded-lg border border-stone-300 hover:border-red-600 transition-all group"
          >
            <h2 className="text-2xl font-serif font-semibold mb-3 text-neutral-900 group-hover:text-red-600 transition-colors">
              {concert.title}
            </h2>
            <div className="text-neutral-600 space-y-1.5 text-sm">
              <p>
                <span className="font-medium text-neutral-900">{t('date')}:</span>{' '}
                {new Date(concert.date).toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p>
                <span className="font-medium text-neutral-900">{t('time')}:</span>{' '}
                {concert.time}
              </p>
              <p>
                <span className="font-medium text-neutral-900">{t('location')}:</span>{' '}
                {concert.location}
              </p>
              <p className="mt-3 pt-3 border-t border-stone-300 text-neutral-700">
                {concert.composers}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

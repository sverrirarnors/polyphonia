// app/[locale]/concerts/page.tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/routing';
import { getAllConcerts } from '@/lib/concerts';

export default async function ConcertsPage({
  params,
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

      <div className="space-y-6 mb-10">
        {concerts.map((concert) => (
          <div
            key={concert.slug}
            className="bg-stone-100 p-8 rounded-lg border border-stone-300"
          >
            <Link
              href={{
                pathname: '/concerts/[slug]',
                params: { slug: concert.slug },
              }}
              className="block group mb-6"
            >
              <h2 className="text-2xl font-serif font-semibold mb-3 text-neutral-900 group-hover:text-orange-600 transition-colors">
                {concert.title}
              </h2>
              <p className="text-neutral-800">{concert.composers}</p>
            </Link>

            <div className="space-y-2">
              {concert.performances.map((performance, index) => {
                const performanceIsUpcoming =
                  new Date(performance.date) >= new Date();

                return (
                  <div
                    key={index}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm"
                  >
                    <span className="font-medium text-neutral-900">
                      {new Date(performance.date).toLocaleDateString(locale, {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    {performanceIsUpcoming && performance.time && (
                      <span className="text-neutral-700">
                        {performance.time}
                      </span>
                    )}
                    {performance.location && (
                      <span className="text-neutral-600">
                        {performance.location}
                      </span>
                    )}
                    {performanceIsUpcoming && (
                      <>
                        {performance.ticketUrl ? (
                          <a
                            href={performance.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-700 font-medium"
                          >
                            {t('buyTickets')} →
                          </a>
                        ) : (
                          <span className="text-neutral-500 italic">
                            {t('ticketsSoonAvailable')}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

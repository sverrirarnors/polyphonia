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
          <div
            key={concert.slug}
            className="bg-stone-100 p-8 rounded-lg border border-stone-300"
          >
            <Link
              href={`/concerts/${concert.slug}`}
              className="block group mb-6"
            >
              <h2 className="text-2xl font-serif font-semibold mb-3 text-neutral-900 group-hover:text-orange-600 transition-colors">
                {concert.title}
              </h2>
              <p className="text-neutral-800">
                {concert.composers}
              </p>
            </Link>
            
            <div className="space-y-4">
              {concert.performances.map((performance, index) => {
                const performanceIsUpcoming = new Date(performance.date) >= new Date();
                
                return (
                  <div 
                    key={index}
                    className="pb-4 border-b border-stone-300 last:border-0 last:pb-0"
                  >
                    <div className="text-sm mb-3">
                      <p className="font-medium text-neutral-900">
                        {new Date(performance.date).toLocaleDateString(locale, { 
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      {(performance.time || performance.location) && (
                        <p className="text-neutral-700">
                          {[performance.time, performance.location].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                    
                    {performanceIsUpcoming && (
                      <div>
                        {performance.ticketUrl ? (
                          <a
                            href={performance.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-700 transition-colors"
                          >
                            {t('buyTickets')} →
                          </a>
                        ) : (
                          <span className="inline-block text-sm text-neutral-500 italic">
                            {t('ticketsSoonAvailable')}
                          </span>
                        )}
                      </div>
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

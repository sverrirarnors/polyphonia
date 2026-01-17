// app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/routing';
import { getAllConcerts } from '@/lib/concerts';
import NoticeBanner from '@/components/NoticeBanner';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Home');
  const tConcerts = await getTranslations('Concerts');
  
  // Get upcoming concerts (future dates only)
  const allConcerts = getAllConcerts(locale);
  const upcomingConcerts = allConcerts.filter(
    concert => concert.performances.some(p => new Date(p.date) >= new Date())
  );

  return (
    <div>
      {/* Hero Section with Image */}
      <section className="relative -mx-6 -mt-20 mb-0 h-[60vh] min-h-[400px] max-h-[600px] flex items-end justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/images/layout/header_background.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-stone-200 via-transparent to-transparent" style={{ backgroundImage: 'linear-gradient(to top, rgb(231 229 228) 0%, transparent 30%)' }} />
        </div>
        
        <div className="relative z-10 text-center px-6 pb-0 translate-y-8 md:translate-y-12">
          <h1 className="text-4xl md:text-5xl font-semibold font-serif text-neutral-900">
            Universitätsorchester Polyphonia Zürich
          </h1>
        </div>
      </section>

      <div className="space-y-10 mt-16">
        <NoticeBanner />
      </div>

      <div className="space-y-20 mt-10">

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900">
            {t('upcomingConcerts')}
          </h2>
          <Link
            href="/concerts"
            className="text-sm text-orange-600 hover:text-orange-700 transition-colors"
          >
            {t('viewAllConcerts')} →
          </Link>
        </div>
        
        <div className="space-y-6">
          {upcomingConcerts.length > 0 ? (
            upcomingConcerts.map((concert) => (
              <div
                key={concert.slug}
                className="bg-stone-100 p-8 rounded-lg border border-stone-300"
              >
                <Link 
                  href={{
                    pathname: '/concerts/[slug]',
                    params: { slug: concert.slug }
                  }}
                  className="block group mb-6"
                >
                  <h3 className="text-xl font-serif font-semibold mb-2 text-neutral-900 group-hover:text-orange-600 transition-colors">
                    {concert.title}
                  </h3>
                  <p className="text-neutral-700 mb-3">
                    {concert.composers}
                  </p>
                </Link>
                
                <div className="space-y-4">
                  {concert.performances.map((performance, index) => {
                    const isUpcoming = new Date(performance.date) >= new Date();
                    
                    return (
                      <div 
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-stone-300 last:border-0 last:pb-0"
                      >
                        <div className="text-sm">
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
                        
                        {isUpcoming && (
                          <div className="flex-shrink-0">
                            {performance.ticketUrl ? (
                              <a
                                href={performance.ticketUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-700 transition-colors"
                              >
                                {tConcerts('buyTickets')} →
                              </a>
                            ) : (
                              <span className="inline-block text-sm text-neutral-700 italic">
                                {tConcerts('ticketsSoonAvailable')}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <p className="text-neutral-700 text-center py-8">
              {t('noUpcomingConcerts')}
            </p>
          )}
        </div>
      </section>

      <section className="bg-stone-100 rounded-lg p-8 md:p-10 border border-stone-300">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4 text-neutral-900">
          {t('aboutUs')}
        </h2>
        <p className="text-neutral-800 mb-5 leading-relaxed whitespace-pre-line text-justify hyphens-auto">
          {t('description')}
        </p>
        <Link
          href="/about"
          className="inline-block text-sm text-orange-600 hover:text-orange-700 transition-colors"
        >
          {t('learnMore')} →
        </Link>
      </section>
      </div>
    </div>
  );
}

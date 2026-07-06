// app/[locale]/concerts/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllConcertSlugs, getConcertMetadata, getConcertGalleryImages } from '@/lib/concerts';
import { Link } from '@/routing';
import { getTranslations } from 'next-intl/server';
import Gallery from '@/components/Gallery';
import Lightbox from '@/components/Lightbox';

interface ConcertPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// For static site generation - get all concert slugs dynamically
export function generateStaticParams() {
  const slugs = getAllConcertSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function ConcertPage({ params }: ConcertPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('Concerts');

  try {
    // Get metadata for poster
    const metadata = getConcertMetadata(slug, locale);
    const galleryImages = await getConcertGalleryImages(slug);

    // Dynamically import the MDX file based on locale from content directory
    const Content = (await import(`@/content/concerts/${slug}/${locale}.mdx`)).default;
    const todayStr = new Date().toLocaleDateString('en-CA', {
      timeZone: 'Europe/Zurich',
    });
    const upcomingPerformances = metadata.performances.filter(
      p => p.date >= todayStr
    );

    return (
      <div>
        <Link
          href="/concerts"
          className="inline-flex items-center gap-2 text-neutral-700 hover:text-orange-600 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('backToConcerts')}
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          <div className={`flex flex-col gap-6 ${metadata.poster ? 'md:w-2/3' : 'w-full'}`}>
            <article className="prose prose-lg dark:prose-invert break-words hyphens-auto">
              <Content />
            </article>
            {metadata.program && (
              <a
                href={metadata.program}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium self-start"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M4 6h16M4 6a2 2 0 01-2-2V4a2 2 0 012-2h16a2 2 0 012 2v0a2 2 0 01-2 2M4 6v14a2 2 0 002 2h12a2 2 0 002-2V6" />
                </svg>
                {t('downloadProgram')} →
              </a>
            )}
          </div>
          {metadata.poster && (
            <div className="md:w-1/3 flex-shrink-0 order-last">
              <Lightbox src={metadata.poster} alt={metadata.title} />
            </div>
          )}
        </div>

        {upcomingPerformances.length > 0 && (
          <div className="bg-stone-100 p-6 md:p-8 rounded-lg border border-stone-300 mt-10">
            <div className="space-y-4">
              {upcomingPerformances.map((performance, index) => (
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

                  <div className="flex-shrink-0">
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
                      <span className="inline-block text-sm text-neutral-700 italic">
                        {t('ticketsSoonAvailable')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {galleryImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-serif font-semibold mb-4 text-neutral-900">
              {t('gallery')}
            </h2>
            <Gallery images={galleryImages} alt={metadata.title} />
          </div>
        )}
      </div>
    );
  } catch (error) {
    notFound();
  }
}

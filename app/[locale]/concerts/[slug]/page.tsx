// app/[locale]/concerts/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getAllConcertSlugs, getConcertMetadata, getConcertGalleryImages } from '@/lib/concerts';
import { Link } from '@/routing';
import { getTranslations } from 'next-intl/server';
import Gallery from '@/components/Gallery';

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
    const galleryImages = getConcertGalleryImages(slug);

    // Dynamically import the MDX file based on locale from content directory
    const Content = (await import(`@/content/concerts/${slug}/${locale}.mdx`)).default;
    return (
      <div className="max-w-4xl mx-auto px-6 pb-8">
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
          <article className={`prose prose-lg dark:prose-invert ${metadata.poster ? 'md:w-2/3' : 'w-full'}`}>
            <Content />
          </article>
          {metadata.poster && (
            <div className="md:w-1/3 flex-shrink-0 order-last">
              <Image
                src={metadata.poster}
                alt={metadata.title}
                width={300}
                height={424}
                className="rounded-lg shadow-lg w-full h-auto"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTdlNWU0Ii8+PC9zdmc+"
              />
            </div>
          )}
        </div>

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


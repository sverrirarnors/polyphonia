// app/[locale]/concerts/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllConcertSlugs } from '@/lib/concerts';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

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
    // Dynamically import the MDX file based on locale from content directory
    const Content = (await import(`@/content/concerts/${slug}/${locale}.mdx`)).default;
    return (
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <Link 
          href={`/${locale}/concerts`}
          className="inline-flex items-center gap-2 text-neutral-700 hover:text-orange-600 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('backToConcerts')}
        </Link>
        <article className="prose prose-lg dark:prose-invert">
          <Content />
        </article>
      </div>
    );
  } catch (error) {
    notFound();
  }
}

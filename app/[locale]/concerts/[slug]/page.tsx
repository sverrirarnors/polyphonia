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
      <div className="max-w-4xl mx-auto">
        <Link 
          href={`/${locale}/concerts`}
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors mb-6"
        >
          ← {t('backToConcerts')}
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

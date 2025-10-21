// app/[locale]/concerts/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getAllConcertSlugs } from '@/lib/concerts';

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

  try {
    // Dynamically import the MDX file based on locale from content directory
    const Content = (await import(`@/content/concerts/${slug}/${locale}.mdx`)).default;
    return (
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <Content />
      </article>
    );
  } catch (error) {
    notFound();
  }
}

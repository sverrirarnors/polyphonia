// lib/mdx-page.tsx
import { notFound } from 'next/navigation';

interface MDXPageProps {
  locale: string;
  segment: string;
}

export async function MDXPage({ locale, segment }: MDXPageProps) {
  try {
    const Content = (await import(`@/app/[locale]/${segment}/${locale}.mdx`)).default;
    return (
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
        <Content />
      </article>
    );
  } catch (error) {
    notFound();
  }
}

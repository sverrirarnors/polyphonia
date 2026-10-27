// app/[locale]/about/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { MDXPage } from '@/lib/mdx-page';

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MDXPage locale={locale} segment="about" />;
}


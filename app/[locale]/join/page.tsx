// app/[locale]/join/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { MDXPage } from '@/lib/mdx-page';

export default async function JoinPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MDXPage locale={locale} segment="join" />;
}

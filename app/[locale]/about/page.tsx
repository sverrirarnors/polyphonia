// app/[locale]/about/page.tsx
import { MDXPage } from '@/lib/mdx-page';

export default async function AboutPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  return <MDXPage locale={locale} segment="about" />;
}

// app/[locale]/sponsor/page.tsx
import { MDXPage } from '@/lib/mdx-page';

export default async function SponsorPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  return <MDXPage locale={locale} segment="sponsor" />;
}

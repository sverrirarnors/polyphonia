import { pageShareMetadata } from '@/lib/seo';
// app/[locale]/sponsor/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { MDXPage } from '@/lib/mdx-page';
import { SponsorFormProvider } from '@/components/SponsorFormEmbed';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageShareMetadata({ locale, href: '/sponsor', titleKey: 'sponsor' });
}

export default async function SponsorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <SponsorFormProvider>
      <MDXPage locale={locale} segment="sponsor" />
    </SponsorFormProvider>
  );
}

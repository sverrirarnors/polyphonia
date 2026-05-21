// app/[locale]/sponsor/page.tsx
import { MDXPage } from '@/lib/mdx-page';
import { SponsorFormProvider } from '@/components/SponsorFormEmbed';

export default async function SponsorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <SponsorFormProvider>
      <MDXPage locale={locale} segment="sponsor" />
    </SponsorFormProvider>
  );
}

// app/[locale]/contact/page.tsx
import { MDXPage } from '@/lib/mdx-page';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <MDXPage locale={locale} segment="contact" />;
}

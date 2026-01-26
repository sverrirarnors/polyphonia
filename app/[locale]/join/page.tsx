// app/[locale]/join/page.tsx
import { MDXPage } from '@/lib/mdx-page';

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <MDXPage locale={locale} segment="join" />;
}

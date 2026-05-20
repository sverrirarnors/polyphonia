import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      { source: '/kontakt', destination: '/ueber-uns', permanent: true },
      { source: '/contact', destination: '/ueber-uns', permanent: true },
      { source: '/en/contact', destination: '/en/about', permanent: true },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  },
});

export default withNextIntl(withMDX(nextConfig));

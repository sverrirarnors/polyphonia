import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

if (process.env.WORKERS_CI === '1') {
  import('@opennextjs/cloudflare').then(({ initOpenNextCloudflareForDev }) =>
    initOpenNextCloudflareForDev()
  );
}

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const productionBranches = new Set(['main']);
const workersBranch = process.env.WORKERS_CI_BRANCH;
const shouldBypassImageTransforms =
  process.env.NEXT_PUBLIC_BYPASS_IMAGE_TRANSFORMS === '1' ||
  Boolean(
    process.env.WORKERS_CI === '1' &&
      workersBranch &&
      !productionBranches.has(workersBranch)
  );

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  env: {
    NEXT_PUBLIC_BYPASS_IMAGE_TRANSFORMS: shouldBypassImageTransforms ? '1' : '0',
  },
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.ts',
  },
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

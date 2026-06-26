import type { ImageLoaderProps } from 'next/image';

const normalizeSrc = (src: string) => (src.startsWith('/') ? src.slice(1) : src);

const productionBranches = new Set(['main']);

function shouldBypassTransforms() {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const workersBranch = process.env.WORKERS_CI_BRANCH;

  return Boolean(workersBranch && !productionBranches.has(workersBranch));
}

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
  if (shouldBypassTransforms()) {
    return src;
  }

  const params = [`width=${width}`, `quality=${quality ?? 75}`, 'format=auto'];
  return `/cdn-cgi/image/${params.join(',')}/${normalizeSrc(src)}`;
}

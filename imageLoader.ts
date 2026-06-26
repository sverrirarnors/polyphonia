import type { ImageLoaderProps } from 'next/image';

const normalizeSrc = (src: string) => (src.startsWith('/') ? src.slice(1) : src);

function shouldBypassTransforms() {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  return process.env.NEXT_PUBLIC_BYPASS_IMAGE_TRANSFORMS === '1';
}

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
  if (shouldBypassTransforms()) {
    return src;
  }

  const params = [`width=${width}`, `quality=${quality ?? 75}`, 'format=auto'];
  return `/cdn-cgi/image/${params.join(',')}/${normalizeSrc(src)}`;
}

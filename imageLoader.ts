import type { ImageLoaderProps } from 'next/image';

const normalizeSrc = (src: string) => (src.startsWith('/') ? src.slice(1) : src);

export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
  if (process.env.NODE_ENV === 'development') {
    return src;
  }
  const params = [`width=${width}`, `quality=${quality ?? 75}`, 'format=auto'];
  return `/cdn-cgi/image/${params.join(',')}/${normalizeSrc(src)}`;
}

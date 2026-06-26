const DEFAULT_MEDIA_ORIGIN = 'https://media.polyphonia.ch';

const REMOTE_MEDIA_PREFIXES = [
  '/images/concerts/',
  '/images/gallery/',
  '/pdfs/',
];

function getMediaOrigin(): string {
  const configuredOrigin = process.env.NEXT_PUBLIC_MEDIA_URL?.replace(/\/+$/, '');

  if (configuredOrigin !== undefined) {
    return configuredOrigin;
  }

  return DEFAULT_MEDIA_ORIGIN;
}

export function getMediaUrl(path: string): string {
  if (!path || /^https?:\/\//.test(path)) {
    return path;
  }

  if (!REMOTE_MEDIA_PREFIXES.some(prefix => path.startsWith(prefix))) {
    return path;
  }

  const origin = getMediaOrigin();
  return origin ? `${origin}${path}` : path;
}

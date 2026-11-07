import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './routing';

const handleI18n = createMiddleware(routing);

// Link-preview fetchers (WhatsApp, iMessage, Signal, Telegram, …) and search
// crawlers forward the sharer's Accept-Language. Without this, sharing
// polyphonia.ch from an English phone would redirect the bot to /en and the
// preview would be in English. Bots get exactly the URL that was shared.
const handleI18nForBots = createMiddleware({ ...routing, localeDetection: false });

const BOT_UA =
  /bot|crawler|spider|preview|facebookexternalhit|facebot|whatsapp|telegram|signal|slack|discord|linkedin|embedly|skype|vkshare|pinterest/i;

export default function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') ?? '';
  return BOT_UA.test(userAgent) ? handleI18nForBots(request) : handleI18n(request);
}

export const config = {
  matcher: ['/', '/(de|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};

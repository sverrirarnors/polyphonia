// components/NoticeBanner.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { noticeConfig } from '@/lib/notice';

export default function NoticeBanner() {
  const t = useTranslations('Notice');

  if (!noticeConfig.enabled) {
    return null;
  }

  const typeStyles = {
    info: 'bg-amber-100 text-amber-900 border-amber-300',
    warning: 'bg-orange-100 text-orange-900 border-orange-300',
    urgent: 'bg-red-100 text-red-900 border-red-300',
  };

  const linkStyles = {
    info: 'text-amber-900 hover:text-amber-950',
    warning: 'text-orange-900 hover:text-orange-950',
    urgent: 'text-red-900 hover:text-red-950',
  };

  return (
    <div className="inline-block px-5 py-2 rounded-full border border-stone-300 bg-stone-100">
      <p className="text-sm text-neutral-700 text-center">
        {t(noticeConfig.messageKey)}{' '}
        <Link
          href="/join"
          className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
        >
          {t('learnMore')} →
        </Link>
      </p>
    </div>
  );
}

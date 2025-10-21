// components/NoticeBanner.tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { noticeConfig } from '@/lib/notice';

export default function NoticeBanner() {
  const t = useTranslations('Notice');
  const locale = useLocale();

  if (!noticeConfig.enabled) {
    return null;
  }

  const typeStyles = {
    info: 'bg-amber-100 text-amber-900 border-amber-300',
    warning: 'bg-orange-100 text-orange-900 border-orange-300',
    urgent: 'bg-red-100 text-red-900 border-red-300',
  };

  const buttonStyles = {
    info: 'bg-amber-900 hover:bg-amber-800 text-amber-50',
    warning: 'bg-orange-900 hover:bg-orange-800 text-orange-50',
    urgent: 'bg-red-900 hover:bg-red-800 text-red-50',
  };

  return (
    <div className={`${typeStyles[noticeConfig.type]} px-6 py-2.5 rounded-3xl border shadow-lg flex flex-col sm:flex-row items-center justify-center gap-3`}>
      <p className="text-sm font-medium text-center sm:text-left">
        {t(noticeConfig.messageKey)}
      </p>
      <Link 
        href={`/${locale}/join`}
        className={`${buttonStyles[noticeConfig.type]} px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap`}
      >
        {t('learnMore')}
      </Link>
    </div>
  );
}

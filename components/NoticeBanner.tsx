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

  const sections = [
    { label: t('strings'), instruments: t('stringsInstruments') },
    { label: t('winds'), instruments: t('windsInstruments') },
    { label: t('brass'), instruments: t('brassInstruments') },
    { label: t('percussion'), instruments: '' },
  ];

  return (
    <div className="bg-stone-100 p-8 rounded-lg border border-stone-300">
      <Link href="/join" className="block group">
        <h3 className="text-xl font-serif font-semibold mb-4 text-neutral-900 group-hover:text-orange-600 transition-colors">
          {t(noticeConfig.messageKey)}
        </h3>
        <div className="text-neutral-700 mb-4 space-y-2">
          {sections.map((section, index) => (
            <div key={index}>
              <span className="font-medium">{section.label}</span>
              {section.instruments && <>: {section.instruments}</>}
            </div>
          ))}
        </div>
        <span className="text-sm text-orange-600 group-hover:text-orange-700 transition-colors">
          {t('joinUs')} →
        </span>
      </Link>
    </div>
  );
}

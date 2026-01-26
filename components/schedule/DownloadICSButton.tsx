// components/schedule/DownloadICSButton.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export function DownloadICSButton({ locale }: { locale: string }) {
  const t = useTranslations('Schedule');
  const [host, setHost] = useState('polyphonia.ch');

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  const calendarUrl = `/api/calendar?locale=${locale}`;
  const webcalUrl = `webcal://${host}${calendarUrl}`;

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      <a
        href={calendarUrl}
        download="polyphonia-rehearsals.ics"
        className="inline-flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
      >
        {t('downloadCalendar')}
      </a>
      <a
        href={webcalUrl}
        className="inline-flex items-center gap-2 rounded-md border border-stone-400 bg-stone-100 px-4 py-2 text-sm font-semibold text-neutral-700 hover:bg-stone-200"
      >
        {t('subscribeCalendar')}
      </a>
    </div>
  );
}

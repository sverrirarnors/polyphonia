// app/[locale]/schedule/page.tsx
import { getTranslations } from 'next-intl/server';

// This would typically come from a CMS or database
const rehearsals = [
  {
    date: '2025-11-05',
    time: '19:00 - 22:00',
    location: 'ETH Zürich, Audimax',
    repertoire: 'Borodin: Polovtsian Dances',
    notes: 'Tutti rehearsal'
  },
  {
    date: '2025-11-12',
    time: '19:00 - 22:00',
    location: 'ETH Zürich, Audimax',
    repertoire: 'Bruch: Kol Nidrei',
    notes: 'Strings focus'
  },
  {
    date: '2025-11-19',
    time: '19:00 - 22:00',
    location: 'ETH Zürich, Audimax',
    repertoire: 'Kalinnikov: Symphony No. 1',
    notes: 'Full orchestra'
  },
  {
    date: '2025-11-26',
    time: '19:00 - 22:00',
    location: 'ETH Zürich, Audimax',
    repertoire: 'Full program run-through',
    notes: 'Tutti rehearsal'
  },
  {
    date: '2025-12-03',
    time: '19:00 - 22:00',
    location: 'ETH Zürich, Audimax',
    repertoire: 'Full program',
    notes: 'Final touches'
  },
  {
    date: '2025-12-10',
    time: '19:00 - 22:00',
    location: 'Kirche Neumünster',
    repertoire: 'General rehearsal',
    notes: 'In concert venue'
  },
];

export default async function SchedulePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('Schedule');

  // Group rehearsals by month
  const groupedRehearsals = rehearsals.reduce((acc, rehearsal) => {
    const date = new Date(rehearsal.date);
    const monthKey = date.toLocaleDateString(locale, { year: 'numeric', month: 'long' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(rehearsal);
    return acc;
  }, {} as Record<string, typeof rehearsals>);

  return (
    <div>
      <h1 className="text-4xl font-serif font-semibold mb-3 text-neutral-900">
        {t('title')}
      </h1>
      <p className="text-neutral-600 mb-10 text-sm">
        {t('subtitle')}
      </p>
      
      <div className="space-y-10">
        {Object.entries(groupedRehearsals).map(([month, monthRehearsals]) => (
          <div key={month}>
            <h2 className="text-xl font-serif font-semibold mb-4 text-red-600">
              {month}
            </h2>
            
            <div className="space-y-3">
              {monthRehearsals.map((rehearsal, index) => {
                const date = new Date(rehearsal.date);
                const isPast = date < new Date();
                
                return (
                  <div
                    key={index}
                    className={`bg-stone-100 p-6 rounded-lg border border-stone-300 ${
                      isPast ? 'opacity-40' : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-5">
                      <div className="min-w-[120px]">
                        <div className="text-xl font-serif font-semibold text-neutral-900">
                          {date.toLocaleDateString(locale, { day: 'numeric' })}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {date.toLocaleDateString(locale, { weekday: 'long' })}
                        </div>
                        <div className="text-sm text-neutral-700 mt-1">
                          {rehearsal.time}
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-2 text-sm">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-neutral-500">
                            {t('location')}
                          </span>
                          <p className="text-neutral-900">
                            {rehearsal.location}
                          </p>
                        </div>
                        
                        <div>
                          <span className="text-xs uppercase tracking-wider text-neutral-500">
                            {t('repertoire')}
                          </span>
                          <p className="text-neutral-700">
                            {rehearsal.repertoire}
                          </p>
                        </div>
                        
                        {rehearsal.notes && (
                          <div className="pt-2 mt-2 border-t border-stone-300">
                            <p className="text-neutral-600">
                              {rehearsal.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

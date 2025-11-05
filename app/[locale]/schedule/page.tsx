// app/[locale]/schedule/page.tsx
import { getTranslations } from "next-intl/server";
import { RehearsalBox } from "@/components/schedule/RehearsalBox";
import { RehearsalListItem } from "@/components/schedule/RehearsalListItem";
import { rehearsals } from "@/data/rehearsals";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Schedule");

  // Group rehearsals by month
  const groupedRehearsals = rehearsals.reduce((acc, rehearsal) => {
    const date = new Date(rehearsal.date);
    const monthKey = date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
    });

    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(rehearsal);
    return acc;
  }, {} as Record<string, typeof rehearsals>);

  return (
    <div>
      <h1 className="text-4xl font-serif font-semibold mb-3 text-neutral-900">
        {t("title")}
      </h1>
      <p className="text-neutral-800 mb-10 text-sm">{t("subtitle")}</p>
       <div className="space-y-10">
        {Object.entries(groupedRehearsals).map(([month, monthRehearsals]) => (
          <div key={month}>
            <h2 className="text-xl font-serif font-semibold mb-4 text-orange-600">
              {month}
            </h2>

            <div className="space-y-3">
              {monthRehearsals.map((rehearsal, index) => (
                // Toggle between box or list rendering:
                // <RehearsalBox ... /> or <RehearsalListItem ... />
                <RehearsalListItem
                  key={index}
                  rehearsal={rehearsal}
                  index={index}
                  locale={locale}
                  t={t}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


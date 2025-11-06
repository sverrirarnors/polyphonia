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

  // Group rehearsals by month: This seams like a convoluted way of doing this.
  // In particular since the following line orders the list chronologically b
  
  // Order rehearsals chronologically but put past rehearsal at the end
  const now = new Date();
  const chrono_rehearsals = rehearsals.sort((a, b) => {
    // Extract the start time (before the "–")
    const tA = a.time.trim().split("–")[0];
    const tB = b.time.trim().split("–")[0];

    const dateTimeA = new Date(`${a.date}T${tA}`);
    const dateTimeB = new Date(`${b.date}T${tB}`);

    // If one is past and the other isn't, put past ones last
    if (dateTimeA < now && dateTimeB > now) return 1;
    if (dateTimeB < now && dateTimeA > now) return -1;
    return dateTimeA.getTime() - dateTimeB.getTime();
  });

  const groupedRehearsals = chrono_rehearsals.reduce((acc, rehearsal) => {
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


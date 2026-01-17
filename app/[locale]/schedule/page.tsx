// app/[locale]/schedule/page.tsx
import { getTranslations } from "next-intl/server";
import { get_chrono_rehearsals } from "@/lib/schedule";
import { get_grouped_rehearsals } from "@/lib/schedule";
import { RehearsalItem } from "@/components/schedule/RehearsalItemsSwitch";
// import { RehearsalItems } from "@/components/schedule/RehearsalItems";


export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Schedule");

  const chronoRehearsals = get_chrono_rehearsals();
  const groupedRehearsals = get_grouped_rehearsals(chronoRehearsals, locale);

  return (
    <main>
      <h1 className="text-4xl font-serif font-semibold mb-3 text-neutral-900">
        {t("title")}
      </h1>
      <p className="text-neutral-800 mb-10 text-sm">{t("subtitle")}</p>

      <RehearsalItem groupedRehearsals={groupedRehearsals} locale={locale} />
    </main>
  );
}


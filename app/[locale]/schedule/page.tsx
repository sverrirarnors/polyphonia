// app/[locale]/schedule/page.tsx

import { getTranslations } from "next-intl/server";
import {
  filter_rehearsals,
  get_grouped_rehearsals,
  get_chrono_rehearsals
} from "@/lib/schedule";
import { RehearsalItems } from "@/components/schedule/RehearsalItems";
import { DownloadICSButton } from "@/components/schedule/DownloadICSButton";
import { FilterMenu } from "@/components/schedule/FilterMenu";
import { getFiltersForSection } from "@/types/index";
import type { PlayerSection } from "@/types/index";

const VALID_SECTIONS: PlayerSection[] = ["all", "strings", "woodwinds", "brass"];

export default async function SchedulePage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    section?: string;
  }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;

  const section: PlayerSection = VALID_SECTIONS.includes(sp.section as PlayerSection)
    ? (sp.section as PlayerSection)
    : "all";

  const filters = getFiltersForSection(section);

  const t = await getTranslations("Schedule");

  const chronoRehearsals = get_chrono_rehearsals();
  const filteredRehearsals = filter_rehearsals(chronoRehearsals, filters)
  const groupedRehearsals = get_grouped_rehearsals(filteredRehearsals, locale);

  return (
    <div>
      <h1 className="text-4xl font-serif font-semibold mb-3 text-neutral-900">
        {t("title")}
      </h1>
      <p className="text-neutral-800 mb-10 text-sm">{t("subtitle")}</p>

      <div className="mb-6">
        <DownloadICSButton locale={locale} />
      </div>

      <div className="mb-6">
        <FilterMenu activeSection={section} />
      </div>

      <RehearsalItems groupedRehearsals={groupedRehearsals} locale={locale} />
    </div>
  );
}

// components/schedule/FilterMenu.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { PlayerSection } from "@/types/index";

const SECTIONS: PlayerSection[] = ["all", "strings", "woodwinds", "brass"];

export function FilterMenu({
  activeSection,
}: {
  activeSection: PlayerSection;
}) {
  const t = useTranslations("Schedule");
  const router = useRouter();
  const searchParams = useSearchParams();

  const labels: Record<PlayerSection, string> = {
    all: t("filterAll"),
    strings: t("strings"),
    woodwinds: t("woodwinds"),
    brass: t("brass"),
  };

  function selectSection(section: PlayerSection) {
    const params = new URLSearchParams(searchParams);
    if (section === "all") {
      params.delete("section");
    } else {
      params.set("section", section);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-neutral-500">{t("filterLabel")}</span>
      {SECTIONS.map((section) => {
        const isActive = activeSection === section;
        return (
          <button
            key={section}
            onClick={() => selectSection(section)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              isActive
                ? "bg-orange-100 text-orange-800"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
            }`}
          >
            {labels[section]}
          </button>
        );
      })}
    </div>
  );
}

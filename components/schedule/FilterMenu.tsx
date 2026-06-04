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
      <span className="mr-1 text-sm font-semibold text-neutral-700">
        {t("filterLabel")}
      </span>
      {SECTIONS.map((section) => {
        const isActive = activeSection === section;
        return (
          <button
            key={section}
            onClick={() => selectSection(section)}
            aria-pressed={isActive}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-orange-600 bg-orange-600 text-white"
                : "border-stone-300 text-neutral-700 hover:border-orange-400 hover:text-orange-700"
            }`}
          >
            {labels[section]}
          </button>
        );
      })}
    </div>
  );
}

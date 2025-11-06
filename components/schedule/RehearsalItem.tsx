//components/schedule/RehearsalItem.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { RehearsalBox } from "@/components/schedule/RehearsalBox";
import { RehearsalListItem } from "@/components/schedule/RehearsalListItem";

export function RehearsalItem({
  groupedRehearsals,
  locale,
}: {
  groupedRehearsals: Record<string, any[]>;
  locale: string;
}) {
  const t = useTranslations("Schedule");
  const [viewMode, setViewMode] = useState<"list" | "box">("list");

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() =>
            setViewMode((prev) => (prev === "list" ? "box" : "list"))
          }
          className="px-4 py-2 text-sm rounded-md bg-orange-100 hover:bg-orange-200 text-orange-800 font-medium"
        >
          {viewMode === "list" ? t("boxView") : t("listView")}
        </button>
      </div>

      <div className="space-y-10">
        {Object.entries(groupedRehearsals).map(([month, monthRehearsals]) => (
          <div key={month}>
            <h2 className="text-xl font-serif font-semibold mb-4 text-orange-600">
              {month}
            </h2>

            <div className="space-y-3">
              {monthRehearsals.map((rehearsal, index) =>
                viewMode === "list" ? (
                  <RehearsalListItem
                    key={index}
                    rehearsal={rehearsal}
                    index={index}
                    locale={locale}
                    t={t}
                  />
                ) : (
                  <RehearsalBox
                    key={index}
                    rehearsal={rehearsal}
                    index={index}
                    locale={locale}
                    t={t}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { RehearsalBox } from "@/components/schedule/RehearsalBox";
import { RehearsalListItem } from "@/components/schedule/RehearsalListItem";
// Example third view (you can replace this with your own component)
import { RehearsalMillenialGray } from "@/components/schedule/RehearsalMillenialGray";

export function RehearsalItem({
  groupedRehearsals,
  locale,
}: {
  groupedRehearsals: Record<string, any[]>;
  locale: string;
}) {
  const t = useTranslations("Schedule");

  // Add the third view type
  const [viewMode, setViewMode] = useState<"list" | "box" | "millenialgray">("list");

  return (
    <div>
      {/* View selector */}
      <div className="flex justify-end mb-4">
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as "list" | "box" | "millenialgray")}
          className="px-4 py-2 text-sm rounded-md bg-orange-100 hover:bg-orange-200 text-orange-800 font-medium"
        >
          <option value="list">{t("listView")}</option>
          <option value="box">{t("boxView")}</option>
          <option value="millenialgray">{t("millenialgray")}</option>
        </select>
      </div>

      {/* Content */}
      <div className="space-y-10">
        {Object.entries(groupedRehearsals).map(([month, monthRehearsals]) => (
          <div key={month}>
            <h2 className="text-xl font-serif font-semibold mb-4 text-orange-600">
              {month}
            </h2>

            <div className="space-y-3">
              {monthRehearsals.map((rehearsal, index) => {
                switch (viewMode) {
                  case "list":
                    return (
                      <RehearsalListItem
                        key={index}
                        rehearsal={rehearsal}
                        index={index}
                        locale={locale}
                        t={t}
                      />
                    );
                  case "box":
                    return (
                      <RehearsalBox
                        key={index}
                        rehearsal={rehearsal}
                        index={index}
                        locale={locale}
                        t={t}
                      />
                    );
                  case "millenialgray":
                    return (
                      <RehearsalMillenialGray
                        key={index}
                        rehearsal={rehearsal}
                        index={index}
                        locale={locale}
                        t={t}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


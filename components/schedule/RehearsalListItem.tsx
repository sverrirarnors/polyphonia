// components/schedule/RehearsalListItem.tsx
// This draws a list entry in the list view for a single rehearsal

// import React from "react";
import { Rehearsal } from "@/types";

interface RehearsalListItemProps {
  rehearsal: Rehearsal;
  index: number;
  locale: string;
  t: (key: string) => string;
}

export function RehearsalListItem({
  rehearsal,
  index,
  locale,
  t,
}: RehearsalListItemProps) {
  const time = rehearsal.time.trim().split("-")[0];
  const date = new Date(`${rehearsal.date}T${time}`);
  const isPast = date < new Date();


  return (
    <li
      key={index}
      className={`flex md:items-center justify-between py-4 px-4 ${isPast ? "opacity-50" : ""
        } ${index % 2 === 1 ? "bg-amber-50" : "bg-white"}`}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <div className="min-w-[120px]">
          <div className="text-sm font-medium text-neutral-900">
            {date.toLocaleDateString(locale, {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </div>
          <div className="text-xs text-neutral-500">{rehearsal.time}</div>
        </div>
        <div className="flex flex-col">
          <RehearsalInline label={t("location")} value={rehearsal.location} />
          <RehearsalInline label={t("repertoire")} value={rehearsal.repertoire} />
          {rehearsal.notes && (
            <RehearsalInline label={t("notes")} value={rehearsal.notes} />
          )}
        </div>
      </div>

      <div className="text-xs text-neutral-600 mt-2 md:mt-0 md:ml-4 italic gap-5">
        {rehearsal.register}
      </div>

    </li>
  );
}

function RehearsalInline({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm text-neutral-800">
      <span className="font-semibold">{label}:</span> {value}
    </div>
  );
}


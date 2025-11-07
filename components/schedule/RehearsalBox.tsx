// components/schedule/RehearsalBox.tsx
// This draws the box view of a single rehearsal 

import { Rehearsal } from "@/types";

interface RehearsalBoxProps {
  rehearsal: Rehearsal;
  index: number;
  locale: string;
  t: (key: string) => string;
}

export function RehearsalBox({ rehearsal, index, locale, t }: RehearsalBoxProps) {
  const time = rehearsal.time.trim().split("-")[0];
  const date = new Date(`${rehearsal.date}T${time}`);
  const isPast = date < new Date();

  return (
    <div
      key={index}
      className={`bg-stone-100 p-6 rounded-lg border border-stone-300 ${
        isPast ? "opacity-40" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-5">
        <div className="min-w-[120px]">
          <div className="text-xl font-serif font-semibold text-neutral-900">
            {date.toLocaleDateString(locale, { day: "numeric" })}
          </div>
          <div className="text-xs text-neutral-500">
            {date.toLocaleDateString(locale, { weekday: "long" })}
          </div>
          <div className="text-sm text-neutral-800 mt-1">{rehearsal.time}</div>
        </div>

        <div className="flex-1 space-y-2 text-sm">
          <RehearsalDetail label={t("location")} value={rehearsal.location} />
          <RehearsalDetail label={t("repertoire")} value={rehearsal.repertoire} />
          {rehearsal.notes && (
            <div className="pt-2 mt-2 border-t border-stone-300">
              <p className="text-neutral-700">{rehearsal.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RehearsalDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs uppercase tracking-wider text-neutral-500">
        {label}
      </span>
      <p className="text-neutral-900">{value}</p>
    </div>
  );
}


// components/schedule/RehearsalItems.tsx
import { Rehearsal } from "@/types";

function getNote(rehearsal: Rehearsal, locale: string): string | undefined {
  if (locale === "de" && rehearsal.notes_de) return rehearsal.notes_de;
  if (locale === "en" && rehearsal.notes_en) return rehearsal.notes_en;
  return rehearsal.notes_de || rehearsal.notes_en || rehearsal.notes;
}

function getTime(rehearsal: Rehearsal, locale: string): string {
  if (locale === "de" && rehearsal.time_de) return rehearsal.time_de;
  if (locale === "en" && rehearsal.time_en) return rehearsal.time_en;
  return rehearsal.time_de || rehearsal.time_en || rehearsal.time;
}

export function RehearsalItems({
  groupedRehearsals,
  locale,
}: {
  groupedRehearsals: Record<string, Rehearsal[]>;
  locale: string;
}) {
  return (
    <div className="space-y-10">
      {Object.entries(groupedRehearsals).map(([month, monthRehearsals]) => (
        <div
          key={month}
          className={month.endsWith(" ") ? "opacity-50" : ""}
        >
          <h2 className="text-xl font-serif font-semibold mb-4 text-orange-600">
            {month.trim()}
          </h2>
          <div className="space-y-0">
            {monthRehearsals.map((rehearsal, index) => {
              const displayTime = getTime(rehearsal, locale);
              const timeMatch = displayTime.match(/^(\d{1,2}:\d{2})/);
              const timeForDate = timeMatch ? timeMatch[1] : "12:00";
              const date = new Date(`${rehearsal.date}T${timeForDate}`);
              const isPast = date < new Date();
              const note = getNote(rehearsal, locale);
              const location = rehearsal.location
              const hasValidTime = timeMatch !== null;

              const formattedDate = date.toLocaleDateString(locale, {
                weekday: "short",
                day: "numeric",
                month: "short",
              });

              if (rehearsal.highlight) {
                return (
                  <div
                    key={index}
                    className={`bg-orange-50 rounded-lg my-3 py-3 -mx-4 px-4 ${isPast ? "opacity-50" : ""}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-neutral-900 min-w-[120px]">
                          {hasValidTime ? formattedDate : displayTime}
                        </span>
                        {hasValidTime && displayTime && (
                          <span className="text-neutral-700 font-medium">
                            {displayTime}
                          </span>
                        )}
                        {rehearsal.location && (
                          <span className="text-neutral-600">
                            {rehearsal.location}
                          </span>
                        )}
                      </div>
                      {note && (
                        <span className="font-semibold text-orange-700">
                          {note}
                        </span>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`border-b border-stone-300 py-3 ${isPast ? "opacity-50" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-neutral-900 min-w-[120px]">
                        {formattedDate}
                      </span>
                      <span className="text-neutral-800">
                        {displayTime}
                      </span>

                      {!location.includes('Aki') && (
                        <div className="text-sm font-medium text-neutral-900">
                          {location}
                        </div>
                      )}
                    </div>

                    {note && (
                      <span className="text-sm font-medium text-neutral-700">
                        {note}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

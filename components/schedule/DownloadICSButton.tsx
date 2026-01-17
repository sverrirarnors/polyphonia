// components/schedule/DownloadICSButton.tsx
"use client";

import { Rehearsal } from "@/types";

export function DownloadICSButton({
  rehearsals,
  locale,
}: {
  rehearsals: Rehearsal[];
  locale: string;
}) {
  // Locale-dependent orchestra name and email
  const ORCHESTRA_NAME = locale === "de" ? "Universitätsorchester Polyphonia Zürich" : "University Orchestra Polyphonia Zürich";
  const ORCHESTRA_EMAIL = locale === "de" ? "kontakt@polyphonia.ch" : "contact@polyphonia.ch";
  
    function formatICSDate(date: Date, allDay = false): string {
    if (allDay) {
      // YYYYMMDD format for all-day events
      return date.toISOString().split("T")[0].replace(/-/g, "");
    } else {
      // full date-time UTC
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    }
  }

  function escapeText(text: string): string {
    return text
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\n/g, "\\n");
  }

  function generateICS(): string {
    const events = rehearsals
      .map((rehearsal) => {
        // etermine localized notes
        const summaryText = locale === "de" ? rehearsal.notes_de : rehearsal.notes_en;
        const summary = `Polyphonia – ${summaryText}`;
        const location = rehearsal.location;

        let start: Date;
        let end: Date;
        let allDay = false;

        if (rehearsal.time) {
          // Single-day timed event HH:MM-HH:MM
          const match = rehearsal.time.match(/^(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})$/);
          if (match) {
            const [_, sh, sm, eh, em] = match;
            start = new Date(`${rehearsal.date}T${sh.padStart(2, "0")}:${sm}:00`);
            end = new Date(`${rehearsal.date}T${eh.padStart(2, "0")}:${em}:00`);
          } else {
            start = new Date(`${rehearsal.date}T12:00:00`);
            end = new Date(`${rehearsal.date}T13:00:00`);
          }
        } else if (rehearsal.date_end) {
          // Multi-day all-day event
          start = new Date(rehearsal.date);
          end = new Date(rehearsal.date_end);
          end.setDate(end.getDate() + 1); // ICS DTEND exclusive
          allDay = true;
        } else {
          // Single-day all-day event without time
          start = new Date(rehearsal.date);
          end = new Date(start);
          end.setDate(end.getDate() + 1);
          allDay = true;
        }

        return `
BEGIN:VEVENT
UID:${crypto.randomUUID()}
DTSTART${allDay ? ";VALUE=DATE" : ""}:${formatICSDate(start, allDay)}
DTEND${allDay ? ";VALUE=DATE" : ""}:${formatICSDate(end, allDay)}
DTEND:${formatICSDate(end)}
SUMMARY:${escapeText(summary)}
ORGANIZER;CN=${ORCHESTRA_NAME}:mailto:${ORCHESTRA_EMAIL}
${rehearsal.location ? `LOCATION:${escapeText(rehearsal.location)}` : ""}
END:VEVENT`;
      })
      .join("");

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Website//Schedule//EN
CALSCALE:GREGORIAN
${events}
END:VCALENDAR`;
  }

  function handleDownload() {
    const ics = generateICS();
    const blob = new Blob([ics], {
      type: "text/calendar;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rehearsals.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleDownload}
      className="mb-8 inline-flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
    >
      Download calendar (.ics)
    </button>
  );
}

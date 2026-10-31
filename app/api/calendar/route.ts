// app/api/calendar/route.ts
import { NextResponse } from 'next/server';
import rehearsalsData from '@/content/schedule/rehearsals.json';
import { getFiltersForSection } from '@/types/index';
import type { PlayerSection, Rehearsal } from '@/types/index';

const VALID_SECTIONS: PlayerSection[] = ["all", "strings", "woodwinds", "brass"];

function formatICSDate(dateStr: string, time?: string): string {
  // All-day event: just the date digits
  if (!time) {
    return dateStr.replace(/-/g, '');
  }
  // Timed event: use local Zurich time (no UTC conversion)
  return dateStr.replace(/-/g, '') + 'T' + time.replace(/:/g, '') + '00';
}

function escapeText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function buildEvent(e: {
  uid: string;
  dtstart: string;
  dtend: string;
  allDay: boolean;
  summary: string;
  location?: string;
}): string {
  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const tzProp = e.allDay ? ';VALUE=DATE' : ';TZID=Europe/Zurich';

  const lines = [
    'BEGIN:VEVENT',
    `UID:${e.uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART${tzProp}:${e.dtstart}`,
    `DTEND${tzProp}:${e.dtend}`,
    `SUMMARY:${escapeText(e.summary)}`,
  ];

  if (e.location) {
    lines.push(`LOCATION:${escapeText(e.location)}`);
  }

  lines.push('END:VEVENT');
  return lines.join('\r\n');
}

// Parses "HH:MM-HH:MM", or several ranges separated by "/" (e.g. "10:00-13:00 / 14:00-17:00").
// Returns null if any part is not a valid range.
function parseTimeRanges(time: string): { start: string; end: string }[] | null {
  const ranges = time.split('/').map((part) => {
    const match = part.trim().match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const [, sh, sm, eh, em] = match;
    return { start: `${sh.padStart(2, '0')}:${sm}`, end: `${eh.padStart(2, '0')}:${em}` };
  });
  return ranges.every((r) => r !== null) ? (ranges as { start: string; end: string }[]) : null;
}

function generateICS(rehearsals: Rehearsal[], locale: string): string {
  const events = rehearsals
    .flatMap((rehearsal) => {
      const summaryText =
        (locale === 'de' ? rehearsal.notes_de : rehearsal.notes_en)
        ?? rehearsal.notes ?? '';
      const summary = `Polyphonia – ${summaryText}`;
      const uid = `${rehearsal.date}-${summaryText.replace(/\s/g, '-').toLowerCase()}@polyphonia.ch`;

      // Timed events: a single VEVENT from the first start to the last end
      if (rehearsal.time) {
        const ranges = parseTimeRanges(rehearsal.time) ?? [{ start: '12:00', end: '13:00' }];
        return [
          buildEvent({
            uid,
            dtstart: formatICSDate(rehearsal.date, ranges[0].start),
            dtend: formatICSDate(rehearsal.date, ranges[ranges.length - 1].end),
            allDay: false,
            summary,
            location: rehearsal.location,
          }),
        ];
      }

      let dtstart: string;
      let dtend: string;

      if (rehearsal.date_end) {
        const end = new Date(rehearsal.date_end);
        end.setDate(end.getDate() + 1);
        const endStr = end.toISOString().split('T')[0];
        dtstart = formatICSDate(rehearsal.date);
        dtend = formatICSDate(endStr);
      } else {
        const end = new Date(rehearsal.date);
        end.setDate(end.getDate() + 1);
        const endStr = end.toISOString().split('T')[0];
        dtstart = formatICSDate(rehearsal.date);
        dtend = formatICSDate(endStr);
      }

      return [buildEvent({ uid, dtstart, dtend, allDay: true, summary, location: rehearsal.location })];
    })
    .join('\r\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Polyphonia Zürich//Rehearsal Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Polyphonia Rehearsals',
    'X-WR-TIMEZONE:Europe/Zurich',
    events,
    'END:VCALENDAR',
  ].join('\r\n');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  const sectionParam = searchParams.get("section");
  const section: PlayerSection = VALID_SECTIONS.includes(sectionParam as PlayerSection)
    ? (sectionParam as PlayerSection)
    : "all";

  const filters = getFiltersForSection(section);

  // filter rehearsals by type
  const filteredRehearsals = (rehearsalsData as Rehearsal[]).filter((r) =>
    filters.includes(r.section)
  );

  const ics = generateICS(filteredRehearsals, locale);

  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="polyphonia-rehearsals.ics"',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}

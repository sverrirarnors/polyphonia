export interface Rehearsal {
  date: string; // ISO date string, e.g. "2025-11-03"
  date_end?: string; // ISO date string, e.g. "2025-11-05"; This turns the entry into a multi-day event and gets rendered as such in the ICS file.
  time: string; // e.g. "18:30–21:00"
  time_de?: string; // German time/date display for multi-day events
  time_en?: string; // English time/date display for multi-day events
  location: string; // e.g. "Community Hall"
  repertoire?: string; // e.g. "Beethoven Symphony No. 5"
  notes?: string; // optional fallback
  notes_de?: string; // German notes
  notes_en?: string; // English notes
  highlight?: boolean; // special events like trips
}

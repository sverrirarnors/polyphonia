// types/index.ts
export interface Rehearsal {
  date: string;       // ISO date string, e.g. "2025-11-03"
  date_end?: string;  // ISO date string, e.g. "2025-11-05"; This turns the entry into a multi-day event and gets rendered as such in the ICS file.
  time: string;       // e.g. "18:30-21:00"
  time_de?: string;   // German time/date display for multi-day events
  time_en?: string;   // English time/date display for multi-day events
  location: string;   // e.g. "Community Hall"
  notes?: string;     // optional fallback
  notes_de?: string;  // German notes
  notes_en?: string;  // English notes
  section: "tutti" | "winds" | "strings" | "woodwinds" | "brass";
  highlight?: boolean; // special events like trips
}
export type RehearsalFilter = "tutti" | "strings" | "woodwinds" | "winds" | "brass";

export type PlayerSection = "all" | "strings" | "woodwinds" | "brass";

/** Maps a player's section to all rehearsal types they need to attend */
export function getFiltersForSection(section: PlayerSection): RehearsalFilter[] {
  switch (section) {
    case "strings":
      return ["tutti", "strings"];
    case "woodwinds":
      return ["tutti", "winds", "woodwinds"];
    case "brass":
      return ["tutti", "winds", "brass"];
    case "all":
    default:
      return ["tutti", "strings", "winds", "woodwinds", "brass"];
  }
}


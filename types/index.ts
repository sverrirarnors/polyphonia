export interface Rehearsal {
  date: string;       // ISO date string, e.g. "2025-11-03"
  time: string;       // e.g. "18:30–21:00"
  location: string;   // e.g. "Community Hall"
  repertoire: string; // e.g. "Beethoven Symphony No. 5"
  register: "Tutti" | "Brass" | "Woodwind" | "Strings" | "";   // e.g. Tutti Rehearsal
  notes?: string;      // some remarks
}

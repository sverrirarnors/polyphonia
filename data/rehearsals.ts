// Define the shape of a rehearsal entry
import { Rehearsal } from "@/types";
//TODO: Maybe put a adress aswell
/* 
 * IMPORTANT use ISO standards for time and dates in particular. NO spaces
 */

export const rehearsals: Rehearsal[] = [
  {
    date: '2025-10-03',
    time: '19:00-20:00',
    location: 'Aki Hirschengraben 86, 8001 Zürich',
    repertoire: 'Borodin: Polovtsian Dances',
    notes: ''
  },

  {
    date: '2025-11-05',
    time: '20:00-22:00',
    location: 'Aki Hirschengraben 86, 8001 Zürich',
    repertoire: 'Borodin: Polovtsian Dances',
    notes: 'Tutti Rehearsal'
  },
  {
    date: '2025-11-12',
    time: '19:00-22:00',
    location: 'Aki',
    repertoire: 'Bruch: Kol Nidrei',
    notes: 'Strings focus'
  },
  {
    date: '2025-11-19',
    time: '19:00-22:00',
    location: 'Aki',
    repertoire: 'Kalinnikov: Symphony No. 1',
    notes: 'Full orchestra'
  },
  {
    date: '2025-11-26',
    time: '19:00-22:00',
    location: 'Aki',
    repertoire: 'Full program run-through',
    notes: 'Tutti rehearsal'
  },
  {
    date: '2025-12-03',
    time: '19:00-22:00',
    location: 'Aki',
    repertoire: 'Full program',
    notes: 'Final touches'
  },
  {
    date: '2025-10-12',
    time: '19:00-22:00',
    location: 'Kirche Neumünster',
    repertoire: 'Full Program (duh)',
    notes: 'Concert',

  },
  {
    date: '2025-12-10',
    time: 'tba',
    location: 'Kirche Neumünster',
    repertoire: 'General rehearsal',
    notes: 'In concert venue'
  },
  {
    date: "2025-10-15",
    time: "19:00-21:00",
    location: "Main Hall, City Arts Center",
    repertoire: "Mozart Requiem (full run)",
    notes: "Dress rehearsal — wear concert attire.",
  },
  {
    date: "2025-10-22",
    time: "19:00-21:00",
    location: "Community Hall",
    repertoire: "Beethoven Symphony No. 7, movements 1–2",
  },
  {
    date: "2025-11-05",
    time: "18:30-21:00",
    location: "St. Mary's Church",
    repertoire: "Brahms German Requiem",
    notes: "Sectional with choir and strings.",
  },
  {
    date: "2025-11-12",
    time: "19:00-21:30",
    location: "City Arts Center",
    repertoire: "Mahler Symphony No. 1",
  },
  {
    date: "2025-11-03",
    time: "18:00-21:00",
    location: "Aki",
    repertoire: "Bruch Kol Nidrei",
  }
];


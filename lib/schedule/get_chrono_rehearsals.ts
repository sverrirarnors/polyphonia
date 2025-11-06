// lib/schedule/getChronoRehearsals.ts
import { rehearsals } from "@/data/rehearsals";

export function get_chrono_rehearsals() {
  const now = new Date();

  const getDateTime = (rehearsal: { date: string; time: string }) => {
    const startTime = rehearsal.time.trim().split("–")[0];
    return new Date(`${rehearsal.date}T${startTime}`).getTime();
  }
  let past = rehearsals.filter(a => {
    const b = new Date(`${a.date}`);
    return b < now;
  });
  let future = rehearsals.filter(a => {
    const  b = new Date(`${a.date}`);
    return b >= now;
  });

  future = future.sort((a, b) => getDateTime(a) - getDateTime(b));
  past = past.sort((a, b) => getDateTime(a) - getDateTime(b));
  const sorted = future.concat(past);

  return sorted;
}


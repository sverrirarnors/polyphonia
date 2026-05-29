// lib/schedule
import { Rehearsal } from "@/types/index";
import type { RehearsalFilter } from "@/types/index";
import rehearsalsData from "@/content/schedule/rehearsals.json";

export function get_rehearsals(): Rehearsal[] {
  return rehearsalsData as Rehearsal[];
}

export function get_chrono_rehearsals() {

  const now = new Date()
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1); // subtract 1 day; we want to display all events that happen today as well.

  const rehearsals = get_rehearsals();

  const getDateTime = (rehearsal: { date: string; time: string }) => {
    const startTime = rehearsal.time.trim().split("–")[0];
    return new Date(`${rehearsal.date}T${startTime}`).getTime();
  }
  let past = rehearsals.filter(a => {
    const b = new Date(`${a.date}`);
    return b < yesterday;
  });
  let future = rehearsals.filter(a => {
    const b = new Date(`${a.date}`);
    return b >= yesterday;
  });

  future = future.sort((a, b) => getDateTime(a) - getDateTime(b));
  past = past.sort((a, b) => getDateTime(b) - getDateTime(a));
  const sorted = future.concat(past);

  return sorted;
}

/* return true, if rehearsal.section belongs to filters */
function fil(rehearsal: Rehearsal, filters: RehearsalFilter[]) {
  for (const f of filters) {
    if (rehearsal.section === f) {
      return true
    }
  }
  return false;
}
export function filter_rehearsals(rehearsals: Rehearsal[], filters: RehearsalFilter[]) {
  return rehearsals.filter(
    r => fil(r, filters)
  );
}

export function get_grouped_rehearsals(
  rehearsals: Rehearsal[],
  locale: string
): Record<string, Rehearsal[]> {
  return rehearsals.reduce((acc, rehearsal) => {
    const date = new Date(rehearsal.date);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1); // subtract 1 day

    // this is a very ugly fix to distinguish between past and current months
    // be at the end & make them opaque of course this is very susceptible to trimming
    // I bet this is gonna haunt somebody in the feature...
    // ... shit it is probably gonna be me, right? right.
    // It wasn't you, it was me...

    let t = "";
    if (date < yesterday) t = " ";

    let monthKey = date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
    });

    monthKey += t;

    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(rehearsal);

    return acc;
  }, {} as Record<string, Rehearsal[]>);
}

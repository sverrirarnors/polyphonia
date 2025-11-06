// lib/schedule/groupRehearsals.ts
import { Rehearsal } from "@/types/index"; // adjust if you have a type file

/* TODO: Past rehearsals should be at the end (independent 
 * of the months) Also maybe here something breaks with the 
 * chronological order.
 *
*/
export function get_grouped_rehearsals(
  rehearsals: Rehearsal[],
  locale: string
): Record<string, Rehearsal[]> {
  return rehearsals.reduce((acc, rehearsal) => {
    const date = new Date(rehearsal.date);
    const monthKey = date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
    });

    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(rehearsal);

    return acc;
  }, {} as Record<string, Rehearsal[]>);
}

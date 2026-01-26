// lib/schedule
import { Rehearsal } from "@/types/index";
import fs from "fs";
import path from "path";

export function get_rehearsals(): Rehearsal[] {
  const filePath = path.join(process.cwd(), "content/schedule/rehearsals.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export function get_chrono_rehearsals() {
  const now = new Date();
  const rehearsals = get_rehearsals();

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
  past = past.sort((a, b) => getDateTime(b) - getDateTime(a));
  const sorted = future.concat(past);

  return sorted;
}

export function get_grouped_rehearsals(
  rehearsals: Rehearsal[],
  locale: string
): Record<string, Rehearsal[]> {
  return rehearsals.reduce((acc, rehearsal) => {
    const date = new Date(rehearsal.date);
    const now = new Date();

    // this is a very ugly fix to distinguish between past and current months
    // be at the end & make them opaque of course this is very susceptible to trimming
    // I bet this is gonna haunt somebody in the feature... 
    // ... shit it is probably gonna be me, right? right.
    
    let t = "";
    if (date < now) t = " ";

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


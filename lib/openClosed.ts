import type { Hours, DayKey } from "@/types";

const DAY_ORDER: DayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function getCurrentDayKey(): DayKey {
  const d = new Date();
  return DAY_ORDER[d.getDay()] as DayKey;
}

export function isOpenNow(hours: Hours | null): boolean {
  if (!hours) return false;
  const tz = hours.timezone || "Europe/Paris";
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: tz })
  );
  const dayKey = getCurrentDayKey();
  const day = hours[dayKey as keyof Hours];
  if (!day || typeof day !== "object" || day.closed) return false;
  const open = parseTime(day.open);
  const close = parseTime(day.close);
  if (!open || !close) return false;
  const current = now.getHours() * 60 + now.getMinutes();
  if (close > open) return current >= open && current < close;
  return current >= open || current < close;
}

function parseTime(t: string): number | null {
  const [h, m] = t.split(":").map(Number);
  if (isNaN(h)) return null;
  return h * 60 + (isNaN(m as number) ? 0 : (m as number));
}

export function getNextOpening(hours: Hours | null): string | null {
  if (!hours) return null;
  const dayKey = getCurrentDayKey();
  const idx = DAY_ORDER.indexOf(dayKey);
  for (let i = 1; i <= 7; i++) {
    const nextKey = DAY_ORDER[(idx + i) % 7];
    const day = hours[nextKey as keyof Hours];
    if (day && typeof day === "object" && !day.closed && day.open) {
      const dayNames: Record<DayKey, string> = {
        monday: "Lundi",
        tuesday: "Mardi",
        wednesday: "Mercredi",
        thursday: "Jeudi",
        friday: "Vendredi",
        saturday: "Samedi",
        sunday: "Dimanche",
      };
      return `${dayNames[nextKey]} à ${day.open}`;
    }
  }
  return null;
}

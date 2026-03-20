import type { Hours, DayKey } from "@/types";

const DAY_LABELS: Record<DayKey, string> = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
};

const ORDER: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export function HoursSection({ hours }: { hours: Hours | null }) {
  if (!hours) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold text-amber-950 mb-4">Horaires</h2>
      <ul className="space-y-2 bg-amber-50 rounded-xl border border-amber-200 p-6">
        {ORDER.map((key) => {
          const day = hours[key];
          const label = DAY_LABELS[key];
          if (!day || typeof day !== "object") return null;
          const text = day.closed ? "Fermé" : `${day.open} – ${day.close}`;
          return (
            <li key={key} className="flex justify-between">
              <span className="font-medium">{label}</span>
              <span className="text-amber-700">{text}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

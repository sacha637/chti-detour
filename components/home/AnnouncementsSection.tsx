import type { Announcement } from "@/types";

export function AnnouncementsSection({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const active = announcements.filter((a) => a.active);
  if (active.length === 0) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold text-amber-950 mb-4">Annonces</h2>
      <div className="space-y-4">
        {active.map((a) => (
          <div
            key={a.id}
            className="rounded-xl border border-amber-200 bg-amber-50/80 p-4"
          >
            <h3 className="font-semibold text-amber-900">{a.title}</h3>
            <p className="text-amber-800 whitespace-pre-wrap">{a.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

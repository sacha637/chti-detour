import type { Settings } from "@/types";

export function MapEmbed({ settings }: { settings: Settings }) {
  const embedUrl = settings.mapEmbedUrl || buildEmbedFromDirections(settings.mapDirectionsUrl);
  return (
    <section>
      <h2 className="text-2xl font-bold text-amber-950 mb-4">Nous trouver</h2>
      <div className="rounded-xl overflow-hidden border border-amber-200 aspect-video bg-amber-100">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte"
        />
      </div>
      <a
        href={settings.mapDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center mt-4 px-6 py-3 rounded-full bg-amber-600 text-amber-50 font-semibold hover:bg-amber-700 transition"
      >
        Itinéraire
      </a>
    </section>
  );
}

function buildEmbedFromDirections(_url: string): string {
  return "https://www.openstreetmap.org/export/embed.html?bbox=3.52%2C50.35%2C3.56%2C50.37&layer=mapnik&marker=50.36,3.54";
}

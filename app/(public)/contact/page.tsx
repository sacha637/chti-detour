import { getSettings } from "@/lib/firebase/settings";
import { getHours } from "@/lib/firebase/hours";
import { DEFAULT_SETTINGS, DEFAULT_HOURS } from "@/lib/defaults";
import { HoursSection } from "@/components/home/HoursSection";
import { MapEmbed } from "@/components/home/MapEmbed";

export default async function ContactPage() {
  const [settings, hours] = await Promise.all([getSettings(), getHours()]);
  const s = settings ?? DEFAULT_SETTINGS;
  const h = hours ?? DEFAULT_HOURS;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-amber-950 mb-2">Contact</h1>
      <p className="text-amber-700 mb-8">
        Une question, une réservation ? Nous sommes à votre écoute.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <div>
            <h2 className="font-bold text-amber-900 mb-2">Téléphone</h2>
            <a
              href={`tel:${s.phoneE164}`}
              className="text-lg text-amber-800 hover:text-amber-600 underline"
            >
              {s.phone}
            </a>
          </div>
          <div>
            <h2 className="font-bold text-amber-900 mb-2">Email</h2>
            <a
              href={`mailto:${s.email}`}
              className="text-lg text-amber-800 hover:text-amber-600 underline"
            >
              {s.email}
            </a>
          </div>
          <div>
            <h2 className="font-bold text-amber-900 mb-2">Adresse</h2>
            <p className="text-amber-800">
              {s.address}
              <br />
              {s.postalCode} {s.city}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${s.phoneE164}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-amber-600 text-amber-50 font-semibold hover:bg-amber-700 transition"
            >
              Appeler
            </a>
            <a
              href={s.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-amber-600 text-amber-800 font-semibold hover:bg-amber-100 transition"
            >
              Itinéraire
            </a>
            {s.facebookUrl && (
              <a
                href={s.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-amber-600 text-amber-800 font-semibold hover:bg-amber-100 transition"
              >
                Facebook
              </a>
            )}
          </div>
        </div>
        <HoursSection hours={h} />
      </div>

      <MapEmbed settings={s} />
    </div>
  );
}

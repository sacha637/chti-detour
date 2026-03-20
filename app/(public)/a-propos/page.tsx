import Link from "next/link";
import { getSettings } from "@/lib/firebase/settings";
import { DEFAULT_SETTINGS } from "@/lib/defaults";

export default async function AboutPage() {
  const settings = await getSettings();
  const s = settings ?? DEFAULT_SETTINGS;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-amber-950 mb-6">À propos</h1>
      <div className="prose prose-amber max-w-none text-amber-800">
        <p className="text-lg">
          <strong>{s.restaurantName}</strong> {s.tagline && `– ${s.tagline}`}.
        </p>
        <p>
          Installé au cœur de Valenciennes, nous vous accueillons dans une
          ambiance chaleureuse pour déguster une cuisine de bistrot soignée,
          des produits locaux et de saison.
        </p>
        <p>
          Que ce soit pour un déjeuner en terrasse, un dîner en famille ou un
          moment entre amis, notre équipe est là pour vous régaler.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/menu"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-amber-600 text-amber-50 font-semibold hover:bg-amber-700 transition"
        >
          Voir le menu
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-amber-600 text-amber-800 font-semibold hover:bg-amber-100 transition"
        >
          Nous contacter
        </Link>
      </div>
    </div>
  );
}

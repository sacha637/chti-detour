import { getSettings } from "@/lib/firebase/settings";
import { DEFAULT_SETTINGS } from "@/lib/defaults";

export default async function MentionsLegalesPage() {
  const settings = await getSettings();
  const s = settings ?? DEFAULT_SETTINGS;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-amber-950 mb-8">Mentions légales</h1>
      <div className="prose prose-amber max-w-none text-amber-800 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-amber-900">Éditeur</h2>
          <p>
            {s.restaurantName}
            <br />
            {s.address}
            <br />
            {s.postalCode} {s.city}
            <br />
            Tél : {s.phone}
            <br />
            Email : {s.email}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-amber-900">Hébergement</h2>
          <p>
            Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-amber-900">Propriété intellectuelle</h2>
          <p>
            L’ensemble du contenu de ce site (textes, images, structure) est protégé par le droit d’auteur. Toute reproduction sans autorisation est interdite.
          </p>
        </section>
      </div>
    </div>
  );
}

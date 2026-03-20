import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-950 mb-6">Tableau de bord</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/admin/settings" className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 transition">
          <h2 className="font-semibold text-amber-900">Paramètres</h2>
          <p className="text-sm text-amber-700">Nom, contact, carte, réseaux</p>
        </Link>
        <Link href="/admin/hours" className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 transition">
          <h2 className="font-semibold text-amber-900">Horaires</h2>
          <p className="text-sm text-amber-700">Ouverture / fermeture</p>
        </Link>
        <Link href="/admin/menu" className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 transition">
          <h2 className="font-semibold text-amber-900">Menu</h2>
          <p className="text-sm text-amber-700">Catégories et plats</p>
        </Link>
        <Link href="/admin/announcements" className="block p-4 rounded-xl border border-amber-200 bg-white hover:bg-amber-50 transition">
          <h2 className="font-semibold text-amber-900">Annonces</h2>
          <p className="text-sm text-amber-700">Annonces page d'accueil</p>
        </Link>
      </div>
    </div>
  );
}

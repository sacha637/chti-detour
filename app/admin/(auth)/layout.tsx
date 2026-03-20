import Link from "next/link";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminLogout } from "@/components/admin/AdminLogout";

export default async function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-amber-50">
        <header className="bg-amber-900 text-amber-50 border-b border-amber-800">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/admin" className="font-bold">Admin Ch'ti Détour</Link>
            <nav className="flex gap-4">
              <Link href="/admin" className="hover:underline">Dashboard</Link>
              <Link href="/admin/settings" className="hover:underline">Paramètres</Link>
              <Link href="/admin/hours" className="hover:underline">Horaires</Link>
              <Link href="/admin/menu" className="hover:underline">Menu</Link>
              <Link href="/admin/announcements" className="hover:underline">Annonces</Link>
              <AdminLogout />
            </nav>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 py-8">{children}</div>
      </div>
    </AdminGuard>
  );
}

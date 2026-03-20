"use client";

import Link from "next/link";
import type { Settings } from "@/types";

export function Footer({ settings }: { settings: Settings | null }) {
  if (!settings) return null;
  const fullAddress = `${settings.address}, ${settings.postalCode} ${settings.city}`;
  return (
    <footer className="bg-amber-950 text-amber-100 border-t border-amber-800/50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-amber-50 text-lg mb-2">
              {settings.restaurantName}
            </h3>
            <p className="text-amber-200/90">{settings.tagline}</p>
          </div>
          <div>
            <h3 className="font-bold text-amber-50 text-lg mb-2">Contact</h3>
            <p>
              <a
                href={`tel:${settings.phoneE164}`}
                className="hover:text-amber-50 underline"
              >
                {settings.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${settings.email}`}
                className="hover:text-amber-50 underline"
              >
                {settings.email}
              </a>
            </p>
            <p>{fullAddress}</p>
          </div>
          <div>
            <h3 className="font-bold text-amber-50 text-lg mb-2">Liens</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/menu" className="hover:text-amber-50 underline">
                  Voir le menu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-50 underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-amber-50 underline">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-amber-50 underline">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/allergenes" className="hover:text-amber-50 underline">
                  Allergènes
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-amber-800/50 text-center text-amber-200/80 text-sm">
          © {new Date().getFullYear()} {settings.restaurantName}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Settings } from "@/types";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Menu" },
  { href: "/contact", label: "Contact" },
  { href: "/a-propos", label: "À propos" },
];

export function Header({ settings }: { settings: Settings | null }) {
  const name = settings?.restaurantName ?? "Ch'ti Détour";
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-amber-950/95 backdrop-blur border-b border-amber-800/50"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-amber-50 tracking-tight">
          {name}
        </Link>
        <nav className="flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-amber-100 hover:text-amber-50 font-medium transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}

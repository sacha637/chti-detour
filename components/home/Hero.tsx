"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Settings } from "@/types";

export function Hero({ settings }: { settings: Settings | null }) {
  const title = settings?.heroTitle ?? "Bienvenue au Ch'ti Détour";
  const subtitle = settings?.heroSubtitle ?? "Bistrot & restauration à Valenciennes";
  const imageUrl = settings?.heroImageUrl;

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-amber-950">
      {imageUrl ? (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-amber-950/60" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/80 to-amber-950" />
      )}
      <div className="relative z-10 text-center px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-50 mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl text-amber-100/90 mb-8"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/menu"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-amber-500 text-amber-950 font-semibold hover:bg-amber-400 transition"
          >
            Voir le menu
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-amber-200 text-amber-50 font-semibold hover:bg-amber-200/10 transition"
          >
            Nous contacter
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

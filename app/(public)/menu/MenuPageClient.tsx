"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuCategory, MenuItem } from "@/types";

export function MenuPageClient({
  categories: initialCategories,
  items: initialItems,
}: {
  categories: MenuCategory[];
  items: MenuItem[];
}) {
  const [search, setSearch] = useState("");
  const itemsByCategory = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    for (const item of initialItems) {
      const list = map.get(item.categoryId) ?? [];
      list.push(item);
      map.set(item.categoryId, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.order - b.order);
    }
    return map;
  }, [initialItems]);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return initialCategories;
    const q = search.toLowerCase();
    return initialCategories.filter((cat) => {
      const catItems = itemsByCategory.get(cat.id) ?? [];
      const matchCategory =
        cat.name.toLowerCase().includes(q) ||
        (cat.description?.toLowerCase().includes(q) ?? false);
      const matchItem = catItems.some(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q)
      );
      return matchCategory || matchItem;
    });
  }, [initialCategories, search, itemsByCategory]);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return itemsByCategory;
    const q = search.toLowerCase();
    const next = new Map<string, MenuItem[]>();
    for (const [catId, list] of itemsByCategory) {
      const filtered = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q)
      );
      if (filtered.length) next.set(catId, filtered);
    }
    return next;
  }, [search, itemsByCategory]);

  const categoriesToShow = search.trim() ? filteredCategories : initialCategories;
  const itemsToShow = search.trim() ? filteredItems : itemsByCategory;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-amber-950 mb-2">Notre menu</h1>
      <p className="text-amber-700 mb-8">Découvrez nos plats et formules.</p>

      <div className="mb-8">
        <label htmlFor="menu-search" className="sr-only">
          Rechercher dans le menu
        </label>
        <input
          id="menu-search"
          type="search"
          placeholder="Rechercher un plat ou une catégorie…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white text-amber-950 placeholder-amber-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>

      <div className="space-y-12">
        <AnimatePresence mode="wait">
          {categoriesToShow.map((cat, idx) => {
            const catItems = itemsToShow.get(cat.id) ?? [];
            if (catItems.length === 0) return null;
            return (
              <motion.section
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <h2 className="text-xl font-bold text-amber-900 border-b border-amber-200 pb-2 mb-4">
                  {cat.name}
                </h2>
                {cat.description && (
                  <p className="text-amber-700 text-sm mb-4">{cat.description}</p>
                )}
                <ul className="space-y-4">
                  {catItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 items-start rounded-lg border border-amber-100 bg-white p-4"
                    >
                      {item.imageUrl && (
                        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-amber-100">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-amber-950">
                            {item.name}
                          </span>
                          {item.isHighlight && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                              Du moment
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-amber-700 text-sm mt-1">
                            {item.description}
                          </p>
                        )}
                        <p className="text-amber-800 font-medium mt-1">
                          {item.price}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.section>
            );
          })}
        </AnimatePresence>
      </div>

      {categoriesToShow.length === 0 && (
        <p className="text-amber-600 text-center py-8">
          Aucun résultat pour « {search} ».
        </p>
      )}
    </div>
  );
}

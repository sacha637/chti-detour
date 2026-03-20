"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getMenuCategories,
  getMenuItems,
  saveMenuCategory,
  saveMenuItem,
  deleteMenuCategory,
  deleteMenuItem,
} from "@/lib/firebase/menu";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { MenuCategory, MenuItem } from "@/types";

export default function AdminMenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  function load() {
    getMenuCategories().then(setCategories);
    getMenuItems().then((data) => {
      setItems(data.map((item) => normalizeMenuItemLocal(item)));
      setLoading(false);
    });
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSaveCategory(cat: MenuCategory) {
    setSaving(cat.id);
    try {
      await saveMenuCategory(cat.id, {
        name: cat.name,
        order: cat.order,
        description: cat.description,
      });
      toast.success("Catégorie enregistrée.");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(null);
    }
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm("Supprimer cette catégorie ?")) return;
    try {
      await deleteMenuCategory(id);
      toast.success("Catégorie supprimée.");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleSaveItem(item: MenuItem) {
    setSaving(item.id);
    try {
      const normalized = normalizeMenuItemLocal(item);
      if (!normalized.categoryId) {
        throw new Error("La catégorie du plat est obligatoire.");
      }
      await saveMenuItem(item.id, normalized);
      toast.success("Plat enregistré.");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(null);
    }
  }

  async function handleDeleteItem(id: string) {
    if (!confirm("Supprimer ce plat ?")) return;
    try {
      await deleteMenuItem(id);
      toast.success("Plat supprimé.");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleAddCategory() {
    const name = prompt("Nom de la catégorie");
    if (!name) return;
    const id = `cat-${Date.now()}`;
    try {
      await saveMenuCategory(id, {
        name,
        order: categories.length,
        description: "",
      });
      toast.success("Catégorie ajoutée.");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleAddItem(categoryId: string) {
    const name = prompt("Nom du plat");
    if (!name) return;
    const id = `item-${Date.now()}`;
    const list = items.filter((i) => i.categoryId === categoryId);
    try {
      await saveMenuItem(id, {
        categoryId,
        name,
        description: "",
        price: "",
        priceCents: 0,
        imageUrl: "",
        storagePath: "",
        tags: [],
        allergens: [],
        order: list.length,
        isHighlight: false,
      });
      toast.success("Plat ajouté.");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    }
  }

  if (loading) return <p className="text-amber-700">Chargement…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-950 mb-6">Menu</h1>
      <button
        type="button"
        onClick={handleAddCategory}
        className="mb-6 px-4 py-2 rounded-lg bg-amber-600 text-white font-medium"
      >
        + Ajouter une catégorie
      </button>
      <div className="space-y-8">
        {categories.map((cat) => {
          const catItems = items.filter((i) => i.categoryId === cat.id).sort((a, b) => a.order - b.order);
          return (
            <section key={cat.id} className="border border-amber-200 rounded-xl p-6 bg-white">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <input
                  type="text"
                  value={cat.name}
                  onChange={(e) =>
                    setCategories((c) => c.map((x) => (x.id === cat.id ? { ...x, name: e.target.value } : x)))
                  }
                  className="px-3 py-2 border border-amber-200 rounded-lg flex-1 min-w-[200px]"
                />
                <input
                  type="number"
                  value={cat.order}
                  onChange={(e) =>
                    setCategories((c) => c.map((x) => (x.id === cat.id ? { ...x, order: +e.target.value } : x)))
                  }
                  className="w-20 px-3 py-2 border border-amber-200 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleSaveCategory(categories.find((x) => x.id === cat.id) ?? cat)}
                  disabled={saving === cat.id}
                  className="px-4 py-2 rounded-lg bg-amber-600 text-white text-sm disabled:opacity-50"
                >
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="px-4 py-2 rounded-lg border border-red-300 text-red-700 text-sm"
                >
                  Supprimer
                </button>
              </div>
              <p className="text-sm text-amber-700 mb-4">Plats :</p>
              <ul className="space-y-4">
                {catItems.map((item) => (
                  <li key={item.id} className="flex flex-wrap gap-4 items-start p-4 rounded-lg bg-amber-50/50 border border-amber-100">
                    <ImageUpload
                      prefix="menu"
                      currentUrl={item.imageUrl}
                      onUploaded={(url, storagePath) => {
                        const updated = normalizeMenuItemLocal({ ...item, imageUrl: url, storagePath });
                        setItems((i) => i.map((x) => (x.id === item.id ? updated : x)));
                        handleSaveItem(updated);
                      }}
                      onError={(msg) => toast.error(msg)}
                      className="w-32"
                    />
                    <div className="flex-1 min-w-[200px] space-y-2">
                      <input
                        type="text"
                        placeholder="Nom"
                        value={item.name}
                        onChange={(e) => setItems((i) => i.map((x) => (x.id === item.id ? { ...x, name: e.target.value } : x)))}
                        className="w-full px-3 py-2 border border-amber-200 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Prix"
                        value={item.price}
                        onChange={(e) => setItems((i) => i.map((x) => (x.id === item.id ? normalizeMenuItemLocal({ ...x, price: e.target.value }) : x)))}
                        className="w-full px-3 py-2 border border-amber-200 rounded-lg"
                      />
                      <textarea
                        placeholder="Description"
                        value={item.description ?? ""}
                        onChange={(e) => setItems((i) => i.map((x) => (x.id === item.id ? normalizeMenuItemLocal({ ...x, description: e.target.value }) : x)))}
                        rows={2}
                        className="w-full px-3 py-2 border border-amber-200 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Allergènes (séparés par des virgules)"
                        value={(item.allergens ?? []).join(", ")}
                        onChange={(e) =>
                          setItems((i) =>
                            i.map((x) =>
                              x.id === item.id
                                ? normalizeMenuItemLocal({
                                    ...x,
                                    allergens: e.target.value
                                      .split(",")
                                      .map((v) => v.trim())
                                      .filter(Boolean),
                                  })
                                : x
                            )
                          )
                        }
                        className="w-full px-3 py-2 border border-amber-200 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Tags (séparés par des virgules)"
                        value={(item.tags ?? []).join(", ")}
                        onChange={(e) =>
                          setItems((i) =>
                            i.map((x) =>
                              x.id === item.id
                                ? normalizeMenuItemLocal({
                                    ...x,
                                    tags: e.target.value
                                      .split(",")
                                      .map((v) => v.trim())
                                      .filter(Boolean),
                                  })
                                : x
                            )
                          )
                        }
                        className="w-full px-3 py-2 border border-amber-200 rounded-lg"
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.isHighlight ?? false}
                          onChange={(e) => setItems((i) => i.map((x) => (x.id === item.id ? { ...x, isHighlight: e.target.checked } : x)))}
                        />
                        Produit du moment
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveItem(items.find((x) => x.id === item.id) ?? item)}
                      disabled={saving === item.id}
                      className="px-4 py-2 rounded-lg bg-amber-600 text-white text-sm disabled:opacity-50"
                    >
                      Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className="px-4 py-2 rounded-lg border border-red-300 text-red-700 text-sm"
                    >
                      Suppr.
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleAddItem(cat.id)}
                className="mt-2 text-sm text-amber-700 hover:underline"
              >
                + Ajouter un plat
              </button>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function normalizeMenuItemLocal(item: MenuItem): MenuItem {
  const categoryId = (item.categoryId ?? "").trim();
  const description = (item.description ?? "").trim();
  const imageUrl = (item.imageUrl ?? "").trim();
  const storagePath = (item.storagePath ?? "").trim();
  const tags = Array.isArray(item.tags) ? item.tags.map((v) => v.trim()).filter(Boolean) : [];
  const allergens = Array.isArray(item.allergens)
    ? item.allergens.map((v) => v.trim()).filter(Boolean)
    : [];

  const price = (item.price ?? "").trim();
  const priceCents =
    Number.isFinite(item.priceCents) && Number(item.priceCents) >= 0
      ? Math.round(Number(item.priceCents))
      : parsePriceCentsLocal(price);

  return {
    ...item,
    categoryId,
    description,
    imageUrl,
    storagePath,
    tags,
    allergens,
    price,
    priceCents,
    isHighlight: !!item.isHighlight,
    order: Number.isFinite(item.order) ? item.order : 0,
  };
}

function parsePriceCentsLocal(price: string): number {
  if (!price) return 0;
  const normalized = price.replace(",", ".").replace(/[^\d.]/g, "");
  const amount = Number.parseFloat(normalized);
  if (!Number.isFinite(amount) || amount < 0) return 0;
  return Math.round(amount * 100);
}

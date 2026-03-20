"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAnnouncements,
  saveAnnouncement,
  deleteAnnouncement,
} from "@/lib/firebase/announcements";
import type { Announcement } from "@/types";

export default function AdminAnnouncementsPage() {
  const [list, setList] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  function load() {
    getAnnouncements().then((data) => {
      setList(data);
      setLoading(false);
    });
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(a: Announcement) {
    setSaving(a.id);
    try {
      await saveAnnouncement(a.id, {
        title: a.title,
        content: a.content,
        active: a.active,
        order: a.order,
        createdAt: a.createdAt ?? new Date().toISOString(),
      });
      toast.success("Annonce enregistrée.");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette annonce ?")) return;
    try {
      await deleteAnnouncement(id);
      toast.success("Annonce supprimée.");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    }
  }

  async function handleAdd() {
    const id = `ann-${Date.now()}`;
    try {
      await saveAnnouncement(id, {
        title: "Nouvelle annonce",
        content: "",
        active: false,
        order: list.length,
        createdAt: new Date().toISOString(),
      });
      toast.success("Annonce ajoutée.");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    }
  }

  if (loading) return <p className="text-amber-700">Chargement…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-950 mb-6">Annonces</h1>
      <button
        type="button"
        onClick={handleAdd}
        className="mb-6 px-4 py-2 rounded-lg bg-amber-600 text-white font-medium"
      >
        + Ajouter une annonce
      </button>
      <div className="space-y-6">
        {list.map((a) => (
          <div key={a.id} className="border border-amber-200 rounded-xl p-6 bg-white">
            <div className="flex flex-wrap gap-4 mb-2">
              <input
                type="text"
                value={a.title}
                onChange={(e) => setList((l) => l.map((x) => (x.id === a.id ? { ...x, title: e.target.value } : x)))}
                placeholder="Titre"
                className="flex-1 min-w-[200px] px-3 py-2 border border-amber-200 rounded-lg"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={a.active}
                  onChange={(e) => setList((l) => l.map((x) => (x.id === a.id ? { ...x, active: e.target.checked } : x)))}
                />
                Active
              </label>
              <input
                type="number"
                value={a.order}
                onChange={(e) => setList((l) => l.map((x) => (x.id === a.id ? { ...x, order: +e.target.value } : x)))}
                className="w-20 px-3 py-2 border border-amber-200 rounded-lg"
              />
            </div>
            <textarea
              value={a.content}
              onChange={(e) => setList((l) => l.map((x) => (x.id === a.id ? { ...x, content: e.target.value } : x)))}
              placeholder="Contenu"
              rows={3}
              className="w-full px-3 py-2 border border-amber-200 rounded-lg mb-4"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleSave(list.find((x) => x.id === a.id) ?? a)}
                disabled={saving === a.id}
                className="px-4 py-2 rounded-lg bg-amber-600 text-white text-sm disabled:opacity-50"
              >
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => handleDelete(a.id)}
                className="px-4 py-2 rounded-lg border border-red-300 text-red-700 text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

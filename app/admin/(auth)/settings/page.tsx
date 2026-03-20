"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getSettings, saveSettings } from "@/lib/firebase/settings";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Settings } from "@/types";

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Partial<Settings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSettings().then((data) => {
      if (data) setForm(data);
      setLoading(false);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await saveSettings(form);
      toast.success("Paramètres enregistrés.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-amber-700">Chargement…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-950 mb-6">Paramètres</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">Nom du restaurant</label>
          <input
            type="text"
            value={form.restaurantName ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, restaurantName: e.target.value }))}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">Sous-titre / tagline</label>
          <input
            type="text"
            value={form.tagline ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Téléphone (affiché)</label>
            <input
              type="text"
              value={form.phone ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Téléphone E.164 (liens)</label>
            <input
              type="text"
              placeholder="+33327000000"
              value={form.phoneE164 ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, phoneE164: e.target.value }))}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">Email</label>
          <input
            type="email"
            value={form.email ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">Adresse</label>
          <input
            type="text"
            value={form.address ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Ville</label>
            <input
              type="text"
              value={form.city ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">Code postal</label>
            <input
              type="text"
              value={form.postalCode ?? ""}
              onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
              className="w-full px-4 py-2 border border-amber-200 rounded-lg"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">URL itinéraire (Google Maps)</label>
          <input
            type="url"
            value={form.mapDirectionsUrl ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, mapDirectionsUrl: e.target.value }))}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">URL iframe carte (optionnel)</label>
          <input
            type="url"
            value={form.mapEmbedUrl ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, mapEmbedUrl: e.target.value || undefined }))}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">Facebook</label>
          <input
            type="url"
            value={form.facebookUrl ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, facebookUrl: e.target.value || undefined }))}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">Titre hero</label>
          <input
            type="text"
            value={form.heroTitle ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, heroTitle: e.target.value }))}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">Sous-titre hero</label>
          <input
            type="text"
            value={form.heroSubtitle ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, heroSubtitle: e.target.value }))}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
          />
        </div>
        <ImageUpload
          prefix="hero"
          currentUrl={form.heroImageUrl}
          label="Image hero (accueil)"
          onUploaded={(url) => setForm((f) => ({ ...f, heroImageUrl: url }))}
          onError={(msg) => toast.error(msg)}
        />
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 rounded-lg bg-amber-600 text-white font-medium disabled:opacity-50"
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}

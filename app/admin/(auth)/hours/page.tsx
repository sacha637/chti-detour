"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getHours, saveHours } from "@/lib/firebase/hours";
import type { Hours, DayKey } from "@/types";

const DAYS: { key: DayKey; label: string }[] = [
  { key: "monday", label: "Lundi" },
  { key: "tuesday", label: "Mardi" },
  { key: "wednesday", label: "Mercredi" },
  { key: "thursday", label: "Jeudi" },
  { key: "friday", label: "Vendredi" },
  { key: "saturday", label: "Samedi" },
  { key: "sunday", label: "Dimanche" },
];

export default function AdminHoursPage() {
  const [hours, setHours] = useState<Hours>({ timezone: "Europe/Paris" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getHours().then((data) => {
      if (data) setHours(data);
      setLoading(false);
    });
  }, []);

  function updateDay(key: DayKey, field: "open" | "close" | "closed", value: string | boolean) {
    setHours((h) => {
      const day = (h[key] as { open?: string; close?: string; closed?: boolean }) ?? {};
      const next = { ...h };
      if (field === "closed") {
        (next as Record<string, unknown>)[key] = { ...day, closed: !!value };
      } else {
        (next as Record<string, unknown>)[key] = { ...day, [field]: value, closed: false };
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await saveHours(hours);
      toast.success("Horaires enregistrés.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-amber-700">Chargement…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-950 mb-6">Horaires</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">Fuseau (Europe/Paris)</label>
          <input
            type="text"
            value={hours.timezone ?? "Europe/Paris"}
            onChange={(e) => setHours((h) => ({ ...h, timezone: e.target.value }))}
            className="w-full px-4 py-2 border border-amber-200 rounded-lg"
          />
        </div>
        {DAYS.map(({ key, label }) => {
          const day = hours[key] as { open?: string; close?: string; closed?: boolean } | undefined;
          const closed = day?.closed ?? false;
          return (
            <div key={key} className="flex flex-wrap items-center gap-4 p-4 rounded-lg border border-amber-200 bg-white">
              <span className="font-medium w-24">{label}</span>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={closed}
                  onChange={(e) => updateDay(key, "closed", e.target.checked)}
                />
                Fermé
              </label>
              {!closed && (
                <>
                  <input
                    type="time"
                    value={day?.open ?? ""}
                    onChange={(e) => updateDay(key, "open", e.target.value)}
                    className="px-3 py-2 border border-amber-200 rounded-lg"
                  />
                  <span>–</span>
                  <input
                    type="time"
                    value={day?.close ?? ""}
                    onChange={(e) => updateDay(key, "close", e.target.value)}
                    className="px-3 py-2 border border-amber-200 rounded-lg"
                  />
                </>
              )}
            </div>
          );
        })}
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

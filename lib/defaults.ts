import type { Settings, Hours } from "@/types";

export type DayHours = {
  open: string;
  close: string;
  closed?: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  restaurantName: "Ch'ti Détour",
  tagline: "Bistrot & restauration – Valenciennes",
  phone: "03 27 00 00 00",
  phoneE164: "+33327000000",
  email: "contact@chtidetour.fr",
  address: "Place du marché",
  city: "Valenciennes",
  postalCode: "59300",
  mapDirectionsUrl: "https://www.google.com/maps/dir//Valenciennes",
  heroTitle: "Bienvenue au Ch'ti Détour",
  heroSubtitle: "Bistrot & restauration à Valenciennes",
};

export const DEFAULT_HOURS: Hours = {
  timezone: "Europe/Paris",
  monday: { open: "12:00", close: "14:00" },
  tuesday: { open: "12:00", close: "14:00" },
  wednesday: { open: "12:00", close: "14:00" },
  thursday: { open: "12:00", close: "14:00" },
  friday: { open: "12:00", close: "14:00" },
  saturday: { open: "", close: "", closed: true },
  sunday: { open: "", close: "", closed: true },
};

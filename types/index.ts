export interface Settings {
  restaurantName: string;
  tagline?: string;
  phone: string;
  phoneE164: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  mapEmbedUrl?: string;
  mapDirectionsUrl: string;
  facebookUrl?: string;
  heroImageUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}

export interface DayHours {
  open: string;
  close: string;
  closed?: boolean;
}

export interface Hours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
  timezone?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  order: number;
  description?: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: string;
  priceCents?: number;
  imageUrl?: string;
  storagePath?: string;
  isHighlight?: boolean;
  order: number;
  allergens?: string[];
  tags?: string[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  active: boolean;
  order: number;
  createdAt: string;
}

export type DayKey = keyof Omit<Hours, "timezone">;

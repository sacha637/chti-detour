import Link from "next/link";
import { getSettings } from "@/lib/firebase/settings";
import { getHours } from "@/lib/firebase/hours";
import { getMenuItems } from "@/lib/firebase/menu";
import { getAnnouncements } from "@/lib/firebase/announcements";
import { Hero } from "@/components/home/Hero";
import { OpenClosedWidget } from "@/components/home/OpenClosedWidget";
import { DEFAULT_SETTINGS, DEFAULT_HOURS } from "@/lib/defaults";
import { HoursSection } from "@/components/home/HoursSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AnnouncementsSection } from "@/components/home/AnnouncementsSection";
import { MapEmbed } from "@/components/home/MapEmbed";
import { PublicLayout } from "@/components/layout/PublicLayout";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export default async function HomePage() {
  const [settings, hours, items, announcements] = await Promise.all([
    getSettings(),
    getHours(),
    getMenuItems(),
    getAnnouncements(),
  ]);
  const s = settings ?? DEFAULT_SETTINGS;
  const h = hours ?? DEFAULT_HOURS;
  const featured = (items ?? []).filter((i) => i.isHighlight).slice(0, 6);

  return (
    <PublicLayout baseUrl={BASE_URL}>
      <Hero settings={s} />
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <section className="grid md:grid-cols-2 gap-8">
          <OpenClosedWidget hours={h} />
          <div className="flex flex-col justify-center">
            <Link
              href={`tel:${s.phoneE164}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-amber-600 text-amber-50 font-semibold hover:bg-amber-700 transition w-fit"
            >
              Appeler
            </Link>
            <Link
              href="/menu"
              className="mt-3 inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-amber-700 text-amber-800 font-semibold hover:bg-amber-100 transition w-fit"
            >
              Voir le menu
            </Link>
          </div>
        </section>

        <FeaturedProducts items={featured} />
        <HoursSection hours={h} />
        <AnnouncementsSection announcements={announcements ?? []} />
        <MapEmbed settings={s} />
      </div>
    </PublicLayout>
  );
}

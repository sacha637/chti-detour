import type { Settings, Hours } from "@/types";

function formatOpeningHours(hours: Hours | null): string[] {
  if (!hours) return [];
  const days: (keyof Hours)[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const labels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  return days
    .filter((d) => d !== "timezone")
    .map((d, i) => {
      const day = hours[d as keyof Hours];
      if (!day || typeof day !== "object" || day.closed) return `${labels[i]} closed`;
      return `${labels[i]} ${day.open}-${day.close}`;
    });
}

export function JsonLdRestaurant({
  settings,
  hours,
  baseUrl,
}: {
  settings: Settings | null;
  hours: Hours | null;
  baseUrl: string;
}) {
  if (!settings) return null;
  const fullAddress = `${settings.address}, ${settings.postalCode} ${settings.city}, France`;
  const openingSpecs = formatOpeningHours(hours)
    .filter((s) => !s.includes("closed"))
    .map((spec) => {
      const [day, range] = spec.split(" ");
      const [opens, closes] = range?.split("-") ?? [];
      return { "@type": "OpeningHoursSpecification", dayOfWeek: day, opens, closes };
    });

  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: settings.restaurantName,
    description: settings.tagline ?? "Bistrot & restauration à Valenciennes",
    url: baseUrl,
    telephone: settings.phoneE164,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: settings.city,
      postalCode: settings.postalCode,
      addressCountry: "FR",
    },
    ...(openingSpecs.length > 0 && { openingHoursSpecification: openingSpecs }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

import { getSettings } from "@/lib/firebase/settings";
import { getHours } from "@/lib/firebase/hours";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { JsonLdRestaurant } from "./JsonLdRestaurant";

export async function PublicLayout({
  children,
  baseUrl,
}: {
  children: React.ReactNode;
  baseUrl: string;
}) {
  const [settings, hours] = await Promise.all([getSettings(), getHours()]);
  return (
    <>
      <JsonLdRestaurant settings={settings} hours={hours} baseUrl={baseUrl} />
      <Header settings={settings} />
      <main className="pt-16 min-h-screen">{children}</main>
      <Footer settings={settings} />
    </>
  );
}

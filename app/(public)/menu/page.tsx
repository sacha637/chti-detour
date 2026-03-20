import { getMenuCategories } from "@/lib/firebase/menu";
import { getMenuItems } from "@/lib/firebase/menu";
import { MenuPageClient } from "./MenuPageClient";

export default async function MenuPage() {
  const [categories, items] = await Promise.all([
    getMenuCategories(),
    getMenuItems(),
  ]);
  return <MenuPageClient categories={categories} items={items} />;
}

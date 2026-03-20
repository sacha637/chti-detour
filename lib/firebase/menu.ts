import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  type Firestore,
} from "firebase/firestore";
import { db } from "./config";
import type { MenuCategory, MenuItem } from "@/types";

const CATEGORIES = "menuCategories";
const ITEMS = "menuItems";

export async function getMenuCategories(
  dbInstance: Firestore = db
): Promise<MenuCategory[]> {
  const ref = collection(dbInstance, CATEGORIES);
  const q = query(ref, orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as MenuCategory));
}

export async function getMenuItems(
  dbInstance: Firestore = db
): Promise<MenuItem[]> {
  const ref = collection(dbInstance, ITEMS);
  const q = query(ref, orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as Partial<MenuItem>;
    return {
      id: d.id,
      categoryId: data.categoryId ?? "",
      name: data.name ?? "",
      description: data.description ?? "",
      price: data.price ?? "",
      priceCents: Number.isFinite(data.priceCents) ? Number(data.priceCents) : 0,
      imageUrl: data.imageUrl ?? "",
      storagePath: data.storagePath ?? "",
      isHighlight: !!data.isHighlight,
      order: Number.isFinite(data.order) ? Number(data.order) : 0,
      allergens: Array.isArray(data.allergens) ? data.allergens : [],
      tags: Array.isArray(data.tags) ? data.tags : [],
    };
  });
}

export async function saveMenuCategory(
  id: string,
  data: Omit<MenuCategory, "id">,
  dbInstance: Firestore = db
): Promise<void> {
  const ref = doc(dbInstance, CATEGORIES, id);
  await setDoc(ref, { ...data, id }, { merge: true });
}

export async function deleteMenuCategory(
  id: string,
  dbInstance: Firestore = db
): Promise<void> {
  await deleteDoc(doc(dbInstance, CATEGORIES, id));
}

export async function saveMenuItem(
  id: string,
  data: Partial<Omit<MenuItem, "id">>,
  dbInstance: Firestore = db
): Promise<void> {
  const ref = doc(dbInstance, ITEMS, id);
  const normalized = normalizeMenuItem(data);
  await setDoc(ref, { ...normalized, id }, { merge: true });
}

export async function deleteMenuItem(
  id: string,
  dbInstance: Firestore = db
): Promise<void> {
  await deleteDoc(doc(dbInstance, ITEMS, id));
}

function normalizeMenuItem(data: Partial<Omit<MenuItem, "id">>): Omit<MenuItem, "id"> {
  const categoryId = (data.categoryId ?? "").trim();
  if (!categoryId) {
    throw new Error("categoryId est obligatoire.");
  }

  const name = (data.name ?? "").trim();
  const description = (data.description ?? "").trim();
  const imageUrl = (data.imageUrl ?? "").trim();
  const storagePath = (data.storagePath ?? "").trim();
  const tags = normalizeStringArray(data.tags);
  const allergens = normalizeStringArray(data.allergens);

  const price = (data.price ?? "").trim();
  const parsedPriceCents = parsePriceCents(price);
  const priceCents =
    Number.isFinite(data.priceCents) && Number(data.priceCents) >= 0
      ? Math.round(Number(data.priceCents))
      : parsedPriceCents;

  return {
    categoryId,
    name,
    description,
    price,
    priceCents,
    imageUrl,
    storagePath,
    isHighlight: !!data.isHighlight,
    order: Number.isFinite(data.order) ? Number(data.order) : 0,
    allergens,
    tags,
  };
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter((v) => v.length > 0);
}

function parsePriceCents(price: string): number {
  if (!price) return 0;
  const normalized = price.replace(",", ".").replace(/[^\d.]/g, "");
  const amount = Number.parseFloat(normalized);
  if (!Number.isFinite(amount) || amount < 0) return 0;
  return Math.round(amount * 100);
}

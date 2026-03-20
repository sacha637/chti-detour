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
import type { Announcement } from "@/types";

const COLLECTION = "announcements";

export async function getAnnouncements(
  dbInstance: Firestore = db
): Promise<Announcement[]> {
  const ref = collection(dbInstance, COLLECTION);
  const q = query(ref, orderBy("order", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate?.()?.toISOString?.() ?? d.data().createdAt,
  })) as Announcement[];
}

export async function saveAnnouncement(
  id: string,
  data: Omit<Announcement, "id">,
  dbInstance: Firestore = db
): Promise<void> {
  const ref = doc(dbInstance, COLLECTION, id);
  await setDoc(ref, { ...data, id }, { merge: true });
}

export async function deleteAnnouncement(
  id: string,
  dbInstance: Firestore = db
): Promise<void> {
  await deleteDoc(doc(dbInstance, COLLECTION, id));
}

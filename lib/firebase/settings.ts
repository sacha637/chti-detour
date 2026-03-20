import {
  doc,
  getDoc,
  setDoc,
  type Firestore,
} from "firebase/firestore";
import { db } from "./config";
import type { Settings } from "@/types";

const SETTINGS_ID = "main";

export async function getSettings(dbInstance: Firestore = db): Promise<Settings | null> {
  const ref = doc(dbInstance, "settings", SETTINGS_ID);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as Settings;
}

export async function saveSettings(
  data: Partial<Settings>,
  dbInstance: Firestore = db
): Promise<void> {
  const ref = doc(dbInstance, "settings", SETTINGS_ID);
  await setDoc(ref, data, { merge: true });
}

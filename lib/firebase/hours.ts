import { doc, getDoc, setDoc, type Firestore } from "firebase/firestore";
import { db } from "./config";
import type { Hours } from "@/types";

const HOURS_ID = "main";

export async function getHours(dbInstance: Firestore = db): Promise<Hours | null> {
  const ref = doc(dbInstance, "hours", HOURS_ID);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as Hours;
}

export async function saveHours(
  data: Hours,
  dbInstance: Firestore = db
): Promise<void> {
  const ref = doc(dbInstance, "hours", HOURS_ID);
  await setDoc(ref, data);
}

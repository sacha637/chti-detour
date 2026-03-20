import { doc, getDoc, type Firestore } from "firebase/firestore";
import { db } from "./config";

export async function isAdmin(uid: string, dbInstance: Firestore = db): Promise<boolean> {
  const ref = doc(dbInstance, "admins", uid);
  const snap = await getDoc(ref);
  return snap.exists();
}

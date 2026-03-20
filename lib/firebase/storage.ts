import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  type StorageReference,
} from "firebase/storage";
import { storage } from "./config";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function validateImageFile(file: File): boolean {
  return ACCEPTED_TYPES.includes(file.type);
}

export async function uploadImage(
  file: File,
  path: string
): Promise<{ url: string; storagePath: string }> {
  if (!validateImageFile(file)) {
    throw new Error("Type de fichier non autorisé. Utilisez image/* (jpeg, png, webp, gif).");
  }
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url, storagePath: path };
}

export async function deleteImage(storagePath: string): Promise<void> {
  const storageRef = ref(storage, storagePath);
  await deleteObject(storageRef);
}

export function getStoragePath(prefix: string, filename: string): string {
  const ext = filename.split(".").pop() || "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  return `${prefix}/${safeName}`;
}

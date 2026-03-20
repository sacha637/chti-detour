"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export function AdminLogout() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleLogout} className="hover:underline">
      Déconnexion
    </button>
  );
}

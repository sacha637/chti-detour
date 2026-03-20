"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">("loading");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }
      const adminSnap = await getDoc(doc(db, "admins", user.uid));
      if (!adminSnap.exists()) {
        setStatus("denied");
        return;
      }
      setStatus("allowed");
    });
    return () => unsub();
  }, [router]);

  if (status === "loading") return <div className="p-8 text-center">Chargement…</div>;
  if (status === "denied") {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 font-semibold">Accès refusé</p>
        <p className="text-amber-800 mt-2">Votre compte est connecté mais n&apos;est pas autorisé dans la collection admins.</p>
      </div>
    );
  }
  return <>{children}</>;
}

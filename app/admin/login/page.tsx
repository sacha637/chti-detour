"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFirebaseLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const adminSnap = await getDoc(doc(db, "admins", cred.user.uid));
      if (!adminSnap.exists()) {
        await signOut(auth);
        throw new Error("Accès refusé");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-amber-200">
        <h1 className="text-2xl font-bold text-amber-950 mb-6">Admin Ch'ti Détour</h1>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <form onSubmit={handleFirebaseLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-amber-200 rounded-lg mb-2" required />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-amber-200 rounded-lg mb-4" required />
          <button type="submit" disabled={loading} className="w-full py-2 rounded-lg bg-amber-600 text-white font-medium disabled:opacity-50">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

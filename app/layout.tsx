import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { FirebaseProvider } from "@/components/providers/FirebaseProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ch'ti Détour – Bistrot & restauration à Valenciennes",
  description: "Ch'ti Détour, bistrot et restauration à Valenciennes. Menu, horaires, contact et réservation.",
  openGraph: {
    title: "Ch'ti Détour – Valenciennes",
    description: "Bistrot & restauration à Valenciennes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-amber-50 text-amber-950 antialiased">
        <FirebaseProvider>
          {children}
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </FirebaseProvider>
      </body>
    </html>
  );
}

import { PublicLayout } from "@/components/layout/PublicLayout";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PublicLayout baseUrl={BASE_URL}>{children}</PublicLayout>;
}

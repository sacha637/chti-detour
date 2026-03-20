import Link from "next/link";
import Image from "next/image";
import type { MenuItem } from "@/types";

export function FeaturedProducts({ items }: { items: MenuItem[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold text-amber-950 mb-4">En avant</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            href="/menu"
            className="block rounded-xl overflow-hidden border border-amber-200 bg-white shadow-sm hover:shadow-md transition"
          >
            {item.imageUrl ? (
              <div className="aspect-video relative bg-amber-100">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ) : (
              <div className="aspect-video bg-amber-200/50 flex items-center justify-center text-amber-700">
                {item.name}
              </div>
            )}
            <div className="p-4">
              <p className="font-semibold text-amber-950">{item.name}</p>
              <p className="text-amber-600">{item.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/menu"
        className="inline-block mt-4 text-amber-700 font-semibold hover:text-amber-900 underline"
      >
        Voir tout le menu →
      </Link>
    </section>
  );
}

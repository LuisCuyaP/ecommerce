import Image from "next/image";
import Link from "next/link";
import { products, type CategorySlug } from "@/data/products";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default function CategoryPage({ params }: { params: { category: CategorySlug } }) {
  const category = params.category;
  if (!["zapatillas", "mochilas"].includes(category)) return notFound();

  const items = products.filter(p => p.category === category);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold capitalize">Todos: {category}</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map(p => (
          <article key={p.id} className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)] p-4">
            <Link href={`/product/${p.slug}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                <Image src={p.image} alt={p.name} fill className="object-contain" />
              </div>
              <div className="mt-3 text-[11px] font-semibold tracking-widest text-slate-500">
                {(p.brand ?? p.category).toUpperCase()}
              </div>
              <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold text-slate-800">
                {p.name}
              </h3>
              <div className="mt-1 text-slate-700">S/ {p.price.toFixed(2)}</div>
            </Link>
            <AddToCartButton
              product={p}
              className="mt-3 w-full rounded-xl bg-violet-600 hover:bg-violet-700"
            />
          </article>
        ))}
      </div>
    </main>
  );
}

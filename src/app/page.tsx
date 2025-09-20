import { products } from "@/data/products";
import Link from "next/link";
import CartButton from "@/components/CartButton";
import AddToCartButton from "@/components/AddToCartButton";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tienda</h1>
        <CartButton />
      </header>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <article key={p.id} className="rounded-2xl border p-4 shadow-sm">
            <Link href={`/product/${p.slug}`} className="block">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <div className="text-gray-600">S/ {p.price.toFixed(2)}</div>
            </Link>
            <AddToCartButton product={p} className="mt-3 w-full" />
          </article>
        ))}
      </div>
    </main>
  );
}

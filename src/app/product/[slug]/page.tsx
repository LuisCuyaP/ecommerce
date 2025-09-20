import Image from "next/image";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);
  if (!product) return notFound();

  const hasVariants = (product.variants && product.variants.length > 0) ?? false;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      {product.description && <p className="mt-2 text-gray-700">{product.description}</p>}

      {/* Si no hay variantes, muestra la vista simple */}
      {!hasVariants ? (
        <section className="mt-6 grid gap-8 md:grid-cols-2">
          {/* <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div> */}
          <div>
            <div className="text-xl">S/ {product.price.toFixed(2)}</div>
            <AddToCartButton product={product}/>
          </div>
        </section>
      ) : (
        <>
          <h2 className="mt-6 text-lg font-semibold">Marcas disponibles</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {product.variants!.map(v => {
              // Producto “sintético” por variante (id único y nombre con marca)
              const variantAsProduct = {
                ...product,
                id: `${product.id}-${v.id}`,
                name: `${product.name} ${v.brand}`,
                price: v.price ?? product.price,
                image: v.image,
              };
              return (
                <article key={v.id} className="rounded-2xl border p-4 shadow-sm">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image src={v.image} alt={`${product.name} ${v.brand}`} fill className="object-cover" />
                  </div>
                  <h3 className="mt-3 text-base font-medium">{v.brand}</h3>
                  <div className="text-gray-600">S/ {(v.price ?? product.price).toFixed(2)}</div>
                  <AddToCartButton product={variantAsProduct}/>
                </article>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}

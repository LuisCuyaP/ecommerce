"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products, type CategorySlug } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";
import CartButton from "@/components/CartButton";

type CategoryDef = {
  slug: CategorySlug;
  title: string;
  hero: string; // /public/banners/...
};

const CATEGORIES: CategoryDef[] = [
  { slug: "zapatillas", title: "Zapatillas", hero: "/banners/zapatillas.jpg" },
  { slug: "mochilas",   title: "Mochilas",   hero: "/banners/mochilas.jpg"   },
];

export default function Home() {
  const [idx, setIdx] = useState(0);
  const current = CATEGORIES[idx];

  const items3 = useMemo(
    () => products.filter(p => p.category === current.slug).slice(0, 3),
    [current.slug]
  );

  const next = () => setIdx((i) => (i + 1) % CATEGORIES.length);
  const prev = () => setIdx((i) => (i - 1 + CATEGORIES.length) % CATEGORIES.length);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">

      {/* HERO / CARRUSEL */}
      <section className="relative overflow-hidden rounded-[24px]">
        <div className="relative h-56 sm:h-64 md:h-72 lg:h-80">
          <Image src={current.hero} alt={current.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />

          {/* Título */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md">
              {current.title}
            </h2>
          </div>

          {/* Flechas moradas */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 sm:px-4">
            <button
              onClick={prev}
              className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-violet-600 text-white shadow hover:bg-violet-700 transition"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={next}
              className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-violet-600 text-white shadow hover:bg-violet-700 transition"
              aria-label="Siguiente"
            >
              →
            </button>
          </div>

          {/* Dots morados */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.slug}
                onClick={() => setIdx(i)}
                aria-label={`Ir a ${c.title}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === idx ? "bg-violet-600" : "bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3 CARDS */}
      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items3.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)] p-4"
          >
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
            </Link>

            <div className="mt-2 flex items-center justify-between">
              <div className="text-slate-700">S/ {p.price.toFixed(2)}</div>
            </div>

            <AddToCartButton
              product={p}
              className="mt-3 w-full rounded-xl bg-violet-600 hover:bg-violet-700"
            />
          </article>
        ))}
      </section>

      {/* Botón “Ver todo” */}
      <div className="mt-6 flex justify-center">
        <Link
          href={`/category/${current.slug}`}
          className="rounded-full bg-violet-600 px-6 py-2.5 text-white font-semibold shadow hover:bg-violet-700 transition"
        >
          Ver todo {current.title}
        </Link>
      </div>
    </main>
  );
}

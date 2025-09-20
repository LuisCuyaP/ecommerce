"use client";
import { addItem } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import type { Product } from "@/data/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(addItem({ product, qty: 1 }))}
      className="rounded-xl bg-black px-4 py-2 text-white"
    >
      Añadir al carrito
    </button>
  );
}

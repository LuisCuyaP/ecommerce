"use client";
import { addItem } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import type { Product } from "@/data/products";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { showToast } from "@/store/uiSlice";


type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  product: Product;
  className?: string;
};

export default function AddToCartButton({ product, className, onClick, ...rest }: Props) {
  const dispatch = useAppDispatch();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    dispatch(addItem({ product, qty: 1 }));
    dispatch(showToast("Ítem agregado al carrito"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-xl px-4 py-2 text-white ${className ?? "bg-black"}`}
      {...rest}
    >
      Añadir al carrito
    </button>
  );
}

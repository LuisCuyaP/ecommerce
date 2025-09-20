"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectTotalItems } from "@/store/cartSlice";
import CartDrawer from "@/components/CartDrawer";

export default function NavCartButton() {
  const total = useAppSelector(selectTotalItems);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir carrito"
        className="relative grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
      >
        {/* Ícono de carrito */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M7 6h14l-1.5 9h-12L5 3H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="10" cy="20" r="1.8" fill="currentColor"/>
          <circle cx="18" cy="20" r="1.8" fill="currentColor"/>
        </svg>

        {/* Badge con total */}
        {total > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-fuchsia-600 px-1 text-[11px] font-bold text-white shadow">
            {total > 99 ? "99+" : total}
          </span>
        )}
      </button>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

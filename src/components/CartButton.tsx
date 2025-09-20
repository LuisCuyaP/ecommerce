"use client";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectTotalItems } from "@/store/cartSlice";
import CartDrawer from "./CartDrawer";

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const total = useAppSelector(selectTotalItems);

  return (
    <>
      <button onClick={() => setOpen(true)} className="rounded-xl border px-4 py-2 hover:bg-gray-50">
        Carrito ({total})
      </button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

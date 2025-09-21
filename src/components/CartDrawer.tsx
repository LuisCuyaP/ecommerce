"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectItems, selectTotalAmount, removeItem, clear } from "@/store/cartSlice";
import Link from "next/link"; 

type Props = { open: boolean; onClose: () => void };

export default function CartDrawer({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const items = useAppSelector(selectItems);
  const total = useAppSelector(selectTotalAmount);
  const dispatch = useAppDispatch();

  // montar portal
  useEffect(() => setMounted(true), []);

  // bloquear scroll del body cuando está abierto (opcional pero recomendado)
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement; // o document.body
    if (open) root.classList.add("overflow-hidden");
    else root.classList.remove("overflow-hidden");
    return () => root.classList.remove("overflow-hidden");
  }, [open, mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      {/* panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-medium">Tu carrito</h2>
          <button onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <div className="max-h-[70vh] overflow-auto p-4">
          {items.length === 0 ? (
            <p className="text-gray-600">Tu carrito está vacío.</p>
          ) : (
            <ul className="space-y-3">
              {items.map(i => (
                <li key={i.product.id} className="flex items-center justify-between rounded-xl border p-3">
                  <div>
                    <div className="font-medium">{i.product.name}</div>
                    <div className="text-sm text-gray-600">
                      {i.qty} × S/ {i.product.price.toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(removeItem(i.product.id))}
                    className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <span>Total</span>
            <strong>S/ {total.toFixed(2)}</strong>
          </div>
          <Link
            href="/checkout"
            onClick={onClose} // 👈 cerramos el drawer al navegar
            className={`mt-3 block w-full rounded-xl bg-black px-4 py-2 text-center text-white hover:bg-gray-900 ${
              items.length === 0 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Ir a pagar
          </Link>
          <button
            className="mt-2 w-full rounded-xl border px-4 py-2 hover:bg-gray-50"
            onClick={() => dispatch(clear())}
          >
            Vaciar carrito
          </button>
        </div>
      </aside>
    </div>,
    document.body
  );
}

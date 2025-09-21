"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { clear } from "@/store/cartSlice";

export default function OrderSuccessPage() {
  const sp = useSearchParams();
  const orderId = sp.get("orderId") ?? "";
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Limpia el carrito al entrar a success
    dispatch(clear());
  }, [dispatch]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
      <p className="mt-2 text-slate-700">
        Hemos registrado tu pedido{orderId ? " " : ""}{orderId && <strong>{orderId}</strong>}.<br />
        Recibirás un correo con el detalle de tu compra.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-violet-600 px-6 py-3 text-white font-semibold hover:bg-violet-700"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
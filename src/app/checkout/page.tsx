"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectItems, selectTotalAmount, clear } from "@/store/cartSlice";
import { useCulqiCheckout } from "@/lib/useCulqi";
import { showToast } from "@/store/uiSlice";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const items = useAppSelector(selectItems);
  const subtotal = useAppSelector(selectTotalAmount);
  const [coupon, setCoupon] = useState("");
  const [email, setEmail] = useState("cliente@correo.com");
  const [loading, setLoading] = useState(false);
  const { ready, open } = useCulqiCheckout();
  const dispatch = useAppDispatch();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const discount =
    coupon.trim().toUpperCase() === "SALE10" ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(subtotal - discount, 0);

  const router = useRouter();
  const toCents = (v: number) => Math.round(Number(v) * 100);

  const handlePay = async () => {
    if (!ready || items.length === 0) return;
    setLoading(true);

    setErrorMsg(null);

    try {
      const amountCents = toCents(total);
      if (amountCents <= 0) throw new Error("Total inválido");

      // 1) Abrir modal Culqi (sandbox) y obtener token
      const tokenId = await open({
        amountCents,
        title: "Mi Tienda",
        description: "Compra en Mi Tienda",
      });
      console.log("Culqi token:", tokenId);

      // 2) 🔹 SIMULACIÓN de backend OK (sin llamar a .NET aún)
      //    Generamos un orderId ficticio:
      //const fakeOrderId = `ORD-${Date.now()}`;

      const simulatedResponse =
        coupon.trim().toUpperCase() === "FAIL"
          ? { ok: false, error: "Pago rechazado por el emisor (simulado)" }
          : { ok: true, orderId: `ORD-${Date.now()}` };

      if (!simulatedResponse.ok) {
        throw new Error(
          simulatedResponse.error || "Error procesando el pago (simulado)"
        );
      }

      // (opcional) intento cerrar el modal si sigue visible
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any)?.Culqi?.close?.();
      } catch {}

      // 3) Redirigir a página de éxito con orderId
      //router.replace(`/order/success?orderId=${encodeURIComponent(fakeOrderId)}`);
      router.replace(
        `/order/success?orderId=${encodeURIComponent(
          simulatedResponse.orderId!
        )}`
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const msg = e?.message ?? "Ocurrió un error al procesar el pago";
      setErrorMsg(msg); // 👈 mostramos banner
      dispatch(showToast("❌ " + msg)); // 👈 toast opcional
      // Nos quedamos en /checkout para reintentar
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)?.Culqi?.close?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Checkout</h1>

      {items.length === 0 ? (
        <p>
          Tu carrito está vacío.{" "}
          <Link href="/" className="text-violet-600 underline">
            Volver a la tienda
          </Link>
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-[1fr_360px]">
          {/* Ítems */}
          <section className="space-y-4">
            {items.map((i) => (
              <div
                key={i.product.id}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-semibold tracking-widest text-slate-500">
                      {(i.product.brand ?? i.product.category).toUpperCase()}
                    </div>
                    <div className="font-medium">{i.product.name}</div>
                    <div className="text-sm text-slate-600">
                      {i.qty} × S/ {i.product.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right font-semibold">
                    S/ {(i.qty * i.product.price).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Resumen */}
          <aside className="rounded-xl border bg-white shadow-sm">
            <div className="rounded-t-xl bg-violet-50 px-4 py-3 text-violet-800 font-semibold">
              Resumen de tu compra
            </div>

            <div className="border-b px-4 py-4 space-y-2">
              <label className="block text-sm">Correo electrónico</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-violet-300"
              />
            </div>

            <div className="border-b px-4 py-4">
              <div className="mb-2 text-sm">Tengo un código de descuento</div>
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Ingresa tu código"
                  className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-violet-300"
                />
                <button className="rounded-xl bg-violet-600 px-4 py-2 text-white hover:bg-violet-700">
                  Aplicar
                </button>
              </div>
            </div>

            <div className="space-y-2 px-4 py-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Descuentos</span>
                <span>
                  {discount ? `- S/ ${discount.toFixed(2)}` : "S/ 0.00"}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-base font-bold">
                <span>Total</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                *El costo de envío se visualizará al completar los datos de
                entrega.
              </p>

              {errorMsg && (
                <div className="mb-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                  {errorMsg}
                </div>
              )}

              <button
                onClick={handlePay}
                disabled={!ready || loading}
                className="mt-4 w-full rounded-full bg-violet-600 px-6 py-3 text-white font-semibold shadow hover:bg-violet-700 disabled:opacity-50"
              >
                {loading ? "Procesando..." : "Finalizar compra"}
              </button>

              <Link
                href="/"
                className="mt-3 block w-full rounded-full border px-6 py-3 text-center hover:bg-slate-50"
              >
                Seguir comprando
              </Link>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}

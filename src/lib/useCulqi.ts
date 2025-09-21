"use client";

import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { Culqi: any; culqi: any; }
}

export function useCulqiCheckout() {
  const [ready, setReady] = useState(false);

  const resolver = useRef<((tokenId: string) => void) | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rejecter = useRef<((err: any) => void) | null>(null);

  // Cargar script v4 una sola vez
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.Culqi) { setReady(true); return; }

    const s = document.createElement("script");
    s.src = "https://checkout.culqi.com/js/v4";
    s.async = true;
    s.onload = () => setReady(true);
    s.onerror = () => setReady(false);
    document.body.appendChild(s);

    return () => { s.remove(); };
  }, []);

  // Handler global exigido por Culqi v4
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.culqi = () => {
      const { Culqi } = window;
      if (Culqi?.token) {
        resolver.current?.(Culqi.token.id);
      } else {
        rejecter.current?.(Culqi?.error ?? { message: "Pago cancelado" });
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => { try { delete (window as any).culqi; } catch {} };
  }, []);

  // Abre el modal y resuelve con tokenId
  const open = useCallback(async ({
    amountCents,
    title = "Mi Tienda",
    description = "Compra en Mi Tienda",
  }: {
    amountCents: number; // en céntimos
    title?: string;
    description?: string;
  }) => {
    if (!ready || typeof window === "undefined" || !window.Culqi) {
      throw new Error("Culqi no está listo");
    }

    const pk = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY;
    if (!pk) throw new Error("Falta NEXT_PUBLIC_CULQI_PUBLIC_KEY");

    // Asegurar entero en céntimos
    const cents = Math.round(Number(amountCents));
    if (!Number.isFinite(cents) || cents <= 0) {
      throw new Error("Monto inválido: amountCents debe ser entero (> 0) en céntimos");
    }

    window.Culqi.publicKey = pk;
    window.Culqi.settings({
      title,
      currency: "PEN",
      amount: cents, // entero en céntimos
      // description no forma parte de settings en v4; se usa en tu backend al crear el cargo
    });
    window.Culqi.options({
      lang: "es",
      installments: false,
      paymentMethods: {
        tarjeta: true,
        yape: false,
        bancaMovil: false,
        agente: false,
        billetera: false,
        cuotealo: false,
      },
      style: { buttonText: "Pagar", priceColor: "#000000" },
    });

    return new Promise<string>((resolve, reject) => {
      resolver.current = resolve;
      rejecter.current = reject;
      try {
        window.Culqi.open();
      } catch (e) {
        reject(e);
      }
    });
  }, [ready]);

  return { ready, open };
}

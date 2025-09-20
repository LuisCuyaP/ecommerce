"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideToast, selectToast } from "@/store/uiSlice";
import { X } from "lucide-react"; // opcional si tienes lucide-react instalado

export default function GlobalToast() {
  const dispatch = useAppDispatch();
  const { visible, message } = useAppSelector(selectToast);

  // Autocerrar después de 2.5s
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => dispatch(hideToast()), 2500);
    return () => clearTimeout(t);
  }, [visible, dispatch]);

  return (
    <div
      className={`fixed bottom-6 left-6 z-[60] transform transition-all duration-300
                  ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start gap-3 rounded-xl bg-violet-600 px-4 py-3 text-white shadow-lg">
        <span className="text-sm font-medium">{message || "Ítem agregado al carrito"}</span>
        <button
          onClick={() => dispatch(hideToast())}
          className="ml-2 inline-flex rounded-md bg-white/10 p-1 hover:bg-white/20"
          aria-label="Cerrar"
        >
          {typeof X === "function" ? <X size={16} /> : "×"}
        </button>
      </div>
    </div>
  );
}

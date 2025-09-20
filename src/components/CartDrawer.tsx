"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectItems, selectTotalAmount, removeItem, clear } from "@/store/cartSlice";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = useAppSelector(selectItems);
  const total = useAppSelector(selectTotalAmount);
  const dispatch = useAppDispatch();

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
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
          <button className="mt-3 w-full rounded-xl bg-black px-4 py-2 text-white" disabled={items.length === 0}
            onClick={() => alert("Checkout (solo front)")}
          >
            Ir a pagar
          </button>
          <button className="mt-2 w-full rounded-xl border px-4 py-2 hover:bg-gray-50" onClick={() => dispatch(clear())}>
            Vaciar carrito
          </button>
        </div>
      </aside>
    </div>
  );
}

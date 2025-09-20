import Link from "next/link";
import NavCartButton from "@/components/NavCartButton";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-900/95 backdrop-blur text-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        {/* Menú / Logo */}
        <button
          aria-label="Abrir menú"
          className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10 transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <Link href="/" className="ml-1 text-sm font-semibold tracking-wide">
          <span className="rounded-md bg-white/10 px-2 py-1">MiTienda</span>
        </Link>

        {/* Acciones derecha */}
        <div className="ml-auto flex items-center gap-2">
          <button
            aria-label="Buscar"
            className="hidden h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-white/20 transition md:grid"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Carrito funcional */}
          <NavCartButton />
        </div>
      </div>
    </nav>
  );
}

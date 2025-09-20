export type CategorySlug = "zapatillas" | "mochilas";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;        // ruta en /public
  description?: string;
  category: CategorySlug;
  brand?: string;
};

export const products: Product[] = [
  // Zapatillas (3+)
  { id: "z1", name: "Zapatillas Running Puma Hombre",  slug: "zapatillas-running-puma",       price: 139.30, image: "/products/zapatillas-runner/shoes01.jpg",   category: "zapatillas", brand: "PUMA" },
  { id: "z2", name: "Zapatillas Running Adidas Hombre",slug: "zapatillas-running-adidas",     price: 109.62, image: "/products/zapatillas-runner/shoes02.jpg", category: "zapatillas", brand: "ADIDAS" },
  { id: "z3", name: "Zapatillas Running Puma Gris",    slug: "zapatillas-running-puma-gris",  price: 139.30, image: "/products/zapatillas-runner/shoes01.jpg",   category: "zapatillas", brand: "PUMA" },

  // Mochilas (3+)
  { id: "m1", name: "Mochila Urbana Negra",            slug: "mochila-urbana-negra",          price:  99.90, image: "/products/zapatillas-runner/shoes01.jpg",   category: "mochilas",   brand: "URBANA" },
  { id: "m2", name: "Mochila Deportiva",               slug: "mochila-deportiva",             price: 119.00, image: "/products/mochilas/mochila-2.jpg",   category: "mochilas",   brand: "SPORT" },
  { id: "m3", name: "Mochila Laptop 15”",              slug: "mochila-laptop-15",             price: 139.00, image: "/products/mochilas/mochila-3.jpg",   category: "mochilas",   brand: "URBANA" },
];

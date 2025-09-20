export type Variant = {
  id: string;        // sku de la variante
  brand: string;     // marca
  image: string;     // ruta en /public
  price?: number;    // opcional, si cambia por marca
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;     // precio base
  //image: string;     // imagen principal (para el listado)
  description?: string;
  variants?: Variant[];
};

export const products: Product[] = [
  {
    id: "1",
    name: "Zapatillas Runner",
    slug: "zapatillas-runner",
    price: 199.9,
    //image: "/products/zapatillas-runner/nike.jpg", // portada (puede ser la primera)
    description: "Modelo para running diario, livianas y resistentes.",
    variants: [
      { id: "nike",   brand: "Nike",   image: "/products/zapatillas-runner/shoes01.jpg",   price: 219.9 },
      { id: "adidas", brand: "Adidas", image: "/products/zapatillas-runner/shoes02.jpg", price: 209.9 },      
    ],
  },
  {
    id: "2",
    name: "Mochila Urbana",
    slug: "mochila-urbana",
    price: 129.0,
    //image: "/products/bag-1.jpg",
  },
];

import "./globals.css";
import Providers from "./providers";
import { ReactNode } from "react";

export const metadata = {
  title: "Ecommerce",
  description: "Frontend MVP con Next.js + Redux",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

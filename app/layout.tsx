import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorldExplorer",
  description: "Portal de consulta de países usando a RestCountries API",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

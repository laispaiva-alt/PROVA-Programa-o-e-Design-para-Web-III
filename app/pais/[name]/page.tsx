import Link from "next/link";
import CountryCard from "@/components/CountryCard";
import { buscarPaisExato, buscarPaises } from "@/lib/countries";

export default async function PaisPage({ params }: { params: { name: string } }) {
  const nome = decodeURIComponent(params.name);
  let paises = await buscarPaisExato(nome);
  if (paises.length === 0) paises = await buscarPaises(nome);
  const country = paises[0];

  return (
    <main>
      <Link href="/">← Voltar</Link>
      {country ? (
        <CountryCard country={country} detailed />
      ) : (
        <p className="erro">País &quot;{nome}&quot; não encontrado.</p>
      )}
    </main>
  );
}

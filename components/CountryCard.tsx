import Link from "next/link";

export type Country = {
  name: { common: string; official: string };
  capital?: string[];
  population: number;
  region: string;
  subregion?: string;
  flag: string;
  flags: { svg: string; png?: string };
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol?: string }>;
  timezones?: string[];
};

type CountryCardProps = {
  country: Country;
  detailed?: boolean; // true = página dedicada (R3), false = resultado da busca (R2)
};

export default function CountryCard({ country, detailed = false }: CountryCardProps) {
  const idiomas = country.languages ? Object.values(country.languages).join(", ") : "—";
  const moedas = country.currencies
    ? Object.values(country.currencies)
        .map((m) => `${m.name}${m.symbol ? ` (${m.symbol})` : ""}`)
        .join(", ")
    : "—";

  return (
    <article className="card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={country.flags.svg}
        alt={`Bandeira de ${country.name.official}`}
        width={120}
      />
      <div>
        <h2>
          {country.flag} {country.name.official}
        </h2>
        <p><strong>Capital:</strong> {country.capital?.[0] ?? "—"}</p>
        <p><strong>População:</strong> {country.population.toLocaleString("pt-BR")}</p>
        <p><strong>Região:</strong> {country.region}</p>

        {detailed ? (
          <>
            <p><strong>Sub-região:</strong> {country.subregion ?? "—"}</p>
            <p><strong>Idiomas:</strong> {idiomas}</p>
            <p><strong>Moedas:</strong> {moedas}</p>
            <p><strong>Fusos horários:</strong> {country.timezones?.join(", ") ?? "—"}</p>
          </>
        ) : (
          <Link
            className="link-btn"
            href={`/pais/${encodeURIComponent(country.name.common)}`}
          >
            Ver detalhes →
          </Link>
        )}
      </div>
    </article>
  );
}

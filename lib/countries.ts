import type { Country } from "@/components/CountryCard";

const BASE = process.env.NEXT_PUBLIC_API_URL;
const KEY = process.env.RESTCOUNTRIES_API_KEY;

function texto(v: any): string {
  if (typeof v === "string") return v;
  if (v && typeof v === "object") {
    for (const k of ["english", "name", "common", "english_name"]) {
      const r = texto(v[k]);
      if (r) return r;
    }
  }
  return "";
}

function normalizar(raw: any): Country {
  const langs: any[] = Array.isArray(raw.languages)
    ? raw.languages
    : Object.values(raw.languages ?? {});
  const languages: Record<string, string> = {};
  langs.forEach((l, i) => {
    const nome = texto(l);
    if (nome) languages[String(i)] = nome;
  });

  const curEntries: [string, any][] = Array.isArray(raw.currencies)
    ? raw.currencies.map((c: any, i: number) => [String(c?.code ?? i), c])
    : Object.entries(raw.currencies ?? {});
  const currencies: Record<string, { name: string; symbol?: string }> = {};
  curEntries.forEach(([code, c]) => {
    currencies[code] = { name: texto(c?.name ?? c) || code, symbol: c?.symbol };
  });

  return {
    name: {
      common: raw.names?.common ?? "",
      official: raw.names?.official ?? raw.names?.common ?? "",
    },
    capital: (raw.capitals ?? []).map(texto).filter(Boolean),
    population: Number(raw.population ?? 0),
    region: raw.region ?? "",
    subregion: raw.subregion,
    flag: raw.flag?.emoji ?? "",
    flags: { svg: raw.flag?.url_svg ?? "", png: raw.flag?.url_png },
    languages,
    currencies,
    timezones: raw.timezones ?? [],
  };
}

async function chamar(caminho: string): Promise<Country[]> {
  if (!KEY) throw new Error("RESTCOUNTRIES_API_KEY não configurada no .env.local");
  const res = await fetch(`${BASE}${caminho}`, {
    headers: { Authorization: `Bearer ${KEY}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data?.objects ?? []).map(normalizar);
}

export function buscarPaises(nome: string) {
  return chamar(`/name?q=${encodeURIComponent(nome)}&limit=10`);
}

export function buscarPaisExato(nome: string) {
  return chamar(`/names.common/${encodeURIComponent(nome)}`);
}

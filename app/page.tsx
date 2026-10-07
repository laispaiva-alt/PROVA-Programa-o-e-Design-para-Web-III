"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import CountryCard, { Country } from "@/components/CountryCard";

export default function Home() {
  const [paises, setPaises] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function buscar(nome: string) {
    setLoading(true);
    setErro("");
    setPaises([]);
    try {
      const res = await fetch(`/api/pais?nome=${encodeURIComponent(nome)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.erro ?? "País não encontrado.");
      setPaises(data);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao buscar país.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={`home${paises.length > 0 || erro ? " com-resultado" : ""}`}>
      <h1>🌍 WorldExplorer</h1>
      <p>Pesquise um país.</p>

      <SearchBar onSearch={buscar} loading={loading} />

      {erro && <p className="erro">{erro}</p>}
      {paises.map((p) => (
        <CountryCard key={p.name.official} country={p} />
      ))}

      <p><Link href="/sobre">Sobre</Link></p>
    </main>
  );
}

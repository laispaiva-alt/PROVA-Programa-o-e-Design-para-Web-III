"use client";

import { useState } from "react";

type SearchBarProps = {
  onSearch: (termo: string) => void;
  loading?: boolean;
};

export default function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [termo, setTermo] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const valor = termo.trim();
    if (valor) onSearch(valor);
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite o nome de um país (ex: brazil)"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}

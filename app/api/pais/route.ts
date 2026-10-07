import { NextRequest, NextResponse } from "next/server";
import { buscarPaises } from "@/lib/countries";

export async function GET(req: NextRequest) {
  const nome = req.nextUrl.searchParams.get("nome")?.trim();
  if (!nome) {
    return NextResponse.json({ erro: "Informe o nome do país." }, { status: 400 });
  }
  try {
    const paises = await buscarPaises(nome);
    if (paises.length === 0) {
      return NextResponse.json({ erro: "País não encontrado." }, { status: 404 });
    }
    return NextResponse.json(paises);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erro interno.";
    return NextResponse.json({ erro: msg }, { status: 500 });
  }
}

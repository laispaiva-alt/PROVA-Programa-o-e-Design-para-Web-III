import Link from "next/link";

const aluno = "Laís Silva de Paiva";
const matricula = "______________"; // preencha com a sua matrícula

export default function Sobre() {
  return (
    <main>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 1px 4px rgba(0,0,0,.1)",
        }}
      >
        <h1>Sobre</h1>
        <p><strong>Aluno:</strong> {aluno}</p>
        <p><strong>Matrícula:</strong> {matricula}</p>
        <p><strong>Curso:</strong> Tecnologia em Análise e Desenvolvimento de Sistemas</p>
        <p>
          O WorldExplorer é um portal de consulta de países que consome a RestCountries API
          usando Next.js 14 com App Router.
        </p>
        <Link href="/">← Voltar para a página principal</Link>
      </div>
    </main>
  );
}

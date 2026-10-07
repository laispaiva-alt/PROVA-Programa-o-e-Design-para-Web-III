# WorldExplorer

Portal de consulta de países desenvolvido com **Next.js 14 (App Router)** que consome a
[RestCountries API](https://restcountries.com). Permite buscar um país pelo nome, ver
seus dados básicos e abrir uma página dedicada com detalhes (sub-região, idiomas, moedas e fusos horários).

Disciplina: Programação e Design para Web III — FAETERJ Barra Mansa (2026/1).

## Configurar a variável de ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```
NEXT_PUBLIC_API_URL=https://api.restcountries.com/countries/v5
RESTCOUNTRIES_API_KEY=sua_chave_aqui
```

O arquivo já está no `.gitignore` e não deve ser versionado.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Rotas

- `/` — busca de países
- `/pais/[name]` — detalhes de um país (rota dinâmica)
- `/sobre` — informações do aluno e do projeto

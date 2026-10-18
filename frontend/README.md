# 3D PrintHub — Front-end

Loja online de impressão 3D, feita para a unidade curricular Laboratório de Projeto (CTeSP DWDM, ESTG/P.Porto).
O front-end usa React + Vite, com JavaScript (sem TypeScript).

## Como correr

Dentro da pasta `frontend`:

```bash
npm install
npm run dev
```

## Scripts

| Comando          | O que faz                                          |
| ---------------- | -------------------------------------------------- |
| `npm run dev`    | Abre o site em modo de desenvolvimento             |
| `npm run build`  | Gera a versão final na pasta `dist`                |
| `npm run lint`   | Procura erros no código com o ESLint               |
| `npm run format` | Formata o código da pasta `src` com o Prettier     |

## Estrutura de pastas (`src/`)

| Pasta         | Para que serve                                              |
| ------------- | ----------------------------------------------------------- |
| `components/` | Componentes reutilizáveis (Button, Header, Footer, ...)     |
| `pages/`      | Uma página por ficheiro (HomePage, CartPage, ...)           |
| `layouts/`    | Estruturas comuns a várias páginas                          |
| `services/`   | Chamadas à API do back-end                                  |
| `context/`    | Estado partilhado por todo o site (ex.: carrinho)           |
| `utils/`      | Funções auxiliares (preços, validações)                     |
| `mocks/`      | Dados falsos, só até o back-end estar ligado                |
| `styles/`     | CSS global e variáveis (cores, fontes)                      |
| `assets/`     | Imagens e outros ficheiros estáticos                        |

## Convenções

- Componentes e páginas em **PascalCase**, **um por ficheiro** (`ProductCard.jsx`).
- O CSS de um componente fica ao lado dele, com o mesmo nome (`ProductCard.css`).
- Nomes de variáveis e comentários em português.
- Usar as cores e tamanhos de `styles/variaveis.css`, sem escrever valores à mão.
- Estilo de código (definido no Prettier): aspas duplas e ponto e vírgula.

## Git

- Uma branch por tarefa ou página, com o nome `feature/<descricao>` (ex.: `feature/carrinho`).
- Commits no presente, com um prefixo: `feat:`, `fix:`, `docs:`, `chore:` ou `refactor:`.
- Adicionar os ficheiros pelo nome (`git add src/pages/CartPage.jsx`), nunca `git add .`.
- Antes de abrir o pull request, correr `npm run lint` e confirmar que não há erros.
- Cada pull request é revisto por um colega antes do merge.

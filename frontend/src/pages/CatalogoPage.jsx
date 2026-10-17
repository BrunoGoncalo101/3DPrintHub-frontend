import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import produtos from "../mocks/produtos.js";
import "./CatalogoPage.css";

const categorias = [
  "Todos os Artigos",
  "Suportes & Desk",
  "Miniaturas & Colecionáveis",
  "Peças Técnicas & Robótica",
  "Decoração & Design",
  "Filamentos",
];

export default function CatalogoPage() {
  // Guarda a categoria escolhida; começa em "Todos os Artigos"
  const [categoriaAtiva, setCategoriaAtiva] = useState(categorias[0]);

  // Se for "Todos", mostra tudo; senão, só os produtos dessa categoria
  const produtosVisiveis =
    categoriaAtiva === categorias[0]
      ? produtos
      : produtos.filter((produto) => produto.categoria === categoriaAtiva);

  return (
    <section className="catalogo">
      <p className="catalogo-etiqueta">Catálogo Selecionado</p>
      <h1 className="catalogo-titulo">Modelos e Criações Prontas a Imprimir</h1>

      <div className="catalogo-filtros">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            className={categoria === categoriaAtiva ? "filtro filtro-ativo" : "filtro"}
            onClick={() => setCategoriaAtiva(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      {produtosVisiveis.length === 0 ? (
        <p className="catalogo-vazio">Ainda não há produtos nesta categoria.</p>
      ) : (
        <div className="catalogo-grelha">
          {produtosVisiveis.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </section>
  );
}
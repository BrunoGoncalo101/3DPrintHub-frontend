import { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import produtos from "../mocks/produtos.js";
import "../styles/CatalogoPage.css";

const categorias = [
  "Todos os Artigos",
  "Suportes & Desk",
  "Miniaturas & Colecionáveis",
  "Peças Técnicas & Robótica",
  "Decoração & Design",
  "Filamentos",
];

// É a lista de materiais, tirada dos produtos (não há repetidos)
const materiais = [...new Set(produtos.map((produto) => produto.material))];

//Intervalo preços
const precos = [ 
{ id: "todos", nome: "Qualquer preço", min: 0, max: Infinity},
{ id: "ate15", nome: "Até 15€", min: 0, max: 15},
{ id: "15a30", nome: "15€ a 30€", min: 15, max: 30},
{ id: "mais30", nome: "Mais de 30€", min: 30, max: Infinity},
];

//Normalização, passa tudo para minusculo e sem acentos.
function normalizar(texto){
  return texto
  .toLowerCase()
  .normalize("NFD")
  .replace(/[̀-ͯ]/g, "");
}

export default function CatalogoPage() {
  // Estados das variaveis de filtro
  const [categoriaAtiva, setCategoriaAtiva] = useState(categorias[0]);
  const [pesquisa, setPesquisa] = useState("");
  const [material, setMaterial] = useState("");
  const [precoId, setPrecoId] = useState("todos");
  //Intervalo de preço selecionado, min e max.
  const intervalo = precos.find((p) => p.id === precoId);

  // Agora um produto só aparece se passar em todos os filtros.
  const produtosVisiveis = produtos.filter((produto) => {
  const nome = normalizar(produto.nome);
  const textoPesquisa = normalizar(pesquisa.trim());
  const todasCategorias = categoriaAtiva === categorias[0];

  if (!todasCategorias && produto.categoria !== categoriaAtiva) return false;
  if (!nome.includes(textoPesquisa)) return false;
  if (material !== "" && produto.material !== material) return false;
  if (produto.precoBase < intervalo.min) return false;
  if (produto.precoBase >= intervalo.max) return false;

  return true; // passou em todos os filtros
});

//Limpa filtros e volta para o estado inicial pre definido.
function limparFiltros() {
    setCategoriaAtiva(categorias[0]);
    setPesquisa("");
    setMaterial("");
    setPrecoId("todos");
  }

 return (
    <section className="catalogo">
      <p className="catalogo-etiqueta">Catálogo Selecionado</p>
      <h1 className="catalogo-titulo">Modelos e Criações Prontas a Imprimir</h1>

      <div className="catalogo-barra">
        <input
          type="search"
          className="catalogo-pesquisa"
          placeholder="Pesquisar por nome..."
          aria-label="Pesquisar por nome"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />

        <select
          className="catalogo-select"
          aria-label="Filtrar por material"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        >
          <option value="">Todos os materiais</option>
          {materiais.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          className="catalogo-select"
          aria-label="Filtrar por preço"
          value={precoId}
          onChange={(e) => setPrecoId(e.target.value)}
        >
          {precos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="catalogo-filtros">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            type="button"
            className={
              categoria === categoriaAtiva ? "filtro filtro-ativo" : "filtro"
            }
            onClick={() => setCategoriaAtiva(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      {produtosVisiveis.length === 0 ? (
        <div className="catalogo-vazio">
          <p>Nenhum produto corresponde aos filtros escolhidos.</p>
          <button type="button" className="filtro" onClick={limparFiltros}>
            Limpar filtros
          </button>
        </div>
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
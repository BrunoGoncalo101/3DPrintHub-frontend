import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { get } from "../services/API.js";
import { juntarExtrasProduto } from "../mocks/produtos.js";
import "../styles/CatalogoPage.css";

const TODAS = "Todos os Artigos";

//Intervalo preços
const precos = [
  { id: "todos", nome: "Qualquer preço", min: 0, max: Infinity },
  { id: "ate15", nome: "Até 15€", min: 0, max: 15 },
  { id: "15a30", nome: "15€ a 30€", min: 15, max: 30 },
  { id: "mais30", nome: "Mais de 30€", min: 30, max: Infinity },
];

// Ordenar por:
const ordenacoes = [
  { id: "relevancia", nome: "Ordenar por: Relevância" },
  { id: "preco-asc", nome: "Preço: mais baixo" },
  { id: "preco-desc", nome: "Preço: mais alto" },
  { id: "avaliacao", nome: "Melhor avaliação" },
  { id: "nome", nome: "Nome (A-Z)" },
];

//Devolve uma cópia da lista ordenada, não alteramos a lista original.
function ordenar(lista, ordem) {
  const copia = [...lista];

  if (ordem === "preco-asc") copia.sort((a, b) => a.basePrice - b.basePrice);
  if (ordem === "preco-desc") copia.sort((a, b) => b.basePrice - a.basePrice);
  if (ordem === "avaliacao")
    copia.sort((a, b) => (b.avaliacao || 0) - (a.avaliacao || 0));
  if (ordem === "nome")
    copia.sort((a, b) => a.name.localeCompare(b.name, "pt"));

  return copia;
}

//Normalização, passa tudo para minusculo e sem acentos.
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export default function CatalogoPage() {
  // NOVO (tarefa 92): estados do pedido à API
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Estados das variaveis de filtro
  const [categoriaAtiva, setCategoriaAtiva] = useState(TODAS);
  const [pesquisa, setPesquisa] = useState("");
  const [material, setMaterial] = useState("");
  const [precoId, setPrecoId] = useState("todos");
  const [ordem, setOrdem] = useState("relevancia");

  // Pede produtos e categorias ao back quando a página abre
  useEffect(() => {
    let ativo = true; // evita atualizar a página se o utilizador já saiu dela

    Promise.all([get("/produtos?size=100"), get("/categorias")]) 
      .then(([dados, categoriasApi]) => {
        // Aceita lista simples ou resposta paginada
        const lista = Array.isArray(dados) ? dados : dados.content || [];

        // Junta o nome da categoria a cada produto, a partir do categoryId
        const comCategoria = lista.map((produto) => ({
          ...produto,
          category: categoriasApi.find((c) => c.id === produto.categoryId),
        }));

        if (ativo) setProdutos(comCategoria.map(juntarExtrasProduto));
      })
      .catch((e) => {
        if (ativo) setErro(e.message);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  // Lista de categorias tirada dos produtos (sem repetidos)
  const categorias = [
    TODAS,
    ...new Set(
      produtos.map((produto) => produto.category?.name).filter(Boolean),
    ),
  ];

  // É a lista de materiais, tirada dos produtos (não há repetidos)
  const materiais = [
    ...new Set(produtos.map((produto) => produto.material).filter(Boolean)),
  ];

  //Intervalo de preço selecionado, min e max.
  const intervalo = precos.find((p) => p.id === precoId);

  // Agora um produto só aparece se passar em todos os filtros.
  // Recebe campos da API (name, category.name, basePrice)
  const produtosFiltrados = produtos.filter((produto) => {
    const nome = normalizar(produto.name);
    const textoPesquisa = normalizar(pesquisa.trim());

    if (categoriaAtiva !== TODAS && produto.category?.name !== categoriaAtiva)
      return false;
    if (!nome.includes(textoPesquisa)) return false;
    if (material !== "" && produto.material !== material) return false;
    if (produto.basePrice < intervalo.min) return false;
    if (produto.basePrice >= intervalo.max) return false;

    return true; // passou nos filtros
  });

  // Depois da filtragem ordenamos os produtos.
  const produtosVisiveis = ordenar(produtosFiltrados, ordem);

  //Limpa filtros e volta para o estado inicial pre definido.
  function limparFiltros() {
    setCategoriaAtiva(TODAS);
    setPesquisa("");
    setMaterial("");
    setPrecoId("todos");
    setOrdem("relevancia");
  }

  // Função que escolhe o que aparece por baixo dos filtros
  function mostrarProdutos() {
    if (carregando) {
      return <p className="catalogo-vazio">A carregar...</p>;
    }

    if (erro) {
      return <p className="catalogo-vazio">{erro}</p>;
    }

    if (produtosVisiveis.length === 0) {
      return (
        <div className="catalogo-vazio">
          <p>Nenhum produto corresponde aos filtros escolhidos.</p>
          <button type="button" className="filtro" onClick={limparFiltros}>
            Limpar filtros
          </button>
        </div>
      );
    }

    return (
      <div className="catalogo-grelha">
        {produtosVisiveis.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </div>
    );
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

        <select
          className="catalogo-select"
          aria-label="Ordenar produtos"
          value={ordem}
          onChange={(e) => setOrdem(e.target.value)}
        >
          {ordenacoes.map((o) => (
            <option key={o.id} value={o.id}>
              {o.nome}
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

      {/* "A carregar...", erro, vazio ou grelha */}
      {mostrarProdutos()}
    </section>
  );
}

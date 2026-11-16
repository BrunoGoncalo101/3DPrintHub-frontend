import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { get } from "../services/API.js";
import { juntarExtrasProduto } from "../mocks/produtos.js";
import { juntarExtrasMaterial } from "../mocks/materiais.js";
import { useCarrinho } from "../context/useCarrinho.js";
import { useAuth } from "../context/useAuth.js";
import { QUANTIDADE_MAXIMA } from "../context/CarrinhoContext.js";
import "../styles/ProductPage.css";

// Formata um número como preço em euros (ex.: 19.9 -> "19,90 €")
function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

function DetalheProduto({ produto, materiais, produtos }) {
  const [materialId, setMaterialId] = useState(null);
  const [corId, setCorId] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const { adicionar } = useCarrinho();
  const { autenticado } = useAuth();
  const navigate = useNavigate();
  const [adicionado, setAdicionado] = useState(false);
  const [erroCarrinho, setErroCarrinho] = useState("");

  // O material escolhido decide quais cores aparecem
  const material = materiais.find((m) => m.id === materialId);
  const faltaEscolher = !materialId || !corId;
  const cor = material?.cores.find((c) => c.id === corId);

  // Outros produtos da mesma categoria (no máximo 4), compara pelo ID.
  const relacionados = produtos
    .filter(
      (p) => p.category?.id === produto.category?.id && p.id !== produto.id,
    )
    .slice(0, 4);

  function escolherMaterial(id) {
    setMaterialId(id);
    setCorId(null); //ao mudar de material a cor volta ao inicio
    setAdicionado(false);
  }

  function escolherCor(id) {
    setCorId(id);
    setAdicionado(false);
  }

  function mudarQuantidade(valor) {
    setQuantidade(Math.min(QUANTIDADE_MAXIMA, Math.max(1, valor)));
    setAdicionado(false);
  }

  // Devolve true se o artigo ficou no carrinho (o "Comprar já" usa isto)
  async function adicionarAoCarrinho() {
    if (faltaEscolher) return false; // segurança extra: o botão já está desativado

    setAdicionado(false);
    setErroCarrinho("");

    // O carrinho é de cada cliente, por isso é preciso ter sessão
    if (!autenticado) {
      setErroCarrinho("Inicia sessão para adicionar ao carrinho.");
      return false;
    }

    // A API soma a quantidade se o produto, o material e a cor já estiverem no carrinho
    const erro = await adicionar({
      produtoId: produto.id,
      materialId: material.id,
      corId: cor.id,
      quantidade,
    });

    if (erro) {
      setErroCarrinho(erro);
      return false;
    }
    setAdicionado(true);
    return true;
  }

  // Adiciona ao carrinho e segue logo para o checkout
  async function comprarJa() {
    if (await adicionarAoCarrinho()) navigate("/checkout");
  }

  return (
    <section className="produto">
      {/* Campos da API (category.name, name, imageUrl) */}
      <nav className="produto-caminho">
        <Link to="/">Início</Link> / <span>{produto.category?.name}</span> /{" "}
        <span>{produto.name}</span>
      </nav>

      <div className="produto-topo">
        <div className="produto-galeria">
          <div className="produto-imagem">
            <span className="produto-etiqueta">{produto.material}</span>
            {produto.imageUrl ? (
              <img src={produto.imageUrl} alt={produto.name} />
            ) : (
              <span className="produto-sem-imagem">⬡</span>
            )}
          </div>

          <div className="produto-miniaturas">
            {[1, 2, 3].map((n) => (
              <div key={n} className="produto-miniatura">
                <span>⬡</span>
              </div>
            ))}
          </div>
        </div>

        <div className="produto-info">
          {/* ALTERADO (tarefa 92): category.name e name vêm da API */}
          <p className="produto-categoria">{produto.category?.name}</p>
          <h1>{produto.name}</h1>
          {/* ALTERADO (tarefa 92): a avaliação vem dos mocks, só aparece se existir */}
          {produto.avaliacao && (
            <p className="produto-avaliacao">
              ★ {produto.avaliacao.toFixed(1)}{" "}
              <span>({produto.numAvaliacoes} avaliações verificadas)</span>
            </p>
          )}
          {/* NOVO (tarefa 92): as dimensões vêm da API */}
          {produto.dimensions && (
            <p className="produto-avaliacao">
              Dimensões: <span>{produto.dimensions}</span>
            </p>
          )}

          <p className="produto-preco">
            {formatarPreco(produto.basePrice)}
            <span>IVA incluído (23%)</span>
          </p>
          <p className="produto-descricao">{produto.description}</p>

          {/* ALTERADO (tarefa 92): os materiais vêm da API (m.name) */}
          <p className="produto-titulo-opcao">Material</p>
          <div className="produto-opcoes">
            {materiais.map((m) => (
              <button
                key={m.id}
                type="button"
                className={m.id === materialId ? "opcao opcao-ativa" : "opcao"}
                onClick={() => escolherMaterial(m.id)}
              >
                {m.name}
              </button>
            ))}
          </div>

          <p className="produto-titulo-opcao">Cor</p>
          {material ? (
            <div className="produto-opcoes">
              {material.cores.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={c.id === corId ? "opcao opcao-ativa" : "opcao"}
                  onClick={() => escolherCor(c.id)}
                >
                  {c.nome}
                </button>
              ))}
            </div>
          ) : (
            <p className="produto-aviso">Escolhe primeiro um material.</p>
          )}

          <div className="produto-compra">
            <div className="produto-quantidade">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={() => mudarQuantidade(quantidade - 1)}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max={QUANTIDADE_MAXIMA}
                value={quantidade}
                onChange={(e) => mudarQuantidade(Number(e.target.value) || 1)}
              />
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => mudarQuantidade(quantidade + 1)}
                disabled={quantidade >= QUANTIDADE_MAXIMA}
              >
                +
              </button>
            </div>

            <Button desativado={faltaEscolher} onClick={adicionarAoCarrinho}>
              Adicionar ao carrinho
            </Button>
            <Button
              variante="secundario"
              desativado={faltaEscolher}
              onClick={comprarJa}
            >
              Comprar já
            </Button>
          </div>

          {adicionado && (
            <p className="produto-adicionado" role="status">
              ✓ Adicionado ao carrinho. <Link to="/carrinho">Ver carrinho</Link>
            </p>
          )}

          {erroCarrinho && (
            <p className="produto-aviso" role="alert">
              {erroCarrinho} {!autenticado && <Link to="/login">Entrar</Link>}
            </p>
          )}

          <p className="produto-limite">
            Máximo de {QUANTIDADE_MAXIMA} unidades por artigo.
          </p>
        </div>
      </div>

      {relacionados.length > 0 && (
        <div className="produto-relacionados">
          <h2>Produtos relacionados</h2>
          <p>Outras peças que complementam este modelo</p>
          <div className="produto-relacionados-grelha">
            {relacionados.map((p) => (
              <ProductCard key={p.id} produto={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// Pede à API o produto, os materiais e a lista de produtos
function CarregarProduto({ id }) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  useEffect(() => {
    let ativo = true; // evita atualizar a página se o utilizador já saiu dela

    // Os 3 pedidos vão ao mesmo tempo
    Promise.all([get(`/produtos/${id}`), get("/materiais"), get("/produtos")])
      .then(([produto, materiais, produtos]) => {
        if (!ativo) return;
        // Junta a cada produto e material os extras dos mocks
        setDados({
          produto: juntarExtrasProduto(produto),
          materiais: materiais.map(juntarExtrasMaterial),
          produtos: produtos.map(juntarExtrasProduto),
        });
      })
      .catch((e) => {
        if (!ativo) return;
        if (e.status === 404)
          setNaoEncontrado(true); // o back diz que o produto não existe
        else setErro(e.message);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [id]);

  if (carregando) return <p className="produto-vazio">A carregar...</p>;
  if (naoEncontrado)
    return <p className="produto-vazio">Produto não encontrado.</p>;
  if (erro) return <p className="produto-vazio">{erro}</p>;

  return (
    <DetalheProduto
      produto={dados.produto}
      materiais={dados.materiais}
      produtos={dados.produtos}
    />
  );
}

export default function ProductPage() {
  const { id } = useParams();

  // O id tem de ser um número, senão nem se faz o pedido
  if (!/^\d+$/.test(id)) {
    return <p className="produto-vazio">Produto não encontrado.</p>;
  }

  return <CarregarProduto key={id} id={id} />;
}

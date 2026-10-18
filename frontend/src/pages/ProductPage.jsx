import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import ProductCard from "../components/ProductCard.jsx";
import produtos from "../mocks/produtos.js";
import materiais from "../mocks/materiais.js";
import "./ProductPage.css";

// Formata um número como preço em euros (ex.: 19.9 -> "19,90 €")
function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

function DetalheProduto({ produto }) {
  const [materialId, setMaterialId] = useState(null);
  const [corId, setCorId] = useState(null);
  const [quantidade, setQuantidade] = useState(1);

  // O material escolhido decide quais cores aparecem
  const material = materiais.find((m) => m.id === materialId);
  const faltaEscolher = !materialId || !corId;

  // Outros produtos da mesma categoria (no máximo 4)
  const relacionados = produtos
    .filter((p) => p.categoria === produto.categoria && p.id !== produto.id)
    .slice(0, 4);

  function escolherMaterial(id) {
    setMaterialId(id);
    setCorId(null); // ao mudar de material, a cor volta ao início
  }

  function mudarQuantidade(valor) {
    setQuantidade(Math.max(1, valor)); // nunca abaixo de 1
  }

  return (
    <section className="produto">
      <nav className="produto-caminho">
        <Link to="/">Início</Link> / <span>{produto.categoria}</span> /{" "}
        <span>{produto.nome}</span>
      </nav>

      <div className="produto-topo">
        <div className="produto-galeria">
          <div className="produto-imagem">
            <span className="produto-etiqueta">{produto.material}</span>
            {produto.imagemUrl ? (
              <img src={produto.imagemUrl} alt={produto.nome} />
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
          <p className="produto-categoria">{produto.categoria}</p>
          <h1>{produto.nome}</h1>
          <p className="produto-avaliacao">
            ★ {produto.avaliacao.toFixed(1)}{" "}
            <span>({produto.numAvaliacoes} avaliações verificadas)</span>
          </p>

          <p className="produto-preco">
            {formatarPreco(produto.precoBase)}
            <span>IVA incluído (23%)</span>
          </p>
          <p className="produto-descricao">{produto.descricao}</p>

          <p className="produto-titulo-opcao">Material</p>
          <div className="produto-opcoes">
            {materiais.map((m) => (
              <button
                key={m.id}
                type="button"
                className={m.id === materialId ? "opcao opcao-ativa" : "opcao"}
                onClick={() => escolherMaterial(m.id)}
              >
                {m.nome}
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
                  onClick={() => setCorId(c.id)}
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
                value={quantidade}
                onChange={(e) => mudarQuantidade(Number(e.target.value) || 1)}
              />
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => mudarQuantidade(quantidade + 1)}
              >
                +
              </button>
            </div>

            {/* Por enquanto sem ação real, como pede a tarefa */}
            <Button desativado={faltaEscolher}>Adicionar ao carrinho</Button>
            <Button variante="secundario" desativado={faltaEscolher}>
              Comprar já
            </Button>
          </div>
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

export default function ProductPage() {
  const { id } = useParams();
  const produto = produtos.find((p) => p.id === Number(id));

  if (!produto) {
    return <p className="produto-vazio">Produto não encontrado.</p>;
  }

  // key={id} faz o formulário recomeçar quando passas para outro produto
  return <DetalheProduto key={id} produto={produto} />;
}

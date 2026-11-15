import { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { useCarrinho } from "../context/useCarrinho.js"; 
import "./ProductCard.css";

// Formata um número como preço em euros 
function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

export default function ProductCard({ produto }) {
  const { adicionar } = useCarrinho();
  const [adicionado, setAdicionado] = useState(false);

  // O botão verde desaparece ao fim de 0,5 segundos
  useEffect(() => {
    if (!adicionado) return;
    const temporizador = setTimeout(() => setAdicionado(false), 500);
    return () => clearTimeout(temporizador); // limpa se o cartão sair do ecrã
  }, [adicionado]);

  function adicionarAoCarrinho() {
    adicionar({
      id: `${produto.id}-${produto.material}`,
      tipo: "catalogo",
      origem: "Catálogo oficial",
      sku: null,
      nome: produto.nome,
      etiqueta: produto.material,
      precoUnitario: produto.precoBase,
      quantidade: 1,
      detalhes: [
        { rotulo: "Material", valor: produto.material },
        { rotulo: "Camada", valor: `${produto.alturaCamada}mm` },
      ],
    });
    setAdicionado(true);
  }

  return (
    <article className="cartao-produto">
      <div className="cartao-imagem">
        <span className="cartao-material">{produto.material}</span>

        {produto.imagemUrl ? (
          <img src={produto.imagemUrl} alt={produto.nome} />
        ) : (
          <span className="cartao-sem-imagem">⬡</span>
        )}
      </div>

      <div className="cartao-info">
        <div className="cartao-detalhes">
          <span>★ {produto.avaliacao.toFixed(1)} ({produto.numAvaliacoes})</span>
          <span className="cartao-camada">{produto.alturaCamada.toFixed(2)}mm</span>
        </div>

        <Link to={`/produtos/${produto.id}`} className="cartao-nome">
          {produto.nome}
        </Link>
        <p className="cartao-descricao">{produto.descricao}</p>

        <div className="cartao-rodape">
          <p className="cartao-preco">
            {formatarPreco(produto.precoBase)}
            {produto.precoAntigo && (
              <span className="cartao-preco-antigo">
                {formatarPreco(produto.precoAntigo)}
              </span>
            )}
          </p>

          <button
            type="button"
            className={adicionado ? "cartao-adicionar cartao-adicionado" : "cartao-adicionar"}
            aria-label={adicionado ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
            title={adicionado ? "Adicionado ao carrinho" : "Adicionar ao carrinho"}
            onClick={adicionarAoCarrinho}
          >
            {adicionado ? "✓" : "+"}
          </button>
        </div>
      </div>
    </article>
  );
}

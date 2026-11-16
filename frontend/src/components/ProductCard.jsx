import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCarrinho } from "../context/useCarrinho.js";
import "./ProductCard.css";

// Formata um número como preço em euros
function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

// O produto junta os dados da API (name, description, basePrice, imageUrl, dimensions) com os extras dos mocks (material, avaliacao, alturaCamada, precoAntigo)
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
      nome: produto.name, 
      etiqueta: produto.material,
      precoUnitario: produto.basePrice, 
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
        {produto.imageUrl ? (
          <img src={produto.imageUrl} alt={produto.name} />
        ) : (
          <span className="cartao-sem-imagem">⬡</span>
        )}
      </div>

      <div className="cartao-info">
        {/* Só aparece se o produto tiver extras nos mocks */}
        {produto.avaliacao && (
          <div className="cartao-detalhes">
            <span>★ {produto.avaliacao.toFixed(1)} ({produto.numAvaliacoes})</span>
            <span className="cartao-camada">{produto.alturaCamada.toFixed(2)}mm</span>
          </div>
        )}

        <Link to={`/produtos/${produto.id}`} className="cartao-nome">
          {produto.name}
        </Link>
        <p className="cartao-descricao">{produto.description}</p>

        <div className="cartao-rodape">
          <p className="cartao-preco">
            {formatarPreco(produto.basePrice)}
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

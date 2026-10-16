import { Link } from "react-router-dom";
import "./ProductCard.css";

// Formata um número como preço em euros (ex.: 19.9 -> "19,90 €")
function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

export default function ProductCard({ produto, aoAdicionar }) {
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
            className="cartao-adicionar"
            aria-label="Adicionar ao carrinho"
            onClick={aoAdicionar}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

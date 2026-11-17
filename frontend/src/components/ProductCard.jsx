import { Link, useNavigate } from "react-router-dom";
import "./ProductCard.css";

// Formata um número como preço em euros
function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

// O produto junta os dados da API (name, description, basePrice, imageUrl, dimensions) com os extras dos mocks (material, avaliacao, alturaCamada, precoAntigo)
export default function ProductCard({ produto }) {
  const navigate = useNavigate();
  const urlImagem = produto.imageUrl && !produto.imageUrl.startsWith("http")
  ? `http://localhost:8080${produto.imageUrl}`
  : produto.imageUrl
  
  return (
    <article className="cartao-produto">
      <div className="cartao-imagem">
        <span className="cartao-material">{produto.material}</span>
        {produto.imageUrl ? (
          <img src={urlImagem} alt={produto.name} />
        ) : (
          <span className="cartao-sem-imagem">⬡</span>
        )}
      </div>

      <div className="cartao-info">
        {/* Só aparece se o produto tiver extras nos mocks */}
        {produto.avaliacao && (
          <div className="cartao-detalhes">
            <span>
              ★ {produto.avaliacao.toFixed(1)} ({produto.numAvaliacoes})
            </span>
            <span className="cartao-camada">
              {produto.alturaCamada.toFixed(2)}mm
            </span>
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

          {/* O carrinho precisa de material e cor, que se escolhem na página do produto */}
          <button
            type="button"
            className="cartao-adicionar"
            aria-label="Escolher material e cor"
            title="Escolher material e cor"
            onClick={() => navigate(`/produtos/${produto.id}`)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

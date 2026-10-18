import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import { useCarrinho } from "../context/useCarrinho.js";
import {
  LIMITE_PORTES_GRATIS,
  calcularTotais,
  formatarPreco,
} from "../utils/precos.js";
import "./CartPage.css";

export default function CartPage() {
  const { itens, subtotal, totalItens, remover, mudarQuantidade } =
    useCarrinho();
  const navigate = useNavigate();
  const [cupao, setCupao] = useState("");
  const [avisoCupao, setAvisoCupao] = useState("");

  const { portesGratis, portes, total, iva } = calcularTotais(
    subtotal,
    itens.length > 0,
  );

  function aplicarCupao() {
    // Por enquanto sem ação real: os cupões ainda não existem no back-end
    setAvisoCupao(cupao.trim() ? "Cupões ainda não disponíveis." : "");
  }

  return (
    <section className="carrinho">
      <p className="carrinho-etiqueta">Revisão de artigos &amp; malhas</p>
      <h1>Carrinho de Compras</h1>
      <p className="carrinho-subtitulo">
        {totalItens === 1
          ? "1 artigo configurado e pronto"
          : `${totalItens} artigos configurados e prontos`}{" "}
        para produção aditiva no laboratório do Porto.
      </p>

      {itens.length === 0 ? (
        <div className="carrinho-vazio">
          <p>O carrinho está vazio.</p>
          <Link to="/" className="carrinho-link">
            ← Continuar a explorar ou carregar STL
          </Link>
        </div>
      ) : (
        <div className="carrinho-grelha">
          <div className="carrinho-itens">
            {itens.map((item) => (
              <article key={item.id} className="carrinho-item">
                <div className="carrinho-miniatura">
                  <span>⬡</span>
                  <small>{item.etiqueta}</small>
                </div>

                <div className="carrinho-info">
                  <p className="carrinho-origem">
                    {item.origem}
                    {item.sku && ` · SKU: ${item.sku}`}
                  </p>
                  <h2>{item.nome}</h2>

                  <dl className="carrinho-detalhes">
                    {item.detalhes.map((d) => (
                      <div key={d.rotulo}>
                        <dt>{d.rotulo}:</dt>
                        <dd>{d.valor}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="carrinho-acoes">
                    <button type="button" onClick={() => remover(item.id)}>
                      Remover
                    </button>
                    {/* Ainda sem ação real */}
                    <button type="button" disabled title="Em breve">
                      {item.tipo === "upload"
                        ? "Ver log de fatiamento"
                        : "Ajustar parâmetros"}
                    </button>
                  </div>
                </div>

                <div className="carrinho-preco">
                  <p className="carrinho-valor">
                    {formatarPreco(item.precoUnitario * item.quantidade)}
                  </p>
                  <p className="carrinho-iva">IVA 23% incluído</p>

                  <div className="carrinho-quantidade">
                    <button
                      type="button"
                      aria-label="Diminuir quantidade"
                      onClick={() =>
                        mudarQuantidade(item.id, item.quantidade - 1)
                      }
                    >
                      −
                    </button>
                    <span>{item.quantidade}</span>
                    <button
                      type="button"
                      aria-label="Aumentar quantidade"
                      onClick={() =>
                        mudarQuantidade(item.id, item.quantidade + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <p className="carrinho-validacao">
              ✓ Malhas validadas segundo ISO 2768-m para fabrico sem falhas.
            </p>
            <Link to="/" className="carrinho-link">
              ← Continuar a explorar ou carregar STL
            </Link>
          </div>

          <aside className="carrinho-resumo">
            <h2>Resumo do Pedido</h2>

            <dl className="resumo-linhas">
              <div>
                <dt>Subtotal peças</dt>
                <dd>{formatarPreco(subtotal)}</dd>
              </div>
              <div>
                <dt>Portes CTT Expresso</dt>
                <dd className={portesGratis ? "resumo-gratis" : ""}>
                  {portesGratis
                    ? `Grátis (>${LIMITE_PORTES_GRATIS}€)`
                    : formatarPreco(portes)}
                </dd>
              </div>
              <div>
                <dt>IVA estimado (23%)</dt>
                <dd>{formatarPreco(iva)}</dd>
              </div>
              <div>
                <dt>Tolerância de fabrico</dt>
                <dd>ISO 2768-m</dd>
              </div>
            </dl>

            <div className="resumo-cupao">
              <input
                type="text"
                placeholder="Código cupão ou B2B"
                value={cupao}
                onChange={(e) => setCupao(e.target.value)}
              />
              <button type="button" onClick={aplicarCupao}>
                Aplicar
              </button>
            </div>
            {avisoCupao && <p className="resumo-aviso">{avisoCupao}</p>}

            <div className="resumo-total">
              <span>Total final</span>
              <strong>{formatarPreco(total)}</strong>
            </div>
            <p className="resumo-nota">
              {portesGratis ? "Expedição direta incluída" : "Portes incluídos"}
            </p>

            <Button onClick={() => navigate("/checkout")}>
              Avançar para checkout →
            </Button>

            <p className="resumo-seguranca">
              Encriptação TLS 256-bit · Porto, PT
            </p>
            <div className="resumo-metodos">
              <span>MB WAY</span>
              <span>Multibanco</span>
              <span>Visa / MC</span>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

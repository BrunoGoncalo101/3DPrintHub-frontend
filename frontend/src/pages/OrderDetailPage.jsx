import { Link, useParams } from "react-router-dom";
import { FASES, encomendas } from "../mocks/encomendas.js";
import {
  classeEstado,
  formatarData,
  nomeEstado,
  totaisEncomenda,
} from "../utils/encomendas.js";
import { formatarPreco } from "../utils/precos.js";
import "../styles/OrdersPage.css";

export default function OrderDetailPage() {
  const { numero } = useParams();

  const encomenda = encomendas.find((e) => e.numero === numero);

  if (!encomenda) {
    return (
      <section className="encomendas">
        <h1>Encomenda não encontrada</h1>
        <div className="encomendas-vazio">
          <p>Não existe nenhuma encomenda com a referência {numero}.</p>
          <Link to="/encomendas" className="encomendas-link">
            ← Voltar às minhas encomendas
          </Link>
        </div>
      </section>
    );
  }

  const { subtotal, portesGratis, portes, total, iva } =
    totaisEncomenda(encomenda);

  return (
    <section className="encomendas">
      <Link to="/encomendas" className="encomendas-link">
        ← Voltar às minhas encomendas
      </Link>

      <div className="detalhe-titulo">
        <h1>Encomenda #{encomenda.numero}</h1>
        <span className={`estado ${classeEstado(encomenda)}`}>
          {nomeEstado(encomenda)}
        </span>
      </div>
      <p className="encomendas-subtitulo">
        Feita a {formatarData(encomenda.data)}
      </p>

      <div className="detalhe-cartao">
        <div className="detalhe-cartao-topo">
          <h2>Estado da Encomenda</h2>
          <span className="encomendas-etiqueta">
            {encomenda.cancelada
              ? "Cancelada"
              : `Fase ${encomenda.fase + 1} de ${FASES.length}`}
          </span>
        </div>

        <ol className="fases">
          {FASES.map((nome, indice) => {
            let classe = "fase";
            if (!encomenda.cancelada && indice < encomenda.fase) {
              classe += " fase-feita";
            } else if (!encomenda.cancelada && indice === encomenda.fase) {
              classe += " fase-atual";
            }

            return (
              <li key={nome} className={classe}>
                <span className="fase-bolinha">
                  {!encomenda.cancelada && indice < encomenda.fase
                    ? "✓"
                    : indice + 1}
                </span>
                <span className="fase-nome">{nome}</span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="detalhe-grelha">
        <div className="detalhe-cartao">
          <h2>Artigos</h2>
          <ul className="detalhe-itens">
            {encomenda.itens.map((item) => (
              <li key={item.id}>
                <div>
                  <p className="detalhe-item-nome">{item.nome}</p>
                  <p className="detalhe-item-info">{item.detalhes}</p>
                  <p className="detalhe-item-info">
                    {item.quantidade} × {formatarPreco(item.precoUnitario)}
                  </p>
                </div>
                <strong>
                  {formatarPreco(item.precoUnitario * item.quantidade)}
                </strong>
              </li>
            ))}
          </ul>

          <dl className="detalhe-totais">
            <div>
              <dt>Subtotal peças</dt>
              <dd>{formatarPreco(subtotal)}</dd>
            </div>
            <div>
              <dt>Portes CTT Expresso</dt>
              <dd>{portesGratis ? "Grátis" : formatarPreco(portes)}</dd>
            </div>
            <div>
              <dt>IVA incluído (23%)</dt>
              <dd>{formatarPreco(iva)}</dd>
            </div>
            <div className="detalhe-total-final">
              <dt>Total</dt>
              <dd>{formatarPreco(total)}</dd>
            </div>
          </dl>
        </div>

        <aside className="detalhe-cartao">
          <h2>Entrega &amp; Pagamento</h2>

          <p className="detalhe-rotulo">Morada de entrega</p>
          <p className="detalhe-texto">
            {encomenda.morada.nome}
            <br />
            {encomenda.morada.rua}
            <br />
            {encomenda.morada.codigoPostal} {encomenda.morada.localidade}
          </p>

          <p className="detalhe-rotulo">Pagamento</p>
          <p className="detalhe-texto">
            {encomenda.pagamento.metodo} · {encomenda.pagamento.estado}
          </p>
        </aside>
      </div>
    </section>
  );
}

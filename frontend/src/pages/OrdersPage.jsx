import { Link } from "react-router-dom";
import { encomendas } from "../mocks/encomendas.js";
import {
  classeEstado,
  formatarData,
  nomeEstado,
  totaisEncomenda,
} from "../utils/encomendas.js";
import { formatarPreco } from "../utils/precos.js";
import "../styles/OrdersPage.css";

export default function OrdersPage() {
  return (
    <section className="encomendas">
      <p className="encomendas-etiqueta">Área de cliente</p>
      <h1>As Minhas Encomendas</h1>
      <p className="encomendas-subtitulo">
        {encomendas.length === 1
          ? "1 encomenda"
          : `${encomendas.length} encomendas`}{" "}
        no teu histórico.
      </p>

      {encomendas.length === 0 ? (
        <div className="encomendas-vazio">
          <p>Ainda não fizeste nenhuma encomenda.</p>
          <Link to="/catalogo" className="encomendas-link">
            Explorar o catálogo →
          </Link>
        </div>
      ) : (
        <div className="encomendas-tabela">
          <div className="encomendas-cabecalho">
            <span>Referência</span>
            <span>Data</span>
            <span>Artigos</span>
            <span>Estado</span>
            <span>Total</span>
            <span></span>
          </div>

          {encomendas.map((encomenda) => {
            const { total } = totaisEncomenda(encomenda);
            const totalArtigos = encomenda.itens.reduce(
              (soma, item) => soma + item.quantidade,
              0,
            );

            return (
              <Link
                key={encomenda.numero}
                to={`/encomendas/${encomenda.numero}`}
                className="encomendas-linha"
              >
                <span className="encomendas-numero">#{encomenda.numero}</span>
                <span>{formatarData(encomenda.data)}</span>
                <span>
                  {totalArtigos === 1 ? "1 artigo" : `${totalArtigos} artigos`}
                </span>
                <span className={`estado ${classeEstado(encomenda)}`}>
                  {nomeEstado(encomenda)}
                </span>
                <span className="encomendas-total">{formatarPreco(total)}</span>
                <span className="encomendas-detalhes">Ver detalhes →</span>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

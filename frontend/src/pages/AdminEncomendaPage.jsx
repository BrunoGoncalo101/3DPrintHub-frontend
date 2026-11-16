import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FASES } from "../mocks/encomendas.js";
import { useAdmin } from "../context/useAdmin.js";
import {
  ACOES_ESTADO,
  acaoSugerida,
  aplicarAcao,
  classeEstadoAdmin,
  estadoAdmin,
} from "../utils/admin.js";
import { formatarPreco } from "../utils/precos.js";
import "../styles/Admin.css";

export default function AdminEncomendaPage() {
  const { numero } = useParams();
  const { encomendas, mudarEstado } = useAdmin();
  const encomenda = encomendas.find((e) => e.numero === numero);

  // Opção escolhida (por defeito, a que faz avançar a encomenda)
  const [escolhida, setEscolhida] = useState(null);
  const [notificar, setNotificar] = useState(true);
  const [aviso, setAviso] = useState("");

  if (!encomenda) {
    return (
      <section className="admin">
        <h1>Encomenda não encontrada</h1>
        <p className="admin-vazio">
          Não existe nenhuma encomenda com a referência {numero}.
        </p>
        <Link to="/admin/encomendas" className="admin-voltar">
          ← Voltar à Lista de Encomendas
        </Link>
      </section>
    );
  }

  const sugerida = acaoSugerida(encomenda);
  const idEscolhido = escolhida ?? sugerida?.id ?? null;
  const fechada = encomenda.cancelada || encomenda.fase === FASES.length - 1;

  function guardar() {
    const acao = ACOES_ESTADO.find((a) => a.id === idEscolhido);
    if (!acao) return;
    mudarEstado(encomenda.numero, aplicarAcao(encomenda, acao));
    setEscolhida(null);
    setAviso(
      notificar
        ? "Estado guardado. O cliente seria notificado por email (simulado, ainda não há envio de emails)."
        : "Estado guardado.",
    );
  }

  function descartar() {
    setEscolhida(null);
    setAviso("");
  }

  return (
    <section className="admin">
      <Link to="/admin/encomendas" className="admin-voltar">
        ← Voltar à Lista de Encomendas
      </Link>

      <div className="admin-titulo">
        <div className="admin-titulo-esq">
          <h1>Encomenda #{encomenda.numero}</h1>
          <span className={`admin-estado ${classeEstadoAdmin(encomenda)}`}>
            {estadoAdmin(encomenda)}
          </span>
          <span className="admin-etiqueta">
            {encomenda.tipo} · {encomenda.empresa.split(" · ")[0]}
          </span>
        </div>
        <p className="admin-titulo-dir">
          <span>{encomenda.criadaEm}</span>
          <strong>{formatarPreco(encomenda.valor)}</strong>
        </p>
      </div>

      <div className="admin-cartao">
        <div className="admin-cartao-topo">
          <h2>Fluxo e Alteração de Estado</h2>
          <span className="admin-mono">
            {encomenda.cancelada
              ? "Cancelada"
              : `Fase ${String(encomenda.fase + 1).padStart(2, "0")} de ${String(FASES.length).padStart(2, "0")}`}
          </span>
        </div>

        <ol className="admin-fases">
          {FASES.map((nome, indice) => {
            let classe = "admin-fase";
            if (!encomenda.cancelada && indice < encomenda.fase) {
              classe += " feita";
            } else if (!encomenda.cancelada && indice === encomenda.fase) {
              classe += " atual";
            }
            return (
              <li key={nome} className={classe}>
                <span className="admin-fase-bolinha">
                  {!encomenda.cancelada && indice < encomenda.fase
                    ? "✓"
                    : String(indice + 1).padStart(2, "0")}
                </span>
                <span>
                  {String(indice + 1).padStart(2, "0")} {nome}
                </span>
              </li>
            );
          })}
        </ol>

        {fechada ? (
          <p className="admin-nota">
            {encomenda.cancelada
              ? "Esta encomenda foi cancelada e já não pode mudar de estado."
              : "Esta encomenda já está concluída."}
          </p>
        ) : (
          <>
            <p className="admin-mono admin-rotulo">Definir próxima fase:</p>
            <div className="admin-opcoes">
              {ACOES_ESTADO.map((acao) => {
                // Só se pode avançar, não recuar
                const invalida =
                  acao.fase !== undefined && acao.fase <= encomenda.fase;
                return (
                  <button
                    key={acao.id}
                    type="button"
                    disabled={invalida}
                    className={`admin-opcao ${acao.cancelar ? "perigo" : ""} ${idEscolhido === acao.id ? "ativa" : ""}`}
                    onClick={() => setEscolhida(acao.id)}
                  >
                    {acao.rotulo}
                    <span aria-hidden="true">
                      {idEscolhido === acao.id
                        ? "✓"
                        : acao.cancelar
                          ? "✕"
                          : acao.pendente
                            ? "Ⅱ"
                            : "→"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="admin-guardar">
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={notificar}
                  onChange={(e) => setNotificar(e.target.checked)}
                />
                Notificar cliente por email sobre a atualização
              </label>
              <div className="admin-guardar-botoes">
                <button
                  type="button"
                  className="admin-botao admin-botao-escuro"
                  onClick={descartar}
                >
                  Descartar
                </button>
                <button
                  type="button"
                  className="admin-botao admin-botao-roxo"
                  onClick={guardar}
                  disabled={!idEscolhido}
                >
                  Guardar Novo Estado
                </button>
              </div>
            </div>
          </>
        )}

        {aviso && (
          <p className="admin-aviso" role="status">
            {aviso}
          </p>
        )}
      </div>

      <div className="admin-duas-colunas">
        <div className="admin-cartao">
          <div className="admin-cartao-topo">
            <h2>Cliente &amp; Faturação</h2>
            <span className="admin-etiqueta admin-etiqueta-verde">
              Conta {encomenda.tipo}
            </span>
          </div>
          <div className="admin-dados">
            <div>
              <p className="admin-mono admin-rotulo">Empresa / Contacto</p>
              <p className="admin-forte">{encomenda.empresa.split(" · ")[0]}</p>
              <p>{encomenda.contacto}</p>
              <p>
                <a href={`mailto:${encomenda.email}`} className="admin-link">
                  {encomenda.email}
                </a>
              </p>
              <p className="admin-suave">{encomenda.telefone}</p>
            </div>
            <div>
              <p className="admin-mono admin-rotulo">
                Dados fiscais &amp; pagamento
              </p>
              <p className="admin-forte admin-mono">{encomenda.nif}</p>
              <p>
                Método: <strong>{encomenda.pagamento.metodo}</strong>
              </p>
              <p className="admin-verde admin-mono">
                Ref: {encomenda.pagamento.referencia} ·{" "}
                {encomenda.pagamento.estado}
              </p>
            </div>
          </div>
          <div className="admin-morada">
            <p className="admin-mono admin-rotulo">Morada de entrega</p>
            {encomenda.morada.map((linha) => (
              <p key={linha}>{linha}</p>
            ))}
          </div>
        </div>

        <div className="admin-cartao">
          <div className="admin-cartao-topo">
            <h2>Ficheiro &amp; Fabrico</h2>
            <span className="admin-etiqueta">{encomenda.ficheiro.formato}</span>
          </div>
          <div className="admin-ficheiro-caixa">
            <div>
              <p className="admin-forte">{encomenda.ficheiro.nome}</p>
              <p className="admin-mono admin-suave">
                {encomenda.ficheiro.tamanho} · MD5: {encomenda.ficheiro.md5}
              </p>
            </div>
            <button
              type="button"
              className="admin-botao admin-botao-escuro"
              disabled
              title="Disponível quando houver API de ficheiros"
            >
              ⤓ Descarregar
            </button>
          </div>
          <div className="admin-metricas">
            <div>
              <p className="admin-mono admin-rotulo">Tecnologia</p>
              <p className="admin-forte">{encomenda.tecnologia}</p>
              <p className="admin-suave">{encomenda.material}</p>
            </div>
            <div>
              <p className="admin-mono admin-rotulo">Dimensões</p>
              <p className="admin-forte">{encomenda.ficha.dimensoes}</p>
              <p className="admin-suave">mm</p>
            </div>
            <div>
              <p className="admin-mono admin-rotulo">Volume</p>
              <p className="admin-forte admin-azul">
                {encomenda.ficha.volume} cm³
              </p>
              <p className="admin-suave">{encomenda.ficha.peso}</p>
            </div>
          </div>
          <p className="admin-rodape-cartao admin-mono">
            <span className="admin-verde">
              ● Tolerância: {encomenda.ficha.tolerancia}
            </span>
            <span>{encomenda.ficha.malha}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

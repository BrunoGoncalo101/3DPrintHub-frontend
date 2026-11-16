import { useState } from "react";
import { useAdmin } from "../context/useAdmin.js";
import "../styles/Admin.css";

export default function AdminFicheirosPage() {
  const { ficheiros, decisoes, decidirFicheiro, repor } = useAdmin();
  const [selecionadoId, setSelecionadoId] = useState(null);
  const [vista, setVista] = useState("wireframe");
  const [aRejeitar, setARejeitar] = useState(false);
  const [nota, setNota] = useState("");
  const [aviso, setAviso] = useState("");

  // Se o ficheiro escolhido já foi decidido, passa-se ao primeiro da fila
  const ficheiro =
    ficheiros.find((f) => f.id === selecionadoId) ?? ficheiros[0] ?? null;
  const totalDecididos = Object.keys(decisoes).length;

  function escolher(id) {
    setSelecionadoId(id);
    setARejeitar(false);
    setNota("");
    setAviso("");
  }

  function aceitar() {
    decidirFicheiro(ficheiro.id, { resultado: "aceite" });
    setAviso(`"${ficheiro.nome}" aceite e enviado para fatiamento.`);
    setARejeitar(false);
    setSelecionadoId(null);
  }

  function rejeitar() {
    if (!nota.trim()) return;
    decidirFicheiro(ficheiro.id, { resultado: "rejeitado", nota: nota.trim() });
    setAviso(`"${ficheiro.nome}" devolvido ao cliente com a nota técnica.`);
    setARejeitar(false);
    setNota("");
    setSelecionadoId(null);
  }

  return (
    <section className="admin">
      <div className="admin-topo">
        <div>
          <h1>
            Inspeção e Aprovação de Ficheiros{" "}
            <span className="admin-etiqueta admin-etiqueta-azul">
              {ficheiros.length} Pendentes
            </span>
          </h1>
          <p className="admin-subtitulo">
            Verifique as tolerâncias e confirme a entrada direta para a fila de
            fatiamento ou devolva com nota técnica.
          </p>
        </div>
        <p className="admin-mono admin-azul">
          ⓘ Fila de triagem automatizada (FIFO)
        </p>
      </div>

      {aviso && (
        <p className="admin-aviso" role="status">
          {aviso}
        </p>
      )}

      <div className="admin-ficheiros">
        <aside>
          <p className="admin-fila-topo admin-mono">
            <span>Fila de espera ({ficheiros.length})</span>
            <span>Recebido</span>
          </p>

          {ficheiros.length === 0 ? (
            <p className="admin-vazio">
              Não há ficheiros à espera de aprovação.
              {totalDecididos > 0 && (
                <>
                  {" "}
                  <button
                    type="button"
                    className="admin-link-botao"
                    onClick={repor}
                  >
                    Repor dados de exemplo
                  </button>
                </>
              )}
            </p>
          ) : (
            ficheiros.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`admin-fila-item ${ficheiro?.id === f.id ? "ativo" : ""}`}
                onClick={() => escolher(f.id)}
              >
                <span className="admin-fila-linha">
                  <strong className="admin-mono">
                    {ficheiro?.id === f.id && "● "}
                    {f.nome}
                  </strong>
                  <small>{f.recebido}</small>
                </span>
                <span className="admin-fila-linha admin-suave">
                  <span>{f.cliente}</span>
                  <small>{f.tamanho}</small>
                </span>
                <span className={`admin-sinal admin-sinal-${f.sinal}`}>
                  {f.sinal === "ok" && "✓ "}
                  {f.sinal === "aviso" && "⚠ "}
                  {f.resumo}
                </span>
              </button>
            ))
          )}
        </aside>

        {ficheiro && (
          <div>
            <div className="admin-cartao admin-visualizador">
              <div className="admin-visualizador-topo">
                <p className="admin-mono">
                  <strong>{ficheiro.nome}</strong>{" "}
                  <span className="admin-etiqueta">{ficheiro.norma}</span>
                </p>
                <div className="admin-separadores">
                  {[
                    ["wireframe", "Wireframe"],
                    ["solido", "Sólido"],
                  ].map(([valor, rotulo]) => (
                    <button
                      key={valor}
                      type="button"
                      className={vista === valor ? "ativo" : ""}
                      onClick={() => setVista(valor)}
                    >
                      {rotulo}
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-palco">
                <p className="admin-medidas admin-mono">
                  {ficheiro.dimensoes}
                  <br />
                  Vol: {ficheiro.volume}
                </p>
                <svg
                  viewBox="0 0 200 200"
                  className="admin-modelo"
                  role="img"
                  aria-label="Pré-visualização simplificada do modelo 3D"
                >
                  <polygon
                    points="100,20 169,60 169,140 100,180 31,140 31,60"
                    className={vista === "solido" ? "solido" : "contorno"}
                  />
                  <polyline
                    points="100,20 100,100 169,140 100,100 31,140"
                    className="linhas"
                  />
                  <polyline points="31,60 100,100 169,60" className="linhas" />
                  <circle cx="100" cy="100" r="14" className="miolo" />
                </svg>
                <p className="admin-orientacao admin-mono">
                  ● {ficheiro.orientacao} Giro: {ficheiro.giro}
                </p>
              </div>

              <div className="admin-metricas admin-metricas-4">
                <div>
                  <p className="admin-mono admin-rotulo">Estanqueidade</p>
                  <p className="admin-verde">✓ {ficheiro.estanqueidade}</p>
                </div>
                <div>
                  <p className="admin-mono admin-rotulo">Espessura parede</p>
                  <p className="admin-verde">✓ {ficheiro.parede}</p>
                </div>
                <div>
                  <p className="admin-mono admin-rotulo">Malha geométrica</p>
                  <p className="admin-forte">{ficheiro.faces}</p>
                </div>
                <div>
                  <p className="admin-mono admin-rotulo">Compatibilidade</p>
                  <p className="admin-azul">{ficheiro.compatibilidade}</p>
                </div>
              </div>
            </div>

            <div className="admin-cartao">
              <div className="admin-cartao-topo">
                <h2>☑ DECISÃO TÉCNICA</h2>
                <span className="admin-mono admin-suave">
                  Ficheiro selecionado para ação
                </span>
              </div>

              {aRejeitar ? (
                <div className="admin-rejeitar">
                  <label htmlFor="nota-tecnica">
                    Nota técnica para o cliente (obrigatória)
                  </label>
                  <textarea
                    id="nota-tecnica"
                    rows="3"
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    placeholder="Ex.: a malha tem faces abertas; corrige o modelo e volta a enviar."
                  />
                  <div className="admin-guardar-botoes">
                    <button
                      type="button"
                      className="admin-botao admin-botao-escuro"
                      onClick={() => setARejeitar(false)}
                    >
                      Voltar
                    </button>
                    <button
                      type="button"
                      className="admin-botao admin-botao-perigo"
                      onClick={rejeitar}
                      disabled={!nota.trim()}
                    >
                      Confirmar rejeição
                    </button>
                  </div>
                </div>
              ) : (
                <div className="admin-decisao">
                  <button
                    type="button"
                    className="admin-botao admin-botao-verde"
                    onClick={aceitar}
                  >
                    ✓ Aceitar e Enviar para Fatiamento
                  </button>
                  <button
                    type="button"
                    className="admin-botao admin-botao-escuro admin-vermelho"
                    onClick={() => setARejeitar(true)}
                  >
                    ⊗ Rejeitar Ficheiro...
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

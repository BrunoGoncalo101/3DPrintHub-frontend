import { useState } from "react";
import { Link } from "react-router-dom";
import "./OrcamentoPage.css";

const processos = [
  { id: "FDM", nome: "Extrusão Filamento", desc: "Peças funcionais e prototipagem rápida.", camada: "0.12 - 0.28mm", nivel: "Económico" },
  { id: "SLA", nome: "Fotopolímero Resina", desc: "Superfície lisa e ultra detalhe micro-métrico.", camada: "0.02 - 0.05mm", nivel: "Médio" },
  { id: "SLS", nome: "Sinterização a Laser", desc: "Resistência isotrópica sem suportes.", camada: "0.10 - 0.12mm", nivel: "Industrial" },
];

const materiais = [
  { id: "pla", nome: "PLA Matte Bio-Orgânico", info: "Rigidez elevada · 55°C", preco: 12.8 },
  { id: "petg", nome: "PETG Reforçado", info: "Resistente a químicos · 75°C", preco: 15.2 },
  { id: "abs", nome: "ABS-ESD Técnico", info: "Antiestático · 98°C", preco: 17.5 },
  { id: "pa12", nome: "Nylon PA12 + Fibra de Carbono", info: "6000MPa · 175°C", preco: 18.4 },
];

const cores = [
  { nome: "Preto Técnico", ral: "RAL 9005" },
  { nome: "Cinza Espacial", ral: "RAL 7016" },
  { nome: "Branco Puro", ral: "RAL 9010" },
  { nome: "Laranja Alerta", ral: "RAL 2004" },
];

const camadas = [
  { valor: "0.12 mm", desc: "Ultra-fino / Sem marcas" },
  { valor: "0.16 mm", desc: "Equilíbrio Ótimo DIN" },
  { valor: "0.20 mm", desc: "Rápido / Prototipagem" },
];

const TEMPO_FABRICO = 22.0;

// Formata números como euros: 44,72 €
const euro = (n) =>
  n.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });

function OrcamentoPage() {
  const [processo, setProcesso] = useState("SLS");
  const [materialId, setMaterialId] = useState("pa12");
  const [cor, setCor] = useState(0);
  const [camada, setCamada] = useState(1);
  const [infill, setInfill] = useState(50);
  const [padrao, setPadrao] = useState("Giroide 3D");
  const [quantidade, setQuantidade] = useState(5);
  const [notas, setNotas] = useState("");

  // Cálculo do preço
  const material = materiais.find((m) => m.id === materialId);
  let pct = 0;
  if (quantidade > 20) pct = 0.25;
  else if (quantidade >= 5) pct = 0.1;

  const base = material.preco + TEMPO_FABRICO;
  const desconto = base * pct;
  const subtotal = base - desconto;
  const iva = subtotal * 0.23;
  const total = subtotal + iva;

  return (
    <main className="oc-page">
      <span className="oc-label oc-azul">
        Motor de cálculo aditivo v4.2 <span className="oc-verde">● Servidor Lisboa Online</span>
      </span>

      <div className="oc-topo">
        <div>
          <h1>Orçamento Instantâneo &amp; Análise Paramétrica</h1>
          <p className="oc-suave">
            Configuração de precisão industrial em Portugal com estimativa de custos,
            simulação cinemática de deposição de camada e ficheiro de fabrico certificado.
          </p>
        </div>
        <span className="oc-chip">⏱ Próximo Lote de Impressão: <b>Hoje às 18:30</b></span>
      </div>

      <div className="oc-grid">
        {/* Coluna esquerda */}
        <div>
          {/* 01 */}
          <section className="oc-card">
            <div className="oc-linha oc-label">
              <span>01 // Ficheiro geométrico em análise</span>
              <span className="oc-verde">✓ Geometria Sólida Válida</span>
            </div>
            <div className="oc-ficheiro">
              <div>
                <strong className="oc-mono">braco_robotico.step</strong>{" "}
                <span className="oc-tag">STEP AP242</span>
                <p className="oc-mono oc-suave oc-micro">
                  Vol: 74.2 cm³ · Dim: 110 × 85 × 42 mm · Triângulos: 148.204
                </p>
              </div>
              <Link to="/upload" className="oc-btn-cinza">⇄ Trocar</Link>
            </div>
          </section>

          {/* 02 */}
          <section className="oc-card">
            <div className="oc-linha oc-label">
              <span>02 // Processo aditivo &amp; cinemática</span>
              <span className="oc-azul">Tolerância até ±0.05mm</span>
            </div>
            <div className="oc-opcoes oc-3">
              {processos.map((p) => (
                <div
                  key={p.id}
                  className={`oc-opcao ${processo === p.id ? "sel" : ""}`}
                  onClick={() => setProcesso(p.id)}
                >
                  <span className="oc-label">{p.id}</span>
                  <strong>{p.nome}</strong>
                  <small className="oc-suave">{p.desc}</small>
                  <small className="oc-mono oc-suave">{p.camada} · {p.nivel}</small>
                </div>
              ))}
            </div>
          </section>

          {/* 03 */}
          <section className="oc-card">
            <div className="oc-linha oc-label">
              <span>03 // Polímero de fabrico &amp; especificação</span>
              <a href="#">Consultar Fichas Técnicas (TDS)</a>
            </div>
            <div className="oc-opcoes oc-2">
              {materiais.map((m) => (
                <div
                  key={m.id}
                  className={`oc-opcao ${materialId === m.id ? "sel" : ""}`}
                  onClick={() => setMaterialId(m.id)}
                >
                  <div className="oc-linha">
                    <strong>{m.nome}</strong>
                    <span className="oc-mono">{m.preco.toFixed(2).replace(".", ",")} €/un</span>
                  </div>
                  <small className="oc-mono oc-suave">{m.info}</small>
                </div>
              ))}
            </div>

            <p className="oc-label oc-espaco">Tonalidade industrial do pigmento</p>
            <div className="oc-opcoes oc-4">
              {cores.map((c, i) => (
                <div
                  key={c.ral}
                  className={`oc-opcao ${cor === i ? "sel" : ""}`}
                  onClick={() => setCor(i)}
                >
                  <strong>{c.nome}</strong>
                  <small className="oc-mono oc-suave">{c.ral}</small>
                </div>
              ))}
            </div>
          </section>

          {/* 04 */}
          <section className="oc-card">
            <div className="oc-label">04 // Parâmetros físicos de fabrico</div>
            <div className="oc-linha oc-espaco-topo">
              <h3>Altura de Camada (Z-Resolution)</h3>
              <span className="oc-mono oc-azul oc-micro">{camadas[camada].valor} // Padrão Engenharia</span>
            </div>
            <div className="oc-opcoes oc-3">
              {camadas.map((c, i) => (
                <div
                  key={c.valor}
                  className={`oc-opcao ${camada === i ? "sel" : ""}`}
                  onClick={() => setCamada(i)}
                >
                  <strong className="oc-mono">{c.valor}</strong>
                  <small className="oc-suave">{c.desc}</small>
                </div>
              ))}
            </div>

            <div className="oc-duas">
              <div>
                <div className="oc-linha">
                  <h3>Densidade (Infill)</h3>
                  <span className="oc-mono oc-azul">{infill}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  value={infill}
                  onChange={(e) => setInfill(Number(e.target.value))}
                  className="oc-slider"
                />
                <div className="oc-linha oc-mono oc-suave oc-micro">
                  <span>15% Eco</span><span>30% Rigidez</span><span>50% Estrutural</span><span>100% Sólido</span>
                </div>
              </div>
              <div>
                <h3>Padrão Geométrico Interno</h3>
                <div className="oc-opcoes oc-2">
                  {["Giroide 3D", "Hexagonal Favo"].map((p) => (
                    <div
                      key={p}
                      className={`oc-opcao oc-centro ${padrao === p ? "sel" : ""}`}
                      onClick={() => setPadrao(p)}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 05 */}
          <section className="oc-card">
            <div className="oc-label">05 // Volume de produção &amp; notas de projeto</div>
            <div className="oc-ficheiro">
              <div>
                <strong className="oc-grande">Quantidade de Peças</strong>
                <p className="oc-mono oc-suave oc-micro">
                  Escalonamento por lote: &gt;5 un (-10%) | &gt;20 un (-25%)
                </p>
              </div>
              <div className="oc-qtd">
                <button type="button" onClick={() => quantidade > 1 && setQuantidade(quantidade - 1)}>-</button>
                <strong className="oc-azul">{quantidade}</strong>
                <button type="button" onClick={() => setQuantidade(quantidade + 1)}>+</button>
              </div>
            </div>

            <div className="oc-linha oc-espaco-topo">
              <h3>Instruções Técnicas Especiais</h3>
              <small className="oc-suave">Opcional</small>
            </div>
            <textarea
              rows="4"
              placeholder="Ex: Inserção de 4 roscas M4 em latão pós-impressão; furações com tolerância H7..."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
          </section>
        </div>

        {/* Coluna direita */}
        <aside>
          <div className="oc-card oc-viewport">⬡</div>

          <div className="oc-card">
            <div className="oc-linha">
              <h3>Resumo do Orçamento</h3>
              <small className="oc-suave">Estimativa instantânea</small>
            </div>

            <div className="oc-linha oc-resumo"><span>Custo de Material ({material.nome})</span><strong>{euro(material.preco)}</strong></div>
            <div className="oc-linha oc-resumo"><span>Tempo de Fabrico Estimado (14h 20m)</span><strong>{euro(TEMPO_FABRICO)}</strong></div>
            <div className="oc-linha oc-resumo"><span>Desconto de Volume ({quantidade} un)</span><strong className="oc-verde">-{euro(desconto)}</strong></div>
            <hr />
            <div className="oc-linha oc-resumo"><span>Subtotal Líquido</span><strong>{euro(subtotal)}</strong></div>
            <div className="oc-linha oc-resumo oc-mono oc-suave oc-micro"><span>IVA (23% PT)</span><span>{euro(iva)}</span></div>
            <div className="oc-linha">
              <span className="oc-label">Total estimado</span>
              <span className="oc-total">{euro(total)}</span>
            </div>

            <p className="oc-expedicao">🚚 Expedição direta de Sintra via CTT Expresso (48h úteis).</p>

            <button type="button" className="oc-btn-azul" onClick={() => alert("Adicionado ao carrinho!")}>
              Confirmar &amp; Adicionar ao Carrinho
            </button>
            <div className="oc-duas-btn">
              <button type="button" className="oc-btn-cinza">Proposta PDF</button>
              <button type="button" className="oc-btn-cinza">Guardar</button>
            </div>
            <p className="oc-mono oc-suave oc-micro oc-centro">ISO 9001:2015 • Garantia de 30 Dias</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default OrcamentoPage;
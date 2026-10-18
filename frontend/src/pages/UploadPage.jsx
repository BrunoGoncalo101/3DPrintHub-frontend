import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/UploadPage.css";

const ficheirosIniciais = [
  { id: 1, nome: "braco_robotico_v4.step", tipo: "STEP", estado: "PRONTO A FATIAR", cor: "verde", info: "Tamanho: 42.8 MB · Carregado: há 10 min · Tolerância: DIN ISO 2768-m", principal: true },
  { id: 2, nome: "suporte_drone_v2.stl", tipo: "STL", estado: "OTIMIZADO FDM", cor: "azul", info: "Tamanho: 18.2 MB · Carregado: ontem · Vol: 32.6 cm³", principal: false },
  { id: 3, nome: "escultura_linhas_simples.3mf", tipo: "3MF", estado: "MULTI-COR / SLA", cor: "roxo", info: "Tamanho: 9.4 MB · Carregado: há 3 dias · Malha: 68.200 triângulos", principal: false },
];

const vantagens = [
  { titulo: "Deteção Automática de Paredes Finas", texto: "O motor alerta caso secções não cumpram a espessura estrutural de 0.8 mm para FDM ou 0.4 mm para Resina." },
  { titulo: "Proteção de Propriedade Intelectual", texto: "Ficheiros armazenados temporariamente em clusters europeus em conformidade com o RGPD e eliminados após produção." },
  { titulo: "Orçamentação em Menos de 5 Segundos", texto: "Cálculo de volume, tempo de máquina e peso em gramas do polímero selecionado com atualização de preço ao vivo." },
];
function UploadPage() {
  const [lista, setLista] = useState(ficheirosIniciais);
  const [nomeFicheiro, setNomeFicheiro] = useState("braco_robotico_v4_joint.step (42.8 MB)");

  // Mostra o nome do ficheiro escolhido
  function escolherFicheiro(e) {
    const f = e.target.files[0];
    if (f) {
      const mb = (f.size / 1024 / 1024).toFixed(1);
      setNomeFicheiro(`${f.name} (${mb} MB)`);
    }
  }

  // Remove um ficheiro da lista
  function apagar(id) {
    setLista(lista.filter((f) => f.id !== id));
  }
  return (
    <main className="up-page">
      {/* Cabeçalho */}
      <section className="up-card up-hero">
        <div>
          <span className="up-label up-azul">● Motor de análise geométrica v3.8 · ISO 2768-m</span>
          <h1>Enviar Ficheiros 3D para Impressão</h1>
          <p className="up-suave">
            Carrega os teus modelos tridimensionais (STL, STEP, OBJ, 3MF) para análise
            dimensional e orçamentação automática instantânea com verificação de espessura
            de parede em tempo real.
          </p>
        </div>
        <span className="up-chip up-verde">🛡 Encriptação Militar 256-bit &amp; NDA Ativo</span>
      </section>

      <div className="up-grid">
        {/* Coluna esquerda */}
        <div>
          <label className="up-dropzone" htmlFor="ficheiro3d">
            <div className="up-cubo">🧊</div>
            <h3>Arrasta e larga os teus ficheiros 3D aqui ou clica para explorar</h3>
            <p className="up-suave up-pequeno">
              Validação computacional em malha poligonal para deteção de furos, normais
              invertidas e superfícies não-manifold.
            </p>
            <div>
              {[".STL", ".STEP", ".STP", ".OBJ", ".3MF"].map((ext) => (
                <span key={ext} className="up-tag">{ext}</span>
              ))}
              <span className="up-mono up-suave up-micro"> · Máx. 150 MB por modelo</span>
            </div>
            <input
              id="ficheiro3d"
              type="file"
              accept=".stl,.step,.stp,.obj,.3mf"
              onChange={escolherFicheiro}
              hidden
            />
          </label>

          <div className="up-card up-progresso-box">
            <div className="up-linha up-mono">
              <span>{nomeFicheiro}</span>
              <span className="up-azul">84% · 12 MB/s</span>
            </div>
            <div className="up-progresso"><div></div></div>
            <div className="up-linha up-label">
              <span>A analisar espessuras críticas (&lt; 0.8 mm)...</span>
              <span>Tempo restante estimado: 3s</span>
            </div>
          </div>

          <div className="up-aviso">
            <strong>⚠ AVISO DE MALHA GEOMÉTRICA</strong>
            <p>
              O ficheiro <span className="up-mono">suporte_gopro.stl</span> contém 3
              superfícies não-manifold que serão reparadas automaticamente pelo nosso
              slicer proprietário antes da fusão em camada.
            </p>
          </div>
        </div>

        {/* Coluna direita */}
        <aside className="up-card">
          <div className="up-linha">
            <h3>Inspeção Geométrica</h3>
            <span className="up-tag up-verde">MALHA VÁLIDA</span>
          </div>

          <div className="up-viewer">⬡</div>

          <div className="up-metricas">
            <div>
              <span className="up-label">Volume estimado</span>
              <strong>74.2 cm³</strong>
            </div>
            <div>
              <span className="up-label">Bounding box</span>
              <strong className="up-azul">110×85×42</strong>
              <span className="up-label">milímetros (mm)</span>
            </div>
            <div>
              <span className="up-label">Malha poligonal</span>
              <strong>124.500</strong>
              <span className="up-label">triângulos / faces</span>
            </div>
          </div>

          <p className="up-linha up-suave">
            <span>Orientação Recomendada:</span>
            <span className="up-mono up-texto">Eixo Z plano (Ângulo 45°)</span>
          </p>
          <p className="up-linha up-suave">
            <span>Necessidade de Suportes:</span>
            <span className="up-mono up-verde">Mínima (&lt; 8% vol)</span>
          </p>

          <Link to="/orcamento" className="up-btn">Pedir Orçamento com Este Ficheiro →</Link>
          <p className="up-mono up-suave up-micro up-centro">
            Acesso imediato à seleção de materiais: PLA+, PETG-CF, Resina 8K e Nylon PA12.
          </p>
        </aside>
      </div>

      {/* Lista de ficheiros */}
      <section className="up-lista">
        <div className="up-linha up-lista-topo">
          <div>
            <h2>Os Meus Ficheiros Carregados Recentemente</h2>
            <p className="up-suave up-pequeno">
              Modelos armazenados na tua sessão de engenharia prontos para parametrização
              aditiva ou reanálise de custos.
            </p>
          </div>
          <span className="up-chip">{lista.length} Ficheiros no Repositório Temporário</span>
        </div>

        {lista.map((f) => (
          <div key={f.id} className="up-ficheiro">
            <div>
              <strong className="up-nome">{f.nome}</strong>{" "}
              <span className={`up-tag up-tag-${f.cor}`}>{f.estado}</span>
              <p className="up-mono up-suave up-micro">{f.info}</p>
            </div>
            <div className="up-acoes">
              <Link to="/orcamento" className={f.principal ? "up-btn-roxo" : "up-btn-cinza"}>
                Pedir Orçamento
              </Link>
              <button type="button" onClick={() => apagar(f.id)}>🗑</button>
            </div>
          </div>
        ))}
      </section>

      {/* Vantagens */}
      <section className="up-vantagens">
        {vantagens.map((v) => (
          <div key={v.titulo}>
            <strong className="up-azul">{v.titulo}</strong>
            <p className="up-suave">{v.texto}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default UploadPage;
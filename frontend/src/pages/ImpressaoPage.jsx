import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ImpressaoPage.css";
import {
  listarMateriais,
  enviarFicheiro,
  pedirOrcamento,
} from "../services/impressaoService.js";

const MAX_MB = 50; // limite do backend

// TODO: trocar por dados da API quando houver endpoint de cores
const CORES = ["Preto", "Branco", "Cinzento", "Vermelho", "Azul"];

const QUALIDADES = [
  { valor: "ALTA", texto: "Alta (0.12 mm)" },
  { valor: "NORMAL", texto: "Normal (0.16 mm)" },
  { valor: "RAPIDA", texto: "Rápida (0.20 mm)" },
];

function formatarEuro(valor) {
  const n = Number(valor);
  if (Number.isNaN(n)) return "—";
  return n.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

function ImpressaoPage() {
  const [ficheiro, setFicheiro] = useState(null);
  const [guardado, setGuardado] = useState(null); // resposta do upload
  const [materiais, setMateriais] = useState([]);
  const [materialId, setMaterialId] = useState("");
  const [cor, setCor] = useState(CORES[0]);
  const [qualidade, setQualidade] = useState("NORMAL");
  const [erro, setErro] = useState("");
  const [aEnviar, setAEnviar] = useState(false);
  const [orcamento, setOrcamento] = useState(null);

  // Carrega os materiais quando a página abre
  useEffect(() => {
    listarMateriais()
      .then((lista) => {
        const ativos = lista.filter((m) => m.active !== false);
        setMateriais(ativos);
        if (ativos.length > 0) setMaterialId(String(ativos[0].id));
      })
      .catch((err) => setErro(err.message));
  }, []);

  // Valida o ficheiro escolhido
  function escolherFicheiro(e) {
    const f = e.target.files[0];
    setOrcamento(null);
    setGuardado(null);
    setErro("");

    if (!f) {
      setFicheiro(null);
      return;
    }
    if (!f.name.toLowerCase().endsWith(".stl")) {
      setFicheiro(null);
      setErro("Só são aceites ficheiros .stl.");
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setFicheiro(null);
      setErro(`O ficheiro excede o limite de ${MAX_MB} MB.`);
      return;
    }
    setFicheiro(f);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!ficheiro) {
      setErro("Escolhe um ficheiro STL.");
      return;
    }
    setErro("");
    setOrcamento(null);
    setAEnviar(true);
    try {
      // Se o upload já foi feito, não o repete
      const enviado = guardado ?? (await enviarFicheiro(ficheiro));
      setGuardado(enviado);

      const resultado = await pedirOrcamento({
        ficheiroId: enviado.id,
        materialId: Number(materialId),
        cor,
        qualidade,
      });
      setOrcamento(resultado);
    } catch (err) {
      setErro(err.message);
    } finally {
      setAEnviar(false);
    }
  }

  return (
    <main className="im-page">
      <section className="im-card">
        <h1>Impressão Sob Medida (STL)</h1>
        <p className="im-suave">
          Envia o teu modelo, escolhe o material, a cor e a qualidade, e recebe
          um orçamento.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="im-campo">
            <label htmlFor="ficheiro-stl">Ficheiro STL (máx. {MAX_MB} MB)</label>
            <input
              id="ficheiro-stl"
              type="file"
              accept=".stl"
              onChange={escolherFicheiro}
            />
            {ficheiro && (
              <small className="im-suave">
                {ficheiro.name} ({(ficheiro.size / 1024 / 1024).toFixed(1)} MB)
              </small>
            )}
          </div>

          <div className="im-campo">
            <label htmlFor="material">Material</label>
            <select
              id="material"
              value={materialId}
              onChange={(e) => setMaterialId(e.target.value)}
              required
            >
              {materiais.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="im-duas">
            <div className="im-campo">
              <label htmlFor="cor">Cor</label>
              <select id="cor" value={cor} onChange={(e) => setCor(e.target.value)}>
                {CORES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="im-campo">
              <label htmlFor="qualidade">Qualidade</label>
              <select
                id="qualidade"
                value={qualidade}
                onChange={(e) => setQualidade(e.target.value)}
              >
                {QUALIDADES.map((q) => (
                  <option key={q.valor} value={q.valor}>
                    {q.texto}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {erro && <p className="im-erro">{erro}</p>}

          <button type="submit" className="im-btn" disabled={aEnviar || !ficheiro}>
            {aEnviar ? "A pedir orçamento..." : "Pedir orçamento"}
          </button>
        </form>
      </section>

      {orcamento && (
        <section className="im-card im-orcamento">
          <h2>O teu orçamento</h2>
          {/* Ajusta os nomes dos campos ao que a API devolver */}
          <p className="im-total">{formatarEuro(orcamento.total)}</p>
          {orcamento.estado && (
            <p className="im-suave">Estado: {orcamento.estado}</p>
          )}
          <Link to="/pedidos" className="im-link">
            Ver os meus pedidos →
          </Link>
        </section>
      )}
    </main>
  );
}

export default ImpressaoPage;
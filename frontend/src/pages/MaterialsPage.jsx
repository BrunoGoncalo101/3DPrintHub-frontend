import { useState, useEffect } from "react"; 
import { get } from "../services/API.js"; 
import { juntarExtrasMaterial } from "../mocks/materiais.js"; 
import "../styles/MaterialsPage.css";

// Formata o preço por grama (ex.: 0.025 -> "0,025 €")
function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 3,
  });
}

export default function MaterialsPage() {
  // NOVO (tarefa 92): estados do pedido à API
  const [materiais, setMateriais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Pede os materiais ao back quando a página abre
  useEffect(() => {
    let ativo = true; 

    get("/materiais")
      .then((dados) => {
        if (ativo) setMateriais(dados.map(juntarExtrasMaterial)); // junta os extras dos mocks
      })
      .catch((e) => {
        if (ativo) setErro(e.message);
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <section className="materiais">
      <h1>Materiais & Fichas Técnicas</h1>
      <p className="materiais-intro">
        Compara os materiais que usamos para escolher o mais indicado para a tua peça.
      </p>

      {/* Mensagens enquanto carrega ou se der erro */}
      {carregando && <p className="materiais-intro">A carregar...</p>}
      {erro && <p className="materiais-intro">{erro}</p>}

      {!carregando && !erro && (
        <div className="materiais-tabela-caixa">
          <table className="materiais-tabela">
            <thead>
              <tr>
                <th>Material</th>
                <th>Preço / g</th>
                {/* A densidade vem da API */}
                <th>Densidade</th>
                <th>Temperatura</th>
                <th>Resistência</th>
                <th>Indicado para</th>
                <th>Cores</th>
              </tr>
            </thead>
            <tbody>
              {materiais.map((material) => (
                <tr key={material.id}>
                  <td>
                    {/* Name e pricePerGram vêm da API */}
                    <strong>{material.name}</strong>
                    <span className="materiais-descricao">{material.descricao}</span>
                  </td>
                  <td>{formatarPreco(material.pricePerGram)}</td>
                  <td>{material.density.toLocaleString("pt-PT")} g/cm³</td>
                  <td>{material.temperatura}</td>
                  <td>{material.resistencia}</td>
                  <td>{material.indicadoPara}</td>
                  <td>{material.cores.map((cor) => cor.nome).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

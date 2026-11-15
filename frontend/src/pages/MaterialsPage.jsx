import materiais from "../mocks/materiais.js";
import "../styles/MaterialsPage.css";

// Formata o preço por grama (ex.: 0.05 -> "0,05 €")
function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

export default function MaterialsPage() {
  return (
    <section className="materiais">
      <h1>Materiais & Fichas Técnicas</h1>
      <p className="materiais-intro">
        Compara os materiais que usamos para escolher o mais indicado para a tua peça.
      </p>
      <div className="materiais-tabela-caixa">
        <table className="materiais-tabela">
          <thead>
            <tr>
              <th>Material</th>
              <th>Preço / g</th>
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
                  <strong>{material.nome}</strong>
                  <span className="materiais-descricao">{material.descricao}</span>
                </td>
                <td>{formatarPreco(material.precoPorGrama)}</td>
                <td>{material.temperatura}</td>
                <td>{material.resistencia}</td>
                <td>{material.indicadoPara}</td>
                <td>{material.cores.map((cor) => cor.nome).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

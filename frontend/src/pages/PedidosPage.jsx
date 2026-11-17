import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PedidosPage.css";
import { listarPedidos, aceitarOrcamento } from "../services/pedidosService.js";

// TODO: confirmar com o backend os nomes exatos dos estados
const ESTADOS = {
  PENDENTE: { texto: "Pendente", classe: "pendente" },
  PENDING: { texto: "Pendente", classe: "pendente" },
  ORCAMENTADO: { texto: "Orçamentado", classe: "orcamentado" },
  QUOTED: { texto: "Orçamentado", classe: "orcamentado" },
  ACEITE: { texto: "Aceite", classe: "aceite" },
  ACCEPTED: { texto: "Aceite", classe: "aceite" },
};

function infoEstado(estado) {
  const chave = String(estado ?? "").toUpperCase();
  return ESTADOS[chave] ?? { texto: String(estado ?? "—"), classe: "pendente" };
}

function formatarEuro(valor) {
  const n = Number(valor);
  if (valor == null || Number.isNaN(n)) return "—";
  return n.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

function formatarData(valor) {
  if (!valor) return "—";
  return new Date(valor).toLocaleDateString("pt-PT");
}

function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [aCarregar, setACarregar] = useState(true);
  const [erro, setErro] = useState("");
  const [aAceitar, setAAceitar] = useState(null); // id do pedido em curso
  const [recarregar, setRecarregar] = useState(0);

  // Lê a lista quando a página abre e sempre que "recarregar" muda
  useEffect(() => {
    let ativo = true;
    listarPedidos()
      .then((lista) => {
        if (ativo) {
          setPedidos(lista);
          setErro("");
        }
      })
      .catch((err) => {
        if (ativo) setErro(err.message);
      })
      .finally(() => {
        if (ativo) setACarregar(false);
      });
    return () => {
      ativo = false;
    };
  }, [recarregar]);

  async function aceitar(id) {
    setAAceitar(id);
    setErro("");
    try {
      await aceitarOrcamento(id);
      setRecarregar((n) => n + 1); // volta a ler a lista com o estado novo
    } catch (err) {
      setErro(err.message);
    } finally {
      setAAceitar(null);
    }
  }

  return (
    <main className="pd-page">
      <h1>Os meus pedidos de impressão</h1>

      {erro && <p className="pd-erro">{erro}</p>}

      {aCarregar ? (
        <p className="pd-suave">A carregar...</p>
      ) : pedidos.length === 0 ? (
        <div className="pd-vazio">
          <p>Ainda não tens pedidos de impressão.</p>
          <Link to="/impressao" className="pd-link">
            Pedir o primeiro orçamento →
          </Link>
        </div>
      ) : (
        <ul className="pd-lista">
          {pedidos.map((p) => {
            const estado = infoEstado(p.status);
            return (
              <li key={p.id} className="pd-item">
                <div>
                  {/* Ajusta os nomes dos campos ao que a API devolver */}
                  <strong>{p.fileName ?? `Pedido #${p.id}`}</strong>
                  <p className="pd-suave">
                    {p.materialName ?? "—"} · {formatarData(p.createdAt)}
                  </p>
                </div>

                <div className="pd-direita">
                  <span className="pd-total">{formatarEuro(p.total)}</span>
                  <span className={`pd-estado pd-${estado.classe}`}>
                    {estado.texto}
                  </span>
                  {estado.classe === "orcamentado" && (
                    <button
                      type="button"
                      className="pd-btn"
                      disabled={aAceitar === p.id}
                      onClick={() => aceitar(p.id)}
                    >
                      {aAceitar === p.id ? "A aceitar..." : "Aceitar orçamento"}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default PedidosPage;
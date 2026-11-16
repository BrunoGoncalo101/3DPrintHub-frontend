import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/useAdmin.js";
import { classeEstadoAdmin, estadoAdmin } from "../utils/admin.js";
import { formatarPreco } from "../utils/precos.js";
import "../styles/Admin.css";

const POR_PAGINA = 5;

export default function AdminEncomendasPage() {
  const { encomendas } = useAdmin();
  const [pesquisa, setPesquisa] = useState("");
  const [tipo, setTipo] = useState("Todas");
  const [pagina, setPagina] = useState(1);

  const totalB2B = encomendas.filter((e) => e.tipo === "B2B").length;
  const totalB2C = encomendas.filter((e) => e.tipo === "B2C").length;

  // Números do topo, calculados a partir das encomendas
  const pendentes = encomendas.filter(
    (e) => estadoAdmin(e) === "Em Análise" || estadoAdmin(e) === "Pendente",
  ).length;
  const emProducao = encomendas.filter(
    (e) => estadoAdmin(e) === "Em Produção",
  ).length;
  const faturado = encomendas
    .filter((e) => e.quando.startsWith("Há") && !e.cancelada)
    .reduce((soma, e) => soma + e.valor, 0);

  const texto = pesquisa.trim().toLowerCase();
  const filtradas = encomendas.filter((e) => {
    if (tipo !== "Todas" && e.tipo !== tipo) return false;
    if (!texto) return true;
    return [e.numero, e.cliente, e.empresa, e.ficheiro.nome].some((campo) =>
      campo.toLowerCase().includes(texto),
    );
  });

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const inicio = (paginaAtual - 1) * POR_PAGINA;
  const visiveis = filtradas.slice(inicio, inicio + POR_PAGINA);

  function mudarTipo(novoTipo) {
    setTipo(novoTipo);
    setPagina(1);
  }

  return (
    <section className="admin">
      <div className="admin-topo">
        <div>
          <h1>Lista de Encomendas</h1>
          <p className="admin-subtitulo">
            Supervisiona o estado dos ficheiros CAD e o progresso em fábrica.
          </p>
        </div>
        <div className="admin-topo-botoes">
          <button
            type="button"
            className="admin-botao admin-botao-contorno"
            disabled
            title="Disponível quando houver API de administração"
          >
            Sincronizar
          </button>
          <button
            type="button"
            className="admin-botao admin-botao-azul"
            disabled
            title="Disponível quando houver API de administração"
          >
            + Nova Encomenda B2B
          </button>
        </div>
      </div>

      <p className="admin-resumo">
        <span>
          Total: <strong>{encomendas.length}</strong>
        </span>
        <span>
          Validação: <strong className="admin-laranja">{pendentes}</strong>{" "}
          pendentes
        </span>
        <span>
          Em Produção: <strong className="admin-azul">{emProducao}</strong>{" "}
          ativas
        </span>
        <span>
          Faturado Hoje: <strong>{formatarPreco(faturado)}</strong>
        </span>
      </p>

      <div className="admin-filtros">
        <input
          type="search"
          className="admin-pesquisa"
          placeholder="Filtrar por código, cliente ou ficheiro..."
          aria-label="Filtrar encomendas"
          value={pesquisa}
          onChange={(e) => {
            setPesquisa(e.target.value);
            setPagina(1);
          }}
        />
        <div className="admin-separadores">
          {[
            ["Todas", `Todas (${encomendas.length})`],
            ["B2B", `B2B Empresas (${totalB2B})`],
            ["B2C", `Particulares B2C (${totalB2C})`],
          ].map(([valor, rotulo]) => (
            <button
              key={valor}
              type="button"
              className={tipo === valor ? "ativo" : ""}
              onClick={() => mudarTipo(valor)}
            >
              {rotulo}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-tabela">
        <div className="admin-tabela-cabecalho">
          <span>Encomenda</span>
          <span>Cliente</span>
          <span>Ficheiro CAD</span>
          <span>Tecnologia / Material</span>
          <span className="admin-direita">Valor</span>
          <span>Estado</span>
          <span className="admin-direita">Ação</span>
        </div>

        {visiveis.length === 0 ? (
          <p className="admin-vazio">
            Nenhuma encomenda corresponde ao filtro.
          </p>
        ) : (
          visiveis.map((e, indice) => (
            <div key={e.numero} className="admin-tabela-linha">
              <span>
                <Link
                  to={`/admin/encomendas/${e.numero}`}
                  className="admin-codigo"
                >
                  #{e.numero}
                </Link>
                <small>{e.quando}</small>
              </span>
              <span>
                <strong>{e.cliente}</strong>
                <small>{e.empresa}</small>
              </span>
              <span className="admin-ficheiro">{e.ficheiro.nome}</span>
              <span>
                {e.tecnologia}
                <small>{e.material}</small>
              </span>
              <span className="admin-direita admin-valor">
                {formatarPreco(e.valor)}
              </span>
              <span>
                <span className={`admin-estado ${classeEstadoAdmin(e)}`}>
                  {estadoAdmin(e)}
                </span>
              </span>
              <span className="admin-direita">
                <Link
                  to={`/admin/encomendas/${e.numero}`}
                  className={
                    indice === 0 && estadoAdmin(e) === "Em Análise"
                      ? "admin-acao admin-acao-destaque"
                      : "admin-acao"
                  }
                >
                  {estadoAdmin(e) === "Em Análise"
                    ? "Ver & Mudar Estado →"
                    : "Ver Encomenda →"}
                </Link>
              </span>
            </div>
          ))
        )}

        <div className="admin-paginacao">
          <span>
            A mostrar{" "}
            <strong>
              {filtradas.length === 0 ? 0 : inicio + 1} -{" "}
              {inicio + visiveis.length}
            </strong>{" "}
            de <strong>{filtradas.length}</strong> encomendas
          </span>
          <div>
            <button
              type="button"
              disabled={paginaAtual === 1}
              onClick={() => setPagina(paginaAtual - 1)}
            >
              ← Anterior
            </button>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={n === paginaAtual ? "ativo" : ""}
                onClick={() => setPagina(n)}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              disabled={paginaAtual === totalPaginas}
              onClick={() => setPagina(paginaAtual + 1)}
            >
              Seguinte →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

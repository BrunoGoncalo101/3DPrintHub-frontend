import { Link } from "react-router-dom";
import "./HomePage.css";

// Os 3 números do topo: cada item da lista vira um bloco com .map()
const numeros = [
  { valor: "15.000+", legenda: "Peças fabricadas" },
  { valor: "4.9 / 5.0", legenda: "Índice de precisão" },
  { valor: "±0.05 mm", legenda: "Tolerância dimensional" },
];

export default function Home() {
  return (
    <>
      {/* 1. Topo */}
      <section className="home-topo">
        <div className="home-conteudo">
          <h1 className="topo-titulo">
            A engenharia da <br />
            <span className="texto-gradiente">Impressão 3D</span> ao teu alcance.
          </h1>

          <p className="topo-texto">
            Transformamos modelos digitais em peças funcionais de rigor industrial e
            acabamento de exposição. FDM de alta velocidade, SLA Resina 8K e polímeros
            reforçados com fibra de carbono.
          </p>

          <div className="topo-botoes">
            <Link to="/catalogo" className="botao-gradiente">
              <span>
                Explorar Catálogo
                <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </Link>
            <Link to="/impressao" className="botao-contorno">
              Pedir Orçamento Instantâneo
            </Link>
          </div>

          <div className="topo-numeros">
            {numeros.map((item) => (
              <div key={item.legenda}>
                <p className="numero-valor">{item.valor}</p>
                <p className="numero-legenda">{item.legenda}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

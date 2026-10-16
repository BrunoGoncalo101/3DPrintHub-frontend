import { Link } from "react-router-dom";
import "./HomePage.css";
import ProductCard from "../components/ProductCard.jsx";
import produtos from "../mocks/produtos.js";

// Os 3 números da secção de topo
const numeros = [
  { valor: "15.000+", legenda: "Peças fabricadas" },
  { valor: "4.9 / 5.0", legenda: "Índice de precisão" },
  { valor: "±0.05 mm", legenda: "Tolerância dimensional" },
];
// As 4 garantias da secção de topo
const garantias = [
  { icone: "local_shipping", titulo: "Despacho 24/48h", texto: "Portugal e Espanha" },
  { icone: "verified", titulo: "Materiais Certificados", texto: "Polímeros industriais ISO" },
  { icone: "square_foot", titulo: "Precisão ±0.05 mm", texto: "Inspeção dimensional" },
  { icone: "engineering", titulo: "Suporte Técnico", texto: "Revisão por engenheiros" },
];

export default function Home() {
    const destaques = produtos.slice(0, 4);
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
         {/* 2. Barra de garantias */}
      <section className="home-garantias">
        <div className="home-conteudo garantias-grelha">
          {garantias.map((item) => (
            <div key={item.titulo} className="garantia">
              <span className="material-symbols-outlined">{item.icone}</span>
              <div>
                <p className="garantia-titulo">{item.titulo}</p>
                <p className="garantia-texto">{item.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
       {/* 3. Produtos em destaque */}
      <section className="home-secao">
        <div className="home-conteudo">
          <p className="secao-etiqueta">Catálogo Selecionado</p>
          <h2 className="secao-titulo">Modelos e Criações Prontas a Imprimir</h2>

          <div className="destaques-grelha">
            {destaques.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="cabecalho">
      <div className="cabecalho-topo">
        <Link to="/" className="marca">
          <img src={logo} alt="Logótipo 3D Print Hub" className="marca-logo" />
          <div>
            <p className="marca-nome">3D Print Hub</p>
            <p className="marca-slogan">Tecnologia aditiva</p>
          </div>
        </Link>

        <Link to="/carrinho" className="botao-carrinho">
          Carrinho <span className="carrinho-contador">0</span>
        </Link>
      </div>

      <nav className="cabecalho-menu">
        <NavLink to="/" end>Catálogo Geral</NavLink>
        <NavLink to="/impressao">Impressão Sob Medida (STL)</NavLink>
        <NavLink to="/materiais">Materiais &amp; Fichas Técnicas</NavLink>
      </nav>
    </header>
  );
}

import logo from "../assets/logo.png";
import { useCarrinho } from "../context/useCarrinho.js";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

export default function Header() {
  // Número de artigos no carrinho (muda sempre que se adiciona ou remove)
  const { totalItens } = useCarrinho();
  const { autenticado, terminarSessao } = useAuth();
const navigate = useNavigate();

function sair() {
  terminarSessao();
  navigate("/");
}
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
          Carrinho <span className="carrinho-contador">{totalItens}</span>
        </Link>
        {autenticado ? (
  <button type="button" className="auth-botao auth-botao-contorno" onClick={sair}>
    Terminar sessão
  </button>
) : (
  <div className="auth-botoes">
    <Link to="/login" className="auth-botao auth-botao-contorno">Entrar</Link>
    <Link to="/registo" className="auth-botao auth-botao-gradiente">Registo</Link>
  </div>
)}
      </div>

      <nav className="cabecalho-menu">
        <NavLink to="/catalogo">Catálogo Geral</NavLink>
        <NavLink to="/impressao">Impressão Sob Medida (STL)</NavLink>
        <NavLink to="/materiais">Materiais &amp; Fichas Técnicas</NavLink>
      </nav>
    </header>
  );
}

import logo from "../assets/logo.png";
import { useCarrinho } from "../context/useCarrinho.js";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import { useAdmin } from "../context/useAdmin.js";

export default function Header() {
  // Número de artigos no carrinho (muda sempre que se adiciona ou remove)
  const { totalItens } = useCarrinho();
  const { autenticado, terminarSessao } = useAuth();
  const { modoAdmin, alterarModoAdmin } = useAdmin();
  const navigate = useNavigate();

  function sair() {
    terminarSessao();
    navigate("/");
  }

  // PROVISÓRIO: liga e desliga o modo admin sem API (ver AdminProvider)
  function alternarAdmin() {
    alterarModoAdmin(!modoAdmin);
    navigate(modoAdmin ? "/" : "/admin/encomendas");
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
        {modoAdmin && <span className="marca-admin">Admin</span>}

        <button
          type="button"
          className="auth-botao auth-botao-contorno botao-modo-admin"
          onClick={alternarAdmin}
          title="Botão provisório, sem API: sai quando houver login com perfil de admin"
        >
          {modoAdmin ? "Sair do modo admin" : "Modo admin"}
        </button>

        <Link to="/carrinho" className="botao-carrinho">
          Carrinho <span className="carrinho-contador">{totalItens}</span>
        </Link>
        {autenticado ? (
          <button
            type="button"
            className="auth-botao auth-botao-contorno"
            onClick={sair}
          >
            Terminar sessão
          </button>
        ) : (
          <div className="auth-botoes">
            <Link to="/login" className="auth-botao auth-botao-contorno">
              Entrar
            </Link>
            <Link to="/registo" className="auth-botao auth-botao-gradiente">
              Registo
            </Link>
          </div>
        )}
      </div>

      <nav className="cabecalho-menu">
        {modoAdmin ? (
          <>
            <NavLink to="/admin/encomendas">Lista de Encomendas</NavLink>
            <NavLink to="/admin/ficheiros">Ficheiros</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/catalogo">Catálogo Geral</NavLink>
            <NavLink to="/impressao">Impressão Sob Medida (STL)</NavLink>
            <NavLink to="/materiais">Materiais &amp; Fichas Técnicas</NavLink>
            {autenticado && (
              <NavLink to="/encomendas">As Minhas Encomendas</NavLink>
            )}
          </>
        )}
      </nav>
    </header>
  );
}

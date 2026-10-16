import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Footer.css";

const ANO = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="rodape-colunas">
        <div>
          <div className="rodape-marca">
            <img src={logo} alt="Logótipo 3D Print Hub" className="rodape-logo" />
            <span>3D Print Hub</span>
          </div>
          <p className="rodape-descricao">
            Impressão 3D por encomenda: escolhe um modelo do catálogo ou envia o teu
            próprio ficheiro e nós imprimimos.
          </p>
        </div>

        <div>
          <h4 className="rodape-titulo">Materiais</h4>
          <ul className="rodape-lista">
            <li>PLA, PETG e ABS</li>
            <li>Resina</li>
            <li>Ficheiros .stl, .3mf e .obj</li>
          </ul>
        </div>

        <div>
          <h4 className="rodape-titulo">Navegação</h4>
          <ul className="rodape-lista">
            <li><Link to="/">Catálogo Geral</Link></li>
            <li><Link to="/impressao">Impressão Sob Medida</Link></li>
            <li><Link to="/materiais">Materiais</Link></li>
          </ul>
        </div>
      </div>

      <p className="rodape-copyright">© {ANO} 3D Print Hub. Todos os direitos reservados.</p>
    </footer>
  );
}

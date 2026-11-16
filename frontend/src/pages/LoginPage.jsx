import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/LoginPage.css";
import { login } from "../services/authService.js";
import { useAuth } from "../context/useAuth.js";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { guardarSessao } = useAuth();
  const destino = location.state?.de || "/"; // volta para onde o utilizador queria ir

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [erro, setErro] = useState("");
  const [aSubmeter, setASubmeter] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setASubmeter(true);
    try {
      const token = await login(email, password);
      guardarSessao(token);
      navigate(destino, { replace: true });
    } catch (err) {
      setErro(err.message);
    } finally {
      setASubmeter(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Iniciar Sessão</h1>
        <p className="login-sub">
          Acede à tua área de fabrico aditivo e gestão de impressões 3D.
        </p>

        {erro && (
          <div className="login-alerta">
            <div>
              <strong>FALHA DE AUTENTICAÇÃO</strong>
              <p>{erro}</p>
            </div>
            <button type="button" onClick={() => setErro("")}>
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="login-campo">
            <label>
              <span>E-mail profissional ou pessoal</span>
              <span className="login-azul">ID Aditivo</span>
            </label>
            <input
              type="email"
              placeholder="o.teu@email.pt"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-campo">
            <label>
              <span>Palavra-passe</span>
              <span>Mín. 8 chars</span>
            </label>
            <div className="login-pass">
              <input
                type={mostrarPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
              >
                {mostrarPassword ? "Esconder" : "Ver"}
              </button>
            </div>
          </div>

          <div className="login-opcoes">
            <label className="login-check">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
              />
              Lembrar sessão (30 dias)
            </label>
            <a href="#">Esqueci-me da palavra-passe</a>
          </div>

          <button type="submit" className="login-btn" disabled={aSubmeter}>
            {aSubmeter ? "A entrar..." : "Entrar na Conta →"}
          </button>
        </form>

        <div className="login-divisor">OU AUTENTICAR COM</div>

        <div className="login-sociais">
          <button type="button">Google</button>
          <button type="button">GitHub</button>
        </div>

        <p className="login-registo">
          Ainda não tens conta? <Link to="/registo">Regista-te</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;

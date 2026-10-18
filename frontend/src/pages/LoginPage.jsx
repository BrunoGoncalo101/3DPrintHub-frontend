import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  // Guarda o que o utilizador escreve
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [erro, setErro] = useState(false);
   function handleSubmit(e) {
    e.preventDefault(); // não deixa a página recarregar

    // Simulação: ligar isto mais tarde a outra cena
    if (email === "admin@3dprinthub.pt" && password === "12345678") {
      setErro(false);
      navigate("/"); // muda para a rota certa 
    } else {
      setErro(true);
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
              <p>Credenciais inválidas. Por favor verifica o teu e-mail ou palavra-passe.</p>
            </div>
            <button type="button" onClick={() => setErro(false)}>✕</button>
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
              placeholder="artur.eng@fabrico3d.pt"
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

          <button type="submit" className="login-btn">
            Entrar na Conta →
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

      <p className="login-rodape">
        NÓ ATIVO: PT-LIS-01 • LATÊNCIA: 12ms • SISTEMA ADITIVO ONLINE
      </p>
    </main>
  );
}

export default LoginPage;
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/RegistoPage.css";

const materiais = [
  { nome: "PLA Tough", cor: "verde" },
  { nome: "PETG Carbon Fiber", cor: "azul" },
  { nome: "Resina 8K Bio-Med", cor: "roxo" },
  { nome: "Nylon PA12 ESD", cor: "laranja" },
];
function RegistoPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
    confirmar: "",
    termos: false,
    novidades: false,
  });

  // Atualiza o campo que o utilizador está a escrever
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }
  // Critérios da palavra-passe
  const criterios = {
    tamanho: form.password.length >= 8,
    numero: /\d/.test(form.password),
    simbolo: /[^A-Za-z0-9]/.test(form.password),
  };
  const cumpridos = Object.values(criterios).filter(Boolean).length;
  const forca = cumpridos === 3 ? "Forte" : cumpridos === 2 ? "Média" : "Fraca";
  const coincidem = form.confirmar !== "" && form.password === form.confirmar;

  function handleSubmit(e) {
    e.preventDefault();
    if (!coincidem) {
      alert("As palavras-passe não coincidem");
      return;
    }
    console.log("Registo:", form); // depois liga-se ao backend
  }
  return (
    <main className="rg-page">
      {/* Coluna esquerda */}
      <section className="rg-card">
        <h1>Infraestrutura Industrial Dedicada</h1>
        <p className="rg-suave">
          Centralize encomendas CAD, validação de tolerâncias micron e ensaios de
          tração em polímeros de engenharia na mais avançada rede nacional.
        </p>

        <div className="rg-stats">
          <div className="rg-stat">
            <span className="rg-label">Tolerância dimensional</span>
            <strong className="rg-azul">±0.04 mm</strong>
            <span className="rg-label">Otimização SLA/SLS</span>
          </div>
          <div className="rg-stat">
            <span className="rg-label">Produção rápida</span>
            <strong className="rg-verde">&lt; 24 Horas</strong>
            <span className="rg-label">Envio Portugal Continental</span>
          </div>
        </div>

        <div className="rg-stat rg-materiais">
          <div className="rg-linha-topo">
            <span className="rg-label">Materiais homologados em stock</span>
            <span className="rg-label rg-verde">100% operacional</span>
          </div>
          <div className="rg-tags">
            {materiais.map((m) => (
              <span key={m.nome} className={`rg-tag rg-tag-${m.cor}`}>
                {m.nome}
              </span>
            ))}
          </div>
        </div>

        <div className="rg-stat">
          <strong className="rg-titulo-pequeno">Capacidade Ativa</strong>
          <span className="rg-label">42 Impressoras em Produção Contínua</span>
        </div>

        <p className="rg-rgpd">
          ✓ Processamento em conformidade com o RGPD &amp; Norma ISO 9001
        </p>
        <p className="rg-suave rg-pequeno">
          Suporte especializado em engenharia mecânica via Porto &amp; Lisboa.
        </p>
      </section>

      {/* Coluna direita: formulário */}
      <section className="rg-card">
        <span className="rg-label rg-azul">Ficha de inscrição industrial</span>
        <h1>Criar Conta de Engenharia &amp; Fabrico</h1>
        <p className="rg-suave rg-sub">
          Junta-te à rede de prototipagem e impressão 3D sob medida em Portugal.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="rg-campo">
            <label>
              <span>Nome completo</span>
              <span>Obrigatório</span>
            </label>
            <input
              type="text"
              name="nome"
              placeholder="ex: Duarte Silva"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="rg-campo">
            <label>
              <span>E-mail corporativo / pessoal</span>
              {form.email.includes("@") && (
                <span className="rg-verde">✓ Domínio verificado</span>
              )}
            </label>
            <input
              type="email"
              name="email"
              placeholder="duarte.silva@eng-porto.pt"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="rg-duas">
            <div className="rg-campo">
              <label>
                <span>Palavra-passe</span>
                {form.password && <span className="rg-verde">{forca}</span>}
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <div className="rg-barras">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={i < cumpridos ? "ativa" : ""}></div>
                ))}
              </div>
              <div className="rg-criterios">
                <span className={criterios.tamanho ? "ok" : ""}>✓ min. 8 caracteres</span>
                <span className={criterios.numero ? "ok" : ""}>✓ número</span>
                <span className={criterios.simbolo ? "ok" : ""}>✓ símbolo</span>
              </div>
            </div>

            <div className="rg-campo">
              <label>
                <span>Confirmar senha</span>
                <span>Validação</span>
              </label>
              <input
                type="password"
                name="confirmar"
                value={form.confirmar}
                onChange={handleChange}
                required
              />
              {form.confirmar && (
                <p className={coincidem ? "rg-msg rg-verde" : "rg-msg rg-vermelho"}>
                  {coincidem
                    ? "✓ As palavras-passe coincidem"
                    : "✗ As palavras-passe não coincidem"}
                </p>
              )}
            </div>
          </div>

          <label className="rg-check">
            <input
              type="checkbox"
              name="termos"
              checked={form.termos}
              onChange={handleChange}
              required
            />
            <span>
              Li e aceito os <a href="#">Termos de Serviço</a> e a{" "}
              <a href="#">Política de Privacidade</a> de Fabrico Aditivo.
            </span>
          </label>

          <label className="rg-check">
            <input
              type="checkbox"
              name="novidades"
              checked={form.novidades}
              onChange={handleChange}
            />
            <span>Receber atualizações de novos materiais técnicos.</span>
          </label>

          <button type="submit" className="rg-btn">
            🚀 Criar Conta
          </button>

          <p className="rg-ja-tem">
            Já tens uma conta? <Link to="/login">Iniciar sessão →</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default RegistoPage;
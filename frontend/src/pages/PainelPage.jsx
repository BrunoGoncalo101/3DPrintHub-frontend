import { useState } from "react";
import { Link } from "react-router-dom";
import "./PainelPage.css";

const encomendas = [
  { ref: "#ORD-8491", peca: "Engrenagem Biónica PA12", detalhe: "SLS Laser · Nylon Preto", qtd: 2, estado: "Concluído", cor: "verde", total: "48,20 €", acao: "Ver Detalhes", link: true },
  { ref: "#ORD-8495", peca: "3D Amor em Linhas Simples", detalhe: "SLA Resina 8K · Branco Marfim", qtd: 1, estado: "Em produção", cor: "azul", total: "15,00 €", acao: "Acompanhar", link: true },
  { ref: "#ORD-8510", peca: "Suporte Sensor Drone TPU", detalhe: "FDM Industrial · Flex 95A", qtd: 5, estado: "Aprovado", cor: "laranja", total: "32,50 €", acao: "Fila Fabrico", link: false },
  { ref: "#ORD-8522", peca: "Caixa Eletrónica Raspberry Pi", detalhe: "PETG Carbon Fiber · ESD Safe", qtd: 1, estado: "Pendente", cor: "cinza", total: "18,90 €", acao: "Validar Mesh", link: true },
];

const dadosIniciais = {
  nome: "Eng. Duarte Silva",
  email: "d.silva@printlab.pt",
  telemovel: "+351 912 345 678",
  empresa: "PrintLab Prototipagem & Engenharia Lda",
  morada: "Avenida Duque de Ávila, Nº 142, 4º Andar Direito",
  codigoPostal: "1050-085",
  cidade: "Lisboa",
  pais: "Portugal",
  nif: "PT 509 123 456",
  novaPassword: "",
};
function PainelPage() {
  const [dados, setDados] = useState(dadosIniciais);

  // Atualiza o campo que o utilizador está a mexer
  function handleChange(e) {
    setDados({ ...dados, [e.target.name]: e.target.value });
  }

  function guardar() {
    console.log("Guardar:", dados); // depois liga-se ao backend
    alert("Alterações guardadas!");
  }

  function descartar() {
    setDados(dadosIniciais);
  }
  return (
    <main className="pn-page">
      {/* Cabeçalho */}
      <section className="pn-card pn-topo">
        <div>
          <span className="pn-label pn-azul">
            Consola de engenharia aditiva / <span className="pn-texto">Hub Lisboa</span>
          </span>
          <h1>Painel de Controlo do Engenheiro</h1>
          <p className="pn-suave">
            Configuração de parâmetros de faturação empresarial, segurança e telemetria de fabrico ativo.
          </p>
        </div>
        <div className="pn-estados">
          <div className="pn-estado">
            <span className="pn-label">Servidor SLS</span>
            <b className="pn-mono"><span className="pn-verde">●</span> Online · 99.8%</b>
          </div>
          <div className="pn-estado">
            <span className="pn-label">Acordo NDA</span>
            <b className="pn-mono">Ativo (Automático)</b>
          </div>
        </div>
      </section>

      <div className="pn-grid">
        {/* Menu lateral */}
        <aside>
          <div className="pn-perfil">
            <div className="pn-avatar"></div>
            <div>
              <strong className="pn-nome">{dados.nome}</strong>
              <p className="pn-mono pn-suave pn-micro">{dados.email}</p>
              <p className="pn-mono pn-azul pn-micro">PrintLab Portugal · R&amp;D</p>
            </div>
          </div>

          <nav className="pn-menu">
            <a href="#dados" className="ativo">Dados Pessoais &amp; Faturação <span>›</span></a>
            <Link to="/upload">Histórico de Ficheiros STL <span className="pn-suave">14</span></Link>
            <a href="#encomendas">Encomendas &amp; Orçamentos <span>›</span></a>
            <a href="#seguranca">Segurança da Conta <span>›</span></a>
          </nav>

          <hr />
          <p className="pn-linha pn-mono pn-pequeno">
            <span className="pn-suave">Créditos Prototipagem</span>
            <b>245,00 €</b>
          </p>
          <Link to="/login" className="pn-sair pn-mono">⎋ Terminar Sessão</Link>
        </aside>

        {/* Conteúdo */}
        <div>
          <section className="pn-seccao" id="dados">
            <h2>1. Dados Pessoais</h2>
            <p className="pn-suave">Informações de contacto para coordenação e aprovação de ficheiros CAD.</p>
            <div className="pn-duas">
              <div className="pn-campo">
                <label>Nome completo</label>
                <input type="text" name="nome" value={dados.nome} onChange={handleChange} />
              </div>
              <div className="pn-campo">
                <label>Endereço de e-mail</label>
                <input type="email" name="email" value={dados.email} onChange={handleChange} />
              </div>
              <div className="pn-campo">
                <label>Telemóvel direto</label>
                <input type="text" name="telemovel" value={dados.telemovel} onChange={handleChange} />
              </div>
              <div className="pn-campo">
                <label>Empresa / Estúdio de design</label>
                <input type="text" name="empresa" value={dados.empresa} onChange={handleChange} />
              </div>
            </div>
          </section>

          <section className="pn-seccao">
            <h2>2. Dados de Entrega &amp; Faturação</h2>
            <p className="pn-suave">Morada para entrega física de modelos e dados para faturação automática com IVA.</p>
            <div className="pn-campo">
              <label>Morada de entrega</label>
              <input type="text" name="morada" value={dados.morada} onChange={handleChange} />
            </div>
            <div className="pn-tres">
              <div className="pn-campo">
                <label>Código postal</label>
                <input type="text" name="codigoPostal" value={dados.codigoPostal} onChange={handleChange} />
              </div>
              <div className="pn-campo">
                <label>Cidade</label>
                <input type="text" name="cidade" value={dados.cidade} onChange={handleChange} />
              </div>
              <div className="pn-campo">
                <label>País</label>
                <select name="pais" value={dados.pais} onChange={handleChange}>
                  <option>Portugal</option>
                  <option>Espanha</option>
                  <option>França</option>
                </select>
              </div>
            </div>
            <div className="pn-campo">
              <label>NIF fiscal</label>
              <input type="text" name="nif" value={dados.nif} onChange={handleChange} />
            </div>
          </section>

          <section className="pn-seccao" id="seguranca">
            <h2>3. Segurança da Conta</h2>
            <p className="pn-suave">Atualização de credenciais e autenticação de dois fatores.</p>
            <div className="pn-duas">
              <div className="pn-campo">
                <label>Palavra-passe atual</label>
                <input type="password" value="123456789012" readOnly />
              </div>
              <div className="pn-campo">
                <label>Nova palavra-passe</label>
                <input
                  type="password"
                  name="novaPassword"
                  placeholder="Mínimo 12 caracteres"
                  value={dados.novaPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <p className="pn-linha pn-pequeno">
              <span className="pn-verde">✓ <span className="pn-texto">2FA FIDO2/WebAuthn Ativo</span></span>
              <a href="#" className="pn-mono pn-azul">Configurar Chaves</a>
            </p>
          </section>

          <section className="pn-seccao pn-sem-borda" id="encomendas">
            <div className="pn-linha pn-topo-tabela">
              <div>
                <h2>4. Histórico de Encomendas &amp; Fabrico</h2>
                <p className="pn-suave">Rastreabilidade em tempo real de impressões e download de certificados.</p>
              </div>
              <a href="#" className="pn-mono pn-suave pn-pequeno">⤓ Exportar CSV</a>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Referência</th>
                  <th>Peça / Modelo</th>
                  <th>Qtd.</th>
                  <th>Estado</th>
                  <th>Total</th>
                  <th className="dir">Ação</th>
                </tr>
              </thead>
              <tbody>
                {encomendas.map((e) => (
                  <tr key={e.ref}>
                    <td className="pn-mono pn-azul">{e.ref}</td>
                    <td>
                      <strong>{e.peca}</strong>
                      <br />
                      <small className="pn-mono pn-suave">{e.detalhe}</small>
                    </td>
                    <td className="pn-mono">{e.qtd} un.</td>
                    <td className={`pn-mono pn-${e.cor}`}>{e.estado}</td>
                    <td className="pn-mono"><b>{e.total}</b></td>
                    <td className="dir">
                      {e.link ? <a href="#" className="pn-azul">{e.acao}</a> : <span className="pn-suave">{e.acao}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div className="pn-barra">
            <span className="pn-mono pn-verde pn-micro">☁ Sincronização com ERP Primavera pronta</span>
            <div className="pn-barra-btns">
              <button type="button" className="pn-descartar" onClick={descartar}>Descartar</button>
              <button type="button" className="pn-guardar" onClick={guardar}>💾 Guardar Alterações</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PainelPage;
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import { useCarrinho } from "../context/useCarrinho.js";
import { calcularTotais, formatarPreco } from "../utils/precos.js";
import {
  validarCodigoPostal,
  validarEmail,
  validarNif,
  validarTelemovel,
} from "../utils/validacoes.js";
import "./CheckoutPage.css";

const METODOS = [
  { id: "mbway", nome: "MB WAY", descricao: "Push app" },
  { id: "multibanco", nome: "Multibanco", descricao: "Ref. & Entidade" },
  { id: "cartao", nome: "Cartão", descricao: "3D Secure" },
  { id: "paypal", nome: "PayPal", descricao: "Express" },
];

// Texto mostrado por baixo dos métodos que não pedem mais dados
const INSTRUCOES = {
  multibanco:
    "Depois de confirmar, é gerada uma entidade e uma referência para pagar no multibanco ou no homebanking.",
  cartao:
    "Depois de confirmar, será redirecionado para a validação 3D Secure do seu banco.",
  paypal:
    "Depois de confirmar, será redirecionado para o PayPal para concluir o pagamento.",
};

const DADOS_VAZIOS = {
  nome: "",
  email: "",
  telemovel: "",
  morada: "",
  codigoPostal: "",
  localidade: "",
  nif: "",
  denominacao: "",
  telemovelMbway: "",
};

// Número de encomenda falso, só até o back-end gerar o verdadeiro
function gerarNumeroEncomenda() {
  return `3DH-${Date.now().toString().slice(-6)}`;
}

// Devolve um objeto com a mensagem de erro de cada campo inválido
function validar(dados, tipoCliente, metodo, aceitou) {
  const erros = {};

  if (!dados.nome.trim()) erros.nome = "Indique o nome completo.";
  if (!validarEmail(dados.email)) erros.email = "Indique um email válido.";
  if (!validarTelemovel(dados.telemovel)) {
    erros.telemovel = "Indique um telemóvel válido (9 dígitos).";
  }
  if (!dados.morada.trim()) erros.morada = "Indique a morada de entrega.";
  if (!validarCodigoPostal(dados.codigoPostal)) {
    erros.codigoPostal = "Use o formato 0000-000.";
  }
  if (!dados.localidade.trim()) erros.localidade = "Indique a localidade.";

  // O NIF é opcional para particulares, mas se for preenchido tem de ser válido
  if (tipoCliente === "empresa" || dados.nif.trim()) {
    if (!validarNif(dados.nif)) erros.nif = "NIF inválido.";
  }
  if (tipoCliente === "empresa" && !dados.denominacao.trim()) {
    erros.denominacao = "Indique a denominação social.";
  }

  if (metodo === "mbway" && !validarTelemovel(dados.telemovelMbway)) {
    erros.telemovelMbway = "Indique o telemóvel MB WAY (9 dígitos).";
  }
  if (!aceitou) erros.termos = "Tem de aceitar os termos para continuar.";

  return erros;
}

// Campo de texto com etiqueta e mensagem de erro
function Campo({ id, rotulo, valor, aoMudar, erro, extra, ...resto }) {
  return (
    <div className="checkout-campo">
      <div className="checkout-rotulo">
        <label htmlFor={id}>{rotulo}</label>
        {extra}
      </div>
      <input
        id={id}
        value={valor}
        onChange={(e) => aoMudar(id, e.target.value)}
        aria-invalid={Boolean(erro)}
        {...resto}
      />
      {erro && <p className="checkout-erro">{erro}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const { itens, subtotal, limpar } = useCarrinho();
  const [dados, setDados] = useState(DADOS_VAZIOS);
  const [tipoCliente, setTipoCliente] = useState("particular");
  const [metodo, setMetodo] = useState("mbway");
  const [aceitou, setAceitou] = useState(false);
  const [erros, setErros] = useState({});
  const [confirmacao, setConfirmacao] = useState(null);

  const { portesGratis, portes, total, iva } = calcularTotais(
    subtotal,
    itens.length > 0,
  );

  function mudarCampo(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  function confirmar() {
    const novosErros = validar(dados, tipoCliente, metodo, aceitou);
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    // Por enquanto o pagamento é simulado: o back-end ainda não está ligado
    setConfirmacao({
      numero: gerarNumeroEncomenda(),
      total,
      email: dados.email.trim(),
    });
    limpar();
  }

  // Encomenda concluída
  if (confirmacao) {
    return (
      <section className="checkout checkout-sucesso">
        <p className="checkout-etiqueta">Encomenda registada</p>
        <h1>Obrigado pela sua encomenda!</h1>
        <p>
          Número da encomenda: <strong>{confirmacao.numero}</strong>
        </p>
        <p>
          Total: <strong>{formatarPreco(confirmacao.total)}</strong>. Enviámos
          a confirmação para {confirmacao.email}.
        </p>
        <p className="checkout-nota">
          Pagamento simulado: ainda não está ligado ao back-end.
        </p>
        <Link to="/" className="checkout-link">
          ← Voltar à página inicial
        </Link>
      </section>
    );
  }

  // Não faz sentido fazer checkout sem artigos
  if (itens.length === 0) {
    return (
      <section className="checkout checkout-sucesso">
        <h1>Finalização de Encomenda</h1>
        <p>O carrinho está vazio.</p>
        <Link to="/carrinho" className="checkout-link">
          ← Voltar ao carrinho
        </Link>
      </section>
    );
  }

  const nifValido = dados.nif.trim() !== "" && validarNif(dados.nif);

  return (
    <section className="checkout">
      <p className="checkout-etiqueta">Checkout seguro · Hub Porto Tecnológico</p>

      <div className="checkout-topo">
        <h1>Finalização de Encomenda</h1>
        <ol className="checkout-passos">
          <li>
            <span>1</span> Envio
          </li>
          <li>
            <span>2</span> Faturação
          </li>
          <li className="checkout-passo-ativo">
            <span>3</span> Pagamento
          </li>
        </ol>
      </div>

      <div className="checkout-grelha">
        <form className="checkout-formulario" noValidate>
          {/* 01 - Envio */}
          <fieldset className="checkout-bloco">
            <legend>
              <span>01.</span> Dados de Envio &amp; Entrega
            </legend>
            <p className="checkout-zona">Portugal Continental &amp; Ilhas</p>

            <Campo
              id="nome"
              rotulo="Nome Completo"
              valor={dados.nome}
              aoMudar={mudarCampo}
              erro={erros.nome}
              autoComplete="name"
            />
            <div className="checkout-linha">
              <Campo
                id="email"
                rotulo="Email (Notificações de Produção)"
                type="email"
                valor={dados.email}
                aoMudar={mudarCampo}
                erro={erros.email}
                autoComplete="email"
              />
              <Campo
                id="telemovel"
                rotulo="Telemóvel (Alertas SMS & MB WAY)"
                type="tel"
                placeholder="+351 912 345 678"
                valor={dados.telemovel}
                aoMudar={mudarCampo}
                erro={erros.telemovel}
                autoComplete="tel"
              />
            </div>
            <Campo
              id="morada"
              rotulo="Morada de Entrega"
              valor={dados.morada}
              aoMudar={mudarCampo}
              erro={erros.morada}
              autoComplete="street-address"
            />
            <div className="checkout-linha">
              <Campo
                id="codigoPostal"
                rotulo="Código Postal"
                placeholder="0000-000"
                valor={dados.codigoPostal}
                aoMudar={mudarCampo}
                erro={erros.codigoPostal}
                autoComplete="postal-code"
              />
              <Campo
                id="localidade"
                rotulo="Localidade"
                valor={dados.localidade}
                aoMudar={mudarCampo}
                erro={erros.localidade}
                autoComplete="address-level2"
              />
            </div>
          </fieldset>

          {/* 02 - Faturação */}
          <fieldset className="checkout-bloco">
            <legend>
              <span>02.</span> Dados Fiscais &amp; Faturação
            </legend>

            <div className="checkout-alternar">
              <button
                type="button"
                className={tipoCliente === "particular" ? "ativo" : ""}
                aria-pressed={tipoCliente === "particular"}
                onClick={() => setTipoCliente("particular")}
              >
                Particular
              </button>
              <button
                type="button"
                className={tipoCliente === "empresa" ? "ativo" : ""}
                aria-pressed={tipoCliente === "empresa"}
                onClick={() => setTipoCliente("empresa")}
              >
                Empresa (B2B)
              </button>
            </div>

            <div className="checkout-linha">
              <Campo
                id="nif"
                rotulo={
                  tipoCliente === "empresa" ? "NIF Portugal" : "NIF (opcional)"
                }
                inputMode="numeric"
                maxLength={11}
                valor={dados.nif}
                aoMudar={mudarCampo}
                erro={erros.nif}
                extra={nifValido && <span className="checkout-valido">✓ NIF válido</span>}
              />
              {tipoCliente === "empresa" && (
                <Campo
                  id="denominacao"
                  rotulo="Denominação Social"
                  valor={dados.denominacao}
                  aoMudar={mudarCampo}
                  erro={erros.denominacao}
                  autoComplete="organization"
                />
              )}
            </div>
            <p className="checkout-nota">
              Comunicação automática à AT com emissão de fatura SAF-T PT
              certificada.
            </p>
          </fieldset>

          {/* 03 - Pagamento */}
          <fieldset className="checkout-bloco">
            <legend>
              <span>03.</span> Método de Pagamento
            </legend>
            <p className="checkout-zona">Encriptação 256-bit</p>

            <div className="checkout-metodos">
              {METODOS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={metodo === m.id ? "ativo" : ""}
                  aria-pressed={metodo === m.id}
                  onClick={() => setMetodo(m.id)}
                >
                  <strong>{m.nome}</strong>
                  <small>{m.descricao}</small>
                </button>
              ))}
            </div>

            {metodo === "mbway" ? (
              <div className="checkout-mbway">
                <Campo
                  id="telemovelMbway"
                  rotulo="Telemóvel MB WAY para validação"
                  type="tel"
                  placeholder="+351 912 345 678"
                  valor={dados.telemovelMbway}
                  aoMudar={mudarCampo}
                  erro={erros.telemovelMbway}
                />
                <p className="checkout-nota">
                  Após clicar no botão abaixo, confirme o pedido de{" "}
                  {formatarPreco(total)} na aplicação MB WAY do seu telemóvel.
                  O pedido expira em 5 min.
                </p>
              </div>
            ) : (
              <p className="checkout-nota">{INSTRUCOES[metodo]}</p>
            )}

            <label className="checkout-termos">
              <input
                type="checkbox"
                checked={aceitou}
                onChange={(e) => setAceitou(e.target.checked)}
              />
              <span>
                Concordo com os <a href="#termos">Termos de Produção Aditiva</a>{" "}
                e com a <a href="#nda">política de confidencialidade (NDA)</a>{" "}
                para proteção integral de ficheiros CAD/STL proprietários.
              </span>
            </label>
            {erros.termos && <p className="checkout-erro">{erros.termos}</p>}

            <Button onClick={confirmar}>
              Confirmar e Pagar {formatarPreco(total)} →
            </Button>

            <p className="checkout-garantias">
              Garantia 30 Dias · CTT Expresso Tracked · Fatura com NIF
            </p>
          </fieldset>
        </form>

        {/* Resumo da encomenda */}
        <aside className="checkout-resumo">
          <div className="checkout-resumo-topo">
            <h2>Resumo da Encomenda</h2>
            <span>{itens.length === 1 ? "1 artigo" : `${itens.length} artigos`}</span>
          </div>

          <ul className="checkout-itens">
            {itens.map((item) => (
              <li key={item.id}>
                <div className="checkout-miniatura">⬡</div>
                <div>
                  <p className="checkout-item-nome">{item.nome}</p>
                  <p className="checkout-item-info">
                    {item.etiqueta} · {item.quantidade} un
                  </p>
                </div>
                <strong>{formatarPreco(item.precoUnitario * item.quantidade)}</strong>
              </li>
            ))}
          </ul>

          <dl className="checkout-linhas">
            <div>
              <dt>Subtotal Peças Aditivas</dt>
              <dd>{formatarPreco(subtotal)}</dd>
            </div>
            <div>
              <dt>Expedição CTT Expresso 24h</dt>
              <dd className={portesGratis ? "checkout-gratis" : ""}>
                {portesGratis ? "Grátis" : formatarPreco(portes)}
              </dd>
            </div>
            <div>
              <dt>IVA estimado (23% incluído)</dt>
              <dd>{formatarPreco(iva)}</dd>
            </div>
          </dl>

          <div className="checkout-total">
            <span>Total Final</span>
            <strong>{formatarPreco(total)}</strong>
          </div>
          <p className="checkout-nota">IVA e envio incluídos</p>

          <ul className="checkout-garantia-lista">
            <li>Expedição em 24h a 48h úteis no Hub Porto</li>
            <li>Tolerância garantida ±0,05 mm (ISO 2768-m)</li>
          </ul>

          <Link to="/carrinho" className="checkout-link">
            ← Voltar ao carrinho
          </Link>
        </aside>
      </div>
    </section>
  );
}

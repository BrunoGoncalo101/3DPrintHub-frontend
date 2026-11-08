// Endereço do backend (pode mudar-se num ficheiro .env com VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function pedido(caminho, opcoes = {}) {
  // Se houver sessão, envia o token no cabeçalho Authorization
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...opcoes.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  let resposta;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, { ...opcoes, headers });
  } catch {
    // O servidor está desligado ou há erro de rede/CORS
    throw new Error("Não foi possível contactar o servidor. Tenta novamente.");
  }

  // A resposta pode vir vazia, em JSON ou em texto
  const texto = await resposta.text();
  let dados = null;
  if (texto) {
    try {
      dados = JSON.parse(texto);
    } catch {
      dados = texto;
    }
  }

  // O backend devolve os erros como { "error": "mensagem", "code": 400 }
  if (!resposta.ok) {
    const mensagem =
      (dados && (dados.error || dados.message)) ||
      (typeof dados === "string" && dados) ||
      `Erro ${resposta.status}`;
    throw new Error(mensagem);
  }

  return dados;
}

export const get = (caminho) => pedido(caminho);
export const post = (caminho, corpo) =>
  pedido(caminho, { method: "POST", body: JSON.stringify(corpo) });
export const put = (caminho, corpo) =>
  pedido(caminho, { method: "PUT", body: JSON.stringify(corpo) });
export const del = (caminho) => pedido(caminho, { method: "DELETE" });
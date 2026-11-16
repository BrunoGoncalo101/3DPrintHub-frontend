import { post } from "./API.js";

// POST /encomendas
// O back-end cria a encomenda com os itens do carrinho de quem tem sessão
// e esvazia o carrinho. Só pede a morada de entrega (texto até 255 caracteres).
export async function criarEncomenda(moradaEntrega) {
  const encomenda = await post("/encomendas", {
    shippingAddress: moradaEntrega.slice(0, 255),
  });

  return {
    // O número é o id que a API devolve (ex.: 12 -> 3DH-000012)
    numero: `3DH-${String(encomenda.id).padStart(6, "0")}`,
    total: Number(encomenda.total),
  };
}

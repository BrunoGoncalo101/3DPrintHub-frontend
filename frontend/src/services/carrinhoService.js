import { get, post, patch, del } from "./API.js";

// Converte um item da API (CartItemResponse) para o formato usado nas páginas
function converterItem(item) {
  return {
    id: item.id,
    tipo: "catalogo",
    origem: "Catálogo oficial",
    sku: null,
    nome: item.productName,
    etiqueta: item.materialName,
    precoUnitario: Number(item.unitPrice),
    quantidade: item.quantity,
    detalhes: [
      { rotulo: "Material", valor: item.materialName },
      { rotulo: "Cor", valor: item.colorName },
    ],
  };
}

// A API devolve sempre o carrinho completo: { items: [...], total }
function converterCarrinho(resposta) {
  return {
    itens: (resposta.items ?? []).map(converterItem),
    total: Number(resposta.total ?? 0),
  };
}

// GET /carrinho
export async function obterCarrinho() {
  return converterCarrinho(await get("/carrinho"));
}

// POST /carrinho/itens (o back-end soma a quantidade se o item já existir)
export async function adicionarItem({
  produtoId,
  materialId,
  corId,
  quantidade,
}) {
  const resposta = await post("/carrinho/itens", {
    productId: produtoId,
    materialId,
    colorId: corId,
    quantity: quantidade,
  });
  return converterCarrinho(resposta);
}

// PATCH /carrinho/itens/{id}
export async function mudarQuantidadeItem(id, quantidade) {
  const resposta = await patch(`/carrinho/itens/${id}`, {
    quantity: quantidade,
  });
  return converterCarrinho(resposta);
}

// DELETE /carrinho/itens/{id}
export async function removerItem(id) {
  return converterCarrinho(await del(`/carrinho/itens/${id}`));
}

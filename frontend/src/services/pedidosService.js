import { get, post } from "./API.js";

// TODO: confirmar os endereços e os campos com o backend
export function listarPedidos() {
  return get("/pedidos");
}

export function aceitarOrcamento(id) {
  return post(`/pedidos/${id}/aceitar`, {});
}
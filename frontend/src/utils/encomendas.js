import { FASES } from "../mocks/encomendas.js";
import { calcularTotais } from "./precos.js";

// Nome do estado mostrado ao cliente (ex.: "Impressão" ou "Cancelada")
export function nomeEstado(encomenda) {
  return encomenda.cancelada ? "Cancelada" : FASES[encomenda.fase];
}

// Classe de cor do estado: concluída a verde, cancelada a vermelho, o resto a azul
export function classeEstado(encomenda) {
  if (encomenda.cancelada) return "estado-cancelada";
  if (encomenda.fase === FASES.length - 1) return "estado-concluida";
  return "estado-curso";
}

// Subtotal, portes e total de uma encomenda (usa as mesmas regras do carrinho)
export function totaisEncomenda(encomenda) {
  const subtotal = encomenda.itens.reduce(
    (soma, item) => soma + item.precoUnitario * item.quantidade,
    0,
  );
  return { subtotal, ...calcularTotais(subtotal, encomenda.itens.length > 0) };
}

// Data em formato português (ex.: "10/11/2026, 11:42")
export function formatarData(dataIso) {
  return new Date(dataIso).toLocaleString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

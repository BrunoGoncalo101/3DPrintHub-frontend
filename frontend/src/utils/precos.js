// Valores de teste: o cálculo real de portes está fora do âmbito do projeto.
// Ficam aqui para o carrinho e o checkout usarem sempre os mesmos números.
export const LIMITE_PORTES_GRATIS = 30;
export const PORTES_FIXOS = 4.99;
export const TAXA_IVA = 0.23;

// Formata um número como preço em euros (ex.: 19.9 -> "19,90 €")
export function formatarPreco(valor) {
  return valor.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
}

// Calcula portes, total e IVA a partir do subtotal do carrinho
export function calcularTotais(subtotal, temItens) {
  const portesGratis = subtotal >= LIMITE_PORTES_GRATIS;
  const portes = portesGratis || !temItens ? 0 : PORTES_FIXOS;
  const total = subtotal + portes;
  // Os preços já incluem IVA, por isso extrai-se do total
  const iva = (total / (1 + TAXA_IVA)) * TAXA_IVA;

  return { portesGratis, portes, total, iva };
}

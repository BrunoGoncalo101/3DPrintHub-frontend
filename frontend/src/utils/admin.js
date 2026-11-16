// Estado mostrado na lista de admin
export function estadoAdmin(encomenda) {
  if (encomenda.cancelada) return "Rejeitado";
  if (encomenda.pendente) return "Pendente";
  if (encomenda.fase <= 1) return "Em Análise";
  if (encomenda.fase <= 4) return "Em Produção";
  if (encomenda.fase === 5) return "Pronto Envio";
  return "Concluído";
}

// Classe de cor do estado
export function classeEstadoAdmin(encomenda) {
  const estado = estadoAdmin(encomenda);
  if (estado === "Em Análise") return "admin-estado-analise";
  if (estado === "Em Produção") return "admin-estado-producao";
  if (estado === "Pronto Envio") return "admin-estado-envio";
  if (estado === "Concluído") return "admin-estado-concluido";
  if (estado === "Pendente") return "admin-estado-pendente";
  return "admin-estado-rejeitado";
}

// Ações que o admin pode escolher no detalhe. "fase" é o destino em FASES.
export const ACOES_ESTADO = [
  { id: "fatiamento", rotulo: "Aprovar p/ Fatiamento", fase: 2 },
  { id: "impressao", rotulo: "Iniciar Impressão", fase: 3 },
  { id: "expedicao", rotulo: "Pronto p/ Expedição", fase: 5 },
  { id: "pendente", rotulo: "Pendente", pendente: true },
  { id: "cancelar", rotulo: "Cancelar", cancelar: true },
];

// Aplica uma ação ao estado atual e devolve o novo estado
export function aplicarAcao(encomenda, acao) {
  if (acao.cancelar) {
    return { fase: encomenda.fase, pendente: false, cancelada: true };
  }
  if (acao.pendente) {
    return { fase: encomenda.fase, pendente: true, cancelada: false };
  }
  return { fase: acao.fase, pendente: false, cancelada: false };
}

// Ação sugerida a seguir à fase atual (a primeira que avança a encomenda)
export function acaoSugerida(encomenda) {
  return (
    ACOES_ESTADO.find(
      (acao) => acao.fase !== undefined && acao.fase > encomenda.fase,
    ) ?? null
  );
}

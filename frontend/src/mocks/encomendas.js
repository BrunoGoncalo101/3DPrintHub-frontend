// Encomendas falsas, só até a API do back-end estar pronta.
// O formato segue o que o checkout envia: itens, morada e método de pagamento.

// As 7 fases por onde passa uma encomenda (da mais antiga para a mais recente)
export const FASES = [
  "Pagamento",
  "Triagem CAD",
  "Slicing",
  "Impressão",
  "Pós-processo",
  "Envio",
  "Concluído",
];

// "fase" é a posição na lista FASES (0 = Pagamento, 6 = Concluído)
export const encomendas = [
  {
    numero: "3DH-482915",
    data: "2026-11-10T11:42:00",
    fase: 3,
    cancelada: false,
    itens: [
      {
        id: 1,
        nome: "3D Amor em Linhas Simples",
        precoUnitario: 15.0,
        quantidade: 1,
        detalhes: "PLA Matte · 16 cm · Preto Fosco / Vermelho",
      },
      {
        id: 2,
        nome: "braco_robotico_eixo3.stl",
        precoUnitario: 18.5,
        quantidade: 2,
        detalhes: "SLA Resina Tough · 28 µm",
      },
    ],
    morada: {
      nome: "Sebastião Melo",
      rua: "Rua do Exemplo, 123",
      codigoPostal: "4200-465",
      localidade: "Porto",
    },
    pagamento: { metodo: "MB WAY", estado: "Pago" },
  },
  {
    numero: "3DH-371204",
    data: "2026-10-28T16:05:00",
    fase: 6,
    cancelada: false,
    itens: [
      {
        id: 1,
        nome: "Vaso Elegance 3D - Efeito Seco",
        precoUnitario: 8.13,
        quantidade: 3,
        detalhes: "PLA Bio-Derivado · 20 cm · Branco",
      },
    ],
    morada: {
      nome: "Sebastião Melo",
      rua: "Rua do Exemplo, 123",
      codigoPostal: "4200-465",
      localidade: "Porto",
    },
    pagamento: { metodo: "Multibanco", estado: "Pago" },
  },
  {
    numero: "3DH-255873",
    data: "2026-10-02T09:20:00",
    fase: 1,
    cancelada: true,
    itens: [
      {
        id: 1,
        nome: "Suporte Sensor Drone TPU",
        precoUnitario: 32.5,
        quantidade: 1,
        detalhes: "TPU Flexível · 12 cm · Preto",
      },
    ],
    morada: {
      nome: "Sebastião Melo",
      rua: "Rua do Exemplo, 123",
      codigoPostal: "4200-465",
      localidade: "Porto",
    },
    pagamento: { metodo: "Cartão", estado: "Reembolsado" },
  },
];

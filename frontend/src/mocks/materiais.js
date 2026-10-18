// Materiais e cores falsos, só até a API do back-end estar pronta.

const materiais = [
  {
    id: 1,
    nome: "PLA+",
    precoPorGrama: 0.05,
    cores: [
      { id: 1, nome: "Branco" },
      { id: 2, nome: "Preto" },
      { id: 3, nome: "Cinzento" },
    ],
  },
  {
    id: 2,
    nome: "PETG",
    precoPorGrama: 0.07,
    cores: [
      { id: 4, nome: "Azul" },
      { id: 5, nome: "Transparente" },
      { id: 6, nome: "Preto" },
    ],
  },
  {
    id: 3,
    nome: "Nylon PA12-CF",
    precoPorGrama: 0.15,
    cores: [{ id: 7, nome: "Preto" }],
  },
  {
    id: 4,
    nome: "Resina 8K",
    precoPorGrama: 0.12,
    cores: [
      { id: 8, nome: "Cinzento" },
      { id: 9, nome: "Transparente" },
    ],
  },
];

export default materiais;

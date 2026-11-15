const materiais = [
  {
    id: 1,
    nome: "PLA+",
    precoPorGrama: 0.05,
    descricao: "O material mais usado. Fácil de imprimir e bom para peças decorativas.",
    temperatura: "205–225 °C",
    resistencia: "Média",
    indicadoPara: "Decoração e protótipos",
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
    descricao: "Mais resistente que o PLA e aguenta água. Bom para vasos e peças de uso diário.",
    temperatura: "230–250 °C",
    resistencia: "Alta",
    indicadoPara: "Vasos e peças de uso diário",
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
    descricao: "Nylon com fibra de carbono. Leve e muito rígido, para peças técnicas.",
    temperatura: "260–280 °C",
    resistencia: "Muito alta",
    indicadoPara: "Peças técnicas e engrenagens",
    cores: [{ id: 7, nome: "Preto" }],
  },
  {
    id: 4,
    nome: "Resina 8K",
    precoPorGrama: 0.12,
    descricao: "Impressão em resina com muito detalhe. Ideal para miniaturas.",
    temperatura: "Não se aplica (resina)",
    resistencia: "Baixa",
    indicadoPara: "Miniaturas com muito detalhe",
    cores: [
      { id: 8, nome: "Cinzento" },
      { id: 9, nome: "Transparente" },
    ],
  },
];
 
export default materiais;
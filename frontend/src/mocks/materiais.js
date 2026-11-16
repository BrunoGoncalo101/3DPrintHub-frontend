// O nome, o preço por grama e a densidade já vêm da API (GET /materiais).
// Aqui ficam só os campos que a API ainda não tem. A ligação é feita pelo id do material.
// As cores são iguais às da tabela "cores" do back (mesmo id e nome), mas o back
// ainda não tem um GET público para as cores, só os pedidos de admin (/admin/cores).

const extras = [
  {
    id: 1, // PLA
    descricao: "O material mais usado. Fácil de imprimir e bom para peças decorativas.",
    temperatura: "190–220 °C",
    resistencia: "Média",
    indicadoPara: "Decoração e protótipos",
    cores: [
      { id: 1, nome: "Branco" },
      { id: 2, nome: "Preto" },
      { id: 3, nome: "Vermelho" },
    ],
  },
  {
    id: 2, // PETG
    descricao: "Mais resistente que o PLA e aguenta água. Bom para vasos e peças de uso diário.",
    temperatura: "230–250 °C",
    resistencia: "Alta",
    indicadoPara: "Vasos e peças de uso diário",
    cores: [
      { id: 4, nome: "Azul" },
      { id: 5, nome: "Cinza" },
    ],
  },
  {
    id: 3, // ABS
    descricao: "Aguenta impacto e calor. Bom para peças que vão ser usadas e manuseadas.",
    temperatura: "230–260 °C",
    resistencia: "Alta",
    indicadoPara: "Peças técnicas e suportes",
    cores: [
      { id: 6, nome: "Preto" },
    ],
  },
  {
    id: 4, // TPU
    descricao: "Material flexível, parecido com borracha. Não parte quando dobra.",
    temperatura: "210–230 °C",
    resistencia: "Alta (flexível)",
    indicadoPara: "Capas, porta-chaves e peças que dobram",
    cores: [
      { id: 7, nome: "Preto" },
    ],
  },
];

// Junta a um material da API os campos extra com o mesmo id.
// Se não houver extras, o material fica sem cores (lista vazia) para a página não partir.
export function juntarExtrasMaterial(material) {
  const extra = extras.find((e) => e.id === material.id);
  return { cores: [], ...extra, ...material };
}

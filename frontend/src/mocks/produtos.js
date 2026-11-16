// O nome, a descrição, o preço, a categoria, as dimensões e a imagem
// já vêm da API (GET /produtos). Aqui ficam só os campos que a API ainda não tem.
// A ligação é feita pelo id do produto.

const extras = [
  {
    id: 1,
    material: "PLA",
    avaliacao: 4.9,
    numAvaliacoes: 48,
    alturaCamada: 0.16,
    precoAntigo: 15.9,
  },
  {
    id: 2,
    material: "PETG",
    avaliacao: 4.7,
    numAvaliacoes: 61,
    alturaCamada: 0.2,
    precoAntigo: null,
  },
  {
    id: 3,
    material: "PLA",
    avaliacao: 5.0,
    numAvaliacoes: 116,
    alturaCamada: 0.12,
    precoAntigo: 24.9,
  },
  {
    id: 4,
    material: "PLA",
    avaliacao: 4.8,
    numAvaliacoes: 34,
    alturaCamada: 0.2,
    precoAntigo: null,
  },
  {
    id: 5,
    material: "TPU",
    avaliacao: 4.6,
    numAvaliacoes: 19,
    alturaCamada: 0.2,
    precoAntigo: 4.99,
  },
  {
    id: 6,
    material: "PETG",
    avaliacao: 4.9,
    numAvaliacoes: 27,
    alturaCamada: 0.16,
    precoAntigo: 29.9,
  },
  {
    id: 7,
    material: "PLA",
    avaliacao: 5.0,
    numAvaliacoes: 92,
    alturaCamada: 0.12,
    precoAntigo: null,
  },
  {
    id: 8,
    material: "ABS",
    avaliacao: 4.8,
    numAvaliacoes: 203,
    alturaCamada: 0.2,
    precoAntigo: 14.9,
  },
  {
    id: 9,
    material: "PLA",
    avaliacao: 4.5,
    numAvaliacoes: 12,
    alturaCamada: 0.2,
    precoAntigo: null,
  },
  {
    id: 10,
    material: "ABS",
    avaliacao: 4.7,
    numAvaliacoes: 40,
    alturaCamada: 0.16,
    precoAntigo: 10.5,
  },
];

// Junta a um produto da API os campos extra com o mesmo id.
// Se não houver extras para esse id, o produto fica só com os dados da API.
export function juntarExtrasProduto(produto) {
  const extra = extras.find((e) => e.id === produto.id);
  return { ...extra, ...produto };
}

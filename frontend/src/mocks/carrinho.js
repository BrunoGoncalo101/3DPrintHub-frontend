// Itens do carrinho falsos, só até a API do back-end estar pronta.
// Cada item é um produto do catálogo ou um ficheiro enviado pelo cliente.

const carrinhoInicial = [
  {
    id: 1,
    tipo: "catalogo",
    origem: "Catálogo oficial",
    sku: "3DH-DES-089",
    nome: "3D Amor em Linhas Simples",
    etiqueta: "FDM",
    precoUnitario: 15.0,
    quantidade: 1,
    detalhes: [
      { rotulo: "Dimensão", valor: "16 cm (Padrão)" },
      { rotulo: "Polímero", valor: "PLA Matte Bio-Derivado" },
      { rotulo: "Cor", valor: "Preto Fosco / Vermelho" },
      { rotulo: "Camada", valor: "0.16mm (Fine Line)" },
    ],
  },
  {
    id: 2,
    tipo: "upload",
    origem: "Upload CAD técnico",
    sku: null,
    nome: "braco_robotico_eixo3.stl",
    etiqueta: "SLA 8K",
    precoUnitario: 18.5,
    quantidade: 1,
    detalhes: [
      { rotulo: "Volume", valor: "142.5 x 68.0 x 55.2 mm" },
      { rotulo: "Material", valor: "SLA Resina 8K Tough" },
      { rotulo: "Camada", valor: "0.05mm (Micron Pro)" },
      { rotulo: "Infill", valor: "100% Sólido Estrutural" },
    ],
  },
];

export default carrinhoInicial;

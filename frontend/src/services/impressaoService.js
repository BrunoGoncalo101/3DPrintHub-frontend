import { get, post, postForm } from "./API.js";

// Materiais disponíveis: [{ id, name, pricePerGram, density, active }]
export function listarMateriais() {
  return get("/materiais");
}

// Envia o ficheiro STL. Devolve { id, originalName, format, sizeBytes, createdAt }
export async function enviarFicheiro(ficheiro) {
  // O backend ainda pede o userId; se já usar o token, apaga estas duas linhas
  const eu = await get("/utilizadores/me");

  const dados = new FormData();
  dados.append("file", ficheiro);
  dados.append("userId", eu.id);
  return postForm("/files", dados);
}

// TODO: confirmar com o backend o endereço e os nomes dos campos
export function pedirOrcamento({ ficheiroId, materialId, cor, qualidade }) {
  return post("/orcamentos", {
    fileId: ficheiroId,
    materialId,
    color: cor,
    quality: qualidade,
  });
}
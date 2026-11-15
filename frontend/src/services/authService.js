import { post } from "./api.js";

export async function login(email, password) {
  const dados = await post("/auth/login", { email, password });
  if (!dados?.token) throw new Error("A resposta do servidor não trouxe o token.");
  return dados.token; // a API devolve { token, tokenType, expiresIn, user }
}

export async function registar({ nome, email, password, termos }) {
  return post("/auth/registo", {
    name: nome,
    email,
    password,
    acceptedTerms: termos,
  });
}
import { createContext } from "react";

// O carrinho é partilhado por todo o site (cabeçalho, carrinho, checkout)
export const CarrinhoContext = createContext(null);

//O back-end só aceita até 10 unidades por artigo
export const QUANTIDADE_MAXIMA = 10;

import { useContext } from "react";
import { CarrinhoContext } from "./CarrinhoContext.js";

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) {
    throw new Error("useCarrinho tem de ser usado dentro de <CarrinhoProvider>");
  }
  return contexto;
}

import { useState } from "react";
import carrinhoInicial from "../mocks/carrinho.js";
import { CarrinhoContext } from "./CarrinhoContext.js";

export default function CarrinhoProvider({ children }) {
  // Por enquanto o carrinho começa com itens falsos (mocks)
  const [itens, setItens] = useState(carrinhoInicial);

  function adicionar(item) {
    setItens((atual) => {
      const existente = atual.find((i) => i.id === item.id);
      if (existente) {
        // se o item já existe, só soma a quantidade
        return atual.map((i) =>
          i.id === item.id
            ? { ...i, quantidade: i.quantidade + item.quantidade }
            : i,
        );
      }
      return [...atual, item];
    });
  }

  function remover(id) {
    setItens((atual) => atual.filter((i) => i.id !== id));
  }

  function mudarQuantidade(id, quantidade) {
    setItens((atual) =>
      atual.map((i) =>
        i.id === id ? { ...i, quantidade: Math.max(1, quantidade) } : i,
      ),
    );
  }

  const subtotal = itens.reduce((t, i) => t + i.precoUnitario * i.quantidade, 0);
  const totalItens = itens.reduce((t, i) => t + i.quantidade, 0);

  const valor = {
    itens,
    subtotal,
    totalItens,
    adicionar,
    remover,
    mudarQuantidade,
  };

  return (
    <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>
  );
}

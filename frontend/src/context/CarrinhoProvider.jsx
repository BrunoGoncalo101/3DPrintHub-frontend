import { useState } from "react";
import carrinhoInicial from "../mocks/carrinho.js";
import { CarrinhoContext, QUANTIDADE_MAXIMA } from "./CarrinhoContext.js";

// Mantém a quantidade entre 1 e o máximo (10)
function limitarQuantidade(quantidade) {
  return Math.min(QUANTIDADE_MAXIMA, Math.max(1, quantidade));
}

export default function CarrinhoProvider({ children }) {
  // Por enquanto o carrinho começa com itens falsos (mocks)
  const [itens, setItens] = useState(carrinhoInicial);

  function adicionar(item) {
    setItens((atual) => {
      const existente = atual.find((i) => i.id === item.id);
      if (existente) {
        // se o item já existe, só soma a quantidade e a soma nunca passa do maximo
        return atual.map((i) =>
          i.id === item.id
            ? { 
                ...i, 
                quantidade: limitarQuantidade(i.quantidade + item.quantidade), 
              }
            : i,
        );
      }
      return [
        ...atual, 
        { ...item, quantidade: limitarQuantidade(item.quantidade)},
      ];
    });
  }

  function remover(id) {
    setItens((atual) => atual.filter((i) => i.id !== id));
  }

  function limpar() {
    setItens([]);
  }

  function mudarQuantidade(id, quantidade) {
    setItens((atual) =>
      atual.map((i) =>
        i.id === id ? { ...i, quantidade: limitarQuantidade(quantidade) } : i,
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
    limpar,
  };

  return (
    <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>
  );
}

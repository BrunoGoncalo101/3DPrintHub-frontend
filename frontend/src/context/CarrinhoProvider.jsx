import { useEffect, useState } from "react";
import {
  adicionarItem,
  mudarQuantidadeItem,
  obterCarrinho,
  removerItem,
} from "../services/carrinhoService.js";
import { CarrinhoContext, QUANTIDADE_MAXIMA } from "./CarrinhoContext.js";
import { useAuth } from "./useAuth.js";

// Mantém a quantidade entre 1 e o máximo (10)
function limitarQuantidade(quantidade) {
  return Math.min(QUANTIDADE_MAXIMA, Math.max(1, quantidade));
}

export default function CarrinhoProvider({ children }) {
  const { token, autenticado, terminarSessao } = useAuth();
  // O carrinho guarda a sessão a que pertence, para nunca mostrar o carrinho de outra pessoa
  const [carrinho, setCarrinho] = useState({
    token: null,
    itens: [],
    total: 0,
  });
  const [erro, setErro] = useState("");

  const doUtilizador = carrinho.token === token; // já chegou o carrinho desta sessão?
  const itens = doUtilizador ? carrinho.itens : [];
  const totalApi = doUtilizador ? carrinho.total : 0; // o total vem da API
  const carregando = autenticado && !doUtilizador;

  // Quando há sessão, pede o carrinho à API. Sem sessão o carrinho fica vazio.
  useEffect(() => {
    if (!token) return;

    let ativo = true; // evita atualizar o estado se o componente já saiu
    obterCarrinho()
      .then((dados) => {
        if (!ativo) return;
        setCarrinho({ token, itens: dados.itens, total: dados.total });
        setErro("");
      })
      .catch((e) => {
        if (!ativo) return;
        if (e.status === 401)
          terminarSessao(); // sessão expirada
        else {
          setCarrinho({ token, itens: [], total: 0 });
          setErro(e.message);
        }
      });

    return () => {
      ativo = false;
    };
  }, [token, terminarSessao]);

  // Corre um pedido à API que muda o carrinho.
  // Devolve null se correu bem, ou a mensagem de erro da API.
  async function mudarNaApi(pedido) {
    try {
      const dados = await pedido();
      setCarrinho({ token, itens: dados.itens, total: dados.total });
      setErro("");
      return null;
    } catch (e) {
      if (e.status === 401) terminarSessao(); // sessão expirada
      setErro(e.message);
      return e.message;
    }
  }

  function adicionar(item) {
    return mudarNaApi(() =>
      adicionarItem({
        produtoId: item.produtoId,
        materialId: item.materialId,
        corId: item.corId,
        quantidade: limitarQuantidade(item.quantidade),
      }),
    );
  }

  function remover(id) {
    return mudarNaApi(() => removerItem(id));
  }

  function mudarQuantidade(id, quantidade) {
    const nova = limitarQuantidade(quantidade);
    const atual = itens.find((i) => i.id === id);
    if (atual && atual.quantidade === nova) return null; // nada a mudar

    return mudarNaApi(() => mudarQuantidadeItem(id, nova));
  }

  // Depois de a encomenda ser criada o back-end já esvaziou o carrinho
  function limpar() {
    setCarrinho({ token, itens: [], total: 0 });
  }

  const totalItens = itens.reduce((t, i) => t + i.quantidade, 0);

  const valor = {
    itens,
    subtotal: totalApi,
    totalItens,
    carregando,
    erro,
    adicionar,
    remover,
    mudarQuantidade,
    limpar,
  };

  return (
    <CarrinhoContext.Provider value={valor}>
      {children}
    </CarrinhoContext.Provider>
  );
}

import { useState } from "react";
import AdminContext from "./AdminContext.js";
import { encomendasAdmin, ficheirosPendentes } from "../mocks/admin.js";

// PROVISÓRIO: o "modo admin" é só um interruptor guardado no browser, sem API.
// Quando houver login com perfil ADMIN (registo/login via API), isto é
// substituído pelo perfil do utilizador e o botão deixa de aparecer aos clientes.

function lerGuardado(chave, valorInicial) {
  try {
    const texto = localStorage.getItem(chave);
    return texto ? JSON.parse(texto) : valorInicial;
  } catch {
    return valorInicial;
  }
}

function guardar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // sem armazenamento: as alterações ficam só nesta sessão
  }
}

export default function AdminProvider({ children }) {
  const [modoAdmin, setModoAdmin] = useState(() =>
    lerGuardado("modoAdmin", false),
  );
  // Alterações feitas pelo admin por cima dos dados de exemplo
  const [estados, setEstados] = useState(() => lerGuardado("adminEstados", {}));
  const [decisoes, setDecisoes] = useState(() =>
    lerGuardado("adminDecisoes", {}),
  );

  function alterarModoAdmin(ativo) {
    guardar("modoAdmin", ativo);
    setModoAdmin(ativo);
  }

  // Encomendas com as alterações já aplicadas
  const encomendas = encomendasAdmin.map((e) => ({
    ...e,
    ...estados[e.numero],
  }));

  // novoEstado: { fase, pendente, cancelada }
  function mudarEstado(numero, novoEstado) {
    const seguinte = { ...estados, [numero]: novoEstado };
    guardar("adminEstados", seguinte);
    setEstados(seguinte);
  }

  // Ficheiros que ainda esperam decisão
  const ficheiros = ficheirosPendentes.filter((f) => !decisoes[f.id]);

  // decisao: { resultado: "aceite" | "rejeitado", nota?: string }
  function decidirFicheiro(id, decisao) {
    const seguinte = { ...decisoes, [id]: decisao };
    guardar("adminDecisoes", seguinte);
    setDecisoes(seguinte);
  }

  function repor() {
    guardar("adminEstados", {});
    guardar("adminDecisoes", {});
    setEstados({});
    setDecisoes({});
  }

  return (
    <AdminContext.Provider
      value={{
        modoAdmin,
        alterarModoAdmin,
        encomendas,
        mudarEstado,
        ficheiros,
        decisoes,
        decidirFicheiro,
        repor,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

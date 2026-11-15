import { useState } from "react";
import AuthContext from "./AuthContext.js";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  function guardarSessao(novoToken) {
    localStorage.setItem("token", novoToken);
    setToken(novoToken);
  }

  function terminarSessao() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, autenticado: !!token, guardarSessao, terminarSessao }}
    >
      {children}
    </AuthContext.Provider>
  );
}
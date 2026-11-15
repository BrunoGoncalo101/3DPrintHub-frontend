import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

export default function RotaProtegida({ children }) {
  const { autenticado } = useAuth();
  const location = useLocation();

  // Sem sessão: vai para o login e guarda a página que queria abrir
  if (!autenticado) {
    return <Navigate to="/login" replace state={{ de: location.pathname }} />;
  }
  return children;
}
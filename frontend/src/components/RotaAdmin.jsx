import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/useAdmin.js";

// Só deixa ver as páginas de admin com o "modo admin" ligado (provisório).
export default function RotaAdmin({ children }) {
  const { modoAdmin } = useAdmin();

  if (!modoAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

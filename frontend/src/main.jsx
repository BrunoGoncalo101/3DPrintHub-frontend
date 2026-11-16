import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/variaveis.css";
import App from "./App.jsx";
import CarrinhoProvider from "./context/CarrinhoProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import AdminProvider from "./context/AdminProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarrinhoProvider>
          <AdminProvider>
            <App />
          </AdminProvider>
        </CarrinhoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

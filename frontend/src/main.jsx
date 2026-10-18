import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/variaveis.css";
import App from "./App.jsx";
import CarrinhoProvider from "./context/CarrinhoProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CarrinhoProvider>
        <App />
      </CarrinhoProvider>
    </BrowserRouter>
  </StrictMode>
);

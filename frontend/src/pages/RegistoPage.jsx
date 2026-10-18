import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/RegistoPage.css";

const materiais = [
  { nome: "PLA Tough", cor: "verde" },
  { nome: "PETG Carbon Fiber", cor: "azul" },
  { nome: "Resina 8K Bio-Med", cor: "roxo" },
  { nome: "Nylon PA12 ESD", cor: "laranja" },
];
function RegistoPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
    confirmar: "",
    termos: false,
    novidades: false,
  });

  // Atualiza o campo que o utilizador está a escrever
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }
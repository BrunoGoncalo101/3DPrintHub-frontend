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
  // Critérios da palavra-passe
  const criterios = {
    tamanho: form.password.length >= 8,
    numero: /\d/.test(form.password),
    simbolo: /[^A-Za-z0-9]/.test(form.password),
  };
  const cumpridos = Object.values(criterios).filter(Boolean).length;
  const forca = cumpridos === 3 ? "Forte" : cumpridos === 2 ? "Média" : "Fraca";
  const coincidem = form.confirmar !== "" && form.password === form.confirmar;

  function handleSubmit(e) {
    e.preventDefault();
    if (!coincidem) {
      alert("As palavras-passe não coincidem");
      return;
    }
    console.log("Registo:", form); // depois liga-se ao backend
  }

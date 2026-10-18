import { useState } from "react";
import { Link } from "react-router-dom";
import "./PainelPage.css";

const encomendas = [
  { ref: "#ORD-8491", peca: "Engrenagem Biónica PA12", detalhe: "SLS Laser · Nylon Preto", qtd: 2, estado: "Concluído", cor: "verde", total: "48,20 €", acao: "Ver Detalhes", link: true },
  { ref: "#ORD-8495", peca: "3D Amor em Linhas Simples", detalhe: "SLA Resina 8K · Branco Marfim", qtd: 1, estado: "Em produção", cor: "azul", total: "15,00 €", acao: "Acompanhar", link: true },
  { ref: "#ORD-8510", peca: "Suporte Sensor Drone TPU", detalhe: "FDM Industrial · Flex 95A", qtd: 5, estado: "Aprovado", cor: "laranja", total: "32,50 €", acao: "Fila Fabrico", link: false },
  { ref: "#ORD-8522", peca: "Caixa Eletrónica Raspberry Pi", detalhe: "PETG Carbon Fiber · ESD Safe", qtd: 1, estado: "Pendente", cor: "cinza", total: "18,90 €", acao: "Validar Mesh", link: true },
];

const dadosIniciais = {
  nome: "Eng. Duarte Silva",
  email: "d.silva@printlab.pt",
  telemovel: "+351 912 345 678",
  empresa: "PrintLab Prototipagem & Engenharia Lda",
  morada: "Avenida Duque de Ávila, Nº 142, 4º Andar Direito",
  codigoPostal: "1050-085",
  cidade: "Lisboa",
  pais: "Portugal",
  nif: "PT 509 123 456",
  novaPassword: "",
};
function PainelPage() {
  const [dados, setDados] = useState(dadosIniciais);

  // Atualiza o campo que o utilizador está a mexer
  function handleChange(e) {
    setDados({ ...dados, [e.target.name]: e.target.value });
  }

  function guardar() {
    console.log("Guardar:", dados); // depois liga-se ao backend
    alert("Alterações guardadas!");
  }

  function descartar() {
    setDados(dadosIniciais);
  }
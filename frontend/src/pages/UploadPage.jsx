import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/UploadPage.css";

const ficheirosIniciais = [
  { id: 1, nome: "braco_robotico_v4.step", tipo: "STEP", estado: "PRONTO A FATIAR", cor: "verde", info: "Tamanho: 42.8 MB · Carregado: há 10 min · Tolerância: DIN ISO 2768-m", principal: true },
  { id: 2, nome: "suporte_drone_v2.stl", tipo: "STL", estado: "OTIMIZADO FDM", cor: "azul", info: "Tamanho: 18.2 MB · Carregado: ontem · Vol: 32.6 cm³", principal: false },
  { id: 3, nome: "escultura_linhas_simples.3mf", tipo: "3MF", estado: "MULTI-COR / SLA", cor: "roxo", info: "Tamanho: 9.4 MB · Carregado: há 3 dias · Malha: 68.200 triângulos", principal: false },
];

const vantagens = [
  { titulo: "Deteção Automática de Paredes Finas", texto: "O motor alerta caso secções não cumpram a espessura estrutural de 0.8 mm para FDM ou 0.4 mm para Resina." },
  { titulo: "Proteção de Propriedade Intelectual", texto: "Ficheiros armazenados temporariamente em clusters europeus em conformidade com o RGPD e eliminados após produção." },
  { titulo: "Orçamentação em Menos de 5 Segundos", texto: "Cálculo de volume, tempo de máquina e peso em gramas do polímero selecionado com atualização de preço ao vivo." },
];

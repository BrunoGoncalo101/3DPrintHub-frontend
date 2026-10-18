import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
function LoginPage() {
  const navigate = useNavigate();

  // Guarda o que o utilizador escreve
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [erro, setErro] = useState(false);
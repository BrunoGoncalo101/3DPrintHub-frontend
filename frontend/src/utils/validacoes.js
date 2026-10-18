// Validações simples dos formulários (só no front-end, o back-end volta a validar)

export function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}

// Telemóvel português: 9 dígitos a começar por 91, 92, 93 ou 96
export function validarTelemovel(valor) {
  const numero = valor.replace(/[\s-]/g, "").replace(/^(\+351|00351)/, "");
  return /^9[1236]\d{7}$/.test(numero);
}

// Código postal português: 0000-000
export function validarCodigoPostal(valor) {
  return /^\d{4}-\d{3}$/.test(valor.trim());
}

// NIF português: 9 dígitos, o último é um dígito de controlo
export function validarNif(valor) {
  const nif = valor.replace(/\s/g, "");
  if (!/^\d{9}$/.test(nif)) return false;

  const soma = [...nif.slice(0, 8)].reduce(
    (total, digito, i) => total + Number(digito) * (9 - i),
    0,
  );
  const resto = soma % 11;
  const controlo = resto < 2 ? 0 : 11 - resto;

  return controlo === Number(nif[8]);
}

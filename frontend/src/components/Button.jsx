import "./Button.css";

export default function Button({ children, variante = "principal", desativado = false, onClick }) {
  return (
    <button
      type="button"
      className={`botao botao-${variante}`}
      disabled={desativado}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Button from "./components/Button.jsx";

export default function App() {
  return (
    <>
      <Header />

      <main style={{ padding: 32, minHeight: 300 }}>
        <Button>Comprar</Button>
      </main>

      <Footer />
    </>
  );
}
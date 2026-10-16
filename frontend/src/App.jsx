import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/HomePage.jsx";

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Home />
      </main>

      <Footer />
    </>
  );
}
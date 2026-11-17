import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/HomePage.jsx";
import CatalogoPage from "./pages/CatalogoPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegistoPage from "./pages/RegistoPage.jsx";
import RotaProtegida from "./components/RotaProtegida.jsx";
import MaterialsPage from "./pages/MaterialsPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import RotaAdmin from "./components/RotaAdmin.jsx";
import AdminEncomendasPage from "./pages/AdminEncomendasPage.jsx";
import AdminEncomendaPage from "./pages/AdminEncomendaPage.jsx";
import AdminFicheirosPage from "./pages/AdminFicheirosPage.jsx";
import { useAdmin } from "./context/useAdmin.js";
import ImpressaoPage from "./pages/ImpressaoPage.jsx";
import PedidosPage from "./pages/PedidosPage.jsx";

export default function App() {
  const { modoAdmin } = useAdmin();

  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/pedidos"element={
    <RotaProtegida>
      <PedidosPage />
    </RotaProtegida>
  }
/>
          <Route path="/impressao" element={ 
            <RotaProtegida> 
              <ImpressaoPage />
             </RotaProtegida>
  }
/>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/produtos/:id" element={<ProductPage />} />
          <Route
            path="/carrinho"
            element={
              <RotaProtegida>
                <CartPage />
              </RotaProtegida>
            }
          />
          <Route
            path="/checkout"
            element={
              <RotaProtegida>
                <CheckoutPage />
              </RotaProtegida>
            }
          />
          <Route
            path="/encomendas"
            element={
              <RotaProtegida>
                <OrdersPage />
              </RotaProtegida>
            }
          />
          <Route
            path="/encomendas/:numero"
            element={
              <RotaProtegida>
                <OrderDetailPage />
              </RotaProtegida>
            }
          />
          <Route
            path="/admin/encomendas"
            element={
              <RotaAdmin>
                <AdminEncomendasPage />
              </RotaAdmin>
            }
          />
          <Route
            path="/admin/encomendas/:numero"
            element={
              <RotaAdmin>
                <AdminEncomendaPage />
              </RotaAdmin>
            }
          />
          <Route
            path="/admin/ficheiros"
            element={
              <RotaAdmin>
                <AdminFicheirosPage />
              </RotaAdmin>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registo" element={<RegistoPage />} />
          <Route path="/materiais" element={<MaterialsPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* A área de admin não tem rodapé */}
      {!modoAdmin && <Footer />}
    </>
  );
}

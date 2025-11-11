import { Outlet } from "react-router-dom";
import CartSidebar from "../CartSidebar";
import Footer from "../Footer";
import Header from "../Header";
import CartProvider from "../../context/CartContext";

const ClientLayout = () => {
  return (
    <CartProvider>
      <div>
        <Header />
        <CartSidebar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default ClientLayout;

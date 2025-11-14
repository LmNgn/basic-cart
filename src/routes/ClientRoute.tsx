import { Navigate } from "react-router-dom";
import ClientLayout from "../components/layout/ClientLayout";
import ProductList from "../pages/ProductList";
import Cart from "../pages/Cart";

const ClientRoute = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <Navigate to="products" /> },
      { path: "products", element: <ProductList /> },
      { path: "cart", element: <Cart /> },
    ],
  },
];
export default ClientRoute;

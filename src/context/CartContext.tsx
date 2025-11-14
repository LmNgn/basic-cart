import { createContext, useContext, useEffect, useState } from "react";
import {
  addItem,
  clearCart,
  getCart,
  removeItem,
  updateItem,
} from "../api/cartApi";
import toast from "react-hot-toast";
import type { Product } from "../types/product.type";

interface CartContextType {
  cart: Product[];
  updateCart: (data: any) => Promise<void>;
  removeCart: () => Promise<void>;
  removeProduct: (id: number | string) => Promise<void>;
  loadCart: () => Promise<void>;
  changeQuantity: (id: number | string, quantity: number) => Promise<void>;
}
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Lỗi context");
  return context;
};
const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<Product[]>([]);
  const loadCart = async () => {
    try {
      const { data }: any = await getCart();
      const items = Array.isArray(data) ? data : data.items || [];
      setCart(items);
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadCart();
  }, []);
  const updateCart = async (data: Product) => {
    try {
      const exist = cart.find(
        (item: Product) => item.productId === data.productId
      );
      console.log(exist);
      if (exist) {
        await updateItem(exist.id, { ...exist, quantity: exist.quantity + 1 });
        toast.success("Cập nhật sản phẩm thành công");
      }
      if (!exist) {
        await addItem({ ...data, quantity: 1 });
        toast.success("Thêm sản phẩm thành công");
      }
      await loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (id: number | string) => {
    try {
      await removeItem(id);
      await loadCart();
      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const removeCart = async () => {
    try {
      await clearCart();
      await loadCart();
      toast.success("Xóa giỏ thành công");
    } catch (error) {
      console.log(error);
    }
  };
  const changeQuantity = async (id: number | string, quantity: number) => {
    try {
      await updateItem(id, { quantity });
      await loadCart();
      toast.success("Đã cập nhật số lượng");
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi cập nhật số lượng");
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        updateCart,
        removeCart,
        removeProduct,
        loadCart,
        changeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

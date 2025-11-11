import { createContext, useEffect, useState } from "react";
import {
  addItem,
  clearCart,
  getCart,
  removeItem,
  updateItem,
} from "../api/cartApi";
import toast from "react-hot-toast";

export const CartContext = createContext(undefined);
const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any>([]);
  const loadCart = async () => {
    try {
      const data: any = await getCart();
      setCart(data);
      localStorage.setItem("cart", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadCart();
  }, []);
  const updateCart = async (data: any) => {
    try {
      const exit = cart.find((item: any) => item.productId === data.productId);
      if (exit) {
        await updateItem(exit.id, { quantity: exit.quantity + 1 });
        toast.success("Cập nhật sản phẩm thành công");
      }
      if (!exit) {
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

  return (
    <CartContext.Provider
      value={{ cart, updateCart, removeCart, removeProduct, loadCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

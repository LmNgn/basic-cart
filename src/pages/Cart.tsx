import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart } = useCart();
  const nav = useNavigate();
  const getCartSummary = () => {
    let subtotal = 0;
    let discountTotal = 0;

    for (const item of cart) {
      const quantity = item.quantity ?? 1;
      const price = item.price ?? 0;
      const discount = item.discountPercentage ?? 0;

      const original = price * quantity;
      const discounted = price * (1 - discount / 100) * quantity;

      subtotal += original;
      discountTotal += original - discounted;
    }

    const shipping = cart.length > 0 ? 5 : 0;
    const total = subtotal - discountTotal + shipping;

    return {
      subtotal,
      discountTotal,
      shipping,
      total,
    };
  };

  const { subtotal, discountTotal, shipping, total } = getCartSummary();
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-foreground mb-8">Giỏ hàng</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => <CartItem key={item.id} {...item} />)
            ) : (
              <p className="text-muted-foreground">Giỏ hàng đang trống.</p>
            )}
          </div>

          <div className="h-fit p-6 border border-border rounded-lg bg-card sticky top-20">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-foreground">
                <span>Tạm tính</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-destructive">
                <span>Giảm (18%)</span>
                <span>-${discountTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Phí giao</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <div className="border-t border-border pt-3 flex justify-between text-base font-bold text-foreground">
                <span>Tổng</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity">
              Thanh toán
            </button>

            <button
              onClick={() => nav("/")}
              className="w-full mt-3 border border-border text-foreground font-semibold py-2 rounded-lg hover:bg-muted transition-colors"
            >
              Tiếp tục mua sắp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

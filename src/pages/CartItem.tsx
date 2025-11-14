import { useState } from "react";
import type { Product } from "../types/product.type";
import { useCart } from "../context/CartContext";

const CartItem = ({
  title,
  price,
  thumbnail,
  discountPercentage,
  quantity,
  id,
}: Product) => {
  const { changeQuantity, removeProduct } = useCart();
  const [qty, setQty] = useState(quantity ?? 1);

  const handleQtyChange = async (newQty: number) => {
    if (newQty < 1) return;
    setQty(newQty);
    await changeQuantity(id, newQty);
  };
  const handleRemove = async () => {
    const confirmDelete = confirm(
      `Bạn có chắc muốn xóa "${title}" khỏi giỏ hàng?`
    );
    if (!confirmDelete) return;
    await removeProduct(id);
  };
  const discountedPrice = discountPercentage
    ? price * (1 - discountPercentage / 100)
    : price;
  const totalPrice = discountedPrice * qty;
  const originalTotal = price * qty;
  const savings = originalTotal - totalPrice;
  return (
    <div className="flex gap-4 p-4 border border-border rounded-lg bg-card hover:shadow-md transition-shadow">
      <div className="relative w-24 h-24 shrink-0 bg-muted rounded-lg overflow-hidden">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-foreground text-base line-clamp-2">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            ${Number(discountedPrice).toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ${Number(price).toFixed(2)}
          </span>
          {discountPercentage && (
            <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded">
              -{discountPercentage.toFixed(0)}%
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center border border-border rounded-lg bg-muted">
          <button
            onClick={() => handleQtyChange(qty - 1)}
            className="px-2 py-1 text-foreground hover:bg-input transition-colors"
          >
            −
          </button>
          <span className="px-3 py-1 text-foreground font-semibold">{qty}</span>
          <button
            onClick={() => handleQtyChange(qty + 1)}
            className="px-2 py-1 text-foreground hover:bg-input transition-colors"
          >
            +
          </button>
        </div>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-lg font-bold text-foreground">
            ${totalPrice.toFixed(2)}
          </p>
          {savings > 0 && (
            <p className="text-xs text-destructive">
              Save ${savings.toFixed(2)}
            </p>
          )}
        </div>

        <button
          onClick={handleRemove}
          className="text-destructive hover:text-destructive/80 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;

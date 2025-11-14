import { useState } from "react";
import { useCart } from "../context/CartContext";
import type { ProductCardProps } from "../types/product.type";

const ProductCard = ({ product }: ProductCardProps) => {
  const { updateCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price.toFixed(2);

  const handlePurchase = () => {
    updateCart({
      productId: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      discountPercentage: product.discountPercentage,
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <img
          src={
            product.thumbnail ||
            "/placeholder.svg?height=200&width=200&query=product"
          }
          alt={product.title}
          className={`w-full h-full object-cover ${
            isHovered ? "scale-105" : ""
          } transition-transform duration-300`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>

      <div className="p-4">
        <div className="inline-block">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-muted px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold text-card-foreground line-clamp-2 hover:text-primary transition-colors">
          {product.title}
        </h3>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-card-foreground">
            ${discountedPrice}
          </span>
          {product.discountPercentage && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-destructive">
                -{product.discountPercentage}%
              </span>
            </>
          )}
        </div>

        <button
          onClick={handlePurchase}
          className="w-full mt-4 bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 active:scale-95 transition-all duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

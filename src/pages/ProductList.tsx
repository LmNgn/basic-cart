import { useEffect, useState } from "react";
import { getProducts } from "../api/commonApi";
import ProductCard from "./ProductCard";
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail?: string;
  discountPercentage?: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const loadProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <div className="w-full">
      <div className="bg-primary text-primary-foreground py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">Our Products</h1>
          <p className="mt-2 text-lg opacity-90">
            Discover our curated collection
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

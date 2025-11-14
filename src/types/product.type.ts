export type Product = {
  id: number;
  productId: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail?: string;
  discountPercentage?: number;
};
export interface ProductCardProps {
  product: {
    id: number;
    title: string;
    category: string;
    price: number;
    thumbnail?: string;
    discountPercentage?: number;
  };
}

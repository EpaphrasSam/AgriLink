"use client";
import { Product } from "@/types/ProductTypes";
import CardItems from "@/components/global/CardItems";

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  return (
    <div className="w-full py-4 flex">
      {products.map((product) => (
        <CardItems key={product.id} product={product} showFarmer={false} />
      ))}
    </div>
  );
}

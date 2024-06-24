import ProductCard from "@/components/global/ProductCard";
import { Product } from "@/types/ProductTypes";
import React from "react";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const categorizedProducts = products.reduce((acc: any, product: any) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="w-full p-4">
      {Object.keys(categorizedProducts).length === 0 ? (
        <div className="text-center text-5xl text-gray-500">
          No products available
        </div>
      ) : (
        Object.keys(categorizedProducts).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold sticky top-0 bg-white pb-2 z-20">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorizedProducts[category].map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductGrid;

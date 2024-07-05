"use client";
import ProductCard from "@/components/global/ProductCard";
import { ProductWithReviews } from "@/types/ProductTypes";

interface ProductsProps {
  products: ProductWithReviews[];
}

const FarmersProducts = ({ products }: ProductsProps) => {
  const categorizedProducts = products.reduce((acc: any, product: any) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  if (products.length === 0) {
    <div className="h-screen flex justify-center items-center text-3xl font-bold text-gray-500">
      No products available
    </div>;
  }
  return (
    <div className="w-full py-4 flex flex-wrap">
      {Object.keys(categorizedProducts).map((category) => (
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
      ))}
    </div>
  );
};

export default FarmersProducts;

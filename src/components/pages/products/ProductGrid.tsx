import React from "react";
import CardItems from "@/components/global/CardItems";

const ProductGrid = ({ products }: any) => {
  const categorizedProducts = products.reduce((acc: any, product: any) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="w-full p-4">
      {Object.keys(categorizedProducts).map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold sticky top-0 bg-white pb-2 z-20">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categorizedProducts[category].map((product: any) => (
              <CardItems key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

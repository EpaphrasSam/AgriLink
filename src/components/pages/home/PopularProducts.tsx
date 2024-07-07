"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import {
  CustomLeftArrow,
  CustomRightArrow,
} from "@/components/global/CustomArrows";
import Carousel from "react-multi-carousel";
import ProductCard from "@/components/global/ProductCard";
import { ProductWithReviews } from "@/types/ProductTypes";
import SkeletonLoader from "@/components/global/SkeletonLoader";

const responsive = {
  LargeDesktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1400, min: 1200 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1200, min: 848 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 930, min: 648 },
    items: 2,
  },
  smallMobile: {
    breakpoint: { max: 648, min: 0 },
    items: 1,
  },
};

interface PopularProductsProps {
  products: ProductWithReviews[];
}

const PopularProducts = ({ products }: PopularProductsProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products) {
      setLoading(false);
    }
  }, [products]);

  return (
    <div className="min-h-[300px] w-full py-4">
      {loading ? (
        <SkeletonLoader />
      ) : products.length === 0 ? (
        <div className="flex items-center text-gray-500 font-semibold justify-center">
          No products found
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          ssr={true}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          swipeable
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default PopularProducts;

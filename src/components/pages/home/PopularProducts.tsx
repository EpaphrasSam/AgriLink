"use client";

import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import {
  CustomLeftArrow,
  CustomRightArrow,
} from "@/components/global/CustomArrows";
import Carousel from "react-multi-carousel";
import { Product } from "@/types/ProductTypes";
import ProductCard from "@/components/global/ProductCard";

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

const PopularProducts = () => {
  const products: Product[] = [
    {
      id: 1,
      title: "Strawberries",
      category: "Fruit",
      price: 5.99,
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      farm: "Berry Farm",
    },
    {
      id: 2,
      title: "Carrots",
      category: "Vegetables",
      price: 2.99,
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      farm: "Roots Farm",
    },
    {
      id: 3,
      title: "Milk",
      category: "Dairy",
      price: 3.99,
      rating: 3,
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      farm: "Dairy Delight",
    },
    {
      id: 4,
      title: "Orange",
      category: "Fruit",
      price: 10.99,
      rating: 4,
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0XJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      farm: "Citrus Grove",
    },
  ];

  return (
    <div className="w-full py-4">
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
    </div>
  );
};

export default PopularProducts;

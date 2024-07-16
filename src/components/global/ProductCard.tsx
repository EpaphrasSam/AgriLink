import useCartStore from "@/store/useCartStore";
import { ProductWithReviews } from "@/types/ProductTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdStarRate } from "react-icons/md";
import { PiFarmLight } from "react-icons/pi";

interface CardItemsProps {
  product: ProductWithReviews;
  showFarmer?: boolean;
}

const ProductCard = ({ product, showFarmer = true }: CardItemsProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const averageRating =
    product.reviews.length > 0
      ? (
          product.reviews.reduce((acc, review) => acc + review?.rating!, 0) /
          product.reviews.length
        ).toFixed(1)
      : "N/A";

  return (
    <>
      <div
        key={product.id}
        className="flex flex-col h-[350px] max-w-[250px] justify-center m-2"
      >
        <div className="w-full h-[200px] rounded-lg overflow-hidden shadow-sm bg-white ">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center hover:scale-105 transition-all duration-300"
              width={250}
              height={200}
            />
          </Link>
        </div>
        <div className="px-2 py-4">
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl line-clamp-1 flex-shrink-1">
              {product.name}
            </p>
            <p className="text-md font-semibold text-gray-600 flex-shrink-0">
              GHS {product.price}
            </p>
          </div>

          {showFarmer && (
            <div className="flex items-center space-x-1">
              <PiFarmLight className="text-yellow-400 text-md" />
              <span className="text-gray-700 text-base">
                {product.farmer.name}
              </span>
            </div>
          )}

          <div className="flex items-center space-x-1">
            <MdStarRate className="text-yellow-400 text-md" />
            <span className="text-md font-semibold text-yellow-600">
              {averageRating}
            </span>
          </div>
          <div className="flex justify-evenly items-center text-sm mt-2 text-gray-600 font-semibold">
            <p
              className="underline underline-offset-4 hover:opacity-75 cursor-pointer"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

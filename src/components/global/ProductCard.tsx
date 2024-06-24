import useCartStore from "@/store/useCartStore";
import { Product } from "@/types/ProductTypes";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { MdStarRate } from "react-icons/md";
import { PiFarmLight } from "react-icons/pi";

interface CardItemsProps {
  product: Product;
  showFarmer?: boolean;
}

const ProductCard = ({ product, showFarmer = true }: CardItemsProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <>
      <div
        key={product.id}
        className="flex flex-col max-w-[250px] justify-center m-2"
      >
        <div className="w-full rounded-lg overflow-hidden shadow-sm bg-white ">
          <Image
            src={product.image}
            alt="Sunrise Orchard"
            width="100%"
            height={300}
            className="w-full object-cover"
          />
        </div>
        <div className="px-2 py-4">
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl line-clamp-1">{product.title}</p>
            <p className="text-md font-semibold text-gray-600">
              GHS {product.price}
            </p>
          </div>

          {showFarmer && (
            <div className="flex items-center space-x-1">
              <PiFarmLight className="text-yellow-400 text-md" />
              <span className="text-gray-700 text-base">{product.farm}</span>
            </div>
          )}

          <div className="flex items-center space-x-1">
            <MdStarRate className="text-yellow-400 text-md" />
            <span className="text-md font-semibold text-yellow-600">4.5</span>
          </div>
          <div className="flex justify-evenly items-center text-sm mt-2 text-gray-600 font-semibold">
            <Link
              href={`/products/${product.id}`}
              className="underline underline-offset-4 hover:opacity-75"
            >
              View Product
            </Link>
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

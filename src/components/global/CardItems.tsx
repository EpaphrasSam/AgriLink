import { Product } from "@/types/ProductTypes";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React from "react";
import { MdStarRate } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import { PiFarmLight } from "react-icons/pi";

interface CardItemsProps {
  product: Product;
  showFarmer?: boolean;
}

const CardItems = ({ product, showFarmer = true }: CardItemsProps) => {
  return (
    <>
      <div
        key={product.id}
        className="flex flex-col justify-center m-2 cursor-pointer "
      >
        <div className="max-w-[250px] rounded-lg overflow-hidden shadow-sm bg-white ">
          <Image
            src={product.image}
            alt="Sunrise Orchard"
            width="100%"
            height={300} // Fixed height for consistent design
            className="w-full object-cover"
          />
        </div>
        <div className="px-2 py-4">
          <div>
            <p className="font-bold text-xl ">{product.title}</p>
          </div>
          <div>
            <span className="text-md font-semibold text-gray-600">
              GHS {product.price}
            </span>
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
        </div>
      </div>
    </>
  );
};

export default CardItems;

import { Product } from "@/types/ProductTypes";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React from "react";

interface CardItemsProps {
  product: Product;
}

const CardItems = ({ product }: CardItemsProps) => {
  return (
    <>
      <div key={product.id} className="flex justify-center m-2">
        <Card className="w-[250px] h-[300px]" isPressable>
          <CardBody className="p-0 overflow-visible">
            <Image
              shadow="sm"
              width="100%"
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </CardBody>
          <CardFooter className="mt-2 text-center flex flex-col gap-2">
            <h2 className="text-xl font-bold">{product.title}</h2>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default CardItems;

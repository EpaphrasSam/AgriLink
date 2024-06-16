import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React from "react";

interface CardItemsProps {
  item: any;
}

const CardItems = ({ item }: CardItemsProps) => {
  return (
    <>
      <div key={item.id} className="flex justify-center m-2">
        <Card className="w-[250px] h-[300px]" isPressable>
          <CardBody className="p-0 overflow-visible">
            <Image
              shadow="sm"
              width="100%"
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          </CardBody>
          <CardFooter className="mt-2 text-center flex flex-col gap-2">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default CardItems;

import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";

interface ProductItemProps {
  product: {
    id: string;
    name: string;
    images: string[];
    price: number;
    quantity: number;
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="text-sm text-gray-800 font-semibold">
              {product?.name}
            </div>
          </div>

          <div className="flex gap-1 items-center">
            <p className="text-sm">GHS{product?.price}</p>
            <p className="text-[14px] justify-end flex text-gray-500">
              x {product?.quantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderAccordion = ({ data, type }: { data: any; type: string }) => {
  const renderAccordionSummary = () => {
    return (
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${type}-content`}
        id={`panel-${type}-header`}
      >
        <div>
          <ProductItem product={data[0]} />
        </div>
      </AccordionSummary>
    );
  };

  return (
    <Accordion style={{ border: "none", boxShadow: "none" }}>
      {renderAccordionSummary()}
    </Accordion>
  );
};

export default OrderAccordion;

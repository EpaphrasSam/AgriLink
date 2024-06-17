"use client";

import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import {
  CustomLeftArrow,
  CustomRightArrow,
} from "@/components/global/CustomArrows";
import Carousel from "react-multi-carousel";

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

const TopRatedCarousel = () => {
  const items = [
    {
      id: 1,
      title: "Farmer John",
      description: "Top-rated farmer with the best organic produce.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    },
    {
      id: 2,
      title: "Fresh Apples",
      description: "Crisp and delicious apples from the best orchards.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    },
    {
      id: 3,
      title: "Organic Carrots",
      description: "Sweet and crunchy organic carrots.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    },
    {
      id: 4,
      title: "Organic Carrots",
      description: "Sweet and crunchy organic carrots.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    },
    {
      id: 5,
      title: "Organic Carrots",
      description: "Sweet and crunchy organic carrots.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    },
  ];

  return (
    <div className="w-full py-4">
      <Carousel
        responsive={responsive}
        ssr={true}
        // autoPlay
        // autoPlaySpeed={3000}
        // infinite
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        swipeable
      >
        {items.map((item) => (
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
        ))}
      </Carousel>
    </div>
  );
};

export default TopRatedCarousel;
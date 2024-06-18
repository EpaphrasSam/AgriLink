"use client";

import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import {
  CustomLeftArrow,
  CustomRightArrow,
} from "@/components/global/CustomArrows";
import Carousel from "react-multi-carousel";
import { MdStarRate } from "react-icons/md";

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
const handleClick = () => {
  console.log("clicked");
};

const TopRatedCarousel = () => {
  const items = [
    {
      id: 1,
      title: "Farmer John",
      description: "Top-rated farmer with the best organic produce.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      town: "Accra",
      region: "Greater Accra",
    },
    {
      id: 2,
      title: "Fresh Apples",
      description: "Crisp and delicious apples from the best orchards.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      town: "Accra",
      region: "Greater Accra",
    },
    {
      id: 3,
      title: "Organic Carrots",
      description: "Sweet and crunchy organic carrots.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      town: "Accra",
      region: "Greater Accra",
    },
    {
      id: 4,
      title: "Organic Carrots",
      description: "Sweet and crunchy organic carrots.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      town: "Accra",
      region: "Greater Accra",
    },
    {
      id: 5,
      title: "Organic Carrots",
      description: "Sweet and crunchy organic carrots.",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
      town: "Accra",
      region: "Greater Accra",
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
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-center m-2 cursor-pointer "
            onClick={handleClick}
          >
            <div className="max-w-md rounded-lg overflow-hidden shadow-sm bg-white ">
              <Image
                src={item.image}
                alt="Sunrise Orchard"
                width="100%"
                height={300} // Fixed height for consistent design
                className="w-full object-cover"
              />
            </div>
            <div className="px-6 py-4">
              <p className="font-bold text-xl ">{item.title}</p>
              <p className="text-gray-700 text-base">
                {item.town}, {item.region}
              </p>
              <div className="flex items-center space-x-2">
                <MdStarRate className="text-yellow-400 text-md" />
                <span className="text-md font-semibold text-yellow-600">
                  4.5
                </span>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TopRatedCarousel;

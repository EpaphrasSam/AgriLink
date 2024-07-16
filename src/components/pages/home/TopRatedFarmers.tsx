"use client";

import React, { useEffect, useState } from "react";
import {
  CustomLeftArrow,
  CustomRightArrow,
} from "@/components/global/CustomArrows";
import Carousel from "react-multi-carousel";
import { MdStarRate } from "react-icons/md";
import Link from "next/link";
import { Farmer, Review } from "@prisma/client";
import SkeletonLoader from "@/components/global/SkeletonLoader";
import Image from "next/image";

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

interface TopRatedFarmersProps {
  farmers: (Farmer & { reviews: Review[] })[];
}

const TopRatedFarmers = ({ farmers }: TopRatedFarmersProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (farmers) {
      setLoading(false);
    }
  }, [farmers]);

  return (
    <div className="w-full min-h-[300px] py-4">
      {loading ? (
        <SkeletonLoader />
      ) : farmers.length === 0 ? (
        <div className="flex items-center text-gray-500 font-semibold justify-center">
          No farmers found
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          ssr={true}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          swipeable
        >
          {farmers.map((farmer) => (
            <Link
              href={`/farmers/${farmer.slug}`}
              key={farmer.id}
              className="flex flex-col h-[350px] justify-center m-2 transition-all duration-300 hover:scale-105"
            >
              <div className="max-w-md h-[200px] rounded-lg overflow-hidden shadow-sm bg-white ">
                <Image
                  src={farmer.image}
                  alt={farmer.name}
                  className="w-full h-full object-cover object-center"
                  width={250}
                  height={200}
                />
              </div>
              <div className="px-2 py-4">
                <p className="font-bold text-xl ">{farmer.name}</p>
                <p className="text-gray-700 text-base">
                  {farmer.town}, {farmer.region}
                </p>
                <div className="flex items-center space-x-2">
                  <MdStarRate className="text-yellow-400 text-md" />
                  <span className="text-md font-semibold text-yellow-600">
                    {farmer.reviews.length > 0
                      ? (
                          farmer.reviews.reduce(
                            (acc, review) => acc + review?.rating!,
                            0
                          ) / farmer.reviews.length
                        ).toFixed(1)
                      : "N/A"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default TopRatedFarmers;

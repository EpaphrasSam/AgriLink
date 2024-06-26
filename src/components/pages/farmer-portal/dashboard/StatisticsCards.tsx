"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

interface StatisticsCardsProps {
  stats: {
    totalSales: number;
    orders: number;
    products: number;
    ratings: number;
  };
}

const StatisticsCards = ({ stats }: StatisticsCardsProps) => {
  const statsArray = [
    { title: "Sales", value: `GHS ${stats?.totalSales.toFixed(2)}` },
    { title: "Orders", value: stats?.orders },
    { title: "Products", value: stats?.products },
    { title: "Ratings", value: stats?.ratings },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsArray.map((item: any, index: number) => (
        <Card key={index} className="bg-white p-4 rounded-lg shadow-md">
          <CardHeader className="text-md text-gray-500 font-semibold">
            {item.title}
          </CardHeader>
          <CardBody className="text-gray-700 font-semibold text-xl">
            {item.value}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCards;

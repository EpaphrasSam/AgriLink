"use server";

import prisma from "@/utils/prisma";

export const getTopRatedFarmers = async () => {
  try {
    const farmers = await prisma.farmer.findMany({
      include: {
        reviews: true,
      },
    });

    const farmersWithAvgRating = farmers.map((farmer) => {
      const avgRating =
        farmer.reviews.length > 0
          ? farmer.reviews.reduce((acc, review) => acc + review.rating, 0) /
            farmer.reviews.length
          : 0;
      return { ...farmer, avgRating };
    });

    farmersWithAvgRating.sort((a, b) => b.avgRating - a.avgRating);

    const topFarmers = farmersWithAvgRating.slice(0, 5);

    return {
      farmers: topFarmers,
      error: null,
    };
  } catch (error) {
    return {
      farmers: [],
      error: "Something went wrong",
    };
  }
};

export const getAllFarmers = async () => {
  try {
    const farmers = await prisma.farmer.findMany({
      include: {
        reviews: true,
      },
    });

    return {
      farmers,
      error: null,
    };
  } catch (error) {
    return {
      farmers: [],
      error: "Something went wrong",
    };
  }
};

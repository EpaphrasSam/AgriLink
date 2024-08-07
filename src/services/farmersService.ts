"use server";

import prisma from "@/utils/prisma";

export const getFarmerBySlug = async (slug: string) => {
  try {
    const farmer = await prisma.farmer.findUnique({
      where: { slug },
      include: {
        products: {
          include: {
            reviews: {
              where: {
                OR: [
                  { parentReviewId: null },
                  { parentReviewId: { isSet: false } },
                ],
              },
            },
            farmer: true,
          },
        },
        reviews: {
          where: {
            OR: [
              { parentReviewId: null },
              { parentReviewId: { isSet: false } },
            ],
          },
          include: {
            user: true,
            farmer: true,
            replies: {
              include: {
                user: true,
                farmer: true,
                replies: {
                  include: {
                    user: true,
                    farmer: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!farmer) {
      return { farmer: null, error: "Farmer not found" };
    }

    return { farmer, error: null };
  } catch (error) {
    return { farmer: null, error: "Something went wrong" };
  }
};

export const getTopRatedFarmers = async () => {
  try {
    const farmers = await prisma.farmer.findMany({
      include: {
        reviews: {
          where: {
            OR: [
              { parentReviewId: null },
              { parentReviewId: { isSet: false } },
            ],
          },
        },
      },
    });

    const farmersWithAvgRating = farmers.map((farmer) => {
      const avgRating =
        farmer.reviews.length > 0
          ? farmer.reviews.reduce((acc, review) => acc + review?.rating!, 0) /
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
        reviews: {
          where: {
            OR: [
              { parentReviewId: null },
              { parentReviewId: { isSet: false } },
            ],
          },
        },
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

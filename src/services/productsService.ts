"use server";

import prisma from "@/utils/prisma";

export const getPopularProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        reviews: true,
        farmer: true,
      },
    });

    const productsWithAvgRating = products.map((product) => {
      const avgRating =
        product.reviews.length > 0
          ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length
          : 0;
      return { ...product, avgRating };
    });

    productsWithAvgRating.sort((a, b) => b.avgRating - a.avgRating);

    const topProducts = productsWithAvgRating.slice(0, 5);

    return {
      products: topProducts,
      error: null,
    };
  } catch (error) {
    return {
      products: [],
      error: "Something went wrong",
    };
  }
};

export const getRecentProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        reviews: true,
        farmer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return {
      products,
      error: null,
    };
  } catch (error) {
    return {
      products: [],
      error: "Something went wrong",
    };
  }
};

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        reviews: true,
        farmer: true,
      },
    });

    return {
      products,
      error: null,
    };
  } catch (error) {
    return {
      products: [],
      error: "Something went wrong",
    };
  }
};

"use server";

import { FarmerOrders } from "@/types/OrdersTypes";
import prisma from "@/utils/prisma";
import { Product, Farmer } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getFarmerStats = async (farmerId: string) => {
  try {
    const result = await prisma.$transaction([
      prisma.order.aggregate({
        where: {
          farmerId,
        },
        _sum: {
          amount: true,
        },
      }),
      prisma.order.count({
        where: {
          farmerId,
        },
      }),
      prisma.product.count({
        where: {
          farmerId,
        },
      }),
      prisma.review.aggregate({
        where: {
          farmerId,
          OR: [{ parentReviewId: null }, { parentReviewId: { isSet: false } }],
        },
        _avg: {
          rating: true,
        },
      }),
    ]);

    const [totalSales, ordersCount, productsCount, averageRating] = result;

    return {
      stats: {
        totalSales: totalSales._sum.amount || 0,
        orders: ordersCount,
        products: productsCount,
        ratings: averageRating._avg.rating || 0,
      },
      error: null,
    };
  } catch (error) {
    return {
      stats: {
        totalSales: 0,
        orders: 0,
        products: 0,
        ratings: 0,
      },
      error: "Something went wrong",
    };
  }
};

export const getFarmerOrders = async (
  farmerId: string,
  isRecent: boolean = false
) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        farmerId,
      },
      take: isRecent ? 10 : undefined,
      include: {
        user: true,
        product: true,
      },
    });

    const formattedOrders: FarmerOrders[] = orders.map((order) => ({
      id: order.id,
      orderID: order.orderID,
      createdAt: order.createdAt,
      amount: order.amount,
      userName: order.name,
      userEmail: order.user.email,
      contact: order.contact,
      shippingStatus: order.status,
      shippingAddress: order.address,
      quantity: order.quantity,
      products: [
        {
          id: order.product.id,
          name: order.product.name,
          price: order.product.price,
          slug: order.product.slug,
          images: order.product.images,
        },
      ],
    }));

    return {
      orders: formattedOrders,
      error: null,
    };
  } catch (error) {
    return {
      orders: [],
      error: "Something went wrong",
    };
  }
};

export const updateOrderStatus = async (orderId: string, action: string) => {
  try {
    let status: string;

    switch (action) {
      case "Ship":
        status = "Shipping";
        break;
      case "Complete":
        status = "Completed";
        break;
      case "Cancel":
        status = "Canceled";
        break;
      default:
        status = "Pending";
        break;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: status },
    });

    revalidatePath("/farmer-portal/orders");
    revalidatePath("/farmer-portal/dashboard");
    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getFarmerProducts = async (farmerId: string) => {
  try {
    const products = await prisma.product.findMany({
      where: { farmerId },
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

export const addProduct = async (productData: Product) => {
  try {
    const { id, farmerId, ...data } = productData;

    if (id) {
      await prisma.product.update({
        where: { id },
        data,
      });
    } else {
      await prisma.product.create({
        data: {
          ...data,
          farmer: {
            connect: {
              id: farmerId,
            },
          },
        },
      });
    }

    revalidatePath("/farmer-portal/products");
    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath("/farmer-portal/products");
    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const updateFarmerDetails = async (
  farmerId: string,
  details: Partial<Farmer>
) => {
  try {
    await prisma.farmer.update({
      where: { id: farmerId },
      data: details,
    });

    revalidatePath("/farmer-portal/profile");
    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getFarmerAndProductReviews = async (farmerId: string) => {
  try {
    const farmer = await prisma.farmer.findUnique({
      where: { id: farmerId },
      include: {
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
        products: {
          include: {
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
            farmer: true,
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

export const getFarmerInteractions = async (farmerId: string) => {
  try {
    const forums = await prisma.forum.findMany({
      include: {
        posts: {
          include: {
            user: true,
            replies: {
              include: {
                user: true,
                replies: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        createdBy: true,
      },
    });

    const conversations = await prisma.conversation.findMany({
      where: { farmerId: farmerId },
      include: {
        user: true,
        farmer: true,
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    const filteredConversations = conversations.filter(
      (conversation) => conversation.messages.length > 0
    );

    return {
      interactions: { forums, conversations: filteredConversations },
      error: null,
    };
  } catch (error) {
    return {
      interactions: { forums: [], conversations: [] },
      error: "Something went wrong",
    };
  }
};

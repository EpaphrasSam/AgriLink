"use server";

import { FarmerOrders } from "@/types/OrdersTypes";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export const getFarmerStats = async () => {
  try {
    const totalSales = await prisma.order.aggregate({
      _sum: {
        amount: true,
      },
    });

    const ordersCount = await prisma.order.count();
    const productsCount = await prisma.product.count();

    const averageRating = await prisma.review.aggregate({
      _avg: {
        rating: true,
      },
    });

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

export const getFarmerOrders = async (isRecent: boolean = false) => {
  try {
    const orders = await prisma.order.findMany({
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
      userName: order.user.username,
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

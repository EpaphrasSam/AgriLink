"use server";

import prisma from "@/utils/prisma";
import { UserOrder } from "@/types/OrdersTypes";

export const getMyOrders = async (userId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true,
        farmer: true,
      },
    });

    const groupedOrders = orders.reduce(
      (acc: Record<string, UserOrder>, order) => {
        if (!acc[order.orderID]) {
          acc[order.orderID] = {
            id: order.id,
            orderID: order.orderID,
            createdAt: order.createdAt,
            amount: order.amount,
            name: order.name,
            contact: order.contact,
            shippingStatus: order.status,
            shippingAddress: order.address,
            quantity: order.quantity,
            products: [],
            farmer: {
              id: order.farmer.id,
              name: order.farmer.name,
            },
          };
        }
        acc[order.orderID].products.push({
          id: order.product.id,
          name: order.product.name,
          price: order.product.price,
          slug: order.product.slug,
          images: order.product.images,
        });
        return acc;
      },
      {}
    );

    return { error: null, orders: Object.values(groupedOrders) };
  } catch (error: any) {
    return { error: error.message, orders: [] };
  }
};

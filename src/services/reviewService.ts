"use server";

import { auth } from "@/utils/auth/auth";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export const addReview = async (
  rating: number,
  comment: string,
  productId?: string,
  farmerId?: string
) => {
  try {
    const session = await auth();
    if (!session) throw new Error("User not authenticated");

    const userId = session.user.id;

    const data: any = {
      rating,
      comment,
      userId,
    };

    if (productId) data.productId = productId;
    if (farmerId) data.farmerId = farmerId;

    await prisma.review.create({
      data,
    });

    if (productId) {
      revalidatePath(`/product/${productId}`);
      revalidatePath("farmer-portal/products");
    } else if (farmerId) {
      revalidatePath(`/farmers/${farmerId}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to add review:", error);
    throw error;
  }
};

export const replyToReview = async (
  reviewId: string,
  reply: string,
  productId?: string,
  farmerId?: string
) => {
  try {
    const session = await auth();
    if (!session) throw new Error("User not authenticated");

    const userId = session.user.id;

    const data: any = {
      comment: reply,
      userId,
      parentReviewId: reviewId,
    };

    if (productId) data.productId = productId;
    if (farmerId) data.farmerId = farmerId;

    await prisma.review.create({
      data,
    });

    if (productId) {
      revalidatePath(`/product/${productId}`);
      revalidatePath("farmer-portal/products");
    } else if (farmerId) {
      revalidatePath(`/farmers/${farmerId}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to reply to review:", error);
    throw error;
  }
};

"use server";

import { auth } from "@/utils/auth/auth";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export const addReview = async (
  productId: string,
  rating: number,
  comment: string
) => {
  try {
    const session = await auth();
    if (!session) throw new Error("User not authenticated");

    const userId = session.user.id;

    await prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        productId,
      },
    });
    revalidatePath(`/product/${productId}`);
    revalidatePath("farmer-portal/products");
    return true;
  } catch (error) {
    console.error("Failed to add review:", error);
    throw error;
  }
};

export const replyToReview = async (
  reviewId: string,
  reply: string,
  productId: string
) => {
  try {
    const session = await auth();
    if (!session) throw new Error("User not authenticated");

    const userId = session.user.id;

    await prisma.review.create({
      data: {
        comment: reply,
        userId,
        parentReviewId: reviewId,
        productId,
      },
    });

    revalidatePath(`/product/${productId}`);
    revalidatePath("farmer-portal/products");

    return true;
  } catch (error) {
    console.error("Failed to reply to review:", error);
    throw error;
  }
};

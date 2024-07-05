"use client";

import React, { useState } from "react";
import { Avatar, Button, Divider, Image } from "@nextui-org/react";
import RatingsAndReviews from "../reviews/RatingsAndReviews";
import ImageCarousel from "@/components/global/ImageCarousel";
import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import {
  ProductWithDetailedReviews,
  ProductWithReviews,
} from "@/types/ProductTypes";
import { useSession } from "next-auth/react";
import { addReview, replyToReview } from "@/services/reviewService";
import toast from "react-hot-toast";

interface ProductProps {
  product: ProductWithDetailedReviews;
}

const Product = ({ product }: ProductProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState(false);
  const [isAddingReview, setIsAddingReview] = useState(false);

  const onReply = async (reviewId: string, reply: string) => {
    setIsReplying(true);
    try {
      const result = await replyToReview(reviewId, reply, product.id);
      if (result) {
        toast.success("Reply added successfully");
      }
    } catch (error) {
      toast.error("Failed to reply to review");
      console.error("Failed to reply to review:", error);
    } finally {
      setIsReplying(false);
    }
  };

  const onAddReview = async (rating: number, comment: string) => {
    setIsAddingReview(true);
    try {
      const result = await addReview(product.id, rating, comment);
      if (result) {
        toast.success("Review added successfully");
      }
    } catch (error) {
      toast.error("Failed to add review");
      console.error("Failed to add review:", error);
    } finally {
      setIsAddingReview(false);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-4xl font-bold text-gray-500">
        No product found
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="w-full max-w-3xl mx-auto">
        <ImageCarousel images={product.images} />
      </div>
      <div className="mt-6">
        <h1 className="text-3xl my-6 font-bold text-center">{product.name}</h1>
        <p className="text-lg mt-2">{product.description}</p>
        <p className="text-xl font-semibold text-gray-500 mt-2">
          GHS {product.price}
        </p>
        <div className="flex justify-end">
          <Button
            className="mt-2"
            color="primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <Divider className="my-6" />
      <div className="mt-6 flex items-start">
        <Avatar
          src={product.farmer.image}
          alt={product.farmer.name}
          className="rounded-full"
          size="lg"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold">{product.farmer.name}</h2>
          <p className="text-lg">{product.farmer.bio}</p>
          <Link href={`/farmers/chat/${product.farmer.id}`}>
            <Button
              className="mt-2"
              variant="flat"
              color="success"
              onClick={() => {}}
            >
              Contact Farmer
            </Button>
          </Link>
        </div>
      </div>
      <Divider className="my-6" />
      <div className="mt-6">
        <RatingsAndReviews
          reviews={product.reviews}
          isFarmerPortal={!!session?.user?.farmerDetails}
          isUserLoggedIn={!!session?.user}
          onReply={onReply}
          onAddReview={onAddReview}
          isReplying={isReplying}
          isAddingReview={isAddingReview}
        />
      </div>
    </div>
  );
};

export default Product;

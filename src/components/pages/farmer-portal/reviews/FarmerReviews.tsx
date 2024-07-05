"use client";

import React, { useState } from "react";
import RatingsAndReviews from "@/components/pages/reviews/RatingsAndReviews";
import { ReviewWithUser } from "@/types/ProductTypes";
import { addReview, replyToReview } from "@/services/reviewService";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface FarmerReviewsProps {
  reviews: ReviewWithUser[];
}

const FarmerReviews = ({ reviews }: FarmerReviewsProps) => {
  const { data: session } = useSession();
  const farmer = session?.user.farmerDetails;
  const [isReplying, setIsReplying] = useState(false);
  const [isAddingReview, setIsAddingReview] = useState(false);

  const handleReply = async (reviewId: string, reply: string) => {
    setIsReplying(true);
    if (!farmer) return;
    try {
      const result = await replyToReview(reviewId, reply, "", farmer.id);
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

  const handleAddReview = async (rating: number, comment: string) => {
    setIsAddingReview(true);
    if (!farmer) return;
    try {
      const result = await addReview(rating, comment, "", farmer.id);
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

  return (
    <RatingsAndReviews
      reviews={reviews}
      isFarmerPortal={!!farmer}
      isUserLoggedIn={!!farmer}
      onReply={handleReply}
      onAddReview={handleAddReview}
      isReplying={isReplying}
      isAddingReview={isAddingReview}
    />
  );
};

export default FarmerReviews;

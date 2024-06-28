"use client";

import React from "react";
import RatingsAndReviews from "@/components/pages/reviews/RatingsAndReviews";

interface FarmerReviewsProps {
  reviews: any[];
}

const FarmerReviews = ({ reviews }: FarmerReviewsProps) => {
  const handleReply = (reviewId: string, reply: string) => {
    console.log(`Reply to review ${reviewId}: ${reply}`);
  };

  const handleAddReview = (rating: string, comment: string) => {
    console.log(`New review - Rating: ${rating}, Comment: ${comment}`);
  };

  return (
    <RatingsAndReviews
      reviews={reviews}
      isFarmerPortal={true}
      isUserLoggedIn={true}
      onReply={handleReply}
      onAddReview={handleAddReview}
    />
  );
};

export default FarmerReviews;

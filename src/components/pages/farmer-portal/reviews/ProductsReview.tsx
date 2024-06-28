"use client";

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import RatingsAndReviews from "@/components/pages/reviews/RatingsAndReviews";
import { MdStar } from "react-icons/md";

interface ProductReview {
  productName: string;
  reviews: any[];
}

interface ProductsReviewProps {
  products: ProductReview[];
}

const ProductsReview = ({ products }: ProductsReviewProps) => {
  const handleReply = (reviewId: string, reply: string) => {
    console.log(`Reply to review ${reviewId}: ${reply}`);
  };

  const handleAddReview = (rating: string, comment: string) => {
    console.log(`New review - Rating: ${rating}, Comment: ${comment}`);
  };
  return (
    <div>
      <Accordion variant="bordered">
        {products.map((product, index) => {
          const averageRating = (
            product.reviews.reduce((acc, review) => acc + review.rating, 0) /
            product.reviews.length
          ).toFixed(1);

          return (
            <AccordionItem
              key={index}
              title={
                <div className="flex justify-between">
                  <span className="font-bold text-gray-600">
                    {product.productName}
                  </span>
                  <span className="text-base font-semibold flex items-center gap-1">
                    <MdStar size={20} color="gold" />
                    {averageRating}
                  </span>
                </div>
              }
            >
              <RatingsAndReviews
                reviews={product.reviews}
                isFarmerPortal={false}
                isUserLoggedIn={true}
                onReply={handleReply}
                onAddReview={handleAddReview}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ProductsReview;

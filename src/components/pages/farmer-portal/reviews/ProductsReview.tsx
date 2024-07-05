"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import RatingsAndReviews from "@/components/pages/reviews/RatingsAndReviews";
import { MdStar } from "react-icons/md";
import { ProductWithDetailedReviews } from "@/types/ProductTypes";
import { addReview, replyToReview } from "@/services/reviewService";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface ProductsReviewProps {
  products: ProductWithDetailedReviews[];
}

const ProductsReview = ({ products }: ProductsReviewProps) => {
  const { data: session } = useSession();
  const farmer = session?.user.farmerDetails;
  const [isReplying, setIsReplying] = useState(false);
  const [isAddingReview, setIsAddingReview] = useState(false);

  return (
    <div>
      <Accordion variant="bordered">
        {products.map((product, index) => {
          const averageRating = (
            product.reviews.reduce((acc, review) => acc + review?.rating!, 0) /
            product.reviews.length
          ).toFixed(1);

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
              const result = await addReview(rating, comment, product.id);
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
            <AccordionItem
              key={index}
              title={
                <div className="flex justify-between">
                  <span className="font-bold text-gray-600">
                    {product.name}
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
                isFarmerPortal={!!farmer}
                isUserLoggedIn={!!farmer}
                isReplying={isReplying}
                isAddingReview={isAddingReview}
                onReply={onReply}
                onAddReview={onAddReview}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ProductsReview;

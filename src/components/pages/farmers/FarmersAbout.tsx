"use client";

import { Button, Divider } from "@nextui-org/react";
import RatingsAndReviews from "@/components/pages/reviews/RatingsAndReviews";
import { ReviewWithUser } from "@/types/ProductTypes";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { addReview, replyToReview } from "@/services/reviewService";
import toast from "react-hot-toast";
import { Farmer } from "@prisma/client";

interface AboutProp {
  farmer: Farmer;
  reviews: ReviewWithUser[];
}

const FarmersAbout = ({ farmer, reviews }: AboutProp) => {
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState(false);
  const [isAddingReview, setIsAddingReview] = useState(false);

  const handleReply = async (reviewId: string, reply: string) => {
    setIsReplying(true);
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
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">About Our Farm</h2>
        <p className="text-gray-700 mb-4">{farmer.about}</p>
        <div className="flex justify-end items-end">
          <Link href={`/farmers/chat/1`}>
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

      <RatingsAndReviews
        reviews={reviews}
        isFarmerPortal={!!session?.user?.farmerDetails}
        isUserLoggedIn={!!session?.user}
        onReply={handleReply}
        onAddReview={handleAddReview}
        isReplying={isReplying}
        isAddingReview={isAddingReview}
      />
    </div>
  );
};

export default FarmersAbout;

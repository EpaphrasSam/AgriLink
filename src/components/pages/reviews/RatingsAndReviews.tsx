"use client";

import React, { useState, useMemo } from "react";
import { MdAdd, MdStarRate, MdStarHalf } from "react-icons/md";
import {
  Button,
  Input,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Textarea,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import { ReviewWithUser } from "@/types/ProductTypes";

interface ReviewsComponentProps {
  reviews: ReviewWithUser[];
  isFarmerPortal: boolean;
  isUserLoggedIn: boolean;
  onReply: (reviewId: string, reply: string) => void;
  onAddReview: (rating: number, comment: string) => void;
  isReplying: boolean;
  isAddingReview: boolean;
}

const ReviewsComponent: React.FC<ReviewsComponentProps> = ({
  reviews,
  isFarmerPortal,
  isUserLoggedIn,
  onReply,
  onAddReview,
  isReplying,
  isAddingReview,
}) => {
  const [replyText, setReplyText] = useState<string>("");
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newRating, setNewRating] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return "0.0";
    const totalRating = reviews.reduce(
      (acc, review) => acc + review?.rating!,
      0
    );
    return (totalRating / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingDistribution = useMemo(() => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      distribution[review?.rating! - 1]++;
    });
    return distribution.reverse();
  }, [reviews]);

  const handleReply = (reviewId: string) => {
    if (replyText.trim()) {
      onReply(reviewId, replyText);
      setReplyText("");
      setActiveReviewId(null);
    }
  };

  const handleAddReview = () => {
    if (Number(newRating) > 0) {
      onAddReview(Number(newRating), newComment);
      setNewRating("0");
      setNewComment("");
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      {!isFarmerPortal && isUserLoggedIn && (
        <div className="add-review mb-4 flex justify-end">
          <Button
            variant="ghost"
            color="primary"
            radius="sm"
            startContent={<MdAdd size={20} />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Review
          </Button>
        </div>
      )}
      {reviews.length === 0 ? (
        <div className="flex justify-center items-center h-[500px]">
          <p className="text-2xl text-gray-500 font-bold">
            No Reviews given yet
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col items-center ">
              <div className="text-4xl text-gray-600 font-bold">
                {averageRating}
              </div>
              <div className="flex mt-2">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  if (ratingValue <= Math.floor(Number(averageRating))) {
                    return <MdStarRate key={i} color="gold" size={24} />;
                  } else if (
                    ratingValue === Math.ceil(Number(averageRating)) &&
                    !Number.isInteger(Number(averageRating))
                  ) {
                    return <MdStarHalf key={i} color="gold" size={24} />;
                  } else {
                    return <MdStarRate key={i} color="gray" size={24} />;
                  }
                })}
              </div>
              <p className="mt-2 text-lg">{reviews.length} reviews</p>
            </div>
            <div className=" sm:max-w-[400px] w-full flex flex-col gap-2">
              {ratingDistribution.map((count, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-4">{5 - index}</span>
                  <MdStarRate color="gold" size={20} />
                  <Progress
                    value={(count / reviews.length) * 100}
                    color="primary"
                    className="w-full max-w-sm ml-2"
                  />
                </div>
              ))}
            </div>
          </div>
          <Divider className="my-4" />
        </>
      )}
      <div>
        {reviews
          .filter((review) => review.comment)
          .map((review) => (
            <div key={review.id} className="review mb-4">
              <div className="review-header flex items-center">
                <Avatar
                  src={review.isFarmer ? review?.farmer!.image : ""}
                  alt={
                    review.isFarmer
                      ? review?.farmer!.name
                      : review.user.username
                  }
                />
                <div className="ml-4">
                  <p className="font-bold">
                    {review.isFarmer
                      ? review?.farmer!.name
                      : review.user.username}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {review.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="stars flex ml-auto">
                  {[...Array(5)].map((_, i) => (
                    <MdStarRate
                      key={i}
                      color={i < review?.rating! ? "gold" : "gray"}
                      size={20}
                    />
                  ))}
                </div>
              </div>
              {review.comment && <p className="mt-2">{review.comment}</p>}
              {isUserLoggedIn && (
                <div className="reply-section mt-2">
                  {activeReviewId === review.id ? (
                    <div className="flex flex-col gap-2">
                      <Textarea
                        placeholder="Write a reply"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        fullWidth
                        className="w-full"
                        radius="sm"
                        variant="flat"
                        disabled={isReplying}
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="light"
                          color="danger"
                          radius="sm"
                          onClick={() => setActiveReviewId(null)}
                          disabled={isReplying}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="solid"
                          color="primary"
                          radius="sm"
                          onClick={() => handleReply(review.id)}
                          isLoading={isReplying}
                          isDisabled={!replyText.trim()}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="hover:opacity-75 text-sm font-semibold"
                      onClick={() => setActiveReviewId(review.id)}
                      disabled={isReplying}
                    >
                      Reply
                    </button>
                  )}
                </div>
              )}
              <div className="replies ml-10 mt-2">
                {review.replies.map((reply) => (
                  <div key={reply.id} className="reply mb-2">
                    <div className="flex items-center">
                      <Avatar
                        src={reply.isFarmer ? reply?.farmer!.image : ""}
                        alt={
                          reply.isFarmer
                            ? reply?.farmer!.name
                            : reply.user.username
                        }
                      />
                      <div className="ml-4">
                        <p className="font-bold">
                          {reply.isFarmer
                            ? reply?.farmer!.name
                            : reply.user.username}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {reply.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="ml-10 mt-1">{reply.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => !isAddingReview && setIsModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Add a Review</ModalHeader>
          <ModalBody>
            <div className="flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <MdStarRate
                  key={i}
                  color={i < Number(newRating) ? "gold" : "gray"}
                  size={40}
                  onClick={() => setNewRating(String(i + 1))}
                  className="cursor-pointer"
                />
              ))}
            </div>
            <Textarea
              placeholder="Write your review"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              rows={4}
              className="mt-4"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleAddReview}
              isLoading={isAddingReview}
              color="primary"
              isDisabled={!newRating}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReviewsComponent;

import { Product, Review, Farmer, User } from "@prisma/client";

export interface ReviewWithUser extends Review {
  user: User;
  farmer?: Farmer | null;
  replies: ReviewWithUser[];
}

export interface ProductWithReviews extends Product {
  reviews: Review[];
  farmer: Farmer;
}

export interface ProductWithDetailedReviews extends Product {
  reviews: ReviewWithUser[];
  farmer: Farmer;
}

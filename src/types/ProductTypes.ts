import { Product, Review, Farmer } from "@prisma/client";

export interface ProductWithReviews extends Product {
  reviews: Review[];
  farmer: Farmer;
}

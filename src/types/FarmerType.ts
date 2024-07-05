import { Farmer } from "@prisma/client";
import { ProductWithReviews, ReviewWithUser } from "./ProductTypes";

export interface FarmerType extends Farmer {
  products: ProductWithReviews[];
  reviews: ReviewWithUser[];
}

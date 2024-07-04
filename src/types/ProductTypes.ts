import { Product as P, Review } from "@prisma/client";

export interface ProductWithReviews extends P {
  reviews: Review[];
}

export type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  farm: string;
};

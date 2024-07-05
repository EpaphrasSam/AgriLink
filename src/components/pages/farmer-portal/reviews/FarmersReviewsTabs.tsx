"use client";

import React from "react";
import { Tab, Tabs } from "@nextui-org/react";
import FarmerReviews from "./FarmerReviews";
import ProductsReview from "./ProductsReview";
import { FarmerType } from "@/types/FarmerType";
import {
  ProductWithDetailedReviews,
  ReviewWithUser,
} from "@/types/ProductTypes";

interface FarmersReviewsTabsProps {
  farmer: {
    reviews: ReviewWithUser[];
    products: ProductWithDetailedReviews[];
  };
}

const FarmersReviewsTabs = ({ farmer }: FarmersReviewsTabsProps) => {
  return (
    <Tabs size="lg" fullWidth color="primary" variant="solid">
      <Tab title="Farmer">
        <FarmerReviews reviews={farmer.reviews} />
      </Tab>
      <Tab title="Products">
        <ProductsReview products={farmer.products} />
      </Tab>
    </Tabs>
  );
};

export default FarmersReviewsTabs;

"use client";

import React, { useState, useEffect } from "react";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import { ProductWithReviews } from "@/types/ProductTypes";

const ProductListing = ({ products }: { products: ProductWithReviews[] }) => {
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );
  const prices = products.map((product) => product.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [filters, setFilters] = useState<{
    categories: string[];
    priceRange: [number, number];
    ratings: number[];
    searchQuery: string;
  }>({
    categories: [],
    priceRange: [minPrice, maxPrice],
    ratings: [],
    searchQuery: "",
  });

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const matchesRating =
        filters.ratings.length === 0 ||
        product.reviews.some((review) => review.rating >= filters.ratings[0]);
      const matchesSearch =
        filters.searchQuery === "" ||
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [filters, products]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4">
        <ProductFilters
          filters={filters}
          setFilters={setFilters}
          uniqueCategories={uniqueCategories}
          priceRange={[minPrice, maxPrice]}
        />
      </div>
      <div className="md:w-3/4 overflow-y-auto" style={{ maxHeight: "80vh" }}>
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductListing;

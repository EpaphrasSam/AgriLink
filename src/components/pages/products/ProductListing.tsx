"use client";

import React, { useState, useEffect } from "react";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import { Product } from "@/types/ProductTypes";

const products: Product[] = [
  {
    id: 1,
    title: "Strawberries",
    category: "Fruit",
    price: 5.99,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
  },
  {
    id: 2,
    title: "Carrots",
    category: "Vegetables",
    price: 2.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
  },
  {
    id: 3,
    title: "Milk",
    category: "Dairy",
    price: 3.99,
    rating: 3,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
  },
  {
    id: 4,
    title: "Orange",
    category: "Fruit",
    price: 10.99,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
  },
];

const ProductListing = () => {
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );
  const prices = products.map((product) => product.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [filters, setFilters] = useState({
    categories: uniqueCategories,
    priceRange: [minPrice, maxPrice],
    ratings: [5],
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
        filters.ratings.length === 0 || product.rating <= filters.ratings[0];

      return matchesCategory && matchesPrice && matchesRating;
    });

    setFilteredProducts(filtered);
  }, [filters]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4">
        <ProductFilters
          products={products}
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

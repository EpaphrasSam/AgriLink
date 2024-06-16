import React, { useEffect } from "react";
import { Button, Divider, Slider } from "@nextui-org/react";
import { FaStar, FaRegStar } from "react-icons/fa";

const ProductFilters = ({
  filters,
  setFilters,
  uniqueCategories,
  priceRange,
}: any) => {
  const handleCategoryChange = (category: any) => {
    setFilters((prev: any) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c: any) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleRatingChange = (rating: any) => {
    const currentRating = filters.ratings[0];
    if (rating === 1 && currentRating === 1) return; // Prevent deselecting the lowest rating

    setFilters((prev: any) => ({
      ...prev,
      ratings: [rating],
    }));
  };

  const handlePriceChange = (value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      priceRange: value,
    }));
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold">Filters</h2>
      <Divider className="my-4" />
      <div className="flex flex-col gap-8">
        <div className="mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {uniqueCategories.map((category: any) => (
                <Button
                  radius="full"
                  key={category}
                  color={
                    filters.categories.includes(category)
                      ? "success"
                      : "default"
                  }
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Price Range</h3>
            <Slider
              size="sm"
              showOutline
              showTooltip
              aria-label="Price Range"
              minValue={priceRange[0]}
              maxValue={priceRange[1]}
              step={0.1}
              formatOptions={{ style: "currency", currency: "GHS" }}
              value={filters.priceRange}
              onChange={handlePriceChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Ratings</h3>
            <div className="flex items-center gap-1 cursor-pointer">
              {[...Array(5)].map((_, index) => {
                const rating = index + 1;
                return (
                  <span key={index} onClick={() => handleRatingChange(rating)}>
                    {rating <= filters.ratings[0] ? (
                      <FaStar color="gold" size={28} />
                    ) : (
                      <FaRegStar color="gray" size={28} />
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;

import React, { useEffect } from "react";
import { Button, Divider, Slider, Input } from "@nextui-org/react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

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
    if (rating === 1 && currentRating === 1) return;

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

  const handleSearchChange = (event: any) => {
    setFilters((prev: any) => ({
      ...prev,
      searchQuery: event.target.value,
    }));
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold">Filters</h2>
      <Divider className="my-4" />

      <div className="flex md:flex-col flex-row max-md:overflow-x-auto gap-8">
        <div className="mb-4 max-md:min-w-[200px]">
          <div>
            <h3 className="text-lg font-semibold mb-2">Search</h3>
            <Input
              radius="full"
              isClearable
              variant="bordered"
              placeholder="Search for products"
              onClear={() => setFilters({ ...filters, searchQuery: "" })}
              value={filters.searchQuery}
              onChange={handleSearchChange}
              startContent={<IoIosSearch color="gray" size={24} />}
            />
          </div>
        </div>
        <div className="mb-4 max-md:min-w-[200px]">
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
        <div className="mb-4 max-md:min-w-[200px]">
          <div>
            <Slider
              size="sm"
              showOutline
              showTooltip
              label="Price"
              minValue={priceRange[0]}
              maxValue={priceRange[1]}
              step={0.1}
              formatOptions={{ style: "currency", currency: "GHS" }}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onChange={handlePriceChange}
              classNames={{
                label: "text-lg font-semibold mb-2",
                value: "text-xs font-semibold mb-2",
              }}
            />
          </div>
        </div>
        <div className="mb-4 max-md:min-w-[200px]">
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

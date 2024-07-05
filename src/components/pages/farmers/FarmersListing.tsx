"use client";

import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
} from "@nextui-org/react";
import React, { useState, useMemo } from "react";
import { CiLocationOn, CiSearch, CiUser } from "react-icons/ci";
import { MdStarRate } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import Link from "next/link";
import { Farmer, Review } from "@prisma/client";
import { regions } from "@/lib/constants";

interface FarmerWithReviews extends Farmer {
  reviews: Review[];
}

const FarmersListing = ({ farmers }: { farmers: FarmerWithReviews[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [sortOption, setSortOption] = useState([]);

  const filteredFarmers = useMemo(() => {
    let filtered = farmers;

    if (searchTerm) {
      filtered = filtered.filter((farmer) =>
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const options = Array.from(sortOption).join(", ").replaceAll("_", " ");
    const regions = Array.from(selectedRegions).join(", ").replaceAll("_", " ");
    const rating = Array.from(selectedRating).join(", ").replaceAll("_", " ");

    if (regions.length > 0) {
      filtered = filtered.filter((farmer) => regions.includes(farmer.region));
    }

    if (rating) {
      filtered = filtered.filter(
        (farmer) =>
          farmer.reviews.reduce((sum, review) => sum + review?.rating!, 0) /
            farmer.reviews.length >=
          parseFloat(rating)
      );
    }

    switch (options) {
      case "a-z":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "high-low":
        filtered = filtered.sort(
          (a, b) =>
            b.reviews.reduce((sum, review) => sum + review?.rating!, 0) /
              b.reviews.length -
            a.reviews.reduce((sum, review) => sum + review?.rating!, 0) /
              a.reviews.length
        );
        break;
      case "low-high":
        filtered = filtered.sort(
          (a, b) =>
            a.reviews.reduce((sum, review) => sum + review?.rating!, 0) /
              a.reviews.length -
            b.reviews.reduce((sum, review) => sum + review?.rating!, 0) /
              b.reviews.length
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedRegions, selectedRating, sortOption]);

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-3xl flex flex-col gap-8 w-full">
        <Input
          variant="bordered"
          radius="full"
          startContent={<CiSearch size={24} />}
          placeholder="Search for farmers"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                radius="full"
                endContent={<IoChevronDown />}
              >
                Sort By
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectedKeys={sortOption}
              onSelectionChange={(keys: any) => setSortOption(keys)}
              selectionMode="single"
            >
              <DropdownItem key="a-z">Alphabetically, A-Z</DropdownItem>
              <DropdownItem key="z-a">Alphabetically, Z-A</DropdownItem>
              <DropdownItem key="high-low">Rating, High to Low</DropdownItem>
              <DropdownItem key="low-high">Rating, Low to High</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                radius="full"
                endContent={<IoChevronDown />}
              >
                Region
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectedKeys={selectedRegions}
              onSelectionChange={(keys: any) => setSelectedRegions(keys)}
              selectionMode="multiple"
            >
              {regions.map((region) => (
                <DropdownItem key={region}>{region}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                radius="full"
                endContent={<IoChevronDown />}
              >
                Rating
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectedKeys={selectedRating}
              onSelectionChange={(keys: any) => setSelectedRating(keys)}
              selectionMode="single"
            >
              <DropdownItem key="4.5">4.5 and above</DropdownItem>
              <DropdownItem key="4.0">4.0 and above</DropdownItem>
              <DropdownItem key="3.5">3.5 and above</DropdownItem>
              <DropdownItem key="3.0">3.0 and above</DropdownItem>
              <DropdownItem key="2.5">2.5 and above</DropdownItem>
              <DropdownItem key="2.0">2.0 and above</DropdownItem>
              <DropdownItem key="1.5">1.5 and above</DropdownItem>
              <DropdownItem key="1.0">1.0 and above</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="flex flex-col gap-4">
          {filteredFarmers.length > 0 ? (
            filteredFarmers.map((farmer) => (
              <>
                <div
                  key={farmer.id}
                  className="flex items-start justify-between"
                >
                  <div className="flex flex-col sm:flex-row w-full items-start gap-2">
                    <Image
                      isZoomed
                      radius="sm"
                      src={farmer.image}
                      alt={farmer.name}
                      className="w-28 h-28 object-cover object-center"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <CiUser size={20} />
                        <p className="text-lg font-semibold">{farmer.name}</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <IoIosInformationCircleOutline
                          className="flex-shrink-0"
                          size={20}
                          color="blue"
                        />
                        <p className="text-sm  text-gray-500">{farmer.bio}</p>
                      </div>
                      <p className="flex items-start gap-2">
                        <CiLocationOn size={20} color="red" />
                        <p className="text-sm text-gray-500">
                          {farmer.town}, {farmer.region}
                        </p>
                      </p>
                      <p className="flex items-start gap-2">
                        <MdStarRate color="gold" size={20} />
                        <p className="text-sm text-gray-500">
                          {farmer.reviews.reduce(
                            (sum, review) => sum + review?.rating!,
                            0
                          ) / farmer.reviews.length || "N/A"}
                        </p>
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" color="primary">
                    <Link href={`/farmers/${farmer.slug}`}>View Profile</Link>
                  </Button>
                </div>
                <Divider className="my-4" />
              </>
            ))
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-gray-500 text-2xl font-bold">
                No farmers found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmersListing;

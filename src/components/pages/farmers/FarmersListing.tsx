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

const farmers = [
  {
    id: 1,
    name: "John Doe",
    bio: "Experienced farmer specializing in organic vegetables.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    town: "Accra",
    region: "Greater Accra",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Jane Smith",
    bio: "Passionate about sustainable farming and eco-friendly practices.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    town: "Kumasi",
    region: "Ashanti",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    bio: "Third-generation farmer with a focus on high-quality dairy products.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    town: "Tamale",
    region: "Northern",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Amina Khan",
    bio: "Innovative farmer growing exotic fruits and herbs.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    town: "Takoradi",
    region: "Western",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Liam O'Connor",
    bio: "Specializes in free-range poultry and eggs.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGFncmljdWx0dXJlfGVufDB8fHx8MTYzMjY0NzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    town: "Cape Coast",
    region: "Central",
    rating: 4.6,
  },
];

const getUniqueRegions = (farmers: any) => {
  const regions = farmers.map((farmer: any) => farmer.region);
  return Array.from(new Set(regions));
};

const FarmersListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [sortOption, setSortOption] = useState([]);

  const uniqueRegions = getUniqueRegions(farmers);

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

    console.log(rating);

    if (rating) {
      filtered = filtered.filter(
        (farmer) => farmer.rating >= parseFloat(rating)
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
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "low-high":
        filtered = filtered.sort((a, b) => a.rating - b.rating);
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
              {uniqueRegions.map((region: any) => (
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
                        <p className="text-sm text-gray-500">{farmer.rating}</p>
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" color="primary">
                    <Link href={`/farmers/${farmer.id}`}>View Profile</Link>
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

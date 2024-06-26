"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { Card, Avatar, Button, Divider } from "@nextui-org/react";
import { farmerNavigationLinks } from "@/lib/routes";

const FarmerSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMdOrAbove = useMediaQuery({ query: "(min-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 450px)" });
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLogout = () => {
    // Implement logout functionality
  };

  return (
    <div
      className={`flex flex-col ${
        isExpanded || isMdOrAbove ? "w-64" : "w-20"
      } max-[450px]:w-full max-[450px]:p-3 p-4  max-[450px]:border-1 max-[450px]:border-gray-200 max-[450px]:rounded-full h-full transition-all duration-300 ease-in-out shadow-lg `}
    >
      {!isMobile && (
        <>
          {!isMdOrAbove && (
            <div className="flex justify-end mb-4">
              <button
                className="text-gray-600 hover:opacity-75 p-2 focus:outline-none"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
              </button>
            </div>
          )}
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" />
            {isExpanded && (
              <span className="text-lg font-semibold">Acqua Farmer</span>
            )}
          </div>
        </>
      )}
      {!isMobile && <Divider className="my-4" />}
      <nav
        className={`flex ${
          isMobile ? "flex-row justify-around" : "flex-col mt-4"
        }`}
      >
        {farmerNavigationLinks.map((link, index) => (
          <Link href={link.route} key={index}>
            <div
              className={`flex items-center text-gray-800 p-3 max-[450px]:mb-0 mb-4 rounded-lg hover:opacity-75 transition-colors duration-200 ${
                pathname === link.route ? "bg-blue-500 text-white" : ""
              } ${isMobile ? "flex-col" : ""}`}
            >
              <span className="text-2xl">{link.icon}</span>
              {isExpanded && !isMobile && (
                <span className="ml-4">{link.name}</span>
              )}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FarmerSideBar;
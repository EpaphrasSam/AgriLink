"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { Card, Avatar, Divider } from "@nextui-org/react";
import { farmerNavigationLinks } from "@/lib/routes";

const FarmerSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMdOrAbove = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (!isMdOrAbove) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }, [isMdOrAbove]);

  return (
    <div
      className={`flex flex-col ${
        isExpanded || isMdOrAbove ? "w-64" : "w-20"
      } max-md:w-full max-md:p-3 p-4  max-md:border-1 max-md:border-gray-200 max-md:rounded-full h-full transition-all duration-300 ease-in-out shadow-lg `}
    >
      {!isMobile && (
        <>
          <div className="flex flex-col items-center gap-2 pt-6">
            <Avatar size="lg" />
            {isExpanded && (
              <>
                <span className="text-lg font-semibold">Acqua Farmer</span>
                <span className="text-gray-600 text-sm font-medium">
                  Accra, Greater Accra
                </span>
              </>
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
              className={`flex items-center text-gray-800 p-3 max-md:mb-0 mb-4 rounded-lg hover:opacity-75 transition-colors duration-200 ${
                pathname === link.route ? "bg-blue-500 text-white" : ""
              } ${isMobile ? "flex-col" : ""}`}
            >
              <span className="text-xl">{link.icon}</span>
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

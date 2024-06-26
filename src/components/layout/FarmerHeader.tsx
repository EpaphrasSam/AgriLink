"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";

const FarmerHeader = () => {
  const brandVariants = {
    scrolled: {
      scale: 0.7,
      transition: { type: "tween", duration: 0.3 },
    },
    top: {
      scale: 1,
      transition: { type: "tween", duration: 0.3 },
    },
  };

  return (
    <Navbar
      maxWidth="full"
      isBordered
      position="static"
      hidden
      classNames={{
        wrapper: "max-sm:px-2",
      }}
    >
      <NavbarBrand>
        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          animate="top"
          variants={brandVariants}
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={70}
            height={70}
            className="w-12 h-12 object-contain object-center rounded-full"
          />
        </motion.div>
      </NavbarBrand>
      <NavbarContent
        justify="center"
        className="text-lg font-bold text-gray-600"
      >
        Farmer Dashboard
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button size="sm" color="danger" startContent={<FaSignOutAlt />}>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default FarmerHeader;

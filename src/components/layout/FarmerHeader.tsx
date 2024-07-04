"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { logoutAction } from "@/services/authService";
import toast from "react-hot-toast";

const FarmerHeader = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const logOut = async () => {
    try {
      setIsLoading(true);
      await logoutAction();
      toast.success("Logout successful");
      window.location.href = "/";
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Navbar
      maxWidth="full"
      isBordered
      position="static"
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
        Farmer Portal
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            size="sm"
            color="danger"
            className="text-sm "
            startContent={<FaSignOutAlt />}
            onClick={logOut}
            isLoading={isLoading}
          >
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default FarmerHeader;

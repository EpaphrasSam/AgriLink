"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { NavbarLinks } from "@/lib/routes";
import { motion, useScroll } from "framer-motion";
import { Badge, Avatar } from "@nextui-org/react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isLoggedIn = true;

  useEffect(() => {
    return scrollY.on("change", (y) => {
      setIsScrolled(y > 0);
    });
  }, [scrollY]);

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
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <Navbar
      maxWidth="full"
      isBordered
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      classNames={{
        wrapper: "max-sm:px-2",
      }}
    >
      <NavbarMenuToggle
        icon={(isOpen) =>
          !isOpen ? <FaBars size={20} /> : <MdOutlineClose size={32} />
        }
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />
      {/* <NavbarContent justify="start" className="md:hidden" /> */}
      <NavbarBrand>
        <Link href="/">
          <motion.div
            whileHover={{
              scale: 1.01,
            }}
            animate={isScrolled ? "scrolled" : "top"}
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
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {NavbarLinks.map((links) => {
          const isActive = pathname === links.href;
          return (
            <NavbarItem key={links.label}>
              <Link
                className={`${
                  isActive ? "underline" : "hover:underline hover:opacity-75"
                } underline-offset-8`}
                href={links.href}
              >
                {links.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex gap-4 items-center">
          <IoSearchOutline
            size={24}
            className="transition-transform duration-300 cursor-pointer hover:scale-105"
          />

          <IoCartOutline
            size={28}
            className="transition-transform duration-300 cursor-pointer hover:scale-105"
          />
          {!isLoggedIn ? (
            <Avatar
              size="sm"
              isBordered
              className="transition-transform duration-300 cursor-pointer hover:scale-105"
            />
          ) : (
            <Button variant="shadow" color="primary" radius="sm" size="sm">
              <Link href="/login" className="text-base">
                Login
              </Link>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="bg-white">
        {NavbarLinks.map((links) => {
          const isActive = pathname === links.href;
          return (
            <NavbarItem key={links.label} className="py-3">
              <Link
                className={`${
                  isActive ? "underline" : "hover:underline hover:opacity-75"
                } underline-offset-8`}
                href={links.href}
              >
                {links.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;

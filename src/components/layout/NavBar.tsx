"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Badge,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import {
  IoCartOutline,
  IoChatbubbleOutline,
  IoLogOutOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { motion, useScroll } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import useCartStore from "@/store/useCartStore";
import { NavbarLinks } from "@/lib/routes";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const isLoggedIn = true;
  const totalItems = useStore(useCartStore, (state) =>
    state.calculateTotalItems()
  );

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
          {/* <IoSearchOutline
            size={24}
            className="transition-transform duration-300 cursor-pointer hover:scale-105"
          /> */}

          <Link href="/cart">
            <Badge
              isInvisible={totalItems === 0}
              content={totalItems}
              color="primary"
            >
              <IoCartOutline
                size={28}
                className="transition-transform duration-300 hover:scale-105"
              />
            </Badge>
          </Link>
          {isLoggedIn ? (
            <Dropdown placement="bottom-end" showArrow>
              <DropdownTrigger>
                <Avatar
                  size="sm"
                  isBordered
                  className="transition-transform duration-300 cursor-pointer hover:scale-105"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  startContent={<IoChatbubbleOutline size={20} />}
                  key="Chat"
                  variant="shadow"
                  color="primary"
                  onClick={() => router.push("/chats")}
                >
                  My Chats
                </DropdownItem>
                <DropdownItem
                  startContent={<IoCartOutline size={20} />}
                  showDivider
                  key="Order"
                  variant="shadow"
                  color="primary"
                  onClick={() => router.push("/my-orders")}
                >
                  My Orders
                </DropdownItem>
                <DropdownItem
                  variant="shadow"
                  startContent={<IoLogOutOutline size={20} />}
                  key="logout"
                  color="danger"
                  className="text-danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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

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
  Spinner,
  Skeleton,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaTractor, FaUserPlus } from "react-icons/fa";
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
import { useSession } from "next-auth/react";
import { loginAction, logoutAction } from "@/services/authService";
import toast from "react-hot-toast";
import FarmerModal from "@/components/global/FarmerModal"; // Import FarmerModal

const NavBar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const totalItems = useStore(useCartStore, (state) =>
    state.calculateTotalItems()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFarmerModalOpen, setIsFarmerModalOpen] = useState(false); // State for FarmerModal

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

  const logOut = async () => {
    try {
      setIsLoading(true);
      await logoutAction();
      toast.success("Logout successful");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleAction = async () => {
    if (session && session?.user?.role === "FARMER") {
      await loginAction(session?.user?.username!, "123456", "FARMER", true);
      window.location.href = "/farmer-portal";
    } else if (session && session?.user?.role === "CONSUMER") {
      setIsFarmerModalOpen(true);
    }
  };

  return (
    <>
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
            {status === "loading" ? (
              <Skeleton className="w-8 h-8 rounded-full">
                <Avatar size="sm" isBordered />
              </Skeleton>
            ) : session?.user ? (
              <Dropdown placement="bottom-end" showArrow>
                <DropdownTrigger>
                  <Avatar
                    size="sm"
                    isBordered
                    className="transition-transform duration-300 cursor-pointer hover:scale-105"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem className="text-center p-0" variant="light">
                    {session?.user?.username}
                  </DropdownItem>
                  <DropdownItem
                    showDivider
                    className="text-center p-0"
                    variant="light"
                  >
                    {session?.user?.email}
                  </DropdownItem>
                  <DropdownItem
                    startContent={<IoChatbubbleOutline size={20} />}
                    key="Chat"
                    variant="shadow"
                    color="primary"
                    onClick={() => router.push("/my-chats")}
                  >
                    My Chats
                  </DropdownItem>
                  <DropdownItem
                    showDivider
                    startContent={<IoCartOutline size={20} />}
                    key="Order"
                    variant="shadow"
                    color="primary"
                    onClick={() => router.push("/my-orders")}
                  >
                    My Orders
                  </DropdownItem>
                  <DropdownItem
                    startContent={
                      session?.user?.role === "FARMER" ? (
                        <FaTractor size={20} />
                      ) : (
                        <FaUserPlus size={20} />
                      )
                    }
                    onClick={handleRoleAction}
                  >
                    {session?.user?.role === "FARMER"
                      ? "Switch To Farmer"
                      : "Sign Up as Farmer"}
                  </DropdownItem>
                  <DropdownItem
                    variant="shadow"
                    startContent={<IoLogOutOutline size={20} />}
                    key="logout"
                    color="danger"
                    onClick={logOut}
                    isDisabled={isLoading}
                    className="text-danger"
                  >
                    <div className="flex items-center gap-2">
                      {isLoading && <Spinner size="sm" color="danger" />} Log
                      Out
                    </div>
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
      <FarmerModal
        isOpen={isFarmerModalOpen}
        onClose={() => setIsFarmerModalOpen(false)}
        userId={session?.user?.id}
      />
    </>
  );
};

export default NavBar;

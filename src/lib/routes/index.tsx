import {
  FaHome,
  FaBox,
  FaShoppingCart,
  FaUser,
  FaStar,
  FaComments,
} from "react-icons/fa";

export const NavbarLinks = [
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Farmers",
    href: "/farmers",
  },
  {
    label: "Forum",
    href: "/forum",
  },
];

export const farmerNavigationLinks = [
  { name: "Dashboard", icon: <FaHome />, route: "/farmer-portal" },
  { name: "Products", icon: <FaBox />, route: "/farmer-portal/products" },
  { name: "Orders", icon: <FaShoppingCart />, route: "/farmer-portal/orders" },
  { name: "Reviews", icon: <FaStar />, route: "/farmer-portal/reviews" },
  { name: "Forum", icon: <FaComments />, route: "/farmer-portal/forum" },
  { name: "Profile", icon: <FaUser />, route: "/farmer-portal/profile" },
];

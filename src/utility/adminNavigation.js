import {
  FaBoxOpen,
  FaHome,
  FaShoppingCart,
  FaStore,
  FaThList,
} from "react-icons/fa";

export const adminNavigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: FaHome,
    current: true,
    roles: ["ROLE_ADMIN"],
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: FaBoxOpen,
    roles: ["ROLE_ADMIN", "ROLE_SELLER"],
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: FaShoppingCart,
    roles: ["ROLE_ADMIN", "ROLE_SELLER"],
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FaThList,
    roles: ["ROLE_ADMIN"],
  },
  {
    name: "Sellers",
    href: "/admin/sellers",
    icon: FaStore,
    roles: ["ROLE_ADMIN"],
  },
];

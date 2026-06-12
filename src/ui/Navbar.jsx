import { Badge } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import { FaShoppingCart, FaSignInAlt, FaStore } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <header className="bg-custom-gradient sticky z-50 flex h-[70px] items-center px-4 text-white sm:px-8 lg:px-14">
      <div className="flex w-full justify-between">
        <Link to="/" className="text-exl flex items-center font-bold">
          <FaStore className="mr-2 text-3xl" />
          <span className="font-[Poppins]">E-Shop</span>
        </Link>
      </div>
      <ul
        className={`absolute top-[70px] left-0 flex gap-4 text-slate-800 shadow-md sm:static sm:items-center sm:gap-10 sm:shadow-none ${
          navbarOpen ? "h-fit pb-5 sm:pb-0" : "h-0 overflow-hidden"
        } bg-custom-gradient w-full flex-col px-4 text-white transition-all duration-100 sm:h-fit sm:w-fit sm:flex-row sm:bg-none sm:px-0`}
      >
        <li className="font-[500] transition-all duration-150">
          <Link
            to="/"
            className={`${path === "/" ? "font-semibold text-white" : "text-gray-300"}`}
          >
            Home
          </Link>
        </li>
        <li className="font-[500] transition-all duration-150">
          <Link
            to="/products"
            className={`${path === "/products" ? "font-semibold text-white" : "text-gray-300"}`}
          >
            Products
          </Link>
        </li>
        <li className="font-[500] transition-all duration-150">
          <Link
            to="/about"
            className={`${path === "/about" ? "font-semibold text-white" : "text-gray-300"}`}
          >
            About
          </Link>
        </li>
        <li className="font-[500] transition-all duration-150">
          <Link
            to="/contact"
            className={`${path === "/contact" ? "font-semibold text-white" : "text-gray-300"}`}
          >
            Contact
          </Link>
        </li>
        <li className="font-[500] transition-all duration-150">
          <Link
            to="/cart"
            className={`relative ${
              path === "/cart"
                ? "font-semibold text-white"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <Badge
              badgeContent={0}
              showZero
              overlap="circular"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#ef4444",
                  color: "white",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  minWidth: "18px",
                  height: "18px",
                  borderRadius: "9999px",
                  border: "2px solid #111827",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                },
              }}
            >
              <FaShoppingCart size={20} />
            </Badge>
          </Link>
        </li>
        <li className="font-[500] transition-all duration-150">
          <Link
            to="/login"
            className="transiton flex transform items-center space-x-2 rounded-md bg-gradient-to-r from-purple-600 to-red-500 px-4 py-[6px] font-semibold text-white shadow-lg duration-300 ease-in-out hover:from-purple-500 hover:to-red-400"
          >
            <FaSignInAlt /> <span>Login</span>
          </Link>
        </li>
      </ul>
      <button
        className="mt-2 flex items-center sm:mt-0 sm:hidden"
        onClick={() => setNavbarOpen((open) => !open)}
      >
        {navbarOpen ? (
          <RxCross2 className="text-3xl text-white" />
        ) : (
          <IoIosMenu className="text-3xl text-white" />
        )}
      </button>
    </header>
  );
};

export default Navbar;

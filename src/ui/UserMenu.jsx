import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoExitOutline } from "react-icons/io5";
import BackDrop from "./BackDrop";
import { logOutUser } from "../store/action";
import toast from "react-hot-toast";
import { RiAdminFill } from "react-icons/ri";

export default function UserMenu() {
  const { user } = useSelector((user) => user.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
  const isSeller = user && user?.roles?.includes("ROLE_SELLER");

  const handleLogout = () => {
    return dispatch(logOutUser(navigate, toast, user));
  };

  return (
    <div className="relative z-30">
      <div
        className="flex cursor-pointer flex-row items-center gap-1 rounded-full text-slate-700 transition hover:shadow-md sm:border sm:border-slate-400"
        onClick={handleClick}
      >
        <Avatar alt="lyhour's default" />
      </div>
      <Menu
        sx={{ width: "400px" }}
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": buttonId,
            sx: { width: 160 },
          },
        }}
      >
        <Link to="/profile">
          <MenuItem onClick={handleClose} className="flex gap-2">
            <FaUserCircle className="text-xl" />
            <span className="mt-1 text-[16px] font-bold">{user.username}</span>
          </MenuItem>
        </Link>
        <Link to="/profile/order">
          <MenuItem onClick={handleClose} className="flex gap-2">
            <FaShoppingCart className="text-xl" />
            Order
          </MenuItem>
        </Link>
        {(isAdmin || isSeller) && (
          <Link to={isAdmin ? "/admin" : "/admin/products"}>
            <MenuItem onClick={handleClose} className="flex gap-2">
              <RiAdminFill className="text-xl" />
              <span className="mt-1 text-[16px] font-bold">
                {isAdmin ? "Admin Panel" : "Seller Panel"}
              </span>
            </MenuItem>
          </Link>
        )}

        <MenuItem onClick={handleClose} className="flex gap-2">
          <div className="bg-button-gradient flex w-full items-center gap-2 rounded-xs px-4 py-1 font-semibold text-white">
            <IoExitOutline className="text-xl" />
            <button
              className="mt-1 text-[16px] font-bold"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        </MenuItem>
      </Menu>
      {open && <BackDrop />}
    </div>
  );
}

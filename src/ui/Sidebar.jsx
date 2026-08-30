import { FaTachometerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { adminNavigation } from "../utility/adminNavigation";
import clsx from "clsx";

const Sidebar = ({ isProfileLayout = false }) => {
  const pathName = useLocation().pathname;
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
  const isSeller = user && user?.roles?.includes("ROLE_SELLER");

  const sideBarLayout = adminNavigation.filter((item) =>
    item.roles.some(
      (role) =>
        (role === "ROLE_ADMIN" && isAdmin) ||
        (role === "ROLE_SELLER" && isSeller),
    ),
  );

  return (
    <aside className="z-50 flex grow flex-col gap-y-4 overflow-y-auto bg-slate-900 px-6 pt-5 pb-4">
      <div className="flex h-16 shrink-0 gap-x-3 pt-2">
        <FaTachometerAlt className="h-8 w-8 text-indigo-500" />
        <h1 className="text-xl font-bold text-white">
          {isAdmin ? "Admin Panel" : "Seller Panel"}
        </h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          {sideBarLayout.map((item) => (
            <li key={item.name} className="mx-2">
              <Link
                to={item.href}
                className={clsx(
                  pathName === item.href
                    ? "bg-custom-blue text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                )}
              >
                <item.icon className="text-2xl" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

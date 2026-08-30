import { FaBoxOpen, FaDollarSign, FaShoppingCart } from "react-icons/fa";
import DashboardOverview from "./DashboardOverview";

const Dashboad = () => {
  return (
    <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <DashboardOverview
        title="Total Products"
        amount={234}
        Icon={FaBoxOpen}
        revenue
      />
      <DashboardOverview
        title="Total Orders"
        amount={11}
        Icon={FaShoppingCart}
        revenue
      />
      <DashboardOverview
        title="Total Revenue"
        amount={2343242}
        Icon={FaDollarSign}
        revenue
      />
    </div>
  );
};

export default Dashboad;

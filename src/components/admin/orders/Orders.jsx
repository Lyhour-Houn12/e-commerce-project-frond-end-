import { FaShoppingCart } from "react-icons/fa";
import OrderDetails from "./OrderDetails";
import { useSelector } from "react-redux";
import { useOrderFilter } from "../../hook/useOrderFilter";

const Orders = () => {
  const { adminOrder, pagination } = useSelector((state) => state.order);
  useOrderFilter();

  const emptyOrder = !adminOrder || adminOrder?.length === 0;

  return (
    <div className="pt-20 pb-6">
      {emptyOrder ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-600">
          <FaShoppingCart size={50} className="mb-3" />
          <h2 className="text-2xl font-semibold">No Order Placed Yet</h2>
        </div>
      ) : (
        <OrderDetails adminOrder={adminOrder} pagination={pagination} />
      )}
    </div>
  );
};

export default Orders;

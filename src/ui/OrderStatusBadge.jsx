const OrderStatusBadge = ({ status }) => {
  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Processing: "bg-blue-100 text-blue-700 border-blue-300",
    Shipped: "bg-purple-100 text-purple-700 border-purple-300",
    Delivered: "bg-green-100 text-green-700 border-green-300",
    Cancelled: "bg-red-100 text-red-700 border-red-300",
    Accepted: "bg-emerald-100 text-emerald-700 border-emerald-300",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[status] || "bg-gray-100 text-gray-700"} `}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;

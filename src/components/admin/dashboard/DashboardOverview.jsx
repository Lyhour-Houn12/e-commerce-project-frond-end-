import { formatRevenue } from "../../../utility/formatPrice";

const DashboardOverview = ({ title, amount, Icon, revenue = false }) => {
  const convertedAmount =
    typeof amount === "number" ? Number(amount.toFixed(2)) : amount;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-800">
            {revenue ? `$${formatRevenue(convertedAmount)}` : convertedAmount}
          </h2>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Icon className="text-3xl text-white" />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

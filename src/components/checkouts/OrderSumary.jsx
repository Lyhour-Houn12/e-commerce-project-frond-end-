import { formatPriceCalculation } from "../../utility/formatPrice";

const OrderSumary = ({ paymentMethod, cart, address, totalPrice }) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Section */}
        <div className="space-y-6 lg:col-span-2">
          {/* Billing Address */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100">
            <h2 className="mb-5 border-b border-slate-100 pb-3 text-xl font-bold text-slate-800">
              📍 Billing Address
            </h2>

            <div className="grid grid-cols-1 gap-4 text-slate-600 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Building</p>
                <p className="font-medium">{address?.buildingName}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Street</p>
                <p className="font-medium">{address?.street}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">State</p>
                <p className="font-medium">{address?.state}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Pincode</p>
                <p className="font-medium">{address?.pinCode}</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-sm text-slate-500">Country</p>
                <p className="font-medium">{address?.country}</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100">
            <h2 className="mb-5 border-b border-slate-100 pb-3 text-xl font-bold text-slate-800">
              💳 Payment Method
            </h2>

            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              {paymentMethod}
            </div>
          </div>

          {/* Order Items */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100">
            <h2 className="mb-5 border-b border-slate-100 pb-3 text-xl font-bold text-slate-800">
              🛒 Order Items
            </h2>

            <div className="space-y-4">
              {cart?.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`}
                      alt={item?.productName}
                      className="h-24 w-24 rounded-2xl border object-cover"
                    />

                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {item?.productName}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Quantity: {item?.quantity}
                      </p>

                      <p className="text-sm text-slate-500">
                        Unit Price: ${item?.specialPrice}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-500">Total</p>

                    <p className="text-xl font-bold text-indigo-600">
                      $
                      {formatPriceCalculation(
                        item?.quantity,
                        item?.specialPrice,
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100">
            <h2 className="mb-6 text-2xl font-bold text-slate-800">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-slate-600">
                <span>Products</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span>$0.00</span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between text-xl font-bold text-slate-900">
                  <span>Total</span>

                  <span className="text-indigo-600">
                    ${formatPriceCalculation(totalPrice, 1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderSumary;

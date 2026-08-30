import { useEffect, useState } from "react";
import SpinnerScreen from "../../ui/SpinnerScreen";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stripePaymentConfirmation } from "../../store/action";
import toast from "react-hot-toast";

const PaymentConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { cart } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const selectedUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
    ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
    : [];

  const paymentIntent = searchParams.get("payment_intent");
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");

  useEffect(() => {
    if (
      paymentIntent &&
      clientSecret &&
      redirectStatus &&
      cart &&
      cart.length > 0
    ) {
      const sendData = {
        addressId: selectedUserCheckoutAddress.addressId,
        pgName: "stripe",
        pgPaymentId: paymentIntent,
        pgStatus: "succeeded",
        pgResponseMessage: "Payment Successful",
      };
      console.log(sendData);

      dispatch(
        stripePaymentConfirmation(
          sendData,
          setIsLoading,
          setErrorMessage,
          toast,
        ),
      );
    }
  }, [dispatch, cart, paymentIntent, clientSecret, redirectStatus]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      {isLoading ? (
        <SpinnerScreen />
      ) : (
        <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-xl">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <FaCheckCircle className="text-green-600" size={70} />
            </div>
          </div>

          <h1 className="mb-3 text-3xl font-bold text-gray-800">
            Payment Successful
          </h1>

          <p className="mb-8 text-gray-600">
            Thank you for your purchase. Your payment has been processed
            successfully and your order is now being prepared.
          </p>

          {/* Error */}
          {errorMessage && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">
              {errorMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentConfirmation;

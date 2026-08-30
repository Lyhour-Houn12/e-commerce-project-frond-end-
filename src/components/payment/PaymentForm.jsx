import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import SpinnerScreen from "../../ui/SpinnerScreen";
import { useState } from "react";

const PaymentForm = ({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const paymentElementOptions = {
    layout: "tabs",
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    const { error } = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
      },
    });
    if (error) {
      setErrorMessage(error.message);
      return false;
    }
  }

  if (isLoading || !clientSecret || !stripe || !elements)
    return <SpinnerScreen />;

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Payment Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Complete your payment securely using Stripe.
          </p>
        </div>

        {clientSecret && (
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <PaymentElement options={paymentElementOptions} />
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between border-t pt-6">
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-3xl font-bold text-gray-900">
              ${Number(totalPrice).toFixed(2)}
            </p>
          </div>

          <button
            type="submit"
            disabled={!stripe || isLoading}
            className="rounded-lg bg-indigo-600 px-8 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading
              ? "Processing..."
              : `Pay $${Number(totalPrice).toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;

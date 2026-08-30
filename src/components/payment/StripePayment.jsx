import { Alert, AlertTitle } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

import PaymentForm from "./PaymentForm";
import { createStripePayment } from "../../store/action";
import SpinnerScreen from "../../ui/SpinnerScreen";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const { clientSecret } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const { user, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!clientSecret) {
      const sendData = {
        amount: Number(totalPrice) * 100,
        currency: "usd",
        email: user.email,
        name: `${user.username}`,
        address: selectedUserCheckoutAddress,
        description: `Order for ${user.username}`,
        metadata: {
          test: "1",
        },
      };
      dispatch(createStripePayment(sendData, toast));
    }
  }, [dispatch, clientSecret, totalPrice]);

  if (isLoading) {
    return <SpinnerScreen />;
  }

  if (!clientSecret) {
    return (
      <Alert severity="warning" variant="filled">
        <AlertTitle>Stripe Unavailable</AlertTitle>
        Stripe payment is unavailable. Please use another payment method.
      </Alert>
    );
  }

  return (
    <div className="w-full">
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: "stripe",
          },
        }}
      >
        <PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
      </Elements>
    </div>
  );
};

export default StripePayment;

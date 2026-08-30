import { Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import AddressInfo from "../components/addresses/AddressInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../store/action";
import NextPrevButton from "../ui/NextPrevButton";
import toast from "react-hot-toast";
import SpinnerScreen from "../ui/SpinnerScreen";
import ErrorPage from "../ui/ErrorPage";
import PaymentMethod from "../components/payment/PaymentMethod";
import OrderSumary from "../components/checkouts/OrderSumary";
import ABAPayment from "../components/payment/ABAPayment";
import StripePayment from "../components/payment/StripePayment";

const steps = ["Address", "Payment Method", "Order Summary", "Payment"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const { address, selectedUserCheckoutAddress } = useSelector(
    (state) => state.auth,
  );
  const { cart, totalPrice } = useSelector((state) => state.carts);
  const { paymentMethod } = useSelector((state) => state.payment);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const handleNext = () => {
    if (activeStep === 0 && !selectedUserCheckoutAddress)
      return toast.error("Please select checkout address before proceeding.");

    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };
  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-[80%] mx-auto flex h-screen flex-col overflow-hidden bg-slate-50 px-4 py-4">
      <div className="mb-3 shrink-0 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Checkout</h1>
        <p className="text-sm text-slate-500">
          Complete your order in a few simple steps
        </p>
      </div>

      <div className="mb-3 shrink-0 rounded-2xl bg-white px-4 py-2 shadow-sm">
        <Stepper
          activeStep={activeStep}
          sx={{
            "& .MuiStepLabel-label": {
              fontSize: "0.75rem",
              marginTop: "2px",
            },
            "& .MuiStepIcon-root": {
              width: 24,
              height: 24,
            },
            "& .MuiStepConnector-line": {
              minHeight: 0,
            },
          }}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <SpinnerScreen />
        </div>
      ) : (
        <>
          <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl bg-white p-4 shadow-sm">
            {activeStep === 0 && <AddressInfo address={address} />}

            {activeStep === 1 && (
              <div>
                <h2 className="text-lg font-semibold">
                  <PaymentMethod />
                </h2>
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <h2 className="text-lg font-semibold">
                  <OrderSumary
                    paymentMethod={paymentMethod}
                    cart={cart}
                    address={selectedUserCheckoutAddress}
                    totalPrice={totalPrice}
                  />
                </h2>
              </div>
            )}

            {activeStep === 3 && (
              <div>
                <h2 className="text-lg font-semibold">
                  {paymentMethod === "ABA" && <ABAPayment />}
                  {paymentMethod === "Stripe" && <StripePayment />}
                </h2>
              </div>
            )}
          </div>

          <div className="mt-3 shrink-0">
            <NextPrevButton
              handleNext={handleNext}
              disabledPrev={activeStep === 0}
              disabledNext={activeStep === steps.length - 1}
              handlePrev={handlePrev}
            />
          </div>
        </>
      )}

      {errorMessage && <ErrorPage message="Error Message Here" />}
    </div>
  );
};

export default Checkout;

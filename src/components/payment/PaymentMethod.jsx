import { useDispatch, useSelector } from "react-redux";
import { addPaymentMethod, createUserCart } from "../../store/action";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect } from "react";

const PaymentMethod = () => {
  const { paymentMethod } = useSelector((state) => state.payment);
  const { cart, cartId } = useSelector((state) => state.carts);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length > 0 && !cartId && !errorMessage) {
      const cartItems = cart.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
        };
      });

      dispatch(createUserCart(cartItems));
    }
  }, [dispatch, cartId, cart, errorMessage]);

  function paymentMethodHandler(method) {
    dispatch(addPaymentMethod(method));
  }

  return (
    <div className="mx-auto mb-4 max-w-md bg-white p-5 font-semibold">
      <h1 className="mb-4 text-2xl font-semibold">Select Payment Method</h1>
      <FormControl>
        <RadioGroup
          aria-label="payment method"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => paymentMethodHandler(e.target.value)}
        >
          <FormControlLabel
            value="Stripe"
            control={<Radio color="primary" />}
            label="Stripe"
            className="text-gray-700"
          />
          <FormControlLabel
            value="Paypal"
            control={<Radio color="primary" />}
            label="Paypal"
            className="text-gray-700"
          />
          <FormControlLabel
            value="ABA"
            control={<Radio color="primary" />}
            label="ABA"
            className="text-gray-700"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default PaymentMethod;

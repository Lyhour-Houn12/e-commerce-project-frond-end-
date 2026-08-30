import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";
import { orderReducer } from "./orderReducer";
import { adminReducer } from "./adminReducer";
import { sellerReducer } from "./sellerReducer";

const getLocalStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const users = getLocalStorage("auth", null);
const cartItems = getLocalStorage("cartItems", []);
const selectedUserCheckoutAddress = getLocalStorage("CHECKOUT_ADDRESS", []);
const initialState = {
  carts: { cart: cartItems },
  auth: { user: users, selectedUserCheckoutAddress },
};
const store = configureStore({
  reducer: {
    products: productReducer,
    errors: errorReducer,
    carts: cartReducer,
    auth: authReducer,
    payment: paymentMethodReducer,
    admin: adminReducer,
    order: orderReducer,
    sellers: sellerReducer,
  },
  preloadedState: initialState,
});
export default store;

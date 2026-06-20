import api from "../../api/api";

export const fetchProducts = (query) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/public/products?${query}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      firstPage: data.firstPage,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "IS_ERROR",
      payload: err?.response?.data?.message || "Failed to fetch product",
    });
  }
};
export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      firstPage: data.firstPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (err) {
    dispatch({
      type: "IS_ERROR",
      payload: err?.response?.data?.message || "Failed to fetch category",
    });
  }
};

export const addToCart =
  (data, qty = 1, toast) =>
  (dispatch, getState) => {
    // find the product
    const { products } = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId,
    );

    // check for stocks
    const isQuantityExist = getProduct.quantity >= qty;
    // If in stock ->
    if (isQuantityExist) {
      dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
      toast.success("Cart has been added successfully");
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Out of stock");
    }
  };

export const increaseCartQuantity =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    const { products } = getState().products;

    const getProduct = products.find(
      (item) => Number(item.productId) === Number(data.productId),
    );

    if (!getProduct) {
      toast.error("Product not found");
      return;
    }

    const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

    if (isQuantityExist) {
      const newQuantity = currentQuantity + 1;
      setCurrentQuantity(newQuantity);
      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Reached Limit of Stock Products");
    }
  };

export const decreaseCartQuantity =
  (data, currentQuantity, setCurrentQuantity) => (dispatch, getState) => {
    if (currentQuantity <= 1) return;

    const newQuantity = currentQuantity - 1;

    setCurrentQuantity(newQuantity);

    dispatch({
      type: "ADD_CART",
      payload: {
        ...data,
        quantity: newQuantity,
      },
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
  };

export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({ type: "REMOVE_CART", payload: data });
  toast.success(`${data.productName} remove from cart`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const authenticatedSignInUser =
  (sendData, navigate, setLoader, toast, reset) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signin", sendData);
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Login Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message ?? "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };
export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async () => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset();
      toast.success(data?.message || "User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.password ||
          "Internal Server Error",
      );
    } finally {
      setLoader(false);
    }
  };
export const logOutUser = (navigate, toast, user) => (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  localStorage.removeItem("auth");
  toast.success(`${user.username} has been logout`);
  navigate("/");
};

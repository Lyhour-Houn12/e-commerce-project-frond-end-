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
export const fetchProductsForSeller = (query, isAdmin) => async (dispatch) => {
  const endpoint = isAdmin ? "/public/products" : "/seller/products";
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`${endpoint}?${query}`);
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
    const { data } = await api.get(`/admin/categories`);
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

      console.log(data);

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
export const addUpdateUserAddress =
  (sendData, reset, toast, addressId, setOpenAddressModal) =>
  async (dispatch) => {
    dispatch({ type: "BUTTON_LOADER" });
    try {
      if (!addressId) {
        const { data } = await api.post("/addresses", sendData);
      } else {
        await api.put(`address/${addressId}`, sendData);
      }
      dispatch(getUserAddresses()); // reload data immediatly when update address
      toast.success("Address saved successfully");
      reset();
      setOpenAddressModal(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      dispatch({ type: "IS_ERROR", payload: null });
    }
  };

export const getUserAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/addresses");

    dispatch({ type: "USER_ADDRESS", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch users' addresses",
    });
  }
};

export const deleteUserAddress =
  (addressId, toast, setOpenDeleteModal) => async (dispatch) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      await api.delete(`/address/${addressId}`);

      dispatch({ type: "REMOVE_ADDRESS", payload: addressId });
      dispatch({ type: "IS_SUCCESS" });
      dispatch(getUserAddresses());
      toast.success("Address has been deleted successfully");
    } catch (error) {
      dispatch({
        type: "IS_ERROR",
        payload: error?.response?.data?.message || "Something has occured",
      });
    } finally {
      setOpenDeleteModal(false);
    }
  };

export const selectedUserAddress = (addresses) => {
  localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(addresses));
  return { type: "SELECT_USER_ADDRESS", payload: addresses };
};

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    await api.post("/cart/create", sendCartItems);
    await dispatch(getUserCart());
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to create cart items",
    });
  }
};
export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get("/carts/users/cart");

    dispatch({
      type: "GET_USER_CART_PRODUCTS",
      payload: data.products,
      totalPrice: data.totalPrice,
      cartId: data.cartId,
    });

    localStorage.getItem("cartItems", JSON.stringify(getState().carts.cart));

    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch cart items",
    });
  }
};

export const addPaymentMethod = (method) => {
  return { type: "ADD_PAYMENT_METHOD", payload: method };
};

export const createStripePayment =
  (sendData, toast) => async (dispatch, getState) => {
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.post(`/order/stripe-payment-client`, sendData);
      dispatch({ type: "CLIENT_SECRET", payload: data });
      localStorage.setItem("client-secret", JSON.stringify(data));
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failded to create client secret",
      );
    }
  };
export const stripePaymentConfirmation =
  (sendData, setIsLoading, setErrorMessage, toast) =>
  async (dispatch, getState) => {
    try {
      setIsLoading(true);
      const response = await api.post(`/order/users/payment/Stripe`, sendData);
      console.log("payment confirm response:", response.data);
      if (response.data) {
        localStorage.removeItem("CHECKOUT_ADDRESS");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("client-secret");
        dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS" });
        dispatch({ type: "CLEAR_CART" });
        toast.success("Order Accepted");
      } else {
        setErrorMessage("Payment Failed. Please try again.");
      }
    } catch (error) {
      console.error(
        "Payment confirmation error:",
        error.response?.status,
        error.response?.data,
      );
      setErrorMessage("Payment Failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
export const getAllOrders = (query, isAdmin) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const endpoint = isAdmin ? "/admin/orders" : "/seller/orders";
    const { data } = await api.get(`${endpoint}?${query}`);
    dispatch({
      type: "GET_ORDERS_ADMIN",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "IS_ERROR",
      payload: err?.response?.data?.message || "Failed to fetch orders data",
    });
  }
};

export const updateOrderStatusFromDashboard =
  (orderId, orderStatus, setLoader, toast, isAdmin) =>
  async (dispatch, getState) => {
    try {
      setLoader(true);
      const endpoint = isAdmin ? "/admin/orders" : "/seller/orders";
      const { data } = await api.put(`${endpoint}/${orderId}/status`, {
        status: orderStatus,
      });
      toast.success(data.message || "Order Updated Successfully");

      await dispatch(getAllOrders());
    } catch (err) {
      toast.error(err?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };
export const updateProductFromDashboard =
  (sendData, toast, reset, setLoader, setOpen, isAdmin, query) =>
  async (dispatch) => {
    const endpoint = isAdmin ? "/admin/product" : "/seller/product";
    try {
      setLoader(true);
      await api.put(`${endpoint}/${sendData.id}`, sendData);
      reset();
      toast.success("Product updated successfully");
      dispatch(fetchProductsForSeller(query, isAdmin));
      setOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };
export const addProductFromDashboard =
  (sendData, toast, reset, setLoader, setOpen, isAdmin, query) =>
  async (dispatch) => {
    const endpoint = isAdmin ? "/admin/categories" : "/seller/categories";
    try {
      setLoader(true);
      await api.post(`${endpoint}/${sendData.categoryId}/product`, sendData);
      reset();
      toast.success("Product created successfully");
      setOpen(false);
      dispatch(fetchProductsForSeller(query, isAdmin));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };
export const deleteProductFromDashboard =
  (setLoader, productId, toast, setOpenDeleteModal, isAdmin, query) =>
  async (dispatch) => {
    const endpoint = isAdmin ? "/admin/product" : "/seller/product";
    try {
      setLoader(true);
      await api.delete(`${endpoint}/${productId}`);
      toast.success("Product deleted successfully");
      setLoader(false);
      setOpenDeleteModal(false);
      dispatch(fetchProductsForSeller(query, isAdmin));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const updateProductImageFromDashboard =
  (formData, setLoader, productId, toast, setOpen, isAdmin, query) =>
  async (dispatch) => {
    const endpoint = isAdmin ? "/admin/product" : "/seller/product";
    try {
      setLoader(true);
      await api.put(`${endpoint}/${productId}/image`, formData);
      toast.success("Product's image uploaded successfully");
      setOpen(false);
      dispatch(fetchProductsForSeller(query, isAdmin));
    } catch (err) {
      toast.error(err?.response?.data.message || "Internal Server Error");
    } finally {
      setLoader(false);
    }
  };

export const addCategory =
  (formData, setLoader, reset, toast, setOpen) => async (dispatch) => {
    try {
      setLoader(true);
      await api.post("/admin/category", formData);
      toast.success("Category created successfully");
      setOpen(false);
      reset();
      dispatch(fetchCategories());
    } catch (error) {
      toast.error(error?.response?.data.message || "Failed to Create Category");
    } finally {
      setLoader(false);
    }
  };

export const updateCategory =
  (formData, setLoader, reset, toast, setOpen) => async (dispatch) => {
    try {
      setLoader(true);
      await api.put(`/admin/${formData?.categoryId}`, formData);
      toast.success("Category updated successfully");
      setOpen(false);
      reset();
      dispatch(fetchCategories());
    } catch (error) {
      toast.error(error?.response?.data.message || "Failed to Update Category");
    } finally {
      setLoader(false);
    }
  };
export const deleteCategory =
  (categoryId, setLoader, toast, setOpen) => async (dispatch) => {
    try {
      setLoader(true);
      await api.delete(`/admin/${categoryId}`);
      toast.success("Category deleted successfully");
      setOpen(false);
      dispatch(fetchCategories());
    } catch (error) {
      toast.error(error?.response?.data.message || "Failed to Delete Category");
    } finally {
      setLoader(false);
    }
  };

export const getAllSellerDashboard =
  (queryString) => async (dispatch, getState) => {
    const { user } = getState().auth;
    try {
      dispatch({ type: "IS_FETCHING" });
      const { data } = await api.get(`/auth/sellers?${queryString}`);
      dispatch({
        type: "GET_SELLERS",
        payload: data["content"],
        pageNumber: data["pageNumber"],
        pageSize: data["pageSize"],
        totalElements: data["totalElements"],
        totalPages: data["totalPages"],
        lastPage: data["lastPage"],
      });

      dispatch({ type: "IS_SUCCESS" });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Failed to fetch sellers data",
      });
    }
  };
export const createSeller =
  (sendData, toast, reset, setOpen, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      await api.post(`/auth/signup`, sendData);
      toast.success("User seller created successfully");
      reset();
      setOpen(false);
      await dispatch(getAllSellerDashboard("pageNumber=0"));
    } catch (err) {
      console.log(err);
      dispatch({
        type: "IS_ERROR",
        payload: err?.response?.data?.message || "Failed to fetch sellers data",
      });
    } finally {
      setLoader(false);
    }
  };

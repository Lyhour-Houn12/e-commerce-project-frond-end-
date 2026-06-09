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

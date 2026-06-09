const initialProduct = {
  products: null,
  categories: null,
  pagination: {},
};

export const productReducer = (state = initialProduct, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          firstPage: action.firstPage,
          lastPage: action.lastPage,
        },
      };
    case "FETCH_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        pagination: {
          ...state.pagination,
          pageNumber: action.pageNumber,
          pageSize: action.pageSize,
          totalElements: action.totalElements,
          totalPages: action.totalPages,
          firstPage: action.firstPage,
          lastPage: action.lastPage,
        },
      };

    default:
      return state;
  }
};

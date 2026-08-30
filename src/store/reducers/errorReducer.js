const initialError = {
  isLoading: false,
  errorMessage: null,
  categoryLoader: false,
  categoryMessage: null,
  btnLoader: false,
};

export const errorReducer = (state = initialError, action) => {
  switch (action.type) {
    case "IS_FETCHING":
      return { ...state, isLoading: true, errorMessage: null };
    case "IS_SUCCESS":
      return { ...state, isLoading: false, errorMessage: null };
    case "IS_ERROR":
      return {
        ...state,
        isLoading: false,
        btnLoader: false,
        errorMessage: action.payload,
      };
    case "BUTTON_LOADER":
      return {
        ...state,
        errorMessage: null,
        categoryError: null,
        btnLoader: true,
      };
    case "CATEGORY_LOADER":
      return { ...state, categoryLoader: true, categoryMessage: null };
    case "CATEGORY_SUCCESS":
      return {
        ...state,
        categoryLoader: false,
        categoryMessage: null,
      };
    case "CATEGORY_ERROR":
      return {
        ...state,
        categoryLoader: false,
        categoryMessage: state.payload,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

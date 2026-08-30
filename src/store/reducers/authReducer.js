const initialState = {
  user: null,
  address: [],
  clientSecret: null,
  selectedUserCheckoutAddress: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOG_OUT":
      return { user: null, address: [], token: null };
    case "USER_ADDRESS":
      return { ...state, address: action.payload };
    case "SELECT_USER_ADDRESS":
      return { ...state, selectedUserCheckoutAddress: action.payload };
    case "CLIENT_SECRET":
      return { ...state, clientSecret: action.payload };
    case "REMOVE_CLIENT_SECRET_ADDRESS":
      return {
        ...state,
        clientSecret: null,
        selectedUserCheckoutAddress: null,
      };
    case "REMOVE_ADDRESS":
      return {
        ...state,
        address: state.address.filter(
          (add) => add.addressId !== action.payload,
        ),
      };
  }
  return state;
}

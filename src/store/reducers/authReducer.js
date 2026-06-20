const initialState = {
  user: null,
  address: [],
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return { user: null, address: [] };
  }
  return state;
}

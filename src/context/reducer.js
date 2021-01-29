export const initialState = {
  user: null,
  authToken: null,
  limit: 3,
  offset: 0,
};

const reducer = (state, action) => {
  console.log({ action });

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_AUTH_TOKEN":
      return {
        ...state,
        authToken: action.authToken,
      };
    case "SET_OFFSET":
      return {
        ...state,
        offset: action.offset,
      };
    case "LOGOUT":
      return {
        ...initialState,
      };
    default:
      return;
  }
};

export default reducer;

export const userInitState = {
  user: null,
  authToken: null,
  userFunkoPops: [],
  getUserFunkos: true,
};

const userReducer = (state, action) => {
  console.log("userReducer -> ", { action });

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
    case "SET_USER_FUNKOPOPS":
      return {
        ...state,
        userFunkoPops: action.userFunkoPops,
      };
    case "GET_USER_FUNKOS":
      return {
        ...state,
        getUserFunkos: action.getUserFunkos,
      };
    case "LOGOUT":
      return userInitState;
    default:
      return state;
  }
};

export default userReducer;

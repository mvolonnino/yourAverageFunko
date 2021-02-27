export const usersInitState = {
  users: [],
};

const usersReducer = (state, action) => {
  console.log("usersReducer -> ", action);

  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
      };
    case "LOGOUT":
      return usersInitState;
    default:
      return state;
  }
};

export default usersReducer;

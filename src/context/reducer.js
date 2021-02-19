export const initialState = {
  user: null,
  authToken: null,
  userFunkoPops: null,
  searchedFunkoPops: null,
  dbGenreList: [],
  dbFunkoPops: [],
  reGetUserFunkos: false,
  isLoading: true,
  users: [],
};

const reducer = (state, action) => {
  console.log({ action });

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
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
    case "SET_DB_FUNKOPOPS":
      return {
        ...state,
        dbFunkoPops: action.dbFunkoPops,
      };
    case "SET_SEARCHED_FUNKOPOPS":
      return {
        ...state,
        searchedFunkoPops: action.searchedFunkoPops,
      };
    case "SET_DB_GENRELIST":
      return {
        ...state,
        dbGenreList: action.dbGenreList,
      };
    case "REGET_USER_FUNKOS":
      return {
        ...state,
        reGetUserFunkos: action.reGetUserFunkos,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
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

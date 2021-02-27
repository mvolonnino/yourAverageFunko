export const funkoInitState = {
  dbFunkoPops: [],
  dbGenreList: [],
};

const funkoReducer = (state, action) => {
  console.log("funkoReducer -> ", action);

  switch (action.type) {
    case "SET_DB_FUNKOPOPS":
      return {
        ...state,
        dbFunkoPops: action.dbFunkoPops,
      };
    case "SET_DB_GENRELIST":
      return {
        ...state,
        dbGenreList: action.dbGenreList,
      };
    case "LOGOUT":
      return funkoInitState;
    default:
      return state;
  }
};

export default funkoReducer;

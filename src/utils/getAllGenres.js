import API from "./API";

function getAllGenres(dbData) {
  // if we have the dbData stored in context
  if (dbData) {
    const genreList = dbData.filter((funkoSet) => {
      return funkoSet.genreList;
    });

    return genreList[0].genreList;
  } else {
    // we do not have the dbData stored in context
    const genreList = API.getGenreListData().then((res) => {
      const { data } = res;
      return data.genreList;
    });

    return genreList;
  }
}

export default getAllGenres;

function getAllGenres(dbData) {
  const genreList = dbData.filter((funkoSet) => {
    return funkoSet.genreList;
  });
  return genreList[0].genreList;
}

export default getAllGenres;

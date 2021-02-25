function getFunkoDataByGenre(dbData, genre) {
  const data = dbData.filter((funkoSet) => {
    return genre === funkoSet.genre;
  });
  return data[0];
}

export default getFunkoDataByGenre;

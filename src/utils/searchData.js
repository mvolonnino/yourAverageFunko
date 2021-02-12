function searchData(dbData, search) {
  const funkoArr = [];
  dbData.forEach((doc) => {
    const funkoObj = doc;
    if (funkoObj.funkoData) {
      funkoArr.push(funkoObj);
    }
  });

  let genreMatches = [];
  if (isNaN(search)) {
    genreMatches = funkoArr.filter((funko) =>
      funko.genre.toLowerCase().includes(search)
    );
  } else if (!isNaN(search)) {
    if (search.length > 3) {
      genreMatches = funkoArr.filter((funko) =>
        funko.genre.toLowerCase().includes(search)
      );
    }
  }

  // name & number matching
  const objToSearch = {
    notNullNameArr: [],
    notNullNumbArr: [],
    nameMatches: [],
    numbMatches: [],
  };

  funkoArr.forEach((funko) => {
    const genre = funko.genre;
    if (funko.funkoData) {
      const funkoDataArr = funko.funkoData;
      funkoDataArr.forEach((data) => {
        if (data.name) {
          objToSearch.notNullNameArr.push({
            funkoData: [data],
            genre: genre,
          });
        }
        if (data.number) {
          objToSearch.notNullNumbArr.push({
            funkoData: [data],
            genre: genre,
          });
        }
      });
    }
  });

  // find name that includes search
  objToSearch.notNullNameArr.forEach((funko) => {
    const genre = funko.genre;
    let name = {};
    if (isNaN(search)) {
      name = funko.funkoData.filter((data) =>
        data.name.toLowerCase().includes(search)
      );
    }
    if (Object.keys(name).length > 0) {
      objToSearch.nameMatches.push({
        funkoData: name,
        genre,
      });
    }
  });

  // find number that matches search
  objToSearch.notNullNumbArr.forEach((funko) => {
    const genre = funko.genre;
    let number = funko.funkoData.filter((data) => data.number === search);
    if (Object.keys(number).length > 0) {
      objToSearch.numbMatches.push({
        funkoData: number,
        genre,
      });
    }
  });

  const searchFinds = {
    genre: genreMatches,
    name: objToSearch.nameMatches,
    number: objToSearch.numbMatches,
  };

  return searchFinds;
}

export default searchData;

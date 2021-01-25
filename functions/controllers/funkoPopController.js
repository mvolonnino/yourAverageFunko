const firebase = require("../db");
const FunkoPop = require("../models/funkoPop");
const firestore = firebase.firestore();

const bulkAddFunkoPop = async (req, res, next) => {
  try {
    const { body } = req;
    const dbData = await firestore.collection("test").doc(body.genre);
    const data = await dbData.get();
    if (data.exists) {
      let dbFunkoData = data.data().funkoData;
      body.funkoData.forEach((funko) => {
        dbFunkoData.push(funko);
      });
      const funkoAdd = {
        genre: genre,
        funkoData: dbFunkoData,
      };
      await dbData.update(funkoAdd);
      res.status(200).send(funkoAdd);
    } else {
      await dbData.set(body);
      res.status(200).send(body);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const userAddFunkoPop = async (req, res) => {
  try {
    const { body } = req;
    let headerData = [];
    for (let [i, dataSet] of body.entries()) {
      const funkoPop = new FunkoPop(dataSet);
      if (funkoPop.error) {
        // funko pop data not constructed correctly
        headerData.push({ funkoPop });
      } else {
        const dbData = await firestore.collection("test").doc(funkoPop.genre);
        const doc = await dbData.get();
        if (doc.exists) {
          let newFunkoData = [];
          const dbFunkoData = doc.data().funkoData;
          dbFunkoData.map((dbFunko) => {
            newFunkoData.push(dbFunko);
          });
          funkoPop.funkoData.forEach((funko) => {
            newFunkoData.push(funko);
          });
          await dbData.update({
            funkoData: newFunkoData,
          });
          headerData.push({
            genre: funkoPop.genre,
            funkoData: newFunkoData,
          });
        } else {
          await dbData.set(funkoPop);
          headerData.push({ funkoPop });
        }
      }
    }
    res.status(200).send(headerData);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllFunkoPops = async (req, res, next) => {
  try {
    const funkoPops = await firestore.collection("test");
    const data = await funkoPops.get();
    const funkoArray = [];
    if (data.empty) {
      res.status(200).send([]);
    } else {
      data.forEach((doc) => {
        const funkoPop = doc.data();
        funkoArray.push(funkoPop);
      });
      res.status(200).send(funkoArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getFunkoPopQuery = async (req, res, next) => {
  try {
    console.log(req.params);
    const query = req.params.query.trim().toLowerCase();
    const data = await firestore.collection("test").get();
    const funkoArr = [];
    if (data.empty) {
      res.status(200).data([]);
    } else {
      data.forEach((doc) => {
        const funkoObj = doc.data();
        funkoArr.push(funkoObj);
      });

      // genre matching if query is not a number
      let genreMatches = [];
      if (isNaN(query)) {
        genreMatches = funkoArr.filter((funko) =>
          funko.genre.toLowerCase().includes(query)
        );
      } else if (!isNaN(query)) {
        if (query.length > 3) {
          genreMatches = funkoArr.filter((funko) =>
            funko.genre.toLowerCase().includes(query)
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
      // find name that includes query
      objToSearch.notNullNameArr.forEach((funko) => {
        const genre = funko.genre;
        let name = {};
        if (isNaN(query)) {
          name = funko.funkoData.filter((data) =>
            data.name.toLowerCase().includes(query)
          );
        }
        if (Object.keys(name).length > 0) {
          objToSearch.nameMatches.push({
            genre,
            funkoData: name,
          });
        }
      });
      // find number that matches query
      objToSearch.notNullNumbArr.forEach((funko) => {
        const genre = funko.genre;
        const number = funko.funkoData.filter((data) => data.number === query);
        if (Object.keys(number).length > 0) {
          objToSearch.numbMatches.push({
            genre,
            funkoData: number,
          });
        }
      });

      const searchFinds = {
        genre: genreMatches,
        name: objToSearch.nameMatches,
        number: objToSearch.numbMatches,
      };

      res.status(200).send(searchFinds);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// KEPT FOR REFERENCE
const getFunkoPopName = async (req, res, next) => {
  try {
    const query = req.params.name.trim().toLowerCase();
    console.log({ query });
    const funkoPops = await firestore.collection("funkoPops");
    const data = await funkoPops.get();
    const funkoArray = [];
    if (data.empty) {
      res.status(200).data([]);
    } else {
      data.forEach((doc) => {
        const funkoObj = new FunkoPop(doc.data().genre, doc.data().funkoData);
        funkoArray.push(funkoObj);
      });
      const matchArr = [];
      funkoArray.forEach((funko) => {
        const genre = funko.genre;
        const funkoData = funko.funkoData;
        if (funkoData && funkoData.name) {
          const matches = funkoData.filter((data) =>
            data.name.toLowerCase().includes(query)
          );
          if (Object.keys(matches).length > 0) {
            matchArr.push({
              matches,
              genre,
            });
          }
        }
      });
      if (matchArr.length === 0) {
        res.status(200).send(`No Funko Pops found for search: ${query}`);
      } else {
        res.status(200).send(matchArr);
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getFunkoPopGenre = async (req, res, next) => {
  try {
    const query = req.params.genre.trim().toLowerCase();
    console.log({ query });
    const funkoPops = await firestore.collection("test");
    const data = await funkoPops.get();
    const genreArray = [];
    if (data.empty) {
      res.status(200).data([]);
    } else {
      data.forEach((doc) => {
        const funkoObj = new FunkoPop(doc.data().genre, doc.data().funkoData);
        genreArray.push(funkoObj);
      });
      const matches = genreArray.filter((genre) =>
        genre.genre.toLowerCase().includes(query)
      );
      if (Object.keys(matches).length === 0) {
        res.status(200).data([]);
      } else {
        res.status(200).send(matches);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// const getAllFunkoPops = async (req, res, next) => {
//   try {
//     const data = await firestore.collection("funkoPops").get();
//     const funkoArray = [];
//     if (data.empty) {
//       res.status(200).send([]);
//     } else {
//       data.forEach((doc) => {
//         console.log(doc.data());
//         // const funkoPop = new FunkoPop(doc.data().genre, doc.data().funkoData);
//         funkoArray.push(doc.data());
//       });
//       funkoArray.map((funko) => console.log(funko.number));
//       res.status(200).send(funkoArray);
//     }
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

module.exports = {
  bulkAddFunkoPop,
  userAddFunkoPop,
  getAllFunkoPops,
  getFunkoPopName,
  getFunkoPopGenre,
  getFunkoPopQuery,
};

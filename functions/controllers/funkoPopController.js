const firebase = require("../db");
const FunkoPop = require("../models/funkoPop");
const firestore = firebase.firestore();

const addFunkoPop = async (req, res, next) => {
  try {
    console.log(req.body);
    const dataToAdd = req.body;
    const genreCheck = await firestore.collection("test").doc(dataToAdd.genre);
    const data = await genreCheck.get();
    if (data.exists) {
      let funkoData = data.data().funkoData;
      dataToAdd.funkoData.forEach((funko) => {
        funkoData.push(funko);
      });
      const funkoAdd = {
        genre: dataToAdd.genre,
        funkoData: funkoData,
      };
      await genreCheck.update(funkoAdd);
      res.send("Record added successfully");
    } else {
      await genreCheck.set(dataToAdd);
      res.send("Record created successfully");
    }
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
      res.status(404).send("No Funko Pop records exsist");
    } else {
      data.forEach((doc) => {
        const funkoPop = new FunkoPop(doc.data().genre, doc.data().funkoData);
        funkoArray.push(funkoPop);
      });
      res.send(funkoArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getFunkoPopName = async (req, res, next) => {
  try {
    const query = req.params.name.trim().toLowerCase();
    console.log({ query });
    const funkoPops = await firestore.collection("test");
    const data = await funkoPops.get();
    const funkoArray = [];
    if (data.empty) {
      res.status(404).send("No Funko Pop records exsist");
    } else {
      data.forEach((doc) => {
        console.log(doc.data());
        const funkoObj = new FunkoPop(doc.data().genre, doc.data().funkoData);
        console.log(funkoObj);
        funkoArray.push(funkoObj);
      });
      const matchArr = [];
      funkoArray.forEach((funko) => {
        const genre = funko.genre;
        const funkoData = funko.funkoData;
        const matches = funkoData.filter((data) =>
          data.name.toLowerCase().includes(query)
        );
        if (Object.keys(matches).length > 0) {
          matchArr.push({
            matches,
            genre,
          });
        }
      });
      if (matchArr.length === 0) {
        res.status(404).send(`No Funko Pops found for search: ${query}`);
      } else {
        res.send(matchArr);
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
      res.status(404).send("No Funko Pop records exsist");
    } else {
      data.forEach((doc) => {
        const funkoObj = new FunkoPop(doc.data().genre, doc.data().funkoData);
        genreArray.push(funkoObj);
      });
      const matches = genreArray.filter((genre) =>
        genre.genre.toLowerCase().includes(query)
      );
      if (Object.keys(matches).length === 0) {
        res.status(404).send(`No Funko Genres found for search: ${query}`);
      } else {
        res.send(matches);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getFunkoPopQuery = async (req, res, next) => {
  try {
    console.log(req.params);
    const query = req.params.query.trim().toLowerCase();
    const funkoPops = await firestore.collection("test");
    const data = await funkoPops.get();
    const funkoArr = [];
    if (data.empty) {
      res.status(404).send("No Funko Pop records exsist");
    } else {
      data.forEach((doc) => {
        const funkoObj = new FunkoPop(doc.data().genre, doc.data().funkoData);
        funkoArr.push(funkoObj);
      });

      // genre matching
      let genreMatches = funkoArr.filter((funko) =>
        funko.genre.toLowerCase().includes(query)
      );
      if (genreMatches.length === 0) {
        genreMatches = `No funko pop genres with search: ${query}`;
      }
      // name & number matching
      let nameMatches = [];
      let numbMatches = [];
      funkoArr.forEach((funko) => {
        const genre = funko.genre;
        const funkoData = funko.funkoData;
        const name = funkoData.filter((data) =>
          data.name.toLowerCase().includes(query)
        );
        const number = funkoData.filter((data) =>
          data.number.toLowerCase().includes(query)
        );

        if (Object.keys(name).length > 0) {
          nameMatches.push({
            genre,
            name,
          });
        }
        if (Object.keys(number).length > 0) {
          numbMatches.push({
            genre,
            number,
          });
        }
      });

      if (nameMatches.length === 0) {
        nameMatches = `No funko pops found with search name: ${query}`;
      }
      if (numbMatches.length === 0) {
        numbMatches = `No funko pop numbers found with search: ${query}`;
      }

      const searchFinds = {
        genre: genreMatches,
        name: nameMatches,
        number: numbMatches,
      };

      res.send(searchFinds);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addFunkoPop,
  getAllFunkoPops,
  getFunkoPopName,
  getFunkoPopGenre,
  getFunkoPopQuery,
};

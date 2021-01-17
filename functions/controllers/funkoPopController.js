const firebase = require("../db");
const FunkoPop = require("../models/funkoPop");
const firestore = firebase.firestore();

const addFunkoPop = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = req.body;
    await firestore.collection("funkoPops").doc(data.genre).set(data);
    res.send("Record saved successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllFunkoPops = async (req, res, next) => {
  try {
    const funkoPops = await firestore.collection("funkoPops");
    const data = await funkoPops.get();
    const funkoArray = [];
    if (data.empty) {
      res.status(404).send("No Funko Pop records found");
    } else {
      data.forEach((doc) => {
        const funkoPop = new FunkoPop(doc.data().genre, doc.data().funkoData);
        funkoArray.push(funkoPop);
        console.log(funkoPop);
      });
      res.send(funkoArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// still working on this
const getFunkoPopName = async (req, res, next) => {
  try {
    const query = req.params.name.trim().toLowerCase();
    console.log({ query });
    const funkoPops = await firestore.collection("funkoPops");
    const data = await funkoPops.get();
    const funkoArray = [];
    if (data.empty) {
      res.status(404).send("No Funko Pop records found");
    } else {
      data.forEach((doc) => {
        const funkoObj = new FunkoPop(doc.data().genre, doc.data().funkoData);
        funkoArray.push(funkoObj);
      });
      console.log(funkoArray);
      funkoArray.forEach((funko) => {
        const funkoData = funko.funkoData;
        const matches = funkoData.filter((data) =>
          data.name.toLowerCase().includes(query)
        );
        console.log(matches);
      });
      // const matches = funkoDataArr.map((funkoData) => funkoData.name);
      // console.log(matches);
      // const matches = funkoArray.funko;
      // console.log({ matches });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getFunkoPopGenre = async (req, res, next) => {
  try {
    const query = req.params.genre.trim().toLowerCase();
    console.log({ query });
    const funkoPops = await firestore.collection("funkoPops");
    const data = await funkoPops.get();
    const genreArray = [];
    if (data.empty) {
      res.status(404).send("No Funko Pop records found");
    } else {
      data.forEach((doc) => {
        const funkoObj = new FunkoPop(doc.data().genre, doc.data().funkoData);
        genreArray.push(funkoObj);
      });
      const matches = genreArray.filter((genre) =>
        genre.genre.toLowerCase().includes(query)
      );
      console.log({ matches });
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

module.exports = {
  addFunkoPop,
  getAllFunkoPops,
  getFunkoPopName,
  getFunkoPopGenre,
};

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

module.exports = {
  addFunkoPop,
};

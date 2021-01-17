const express = require("express");
const {
  addFunkoPop,
  getAllFunkoPops,
  getFunkoPopName,
  getFunkoPopGenre,
} = require("../controllers/funkoPopController");
const db = require("../db");

const router = express.Router();

router.post("/funkoPop", addFunkoPop);
router.get("/funkoPops", getAllFunkoPops);
router.get("/funkoPops/:name", getFunkoPopName);
router.get("/funkoPop/:genre", getFunkoPopGenre);

module.exports = {
  routes: router,
};

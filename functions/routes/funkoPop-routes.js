const express = require("express");
const {
  addFunkoPop,
  getAllFunkoPops,
  getFunkoPopName,
  getFunkoPopGenre,
} = require("../controllers/funkoPopController");
const db = require("../db");
const verifyToken = require("../verifyToken");

const router = express.Router();

router.post("/add", addFunkoPop);
router.get("/getAll", verifyToken, getAllFunkoPops);
router.get("/getName/:name", getFunkoPopName);
router.get("/getGenre/:genre", getFunkoPopGenre);

module.exports = {
  routes: router,
};

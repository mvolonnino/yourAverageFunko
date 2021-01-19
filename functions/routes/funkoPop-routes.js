const express = require("express");
const {
  addFunkoPop,
  getAllFunkoPops,
  getFunkoPopName,
  getFunkoPopGenre,
  getFunkoPopQuery,
} = require("../controllers/funkoPopController");
const db = require("../db");
const verifyToken = require("../verifyToken");

const router = express.Router();

router.post("/add", addFunkoPop);
router.get("/getAll", verifyToken, getAllFunkoPops);
router.get("/getName/:name", getFunkoPopName);
router.get("/getGenre/:genre", getFunkoPopGenre);
router.get("/search/:query", getFunkoPopQuery);

module.exports = {
  routes: router,
};
